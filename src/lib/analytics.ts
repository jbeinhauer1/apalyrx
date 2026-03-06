/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: Record<string, any>[];
  }
}

function pushToDataLayer(event: string, data: Record<string, any>) {
  const payload = { event, ...data, timestamp: new Date().toISOString() };

  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  if (window.gtag) {
    window.gtag("event", event, data);
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", event, data);
  }
}

export function trackEvent(event: string, data: Record<string, any> = {}) {
  pushToDataLayer(event, data);
}

export const analytics = {
  trackNavigation(destination: string) {
    pushToDataLayer("navigation", { destination });
  },

  trackCTAClick(ctaName: string, location: string) {
    pushToDataLayer("cta_click", { cta_name: ctaName, location });
  },

  trackCalculatorStart() {
    pushToDataLayer("calculator_start", {});
  },

  trackCalculatorSubmit(data: {
    planMembers: number;
    currentUsers: number;
    costPerFill: number;
    projectedSavings: number;
  }) {
    pushToDataLayer("calculator_submit", data);
  },

  trackFormStart(formName: string) {
    pushToDataLayer("form_start", { form_name: formName });
  },

  trackFormSubmit(formName: string, success: boolean) {
    pushToDataLayer("form_submit", { form_name: formName, success });
  },

  trackPageView(pagePath: string, pageTitle: string) {
    pushToDataLayer("page_view", { page_path: pagePath, page_title: pageTitle });
  },

  trackScroll(scrollDepth: number) {
    pushToDataLayer("scroll_depth", { scroll_depth: scrollDepth });
  },

  trackTimeOnPage(seconds: number) {
    pushToDataLayer("time_on_page", { seconds });
  },

  trackResourceDownload(resourceName: string, resourceType: string) {
    pushToDataLayer("resource_download", {
      resource_name: resourceName,
      resource_type: resourceType,
    });
  },

  trackResourceView(resourceName: string, resourceType: string) {
    pushToDataLayer("resource_view", {
      resource_name: resourceName,
      resource_type: resourceType,
    });
  },
};
