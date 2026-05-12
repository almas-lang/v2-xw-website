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
    <section className="relative overflow-hidden">
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

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-8 pt-8 md:pt-10 pb-20 md:pb-28">
        {/* Center content */}
        <div className="max-w-[1000px] mx-auto text-center">
          {/* Qualifier badge */}
          <div className="mb-6 md:mb-8 inline-flex items-center justify-center px-5 py-2.5 bg-accent/[0.10] border border-accent/25 rounded-full">
            <span className="text-[12px] md:text-[13px] text-accent font-semibold">
              {hero.qualifier}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-[29px] sm:text-[39px] md:text-[48px] lg:text-[54px] font-bold text-white leading-[1.1] tracking-tight mb-6 md:mb-8">
            Still doing senior-level work
            <br className="hidden md:inline" />{' '}
            without <span className="text-accent">senior-level pay or title</span>?
          </h1>

          {/* Sub-headline */}
          <p className="text-[17px] md:text-[20px] text-[#BFBFCC] leading-[160%] mb-8 md:mb-10 max-w-[640px] mx-auto">
            {hero.subheadline}
          </p>

          {/* Video thumbnail */}
          <div className="relative w-full max-w-[720px] mx-auto mb-6 md:mb-8">
            {/* Soft red glow + dark drop shadow to separate from page bg */}
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-60 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(255,0,35,0.18) 0%, rgba(0,0,0,0) 70%)' }}
              aria-hidden
            />
          <button
            onClick={onCtaClick}
            className="relative w-full rounded-2xl overflow-hidden border border-white/15 ring-1 ring-white/[0.04] group shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85),0_8px_24px_-12px_rgba(255,0,35,0.25)] cursor-pointer"
            aria-label="Watch the training - scrolls to form"
          >
            <img src="/freetraining/video-thumbnail.png" alt="Training video - Shaik Murad" className="w-full h-auto" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-colors">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center shadow-2xl shadow-accent/40 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
          </button>
          </div>

          {/* Trust line */}
          <p className="text-[13px] md:text-[14px] text-[#BFBFCC] mb-6 md:mb-8">
            <span className="text-amber-400">★</span>{' '}
            <span className="font-bold text-white">{hero.rating.score}</span>
            {' '}/ {hero.rating.count.toLocaleString()} ratings · {hero.trustLine}
          </p>

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
