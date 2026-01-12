'use client';

import { useState, useRef, useEffect } from 'react';

export default function HowMentorshipWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        backgroundColor: '#FAFAFA',
        backgroundImage: `
          linear-gradient(to right, #E4E4E7 1px, transparent 0.5px),
          linear-gradient(to bottom, #E4E4E7 1px, transparent 1px)
        `,
        backgroundSize: '70px 70px',
      }}
    >
      <div className="max-w-[1000px] mx-auto px-5">
        {/* Header */}
        <div
          className="text-center mb-10 md:mb-14 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[44px] font-bold text-carbon tracking-tight mb-4">
            How Our Mentorship Works
          </h2>
          <p className="font-body text-base md:text-lg text-g600">
            A structured, personalised approach - not random advice
          </p>
        </div>

        {/* Video Container */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '200ms',
          }}
        >
          <div
            className="relative group cursor-pointer overflow-hidden bg-white border border-g200 hover:border-g300 transition-all duration-500 hover:shadow-2xl"
            style={{ borderRadius: '6px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Video Thumbnail / Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-g100 via-g50 to-g100 overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute inset-0">
                {/* Subtle grid pattern */}
                <div
                  // className="absolute inset-0 opacity-[0.03]"
                  // style={{
                  //   backgroundImage: `
                  //     linear-gradient(to right, #18181B 1px, transparent 1px),
                  //     linear-gradient(to bottom, #18181B 1px, transparent 1px)
                  //   `,
                  //   backgroundSize: '40px 40px',
                  // }}
                />

                {/* Gradient orbs */}
                <div
                  className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl transition-all duration-700"
                  style={{
                    background: 'radial-gradient(circle, rgba(220,238,255,0.4) 0%, transparent 70%)',
                    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
                <div
                  className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl transition-all duration-700"
                  style={{
                    background: 'radial-gradient(circle, rgba(220,238,255,0.3) 0%, transparent 70%)',
                    transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              </div>

              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Play Button */}
                <button
                  className="relative z-10 flex items-center justify-center transition-all duration-500"
                  aria-label="Play video"
                >
                  {/* Outer ring - animated on hover */}
                  <div
                    className={`absolute w-24 h-24 md:w-28 md:h-28 rounded-full border-2 transition-all duration-500 ${
                      isHovered ? 'border-carbon scale-110 opacity-50' : 'border-g300 scale-100 opacity-100'
                    }`}
                  />

                  {/* Inner circle with play icon */}
                  <div
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isHovered
                        ? 'bg-carbon text-white scale-110 shadow-2xl'
                        : 'bg-white text-carbon shadow-lg border border-g200'
                    }`}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1"
                    >
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>

                  {/* Pulse animation ring */}
                  <div
                    className={`absolute w-24 h-24 md:w-28 md:h-28 rounded-full border border-g300 transition-all duration-1000 ${
                      isHovered ? 'animate-ping opacity-0' : 'opacity-0'
                    }`}
                  />
                </button>

                {/* Helper text */}
                <p
                  className={`mt-6 font-body text-sm text-g500 transition-all duration-500 ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  Click to watch how it works
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-g200 opacity-50" style={{ borderRadius: '2px' }} />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-g200 opacity-50" style={{ borderRadius: '2px' }} />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-g200 opacity-50" style={{ borderRadius: '2px' }} />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-g200 opacity-50" style={{ borderRadius: '2px' }} />
            </div>

            {/* Progress bar indicator (decorative) */}
            <div className="h-1 bg-g100">
              <div
                className="h-full bg-gradient-to-r from-alice to-alice-dark transition-all duration-700"
                style={{ width: isHovered ? '15%' : '0%' }}
              />
            </div>
          </div>

          {/* Video caption / trust indicators */}
          <div
            className="flex flex-wrap justify-center gap-6 md:gap-10 mt-8 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDelay: '400ms',
            }}
          >
            <div className="flex items-center gap-2 text-g500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-g400">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 4V8L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="font-body text-sm">5 min watch</span>
            </div>
            <div className="flex items-center gap-2 text-g500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-g400">
                <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <span className="font-body text-sm">See actual process</span>
            </div>
            <div className="flex items-center gap-2 text-g500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-g400">
                <path d="M2 4L8 8L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="3" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="font-body text-sm">Real mentee stories</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
