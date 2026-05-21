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

const capitalize = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

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

  const displayName = firstName ? capitalize(firstName) : 'there';
  const greeting = `${ftContent.watch.greetingPrefix} ${displayName}${ftContent.watch.greetingSuffix}`;

  return (
    <div className="min-h-screen flex flex-col bg-white font-body">
      {/* ============ SECTION 1: GREETING ============ */}
      <section className="bg-white">
        <div className="max-w-[760px] mx-auto px-5 pt-8 md:pt-12 text-center">
          <h1 className="text-[22px] md:text-[28px] font-heading font-bold text-ft-dark-surface mb-3 leading-snug">
            {greeting}
          </h1>
          <p className="text-[15px] md:text-[16px] italic text-[#3A3A42] leading-[170%] max-w-[600px] mx-auto">
            {ftContent.watch.greetingSubhead}
          </p>
        </div>
      </section>

      {/* ============ SECTION 2: VIDEO PLAYER ============ */}
      <section className="bg-white">
        <div className="max-w-[900px] mx-auto px-5 pt-6 md:pt-8">
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

      {/* ============ SECTION 3: SOFT SCROLL CUE ============ */}
      <section className="bg-white">
        <div className="max-w-[900px] mx-auto px-5 py-8 md:py-10 flex flex-col items-center gap-2 text-gray-400">
          <span className="text-[14px] md:text-[15px]">{ftContent.watch.scrollCue}</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ============ SECTION 4: BRIDGE + SECTION 5: BUTTON ============ */}
      <section className="bg-ft-section-bg py-12 md:py-16 px-5">
        <div className="max-w-[760px] mx-auto text-center">
          <h2 className="text-[20px] md:text-[26px] font-heading font-bold text-ft-dark-surface mb-5 leading-snug">
            {ftContent.watch.bridge.heading}
          </h2>
          {ftContent.watch.bridge.body.map((para) => (
            <p key={para} className="text-[15px] md:text-[16px] text-[#3A3A42] leading-[180%] mb-4 last:mb-0 max-w-[640px] mx-auto">
              {para}
            </p>
          ))}

          {/* Button between bridge and testimonials */}
          <div className="mt-9 md:mt-10">
            <button
              onClick={handleBookClick}
              className="inline-flex items-center justify-center gap-2 w-full max-w-[420px] h-[52px] bg-accent hover:bg-accent-hover text-white font-semibold text-[16px] md:text-[17px] rounded-md transition-colors cursor-pointer shadow-[0_0_30px_rgba(255,0,35,0.2)]"
            >
              {ftContent.watch.bookCall.cta} <span aria-hidden>→</span>
            </button>
            <p className="mt-4 text-[13px] md:text-[14px] text-gray-500">
              {ftContent.watch.bookCall.microcopy}
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
              { img: 'sunitha-bisoyi.jpeg', name: 'Sunitha', outcome: 'Lead Experience Designer @ Thoughtworks', linkedin: 'https://www.linkedin.com/in/bisoyi-sunitha/' },
              { img: 'akash.png', name: 'Akash', outcome: '+32% hike, Sr. Product Designer', linkedin: 'https://www.linkedin.com/in/akuxdesigner/' },
              { img: 'maitreyee.png', name: 'Maitreyee', outcome: 'UI/UX Designer @ Montran', linkedin: 'https://www.linkedin.com/in/maitreyeekane/' },
              { img: 'kritika2.png', name: 'Kritika', outcome: 'Founding Designer @ German AI startup', linkedin: 'https://www.linkedin.com/in/kritikasinghchauhan/' },
            ].map((mentee) => (
              <a
                key={mentee.img}
                href={mentee.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col"
                aria-label={`${mentee.name} on LinkedIn`}
              >
                <div className="relative aspect-[9/19] rounded-xl overflow-hidden bg-[#0b141a] ring-1 ring-transparent group-hover:ring-accent/30 transition">
                  <img
                    src={`/freetraining/testimonials/${mentee.img}`}
                    alt={`WhatsApp message from ${mentee.name}`}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 px-1">
                  <p className="flex items-center gap-1.5 text-[14px] md:text-[15px] font-semibold text-ft-dark-surface group-hover:text-accent transition-colors">
                    {mentee.name}
                    <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                    </svg>
                  </p>
                  <p className="text-[12px] md:text-[13px] text-gray-500 mt-0.5 leading-snug">{mentee.outcome}</p>
                </div>
              </a>
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

      {/* ============ SECTION 7: FAQS ============ */}
      <FAQ
        title="Frequently Asked Questions (FAQs)"
        faqs={ftContent.watch.faqs.map((f) => ({ question: f.q, answer: f.a }))}
        showCTA={false}
      />

      {/* ============ SECTION 8: FINAL CTA ============ */}
      <section className="bg-ft-section-bg py-12 md:py-16 px-5">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="text-[15px] md:text-[16px] italic text-[#3A3A42] leading-[170%] mb-6 max-w-[600px] mx-auto">
            {ftContent.watch.finalCtaLine}
          </p>
          <button
            onClick={handleBookClick}
            className="inline-flex items-center justify-center gap-2 w-full max-w-[420px] h-[52px] bg-accent hover:bg-accent-hover text-white font-semibold text-[16px] md:text-[17px] rounded-md transition-colors cursor-pointer shadow-[0_0_30px_rgba(255,0,35,0.2)]"
          >
            {ftContent.watch.bookCall.cta} <span aria-hidden>→</span>
          </button>
          <p className="mt-4 text-[13px] md:text-[14px] text-gray-500">
            {ftContent.watch.bookCall.microcopy}
          </p>
        </div>
      </section>

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
