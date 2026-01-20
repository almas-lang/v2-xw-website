'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePlay = () => {
    // TODO: Implement video modal or embed
    console.log('Play video clicked');
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #EDF5FA 0%, #E3EFF7 50%, #EDF5FA 100%)',
      }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(74,144,164,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Large X watermark - left side */}
      <div className="absolute left-[-100px] top-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span
          className="font-heading font-black text-[400px] md:text-[500px] leading-none"
          style={{
            background: 'linear-gradient(180deg, rgba(74,144,164,0.08) 0%, rgba(74,144,164,0.02) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          aria-hidden="true"
        >
          X
        </span>
      </div>

      {/* Decorative glow behind play button */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] blur-3xl pointer-events-none"
        style={{ background: 'rgba(74, 144, 164, 0.12)' }}
      />

      <div className="relative z-10 px-5 py-12 sm:py-16 md:py-24 lg:py-32">
        <div
          className="max-w-[1000px] mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Video container */}
          <button
            onClick={handlePlay}
            className="group relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 hover:border-alice/30 transition-all duration-500 cursor-pointer"
            aria-label="Play video: Watch how it works"
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #242424 30%, #1a1a1a 70%, #0f0f0f 100%)',
              }}
            />

            {/* Decorative dot pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(220,238,255,0.1) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Corner frames */}
            <div className="absolute top-6 left-6 w-12 h-12 border-l-[3px] border-t-[3px] border-alice/30 group-hover:border-alice/50 transition-colors" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-r-[3px] border-b-[3px] border-alice/30 group-hover:border-alice/50 transition-colors" />

            {/* Centered play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Play button with glow */}
              <div className="relative mb-6">
                {/* Pulsing glow ring */}
                <div
                  className="absolute inset-0 rounded-full bg-alice/20 scale-150 animate-ping"
                  style={{ animationDuration: '2.5s' }}
                />
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-alice/30 blur-xl scale-150 group-hover:bg-alice/40 group-hover:scale-[1.8] transition-all duration-500" />
                {/* Play circle */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-sm border-2 border-alice/40 flex items-center justify-center group-hover:bg-white/20 group-hover:border-alice/60 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <div className="text-center">
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mb-2">
                  Watch how it works
                </h3>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-g400 text-sm">See the mentorship in action</span>
                  <span className="px-2 py-1 text-xs font-medium text-alice bg-alice/10 rounded border border-alice/20">
                    2:30
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Top decorative line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(220,238,255,0.15) 50%, transparent 100%)' }}
      />
    </section>
  );
}
