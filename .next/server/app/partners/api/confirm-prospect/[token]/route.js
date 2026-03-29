"use strict";(()=>{var e={};e.id=974,e.ids=[974],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},59829:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>h,patchFetch:()=>_,requestAsyncStorage:()=>f,routeModule:()=>d,serverHooks:()=>u,staticGenerationAsyncStorage:()=>m});var o={};r.r(o),r.d(o,{GET:()=>c});var n=r(49303),a=r(88716),i=r(60670),s=r(87070),p=r(14317);async function c(e,{params:t}){let{token:r}=t;if(!r)return l("Invalid Link","No confirmation token provided.",!1);let o=(0,p.G)(),{data:n}=await o.from("leads").select("id, prospect_company_name, prospect_confirmed_at, prospect_consent_token_expires_at").eq("prospect_consent_token",r).maybeSingle();return n?n.prospect_confirmed_at?l("Already Confirmed",`Your referral for <strong>${n.prospect_company_name}</strong> has already been confirmed. Thank you!`,!0):n.prospect_consent_token_expires_at&&new Date(n.prospect_consent_token_expires_at)<new Date?l("Link Expired","This confirmation link has expired. Please contact your referral partner for a new link.",!1):(await o.from("leads").update({prospect_confirmed_at:new Date().toISOString(),prospect_consent_token:null,prospect_consent_token_expires_at:null}).eq("id",n.id),await o.from("lead_activity").insert({lead_id:n.id,action:"prospect_confirmed",details:"Prospect confirmed the referral via email link.",performed_by:null}),l("Referral Confirmed",`Thank you for confirming the referral for <strong>${n.prospect_company_name}</strong>. The ApalyRx team will be in touch.`,!0)):l("Invalid Link","This confirmation link is not valid or has already been used.",!1)}function l(e,t,r){let o=`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${e} - ApalyRx</title>
  <style>
    body { margin:0; padding:0; background:#f4f5f7; font-family:Arial,Helvetica,sans-serif; }
    .container { max-width:480px; margin:80px auto; padding:32px; background:#fff; border-radius:12px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.1); }
    h1 { color:#102a4c; font-size:24px; margin:16px 0 8px; }
    p { color:#374151; font-size:14px; line-height:1.6; }
    .icon { color:${r?"#16a34a":"#dc2626"}; margin-bottom:8px; }
  </style>
</head>
<body>
  <div class="container">
    <svg class="icon" width="48" height="48" viewBox="0 0 24 24">${r?'<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" stroke-width="2"/>':'<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 9l-6 6M9 9l6 6" fill="none" stroke="currentColor" stroke-width="2"/>'}</svg>
    <h1>${e}</h1>
    <p>${t}</p>
  </div>
</body>
</html>`;return new s.NextResponse(o,{status:200,headers:{"Content-Type":"text/html"}})}let d=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/partners/api/confirm-prospect/[token]/route",pathname:"/partners/api/confirm-prospect/[token]",filename:"route",bundlePath:"app/partners/api/confirm-prospect/[token]/route"},resolvedPagePath:"C:\\Projects\\apalyrx\\src\\app\\partners\\api\\confirm-prospect\\[token]\\route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:f,staticGenerationAsyncStorage:m,serverHooks:u}=d,h="/partners/api/confirm-prospect/[token]/route";function _(){return(0,i.patchFetch)({serverHooks:u,staticGenerationAsyncStorage:m})}},14317:(e,t,r)=>{r.d(t,{G:()=>n});var o=r(37857);function n(){return(0,o.eI)(process.env.PARTNER_SUPABASE_URL,process.env.PARTNER_SUPABASE_SERVICE_ROLE_KEY)}}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[8948,5972,7857],()=>r(59829));module.exports=o})();