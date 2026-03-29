2:I[72972,["2972","static/chunks/2972-29c5dae376ddc3ad.js","3819","static/chunks/app/employers/page-2fb7a4f92b61ffd4.js"],""]
3:I[4707,[],""]
4:I[36423,[],""]
5:I[88003,["2972","static/chunks/2972-29c5dae376ddc3ad.js","8559","static/chunks/8559-e53883615fd36318.js","3185","static/chunks/app/layout-36f33b396049b3dc.js"],""]
7:I[41296,["2972","static/chunks/2972-29c5dae376ddc3ad.js","8559","static/chunks/8559-e53883615fd36318.js","3185","static/chunks/app/layout-36f33b396049b3dc.js"],"default"]
8:I[34526,["2972","static/chunks/2972-29c5dae376ddc3ad.js","8559","static/chunks/8559-e53883615fd36318.js","3185","static/chunks/app/layout-36f33b396049b3dc.js"],"default"]
6:T11cf,
(function() {
  var d = 'www.apalyrx.com';
  var p = 'e71f7e86-80e1-4aba-af88-524d9e2cbb47';
  var e = 'https://lvkrccvdriilbcfaiveo.supabase.co/functions/v1/track';

  var sid = sessionStorage.getItem('_vi_sid');
  if (!sid) {
    sid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    sessionStorage.setItem('_vi_sid', sid);
  }

  function getUtmParams() {
    var params = {};
    var search = window.location.search.substring(1);
    if (search) {
      search.split('&').forEach(function(pair) {
        var kv = pair.split('=');
        if (kv[0].indexOf('utm_') === 0) {
          params[kv[0].replace('utm_', '')] = decodeURIComponent(kv[1] || '');
        }
      });
    }
    return Object.keys(params).length ? params : null;
  }

  function getDeviceType() {
    var ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'mobile';
    return 'desktop';
  }

  function getBrowser() {
    var ua = navigator.userAgent;
    if (ua.indexOf('Firefox') > -1) return 'Firefox';
    if (ua.indexOf('SamsungBrowser') > -1) return 'Samsung';
    if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) return 'Opera';
    if (ua.indexOf('Trident') > -1) return 'IE';
    if (ua.indexOf('Edge') > -1) return 'Edge';
    if (ua.indexOf('Chrome') > -1) return 'Chrome';
    if (ua.indexOf('Safari') > -1) return 'Safari';
    return 'Unknown';
  }

  function getOS() {
    var ua = navigator.userAgent;
    if (ua.indexOf('Win') > -1) return 'Windows';
    if (ua.indexOf('Mac') > -1) return 'macOS';
    if (ua.indexOf('Linux') > -1) return 'Linux';
    if (ua.indexOf('Android') > -1) return 'Android';
    if (ua.indexOf('like Mac') > -1) return 'iOS';
    return 'Unknown';
  }

  function track(eventType, eventData) {
    var payload = {
      session_id: sid,
      domain: d,
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer,
      utm_params: getUtmParams(),
      timestamp: new Date().toISOString(),
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_type: getDeviceType(),
      browser: getBrowser(),
      os: getOS(),
      event_type: eventType || 'page_view',
      event_data: eventData || {}
    };
    navigator.sendBeacon(e, JSON.stringify(payload));
  }

  var maxScroll = 0;
  var pageStart = Date.now();

  window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = Math.round((scrollTop / scrollHeight) * 100);
    if (scrollPercent > maxScroll) maxScroll = scrollPercent;
  });

  window.addEventListener('beforeunload', function() {
    var timeOnPage = Math.round((Date.now() - pageStart) / 1000);
    track('page_view', { scroll_depth: maxScroll, time_on_page: timeOnPage });
  });

  document.addEventListener('focus', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
      var formName = e.target.form ? (e.target.form.name || e.target.form.id || 'unnamed') : 'no-form';
      track('form_focus', { field: e.target.name || e.target.id, form: formName });
    }
  }, true);

  document.addEventListener('click', function(e) {
    var target = e.target.closest('button, a[href], [role="button"]');
    if (target) {
      var text = target.textContent.trim().substring(0, 50);
      var href = target.getAttribute('href');
      if (text.match(/(demo|pricing|contact|schedule|book|trial|start)/i)) {
        track('button_click', { text: text, href: href });
      }
    }
  }, true);

  document.addEventListener('play', function(e) {
    if (e.target.tagName === 'VIDEO') {
      track('video_play', { src: e.target.currentSrc });
    }
  }, true);

  document.addEventListener('mouseout', function(e) {
    if (e.clientY < 5 && e.relatedTarget === null) {
      track('exit_intent', {});
    }
  });

  track('page_view');

  var pushState = history.pushState;
  history.pushState = function() {
    pushState.apply(history, arguments);
    track('page_view');
  };
  window.addEventListener('popstate', function() {
    track('page_view');
  });
})();
0:["wQ2Wy1TBxB0r5TcJWFVdY",[[["",{"children":["employers",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],["",{"children":["employers",{"children":["__PAGE__",{},[["$L1",[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"name\":\"ApalyRx for Employers & Health Plans\",\"description\":\"The lowest net cost for every high-cost drug. Documented proof for every decision. Works alongside your existing PBM and TPA.\",\"url\":\"https://www.apalyrx.com/employers\",\"isPartOf\":{\"@type\":\"WebSite\",\"name\":\"ApalyRx\",\"url\":\"https://www.apalyrx.com\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"ApalyRx\",\"url\":\"https://www.apalyrx.com\"}}"}}],["$","section",null,{"className":"relative bg-navy overflow-hidden","children":[["$","div",null,{"className":"absolute top-0 right-0 w-[600px] h-[600px]","style":{"background":"radial-gradient(circle at center, rgba(255,94,0,0.05), transparent 70%)"}}],["$","div",null,{"className":"relative max-w-content mx-auto px-6 md:px-12 pt-[140px] md:pt-[180px] pb-16 md:pb-24","children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-white/[0.35] block mb-5","children":"For Employers & Health Plans"}],["$","div",null,{"className":"w-10 h-[2px] bg-orange mb-8"}],["$","h1",null,{"className":"font-serif text-[34px] md:text-[46px] lg:text-[56px] text-white leading-[1.1] tracking-tighter-display max-w-[720px] mb-6","children":"The Lowest Net Cost for Every High-Cost Drug. Documented Proof for Every Decision."}],["$","p",null,{"className":"font-sans text-base md:text-lg text-white/[0.60] max-w-[600px] leading-body mb-10","children":"ApalyRx operates alongside your existing PBM and TPA. Carve out only the high-cost drugs where routing optimization has the greatest impact. Nothing else changes except the cost and the audit trail."}],["$","$L2",null,{"href":"/contact","className":"font-sans text-btn bg-white text-navy hover:bg-white/90 px-6 py-2.5 transition-colors duration-200 inline-block","children":"Schedule a Briefing"}]]}]]}],["$","section",null,{"className":"bg-[#0a1e38]","children":["$","div",null,{"className":"max-w-content mx-auto px-6 md:px-12 py-6 md:py-8","children":["$","div",null,{"className":"flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12","children":[[["$","div","Covered lives",{"className":"flex items-center gap-8 md:gap-12","children":[["$","div",null,{"className":"text-center","children":[["$","div",null,{"className":"font-serif text-white text-2xl md:text-[30px] tracking-tight-display","children":"500K+"}],["$","div",null,{"className":"font-sans text-white/[0.38] text-xs tracking-wide mt-0.5","children":"Covered lives"}]]}],["$","div",null,{"className":"hidden md:block w-px h-8 bg-white/[0.07]"}]]}],["$","div","NPS",{"className":"flex items-center gap-8 md:gap-12","children":[["$","div",null,{"className":"text-center","children":[["$","div",null,{"className":"font-serif text-white text-2xl md:text-[30px] tracking-tight-display","children":"88"}],["$","div",null,{"className":"font-sans text-white/[0.38] text-xs tracking-wide mt-0.5","children":"NPS"}]]}],["$","div",null,{"className":"hidden md:block w-px h-8 bg-white/[0.07]"}]]}],["$","div","Cost reduction",{"className":"flex items-center gap-8 md:gap-12","children":[["$","div",null,{"className":"text-center","children":[["$","div",null,{"className":"font-serif text-white text-2xl md:text-[30px] tracking-tight-display","children":"20%+"}],["$","div",null,{"className":"font-sans text-white/[0.38] text-xs tracking-wide mt-0.5","children":"Cost reduction"}]]}],["$","div",null,{"className":"hidden md:block w-px h-8 bg-white/[0.07]"}]]}],["$","div","Operating since",{"className":"flex items-center gap-8 md:gap-12","children":[["$","div",null,{"className":"text-center","children":[["$","div",null,{"className":"font-serif text-white text-2xl md:text-[30px] tracking-tight-display","children":"2018"}],["$","div",null,{"className":"font-sans text-white/[0.38] text-xs tracking-wide mt-0.5","children":"Operating since"}]]}],false]}]],["$","div",null,{"className":"hidden md:block w-px h-8 bg-white/[0.07]"}],["$","div",null,{"className":"flex items-center gap-3","children":[["$","span","HIPAA",{"className":"text-[10px] uppercase tracking-wider text-white/[0.38] border border-white/[0.10] px-3 py-1.5","children":"HIPAA"}],["$","span","SOC 2",{"className":"text-[10px] uppercase tracking-wider text-white/[0.38] border border-white/[0.10] px-3 py-1.5","children":"SOC 2"}],["$","span","Patent Pending 2026",{"className":"text-[10px] uppercase tracking-wider text-white/[0.38] border border-white/[0.10] px-3 py-1.5","children":"Patent Pending 2026"}]]}]]}]}]}],["$","section",null,{"className":"bg-off-white","children":["$","div",null,{"className":"max-w-content mx-auto px-6 md:px-12 py-16 md:py-24","children":["$","div",null,{"className":"grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24","children":[["$","div",null,{"children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-orange block mb-4","children":"The Problem"}],["$","h2",null,{"className":"font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-8","children":"Overpaying on High-Cost Drugs with No Way to Verify"}],["$","div",null,{"className":"space-y-5 font-sans text-base text-text-secondary leading-body","children":[["$","p",null,{"children":"Self-funded employers bear the direct cost of their members' drug spend, yet have no independent way to verify that each high-cost prescription was routed to the lowest net cost across all available channels. The entity making routing decisions has financial relationships with the dispensing channels being evaluated."}],["$","p",null,{"children":"Manufacturer-direct pricing programs, often the lowest net cost option for high-cost specialty drugs, sit outside PBM adjudication entirely. They are invisible to the benefit. Employers cannot access what they cannot see."}],["$","p",null,{"children":"Under ERISA, plan fiduciaries face personal liability for drug benefit decisions. The Consolidated Appropriations Act designates PBMs as covered service providers with significant noncompliance penalties. Without decision-level documentation, fiduciaries cannot demonstrate that routing decisions were made in the plan's interest."}]]}]]}],["$","div",null,{"className":"border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-20","children":["$","div",null,{"className":"space-y-0","children":[["$","div",null,{"className":"pb-8 border-b border-border","children":[["$","div",null,{"className":"font-serif text-[40px] md:text-[46px] text-navy tracking-tight-display leading-none mb-3","children":"20–40%"}],["$","p",null,{"className":"font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed","children":"overpay on high-cost drugs vs. manufacturer-direct pricing"}]]}],["$","div",null,{"className":"py-8 border-b border-border","children":[["$","div",null,{"className":"font-serif text-[40px] md:text-[46px] text-navy tracking-tight-display leading-none mb-3","children":"0"}],["$","p",null,{"className":"font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed","children":"independent routing records in standard PBM-administered benefit"}]]}],["$","div",null,{"className":"pt-8","children":[["$","div",null,{"className":"font-serif text-[14px] md:text-[16px] text-navy tracking-tight-display leading-none mb-3 uppercase tracking-eyebrow","children":"Personal"}],["$","p",null,{"className":"font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed","children":"fiduciary liability for plan decisions under ERISA"}]]}]]}]}]]}]}]}],["$","section",null,{"className":"bg-white","children":["$","div",null,{"className":"max-w-content mx-auto px-6 md:px-12 py-16 md:py-24","children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-orange block mb-4","children":"How It Works"}],["$","h2",null,{"className":"font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-12","children":"Configure, Route, Settle"}],["$","div",null,{"className":"grid grid-cols-1 lg:grid-cols-3 gap-0","children":[["$","div",null,{"className":"border-t border-border pt-8 pb-8 lg:pr-8","children":[["$","span",null,{"className":"font-serif text-xs text-orange tracking-[0.06em] block mb-4","children":"01"}],["$","h4",null,{"className":"font-serif text-[19px] text-text-primary leading-[1.3] mb-4","children":"Configure"}],["$","p",null,{"className":"font-sans text-sm text-text-secondary leading-relaxed","children":"Select the high-cost drugs driving your spend. Define program rules: member cost share, prior authorization criteria, allowed fulfillment channels, and eligibility requirements. Your rules, your control. The platform is configured and ready to receive prescriptions through the standard e-prescribing workflow."}]]}],["$","div",null,{"className":"border-t border-border pt-8 pb-8 lg:px-8 lg:border-l","children":[["$","span",null,{"className":"font-serif text-xs text-orange tracking-[0.06em] block mb-4","children":"02"}],["$","h4",null,{"className":"font-serif text-[19px] text-text-primary leading-[1.3] mb-4","children":"Route"}],["$","p",null,{"className":"font-sans text-sm text-text-secondary leading-relaxed","children":"Every in-scope prescription is evaluated across all available channels in real time: PBM specialty, PBM mail, retail, manufacturer-direct, and independent pharmacy. The platform applies your program rules and routes to the lowest net cost. This is a routing decision across categorically distinct supply chain architectures, not a selection among pharmacies within a single channel."}]]}],["$","div",null,{"className":"border-t border-border pt-8 pb-8 lg:pl-8 lg:border-l","children":[["$","span",null,{"className":"font-serif text-xs text-orange tracking-[0.06em] block mb-4","children":"03"}],["$","h4",null,{"className":"font-serif text-[19px] text-text-primary leading-[1.3] mb-4","children":"Settle"}],["$","p",null,{"className":"font-sans text-sm text-text-secondary leading-relaxed","children":"Collect member cost share and report to plan accumulators. Bill plan portion through medical claim to TPA for data continuity. Pay suppliers via ACH with transparent, pass-through economics. Every prescription generates a decision-level record: channels compared, rules applied, routing rationale, net cost components."}]]}]]}]]}]}],["$","section",null,{"className":"bg-navy","children":["$","div",null,{"className":"max-w-content mx-auto px-6 md:px-12 py-16 md:py-24","children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-white/[0.35] block mb-4","children":"Why ApalyRx"}],["$","h2",null,{"className":"font-serif text-[28px] md:text-[36px] lg:text-[42px] text-white leading-[1.15] tracking-tight-display mb-14","children":"Five Structural Advantages"}],["$","div",null,{"className":"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0","children":[["$","div","Independent",{"className":"border-t border-white/[0.07] pt-6 pb-6  lg:pr-6","children":[["$","h4",null,{"className":"font-serif text-base text-white mb-3","children":"Independent"}],["$","p",null,{"className":"font-sans text-xs text-white/[0.45] leading-relaxed","children":"No ownership in any dispensing channel. Routing decisions are structurally independent. The evaluation has no financial interest in the outcome."}]]}],["$","div","Real-Time",{"className":"border-t border-white/[0.07] pt-6 pb-6 lg:border-l lg:pl-6 lg:pr-6","children":[["$","h4",null,{"className":"font-serif text-base text-white mb-3","children":"Real-Time"}],["$","p",null,{"className":"font-sans text-xs text-white/[0.45] leading-relaxed","children":"Every prescription routed at the point of decision, not sampled retrospectively, not reported after the fact. Real-time all-channel evaluation."}]]}],["$","div","Documented",{"className":"border-t border-white/[0.07] pt-6 pb-6 lg:border-l lg:pl-6 lg:pr-6","children":[["$","h4",null,{"className":"font-serif text-base text-white mb-3","children":"Documented"}],["$","p",null,{"className":"font-sans text-xs text-white/[0.45] leading-relaxed","children":"Decision-level records for every script: channels compared, rules applied, routing rationale, and closed-loop financial reconciliation."}]]}],["$","div","Compatible",{"className":"border-t border-white/[0.07] pt-6 pb-6 lg:border-l lg:pl-6 lg:pr-6","children":[["$","h4",null,{"className":"font-serif text-base text-white mb-3","children":"Compatible"}],["$","p",null,{"className":"font-sans text-xs text-white/[0.45] leading-relaxed","children":"Works alongside your existing PBM and TPA. Carve out only the high-cost drugs where routing optimization has the greatest impact."}]]}],["$","div","Manufacturer-Ready",{"className":"border-t border-white/[0.07] pt-6 pb-6 lg:border-l lg:pl-6 ","children":[["$","h4",null,{"className":"font-serif text-base text-white mb-3","children":"Manufacturer-Ready"}],["$","p",null,{"className":"font-sans text-xs text-white/[0.45] leading-relaxed","children":"Infrastructure for manufacturer direct-to-employer programs: eRx intake, eligibility, billing, settlement, and accumulator reporting built in."}]]}]]}]]}]}],["$","section",null,{"className":"bg-off-white","children":["$","div",null,{"className":"max-w-content mx-auto px-6 md:px-12 py-16 md:py-24","children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-orange block mb-4","children":"Drug Benefit Integrity"}],["$","h2",null,{"className":"font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-4","children":"Built on the Drug Benefit Integrity Standard"}],["$","p",null,{"className":"font-sans text-base text-text-secondary leading-body max-w-[680px] mb-10","children":"Drug Benefit Integrity (DBI) is an independent industry standard with five structural requirements for ensuring that pharmacy benefit decisions are made in the plan's interest. ApalyRx meets all five."}],["$","div",null,{"className":"max-w-[600px]","children":[["$","div","0",{"className":"flex items-start gap-4 py-4 border-b border-border","children":[["$","svg",null,{"className":"w-5 h-5 text-orange flex-shrink-0 mt-0.5","fill":"none","viewBox":"0 0 24 24","stroke":"currentColor","strokeWidth":2,"children":["$","path",null,{"strokeLinecap":"round","strokeLinejoin":"round","d":"M5 13l4 4L19 7"}]}],["$","span",null,{"className":"font-sans text-sm text-text-primary","children":"Real-time routing to lowest net cost across all channels"}]]}],["$","div","1",{"className":"flex items-start gap-4 py-4 border-b border-border","children":[["$","svg",null,{"className":"w-5 h-5 text-orange flex-shrink-0 mt-0.5","fill":"none","viewBox":"0 0 24 24","stroke":"currentColor","strokeWidth":2,"children":["$","path",null,{"strokeLinecap":"round","strokeLinejoin":"round","d":"M5 13l4 4L19 7"}]}],["$","span",null,{"className":"font-sans text-sm text-text-primary","children":"Pharmacy-licensed operator with no channel ownership"}]]}],["$","div","2",{"className":"flex items-start gap-4 py-4 border-b border-border","children":[["$","svg",null,{"className":"w-5 h-5 text-orange flex-shrink-0 mt-0.5","fill":"none","viewBox":"0 0 24 24","stroke":"currentColor","strokeWidth":2,"children":["$","path",null,{"strokeLinecap":"round","strokeLinejoin":"round","d":"M5 13l4 4L19 7"}]}],["$","span",null,{"className":"font-sans text-sm text-text-primary","children":"Manufacturer-direct programs built into the benefit"}]]}],["$","div","3",{"className":"flex items-start gap-4 py-4 border-b border-border","children":[["$","svg",null,{"className":"w-5 h-5 text-orange flex-shrink-0 mt-0.5","fill":"none","viewBox":"0 0 24 24","stroke":"currentColor","strokeWidth":2,"children":["$","path",null,{"strokeLinecap":"round","strokeLinejoin":"round","d":"M5 13l4 4L19 7"}]}],["$","span",null,{"className":"font-sans text-sm text-text-primary","children":"Fulfilled through independent community pharmacies"}]]}],["$","div","4",{"className":"flex items-start gap-4 py-4 border-b border-border","children":[["$","svg",null,{"className":"w-5 h-5 text-orange flex-shrink-0 mt-0.5","fill":"none","viewBox":"0 0 24 24","stroke":"currentColor","strokeWidth":2,"children":["$","path",null,{"strokeLinecap":"round","strokeLinejoin":"round","d":"M5 13l4 4L19 7"}]}],["$","span",null,{"className":"font-sans text-sm text-text-primary","children":"Decision-level records for every script"}]]}]]}],["$","p",null,{"className":"font-serif text-lg text-text-primary mt-8 mb-4","children":"ApalyRx is the only entity that meets all five requirements."}],["$","$L2",null,{"href":"/resources/drug-benefit-integrity","className":"font-sans text-[13px] text-navy border-b border-border hover:border-navy pb-0.5 tracking-link transition-colors duration-200","children":"Learn more about the DBI standard →"}]]}]}],["$","section",null,{"className":"bg-white","children":["$","div",null,{"className":"max-w-content mx-auto px-6 md:px-12 py-16 md:py-24","children":["$","div",null,{"className":"grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center","children":[["$","div",null,{"children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-orange block mb-4","children":"Get Started"}],["$","h2",null,{"className":"font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-6","children":"Let's Define Your Key Problem Drugs."}],["$","p",null,{"className":"font-sans text-base text-text-secondary leading-body","children":"Tell us which drug categories are driving your costs. We will show you how ApalyRx routes those prescriptions to the lowest net cost alongside your existing PBM and TPA, with decision-level documentation for every script and real savings projections based on your population."}]]}],["$","div",null,{"className":"flex flex-col items-start lg:items-end gap-4","children":["$","$L2",null,{"href":"/contact","className":"font-sans text-btn bg-navy hover:bg-navy-dark text-white px-6 py-2.5 transition-colors duration-200","children":"Schedule a Briefing"}]}]]}]}]}]],null],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","employers","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L4",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/993be0e35d18d548.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","$L5",null,{"id":"visitor-intelligence","strategy":"afterInteractive","children":"$6"}],["$","$L5",null,{"id":"rb2b","strategy":"afterInteractive","children":"\n!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement(\"script\");s.async=true;s.src=\"https://ddwl4m2hdecbv.cloudfront.net/b/\"+key+\"/\"+key+\".js.gz\";document.getElementsByTagName(\"script\")[0].parentNode.insertBefore(s,document.getElementsByTagName(\"script\")[0]);}(\"0NW1GHLK4MO4\");\n"}],["$","$L5",null,{"id":"apollo","strategy":"afterInteractive","children":"\nfunction initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement(\"script\");\no.src=\"https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=\"+n,o.async=!0,o.defer=!0,\no.onload=function(){window.trackingFunctions.onLoad({appId:\"66bb002f5b20eb02b9c7f982\"})},\ndocument.head.appendChild(o)}initApollo();\n"}]]}],["$","body",null,{"className":"font-sans antialiased","children":["$","$L7",null,{"children":["$","$L8",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L4",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]]}]],null],null],["$L9",null]]]]
9:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"Employers & Health Plans | Lowest Net Cost Drug Benefit Infrastructure | ApalyRx"}],["$","meta","3",{"name":"description","content":"ApalyRx operates alongside your existing PBM and TPA. Carve out only the high-cost drugs where routing optimization has the greatest impact. Decision-level documentation for every routing decision."}],["$","link","4",{"rel":"canonical","href":"https://www.apalyrx.com/employers"}],["$","meta","5",{"property":"og:title","content":"Employers & Health Plans | ApalyRx"}],["$","meta","6",{"property":"og:description","content":"Lowest net cost for every high-cost drug with documented proof for every decision. Works alongside your existing PBM and TPA."}],["$","meta","7",{"property":"og:url","content":"https://www.apalyrx.com/employers"}],["$","meta","8",{"property":"og:site_name","content":"ApalyRx"}],["$","meta","9",{"property":"og:type","content":"website"}],["$","meta","10",{"name":"twitter:card","content":"summary"}],["$","meta","11",{"name":"twitter:title","content":"Employers & Health Plans | ApalyRx"}],["$","meta","12",{"name":"twitter:description","content":"Lowest net cost for every high-cost drug with documented proof for every decision. Works alongside your existing PBM and TPA."}],["$","link","13",{"rel":"icon","href":"/favicon.png"}]]
1:null
