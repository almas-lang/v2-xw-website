'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function WhatWeDo() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-32 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-16 md:mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon mb-3">
            What We Do
          </h2>
          <p className="text-g500 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            A UX design and product company based in Bangalore, India
          </p>
        </div>

        {/* Two asymmetric cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* For Designers - Dark card */}
          <div
            className="group relative transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '150ms',
            }}
          >
            <div
              className="bg-carbon p-8 md:p-10 h-full relative overflow-hidden"
              style={{ borderRadius: '24px' }}
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full" />

              {/* Badge */}
              <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-6" style={{ borderRadius: '4px' }}>
                For Designers
              </span>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                Mentorship that gets you unstuck.
              </h3>

              <ul className="space-y-3 mb-8">
                {[
                  'Career transitions into UX',
                  'Senior & leadership growth',
                  'Portfolio, positioning, interviews',
                  '1:1 mentorship until you succeed',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-g400">
                    <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Stat highlight */}
              <div className="bg-white/5 border border-white/10 p-4 mb-8" style={{ borderRadius: '12px' }}>
                <p className="text-alice">
                  <span className="font-heading text-2xl font-bold">95%</span>
                  <span className="text-g400 ml-2">of our mentees achieve their goals.</span>
                </p>
              </div>

              <Link
                href="/programs"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-heading font-semibold px-6 py-3 transition-all group-hover:gap-3"
                style={{ borderRadius: '8px' }}
              >
                Explore programs
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* For Companies - Light card with border */}
          <div
            className="group relative transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '300ms',
            }}
          >
            <div
              className="bg-gradient-to-br from-alice/30 to-alice/10 border-2 border-alice/40 p-8 md:p-10 h-full relative overflow-hidden"
              style={{ borderRadius: '24px' }}
            >
              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-carbon/5 to-transparent rounded-tr-full" />

              {/* Badge */}
              <span className="inline-block px-3 py-1 bg-carbon text-white text-xs font-semibold uppercase tracking-wider mb-6" style={{ borderRadius: '4px' }}>
                For Companies
              </span>

              <h3 className="font-heading text-2xl md:text-3xl font-bold text-carbon mb-3">
                Design, development, and talent that actually delivers.
              </h3>

              <ul className="space-y-3 mb-8">
                {[
                  { label: 'Design:', text: 'Research, UI/UX, strategy' },
                  { label: 'Development:', text: 'Front-end, back-end, MVPs, Product builds' },
                  { label: 'Talent:', text: 'Hire trained designers' },
                  { label: 'Training:', text: 'Custom programs for your team' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-g600">
                    <span className="w-1.5 h-1.5 rounded-full bg-carbon mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-carbon">{item.label}</strong> {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Stat highlight */}
              <div className="bg-white/80 border border-carbon/10 p-4 mb-8" style={{ borderRadius: '12px' }}>
                <p className="text-carbon">
                  <span className="font-heading text-2xl font-bold">20+</span>
                  <span className="text-g600 ml-2">products built. Teams scaled.</span>
                </p>
              </div>

              <Link
                href="/for-business"
                className="inline-flex items-center gap-2 bg-carbon hover:bg-carbon/90 text-white font-heading font-semibold px-6 py-3 transition-all group-hover:gap-3"
                style={{ borderRadius: '8px' }}
              >
                Work with us
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
