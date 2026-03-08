import { NextRequest, NextResponse } from "next/server";
import { createPartnerServerClient } from "@/lib/partners/supabase/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { logAudit } from "@/lib/partners/audit";
import { sendEmail } from "@/lib/partners/emails/send";
import { partnerApprovedEmail } from "@/lib/partners/emails/templates";

export async function POST(request: NextRequest) {
  const supabase = createPartnerServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: pu } = await supabase
    .from("partner_users")
    .select("id, email, is_apaly_team, role")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (!pu?.is_apaly_team) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { action, partnerId, reason } = await request.json();
  const admin = createPartnerAdminClient();

  // Get org
  const { data: org } = await admin
    .from("partner_organizations")
    .select("id, company_name, partner_code, notification_email, status")
    .eq("id", partnerId)
    .single();

  if (!org) return NextResponse.json({ error: "Partner not found" }, { status: 404 });

  const now = new Date().toISOString();

  if (action === "approve") {
    await admin.from("partner_organizations").update({
      status: "active",
      setup_complete: true,
      approved_at: now,
      updated_at: now,
    }).eq("id", org.id);

    await logAudit({
      actorId: pu.id,
      actorEmail: pu.email,
      action: "APPROVE_PARTNER",
      targetType: "partner_organization",
      targetId: org.id,
      metadata: { via: "admin_portal" },
    });

    // Get partner user for email
    const { data: partnerUser } = await admin
      .from("partner_users")
      .select("first_name, email")
      .eq("organization_id", org.id)
      .eq("role", "partner_admin")
      .maybeSingle();

    const notifyEmail = org.notification_email || partnerUser?.email;
    if (notifyEmail) {
      const emailContent = partnerApprovedEmail({
        contactName: partnerUser?.first_name || org.company_name,
        partnerCode: org.partner_code,
      });
      await sendEmail({ to: notifyEmail, subject: emailContent.subject, html: emailContent.html }).catch(console.error);
    }

    return NextResponse.json({ success: true, status: "active" });
  }

  if (action === "deny") {
    await admin.from("partner_organizations").update({
      status: "denied",
      updated_at: now,
    }).eq("id", org.id);

    await logAudit({
      actorId: pu.id,
      actorEmail: pu.email,
      action: "DENY_PARTNER",
      targetType: "partner_organization",
      targetId: org.id,
      metadata: { reason, via: "admin_portal" },
    });

    return NextResponse.json({ success: true, status: "denied" });
  }

  if (action === "suspend") {
    await admin.from("partner_organizations").update({
      status: "suspended",
      updated_at: now,
    }).eq("id", org.id);

    await logAudit({
      actorId: pu.id,
      actorEmail: pu.email,
      action: "SUSPEND_PARTNER",
      targetType: "partner_organization",
      targetId: org.id,
    });

    // Notify partner
    const { data: partnerUser } = await admin
      .from("partner_users")
      .select("email")
      .eq("organization_id", org.id)
      .eq("role", "partner_admin")
      .maybeSingle();

    const notifyEmail = org.notification_email || partnerUser?.email;
    if (notifyEmail) {
      await sendEmail({
        to: notifyEmail,
        subject: "ApalyRx Partner Account Suspended",
        html: `<p>Your ApalyRx partner account has been suspended. Contact partners@apalyrx.com for more information.</p>`,
      }).catch(console.error);
    }

    return NextResponse.json({ success: true, status: "suspended" });
  }

  if (action === "activate") {
    await admin.from("partner_organizations").update({
      status: "active",
      approved_at: org.status === "denied" ? now : undefined,
      updated_at: now,
    }).eq("id", org.id);

    await logAudit({
      actorId: pu.id,
      actorEmail: pu.email,
      action: "ACTIVATE_PARTNER",
      targetType: "partner_organization",
      targetId: org.id,
    });

    // Notify partner
    const { data: partnerUser } = await admin
      .from("partner_users")
      .select("first_name, email")
      .eq("organization_id", org.id)
      .eq("role", "partner_admin")
      .maybeSingle();

    const notifyEmail = org.notification_email || partnerUser?.email;
    if (notifyEmail) {
      const emailContent = partnerApprovedEmail({
        contactName: partnerUser?.first_name || org.company_name,
        partnerCode: org.partner_code,
      });
      await sendEmail({ to: notifyEmail, subject: emailContent.subject, html: emailContent.html }).catch(console.error);
    }

    return NextResponse.json({ success: true, status: "active" });
  }

  if (action === "delete") {
    if (pu.role !== "super_admin") {
      return NextResponse.json({ error: "Only super admins can delete partners" }, { status: 403 });
    }

    // Check for leads or commissions
    const [leadsRes, commissionsRes] = await Promise.all([
      admin.from("leads").select("id", { count: "exact", head: true }).eq("organization_id", org.id),
      admin.from("commission_entries").select("id", { count: "exact", head: true }).eq("organization_id", org.id),
    ]);

    if ((leadsRes.count || 0) > 0 || (commissionsRes.count || 0) > 0) {
      return NextResponse.json({
        error: "This partner has active leads or commission history and cannot be deleted. Suspend the account instead.",
      }, { status: 409 });
    }

    // Get auth user IDs to delete
    const { data: users } = await admin
      .from("partner_users")
      .select("user_id")
      .eq("organization_id", org.id);

    // Delete partner_users
    await admin.from("partner_users").delete().eq("organization_id", org.id);

    // Delete organization
    await admin.from("partner_organizations").delete().eq("id", org.id);

    // Delete auth users
    for (const u of users || []) {
      if (u.user_id) {
        await admin.auth.admin.deleteUser(u.user_id);
      }
    }

    await logAudit({
      actorId: pu.id,
      actorEmail: pu.email,
      action: "DELETE_PARTNER",
      targetType: "partner_organization",
      targetId: org.id,
      metadata: { companyName: org.company_name },
    });

    return NextResponse.json({ success: true, deleted: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
