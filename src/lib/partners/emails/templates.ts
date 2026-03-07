const baseUrl = "https://www.apalyrx.com";

function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background:#102a4c;padding:24px 32px;">
            <span style="color:#ffffff;font-size:20px;font-weight:bold;">ApalyRx</span>
            <span style="color:#ff5e00;font-size:14px;margin-left:8px;">Partner Portal</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            ${content}
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;background:#f8f9fb;color:#6b7280;font-size:12px;text-align:center;">
            &copy; 2026 ApalyRx &middot; noreply@apalyrx.com
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function ctaButton(
  text: string,
  url: string,
  color: string = "#ff5e00"
): string {
  return `<a href="${url}" style="display:inline-block;background:${color};color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">${text}</a>`;
}

// Template 1: New Partner Signup Alert (to ApalyRx)
export function newPartnerSignupEmail(data: {
  companyName: string;
  contactName: string;
  email: string;
  ein?: string;
  partnerId: string;
  appliedAt: string;
}) {
  return {
    subject: `New Channel Partner Application — ${data.companyName}`,
    html: emailWrapper(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Partner Application</h2>
      <table style="width:100%;font-size:14px;color:#374151;">
        <tr><td style="padding:6px 0;font-weight:bold;width:140px;">Contact:</td><td>${data.contactName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Company:</td><td>${data.companyName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Email:</td><td>${data.email}</td></tr>
        ${data.ein ? `<tr><td style="padding:6px 0;font-weight:bold;">EIN:</td><td>${data.ein}</td></tr>` : ""}
        <tr><td style="padding:6px 0;font-weight:bold;">Applied:</td><td>${data.appliedAt}</td></tr>
      </table>
      <div style="margin-top:24px;">
        ${ctaButton("Review Application", `${baseUrl}/partners/admin/partners/${data.partnerId}`)}
      </div>
    `),
  };
}

// Template 2: Partner Account Approved (to partner)
export function partnerApprovedEmail(data: {
  contactName: string;
  partnerCode: string;
}) {
  return {
    subject: "Your ApalyRx Partner Account is Approved",
    html: emailWrapper(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Welcome to ApalyRx!</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${data.contactName},<br><br>
        Your partner account has been approved. You can now log in to your dashboard, submit leads, and share your referral link.
      </p>
      <p style="font-size:14px;color:#374151;">
        <strong>Your Partner Code:</strong> ${data.partnerCode}<br>
        <strong>Your Referral Link:</strong> ${baseUrl}/partners/${data.partnerCode}
      </p>
      <div style="margin-top:24px;">
        ${ctaButton("Go to Your Dashboard", `${baseUrl}/partners/dashboard`)}
      </div>
    `),
  };
}

// Template 3: New Lead Approval Request (to ApalyRx notification list)
export function newLeadApprovalEmail(data: {
  companyName: string;
  ein?: string;
  contactName: string;
  contactEmail: string;
  phone?: string;
  estimatedLives?: string;
  message?: string;
  partnerName: string;
  source: string;
  submittedAt: string;
  approveUrl: string;
  denyUrl: string;
}) {
  return {
    subject: `New Lead Submitted — ${data.companyName} (via ${data.partnerName})`,
    html: emailWrapper(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Lead for Review</h2>
      <table style="width:100%;font-size:14px;color:#374151;">
        <tr><td style="padding:6px 0;font-weight:bold;width:140px;">Company:</td><td>${data.companyName}</td></tr>
        ${data.ein ? `<tr><td style="padding:6px 0;font-weight:bold;">EIN:</td><td>${data.ein}</td></tr>` : ""}
        <tr><td style="padding:6px 0;font-weight:bold;">Contact:</td><td>${data.contactName} (${data.contactEmail})</td></tr>
        ${data.phone ? `<tr><td style="padding:6px 0;font-weight:bold;">Phone:</td><td>${data.phone}</td></tr>` : ""}
        ${data.estimatedLives ? `<tr><td style="padding:6px 0;font-weight:bold;">Est. Lives:</td><td>${data.estimatedLives}</td></tr>` : ""}
        ${data.message ? `<tr><td style="padding:6px 0;font-weight:bold;">Message:</td><td>${data.message}</td></tr>` : ""}
        <tr><td style="padding:6px 0;font-weight:bold;">Partner:</td><td>${data.partnerName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Source:</td><td>${data.source}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Submitted:</td><td>${data.submittedAt}</td></tr>
      </table>
      <div style="margin-top:24px;display:flex;gap:12px;">
        ${ctaButton("Approve Lead", data.approveUrl, "#16a34a")}
        &nbsp;&nbsp;
        ${ctaButton("Deny Lead", data.denyUrl, "#dc2626")}
      </div>
    `),
  };
}

// Template 4: Lead Submitted Notification (to partner)
export function leadSubmittedToPartnerEmail(data: {
  companyName: string;
  partnerContactName: string;
}) {
  return {
    subject: `New prospect submitted — ${data.companyName}`,
    html: emailWrapper(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Prospect Submitted</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${data.partnerContactName},<br><br>
        A prospect (<strong>${data.companyName}</strong>) just submitted through your referral. ApalyRx has been notified and will review within 1-2 business days. We'll email you when a decision is made.
      </p>
      <div style="margin-top:24px;">
        ${ctaButton("View Your Leads", `${baseUrl}/partners/leads`)}
      </div>
    `),
  };
}

// Template 5: Lead Approved (to partner)
export function leadApprovedToPartnerEmail(data: {
  companyName: string;
  partnerContactName: string;
  deadlineDate: string;
  leadId: string;
}) {
  return {
    subject: `Lead Approved — ${data.companyName}`,
    html: emailWrapper(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Lead Approved</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${data.partnerContactName},<br><br>
        <strong>${data.companyName}</strong> has been qualified. The 150-day acceptance window has started.<br><br>
        <strong>Acceptance Deadline:</strong> ${data.deadlineDate}
      </p>
      <div style="margin-top:24px;">
        ${ctaButton("View Lead", `${baseUrl}/partners/leads/${data.leadId}`)}
      </div>
    `),
  };
}

// Template 6: Lead Denied (to partner)
export function leadDeniedToPartnerEmail(data: {
  companyName: string;
  partnerContactName: string;
  reason?: string;
}) {
  return {
    subject: `Lead Update — ${data.companyName}`,
    html: emailWrapper(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Lead Update</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${data.partnerContactName},<br><br>
        <strong>${data.companyName}</strong> was not accepted at this time.
        ${data.reason ? `<br><br><strong>Reason:</strong> ${data.reason}` : ""}
        <br><br>
        Feel free to reach out to your ApalyRx contact with any questions.
      </p>
    `),
  };
}

// Template 7: Lead Expiry Warning (to partner)
export function leadExpiryWarningEmail(data: {
  companyName: string;
  partnerContactName: string;
  daysRemaining: number;
  deadlineDate: string;
  leadId: string;
}) {
  return {
    subject: `⚠️ Lead Expiring in ${data.daysRemaining} Days — ${data.companyName}`,
    html: emailWrapper(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Lead Expiring Soon</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${data.partnerContactName},<br><br>
        <strong>${data.companyName}</strong> has <strong>${data.daysRemaining} days remaining</strong> in the acceptance window.<br><br>
        <strong>Deadline:</strong> ${data.deadlineDate}<br><br>
        If the prospect does not become a customer before this date, the lead will expire and will no longer be eligible for commission.
      </p>
      <div style="margin-top:24px;">
        ${ctaButton("View Lead", `${baseUrl}/partners/leads/${data.leadId}`)}
      </div>
    `),
  };
}
