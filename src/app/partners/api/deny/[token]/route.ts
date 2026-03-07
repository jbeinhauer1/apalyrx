import { NextRequest, NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";
import { logAudit } from "@/lib/partners/audit";
import { sendEmail } from "@/lib/partners/emails/send";
import { leadDeniedToPartnerEmail } from "@/lib/partners/emails/templates";

function htmlPage(content: string) {
  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ApalyRx - Lead Review</title>
<style>
body{margin:0;padding:0;background:#f4f5f7;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;}
.card{background:#fff;border-radius:12px;padding:48px;max-width:480px;width:90%;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);}
textarea{width:100%;padding:12px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;resize:vertical;min-height:80px;box-sizing:border-box;}
button{background:#dc2626;color:#fff;border:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:bold;cursor:pointer;margin-top:12px;}
button:hover{background:#b91c1c;}
h1{color:#102a4c;font-size:24px;margin:0 0 12px;}
p{color:#6b7280;font-size:14px;}
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

  // Validate token
  const { data: lead } = await supabase
    .from("leads")
    .select("id, prospect_company_name")
    .eq("approval_token", token)
    .eq("status", "pending")
    .single();

  if (!lead) {
    return htmlPage(`
      <div style="font-size:48px;margin-bottom:16px;">❌</div>
      <h1>Invalid or Expired Link</h1>
      <p>This link has already been used or has expired.</p>
    `);
  }

  return htmlPage(`
    <h1>Deny Lead</h1>
    <p style="margin-bottom:16px;"><strong>${lead.prospect_company_name}</strong></p>
    <form method="POST">
      <textarea name="reason" placeholder="Reason for denial (optional)"></textarea>
      <br/>
      <button type="submit">Confirm Denial</button>
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

  // Validate token
  const { data: lead } = await supabase
    .from("leads")
    .select("id, organization_id, prospect_company_name")
    .eq("approval_token", token)
    .eq("status", "pending")
    .single();

  if (!lead) {
    return htmlPage(`
      <div style="font-size:48px;margin-bottom:16px;">❌</div>
      <h1>Invalid or Expired Link</h1>
      <p>This link has already been used or has expired.</p>
    `);
  }

  // Update lead
  await supabase
    .from("leads")
    .update({
      status: "denied",
      denial_reason: reason || null,
      approval_token: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", lead.id);

  // Log to audit
  await logAudit({
    action: "DENY_LEAD",
    targetType: "lead",
    targetId: lead.id,
    metadata: { reason, via: "email_link" },
  });

  // Log to activity
  await supabase.from("lead_activity").insert({
    lead_id: lead.id,
    author_type: "apaly_team",
    content: `Lead denied via email.${reason ? ` Reason: ${reason}` : ""}`,
    activity_type: "status_change",
  });

  // Notify partner
  const { data: org } = await supabase
    .from("partner_organizations")
    .select("notification_email, company_name")
    .eq("id", lead.organization_id)
    .single();

  if (org?.notification_email) {
    const emailContent = leadDeniedToPartnerEmail({
      companyName: lead.prospect_company_name,
      partnerContactName: org.company_name,
      reason,
    });
    await sendEmail({
      to: org.notification_email,
      subject: emailContent.subject,
      html: emailContent.html,
    }).catch(console.error);
  }

  return htmlPage(`
    <div style="font-size:48px;margin-bottom:16px;">✓</div>
    <h1>Lead Denied</h1>
    <p>${lead.prospect_company_name} has been denied.${reason ? ` Reason: ${reason}` : ""}</p>
  `);
}
