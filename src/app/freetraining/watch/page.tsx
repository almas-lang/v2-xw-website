'use client';

import { useEffect, useState, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BunnyPlayer } from "@/components/freetraining/BunnyPlayer";
import { Toast } from "@/components/freetraining/Toast";
import FAQ from "@/components/shared/FAQ";
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

const splitName = (fullName: string): { first: string; last: string } => {
  const tokens = fullName.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return { first: "", last: "" };
  if (tokens.length === 1) return { first: tokens[0], last: "" };
  const isInitial = /^[A-Za-z]{1,2}\.?$/.test(tokens[0]);
  if (isInitial && tokens.length >= 3) {
    return { first: `${tokens[0]} ${tokens[1]}`, last: tokens.slice(2).join(" ") };
  }
  if (isInitial && tokens.length === 2) {
    return { first: `${tokens[0]} ${tokens[1]}`, last: "" };
  }
  return { first: tokens[0], last: tokens.slice(1).join(" ") };
};

function WatchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [toast, setToast] = useState({ isVisible: false, message: "", type: "info" as "success" | "error" | "info" });
  const [firstName, setFirstName] = useState<string>("");

  const progressMilestonesRef = useRef(new Set<number>());
  const hasTrackedPlayRef = useRef(false);

  const leadId = searchParams.get("lead_id");

  useEffect(() => {
    setStorageItem("ft_book_call_revealed", "true");
  }, []);

  useEffect(() => {
    trackPageView("/freetraining/watch", "Watch Training");

    const leadData = getStorageJSON<{ email: string }>("lead_data");
    const leadForm = getStorageJSON<{ name: string; phone: string }>("lead_form_data");

    if (leadForm?.name) {
      setFirstName(splitName(leadForm.name).first);
    }

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
    for (const milestone of [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]) {
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

  const greeting = firstName
    ? `${ftContent.watch.greetingPrefix} ${firstName}${ftContent.watch.greetingSuffix}`
    : `${ftContent.watch.greetingPrefix}${ftContent.watch.greetingSuffix.replace(/^,\s*/, ', ')}`;

  return (
    <div className="min-h-screen flex flex-col bg-white font-body">
      {/* ============ SECTION 1: VIDEO ============ */}
      <section className="bg-white">
        <div className="max-w-[900px] mx-auto px-5 pt-8 md:pt-12 pb-10 md:pb-14">
          <p className="text-center text-[15px] md:text-[16px] text-ft-dark-surface font-semibold mb-5 md:mb-6">
            {greeting}
          </p>
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
          <p className="text-center text-[13px] md:text-[14px] text-gray-500 mt-4">
            {ftContent.watch.videoNote}
          </p>
        </div>
      </section>

      {/* ============ SECTION 2: BOOK A CALL ============ */}
      <section className="bg-ft-section-bg py-12 md:py-16 px-5">
        <div className="max-w-[860px] mx-auto">
          <h2 className="text-[20px] md:text-[24px] font-heading font-bold text-ft-dark-surface mb-4">
            {ftContent.watch.bookCall.headline}
          </h2>
          <p className="text-[15px] md:text-[16px] text-[#3A3A42] leading-[180%] mb-10 max-w-[700px]">
            {ftContent.watch.bookCall.intro}
          </p>

          {/* 45 min stat anchor */}
          <div className="border-l-[3px] border-accent pl-5 md:pl-7 py-1 mb-10">
            <p className="text-[40px] md:text-[56px] font-heading font-bold text-accent leading-none tracking-tight">
              45 min
            </p>
            <p className="text-[13px] md:text-[14px] font-bold tracking-wider uppercase text-ft-dark-surface mt-2">
              {ftContent.watch.bookCall.whatLooksLikeTitle}
            </p>
            <p className="text-[14px] md:text-[15px] text-[#3A3A42] leading-[180%] mt-2 max-w-[600px]">
              {ftContent.watch.bookCall.whatLooksLikeBody}
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
            {ftContent.watch.bookCall.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[14px] md:text-[15px] text-[#3A3A42] leading-[170%]">
                <svg className="w-4 h-4 mt-1 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <button
              onClick={handleBookClick}
              className="inline-flex items-center justify-center gap-2 w-full max-w-[420px] h-[52px] bg-accent hover:bg-accent-hover text-white font-semibold text-[16px] md:text-[17px] rounded-md transition-colors cursor-pointer shadow-[0_0_30px_rgba(255,0,35,0.2)]"
            >
              {ftContent.watch.bookCall.cta} <span aria-hidden>→</span>
            </button>
            <p className="mt-4 text-[13px] md:text-[14px] text-gray-500">
              {ftContent.watch.bookCall.footnote}
            </p>
          </div>
        </div>
      </section>

      {/* ============ SECTION 3: SUCCESS STORIES ============ */}
      <section className="relative bg-white py-14 md:py-20 px-5 overflow-hidden">
        {/* Soft glow orbs */}
        <div
          className="absolute top-10 left-[8%] w-[280px] h-[280px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,0,35,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }}
          aria-hidden
        />
        <div
          className="absolute bottom-10 right-[8%] w-[260px] h-[260px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)', filter: 'blur(60px)' }}
          aria-hidden
        />
        {/* Confetti shapes */}
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden>
          {[
            { type: 'circle', color: '#FF0023', size: 8, left: '6%', top: '18%', delay: 0 },
            { type: 'square', color: '#F59E0B', size: 6, left: '22%', top: '8%', delay: 0.5 },
            { type: 'circle', color: '#F59E0B', size: 10, left: '94%', top: '22%', delay: 1 },
            { type: 'square', color: '#FF0023', size: 5, left: '78%', top: '12%', delay: 1.5 },
            { type: 'circle', color: '#FF0023', size: 7, left: '4%', top: '70%', delay: 2 },
            { type: 'square', color: '#F59E0B', size: 8, left: '92%', top: '78%', delay: 2.5 },
            { type: 'circle', color: '#F59E0B', size: 6, left: '50%', top: '92%', delay: 0.3 },
            { type: 'square', color: '#FF0023', size: 9, left: '40%', top: '5%', delay: 0.8 },
          ].map((shape, i) => (
            <div
              key={i}
              className={shape.type === 'circle' ? 'absolute rounded-full' : 'absolute rotate-45'}
              style={{
                left: shape.left,
                top: shape.top,
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.color,
                opacity: 0.6,
                animation: `wsConfetti ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${shape.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto">
          <h2 className="text-center text-[18px] md:text-[22px] font-heading font-bold text-ft-dark-surface mb-10 md:mb-12">
            Designers who have had this conversation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-[1100px] mx-auto mb-10 md:mb-12">
            {[
              { img: 'sunitha-bisoyi.jpeg', name: 'Sunitha', outcome: 'Lead Experience Designer @ Thoughtworks' },
              { img: 'akash.png', name: 'Akash', outcome: '+32% hike, Sr. Product Designer' },
              { img: 'maitreyee.png', name: 'Maitreyee', outcome: 'UI/UX Designer @ Montran' },
              { img: 'kritika2.png', name: 'Kritika', outcome: 'Founding Designer @ German AI startup' },
            ].map((mentee) => (
              <div key={mentee.img} className="flex flex-col">
                <div className="relative aspect-[9/19] rounded-xl overflow-hidden bg-[#0b141a]">
                  <img
                    src={`/freetraining/testimonials/${mentee.img}`}
                    alt={`WhatsApp message from ${mentee.name}`}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 px-1">
                  <p className="text-[14px] md:text-[15px] font-bold text-ft-dark-surface">{mentee.name}</p>
                  <p className="text-[12px] md:text-[13px] text-accent font-semibold mt-0.5">→ {mentee.outcome}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-[14px] md:text-[15px] text-gray-500 mb-4">Your turn to reframe</p>
            <button
              onClick={handleBookClick}
              className="inline-flex items-center justify-center gap-2 w-full max-w-[420px] h-[52px] bg-accent hover:bg-accent-hover text-white font-semibold text-[16px] md:text-[17px] rounded-md transition-colors cursor-pointer shadow-[0_0_30px_rgba(255,0,35,0.2)]"
            >
              {ftContent.watch.bookCall.cta} <span aria-hidden>→</span>
            </button>
          </div>
        </div>

        <style jsx global>{`
          @keyframes wsConfetti {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-8px) rotate(5deg); }
            50% { transform: translateY(-4px) rotate(-3deg); }
            75% { transform: translateY(-10px) rotate(8deg); }
          }
        `}</style>
      </section>

      {/* ============ SECTION 4: FAQS ============ */}
      <FAQ
        title="Frequently Asked Questions (FAQs)"
        faqs={ftContent.watch.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        showCTA={false}
      />

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
