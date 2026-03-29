"use strict";(()=>{var t={};t.id=5678,t.ids=[5678],t.modules={20399:t=>{t.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:t=>{t.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:t=>{t.exports=require("node:crypto")},50254:(t,e,r)=>{r.r(e),r.d(e,{originalPathname:()=>x,patchFetch:()=>b,requestAsyncStorage:()=>u,routeModule:()=>h,serverHooks:()=>f,staticGenerationAsyncStorage:()=>y});var a={};r.r(a),r.d(a,{GET:()=>g});var n=r(49303),o=r(88716),i=r(60670),p=r(87070),s=r(14317),d=r(28218),l=r(7411),c=r(39026);function m(t,e,r){return new p.NextResponse(`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${t}</title></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="background:#fff;border-radius:12px;padding:48px;max-width:480px;width:90%;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <div style="font-size:48px;margin-bottom:16px;">${r?"&#10003;":"&#10060;"}</div>
    <h1 style="color:#102a4c;font-size:24px;margin:0 0 12px;">${t}</h1>
    <p style="color:#6b7280;font-size:14px;line-height:1.6;">${e}</p>
    <a href="/partners/admin/partners" style="display:inline-block;margin-top:20px;padding:10px 24px;background:#ff5e00;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">Go to Admin Portal</a>
  </div>
</body>
</html>`,{status:200,headers:{"Content-Type":"text/html"}})}async function g(t,{params:e}){let{token:r}=e,a=(0,s.G)(),{data:n}=await a.from("partner_organizations").select("id, company_name, partner_code, notification_email, status, approval_token_expires_at").eq("approval_token",r).eq("status","pending").maybeSingle();if(!n)return m("Action Already Completed","This action has already been completed. To make changes to this partner account, log in to the Admin Portal.",!1);if(n.approval_token_expires_at&&new Date(n.approval_token_expires_at)<new Date)return m("Link Expired","This link has expired. Log in to the Admin Portal to manage this partner account.",!1);await a.from("partner_organizations").update({approval_token:null,approval_token_expires_at:null}).eq("id",n.id);let o=new Date().toISOString();await a.from("partner_organizations").update({status:"active",setup_complete:!0,approved_at:o,updated_at:o}).eq("id",n.id),await (0,d.A)({action:"APPROVE_PARTNER",targetType:"partner_organization",targetId:n.id,metadata:{via:"email_link"}});let{data:i}=await a.from("partner_users").select("first_name, email").eq("organization_id",n.id).eq("role","partner_admin").maybeSingle(),p=n.notification_email||i?.email;if(p){let t=(0,c.fP)({contactName:i?.first_name||n.company_name,partnerCode:n.partner_code});await (0,l.C)({to:p,subject:t.subject,html:t.html}).catch(console.error)}return m("Partner Approved",`<strong>${n.company_name}</strong> has been approved and notified. They can now log in to the partner portal.`,!0)}let h=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/partners/api/approve-partner/[token]/route",pathname:"/partners/api/approve-partner/[token]",filename:"route",bundlePath:"app/partners/api/approve-partner/[token]/route"},resolvedPagePath:"C:\\Projects\\apalyrx\\src\\app\\partners\\api\\approve-partner\\[token]\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:u,staticGenerationAsyncStorage:y,serverHooks:f}=h,x="/partners/api/approve-partner/[token]/route";function b(){return(0,i.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:y})}},28218:(t,e,r)=>{r.d(e,{A:()=>n});var a=r(14317);async function n({actorId:t,actorEmail:e,action:r,targetType:n,targetId:o,metadata:i,ipAddress:p}){let s=(0,a.G)();await s.from("audit_log").insert({actor_id:t,actor_email:e,action:r,target_type:n,target_id:o,metadata:i,ip_address:p})}},7411:(t,e,r)=>{r.d(e,{C:()=>i,p:()=>p});var a=r(82591),n=r(14317);let o=new a.R(process.env.RESEND_API_KEY);async function i({to:t,subject:e,html:r}){let a=Array.isArray(t)?t:[t];await o.emails.send({from:"ApalyRx <noreply@apalyrx.com>",to:a,subject:e,html:r})}async function p(t){let e=(0,n.G)(),{data:r}=await e.from("admin_notification_settings").select("email_list, enabled").eq("event_type",t).single();return r?.enabled&&r.email_list?.length?r.email_list:[]}},39026:(t,e,r)=>{r.d(e,{Df:()=>d,Fo:()=>p,G$:()=>u,Mx:()=>l,WO:()=>i,aS:()=>c,fP:()=>s,iU:()=>h,nh:()=>y,wA:()=>g,xS:()=>m});let a="https://www.apalyrx.com";function n(t){return`
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
</html>`}function o(t,e,r="#ff5e00"){return`<a href="${e}" style="display:inline-block;background:${r};color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">${t}</a>`}function i(t){return{subject:"Verify Your ApalyRx Partner Account",html:n(`
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
    `)}}function p(t){let e=t.parentOrgName?`<div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:6px;padding:12px 16px;margin-bottom:20px;">
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
        <a href="${a}/partners/admin/partners/${t.partnerId}" style="font-size:12px;color:#6b7280;text-decoration:underline;">View account details in portal</a>
      </div>
    `)}}function s(t){return{subject:"Your ApalyRx Partner Account is Approved",html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Welcome to ApalyRx!</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${t.contactName},<br><br>
        Your partner account has been approved. You can now log in to your dashboard, submit leads, and share your referral link.
      </p>
      <p style="font-size:14px;color:#374151;">
        <strong>Your Partner Code:</strong> ${t.partnerCode}<br>
        <strong>Your Referral Link:</strong> ${a}/partners/${t.partnerCode}
      </p>
      <div style="margin-top:24px;">
        ${o("Go to Your Dashboard",`${a}/partners/dashboard`)}
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
        ${o("View Your Leads",`${a}/partners/leads`)}
      </div>
    `)}}function m(t){return{subject:`Lead Approved — ${t.companyName}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Lead Approved</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${t.partnerContactName},<br><br>
        <strong>${t.companyName}</strong> has been qualified. The 150-day acceptance window has started.<br><br>
        <strong>Acceptance Deadline:</strong> ${t.deadlineDate}
      </p>
      <div style="margin-top:24px;">
        ${o("View Lead",`${a}/partners/leads/${t.leadId}`)}
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
    `)}}function u(t){return{subject:`You're invited to join the ApalyRx Partner Program via ${t.parentCompanyName}`,html:n(`
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
    `)}}function y(t){return{subject:`🎉 ${t.prospectCompanyName} is now an ApalyRx customer!`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Customer Confirmed</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${t.partnerContactName},<br><br>
        Great news! <strong>${t.prospectCompanyName}</strong> is now an active ApalyRx customer.<br><br>
        Your commission term runs from <strong>${t.commissionStart}</strong> to <strong>${t.commissionEnd}</strong>.${t.feeScheduleName?`<br><br><strong>Fee Schedule:</strong> ${t.feeScheduleName}`:""}<br><br>
        You can view your commission details in the partner portal.
      </p>
      <div style="margin-top:24px;">
        ${o("View Commissions",`${a}/partners/commissions`)}
      </div>
    `)}}},14317:(t,e,r)=>{r.d(e,{G:()=>n});var a=r(37857);function n(){return(0,a.eI)(process.env.PARTNER_SUPABASE_URL,process.env.PARTNER_SUPABASE_SERVICE_ROLE_KEY)}}};var e=require("../../../../../webpack-runtime.js");e.C(t);var r=t=>e(e.s=t),a=e.X(0,[8948,5972,7857,2591],()=>r(50254));module.exports=a})();