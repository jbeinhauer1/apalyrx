"use strict";(()=>{var e={};e.id=2065,e.ids=[2065],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},6005:e=>{e.exports=require("node:crypto")},64219:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>$,patchFetch:()=>w,requestAsyncStorage:()=>x,routeModule:()=>f,serverHooks:()=>v,staticGenerationAsyncStorage:()=>b});var n={};r.r(n),r.d(n,{GET:()=>y,POST:()=>h});var a=r(49303),o=r(88716),i=r(60670),s=r(84770),p=r.n(s),l=r(87070),d=r(14317),c=r(14874),m=r(95983),u=r(7411),g=r(39026);async function y(e){let t=e.nextUrl.searchParams.get("token");if(!t)return l.NextResponse.json({error:"Missing token"},{status:400});let r=(0,d.G)(),{data:n}=await r.from("partner_organizations").select("id, company_name, status, invite_token_expires_at, parent_organization_id").eq("invite_token",t).eq("status","invited").maybeSingle();if(!n)return l.NextResponse.json({error:"Invalid or expired invite"},{status:404});if(n.invite_token_expires_at&&new Date(n.invite_token_expires_at)<new Date)return l.NextResponse.json({error:"Invite has expired"},{status:410});let a="";if(n.parent_organization_id){let{data:e}=await r.from("partner_organizations").select("company_name").eq("id",n.parent_organization_id).maybeSingle();a=e?.company_name||""}return l.NextResponse.json({valid:!0,parentCompanyName:a,placeholderOrgId:n.id})}async function h(e){try{let t=await (0,c.C)(),{data:{session:r}}=await t.auth.getSession();if(!r)return l.NextResponse.json({error:"Unauthorized"},{status:401});let n=(0,d.G)(),{data:a}=await n.from("partner_users").select("organization_id, role, first_name, last_name").eq("user_id",r.user.id).maybeSingle();if(!a||"partner_admin"!==a.role)return l.NextResponse.json({error:"Only partner admins can invite sub-organizations"},{status:403});let{data:o}=await n.from("partner_organizations").select("id, company_name, partner_code, status").eq("id",a.organization_id).maybeSingle();if(!o||"active"!==o.status)return l.NextResponse.json({error:"Your organization must be active to invite sub-organizations"},{status:403});let{email:i,companyName:s}=await e.json();if(!i)return l.NextResponse.json({error:"Email is required"},{status:400});let y=p().randomBytes(32).toString("hex"),h=new Date;h.setDate(h.getDate()+30);let f=await (0,m.I)(s||`sub-${o.partner_code}`),{data:x,error:b}=await n.from("partner_organizations").insert({partner_code:f,company_name:s||`Invited by ${o.company_name}`,status:"invited",parent_organization_id:o.id,invited_by_organization_id:o.id,invite_token:y,invite_token_expires_at:h.toISOString()}).select("id").single();if(b)return l.NextResponse.json({error:b.message},{status:500});let v=`https://www.apalyrx.com/partners/signup?invite=${y}`,$=(0,g.G$)({parentCompanyName:o.company_name,inviterName:`${a.first_name} ${a.last_name}`,inviteUrl:v});return await (0,u.C)({to:i,subject:$.subject,html:$.html}),l.NextResponse.json({success:!0,inviteUrl:v,orgId:x.id})}catch(e){return console.error("Invite sub-org error:",e),l.NextResponse.json({error:"Internal server error"},{status:500})}}let f=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/partners/api/invite-suborg/route",pathname:"/partners/api/invite-suborg",filename:"route",bundlePath:"app/partners/api/invite-suborg/route"},resolvedPagePath:"C:\\Projects\\apalyrx\\src\\app\\partners\\api\\invite-suborg\\route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:x,staticGenerationAsyncStorage:b,serverHooks:v}=f,$="/partners/api/invite-suborg/route";function w(){return(0,i.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:b})}},7411:(e,t,r)=>{r.d(t,{C:()=>i,p:()=>s});var n=r(82591),a=r(14317);let o=new n.R(process.env.RESEND_API_KEY);async function i({to:e,subject:t,html:r}){let n=Array.isArray(e)?e:[e];await o.emails.send({from:"ApalyRx <noreply@apalyrx.com>",to:n,subject:t,html:r})}async function s(e){let t=(0,a.G)(),{data:r}=await t.from("admin_notification_settings").select("email_list, enabled").eq("event_type",e).single();return r?.enabled&&r.email_list?.length?r.email_list:[]}},39026:(e,t,r)=>{r.d(t,{Df:()=>l,Fo:()=>s,G$:()=>y,Mx:()=>d,WO:()=>i,aS:()=>c,fP:()=>p,iU:()=>g,nh:()=>h,wA:()=>u,xS:()=>m});let n="https://www.apalyrx.com";function a(e){return`
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
</html>`}function o(e,t,r="#ff5e00"){return`<a href="${t}" style="display:inline-block;background:${r};color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">${e}</a>`}function i(e){return{subject:"Verify Your ApalyRx Partner Account",html:a(`
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
      </div>`:"";return{subject:`New Channel Partner Account — ${e.companyName}${e.parentOrgName?` (sub-org of ${e.parentOrgName})`:""}`,html:a(`
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
        <a href="${n}/partners/admin/partners/${e.partnerId}" style="font-size:12px;color:#6b7280;text-decoration:underline;">View account details in portal</a>
      </div>
    `)}}function p(e){return{subject:"Your ApalyRx Partner Account is Approved",html:a(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Welcome to ApalyRx!</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.contactName},<br><br>
        Your partner account has been approved. You can now log in to your dashboard, submit leads, and share your referral link.
      </p>
      <p style="font-size:14px;color:#374151;">
        <strong>Your Partner Code:</strong> ${e.partnerCode}<br>
        <strong>Your Referral Link:</strong> ${n}/partners/${e.partnerCode}
      </p>
      <div style="margin-top:24px;">
        ${o("Go to Your Dashboard",`${n}/partners/dashboard`)}
      </div>
    `)}}function l(e){return{subject:"ApalyRx Partner Account Update",html:a(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Account Update</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.contactName},<br><br>
        Thank you for your interest in the ApalyRx Channel Partner Program. After review, we are unable to activate your account at this time.
        ${e.reason?`<br><br><strong>Reason:</strong> ${e.reason}`:""}
        <br><br>
        If you have questions, please contact us at partners@apalyrx.com.
      </p>
    `)}}function d(e){return{subject:`New Lead Submitted — ${e.companyName} (via ${e.partnerName})`,html:a(`
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
    `)}}function c(e){return{subject:`New prospect submitted — ${e.companyName}`,html:a(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Prospect Submitted</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.partnerContactName},<br><br>
        A prospect (<strong>${e.companyName}</strong>) just submitted through your referral. ApalyRx has been notified and will review within 1-2 business days. We'll email you when a decision is made.
      </p>
      <div style="margin-top:24px;">
        ${o("View Your Leads",`${n}/partners/leads`)}
      </div>
    `)}}function m(e){return{subject:`Lead Approved — ${e.companyName}`,html:a(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Lead Approved</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.partnerContactName},<br><br>
        <strong>${e.companyName}</strong> has been qualified. The 150-day acceptance window has started.<br><br>
        <strong>Acceptance Deadline:</strong> ${e.deadlineDate}
      </p>
      <div style="margin-top:24px;">
        ${o("View Lead",`${n}/partners/leads/${e.leadId}`)}
      </div>
    `)}}function u(e){return{subject:`Lead Update — ${e.companyName}`,html:a(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Lead Update</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.partnerContactName},<br><br>
        <strong>${e.companyName}</strong> was not accepted at this time.
        ${e.reason?`<br><br><strong>Reason:</strong> ${e.reason}`:""}
        <br><br>
        Feel free to reach out to your ApalyRx contact with any questions.
      </p>
    `)}}function g(e){return{subject:"Confirm Your Referral to ApalyRx",html:a(`
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
    `)}}function y(e){return{subject:`You're invited to join the ApalyRx Partner Program via ${e.parentCompanyName}`,html:a(`
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
    `)}}function h(e){return{subject:`🎉 ${e.prospectCompanyName} is now an ApalyRx customer!`,html:a(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Customer Confirmed</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.partnerContactName},<br><br>
        Great news! <strong>${e.prospectCompanyName}</strong> is now an active ApalyRx customer.<br><br>
        Your commission term runs from <strong>${e.commissionStart}</strong> to <strong>${e.commissionEnd}</strong>.${e.feeScheduleName?`<br><br><strong>Fee Schedule:</strong> ${e.feeScheduleName}`:""}<br><br>
        You can view your commission details in the partner portal.
      </p>
      <div style="margin-top:24px;">
        ${o("View Commissions",`${n}/partners/commissions`)}
      </div>
    `)}}},95983:(e,t,r)=>{r.d(t,{I:()=>a});var n=r(14317);async function a(e){let t=(0,n.G)(),r=e.toLowerCase().replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").replace(/^-|-$/g,"").slice(0,30);if(!r)throw Error("Cannot generate partner code from empty company name");for(let e=0;e<20;e++){let n=0===e?r:`${r}-${e+1}`,{data:a}=await t.from("partner_organizations").select("id").eq("partner_code",n).maybeSingle();if(!a)return n}throw Error("Failed to generate unique partner code after 20 attempts")}},14317:(e,t,r)=>{r.d(t,{G:()=>a});var n=r(37857);function a(){return(0,n.eI)(process.env.PARTNER_SUPABASE_URL,process.env.PARTNER_SUPABASE_SERVICE_ROLE_KEY)}},14874:(e,t,r)=>{r.d(t,{C:()=>o});var n=r(67721),a=r(71615);function o(){let e=(0,a.cookies)();return(0,n.createServerClient)(process.env.PARTNER_SUPABASE_URL,process.env.PARTNER_SUPABASE_ANON_KEY,{cookies:{get:t=>e.get(t)?.value}})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[8948,5972,7857,9702,2591],()=>r(64219));module.exports=n})();