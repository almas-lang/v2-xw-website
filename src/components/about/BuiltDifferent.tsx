'use client';

import { useEffect, useRef, useState } from 'react';

export default function BuiltDifferent() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-32"
      style={{
        background: 'linear-gradient(180deg, #FAFAFA 0%, #F0F0F0 100%)',
      }}
    >
      {/* Large background text watermark */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-bold text-[200px] md:text-[400px] text-carbon/[0.02] whitespace-nowrap pointer-events-none select-none"
        aria-hidden="true"
      >
        DIFFERENT
      </span>

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        {/* Header - left aligned with accent line */}
        <div
          className="flex items-center gap-4 mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
          }}
        >
          <div className="w-12 md:w-20 h-1 bg-accent" />
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon">
            Built Different
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
                className="absolute -inset-3 border-2 border-carbon/10 -z-10"
                style={{ borderRadius: '20px', transform: 'rotate(-3deg)' }}
              />
              {/* Main image container */}
              <div
                className="w-full aspect-[4/5] bg-gradient-to-br from-g200 to-g100 flex items-center justify-center overflow-hidden"
                style={{ borderRadius: '16px' }}
              >
                <svg className="w-16 h-16 text-g300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                  className="font-heading text-xl md:text-2xl lg:text-3xl text-carbon leading-snug mb-1"
                >
                  <span className="font-bold">{item.highlight}</span>
                  <span className="font-normal text-g500"> {item.rest}</span>
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="w-16 h-px bg-g300 mb-8 md:mb-10" />

            {/* Second group - Philosophy statements */}
            <div className="mb-8 md:mb-10 space-y-2">
              {[
                { start: 'Adults learn by', highlight: 'doing', middle: ', not', end: 'cramming.' },
                { start: 'Products win by', highlight: 'solving', middle: ', not', end: 'shipping.' },
                { start: 'Growth happens by', highlight: 'focus', middle: ', not', end: 'noise.' },
              ].map((item, i) => (
                <p key={i} className="font-body text-base md:text-lg text-g600">
                  {item.start} <span className="text-carbon font-semibold">{item.highlight}</span>{item.middle} <span className="line-through text-g400">{item.end}</span>
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
                className="absolute -inset-x-2 inset-y-0 bg-accent/10 -z-10"
                style={{ borderRadius: '4px' }}
              />
              <p className="font-heading text-xl md:text-2xl font-bold text-carbon">
                We don't chase trends. <span className="text-accent">We chase results.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
    </section>
  );
}
