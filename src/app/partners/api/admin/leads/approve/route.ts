import { NextRequest, NextResponse } from "next/server";
import { createPartnerServerClient } from "@/lib/partners/supabase/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { logAudit } from "@/lib/partners/audit";
import { sendEmail } from "@/lib/partners/emails/send";
import { leadApprovedToPartnerEmail } from "@/lib/partners/emails/templates";

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

  const { leadId } = await request.json();
  const admin = createPartnerAdminClient();

  const { data: lead } = await admin
    .from("leads")
    .select("id, organization_id, prospect_company_name, status")
    .eq("id", leadId)
    .single();

  if (!lead || lead.status !== "pending") {
    return NextResponse.json({ error: "Lead not found or not pending" }, { status: 400 });
  }

  const { data: org } = await admin
    .from("partner_organizations")
    .select("commission_duration_months, notification_email, company_name")
    .eq("id", lead.organization_id)
    .single();

  const durationMonths = org?.commission_duration_months || 12;
  const now = new Date();
  const deadline = new Date(now);
  deadline.setDate(deadline.getDate() + 150);
  const commEnd = new Date(now);
  commEnd.setMonth(commEnd.getMonth() + durationMonths);

  await admin.from("leads").update({
    status: "qualified",
    qualified_at: now.toISOString(),
    acceptance_deadline: deadline.toISOString(),
    commission_end_date: commEnd.toISOString(),
    approved_by: pu.id,
    approval_token: null,
    updated_at: now.toISOString(),
  }).eq("id", leadId);

  await admin.from("lead_activity").insert({
    lead_id: leadId,
    author_id: pu.id,
    author_type: "apaly_team",
    content: `Lead approved by ${pu.email}. 150-day acceptance window started.`,
    activity_type: "approval",
  });

  await logAudit({
    actorId: pu.id,
    actorEmail: pu.email,
    action: "APPROVE_LEAD",
    targetType: "lead",
    targetId: leadId,
    metadata: { via: "admin_portal" },
  });

  if (org?.notification_email) {
    const email = leadApprovedToPartnerEmail({
      companyName: lead.prospect_company_name,
      partnerContactName: org.company_name,
      deadlineDate: deadline.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      leadId,
    });
    await sendEmail({ to: org.notification_email, subject: email.subject, html: email.html }).catch(console.error);
  }

  return NextResponse.json({ success: true });
}
