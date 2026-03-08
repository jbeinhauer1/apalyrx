import { NextRequest, NextResponse } from "next/server";
import { createPartnerServerClient } from "@/lib/partners/supabase/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { logAudit } from "@/lib/partners/audit";
import { sendEmail } from "@/lib/partners/emails/send";
import { leadMarkedAsCustomerEmail } from "@/lib/partners/emails/templates";

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

  const { leadId, agreementDate, notes } = await request.json();
  if (!leadId || !agreementDate) {
    return NextResponse.json({ error: "Lead ID and agreement date are required" }, { status: 400 });
  }

  const admin = createPartnerAdminClient();

  // Fetch lead
  const { data: lead } = await admin
    .from("leads")
    .select("id, prospect_company_name, organization_id, status")
    .eq("id", leadId)
    .single();

  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  if (lead.status !== "qualified") {
    return NextResponse.json({ error: "Only qualified leads can be marked as customer" }, { status: 400 });
  }

  // Fetch partner org for commission duration
  const { data: org } = await admin
    .from("partner_organizations")
    .select("id, company_name, commission_duration_months, notification_email")
    .eq("id", lead.organization_id)
    .single();

  if (!org) return NextResponse.json({ error: "Partner organization not found" }, { status: 404 });

  const commissionMonths = org.commission_duration_months || 12;
  const startDate = new Date(agreementDate);
  const endDate = new Date(agreementDate);
  endDate.setMonth(endDate.getMonth() + commissionMonths);

  const now = new Date().toISOString();
  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  // Update lead
  await admin
    .from("leads")
    .update({
      status: "customer",
      customer_since: agreementDate,
      commission_start_date: startStr,
      commission_end_date: endStr,
      updated_at: now,
    })
    .eq("id", lead.id);

  // Log activity
  const activityContent = `Marked as customer. Agreement date: ${startStr}. Commission term: ${startStr} to ${endStr}.${notes ? ` Notes: ${notes}` : ""}`;
  await admin.from("lead_activity").insert({
    lead_id: lead.id,
    author_id: pu.id,
    author_type: "apaly_team",
    content: activityContent,
    activity_type: "status_change",
  });

  // Audit log
  await logAudit({
    actorId: pu.id,
    actorEmail: pu.email,
    action: "MARK_AS_CUSTOMER",
    targetType: "lead",
    targetId: lead.id,
    metadata: {
      agreementDate,
      commissionStart: startStr,
      commissionEnd: endStr,
      notes,
    },
  });

  // Send email to partner
  const { data: partnerUser } = await admin
    .from("partner_users")
    .select("first_name, email")
    .eq("organization_id", org.id)
    .eq("role", "partner_admin")
    .maybeSingle();

  const notifyEmail = org.notification_email || partnerUser?.email;
  if (notifyEmail) {
    const emailContent = leadMarkedAsCustomerEmail({
      partnerContactName: partnerUser?.first_name || org.company_name,
      prospectCompanyName: lead.prospect_company_name,
      commissionStart: startStr,
      commissionEnd: endStr,
    });
    await sendEmail({
      to: notifyEmail,
      subject: emailContent.subject,
      html: emailContent.html,
    }).catch(console.error);
  }

  return NextResponse.json({ success: true, status: "customer" });
}
