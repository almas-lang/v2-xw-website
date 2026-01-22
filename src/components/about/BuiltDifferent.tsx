'use client';

import { useEffect, useRef, useState } from 'react';

export default function BuiltDifferent() {
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

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-32 bg-[#0A0A0A]">
      {/* Large background text watermark */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-bold text-[200px] md:text-[400px] text-[#D4A853]/[0.03] whitespace-nowrap pointer-events-none select-none"
        aria-hidden="true"
      >
        DIFFERENT
      </span>

      {/* Subtle gold accents */}
      <div className="absolute top-20 left-10 w-32 h-px bg-gradient-to-r from-[#D4A853]/30 to-transparent" />
      <div className="absolute bottom-20 right-10 w-32 h-px bg-gradient-to-l from-[#D4A853]/30 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        {/* Header - left aligned with accent line */}
        <div
          className="flex items-center gap-4 mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
          }}
        >
          <div className="w-12 md:w-20 h-1 bg-[#D4A853]" />
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Built <span className="text-[#D4A853]">Different</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left - Image with unique shape */}
          <div
            className="lg:col-span-5 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) rotate(0)' : 'translateY(30px) rotate(-2deg)',
              transitionDelay: '200ms',
            }}
          >
            <div className="relative">
              {/* Decorative frame offset */}
              <div
                className="absolute -inset-3 border border-[#D4A853]/20 -z-10"
                style={{ borderRadius: '20px', transform: 'rotate(-3deg)' }}
              />
              {/* Main image container */}
              <div
                className="w-full aspect-[4/5] bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center overflow-hidden border border-[#D4A853]/10"
                style={{ borderRadius: '16px' }}
              >
                <svg
                  className="w-16 h-16 text-[#D4A853]/20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right - Text content with typography hierarchy */}
          <div
            className="lg:col-span-7 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '400ms',
            }}
          >
            {/* First group - Bold statements */}
            <div className="mb-8 md:mb-10">
              {[
                { highlight: 'Mentorship', rest: 'beats courses.' },
                { highlight: 'Outcomes', rest: 'beat certificates.' },
                { highlight: 'Smart', rest: 'beats hard.' },
              ].map((item, i) => (
                <p
                  key={i}
                  className="font-heading text-xl md:text-2xl lg:text-3xl text-white leading-snug mb-1"
                >
                  <span className="font-bold text-[#D4A853]">{item.highlight}</span>
                  <span className="font-normal text-white/50"> {item.rest}</span>
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="w-16 h-px bg-[#D4A853]/30 mb-8 md:mb-10" />

            {/* Second group - Philosophy statements */}
            <div className="mb-8 md:mb-10 space-y-2">
              {[
                { start: 'Adults learn by', highlight: 'doing', middle: ', not', end: 'cramming.' },
                {
                  start: 'Products win by',
                  highlight: 'solving',
                  middle: ', not',
                  end: 'shipping.',
                },
                { start: 'Growth happens by', highlight: 'focus', middle: ', not', end: 'noise.' },
              ].map((item, i) => (
                <p key={i} className="font-body text-base md:text-lg text-white/50">
                  {item.start}{' '}
                  <span className="text-white font-semibold">{item.highlight}</span>
                  {item.middle}{' '}
                  <span className="line-through text-white/30">{item.end}</span>
                </p>
              ))}
            </div>

            {/* Closing statement - Maximum impact */}
            <div
              className="relative inline-block"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '600ms',
                transition: 'all 0.7s ease',
              }}
            >
              {/* Highlight background */}
              <span
                className="absolute -inset-x-3 -inset-y-1 bg-[#D4A853]/10 border border-[#D4A853]/20 -z-10"
                style={{ borderRadius: '8px' }}
              />
              <p className="font-heading text-xl md:text-2xl font-bold text-white">
                We don&apos;t chase trends.{' '}
                <span className="text-[#D4A853]">We chase results.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A853]/20 to-transparent" />
    </section>
  );
}
