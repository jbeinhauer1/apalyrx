"use strict";(()=>{var e={};e.id=5177,e.ids=[5177],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},45391:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>x,patchFetch:()=>b,requestAsyncStorage:()=>y,routeModule:()=>g,serverHooks:()=>h,staticGenerationAsyncStorage:()=>f});var r={};a.r(r),a.d(r,{POST:()=>u});var n=a(49303),o=a(88716),i=a(60670),s=a(87070),d=a(14874),p=a(14317),l=a(28218),c=a(7411),m=a(39026);async function u(e){let t=(0,d.C)(),{data:{session:a}}=await t.auth.getSession();if(!a)return s.NextResponse.json({error:"Unauthorized"},{status:401});let{data:r}=await t.from("partner_users").select("id, email, is_apaly_team, role").eq("user_id",a.user.id).maybeSingle();if(!r?.is_apaly_team)return s.NextResponse.json({error:"Forbidden"},{status:403});let{action:n,partnerId:o,reason:i}=await e.json(),u=(0,p.G)(),{data:g}=await u.from("partner_organizations").select("id, company_name, partner_code, notification_email, status").eq("id",o).single();if(!g)return s.NextResponse.json({error:"Partner not found"},{status:404});let y=new Date().toISOString();if("approve"===n){await u.from("partner_organizations").update({status:"active",setup_complete:!0,approved_at:y,updated_at:y}).eq("id",g.id),await (0,l.A)({actorId:r.id,actorEmail:r.email,action:"APPROVE_PARTNER",targetType:"partner_organization",targetId:g.id,metadata:{via:"admin_portal"}});let{data:e}=await u.from("partner_users").select("first_name, email").eq("organization_id",g.id).eq("role","partner_admin").maybeSingle(),t=g.notification_email||e?.email;if(t){let a=(0,m.fP)({contactName:e?.first_name||g.company_name,partnerCode:g.partner_code});await (0,c.C)({to:t,subject:a.subject,html:a.html}).catch(console.error)}return s.NextResponse.json({success:!0,status:"active"})}if("deny"===n)return await u.from("partner_organizations").update({status:"denied",updated_at:y}).eq("id",g.id),await (0,l.A)({actorId:r.id,actorEmail:r.email,action:"DENY_PARTNER",targetType:"partner_organization",targetId:g.id,metadata:{reason:i,via:"admin_portal"}}),s.NextResponse.json({success:!0,status:"denied"});if("suspend"===n){await u.from("partner_organizations").update({status:"suspended",updated_at:y}).eq("id",g.id),await (0,l.A)({actorId:r.id,actorEmail:r.email,action:"SUSPEND_PARTNER",targetType:"partner_organization",targetId:g.id});let{data:e}=await u.from("partner_users").select("email").eq("organization_id",g.id).eq("role","partner_admin").maybeSingle(),t=g.notification_email||e?.email;return t&&await (0,c.C)({to:t,subject:"ApalyRx Partner Account Suspended",html:"<p>Your ApalyRx partner account has been suspended. Contact partners@apalyrx.com for more information.</p>"}).catch(console.error),s.NextResponse.json({success:!0,status:"suspended"})}if("activate"===n){await u.from("partner_organizations").update({status:"active",approved_at:"denied"===g.status?y:void 0,updated_at:y}).eq("id",g.id),await (0,l.A)({actorId:r.id,actorEmail:r.email,action:"ACTIVATE_PARTNER",targetType:"partner_organization",targetId:g.id});let{data:e}=await u.from("partner_users").select("first_name, email").eq("organization_id",g.id).eq("role","partner_admin").maybeSingle(),t=g.notification_email||e?.email;if(t){let a=(0,m.fP)({contactName:e?.first_name||g.company_name,partnerCode:g.partner_code});await (0,c.C)({to:t,subject:a.subject,html:a.html}).catch(console.error)}return s.NextResponse.json({success:!0,status:"active"})}if("delete"===n){if("super_admin"!==r.role)return s.NextResponse.json({error:"Only super admins can delete partners"},{status:403});let[e,t]=await Promise.all([u.from("leads").select("id",{count:"exact",head:!0}).eq("organization_id",g.id),u.from("commission_entries").select("id",{count:"exact",head:!0}).eq("organization_id",g.id)]);if((e.count||0)>0||(t.count||0)>0)return s.NextResponse.json({error:"This partner has active leads or commission history and cannot be deleted. Suspend the account instead."},{status:409});let{data:a}=await u.from("partner_users").select("user_id").eq("organization_id",g.id);for(let e of(await u.from("partner_users").delete().eq("organization_id",g.id),await u.from("partner_organizations").delete().eq("id",g.id),a||[]))e.user_id&&await u.auth.admin.deleteUser(e.user_id);return await (0,l.A)({actorId:r.id,actorEmail:r.email,action:"DELETE_PARTNER",targetType:"partner_organization",targetId:g.id,metadata:{companyName:g.company_name}}),s.NextResponse.json({success:!0,deleted:!0})}return s.NextResponse.json({error:"Invalid action"},{status:400})}let g=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/partners/api/admin/partners/route",pathname:"/partners/api/admin/partners",filename:"route",bundlePath:"app/partners/api/admin/partners/route"},resolvedPagePath:"C:\\Projects\\apalyrx\\src\\app\\partners\\api\\admin\\partners\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:y,staticGenerationAsyncStorage:f,serverHooks:h}=g,x="/partners/api/admin/partners/route";function b(){return(0,i.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:f})}},28218:(e,t,a)=>{a.d(t,{A:()=>n});var r=a(14317);async function n({actorId:e,actorEmail:t,action:a,targetType:n,targetId:o,metadata:i,ipAddress:s}){let d=(0,r.G)();await d.from("audit_log").insert({actor_id:e,actor_email:t,action:a,target_type:n,target_id:o,metadata:i,ip_address:s})}},7411:(e,t,a)=>{a.d(t,{C:()=>i,p:()=>s});var r=a(82591),n=a(14317);let o=new r.R(process.env.RESEND_API_KEY);async function i({to:e,subject:t,html:a}){let r=Array.isArray(e)?e:[e];await o.emails.send({from:"ApalyRx <noreply@apalyrx.com>",to:r,subject:t,html:a})}async function s(e){let t=(0,n.G)(),{data:a}=await t.from("admin_notification_settings").select("email_list, enabled").eq("event_type",e).single();return a?.enabled&&a.email_list?.length?a.email_list:[]}},39026:(e,t,a)=>{a.d(t,{Df:()=>p,Fo:()=>s,G$:()=>y,Mx:()=>l,WO:()=>i,aS:()=>c,fP:()=>d,iU:()=>g,nh:()=>f,wA:()=>u,xS:()=>m});let r="https://www.apalyrx.com";function n(e){return`
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
</html>`}function o(e,t,a="#ff5e00"){return`<a href="${t}" style="display:inline-block;background:${a};color:#ffffff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">${e}</a>`}function i(e){return{subject:"Verify Your ApalyRx Partner Account",html:n(`
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
        <a href="${r}/partners/admin/partners/${e.partnerId}" style="font-size:12px;color:#6b7280;text-decoration:underline;">View account details in portal</a>
      </div>
    `)}}function d(e){return{subject:"Your ApalyRx Partner Account is Approved",html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Welcome to ApalyRx!</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.contactName},<br><br>
        Your partner account has been approved. You can now log in to your dashboard, submit leads, and share your referral link.
      </p>
      <p style="font-size:14px;color:#374151;">
        <strong>Your Partner Code:</strong> ${e.partnerCode}<br>
        <strong>Your Referral Link:</strong> ${r}/partners/${e.partnerCode}
      </p>
      <div style="margin-top:24px;">
        ${o("Go to Your Dashboard",`${r}/partners/dashboard`)}
      </div>
    `)}}function p(e){return{subject:"ApalyRx Partner Account Update",html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Account Update</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.contactName},<br><br>
        Thank you for your interest in the ApalyRx Channel Partner Program. After review, we are unable to activate your account at this time.
        ${e.reason?`<br><br><strong>Reason:</strong> ${e.reason}`:""}
        <br><br>
        If you have questions, please contact us at partners@apalyrx.com.
      </p>
    `)}}function l(e){return{subject:`New Lead Submitted — ${e.companyName} (via ${e.partnerName})`,html:n(`
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
        ${o("View Your Leads",`${r}/partners/leads`)}
      </div>
    `)}}function m(e){return{subject:`Lead Approved — ${e.companyName}`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">Lead Approved</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.partnerContactName},<br><br>
        <strong>${e.companyName}</strong> has been qualified. The 150-day acceptance window has started.<br><br>
        <strong>Acceptance Deadline:</strong> ${e.deadlineDate}
      </p>
      <div style="margin-top:24px;">
        ${o("View Lead",`${r}/partners/leads/${e.leadId}`)}
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
    `)}}function y(e){return{subject:`You're invited to join the ApalyRx Partner Program via ${e.parentCompanyName}`,html:n(`
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
    `)}}function f(e){return{subject:`🎉 ${e.prospectCompanyName} is now an ApalyRx customer!`,html:n(`
      <h2 style="color:#102a4c;margin:0 0 16px;">New Customer Confirmed</h2>
      <p style="font-size:14px;color:#374151;line-height:1.6;">
        Hi ${e.partnerContactName},<br><br>
        Great news! <strong>${e.prospectCompanyName}</strong> is now an active ApalyRx customer.<br><br>
        Your commission term runs from <strong>${e.commissionStart}</strong> to <strong>${e.commissionEnd}</strong>.${e.feeScheduleName?`<br><br><strong>Fee Schedule:</strong> ${e.feeScheduleName}`:""}<br><br>
        You can view your commission details in the partner portal.
      </p>
      <div style="margin-top:24px;">
        ${o("View Commissions",`${r}/partners/commissions`)}
      </div>
    `)}}},14317:(e,t,a)=>{a.d(t,{G:()=>n});var r=a(37857);function n(){return(0,r.eI)(process.env.PARTNER_SUPABASE_URL,process.env.PARTNER_SUPABASE_SERVICE_ROLE_KEY)}},14874:(e,t,a)=>{a.d(t,{C:()=>o});var r=a(67721),n=a(71615);function o(){let e=(0,n.cookies)();return(0,r.createServerClient)(process.env.PARTNER_SUPABASE_URL,process.env.PARTNER_SUPABASE_ANON_KEY,{cookies:{get:t=>e.get(t)?.value}})}}};var t=require("../../../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[8948,5972,7857,9702,2591],()=>a(45391));module.exports=r})();