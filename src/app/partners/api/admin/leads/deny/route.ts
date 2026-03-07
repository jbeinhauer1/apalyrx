import { NextRequest, NextResponse } from "next/server";
import { createPartnerServerClient } from "@/lib/partners/supabase/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { logAudit } from "@/lib/partners/audit";
import { sendEmail } from "@/lib/partners/emails/send";
import { leadDeniedToPartnerEmail } from "@/lib/partners/emails/templates";

export async function POST(request: NextRequest) {
  const supabase = createPartnerServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: pu } = await supabase
    .from("partner_users")
    .select("id, email, is_apaly_team")
    .eq("user_id", session.user.id)
    .maybeSingle();

  if (!pu?.is_apaly_team) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { leadId, reason } = await request.json();
  const admin = createPartnerAdminClient();

  const { data: lead } = await admin
    .from("leads")
    .select("id, organization_id, prospect_company_name, status")
    .eq("id", leadId)
    .single();

  if (!lead || lead.status !== "pending") {
    return NextResponse.json({ error: "Lead not found or not pending" }, { status: 400 });
  }

  await admin.from("leads").update({
    status: "denied",
    denial_reason: reason || null,
    approval_token: null,
    updated_at: new Date().toISOString(),
  }).eq("id", leadId);

  await admin.from("lead_activity").insert({
    lead_id: leadId,
    author_id: pu.id,
    author_type: "apaly_team",
    content: `Lead denied by ${pu.email}.${reason ? ` Reason: ${reason}` : ""}`,
    activity_type: "status_change",
  });

  await logAudit({
    actorId: pu.id,
    actorEmail: pu.email,
    action: "DENY_LEAD",
    targetType: "lead",
    targetId: leadId,
    metadata: { reason, via: "admin_portal" },
  });

  const { data: org } = await admin
    .from("partner_organizations")
    .select("notification_email, company_name")
    .eq("id", lead.organization_id)
    .single();

  if (org?.notification_email) {
    const email = leadDeniedToPartnerEmail({
      companyName: lead.prospect_company_name,
      partnerContactName: org.company_name,
      reason,
    });
    await sendEmail({ to: org.notification_email, subject: email.subject, html: email.html }).catch(console.error);
  }

  return NextResponse.json({ success: true });
}
