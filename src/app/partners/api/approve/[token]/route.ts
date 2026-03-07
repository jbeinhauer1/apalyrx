import { NextRequest, NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { logAudit } from "@/lib/partners/audit";
import { sendEmail } from "@/lib/partners/emails/send";
import { leadApprovedToPartnerEmail } from "@/lib/partners/emails/templates";

function htmlPage(title: string, message: string, success: boolean) {
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="background:#fff;border-radius:12px;padding:48px;max-width:480px;width:90%;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <div style="font-size:48px;margin-bottom:16px;">${success ? "✅" : "❌"}</div>
    <h1 style="color:#102a4c;font-size:24px;margin:0 0 12px;">${title}</h1>
    <p style="color:#6b7280;font-size:14px;line-height:1.6;">${message}</p>
  </div>
</body>
</html>`,
    { status: 200, headers: { "Content-Type": "text/html" } }
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;
  const supabase = createPartnerAdminClient();

  // Validate token
  const { data: lead } = await supabase
    .from("leads")
    .select("id, organization_id, prospect_company_name, approval_token_expires_at")
    .eq("approval_token", token)
    .eq("status", "pending")
    .single();

  if (!lead) {
    return htmlPage(
      "Invalid or Expired Link",
      "This approval link has already been used or has expired.",
      false
    );
  }

  // Check expiration
  if (
    lead.approval_token_expires_at &&
    new Date(lead.approval_token_expires_at) < new Date()
  ) {
    return htmlPage(
      "Link Expired",
      "This approval link has expired. Please review the lead in the admin portal.",
      false
    );
  }

  // Get partner info for commission duration
  const { data: org } = await supabase
    .from("partner_organizations")
    .select("commission_duration_months, notification_email, company_name")
    .eq("id", lead.organization_id)
    .single();

  const durationMonths = org?.commission_duration_months || 12;
  const now = new Date();
  const acceptanceDeadline = new Date(now);
  acceptanceDeadline.setDate(acceptanceDeadline.getDate() + 150);

  const commissionEndDate = new Date(now);
  commissionEndDate.setMonth(commissionEndDate.getMonth() + durationMonths);

  // Update lead
  await supabase
    .from("leads")
    .update({
      status: "qualified",
      qualified_at: now.toISOString(),
      acceptance_deadline: acceptanceDeadline.toISOString(),
      commission_end_date: commissionEndDate.toISOString(),
      approval_token: null,
      updated_at: now.toISOString(),
    })
    .eq("id", lead.id);

  // Log to audit
  await logAudit({
    action: "APPROVE_LEAD",
    targetType: "lead",
    targetId: lead.id,
    metadata: { via: "email_link" },
  });

  // Log to lead activity
  await supabase.from("lead_activity").insert({
    lead_id: lead.id,
    author_type: "apaly_team",
    content: `Lead approved via email. 150-day acceptance window started. Deadline: ${acceptanceDeadline.toLocaleDateString()}.`,
    activity_type: "approval",
  });

  // Notify partner
  if (org?.notification_email) {
    const emailContent = leadApprovedToPartnerEmail({
      companyName: lead.prospect_company_name,
      partnerContactName: org.company_name,
      deadlineDate: acceptanceDeadline.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      leadId: lead.id,
    });
    await sendEmail({
      to: org.notification_email,
      subject: emailContent.subject,
      html: emailContent.html,
    }).catch(console.error);
  }

  return htmlPage(
    "Lead Approved",
    `The 150-day acceptance window has started. Deadline: ${acceptanceDeadline.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`,
    true
  );
}
