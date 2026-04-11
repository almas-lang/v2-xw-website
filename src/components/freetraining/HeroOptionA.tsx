'use client';

import { ftContent } from '@/lib/freetraining/content';

/**
 * OPTION A: "Social Proof Wall"
 * Centered hero with floating testimonial cards and trust metrics.
 * Social proof IS the design. Glassmorphism cards float around the headline.
 */
export function HeroOptionA({ onCtaClick }: { onCtaClick: () => void }) {
  const { hero } = ftContent;

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        {/* Dual gradient orbs */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 25% 20%, rgba(255,0,35,0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 75% 70%, rgba(108,99,255,0.06) 0%, transparent 60%)',
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-8 pt-16 md:pt-20 pb-20 md:pb-28">
        {/* Center content */}
        <div className="max-w-[800px] mx-auto text-center">
          {/* Qualifier badge */}
          <div className="mb-6 md:mb-8 inline-flex items-center gap-2.5 px-5 py-2.5 bg-accent/[0.08] border border-accent/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <span className="text-[12px] md:text-[13px] text-accent/90 font-semibold uppercase tracking-wider">
              {hero.qualifier}
            </span>
          </div>

          {/* Headline - two parts with dash */}
          <h1 className="font-heading text-[29px] sm:text-[39px] md:text-[51px] lg:text-[59px] font-bold text-white leading-[1.08] tracking-tight mb-2 md:mb-3">
            Still Getting Overlooked For{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-accent">Senior & Lead Roles</span>
              <span className="absolute bottom-1 left-0 right-0 h-[6px] md:h-[8px] bg-accent/20 rounded-full" />
            </span>
          </h1>
          <p className="font-heading text-[25px] sm:text-[33px] md:text-[41px] lg:text-[47px] text-ft-muted-light italic font-normal leading-[1.15] mb-6 md:mb-8">
            Despite Being Better Than Half The People Getting Promoted?
          </p>

          {/* Sub-headline */}
          <p className="text-[17px] md:text-[20px] text-[#BFBFCC] leading-[180%] mb-3 max-w-[620px] mx-auto">
            {hero.subheadline}
          </p>

          {/* Without clause */}
          <p className="text-[15px] text-[#9999B0] italic mb-8 md:mb-10">
            {hero.withoutClause}
          </p>

          {/* Video thumbnail */}
          <button
            onClick={onCtaClick}
            className="relative w-full max-w-[640px] mx-auto rounded-2xl overflow-hidden border border-white/[0.06] group shadow-2xl shadow-black/60 mb-8 md:mb-10 cursor-pointer"
            aria-label="Watch free training - scrolls to form"
          >
            <img src="/freetraining/video-thumbnail.png" alt="Free training video - Shaik Murad" className="w-full h-auto" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-colors">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center shadow-2xl shadow-accent/40 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </button>

          {/* CTA */}
          <button
            onClick={onCtaClick}
            className="group inline-flex items-center gap-3 px-10 py-4.5 bg-accent hover:bg-accent-hover text-white font-bold text-[18px] md:text-[19px] rounded-xl transition-all duration-200 shadow-[0_0_40px_rgba(255,0,35,0.25)] hover:shadow-[0_0_60px_rgba(255,0,35,0.35)] cursor-pointer"
          >
            {hero.cta}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
}
