"use strict";(()=>{var e={};e.id=6462,e.ids=[6462],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6005:e=>{e.exports=require("node:crypto")},98117:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>b,requestAsyncStorage:()=>y,routeModule:()=>g,serverHooks:()=>f,staticGenerationAsyncStorage:()=>h});var a={};r.r(a),r.d(a,{POST:()=>u});var n=r(49303),o=r(88716),i=r(60670),s=r(87070),d=r(14874),l=r(14317),p=r(28218),c=r(7411),m=r(39026);async function u(e){let t=(0,d.C)(),{data:{session:r}}=await t.auth.getSession();if(!r)return s.NextResponse.json({error:"Unauthorized"},{status:401});let{data:a}=await t.from("partner_users").select("id, email, is_apaly_team").eq("user_id",r.user.id).maybeSingle();if(!a?.is_apaly_team)return s.NextResponse.json({error:"Forbidden"},{status:403});let{leadId:n,agreementDate:o,notes:i,feeScheduleId:u}=await e.json();if(!n||!o)return s.NextResponse.json({error:"Lead ID and agreement date are required"},{status:400});let g=(0,l.G)(),{data:y}=await g.from("leads").select("id, prospect_company_name, organization_id, status").eq("id",n).single();if(!y)return s.NextResponse.json({error:"Lead not found"},{status:404});if("qualified"!==y.status)return s.NextResponse.json({error:"Only qualified leads can be marked as customer"},{status:400});let{data:h}=await g.from("partner_organizations").select("id, company_name, commission_duration_months, notification_email").eq("id",y.organization_id).single();if(!h)return s.NextResponse.json({error:"Partner organization not found"},{status:404});let f=h.commission_duration_months||12,x=new Date(o),b=new Date(o);b.setMonth(b.getMonth()+f);let $=new Date().toISOString(),w=x.toISOString().split("T")[0],v=b.toISOString().split("T")[0],_=u;if(!_){let{data:e}=await g.from("fee_schedules").select("id").eq("is_default",!0).maybeSingle();_=e?.id||null}let N="";if(_){let{data:e}=await g.from("fee_schedules").select("name").eq("id",_).maybeSingle();N=e?.name||""}await g.from("leads").update({status:"customer",customer_since:o,customer_agreement_date:o,commission_start_date:w,commission_end_date:v,fee_schedule_id:_,updated_at:$}).eq("id",y.id);let A=`Marked as customer. Agreement date: ${w}. Commission term: ${w} to ${v}.${N?` Fee schedule: ${N}.`:""}${i?` Notes: ${i}`:""}`;await g.from("lead_activity").insert({lead_id:y.id,author_id:a.id,author_type:"apaly_team",content:A,activity_type:"status_change"}),await (0,p.A)({actorId:a.id,actorEmail:a.email,action:"MARK_AS_CUSTOMER",targetType:"lead",targetId:y.id,metadata:{agreementDate:o,commissionStart:w,commissionEnd:v,feeScheduleId:_,feeScheduleName:N,notes:i}});let{data:R}=await g.from("partner_users").select("first_name, email").eq("organization_id",h.id).eq("role","partner_admin").maybeSingle(),P=h.notification_email||R?.email;if(P){let e=(0,m.nh)({partnerContactName:R?.first_name||h.company_name,prospectCompanyName:y.prospect_company_name,commissionStart:w,commissionEnd:v,feeScheduleName:N});await (0,c.C)({to:P,subject:e.subject,html:e.html}).catch(console.error)}return s.NextResponse.json({success:!0,status:"customer"})}let g=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/partners/api/admin/leads/customer/route",pathname:"/partners/api/admin/leads/customer",filename:"route",bundlePath:"app/partners/api/admin/leads/customer/route"},resolvedPagePath:"C:\\Projects\\apalyrx\\src\\app\\partners\\api\\admin\\leads\\customer\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:y,staticGenerationAsyncStorage:h,serverHooks:f}=g,x="/partners/api/admin/leads/customer/route";function b(){return(0,i.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:h})}},28218:(e,t,r)=>{r.d(t,{A:()=>n});var a=r(14317);async function n({actorId:e,actorEmail:t,action:r,targetType:n,targetId:o,metadata:i,ipAddress:s}){let d=(0,a.G)();await d.from("audit_log").insert({actor_id:e,actor_email:t,action:r,target_type:n,target_id:o,metadata:i,ip_address:s})}},7411:(e,t,r)=>{r.d(t,{C:()=>i,p:()=>s});var a=r(82591),n=r(14317);let o=new a.R(process.env.RESEND_API_KEY);async function i({to:e,subject:t,html:r}){let a=Array.isArray(e)?e:[e];await o.emails.send({from:"ApalyRx <noreply@apalyrx.com>",to:a,subject:t,html:r})}async function s(e){let t=(0,n.G)(),{data:r}=await t.from("admin_notification_settings").select("email_list, enabled").eq("event_type",e).single();return r?.enabled&&r.email_list?.length?r.email_list:[]}},39026:(e,t,r)=>{r.d(t,{Df:()=>l,Fo:()=>s,G$:()=>y,Mx:()=>p,WO:()=>i,aS:()=>c,fP:()=>d,iU:()=>g,nh:()=>h,wA:()=>u,xS:()=>m});let a="https://www.apalyrx.com";function n(e){return`
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
    `)}}function d(e){return{subject:"Your ApalyRx Partner Account is Approved",html:n(`
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
    `)}}function p(e){return{subject:`New Lead Submitted — ${e.companyName} (via ${e.partnerName})`,html:n(`
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
    `)}}function h(e){return{subject:`🎉 ${e.prospectCompanyName} is now an ApalyRx customer!`,html:n(`
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
    `)}}},14317:(e,t,r)=>{r.d(t,{G:()=>n});var a=r(37857);function n(){return(0,a.eI)(process.env.PARTNER_SUPABASE_URL,process.env.PARTNER_SUPABASE_SERVICE_ROLE_KEY)}},14874:(e,t,r)=>{r.d(t,{C:()=>o});var a=r(67721),n=r(71615);function o(){let e=(0,n.cookies)();return(0,a.createServerClient)(process.env.PARTNER_SUPABASE_URL,process.env.PARTNER_SUPABASE_ANON_KEY,{cookies:{get:t=>e.get(t)?.value}})}}};var t=require("../../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[8948,5972,7857,9702,2591],()=>r(98117));module.exports=a})();