2:I[22857,["2972","static/chunks/2972-29c5dae376ddc3ad.js","1327","static/chunks/app/contact/page-502c256cd0679662.js"],"default"]
3:I[72972,["2972","static/chunks/2972-29c5dae376ddc3ad.js","1327","static/chunks/app/contact/page-502c256cd0679662.js"],""]
4:I[4707,[],""]
5:I[36423,[],""]
6:I[88003,["2972","static/chunks/2972-29c5dae376ddc3ad.js","8559","static/chunks/8559-e53883615fd36318.js","3185","static/chunks/app/layout-36f33b396049b3dc.js"],""]
8:I[41296,["2972","static/chunks/2972-29c5dae376ddc3ad.js","8559","static/chunks/8559-e53883615fd36318.js","3185","static/chunks/app/layout-36f33b396049b3dc.js"],"default"]
9:I[34526,["2972","static/chunks/2972-29c5dae376ddc3ad.js","8559","static/chunks/8559-e53883615fd36318.js","3185","static/chunks/app/layout-36f33b396049b3dc.js"],"default"]
7:T11cf,
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
0:["wQ2Wy1TBxB0r5TcJWFVdY",[[["",{"children":["contact",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],["",{"children":["contact",{"children":["__PAGE__",{},[["$L1",[["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"name\":\"Contact ApalyRx\",\"description\":\"Schedule a briefing to discuss how ApalyRx provides direct-to-employer drug benefit infrastructure for manufacturers, employers, and independent pharmacies.\",\"url\":\"https://www.apalyrx.com/contact\",\"isPartOf\":{\"@type\":\"WebSite\",\"name\":\"ApalyRx\",\"url\":\"https://www.apalyrx.com\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"ApalyRx\",\"url\":\"https://www.apalyrx.com\"}}"}}],["$","section",null,{"className":"relative bg-navy overflow-hidden","children":[["$","div",null,{"className":"absolute top-0 right-0 w-[600px] h-[600px]","style":{"background":"radial-gradient(circle at center, rgba(255,94,0,0.05), transparent 70%)"}}],["$","div",null,{"className":"relative max-w-content mx-auto px-6 md:px-12 pt-[140px] md:pt-[180px] pb-16 md:pb-24","children":["$","div",null,{"className":"max-w-3xl","children":[["$","h1",null,{"className":"font-serif text-[34px] md:text-[48px] lg:text-[60px] text-white leading-[1.1] tracking-tighter-display mb-6","children":"Schedule a Briefing"}],["$","p",null,{"className":"font-sans text-base md:text-lg text-white/[0.60] leading-body mb-10 max-w-[560px]","children":"Whether you are a manufacturer, employer, health plan, or pharmacy, we welcome the conversation."}],"$undefined"]}]}]]}],["$","section",null,{"className":"bg-off-white","children":["$","div",null,{"className":"max-w-2xl mx-auto px-6 md:px-12 py-16 md:py-24","children":[["$","div",null,{"className":"bg-white border border-border p-6 sm:p-10","children":["$","$L2",null,{}]}],["$","div",null,{"className":"mt-12 text-center space-y-4","children":[["$","p",null,{"className":"font-sans text-sm text-text-secondary","children":["Or reach us directly:"," ",["$","a",null,{"href":"mailto:sales@apalyrx.com","className":"font-sans text-navy border-b border-border hover:border-navy pb-0.5 transition-colors duration-200","children":"sales@apalyrx.com"}]]}],["$","p",null,{"children":["$","$L3",null,{"href":"/resources/drug-benefit-integrity","className":"font-sans text-[13px] text-navy border-b border-border hover:border-navy pb-0.5 tracking-link transition-colors duration-200","children":"Learn about the Drug Benefit Integrity standard →"}]}]]}]]}]}]],null],null],null]},[null,["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children","contact","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/993be0e35d18d548.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","$L6",null,{"id":"visitor-intelligence","strategy":"afterInteractive","children":"$7"}],["$","$L6",null,{"id":"rb2b","strategy":"afterInteractive","children":"\n!function(key){if(window.reb2b)return;window.reb2b={loaded:true};var s=document.createElement(\"script\");s.async=true;s.src=\"https://ddwl4m2hdecbv.cloudfront.net/b/\"+key+\"/\"+key+\".js.gz\";document.getElementsByTagName(\"script\")[0].parentNode.insertBefore(s,document.getElementsByTagName(\"script\")[0]);}(\"0NW1GHLK4MO4\");\n"}],["$","$L6",null,{"id":"apollo","strategy":"afterInteractive","children":"\nfunction initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement(\"script\");\no.src=\"https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=\"+n,o.async=!0,o.defer=!0,\no.onload=function(){window.trackingFunctions.onLoad({appId:\"66bb002f5b20eb02b9c7f982\"})},\ndocument.head.appendChild(o)}initApollo();\n"}]]}],["$","body",null,{"className":"font-sans antialiased","children":["$","$L8",null,{"children":["$","$L9",null,{"children":["$","$L4",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]]}]],null],null],["$La",null]]]]
a:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"Contact ApalyRx | Schedule a Briefing | ApalyRx"}],["$","meta","3",{"name":"description","content":"Contact ApalyRx to discuss manufacturer direct-to-employer programs, employer drug benefit optimization, or independent pharmacy partnerships. We will show you how the platform addresses your specific requirements."}],["$","link","4",{"rel":"canonical","href":"https://www.apalyrx.com/contact"}],["$","meta","5",{"property":"og:title","content":"Contact ApalyRx | Schedule a Briefing"}],["$","meta","6",{"property":"og:description","content":"Contact us to discuss your portfolio, your existing distribution model, and the fastest path to a live direct-to-employer deployment."}],["$","meta","7",{"property":"og:url","content":"https://www.apalyrx.com/contact"}],["$","meta","8",{"property":"og:site_name","content":"ApalyRx"}],["$","meta","9",{"property":"og:type","content":"website"}],["$","meta","10",{"name":"twitter:card","content":"summary"}],["$","meta","11",{"name":"twitter:title","content":"Contact ApalyRx | Schedule a Briefing"}],["$","meta","12",{"name":"twitter:description","content":"Contact us to discuss your portfolio, your existing distribution model, and the fastest path to a live direct-to-employer deployment."}],["$","link","13",{"rel":"icon","href":"/favicon.png"}]]
1:null
