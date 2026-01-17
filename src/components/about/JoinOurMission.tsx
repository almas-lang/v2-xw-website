'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function JoinOurMission() {
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
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-carbon"
    >
      {/* Accent gradient corner */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(232, 90, 79, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Typography */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            {/* Badge */}
            <div className="mb-8">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider"
                style={{ borderRadius: '6px' }}
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                We&apos;re Hiring
              </span>
            </div>

            {/* Section title */}
            <h2
              className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '150ms',
              }}
            >
              Join Our Mission
            </h2>

            {/* Large stacked tagline */}
            <div className="space-y-1 mb-8">
              <p
                className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-white leading-[1.1] transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '200ms',
                }}
              >
                Growth-first.{' '}
                <span className="text-accent">No BS.</span>{' '}
                Until you win.
              </p>
            </div>

            {/* Divider */}
            <div
              className="w-16 h-1 bg-accent mb-6 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                width: isVisible ? '64px' : '0px',
                transitionDelay: '450ms',
              }}
            />

            {/* Subtext */}
            <p
              className="text-white/70 text-lg md:text-xl mb-8 max-w-md transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionDelay: '500ms',
              }}
            >
              If that sounds like your kind of place, let&apos;s talk.
            </p>

            {/* CTA */}
            <div
              className="transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transitionDelay: '550ms',
              }}
            >
              <Link
                href="/careers"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-heading font-bold text-base transition-all duration-300 hover:gap-4 group"
                style={{ borderRadius: '12px' }}
              >
                See Open Positions
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right - Team Photo */}
          <div
            className="relative transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
              transitionDelay: '300ms',
            }}
          >
            {/* Photo container with decorative frame */}
            <div className="relative">
              {/* Offset border frame */}
              <div
                className="absolute -inset-3 border-2 border-accent/20 pointer-events-none"
                style={{
                  borderRadius: '24px',
                  transform: 'rotate(2deg)',
                }}
              />

              {/* Main image container */}
              <div
                className="relative aspect-[4/3] overflow-hidden bg-white/5"
                style={{ borderRadius: '20px' }}
              >
                <Image
                  src="/images/team-culture.jpg"
                  alt="Xperience Wave team culture"
                  fill
                  className="object-cover"
                />

                {/* Fallback placeholder if image doesn't exist */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-accent/20 to-alice/20">
                  <svg className="w-16 h-16 text-white/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-white/50 text-sm font-medium">Team Photo</span>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/40 via-transparent to-transparent" />
              </div>

              {/* Floating roles card */}
              <div
                className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white/95 backdrop-blur-sm px-5 py-4 shadow-xl"
                style={{ borderRadius: '14px' }}
              >
                <p className="text-xs text-g400 uppercase tracking-wider mb-1">We&apos;re looking for</p>
                <div className="flex flex-wrap gap-2">
                  {['Designers', 'Engineers', 'Strategists'].map((role) => (
                    <span
                      key={role}
                      className="px-2.5 py-1 bg-carbon text-white text-xs font-medium"
                      style={{ borderRadius: '6px' }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
