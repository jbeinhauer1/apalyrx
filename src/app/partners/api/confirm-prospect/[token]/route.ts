import { NextRequest, NextResponse } from "next/server";
import { createPartnerAdminClient } from "@/lib/partners/supabase/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  if (!token) {
    return htmlResponse("Invalid Link", "No confirmation token provided.", false);
  }

  const supabase = createPartnerAdminClient();

  const { data: lead } = await supabase
    .from("leads")
    .select("id, prospect_company_name, prospect_confirmed_at, prospect_consent_token_expires_at")
    .eq("prospect_consent_token", token)
    .maybeSingle();

  if (!lead) {
    return htmlResponse("Invalid Link", "This confirmation link is not valid or has already been used.", false);
  }

  // Already confirmed
  if (lead.prospect_confirmed_at) {
    return htmlResponse(
      "Already Confirmed",
      `Your referral for <strong>${lead.prospect_company_name}</strong> has already been confirmed. Thank you!`,
      true
    );
  }

  // Check expiry
  if (lead.prospect_consent_token_expires_at && new Date(lead.prospect_consent_token_expires_at) < new Date()) {
    return htmlResponse("Link Expired", "This confirmation link has expired. Please contact your referral partner for a new link.", false);
  }

  // Mark as confirmed
  await supabase
    .from("leads")
    .update({
      prospect_confirmed_at: new Date().toISOString(),
      prospect_consent_token: null,
      prospect_consent_token_expires_at: null,
    })
    .eq("id", lead.id);

  // Log activity
  await supabase.from("lead_activity").insert({
    lead_id: lead.id,
    action: "prospect_confirmed",
    details: "Prospect confirmed the referral via email link.",
    performed_by: null,
  });

  return htmlResponse(
    "Referral Confirmed",
    `Thank you for confirming the referral for <strong>${lead.prospect_company_name}</strong>. The ApalyRx team will be in touch.`,
    true
  );
}

function htmlResponse(title: string, message: string, success: boolean) {
  const iconColor = success ? "#16a34a" : "#dc2626";
  const iconPath = success
    ? '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2"/>'
    : '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 9l-6 6M9 9l6 6" fill="none" stroke="currentColor" stroke-width="2"/>';

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ApalyRx</title>
  <style>
    body { margin:0; padding:0; background:#f4f5f7; font-family:Arial,Helvetica,sans-serif; }
    .container { max-width:480px; margin:80px auto; padding:32px; background:#fff; border-radius:12px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.1); }
    h1 { color:#102a4c; font-size:24px; margin:16px 0 8px; }
    p { color:#374151; font-size:14px; line-height:1.6; }
    .icon { color:${iconColor}; margin-bottom:8px; }
  </style>
</head>
<body>
  <div class="container">
    <svg class="icon" width="48" height="48" viewBox="0 0 24 24">${iconPath}</svg>
    <h1>${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
