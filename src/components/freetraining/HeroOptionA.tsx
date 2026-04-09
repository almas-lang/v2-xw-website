'use client';

/**
 * OPTION A: "Full-Width Cinematic"
 * Video thumbnail is the centerpiece — large, full-width.
 * Copy stacked above it, centered. Feels like a webinar stage.
 * CTA button below video. Strong visual hierarchy.
 */
export function HeroOptionA({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(255,0,35,0.06) 0%, transparent 50%)' }} />
      </div>

      <div className="relative z-10 max-w-[900px] mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-10 md:pb-16">
        {/* Rating */}
        <div className="flex items-center gap-3 mb-5 md:mb-6 md:justify-center">
          <span className="text-[20px] md:text-[24px] font-heading font-bold text-white">4.8</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[12px] text-white/40">from 1,823 ratings</span>
        </div>

        {/* Badge */}
        <div className="mb-6 md:mb-7 md:flex md:justify-center">
          <span className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm rounded-full max-w-[360px]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-[11px] md:text-[12px] text-white/80 font-medium leading-snug">
              For UX/UI/Product Designers with 2-8 Years Who Keep Getting Passed Over For Senior Roles
            </span>
          </span>
        </div>

        {/* Headline — centered */}
        <h1 className="font-heading text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] font-bold text-white leading-[1.1] mb-5 md:mb-6 md:text-center">
          Still Getting Overlooked For <span className="text-accent font-bold">Senior Roles</span> –{' '}
          <span className="text-g500 italic font-normal">Despite Being Better Than Half The People Getting Promoted?</span>
        </h1>

        {/* Sub-headline — centered */}
        <p className="text-[15px] md:text-[18px] text-[#BFBFCC] leading-[175%] mb-3 md:mb-4 md:text-center max-w-[640px] md:mx-auto">
          Watch this free 28-min training where Shaik Murad breaks down why this keeps happening – and how 830+ designers landed senior &amp; leadership roles paying ₹18-28 LPA in under 90 days.
        </p>

        {/* Without clause */}
        <p className="text-[12px] text-[#80809B] italic mb-8 md:mb-10 md:text-center">
          Without a fancy degree, big-brand resume, or prior team leadership experience.
        </p>

        {/* Video — LARGE, full container width */}
        <button onClick={onCtaClick} className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06] group shadow-2xl shadow-black/60" aria-label="Watch free training – scrolls to form">
          <img src="/freetraining/video-thumbnail.png" alt="Free training video – Shaik Murad" className="w-full h-auto" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/15 transition-colors">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center shadow-2xl shadow-accent/40 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
        </button>

        {/* CTA — centered below video */}
        <div className="mt-6 md:mt-8 md:flex md:justify-center">
          <button onClick={onCtaClick} className="inline-flex items-center gap-2.5 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold text-[16px] rounded-lg transition-colors shadow-lg shadow-accent/20">
            Watch free training
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
