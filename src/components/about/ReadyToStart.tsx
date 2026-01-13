'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function ReadyToStart() {
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Section Header */}
      <div
        className="text-center py-12 md:py-16 bg-white transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon">
          Ready to Start?
        </h2>
      </div>

      {/* Full-width split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[450px] lg:min-h-[500px]">
        {/* Left - For Designers (Dark) */}
        <Link
          href="/programs"
          className="group relative flex flex-col justify-center px-8 py-16 md:px-12 lg:px-16 xl:px-20 bg-carbon overflow-hidden"
        >
          {/* Accent glow */}
          <div
            className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none transition-opacity duration-700"
            style={{
              background: 'radial-gradient(circle at top left, rgba(232, 90, 79, 0.15) 0%, transparent 60%)',
              opacity: isVisible ? 1 : 0,
            }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Content */}
          <div
            className="relative z-10 max-w-md transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            {/* Label */}
            <p
              className="text-accent text-sm font-bold uppercase tracking-widest mb-4 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionDelay: '150ms',
              }}
            >
              For Designers
            </p>

            {/* Description */}
            <p
              className="text-white/80 text-base md:text-lg mb-8 leading-relaxed transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionDelay: '200ms',
              }}
            >
              Explore mentorship programs for every stage of your career
            </p>

            {/* CTA */}
            <div
              className="transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionDelay: '300ms',
              }}
            >
              <span
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-heading font-bold text-sm transition-all duration-300 group-hover:gap-4"
                style={{ borderRadius: '10px' }}
              >
                Explore Programs
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>

          {/* Decorative corner */}
          <div
            className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, transparent 50%, rgba(232, 90, 79, 0.1) 100%)',
            }}
          />
        </Link>

        {/* Right - For Companies (Light/Alice) */}
        <Link
          href="/contact"
          className="group relative flex flex-col justify-center px-8 py-16 md:px-12 lg:px-16 xl:px-20 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #E8F4F7 0%, #D4EBF1 50%, #C0E2EA 100%)',
          }}
        >
          {/* Decorative circles */}
          <div className="absolute top-8 right-8 opacity-10 pointer-events-none">
            {[0, 1, 2].map((ring) => (
              <div
                key={ring}
                className="absolute border-2 border-carbon rounded-full"
                style={{
                  width: `${80 + ring * 50}px`,
                  height: `${80 + ring * 50}px`,
                  top: `${-ring * 25}px`,
                  right: `${-ring * 25}px`,
                  opacity: 1 - ring * 0.3,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div
            className="relative z-10 max-w-md transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '150ms',
            }}
          >
            {/* Label */}
            <p
              className="text-sm font-bold uppercase tracking-widest mb-4 transition-all duration-700"
              style={{
                color: '#4A90A4',
                opacity: isVisible ? 1 : 0,
                transitionDelay: '250ms',
              }}
            >
              For Companies
            </p>

            {/* Description */}
            <p
              className="text-g600 text-base md:text-lg mb-8 leading-relaxed transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionDelay: '300ms',
              }}
            >
              Design, development, talent, and training for your team
            </p>

            {/* CTA */}
            <div
              className="transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionDelay: '400ms',
              }}
            >
              <span
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-carbon hover:bg-carbon/90 text-white font-heading font-bold text-sm transition-all duration-300 group-hover:gap-4"
                style={{ borderRadius: '10px' }}
              >
                Work With Us
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>

          {/* Decorative corner */}
          <div
            className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
            style={{
              background: 'linear-gradient(225deg, transparent 50%, rgba(74, 144, 164, 0.1) 100%)',
            }}
          />
        </Link>
      </div>
    </section>
  );
}
