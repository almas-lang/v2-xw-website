'use client';

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BunnyPlayer } from "@/components/freetraining/BunnyPlayer";
import { Toast } from "@/components/freetraining/Toast";
import {
  trackPageView,
  trackVideoView,
  trackVideoProgress,
  trackVideoPaused,
  trackVideoComplete,
  trackConversionAPI,
  trackLead,
  trackClick,
} from "@/lib/freetraining/track";
import { ftContent } from "@/lib/freetraining/content";
import { getStorageJSON, getStorageItem, setStorageItem } from "@/lib/freetraining/storage";
import { ftPath } from "@/lib/freetraining/constants";

// Configure these with your Bunny Stream credentials
const BUNNY_VIDEO_ID = process.env.NEXT_PUBLIC_FT_BUNNY_VIDEO_ID || "";
const BUNNY_LIBRARY_ID = process.env.NEXT_PUBLIC_FT_BUNNY_LIBRARY_ID || "";

// Fallback to YouTube if Bunny not configured
const YOUTUBE_VIDEO_ID = process.env.NEXT_PUBLIC_FT_YOUTUBE_VIDEO_ID || "GVl8_yg_HJM";

function WatchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "info" as "success" | "error" | "info" });

  // CTA visibility states
  const [showBookCall, setShowBookCall] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);

  // Progress tracking
  const progressMilestonesRef = useRef(new Set<number>());
  const hasTrackedPlayRef = useRef(false);

  const leadId = searchParams.get("lead_id");
  const useBunny = Boolean(BUNNY_VIDEO_ID && BUNNY_LIBRARY_ID);

  // Restore CTA states from localStorage
  useEffect(() => {
    if (getStorageItem("ft_book_call_revealed") === "true") {
      setShowBookCall(true);
    }
    if (getStorageItem("ft_sticky_revealed") === "true") {
      setShowStickyBar(true);
    }
  }, []);

  useEffect(() => {
    trackPageView("/freetraining/watch", "Watch Training");

    const leadData = getStorageJSON<{ email: string }>("lead_data");
    const isNewLead = searchParams.get("new_lead");

    if (isNewLead === "true") {
      trackLead({ lead_id: leadId });
      if (leadData?.email) {
        trackConversionAPI("Lead", leadData.email, undefined, {
          content_name: "VSL Webinar Registration",
          lead_id: leadId,
        });
      }
    }

    // Check if user has lead data — if not, redirect to landing
    if (!leadData && !leadId) {
      setToast({ isVisible: true, message: "Please register first to access the training.", type: "info" });
      setTimeout(() => router.push(ftPath("/")), 2000);
    }
  }, [leadId, router, searchParams]);

  const handlePlay = useCallback(() => {
    if (!hasTrackedPlayRef.current) {
      hasTrackedPlayRef.current = true;
      const videoId = useBunny ? BUNNY_VIDEO_ID : YOUTUBE_VIDEO_ID;
      trackVideoView(videoId, { lead_id: leadId });
    }
  }, [leadId, useBunny]);

  const handleTimeUpdate = useCallback((currentTime: number, duration: number) => {
    if (duration <= 0) return;
    const percent = (currentTime / duration) * 100;
    const videoId = useBunny ? BUNNY_VIDEO_ID : YOUTUBE_VIDEO_ID;

    // Track milestones: 25%, 50%, 75%, 100%
    for (const milestone of [25, 50, 75, 100]) {
      if (percent >= milestone && !progressMilestonesRef.current.has(milestone)) {
        progressMilestonesRef.current.add(milestone);
        trackVideoProgress(videoId, milestone);
      }
    }

    // Reveal book call section at 5 minutes (300 seconds)
    if (currentTime >= 300 && !showBookCall) {
      setShowBookCall(true);
      setStorageItem("ft_book_call_revealed", "true");
    }

    // Reveal sticky bar at 50%
    if (percent >= 50 && !showStickyBar) {
      setShowStickyBar(true);
      setStorageItem("ft_sticky_revealed", "true");
    }
  }, [showBookCall, showStickyBar, useBunny]);

  const handleEnded = useCallback(() => {
    const videoId = useBunny ? BUNNY_VIDEO_ID : YOUTUBE_VIDEO_ID;
    trackVideoComplete(videoId);
    setShowBookCall(true);
    setStorageItem("ft_book_call_revealed", "true");
    setShowStickyBar(true);
    setStorageItem("ft_sticky_revealed", "true");
  }, [useBunny]);

  const handlePause = useCallback((currentTime: number) => {
    const videoId = useBunny ? BUNNY_VIDEO_ID : YOUTUBE_VIDEO_ID;
    trackVideoPaused(videoId, currentTime);
  }, [useBunny]);

  const bookCallUrl = ftContent.watch.bookCall.ctaUrl;

  const handleBookClick = () => {
    trackClick("book_strategy_call", { source: "watch_page", lead_id: leadId });
    const leadData = getStorageJSON<{ email: string }>("lead_data");
    if (leadData?.email) {
      trackConversionAPI("InitiateCheckout", leadData.email, undefined, {
        content_name: "Strategy Call Booking",
        lead_id: leadId,
      });
    }
    window.open(bookCallUrl, '_blank', 'noopener');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-body">
      {/* Video Section */}
      <section className="bg-white w-full">
        <div className="max-w-4xl mx-auto px-5 pt-6 md:pt-10 pb-6 md:pb-10">
          <div className="rounded-lg overflow-hidden shadow-sm border border-g200">
          {useBunny ? (
            <BunnyPlayer
              videoId={BUNNY_VIDEO_ID}
              libraryId={BUNNY_LIBRARY_ID}
              onPlay={handlePlay}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              onPause={handlePause}
            />
          ) : (
            <YouTubeFallback
              videoId={YOUTUBE_VIDEO_ID}
            />
          )}
          </div>
        </div>
      </section>

      {/* Below-video content — hidden until 5-min mark or video ends */}
      <div
        className={`transition-opacity duration-500 ${showBookCall ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
      >
        {/* Section 1: CTA — white bg */}
        <section className="bg-white py-8 md:py-12 px-5">
          <div className="max-w-[420px] mx-auto text-center">
            <h2 className="text-[20px] md:text-[24px] font-heading font-bold text-ft-dark-surface leading-snug mb-5">
              {ftContent.watch.bookCall.headline}
            </h2>
            <button
              onClick={handleBookClick}
              className="w-full max-w-[320px] h-[48px] bg-accent hover:bg-accent-hover text-white font-bold text-[15px] rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(255,0,35,0.2)] hover:shadow-[0_0_50px_rgba(255,0,35,0.3)] cursor-pointer"
            >
              {ftContent.watch.bookCall.cta}
            </button>
          </div>
        </section>

        {/* Section 2: Call details — gray bg */}
        <section className="bg-ft-section-bg py-8 md:py-12 px-5">
          <div className="max-w-[420px] mx-auto">
            <h3 className="text-[20px] md:text-[24px] font-heading font-bold text-ft-dark-surface leading-snug mb-5 text-center">On this call, we&apos;ll</h3>
            <ul className="space-y-1.5 mb-8 pl-1">
              {ftContent.watch.bookCall.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2.5 text-[15px] md:text-[16px] text-ft-dark-surface leading-[1.6]">
                  <span className="text-ft-dark-surface mt-0.5 shrink-0">•</span>
                  {detail}
                </li>
              ))}
            </ul>

            {/* Guarantee badge */}
            <div className="flex items-center gap-3">
              <img src="/images/gaurantee.svg" alt="Guarantee" className="w-[34px] h-[34px] shrink-0" />
              <p className="text-[15px] md:text-[16px] font-semibold text-ft-dark-surface">
                {ftContent.watch.bookCall.guarantee}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: WhatsApp testimonials — white bg */}
        <section className="bg-white py-8 md:py-12 px-5">
          <div className="max-w-[420px] mx-auto space-y-4">
            {['akash.png', 'maitreyee.png', 'kritika2.png', 'abhishek.png'].map((img) => (
              <img
                key={img}
                src={`/freetraining/testimonials/${img}`}
                alt="WhatsApp testimonial from mentee"
                className="w-full"
                loading="lazy"
              />
            ))}
          </div>
        </section>
      </div>

      {/* Sticky CTA Bar — appears after 50% watched */}
      {showStickyBar && !stickyDismissed && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-2px_10px_rgba(0,0,0,0.08)] z-50 animate-slide-up">
          <div className="max-w-lg mx-auto flex items-center justify-between px-5 py-3">
            <p className="text-[15px] text-ft-dark-surface font-medium">{ftContent.watch.stickyCta.text}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBookClick}
                className="bg-accent hover:bg-accent-hover text-white text-[15px] font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                {ftContent.watch.stickyCta.cta}
              </button>
              <button
                onClick={() => setStickyDismissed(true)}
                className="text-gray-400 hover:text-gray-600 p-2.5"
                aria-label="Dismiss"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}

// YouTube fallback player when Bunny isn't configured
function YouTubeFallback({
  videoId,
}: {
  videoId: string;
}) {
  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title="Free Training Video"
      />
    </div>
  );
}

export default function WatchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent" />
        </div>
      }
    >
      <WatchContent />
    </Suspense>
  );
}
