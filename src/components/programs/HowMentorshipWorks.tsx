'use client';

import { useState, useRef, useEffect } from 'react';

// ============================================
// DATA - SEO OPTIMIZED CONTENT
// ============================================

const trustIndicators = [
  { icon: 'clock', text: '5 min watch' },
  { icon: 'star', text: 'See actual process' },
  { icon: 'message', text: 'Real mentee stories' },
];

// ============================================
// COMPONENT
// ============================================

export default function HowMentorshipWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePlay = () => {
    // TODO: Implement video modal or embed
    console.log('Play video clicked');
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a1420 0%, #0d1a28 50%, #0a1420 100%)',
      }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mentorshipGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mentorshipGrid)" />
        </svg>
      </div>

      {/* Gradient orbs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(220,238,255,0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,0,35,0.06) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-5">
        {/* Header */}
        <div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-accent" />
            <span className="font-body text-xs uppercase tracking-[0.2em] text-accent font-medium">The Process</span>
            <div className="w-8 h-[2px] bg-accent" />
          </div>
          <h2 className="font-heading text-[26px] sm:text-[32px] md:text-[40px] lg:text-[44px] font-bold text-white leading-tight mb-3">
            How Our Mentorship Works
          </h2>
          <p className="font-body text-sm sm:text-base md:text-lg text-g400 max-w-xl mx-auto">
            A structured, personalised approach - not random advice
          </p>
        </div>

        {/* Video Container */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
          }}
        >
          <button
            onClick={handlePlay}
            className="group relative w-full overflow-hidden rounded-2xl border border-white/10 sm:hover:border-white/20 transition-all duration-500 cursor-pointer"
            aria-label="Play video: How Our Mentorship Works"
          >
            {/* Video background */}
            <div
              className="relative aspect-video overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1a2836 0%, #1e2e3c 30%, #1a2836 70%, #0a1420 100%)',
              }}
            >
              {/* Animated gradient mesh */}
              <div
                className="absolute inset-0 opacity-40 sm:group-hover:opacity-60 transition-opacity duration-700"
                style={{
                  background: `
                    radial-gradient(ellipse 50% 40% at 20% 30%, rgba(220,238,255,0.15) 0%, transparent 50%),
                    radial-gradient(ellipse 40% 30% at 80% 70%, rgba(255,0,35,0.1) 0%, transparent 50%)
                  `,
                }}
              />

              {/* Decorative dot pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Corner frames */}
              <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-alice/30 sm:group-hover:border-alice/50 transition-colors duration-500" />
              <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-alice/30 sm:group-hover:border-alice/50 transition-colors duration-500" />
              <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-alice/30 sm:group-hover:border-alice/50 transition-colors duration-500" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-alice/30 sm:group-hover:border-alice/50 transition-colors duration-500" />

              {/* Centered play button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Play button with glow */}
                <div className="relative mb-5 sm:mb-6">
                  {/* Pulsing glow ring */}
                  <div
                    className="absolute inset-0 rounded-full bg-white/10 scale-150 animate-ping"
                    style={{ animationDuration: '2.5s' }}
                  />
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-xl scale-150 sm:group-hover:bg-white/30 sm:group-hover:scale-[1.8] transition-all duration-500" />
                  {/* Play circle */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center sm:group-hover:bg-white/20 sm:group-hover:border-white/50 sm:group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Text */}
                <div className="text-center">
                  <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">
                    Watch how it works
                  </h3>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-g400 text-sm">See the mentorship in action</span>
                    <span className="px-2 py-1 text-xs font-medium text-alice bg-alice/10 rounded border border-alice/20">
                      5:00
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar hint */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                <div className="h-full w-0 sm:group-hover:w-[8%] bg-gradient-to-r from-alice to-alice/60 transition-all duration-700" />
              </div>
            </div>
          </button>
        </div>

        {/* Trust indicators */}
        <div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 mt-8 sm:mt-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
          }}
        >
          {/* 5 min watch */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-alice">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 4.5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-body text-sm text-g400">5 min watch</span>
          </div>

          {/* See actual process */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-accent">
                <path d="M8 1.5L9.5 5.5L14 6L10.5 9L11.5 13.5L8 11.5L4.5 13.5L5.5 9L2 6L6.5 5.5L8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-body text-sm text-g400">See actual process</span>
          </div>

          {/* Real mentee stories */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-alice">
                <path d="M2.5 4.5L8 8L13.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <span className="font-body text-sm text-g400">Real mentee stories</span>
          </div>
        </div>
      </div>

      {/* Top decorative line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(220,238,255,0.15) 50%, transparent 100%)' }}
      />

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(74,144,164,0.3) 50%, transparent 100%)' }}
      />
    </section>
  );
}
