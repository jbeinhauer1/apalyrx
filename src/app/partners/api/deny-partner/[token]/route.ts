import { NextRequest, NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { logAudit } from "@/lib/partners/audit";
import { sendEmail } from "@/lib/partners/emails/send";
import { partnerDeniedEmail } from "@/lib/partners/emails/templates";

function htmlPage(content: string) {
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ApalyRx - Partner Review</title>
<style>
body{margin:0;padding:0;background:#f4f5f7;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;}
.card{background:#fff;border-radius:12px;padding:48px;max-width:480px;width:90%;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);}
textarea{width:100%;padding:12px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;resize:vertical;min-height:80px;box-sizing:border-box;}
.deny-btn{display:inline-block;background:#dc2626;color:#fff;border:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:bold;cursor:pointer;margin-top:12px;}
.deny-btn:hover{background:#b91c1c;}
h1{color:#102a4c;font-size:24px;margin:0 0 12px;}
p{color:#6b7280;font-size:14px;line-height:1.6;}
</style></head>
<body><div class="card">${content}</div></body>
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

  // Look up org by token — don't filter by status so we can handle
  // both pending (show form) and already-denied (show confirmation)
  const { data: org } = await supabase
    .from("partner_organizations")
    .select("id, company_name, status, approval_token_expires_at")
    .eq("approval_token", token)
    .maybeSingle();

  if (!org) {
    return htmlPage(`
      <div style="font-size:48px;margin-bottom:16px;">&#10060;</div>
      <h1>Invalid or Expired Link</h1>
      <p>This link has already been used or has expired.</p>
    `);
  }

  // Already processed — show confirmation instead of error
  if (org.status !== "pending") {
    return htmlPage(`
      <div style="font-size:48px;margin-bottom:16px;">&#10003;</div>
      <h1>Application Denied</h1>
      <p><strong>${org.company_name}</strong> has been denied.<br/>The applicant has been notified by email.</p>
    `);
  }

  // Check expiration
  if (
    org.approval_token_expires_at &&
    new Date(org.approval_token_expires_at) < new Date()
  ) {
    return htmlPage(`
      <div style="font-size:48px;margin-bottom:16px;">&#10060;</div>
      <h1>Link Expired</h1>
      <p>This approval link has expired. Please review the partner in the admin portal.</p>
    `);
  }

  // Show denial form
  return htmlPage(`
    <h1>Deny Partner</h1>
    <p style="margin-bottom:16px;"><strong>${org.company_name}</strong></p>
    <form method="POST" action="/partners/api/deny-partner/${token}">
      <textarea name="reason" placeholder="Reason for denial (optional)"></textarea>
      <br/>
      <button type="submit" class="deny-btn">Confirm Denial</button>
    </form>
  `);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;
  const supabase = createPartnerAdminClient();

  // Parse form data
  const formData = await request.formData();
  const reason = (formData.get("reason") as string) || "";

  // Look up org by token without status filter
  const { data: org } = await supabase
    .from("partner_organizations")
    .select("id, company_name, status, notification_email")
    .eq("approval_token", token)
    .maybeSingle();

  if (!org) {
    return htmlPage(`
      <div style="font-size:48px;margin-bottom:16px;">&#10060;</div>
      <h1>Invalid or Expired Link</h1>
      <p>This link has already been used or has expired.</p>
    `);
  }

  // Already processed — show confirmation (idempotent)
  if (org.status !== "pending") {
    return htmlPage(`
      <div style="font-size:48px;margin-bottom:16px;">&#10003;</div>
      <h1>Application Denied</h1>
      <p><strong>${org.company_name}</strong> has been denied.<br/>The applicant has been notified by email.</p>
    `);
  }

  const now = new Date();

  // Update partner status — keep approval_token so GET can show confirmation
  await supabase
    .from("partner_organizations")
    .update({
      status: "suspended",
      approval_token_expires_at: null,
      updated_at: now.toISOString(),
    })
    .eq("id", org.id);

  // Log to audit
  await logAudit({
    action: "DENY_PARTNER",
    targetType: "partner_organization",
    targetId: org.id,
    metadata: { reason, via: "email_link" },
  });

  // Get partner contact info
  const { data: partnerUser } = await supabase
    .from("partner_users")
    .select("first_name, email")
    .eq("organization_id", org.id)
    .eq("role", "partner_admin")
    .maybeSingle();

  // Send denial email to partner
  const notifyEmail = org.notification_email || partnerUser?.email;
  if (notifyEmail) {
    const emailContent = partnerDeniedEmail({
      contactName: partnerUser?.first_name || org.company_name,
      reason,
    });
    await sendEmail({
      to: notifyEmail,
      subject: emailContent.subject,
      html: emailContent.html,
    }).catch(console.error);
  }

  return htmlPage(`
    <div style="font-size:48px;margin-bottom:16px;">&#10003;</div>
    <h1>Application Denied</h1>
    <p><strong>${org.company_name}</strong> has been denied.<br/>The applicant has been notified by email.${reason ? `<br/><br/><strong>Reason:</strong> ${reason}` : ""}</p>
  `);
}
