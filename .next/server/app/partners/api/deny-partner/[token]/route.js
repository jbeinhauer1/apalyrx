"use strict";(()=>{var t={};t.id=3258,t.ids=[3258],t.modules={20399:t=>{t.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:t=>{t.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:t=>{t.exports=require("node:crypto")},79046:(t,e,a)=>{a.r(e),a.d(e,{originalPathname:()=>b,patchFetch:()=>v,requestAsyncStorage:()=>u,routeModule:()=>y,serverHooks:()=>x,staticGenerationAsyncStorage:()=>f});var r={};a.r(r),a.d(r,{GET:()=>g,POST:()=>h});var n=a(49303),o=a(88716),i=a(60670),s=a(87070),p=a(14317),d=a(28218),l=a(7411),c=a(39026);function m(t){return new s.NextResponse(`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ApalyRx - Partner Review</title>
<style>
body{margin:0;padding:0;background:#f4f5f7;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;}
.card{background:#fff;border-radius:12px;padding:48px;max-width:480px;width:90%;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);}
textarea{width:100%;padding:12px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;resize:vertical;min-height:80px;box-sizing:border-box;}
.deny-btn{display:inline-block;background:#dc2626;color:#fff;border:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:bold;cursor:pointer;margin-top:12px;}
.deny-btn:hover{background:#b91c1c;}
.admin-btn{display:inline-block;margin-top:20px;padding:10px 24px;background:#ff5e00;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;}
h1{color:#102a4c;font-size:24px;margin:0 0 12px;}
p{color:#6b7280;font-size:14px;line-height:1.6;}
</style></head>
<body><div class="card">${t}</div></body>
</html>`,{status:200,headers:{"Content-Type":"text/html"}})}async function g(t,{params:e}){let{token:a}=e,r=(0,p.G)(),{data:n}=await r.from("partner_organizations").select("id, company_name, status, approval_token_expires_at").eq("approval_token",a).eq("status","pending").maybeSingle();return n?n.approval_token_expires_at&&new Date(n.approval_token_expires_at)<new Date?m(`
      <div style="font-size:48px;margin-bottom:16px;">&#10060;</div>
      <h1>Link Expired</h1>
      <p>This link has expired. Log in to the Admin Portal to manage this partner account.</p>
      <a href="/partners/admin/partners" class="admin-btn">Go to Admin Portal</a>
    `):(await r.from("partner_organizations").update({approval_token:null,approval_token_expires_at:null}).eq("id",n.id),m(`
    <h1>Deny Partner</h1>
    <p style="margin-bottom:16px;"><strong>${n.company_name}</strong></p>
    <form method="POST" action="/partners/api/deny-partner/${a}">
      <input type="hidden" name="orgId" value="${n.id}" />
      <textarea name="reason" placeholder="Reason for denial (optional)"></textarea>
      <br/>
      <button type="submit" class="deny-btn">Confirm Denial</button>
    </form>
  `)):m(`
      <div style="font-size:48px;margin-bottom:16px;">&#10060;</div>
      <h1>Action Already Completed</h1>
      <p>This action has already been completed. To make changes to this partner account, log in to the Admin Portal.</p>
      <a href="/partners/admin/partners" class="admin-btn">Go to Admin Portal</a>
    `)}async function h(t){let e=(0,p.G)(),a=await t.formData(),r=a.get("reason")||"",n=a.get("orgId");if(!n)return m(`
      <div style="font-size:48px;margin-bottom:16px;">&#10060;</div>
      <h1>Action Already Completed</h1>
      <p>This action has already been completed. To make changes to this partner account, log in to the Admin Portal.</p>
      <a href="/partners/admin/partners" class="admin-btn">Go to Admin Portal</a>
    `);let{data:o}=await e.from("partner_organizations").select("id, company_name, notification_email, status").eq("id",n).eq("status","pending").maybeSingle();if(!o)return m(`
      <div style="font-size:48px;margin-bottom:16px;">&#10060;</div>
      <h1>Action Already Completed</h1>
      <p>This action has already been completed. To make changes to this partner account, log in to the Admin Portal.</p>
      <a href="/partners/admin/partners" class="admin-btn">Go to Admin Portal</a>
    `);let i=new Date().toISOString();await e.from("partner_organizations").update({status:"denied",updated_at:i}).eq("id",o.id),await (0,d.A)({action:"DENY_PARTNER",targetType:"partner_organization",targetId:o.id,metadata:{reason:r,via:"email_link"}});let{data:s}=await e.from("partner_users").select("first_name, email").eq("organization_id",o.id).eq("role","partner_admin").maybeSingle(),g=o.notification_email||s?.email;if(g){let t=(0,c.Df)({contactName:s?.first_name||o.company_name,reason:r});await (0,l.C)({to:g,subject:t.subject,html:t.html}).catch(console.error)}return m(`
    <div style="font-size:48px;margin-bottom:16px;">&#10003;</div>
    <h1>Partner Denied</h1>
    <p><strong>${o.company_name}</strong> has been denied.<br/>The partner has been notified by email.${r?`<br/><br/><strong>Reason:</strong> ${r}`:""}</p>
    <a href="/partners/admin/partners" class="admin-btn">Go to Admin Portal</a>
  `)}let y=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/partners/api/deny-partner/[token]/route",pathname:"/partners/api/deny-partner/[token]",filename:"route",bundlePath:"app/partners/api/deny-partner/[token]/route"},resolvedPagePath:"C:\\Projects\\apalyrx\\src\\app\\partners\\api\\deny-partner\\[token]\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:u,staticGenerationAsyncStorage:f,serverHooks:x}=y,b="/partners/api/deny-partner/[token]/route";function v(){return(0,i.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:f})}},28218:(t,e,a)=>{a.d(e,{A:()=>n});var r=a(14317);async function n({actorId:t,actorEmail:e,action:a,targetType:n,targetId:o,metadata:i,ipAddress:s}){let p=(0,r.G)();await p.from("audit_log").insert({actor_id:t,actor_email:e,action:a,target_type:n,target_id:o,metadata:i,ip_address:s})}},7411:(t,e,a)=>{a.d(e,{C:()=>i,p:()=>s});var r=a(82591),n=a(14317);let o=new r.R(process.env.RESEND_API_KEY);async function i({to:t,subject:e,html:a}){let r=Array.isArray(t)?t:[t];await o.emails.send({from:"ApalyRx <noreply@apalyrx.com>",to:r,subject:e,html:a})}async function s(t){let e=(0,n.G)(),{data:a}=await e.from("admin_notification_settings").select("email_list, enabled").eq("event_type",t).single();return a?.enabled&&a.email_list?.length?a.email_list:[]}},39026:(t,e,a)=>{a.d(e,{Df:()=>d,Fo:()=>s,G$:()=>y,Mx:()=>l,WO:()=>i,aS:()=>c,fP:()=>p,iU:()=>h,nh:()=>u,wA:()=>g,xS:()=>m});let r="https://www.apalyrx.com";function n(t){return`
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
            <img src="https://www.apalyrx.com/apalyrx-logo-white-orange.png" alt="ApalyRx" width="120" height="33" style="display:inline-block;height:33px;width:auto;vertical-align:middle;">
            <span style="color:#ff5e00;font-size:14px;margin-left:8px;vertical-align:middle;">Partner Portal</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            ${t}
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
</html>`}function o(t,e,a="#ff5e00"){return`<a href="${e}" style="display:inline-block;background:${a};color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">${t}</a>`}function i(t){return{subject:"Verify Your ApalyRx Partner Account",html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Verify Your Email</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${t.contactName},
      </p>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Welcome to the ApalyRx Channel Partner Program. Please verify your email address to continue.
      </p>
      <div style="margin:24px 0;">
        ${o("Verify Email",t.confirmationUrl)}
      </div>
      <p style="font-size:12px;color:#6b7280;line-height:1.5;">
        If you didn&rsquo;t create this account, you can safely ignore this email.
      </p>
    `)}}function s(t){let e=t.parentOrgName?`<div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:6px;padding:12px 16px;margin-bottom:20px;">
        <div style="font-size:14px;font-weight:bold;color:#92400e;">Sub-Organization Signup</div>
        <div style="font-size:14px;color:#78350f;margin-top:4px;">Sub-Org: <strong>${t.companyName}</strong></div>
        <div style="font-size:14px;color:#78350f;">Invited by: <strong>${t.parentOrgName}</strong></div>
      </div>`:"";return{subject:`New Channel Partner Account — ${t.companyName}${t.parentOrgName?` (sub-org of ${t.parentOrgName})`:""}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Partner Account</h2>
      ${e}
      <table style="width:100%;font-size:14px;color:#374151;">
        <tr><td style="padding:6px 0;font-weight:bold;width:140px;">Contact:</td><td>${t.contactName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Company:</td><td>${t.companyName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Email:</td><td>${t.email}</td></tr>
        ${t.ein?`<tr><td style="padding:6px 0;font-weight:bold;">EIN:</td><td>${t.ein}</td></tr>`:""}
        ${t.parentOrgName?`<tr><td style="padding:6px 0;font-weight:bold;">Parent Org:</td><td>${t.parentOrgName}</td></tr>`:""}
        <tr><td style="padding:6px 0;font-weight:bold;">Registered:</td><td>${t.registeredAt}</td></tr>
      </table>
      <div style="margin-top:24px;">
        ${o("Approve Partner",t.approveUrl,"#16a34a")}
        &nbsp;&nbsp;
        ${o("Deny Partner",t.denyUrl,"#dc2626")}
      </div>
      <div style="margin-top:16px;">
        <a href="${r}/partners/admin/partners/${t.partnerId}" style="font-size:12px;color:#6b7280;text-decoration:underline;">View account details in portal</a>
      </div>
    `)}}function p(t){return{subject:"Your ApalyRx Partner Account is Approved",html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Welcome to ApalyRx!</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${t.contactName},<br><br>
        Your partner account has been approved. You can now log in to your dashboard, submit leads, and share your referral link.
      </p>
      <p style="font-size:14px;color:#374151;">
        <strong>Your Partner Code:</strong> ${t.partnerCode}<br>
        <strong>Your Referral Link:</strong> ${r}/partners/${t.partnerCode}
      </p>
      <div style="margin-top:24px;">
        ${o("Go to Your Dashboard",`${r}/partners/dashboard`)}
      </div>
    `)}}function d(t){return{subject:"ApalyRx Partner Account Update",html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Account Update</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${t.contactName},<br><br>
        Thank you for your interest in the ApalyRx Channel Partner Program. After review, we are unable to activate your account at this time.
        ${t.reason?`<br><br><strong>Reason:</strong> ${t.reason}`:""}
        <br><br>
        If you have questions, please contact us at partners@apalyrx.com.
      </p>
    `)}}function l(t){return{subject:`New Lead Submitted — ${t.companyName} (via ${t.partnerName})`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Lead for Review</h2>
      <table style="width:100%;font-size:14px;color:#374151;">
        <tr><td style="padding:6px 0;font-weight:bold;width:140px;">Company:</td><td>${t.companyName}</td></tr>
        ${t.ein?`<tr><td style="padding:6px 0;font-weight:bold;">EIN:</td><td>${t.ein}</td></tr>`:""}
        <tr><td style="padding:6px 0;font-weight:bold;">Contact:</td><td>${t.contactName} (${t.contactEmail})</td></tr>
        ${t.phone?`<tr><td style="padding:6px 0;font-weight:bold;">Phone:</td><td>${t.phone}</td></tr>`:""}
        ${t.estimatedLives?`<tr><td style="padding:6px 0;font-weight:bold;">Est. Lives:</td><td>${t.estimatedLives}</td></tr>`:""}
        ${t.message?`<tr><td style="padding:6px 0;font-weight:bold;">Message:</td><td>${t.message}</td></tr>`:""}
        <tr><td style="padding:6px 0;font-weight:bold;">Partner:</td><td>${t.partnerName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Source:</td><td>${t.source}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Submitted:</td><td>${t.submittedAt}</td></tr>
      </table>
      <div style="margin-top:24px;display:flex;gap:12px;">
        ${o("Approve Lead",t.approveUrl,"#16a34a")}
        &nbsp;&nbsp;
        ${o("Deny Lead",t.denyUrl,"#dc2626")}
      </div>
    `)}}function c(t){return{subject:`New prospect submitted — ${t.companyName}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Prospect Submitted</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${t.partnerContactName},<br><br>
        A prospect (<strong>${t.companyName}</strong>) just submitted through your referral. ApalyRx has been notified and will review within 1-2 business days. We'll email you when a decision is made.
      </p>
      <div style="margin-top:24px;">
        ${o("View Your Leads",`${r}/partners/leads`)}
      </div>
    `)}}function m(t){return{subject:`Lead Approved — ${t.companyName}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Lead Approved</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${t.partnerContactName},<br><br>
        <strong>${t.companyName}</strong> has been qualified. The 150-day acceptance window has started.<br><br>
        <strong>Acceptance Deadline:</strong> ${t.deadlineDate}
      </p>
      <div style="margin-top:24px;">
        ${o("View Lead",`${r}/partners/leads/${t.leadId}`)}
      </div>
    `)}}function g(t){return{subject:`Lead Update — ${t.companyName}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Lead Update</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${t.partnerContactName},<br><br>
        <strong>${t.companyName}</strong> was not accepted at this time.
        ${t.reason?`<br><br><strong>Reason:</strong> ${t.reason}`:""}
        <br><br>
        Feel free to reach out to your ApalyRx contact with any questions.
      </p>
    `)}}function h(t){return{subject:"Confirm Your Referral to ApalyRx",html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Confirm Your Referral</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${t.prospectName},
      </p>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        <strong>${t.partnerCompanyName}</strong> has submitted your organization as a prospect for the ApalyRx prescription drug savings program.
      </p>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Please confirm that you consent to this referral. This helps us ensure all parties are aligned before proceeding.
      </p>
      <div style="margin:24px 0;">
        ${o("Confirm Referral",t.confirmUrl)}
      </div>
      <p style="font-size:12px;color:#6b7280;line-height:1.5;">
        If you did not expect this email or do not wish to proceed, you can safely ignore it. This link expires in 30 days.
      </p>
    `)}}function y(t){return{subject:`You're invited to join the ApalyRx Partner Program via ${t.parentCompanyName}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Partner Program Invitation</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        ${t.inviterName} at <strong>${t.parentCompanyName}</strong> has invited you to join the ApalyRx Channel Partner Program as a sub-organization.
      </p>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        As a sub-organization partner, you'll be able to submit leads, track commissions, and access the full partner portal.
      </p>
      <div style="margin:24px 0;">
        ${o("Accept Invitation",t.inviteUrl)}
      </div>
      <p style="font-size:12px;color:#6b7280;line-height:1.5;">
        This invitation expires in 30 days. If you didn&rsquo;t expect this email, you can safely ignore it.
      </p>
    `)}}function u(t){return{subject:`🎉 ${t.prospectCompanyName} is now an ApalyRx customer!`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Customer Confirmed</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${t.partnerContactName},<br><br>
        Great news! <strong>${t.prospectCompanyName}</strong> is now an active ApalyRx customer.<br><br>
        Your commission term runs from <strong>${t.commissionStart}</strong> to <strong>${t.commissionEnd}</strong>.${t.feeScheduleName?`<br><br><strong>Fee Schedule:</strong> ${t.feeScheduleName}`:""}<br><br>
        You can view your commission details in the partner portal.
      </p>
      <div style="margin-top:24px;">
        ${o("View Commissions",`${r}/partners/commissions`)}
      </div>
    `)}}},14317:(t,e,a)=>{a.d(e,{G:()=>n});var r=a(37857);function n(){return(0,r.eI)(process.env.PARTNER_SUPABASE_URL,process.env.PARTNER_SUPABASE_SERVICE_ROLE_KEY)}}};var e=require("../../../../../webpack-runtime.js");e.C(t);var a=t=>e(e.s=t),r=e.X(0,[8948,5972,7857,2591],()=>a(79046));module.exports=r})();