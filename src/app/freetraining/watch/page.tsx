'use client';

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BunnyPlayer } from "@/components/freetraining/BunnyPlayer";
import { Toast } from "@/components/freetraining/Toast";
import {
  trackPageView,
  trackVideoProgress,
  trackVideoPaused,
  trackViewContentVideo,
  trackInitiateCheckout,
  trackClick,
} from "@/lib/freetraining/track";
import { ftContent } from "@/lib/freetraining/content";
import { getStorageJSON, getStorageItem, setStorageItem } from "@/lib/freetraining/storage";
import { ftPath } from "@/lib/freetraining/constants";

const BUNNY_VIDEO_ID = process.env.NEXT_PUBLIC_FT_BUNNY_VIDEO_ID || "";
const BUNNY_LIBRARY_ID = process.env.NEXT_PUBLIC_FT_BUNNY_LIBRARY_ID || "";

function WatchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "info" as "success" | "error" | "info" });

  // CTA visibility states
  const [showBookCall, setShowBookCall] = useState(false);

  // Progress tracking
  const progressMilestonesRef = useRef(new Set<number>());
  const hasTrackedPlayRef = useRef(false);

  const leadId = searchParams.get("lead_id");

  // Restore CTA states from localStorage
  useEffect(() => {
    if (getStorageItem("ft_book_call_revealed") === "true") {
      setShowBookCall(true);
    }
  }, []);

  // Timer-based CTA gate: reveal after 5 minutes on page
  useEffect(() => {
    if (showBookCall) return; // already revealed

    const timer = setTimeout(() => {
      if (!showBookCall) {
        setShowBookCall(true);
        setStorageItem("ft_book_call_revealed", "true");
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearTimeout(timer);
  }, [showBookCall]);

  useEffect(() => {
    trackPageView("/freetraining/watch", "Watch Training");

    const leadData = getStorageJSON<{ email: string }>("lead_data");

    // Check if user has lead data — if not, redirect to landing
    if (!leadData && !leadId) {
      setToast({ isVisible: true, message: "Please register first to access the training.", type: "info" });
      setTimeout(() => router.push(ftPath("/")), 2000);
    }
  }, [leadId, router]);

  const handlePlay = useCallback(() => {
    if (!hasTrackedPlayRef.current) {
      hasTrackedPlayRef.current = true;
      const email = getStorageJSON<{ email: string }>("lead_data")?.email;
      trackViewContentVideo("start", BUNNY_VIDEO_ID, email);
    }
  }, []);

  const handleTimeUpdate = useCallback((currentTime: number, duration: number) => {
    if (duration <= 0) return;
    const percent = (currentTime / duration) * 100;

    // Track milestones: 25%, 50%, 75%, 100%
    for (const milestone of [25, 50, 75, 100]) {
      if (percent >= milestone && !progressMilestonesRef.current.has(milestone)) {
        progressMilestonesRef.current.add(milestone);
        trackVideoProgress(BUNNY_VIDEO_ID, milestone);
      }
    }

    // Reveal book call section at 5 minutes (300 seconds)
    if (currentTime >= 300 && !showBookCall) {
      setShowBookCall(true);
      setStorageItem("ft_book_call_revealed", "true");
    }

  }, [showBookCall]);

  const handleEnded = useCallback(() => {
    const email = getStorageJSON<{ email: string }>("lead_data")?.email;
    trackViewContentVideo("complete", BUNNY_VIDEO_ID, email);
    setShowBookCall(true);
    setStorageItem("ft_book_call_revealed", "true");
  }, []);

  const handlePause = useCallback((currentTime: number) => {
    trackVideoPaused(BUNNY_VIDEO_ID, currentTime);
  }, []);

  const bookCallUrl = ftContent.watch.bookCall.ctaUrl;

  const handleBookClick = () => {
    trackClick("book_strategy_call", { source: "watch_page", lead_id: leadId });
    const leadData = getStorageJSON<{ email: string }>("lead_data");
    trackInitiateCheckout(leadData?.email, { lead_id: leadId });
    window.location.href = bookCallUrl;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-body">
      {/* Video Section */}
      <section className="bg-white w-full">
        <div className="max-w-4xl mx-auto px-5 pt-6 md:pt-10 pb-6 md:pb-10">
          <div className="rounded-lg overflow-hidden shadow-sm border border-g200">
          <BunnyPlayer
            videoId={BUNNY_VIDEO_ID}
            libraryId={BUNNY_LIBRARY_ID}
            onPlay={handlePlay}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onPause={handlePause}
          />
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
            <h2 className="text-[21px] md:text-[25px] font-heading font-bold text-ft-dark-surface leading-snug mb-5">
              {ftContent.watch.bookCall.headline}
            </h2>
            <button
              onClick={handleBookClick}
              className="w-full max-w-[320px] h-[48px] bg-accent hover:bg-accent-hover text-white font-bold text-[16px] rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(255,0,35,0.2)] hover:shadow-[0_0_50px_rgba(255,0,35,0.3)] cursor-pointer"
            >
              {ftContent.watch.bookCall.cta}
            </button>
          </div>
        </section>

        {/* Section 2: Call details — gray bg */}
        <section className="bg-ft-section-bg py-8 md:py-12 px-5">
          <div className="max-w-[420px] mx-auto">
            <h3 className="text-[21px] md:text-[25px] font-heading font-bold text-ft-dark-surface leading-snug mb-5 text-center">On this call, we&apos;ll</h3>
            <ul className="space-y-1.5 mb-8 pl-1">
              {ftContent.watch.bookCall.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2.5 text-[16px] md:text-[17px] text-ft-dark-surface leading-[1.6]">
                  <span className="text-ft-dark-surface mt-0.5 shrink-0">•</span>
                  {detail}
                </li>
              ))}
            </ul>

            {/* Guarantee badge */}
            <div className="flex items-center gap-3">
              <img src="/images/gaurantee.svg" alt="Guarantee" className="w-[34px] h-[34px] shrink-0" />
              <p className="text-[16px] md:text-[17px] font-semibold text-ft-dark-surface">
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


      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
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
