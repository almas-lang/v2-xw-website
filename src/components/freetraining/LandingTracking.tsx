'use client';

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { setStorageJSON } from "@/lib/freetraining/storage";
import { trackPageView, trackScrollDepth } from "@/lib/freetraining/track";

/**
 * Page-view, UTM capture and scroll-depth tracking for /freetraining.
 * Renders nothing. Kept out of the page component so the page can be a server
 * component: useSearchParams() forces client rendering up to the nearest
 * Suspense boundary, and when that boundary wrapped the whole page Google saw
 * only the fallback (~11 words, no H1).
 */
export function LandingTracking() {
  return (
    <Suspense fallback={null}>
      <LandingTrackingInner />
    </Suspense>
  );
}

function LandingTrackingInner() {
  const searchParams = useSearchParams();

  useEffect(() => {
    trackPageView("/freetraining", "Free Training Landing");

    const metaCampaign = searchParams.get("hsa_cam") || "";
    const metaAd = searchParams.get("hsa_ad") || "";
    const metaAdSet = searchParams.get("hsa_grp") || "";

    const utmParams = {
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || metaCampaign,
      utm_content: searchParams.get("utm_content") || metaAd,
      utm_term: searchParams.get("utm_term") || metaAdSet,
    };

    if (Object.values(utmParams).some((v) => v !== "")) {
      setStorageJSON("utm_params", utmParams);
    }
  }, [searchParams]);

  // Scroll-depth milestones on the landing page, fired once per threshold.
  useEffect(() => {
    const fired = new Set<number>();
    const thresholds = [25, 50, 75, 100];
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = (window.scrollY / scrollable) * 100;
      for (const t of thresholds) {
        if (percent >= t && !fired.has(t)) {
          fired.add(t);
          trackScrollDepth(t, "/freetraining");
        }
      }
      if (fired.size === thresholds.length) window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
