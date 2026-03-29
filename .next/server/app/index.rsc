2:I[72972,["2972","static/chunks/2972-29c5dae376ddc3ad.js","1931","static/chunks/app/page-cc2064e5d302b0f2.js"],""]
3:I[88003,["2972","static/chunks/2972-29c5dae376ddc3ad.js","8559","static/chunks/8559-e53883615fd36318.js","3185","static/chunks/app/layout-36f33b396049b3dc.js"],""]
5:I[41296,["2972","static/chunks/2972-29c5dae376ddc3ad.js","8559","static/chunks/8559-e53883615fd36318.js","3185","static/chunks/app/layout-36f33b396049b3dc.js"],"default"]
6:I[34526,["2972","static/chunks/2972-29c5dae376ddc3ad.js","8559","static/chunks/8559-e53883615fd36318.js","3185","static/chunks/app/layout-36f33b396049b3dc.js"],"default"]
7:I[4707,[],""]
8:I[36423,[],""]
4:T11cf,
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
0:["wQ2Wy1TBxB0r5TcJWFVdY",[[["",{"children":["__PAGE__",{}]},"$undefined","$undefined",true],["",{"children":["__PAGE__",{},[["$L1",[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"ApalyRx\",\"url\":\"https://www.apalyrx.com\",\"logo\":\"https://www.apalyrx.com/apalyrx-logo-full-color.png\",\"description\":\"ApalyRx works alongside PBMs to independently route high-cost prescriptions in real time to the lowest net cost and documents every decision.\",\"address\":{\"@type\":\"PostalAddress\",\"addressLocality\":\"Tampa\",\"addressRegion\":\"FL\",\"addressCountry\":\"US\"},\"email\":\"sales@apalyrx.com\",\"sameAs\":[\"https://www.linkedin.com/company/apalyrx\"],\"knowsAbout\":[\"Pharmacy Benefit Management\",\"Prescription Routing\",\"Drug Benefit Integrity\",\"Pharmacy Benefits Verification\",\"GLP-1 Medications\",\"Manufacturer Direct Programs\"]}"}}],["$","section",null,{"className":"relative bg-navy overflow-hidden","children":[["$","div",null,{"className":"absolute top-0 right-0 w-[600px] h-[600px]","style":{"background":"radial-gradient(circle at center, rgba(255,94,0,0.05), transparent 70%)"}}],["$","div",null,{"className":"relative max-w-content mx-auto px-6 md:px-12 pt-[140px] md:pt-[180px] pb-16 md:pb-24","children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-white/[0.35] block mb-5","children":"Drug Benefit Infrastructure"}],["$","div",null,{"className":"w-10 h-[2px] bg-orange mb-8"}],["$","h1",null,{"className":"font-serif text-[34px] md:text-[48px] lg:text-[60px] text-white leading-[1.1] tracking-tighter-display max-w-[720px] mb-6","children":"The Operating Layer for Manufacturer Direct-to-Employer Programs"}],["$","p",null,{"className":"font-sans text-base md:text-lg text-white/[0.60] max-w-[560px] leading-body mb-10","children":"ApalyRx provides the complete operational, regulatory, and technology infrastructure that makes a manufacturer's direct-to-employer channel executable. Existing distribution arrangements remain intact by architecture, not by workaround."}],["$","div",null,{"className":"flex flex-col sm:flex-row gap-4","children":[["$","$L2",null,{"href":"/manufacturers","className":"font-sans text-btn bg-white text-navy hover:bg-white/90 px-6 py-2.5 transition-colors duration-200 text-center","children":"For Manufacturers"}],["$","$L2",null,{"href":"/employers","className":"font-sans text-btn text-white border border-white/[0.45] hover:border-white hover:bg-white/[0.07] px-6 py-2.5 transition-colors duration-200 text-center","children":"For Employers"}]]}]]}]]}],["$","section",null,{"className":"bg-[#0a1e38]","children":["$","div",null,{"className":"max-w-content mx-auto px-6 md:px-12 py-6 md:py-8","children":["$","div",null,{"className":"flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12","children":[[["$","div","Covered lives",{"className":"flex items-center gap-8 md:gap-12","children":[["$","div",null,{"className":"text-center","children":[["$","div",null,{"className":"font-serif text-white text-2xl md:text-[30px] tracking-tight-display","children":"500K+"}],["$","div",null,{"className":"font-sans text-white/[0.38] text-xs tracking-wide mt-0.5","children":"Covered lives"}]]}],["$","div",null,{"className":"hidden md:block w-px h-8 bg-white/[0.07]"}]]}],["$","div","NPS",{"className":"flex items-center gap-8 md:gap-12","children":[["$","div",null,{"className":"text-center","children":[["$","div",null,{"className":"font-serif text-white text-2xl md:text-[30px] tracking-tight-display","children":"88"}],["$","div",null,{"className":"font-sans text-white/[0.38] text-xs tracking-wide mt-0.5","children":"NPS"}]]}],["$","div",null,{"className":"hidden md:block w-px h-8 bg-white/[0.07]"}]]}],["$","div","Cost reduction",{"className":"flex items-center gap-8 md:gap-12","children":[["$","div",null,{"className":"text-center","children":[["$","div",null,{"className":"font-serif text-white text-2xl md:text-[30px] tracking-tight-display","children":"20%+"}],["$","div",null,{"className":"font-sans text-white/[0.38] text-xs tracking-wide mt-0.5","children":"Cost reduction"}]]}],["$","div",null,{"className":"hidden md:block w-px h-8 bg-white/[0.07]"}]]}],["$","div","Operating since",{"className":"flex items-center gap-8 md:gap-12","children":[["$","div",null,{"className":"text-center","children":[["$","div",null,{"className":"font-serif text-white text-2xl md:text-[30px] tracking-tight-display","children":"2018"}],["$","div",null,{"className":"font-sans text-white/[0.38] text-xs tracking-wide mt-0.5","children":"Operating since"}]]}],false]}]],["$","div",null,{"className":"hidden md:block w-px h-8 bg-white/[0.07]"}],["$","div",null,{"className":"flex items-center gap-3","children":[["$","span","HIPAA",{"className":"text-[10px] uppercase tracking-wider text-white/[0.38] border border-white/[0.10] px-3 py-1.5","children":"HIPAA"}],["$","span","SOC 2",{"className":"text-[10px] uppercase tracking-wider text-white/[0.38] border border-white/[0.10] px-3 py-1.5","children":"SOC 2"}],["$","span","Patent Pending 2026",{"className":"text-[10px] uppercase tracking-wider text-white/[0.38] border border-white/[0.10] px-3 py-1.5","children":"Patent Pending 2026"}]]}]]}]}]}],["$","section",null,{"className":"bg-off-white","children":["$","div",null,{"className":"max-w-content mx-auto px-6 md:px-12 py-16 md:py-24","children":["$","div",null,{"className":"grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24","children":[["$","div",null,{"children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-orange block mb-4","children":"The Market Moment"}],["$","h2",null,{"className":"font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-8","children":"The Direct-to-Employer Channel Is Taking Shape Now"}],["$","div",null,{"className":"space-y-5 font-sans text-base text-text-secondary leading-body","children":[["$","p",null,{"children":"The employer-sponsored health plan market represents 154 million Americans in self-funded plans. It is the only channel that does not require PBM formulary permission. Manufacturers who establish credible, compliant direct-to-employer infrastructure now will help define the standard."}],["$","p",null,{"children":"The legislative environment has shifted materially. Regulatory scrutiny of intermediary practices is at its highest point in a generation. The manufacturers who move now will be significantly better positioned than those who wait."}],["$","p",null,{"children":"ApalyRx has built the infrastructure. The question is not whether to build a direct-to-employer channel. It is whether your organization accesses what is already operational today."}]]}]]}],["$","div",null,{"className":"border-t lg:border-t-0 lg:border-l border-border pt-8 lg:pt-0 lg:pl-20","children":["$","div",null,{"className":"space-y-0","children":[["$","div",null,{"className":"pb-8 border-b border-border","children":[["$","div",null,{"className":"font-serif text-[40px] md:text-[46px] text-navy tracking-tight-display leading-none mb-3","children":"40–60%"}],["$","p",null,{"className":"font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed","children":"of WAC captured by intermediaries in standard distribution. Wholesaler margin, PBM spread, specialty pharmacy fees, and rebate float."}]]}],["$","div",null,{"className":"py-8 border-b border-border","children":[["$","div",null,{"className":"font-serif text-[40px] md:text-[46px] text-navy tracking-tight-display leading-none mb-3","children":"90–180 days"}],["$","p",null,{"className":"font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed","children":"rebates held by intermediaries before any portion reaches the employer plan"}]]}],["$","div",null,{"className":"pt-8","children":[["$","div",null,{"className":"font-serif text-[40px] md:text-[46px] text-navy tracking-tight-display leading-none mb-3","children":"154M"}],["$","p",null,{"className":"font-sans text-[13px] text-text-secondary max-w-[280px] leading-relaxed","children":"Americans in self-funded employer plans. A channel that does not require formulary permission to access."}]]}]]}]}]]}]}]}],["$","section",null,{"className":"bg-white","children":["$","div",null,{"className":"max-w-content mx-auto px-6 md:px-12 py-16 md:py-24","children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-orange block mb-4","children":"Who We Serve"}],["$","h2",null,{"className":"font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-12","children":["Infrastructure Built for Two Parties.",["$","br",null,{}],"Designed for One Outcome."]}],["$","div",null,{"className":"grid grid-cols-1 md:grid-cols-2","style":{"gap":"2px","background":"rgba(16,42,76,0.10)"},"children":[["$","div",null,{"className":"bg-white p-8 md:p-12","children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-orange block mb-3","children":"For Manufacturers"}],["$","h3",null,{"className":"font-serif text-[22px] md:text-[26px] text-text-primary leading-[1.2] tracking-tight-display mb-4","children":"Your DTE Channel. Built, Operational, Ready to Activate."}],["$","p",null,{"className":"font-sans text-base text-text-secondary leading-body mb-6","children":"ApalyRx provides the complete operating layer for manufacturer direct-to-employer programs: eRx intake, eligibility, fulfillment routing, medical-claim billing, accumulator reporting, and supplier settlement. Your existing channel arrangements remain intact by architecture, not by workaround."}],["$","$L2",null,{"href":"/manufacturers","className":"font-sans text-[13px] text-navy border-b border-border hover:border-navy pb-0.5 tracking-link transition-colors duration-200","children":"Manufacturer Infrastructure →"}]]}],["$","div",null,{"className":"bg-off-white p-8 md:p-12","children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-orange block mb-3","children":"For Employers & Health Plans"}],["$","h3",null,{"className":"font-serif text-[22px] md:text-[26px] text-text-primary leading-[1.2] tracking-tight-display mb-4","children":"Lowest Net Cost. Every Script. Full Audit Record."}],["$","p",null,{"className":"font-sans text-base text-text-secondary leading-body mb-6","children":"Configure targeted drug programs, access manufacturer-direct pricing inside your benefit, and receive decision-level documentation for every routing decision. Works alongside your existing PBM and TPA. Nothing changes except the cost and the transparency."}],["$","$L2",null,{"href":"/employers","className":"font-sans text-[13px] text-navy border-b border-border hover:border-navy pb-0.5 tracking-link transition-colors duration-200","children":"Employer Platform →"}]]}]]}]]}]}],["$","section",null,{"id":"how-it-works","className":"bg-navy","children":["$","div",null,{"className":"max-w-content mx-auto px-6 md:px-12 py-16 md:py-24","children":[["$","div",null,{"className":"grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-14","children":[["$","h2",null,{"className":"font-serif text-[28px] md:text-[36px] lg:text-[42px] text-white leading-[1.15] tracking-tight-display","children":"Built for Enterprise Scale and Compliance"}],["$","p",null,{"className":"font-sans text-base text-white/50 leading-body lg:pt-2","children":"ApalyRx is the only platform that meets all five Drug Benefit Integrity requirements simultaneously. Real-time routing, no channel ownership, manufacturer-direct programs inside the benefit, independent pharmacy fulfillment, and per-prescription decision-level records."}]]}],["$","div",null,{"className":"grid grid-cols-1 lg:grid-cols-3 gap-0","children":[["$","div",null,{"className":"border-t border-white/[0.07] pt-8 pb-8 lg:pr-8","children":[["$","span",null,{"className":"font-serif text-xs text-orange tracking-[0.06em] block mb-4","children":"01"}],["$","h4",null,{"className":"font-serif text-[19px] text-white leading-[1.3] mb-4","children":"Existing Arrangements Protected by Architecture"}],["$","p",null,{"className":"font-sans text-sm text-white/[0.45] leading-relaxed","children":"The manufacturer's only counterparty is ApalyRx. There are no direct employer relationships to establish or defend. Existing channel relationships with distributors and commercial partners are preserved by design through a commercial structure built around a single contracted relationship, one counterparty, one monthly invoice, one rebate line deduction."}]]}],["$","div",null,{"className":"border-t border-white/[0.07] pt-8 pb-8 lg:px-8 lg:border-l","children":[["$","span",null,{"className":"font-serif text-xs text-orange tracking-[0.06em] block mb-4","children":"02"}],["$","h4",null,{"className":"font-serif text-[19px] text-white leading-[1.3] mb-4","children":"Patent-Pending DSCSA Compliance in a Custody-Without-Title Model"}],["$","p",null,{"className":"font-sans text-sm text-white/[0.45] leading-relaxed","children":"The only platform that generates per-prescription DSCSA T3 documentation in a custody-without-title 3PL model without a standard change-of-ownership trigger. No existing compliance tool, distributor, or specialty pharmacy has solved this. No manufacturer system builds required. Provisional patent filed March 2026."}]]}],["$","div",null,{"className":"border-t border-white/[0.07] pt-8 pb-8 lg:pl-8 lg:border-l","children":[["$","span",null,{"className":"font-serif text-xs text-orange tracking-[0.06em] block mb-4","children":"03"}],["$","h4",null,{"className":"font-serif text-[19px] text-white leading-[1.3] mb-4","children":"One Ship-To Address. ApalyRx Handles Everything Else."}],["$","p",null,{"className":"font-sans text-sm text-white/[0.45] leading-relaxed","children":"The manufacturer ships bulk to the ApalyRx-designated 3PL on its existing monthly cadence, identical to any distributor shipment. ApalyRx manages 3PL coordination, pharmacy credentialing across all 50 states, DSCSA documentation, fulfillment routing, and all downstream operations."}]]}]]}]]}]}],["$","section",null,{"className":"bg-off-white","children":["$","div",null,{"className":"max-w-content mx-auto px-6 md:px-12 py-16 md:py-24","children":["$","div",null,{"className":"grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center","children":[["$","div",null,{"children":[["$","span",null,{"className":"font-sans text-eyebrow uppercase text-orange block mb-4","children":"Get Started"}],["$","h2",null,{"className":"font-serif text-[28px] md:text-[36px] lg:text-[42px] text-text-primary leading-[1.15] tracking-tight-display mb-6","children":"This Is Not a Pilot Program. The Infrastructure Is Operational Today."}],["$","p",null,{"className":"font-sans text-base text-text-secondary leading-body","children":"ApalyRx has been operating since 2018 and serves Fortune 500 employers. The platform is live, compliant, and ready to activate. Tell us which high-cost drugs are driving your costs. We will show you how ApalyRx addresses them."}]]}],["$","div",null,{"className":"flex flex-col items-start lg:items-end gap-4","children":[["$","$L2",null,{"href":"/contact","className":"font-sans text-btn bg-navy hover:bg-navy-dark text-white px-6 py-2.5 transition-colors duration-200","children":"Schedule a Briefing"}],["$","$L2",null,{"href":"/#how-it-works","className":"font-sans text-[13px] text-navy border-b border-border hover:border-navy pb-0.5 tracking-link transition-colors duration-200","children":"View the Platform →"}]]}]]}]}]}]],null],null],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/993be0e35d18d548.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","$L3",null,{"id":"visitor-intelligence","strategy":"afterInteractive","children":"$4"}],["$","$L3",null,{"id":"rb2b","strategy":"afterInteractive","children":"\n!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement(\"script\");s.async=true;s.src=\"https://ddwl4m2hdecbv.cloudfront.net/b/\"+key+\"/\"+key+\".js.gz\";document.getElementsByTagName(\"script\")[0].parentNode.insertBefore(s,document.getElementsByTagName(\"script\")[0]);}(\"0NW1GHLK4MO4\");\n"}],["$","$L3",null,{"id":"apollo","strategy":"afterInteractive","children":"\nfunction initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement(\"script\");\no.src=\"https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=\"+n,o.async=!0,o.defer=!0,\no.onload=function(){window.trackingFunctions.onLoad({appId:\"66bb002f5b20eb02b9c7f982\"})},\ndocument.head.appendChild(o)}initApollo();\n"}]]}],["$","body",null,{"className":"font-sans antialiased","children":["$","$L5",null,{"children":["$","$L6",null,{"children":["$","$L7",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L8",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]]}]],null],null],["$L9",null]]]]
9:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"ApalyRx | The Operating Layer for Manufacturer Direct-to-Employer Programs"}],["$","meta","3",{"name":"description","content":"ApalyRx provides the complete operational, regulatory, and technology infrastructure that makes a manufacturer's direct-to-employer channel executable. Independent prescription routing to the lowest net cost with decision-level documentation."}],["$","link","4",{"rel":"canonical","href":"https://www.apalyrx.com"}],["$","meta","5",{"property":"og:title","content":"ApalyRx | The Operating Layer for Manufacturer Direct-to-Employer Programs"}],["$","meta","6",{"property":"og:description","content":"Complete operational, regulatory, and technology infrastructure for manufacturer direct-to-employer drug benefit programs."}],["$","meta","7",{"property":"og:url","content":"https://www.apalyrx.com"}],["$","meta","8",{"property":"og:site_name","content":"ApalyRx"}],["$","meta","9",{"property":"og:locale","content":"en_US"}],["$","meta","10",{"property":"og:type","content":"website"}],["$","meta","11",{"name":"twitter:card","content":"summary"}],["$","meta","12",{"name":"twitter:title","content":"ApalyRx | The Operating Layer for Manufacturer Direct-to-Employer Programs"}],["$","meta","13",{"name":"twitter:description","content":"Complete operational, regulatory, and technology infrastructure for manufacturer direct-to-employer drug benefit programs."}],["$","link","14",{"rel":"icon","href":"/favicon.png"}]]
1:null
