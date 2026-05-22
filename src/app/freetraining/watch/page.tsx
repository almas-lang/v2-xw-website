'use client';

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
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
import { getStorageJSON, setStorageItem } from "@/lib/freetraining/storage";
import { ftPath } from "@/lib/freetraining/constants";

const BUNNY_VIDEO_ID = process.env.NEXT_PUBLIC_FT_BUNNY_VIDEO_ID || "";
const BUNNY_LIBRARY_ID = process.env.NEXT_PUBLIC_FT_BUNNY_LIBRARY_ID || "";

function WatchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "info" as "success" | "error" | "info" });

  // Progress tracking
  const progressMilestonesRef = useRef(new Set<number>());
  const hasTrackedPlayRef = useRef(false);

  const leadId = searchParams.get("lead_id");

  useEffect(() => {
    setStorageItem("ft_book_call_revealed", "true");
  }, []);

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

  }, []);

  const handleEnded = useCallback(() => {
    const email = getStorageJSON<{ email: string }>("lead_data")?.email;
    trackViewContentVideo("complete", BUNNY_VIDEO_ID, email);
  }, []);

  const handlePause = useCallback((currentTime: number) => {
    trackVideoPaused(BUNNY_VIDEO_ID, currentTime);
  }, []);

  const bookCallUrl = ftContent.watch.bookCall.ctaUrl;

  const splitName = (fullName: string): { first: string; last: string } => {
    const tokens = fullName.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return { first: "", last: "" };
    if (tokens.length === 1) return { first: tokens[0], last: "" };
    // Leading initial (e.g. "S", "S.", "Jr") — pair it with the next token as first name
    const isInitial = /^[A-Za-z]{1,2}\.?$/.test(tokens[0]);
    if (isInitial && tokens.length >= 3) {
      return { first: `${tokens[0]} ${tokens[1]}`, last: tokens.slice(2).join(" ") };
    }
    if (isInitial && tokens.length === 2) {
      return { first: `${tokens[0]} ${tokens[1]}`, last: "" };
    }
    return { first: tokens[0], last: tokens.slice(1).join(" ") };
  };

  const buildBookingUrl = (): string => {
    const leadData = getStorageJSON<{ email: string }>("lead_data");
    const leadForm = getStorageJSON<{ name: string; phone: string }>("lead_form_data");
    const params = new URLSearchParams();
    if (leadForm?.name) {
      const { first, last } = splitName(leadForm.name);
      if (first) params.set("first_name", first);
      if (last) params.set("last_name", last);
    }
    if (leadData?.email) params.set("email", leadData.email);
    if (leadForm?.phone) params.set("phone", leadForm.phone);
    const qs = params.toString();
    if (!qs) return bookCallUrl;
    return bookCallUrl + (bookCallUrl.includes("?") ? "&" : "?") + qs;
  };

  const handleBookClick = () => {
    trackClick("book_strategy_call", { source: "watch_page", lead_id: leadId });
    const leadData = getStorageJSON<{ email: string }>("lead_data");
    trackInitiateCheckout(leadData?.email, { lead_id: leadId });
    window.location.href = buildBookingUrl();
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

      <div>
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
              {ftContent.watch.bookCall.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-[16px] md:text-[17px] text-ft-dark-surface leading-[1.6]">
                  <span className="text-ft-dark-surface mt-0.5 shrink-0">•</span>
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Guarantee badge */}
            <div className="flex items-center gap-3">
              <Image src="/images/gaurantee.svg" alt="Guarantee" width={34} height={34} className="shrink-0" />
              <p className="text-[16px] md:text-[17px] font-semibold text-ft-dark-surface">
                {ftContent.watch.bookCall.footnote}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: WhatsApp testimonials — white bg */}
        <section className="bg-white py-8 md:py-12 px-5">
          <div className="max-w-[420px] mx-auto space-y-4">
            {['akash.png', 'maitreyee.png', 'kritika2.png', 'abhishek.png'].map((img) => (
              <Image
                key={img}
                src={`/freetraining/testimonials/${img}`}
                alt="WhatsApp testimonial from mentee"
                width={420}
                height={500}
                className="w-full h-auto"
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
