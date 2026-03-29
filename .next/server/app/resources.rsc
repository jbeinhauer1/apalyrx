2:I[72972,["2972","static/chunks/2972-29c5dae376ddc3ad.js","7126","static/chunks/app/resources/page-bbab0b669a679eb4.js"],""]
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
0:["wQ2Wy1TBxB0r5TcJWFVdY",[[["",{"children":["resources",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],["",{"children":["resources",{"children":["__PAGE__",{},[["$L1",[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"name\":\"Resources | Pharmacy Benefit Education & Industry Standards\",\"description\":\"Authoritative resources on drug benefit integrity, prescription routing, PBM compliance, and direct-to-employer programs.\",\"url\":\"https://www.apalyrx.com/resources\",\"isPartOf\":{\"@type\":\"WebSite\",\"name\":\"ApalyRx\",\"url\":\"https://www.apalyrx.com\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"ApalyRx\",\"url\":\"https://www.apalyrx.com\"}}"}}],["$","section",null,{"className":"relative bg-navy overflow-hidden","children":[["$","div",null,{"className":"absolute inset-0 opacity-10","style":{"backgroundImage":"radial-gradient(circle at 1px 1px, rgba(242, 101, 34, 0.3) 1px, transparent 0)","backgroundSize":"40px 40px"}}],["$","div",null,{"className":"relative max-w-4xl mx-auto px-4 pt-28 sm:pt-32 md:pt-48 lg:pt-56 pb-12 md:pb-20 text-center","children":[["$","div",null,{"className":"inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20","children":[["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-book-open w-4 h-4","aria-hidden":"true","children":[["$","path","1akyts",{"d":"M12 7v14"}],["$","path","ruj8y",{"d":"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"}],"$undefined"]}],["$","span",null,{"className":"font-sans","children":"Resources"}]]}],["$","h1",null,{"className":"font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white mb-4","children":"Industry Standards & Education"}],["$","p",null,{"className":"font-sans text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto","children":"Authoritative resources on pharmacy benefit integrity, prescription routing, and the structural standards shaping the future of drug benefits."}]]}]]}],["$","section",null,{"className":"bg-off-white","children":["$","div",null,{"className":"max-w-content mx-auto px-4 py-16 md:py-24","children":["$","div",null,{"className":"grid grid-cols-1 md:grid-cols-2 gap-8","children":[["$","$L2","/resources/drug-benefit-integrity",{"href":"/resources/drug-benefit-integrity","className":"group bg-white border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-orange/30 transition-all duration-300","children":[["$","span",null,{"className":"inline-block font-sans text-xs font-semibold uppercase tracking-wider text-orange bg-orange/10 px-3 py-1 rounded-full mb-4","children":"Industry Standard"}],["$","h2",null,{"className":"font-serif text-xl md:text-2xl text-navy mb-3 group-hover:text-orange transition-colors duration-300","children":"Drug Benefit Integrity (DBI): The Five-Requirement Standard"}],["$","p",null,{"className":"font-sans text-text-secondary text-sm md:text-base leading-relaxed mb-6","children":"An independent standard with five structural requirements for ensuring that pharmacy benefit decisions are made in the plan's interest. Learn what DBI means, why it matters, and how it compares to transparency alone."}],["$","span",null,{"className":"inline-flex items-center gap-2 font-sans text-sm font-semibold text-orange group-hover:gap-3 transition-all duration-300","children":["Read More ",["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right w-4 h-4","aria-hidden":"true","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}],["$","$L2","/resources/direct-to-employer-drug-programs",{"href":"/resources/direct-to-employer-drug-programs","className":"group bg-white border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-orange/30 transition-all duration-300","children":[["$","span",null,{"className":"inline-block font-sans text-xs font-semibold uppercase tracking-wider text-orange bg-orange/10 px-3 py-1 rounded-full mb-4","children":"Education"}],["$","h2",null,{"className":"font-serif text-xl md:text-2xl text-navy mb-3 group-hover:text-orange transition-colors duration-300","children":"Direct-to-Employer Drug Programs (DTE): What Employers Need to Know"}],["$","p",null,{"className":"font-sans text-text-secondary text-sm md:text-base leading-relaxed mb-6","children":"Manufacturers are going direct. LillyDirect, NovoCare, TrumpRx: the supply chain is shifting. Learn what DTE means, how it works, and what infrastructure is required to bring these programs inside the benefit."}],["$","span",null,{"className":"inline-flex items-center gap-2 font-sans text-sm font-semibold text-orange group-hover:gap-3 transition-all duration-300","children":["Read More ",["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right w-4 h-4","aria-hidden":"true","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}],["$","$L2","/resources/lowest-net-cost-routing",{"href":"/resources/lowest-net-cost-routing","className":"group bg-white border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-orange/30 transition-all duration-300","children":[["$","span",null,{"className":"inline-block font-sans text-xs font-semibold uppercase tracking-wider text-orange bg-orange/10 px-3 py-1 rounded-full mb-4","children":"Education"}],["$","h2",null,{"className":"font-serif text-xl md:text-2xl text-navy mb-3 group-hover:text-orange transition-colors duration-300","children":"What Is Lowest Net Cost Prescription Routing?"}],["$","p",null,{"className":"font-sans text-text-secondary text-sm md:text-base leading-relaxed mb-6","children":"Every plan sponsor wants the lowest net cost. But how do you verify it across all channels: PBM, specialty, mail, manufacturer-direct, in real time, at the point of decision? Here's what the term actually means and why it matters."}],["$","span",null,{"className":"inline-flex items-center gap-2 font-sans text-sm font-semibold text-orange group-hover:gap-3 transition-all duration-300","children":["Read More ",["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right w-4 h-4","aria-hidden":"true","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}],["$","$L2","/resources/pbm-fiduciary-compliance",{"href":"/resources/pbm-fiduciary-compliance","className":"group bg-white border border-gray-200 p-8 shadow-sm hover:shadow-lg hover:border-orange/30 transition-all duration-300","children":[["$","span",null,{"className":"inline-block font-sans text-xs font-semibold uppercase tracking-wider text-orange bg-orange/10 px-3 py-1 rounded-full mb-4","children":"Compliance"}],["$","h2",null,{"className":"font-serif text-xl md:text-2xl text-navy mb-3 group-hover:text-orange transition-colors duration-300","children":"PBM Fiduciary Compliance: How Employers Can Prove Prudent Oversight"}],["$","p",null,{"className":"font-sans text-text-secondary text-sm md:text-base leading-relaxed mb-6","children":"CAA 2026, the DOL proposed rule, and ERISA litigation are raising the bar for pharmacy benefit oversight. A practical guide to demonstrating fiduciary prudence: not just transparency, but verifiable decision-level integrity."}],["$","span",null,{"className":"inline-flex items-center gap-2 font-sans text-sm font-semibold text-orange group-hover:gap-3 transition-all duration-300","children":["Read More ",["$","svg",null,{"xmlns":"http://www.w3.org/2000/svg","width":24,"height":24,"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":2,"strokeLinecap":"round","strokeLinejoin":"round","className":"lucide lucide-arrow-right w-4 h-4","aria-hidden":"true","children":[["$","path","1ays0h",{"d":"M5 12h14"}],["$","path","xquz4c",{"d":"m12 5 7 7-7 7"}],"$undefined"]}]]}]]}]]}]}]}]],null],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","resources","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L4",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/993be0e35d18d548.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","$L5",null,{"id":"visitor-intelligence","strategy":"afterInteractive","children":"$6"}],["$","$L5",null,{"id":"rb2b","strategy":"afterInteractive","children":"\n!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement(\"script\");s.async=true;s.src=\"https://ddwl4m2hdecbv.cloudfront.net/b/\"+key+\"/\"+key+\".js.gz\";document.getElementsByTagName(\"script\")[0].parentNode.insertBefore(s,document.getElementsByTagName(\"script\")[0]);}(\"0NW1GHLK4MO4\");\n"}],["$","$L5",null,{"id":"apollo","strategy":"afterInteractive","children":"\nfunction initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement(\"script\");\no.src=\"https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=\"+n,o.async=!0,o.defer=!0,\no.onload=function(){window.trackingFunctions.onLoad({appId:\"66bb002f5b20eb02b9c7f982\"})},\ndocument.head.appendChild(o)}initApollo();\n"}]]}],["$","body",null,{"className":"font-sans antialiased","children":["$","$L7",null,{"children":["$","$L8",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L4",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]]}]],null],null],["$L9",null]]]]
9:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"Resources | Pharmacy Benefit Education & Industry Standards | ApalyRx"}],["$","meta","3",{"name":"description","content":"Authoritative resources on drug benefit integrity, lowest net cost prescription routing, PBM fiduciary compliance, and direct-to-employer drug programs from ApalyRx."}],["$","link","4",{"rel":"canonical","href":"https://www.apalyrx.com/resources"}],["$","meta","5",{"property":"og:title","content":"Resources | Pharmacy Benefit Education & Industry Standards"}],["$","meta","6",{"property":"og:description","content":"Authoritative resources on drug benefit integrity, prescription routing, PBM compliance, and direct-to-employer programs."}],["$","meta","7",{"property":"og:url","content":"https://www.apalyrx.com/resources"}],["$","meta","8",{"property":"og:site_name","content":"ApalyRx"}],["$","meta","9",{"property":"og:type","content":"website"}],["$","meta","10",{"name":"twitter:card","content":"summary"}],["$","meta","11",{"name":"twitter:title","content":"Resources | Pharmacy Benefit Education & Industry Standards"}],["$","meta","12",{"name":"twitter:description","content":"Authoritative resources on drug benefit integrity, prescription routing, PBM compliance, and direct-to-employer programs."}],["$","link","13",{"rel":"icon","href":"/favicon.png"}]]
1:null
