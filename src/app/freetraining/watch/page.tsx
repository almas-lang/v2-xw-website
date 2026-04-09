'use client';

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
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
import { getStorageJSON, setStorageJSON, getStorageItem, setStorageItem } from "@/lib/freetraining/storage";
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

  // Timed reveal states
  const [showBookCall, setShowBookCall] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(false);

  // Progress tracking
  const progressMilestonesRef = useRef(new Set<number>());
  const hasTrackedPlayRef = useRef(false);

  const leadId = searchParams.get("lead_id");
  const useBunny = Boolean(BUNNY_VIDEO_ID && BUNNY_LIBRARY_ID);

  // Restore revealed state from localStorage
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

    // Reveal "Book Call" section at 15 minutes (900 seconds) or 50% — whichever comes first
    if ((currentTime >= 900 || percent >= 50) && !showBookCall) {
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
    setShowStickyBar(true);
    setStorageItem("ft_book_call_revealed", "true");
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Video Section */}
      <section className="bg-[#0D0D14] w-full">
        <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">
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
              onPlay={handlePlay}
              onEnded={handleEnded}
            />
          )}
        </div>
      </section>

      {/* Book Call Section — hidden until 15 min mark */}
      <section
        className={`transition-all duration-700 ${
          showBookCall ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <div className="bg-white py-9 md:py-12 px-5">
          <div className="max-w-[500px] mx-auto text-center">
            <h2 className="text-[20px] md:text-2xl font-bold text-ft-dark-surface mb-5">
              {ftContent.watch.bookCall.headline}
            </h2>
            <button
              onClick={handleBookClick}
              className="w-full max-w-[335px] h-[52px] bg-ft-purple-cta text-white font-bold text-[16px] rounded-lg hover:bg-[#5B53E6] transition-colors mb-6"
            >
              {ftContent.watch.bookCall.cta}
            </button>

            {/* Call details */}
            <div className="text-left max-w-[350px] mx-auto mb-6">
              <p className="text-[13px] text-[#595964] mb-3">On this call, we'll:</p>
              <ul className="space-y-2">
                {ftContent.watch.bookCall.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-[13px] text-[#595964] leading-[200%]">
                    <span className="text-ft-purple-cta mt-0.5">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Guarantee badge */}
            <div className="bg-[#F2FBF5] rounded-lg px-4 py-3">
              <p className="text-[13px] font-semibold text-[#27804D]">
                {ftContent.watch.bookCall.guarantee}
              </p>
            </div>

            {/* WhatsApp testimonial screenshots */}
            <div className="mt-8 space-y-4">
              {['shreekanth-whatsapp.png', 'kritika-whatsapp.png'].map((img) => (
                <img
                  key={img}
                  src={`/freetraining/testimonials/${img}`}
                  alt="WhatsApp testimonial from mentee"
                  className="w-full rounded-lg shadow-sm"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Bar — appears after 50% watched */}
      {showStickyBar && !stickyDismissed && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 animate-slide-up">
          <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
            <p className="text-[14px] text-[#333] font-medium">{ftContent.watch.stickyCta.text}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBookClick}
                className="bg-ft-purple-cta text-white text-[14px] font-semibold px-4 py-2 rounded-lg hover:bg-[#5B53E6] transition-colors"
              >
                {ftContent.watch.stickyCta.cta}
              </button>
              <button
                onClick={() => setStickyDismissed(true)}
                className="text-gray-400 hover:text-gray-600 p-1"
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
  onPlay,
  onEnded,
}: {
  videoId: string;
  onPlay?: () => void;
  onEnded?: () => void;
}) {
  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`}
        className="absolute inset-0 w-full h-full rounded-lg"
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
        <div className="min-h-screen flex items-center justify-center bg-[#0D0D14]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-ft-purple" />
        </div>
      }
    >
      <WatchContent />
    </Suspense>
  );
}
