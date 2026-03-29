"use strict";(()=>{var e={};e.id=1509,e.ids=[1509],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},6005:e=>{e.exports=require("node:crypto")},6389:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>b,patchFetch:()=>$,requestAsyncStorage:()=>y,routeModule:()=>h,serverHooks:()=>x,staticGenerationAsyncStorage:()=>f});var a={};r.r(a),r.d(a,{POST:()=>g});var n=r(49303),o=r(88716),i=r(60670),s=r(87070),p=r(84770),l=r.n(p),d=r(14317),c=r(7411),m=r(39026);let u="https://www.apalyrx.com";async function g(e){try{let{partnerCode:t,companyName:r,ein:a,contactName:n,contactEmail:o,phone:i,estimatedLives:p,message:g,submittedByUserId:h}=await e.json();if(!t||!r||!n||!o)return s.NextResponse.json({error:"Missing required fields"},{status:400});let y=(0,d.G)(),{data:f}=await y.from("partner_organizations").select("id, company_name, notification_email, status").eq("partner_code",t).single();if(!f||"active"!==f.status)return s.NextResponse.json({error:"Invalid partner code"},{status:400});if(a){let[e,t]=await Promise.all([y.from("partner_organizations").select("id",{count:"exact",head:!0}).eq("ein",a),y.from("leads").select("id",{count:"exact",head:!0}).eq("prospect_ein",a)]);if((e.count||0)>0||(t.count||0)>0)return s.NextResponse.json({error:"This EIN is already registered in the ApalyRx system. Contact partners@apalyrx.com for assistance."},{status:409})}let x=l().randomBytes(32).toString("hex"),b=new Date;b.setDate(b.getDate()+7);let $=l().randomBytes(32).toString("hex"),v=new Date;v.setDate(v.getDate()+30);let{data:w,error:N}=await y.from("leads").insert({organization_id:f.id,submission_source:h?"portal":"referral_link",prospect_company_name:r,prospect_ein:a||null,prospect_contact_name:n,prospect_contact_email:o,prospect_phone:i||null,prospect_estimated_lives:p||null,prospect_notes:g||null,status:"pending",approval_token:x,approval_token_expires_at:b.toISOString(),assigned_to_user_id:h||null,prospect_consent_token:$,prospect_consent_token_expires_at:v.toISOString()}).select("id").single();if(N)return s.NextResponse.json({error:N.message},{status:500});let _=`${u}/partners/api/approve/${x}`,A=`${u}/partners/api/deny/${x}`,R=await (0,c.p)("new_lead"),P=[];if(R.length>0){let e=(0,m.Mx)({companyName:r,ein:a,contactName:n,contactEmail:o,phone:i,estimatedLives:p,message:g,partnerName:f.company_name,source:"Referral Link",submittedAt:new Date().toLocaleString(),approveUrl:_,denyUrl:A});P.push((0,c.C)({to:R,subject:e.subject,html:e.html}))}if(f.notification_email){let e=(0,m.aS)({companyName:r,partnerContactName:f.company_name});P.push((0,c.C)({to:f.notification_email,subject:e.subject,html:e.html}))}let C=`${u}/partners/api/confirm-prospect/${$}`,z=(0,m.iU)({prospectName:n,partnerCompanyName:f.company_name,confirmUrl:C});return P.push((0,c.C)({to:o,subject:z.subject,html:z.html})),await Promise.allSettled(P),s.NextResponse.json({success:!0,leadId:w.id})}catch(e){return console.error("Referral submission error:",e),s.NextResponse.json({error:"Internal server error"},{status:500})}}let h=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/partners/api/referral/route",pathname:"/partners/api/referral",filename:"route",bundlePath:"app/partners/api/referral/route"},resolvedPagePath:"C:\\Projects\\apalyrx\\src\\app\\partners\\api\\referral\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:y,staticGenerationAsyncStorage:f,serverHooks:x}=h,b="/partners/api/referral/route";function $(){return(0,i.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:f})}},7411:(e,t,r)=>{r.d(t,{C:()=>i,p:()=>s});var a=r(82591),n=r(14317);let o=new a.R(process.env.RESEND_API_KEY);async function i({to:e,subject:t,html:r}){let a=Array.isArray(e)?e:[e];await o.emails.send({from:"ApalyRx <noreply@apalyrx.com>",to:a,subject:t,html:r})}async function s(e){let t=(0,n.G)(),{data:r}=await t.from("admin_notification_settings").select("email_list, enabled").eq("event_type",e).single();return r?.enabled&&r.email_list?.length?r.email_list:[]}},39026:(e,t,r)=>{r.d(t,{Df:()=>l,Fo:()=>s,G$:()=>h,Mx:()=>d,WO:()=>i,aS:()=>c,fP:()=>p,iU:()=>g,nh:()=>y,wA:()=>u,xS:()=>m});let a="https://www.apalyrx.com";function n(e){return`
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
            ${e}
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
</html>`}function o(e,t,r="#ff5e00"){return`<a href="${t}" style="display:inline-block;background:${r};color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">${e}</a>`}function i(e){return{subject:"Verify Your ApalyRx Partner Account",html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Verify Your Email</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.contactName},
      </p>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Welcome to the ApalyRx Channel Partner Program. Please verify your email address to continue.
      </p>
      <div style="margin:24px 0;">
        ${o("Verify Email",e.confirmationUrl)}
      </div>
      <p style="font-size:12px;color:#6b7280;line-height:1.5;">
        If you didn&rsquo;t create this account, you can safely ignore this email.
      </p>
    `)}}function s(e){let t=e.parentOrgName?`<div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:6px;padding:12px 16px;margin-bottom:20px;">
        <div style="font-size:14px;font-weight:bold;color:#92400e;">Sub-Organization Signup</div>
        <div style="font-size:14px;color:#78350f;margin-top:4px;">Sub-Org: <strong>${e.companyName}</strong></div>
        <div style="font-size:14px;color:#78350f;">Invited by: <strong>${e.parentOrgName}</strong></div>
      </div>`:"";return{subject:`New Channel Partner Account — ${e.companyName}${e.parentOrgName?` (sub-org of ${e.parentOrgName})`:""}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Partner Account</h2>
      ${t}
      <table style="width:100%;font-size:14px;color:#374151;">
        <tr><td style="padding:6px 0;font-weight:bold;width:140px;">Contact:</td><td>${e.contactName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Company:</td><td>${e.companyName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Email:</td><td>${e.email}</td></tr>
        ${e.ein?`<tr><td style="padding:6px 0;font-weight:bold;">EIN:</td><td>${e.ein}</td></tr>`:""}
        ${e.parentOrgName?`<tr><td style="padding:6px 0;font-weight:bold;">Parent Org:</td><td>${e.parentOrgName}</td></tr>`:""}
        <tr><td style="padding:6px 0;font-weight:bold;">Registered:</td><td>${e.registeredAt}</td></tr>
      </table>
      <div style="margin-top:24px;">
        ${o("Approve Partner",e.approveUrl,"#16a34a")}
        &nbsp;&nbsp;
        ${o("Deny Partner",e.denyUrl,"#dc2626")}
      </div>
      <div style="margin-top:16px;">
        <a href="${a}/partners/admin/partners/${e.partnerId}" style="font-size:12px;color:#6b7280;text-decoration:underline;">View account details in portal</a>
      </div>
    `)}}function p(e){return{subject:"Your ApalyRx Partner Account is Approved",html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Welcome to ApalyRx!</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.contactName},<br><br>
        Your partner account has been approved. You can now log in to your dashboard, submit leads, and share your referral link.
      </p>
      <p style="font-size:14px;color:#374151;">
        <strong>Your Partner Code:</strong> ${e.partnerCode}<br>
        <strong>Your Referral Link:</strong> ${a}/partners/${e.partnerCode}
      </p>
      <div style="margin-top:24px;">
        ${o("Go to Your Dashboard",`${a}/partners/dashboard`)}
      </div>
    `)}}function l(e){return{subject:"ApalyRx Partner Account Update",html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Account Update</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.contactName},<br><br>
        Thank you for your interest in the ApalyRx Channel Partner Program. After review, we are unable to activate your account at this time.
        ${e.reason?`<br><br><strong>Reason:</strong> ${e.reason}`:""}
        <br><br>
        If you have questions, please contact us at partners@apalyrx.com.
      </p>
    `)}}function d(e){return{subject:`New Lead Submitted — ${e.companyName} (via ${e.partnerName})`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Lead for Review</h2>
      <table style="width:100%;font-size:14px;color:#374151;">
        <tr><td style="padding:6px 0;font-weight:bold;width:140px;">Company:</td><td>${e.companyName}</td></tr>
        ${e.ein?`<tr><td style="padding:6px 0;font-weight:bold;">EIN:</td><td>${e.ein}</td></tr>`:""}
        <tr><td style="padding:6px 0;font-weight:bold;">Contact:</td><td>${e.contactName} (${e.contactEmail})</td></tr>
        ${e.phone?`<tr><td style="padding:6px 0;font-weight:bold;">Phone:</td><td>${e.phone}</td></tr>`:""}
        ${e.estimatedLives?`<tr><td style="padding:6px 0;font-weight:bold;">Est. Lives:</td><td>${e.estimatedLives}</td></tr>`:""}
        ${e.message?`<tr><td style="padding:6px 0;font-weight:bold;">Message:</td><td>${e.message}</td></tr>`:""}
        <tr><td style="padding:6px 0;font-weight:bold;">Partner:</td><td>${e.partnerName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Source:</td><td>${e.source}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Submitted:</td><td>${e.submittedAt}</td></tr>
      </table>
      <div style="margin-top:24px;display:flex;gap:12px;">
        ${o("Approve Lead",e.approveUrl,"#16a34a")}
        &nbsp;&nbsp;
        ${o("Deny Lead",e.denyUrl,"#dc2626")}
      </div>
    `)}}function c(e){return{subject:`New prospect submitted — ${e.companyName}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Prospect Submitted</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.partnerContactName},<br><br>
        A prospect (<strong>${e.companyName}</strong>) just submitted through your referral. ApalyRx has been notified and will review within 1-2 business days. We'll email you when a decision is made.
      </p>
      <div style="margin-top:24px;">
        ${o("View Your Leads",`${a}/partners/leads`)}
      </div>
    `)}}function m(e){return{subject:`Lead Approved — ${e.companyName}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Lead Approved</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.partnerContactName},<br><br>
        <strong>${e.companyName}</strong> has been qualified. The 150-day acceptance window has started.<br><br>
        <strong>Acceptance Deadline:</strong> ${e.deadlineDate}
      </p>
      <div style="margin-top:24px;">
        ${o("View Lead",`${a}/partners/leads/${e.leadId}`)}
      </div>
    `)}}function u(e){return{subject:`Lead Update — ${e.companyName}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Lead Update</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.partnerContactName},<br><br>
        <strong>${e.companyName}</strong> was not accepted at this time.
        ${e.reason?`<br><br><strong>Reason:</strong> ${e.reason}`:""}
        <br><br>
        Feel free to reach out to your ApalyRx contact with any questions.
      </p>
    `)}}function g(e){return{subject:"Confirm Your Referral to ApalyRx",html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Confirm Your Referral</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.prospectName},
      </p>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        <strong>${e.partnerCompanyName}</strong> has submitted your organization as a prospect for the ApalyRx prescription drug savings program.
      </p>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Please confirm that you consent to this referral. This helps us ensure all parties are aligned before proceeding.
      </p>
      <div style="margin:24px 0;">
        ${o("Confirm Referral",e.confirmUrl)}
      </div>
      <p style="font-size:12px;color:#6b7280;line-height:1.5;">
        If you did not expect this email or do not wish to proceed, you can safely ignore it. This link expires in 30 days.
      </p>
    `)}}function h(e){return{subject:`You're invited to join the ApalyRx Partner Program via ${e.parentCompanyName}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Partner Program Invitation</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        ${e.inviterName} at <strong>${e.parentCompanyName}</strong> has invited you to join the ApalyRx Channel Partner Program as a sub-organization.
      </p>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        As a sub-organization partner, you'll be able to submit leads, track commissions, and access the full partner portal.
      </p>
      <div style="margin:24px 0;">
        ${o("Accept Invitation",e.inviteUrl)}
      </div>
      <p style="font-size:12px;color:#6b7280;line-height:1.5;">
        This invitation expires in 30 days. If you didn&rsquo;t expect this email, you can safely ignore it.
      </p>
    `)}}function y(e){return{subject:`🎉 ${e.prospectCompanyName} is now an ApalyRx customer!`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Customer Confirmed</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.partnerContactName},<br><br>
        Great news! <strong>${e.prospectCompanyName}</strong> is now an active ApalyRx customer.<br><br>
        Your commission term runs from <strong>${e.commissionStart}</strong> to <strong>${e.commissionEnd}</strong>.${e.feeScheduleName?`<br><br><strong>Fee Schedule:</strong> ${e.feeScheduleName}`:""}<br><br>
        You can view your commission details in the partner portal.
      </p>
      <div style="margin-top:24px;">
        ${o("View Commissions",`${a}/partners/commissions`)}
      </div>
    `)}}},14317:(e,t,r)=>{r.d(t,{G:()=>n});var a=r(37857);function n(){return(0,a.eI)(process.env.PARTNER_SUPABASE_URL,process.env.PARTNER_SUPABASE_SERVICE_ROLE_KEY)}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[8948,5972,7857,2591],()=>r(6389));module.exports=a})();