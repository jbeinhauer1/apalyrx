import { NextRequest, NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { logAudit } from "@/lib/partners/audit";
import { sendEmail } from "@/lib/partners/emails/send";
import { partnerApprovedEmail } from "@/lib/partners/emails/templates";

function htmlPage(title: string, message: string, success: boolean) {
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="background:#fff;border-radius:12px;padding:48px;max-width:480px;width:90%;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <div style="font-size:48px;margin-bottom:16px;">${success ? "&#10003;" : "&#10060;"}</div>
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

  // Look up org by token — don't filter by status so we can handle
  // both pending (process) and already-approved (show confirmation)
  const { data: org } = await supabase
    .from("partner_organizations")
    .select("id, company_name, partner_code, notification_email, status, approval_token_expires_at")
    .eq("approval_token", token)
    .maybeSingle();

  if (!org) {
    return htmlPage(
      "Invalid or Expired Link",
      "This approval link has already been used or has expired.",
      false
    );
  }

  // Already processed — show confirmation instead of error
  if (org.status !== "pending") {
    return htmlPage(
      "Partner Already Approved",
      `<strong>${org.company_name}</strong> has already been approved.`,
      true
    );
  }

  // Check expiration
  if (
    org.approval_token_expires_at &&
    new Date(org.approval_token_expires_at) < new Date()
  ) {
    return htmlPage(
      "Link Expired",
      "This approval link has expired. Please review the partner in the admin portal.",
      false
    );
  }

  // Get partner contact info
  const { data: partnerUser } = await supabase
    .from("partner_users")
    .select("first_name, last_name, email")
    .eq("organization_id", org.id)
    .eq("role", "partner_admin")
    .maybeSingle();

  const now = new Date();

  // Approve the partner — keep approval_token so revisits show confirmation
  await supabase
    .from("partner_organizations")
    .update({
      status: "active",
      setup_complete: true,
      approved_at: now.toISOString(),
      approval_token_expires_at: null,
      updated_at: now.toISOString(),
    })
    .eq("id", org.id);

  // Log to audit
  await logAudit({
    action: "APPROVE_PARTNER",
    targetType: "partner_organization",
    targetId: org.id,
    metadata: { via: "email_link" },
  });

  // Send approval email to partner
  const notifyEmail = org.notification_email || partnerUser?.email;
  if (notifyEmail) {
    const emailContent = partnerApprovedEmail({
      contactName: partnerUser?.first_name || org.company_name,
      partnerCode: org.partner_code,
    });
    await sendEmail({
      to: notifyEmail,
      subject: emailContent.subject,
      html: emailContent.html,
    }).catch(console.error);
  }

  return htmlPage(
    "Partner Approved",
    `<strong>${org.company_name}</strong> has been approved and notified. They can now log in to the partner portal.`,
    true
  );
}
