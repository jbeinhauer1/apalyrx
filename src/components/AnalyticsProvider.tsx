"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { analytics } from "@/lib/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 90, 100];
const TIME_MILESTONES = [30, 60, 120, 300];

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const scrollMilestonesHit = useRef(new Set<number>());
  const timeMilestonesHit = useRef(new Set<number>());
  const pageStart = useRef(Date.now());

  // Track page views on route change
  useEffect(() => {
    analytics.trackPageView(pathname, document.title);
    scrollMilestonesHit.current.clear();
    timeMilestonesHit.current.clear();
    pageStart.current = Date.now();
  }, [pathname]);

  // Track scroll depth milestones
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of SCROLL_MILESTONES) {
        if (pct >= milestone && !scrollMilestonesHit.current.has(milestone)) {
          scrollMilestonesHit.current.add(milestone);
          analytics.trackScroll(milestone);
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Track time on page milestones
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.round((Date.now() - pageStart.current) / 1000);
      for (const milestone of TIME_MILESTONES) {
        if (elapsed >= milestone && !timeMilestonesHit.current.has(milestone)) {
          timeMilestonesHit.current.add(milestone);
          analytics.trackTimeOnPage(milestone);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [pathname]);

  return <>{children}</>;
}
