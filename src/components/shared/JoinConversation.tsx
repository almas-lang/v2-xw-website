'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function JoinConversation() {
  const [isVisible, setIsVisible] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: hover)');
    setCanHover(hoverQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    hoverQuery.addEventListener('change', handleChange);
    return () => hoverQuery.removeEventListener('change', handleChange);
  }, []);

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
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
      }}
    >
      {/* Large decorative text watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-heading font-bold text-[80px] sm:text-[120px] md:text-[180px] lg:text-[240px] text-carbon/[0.02] whitespace-nowrap">
          CONNECT
        </span>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-10 md:mb-14 lg:mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-carbon">
            Join The Conversation
          </h2>
        </div>

        {/* Cards - Asymmetric Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">

          {/* Vivid Yellow Podcast - Large Featured Card */}
          <Link
            href="/podcast"
            className="lg:col-span-7 group relative block transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '150ms',
            }}
          >
            <div
              className="relative h-full overflow-hidden bg-[#1A1A1A] transition-all duration-500 group-hover:shadow-2xl"
              style={{ borderRadius: '24px' }}
            >
              {/* Yellow gradient accent on top */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 z-20"
                style={{
                  background: 'linear-gradient(90deg, #FACC15 0%, #FDE047 50%, #FACC15 100%)',
                }}
              />

              {/* Background image with overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/images/vivid-yellow-podcast.jpeg"
                  alt=""
                  fill
                  className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 lg:p-10 min-h-[320px] md:min-h-[380px] flex flex-col">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-auto">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-carbon text-xs font-bold uppercase tracking-wider"
                    style={{ borderRadius: '6px' }}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                    </svg>
                    Podcast
                  </span>
                </div>

                {/* Main content */}
                <div className="mt-auto">
                  {/* Sound wave animation */}
                  <div className="flex items-end gap-1 mb-4 h-8">
                    {[4, 7, 3, 8, 5, 9, 4, 6, 8, 5, 7, 4, 6, 3, 8, 5].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 bg-yellow-400 rounded-full transition-all"
                        style={{
                          height: `${h * 3}px`,
                          opacity: !canHover ? 0.9 : 0.6,
                          animationName: 'soundWave',
                          animationDuration: '1.2s',
                          animationTimingFunction: 'ease-in-out',
                          animationIterationCount: 'infinite',
                          animationDelay: `${i * 0.08}s`,
                        }}
                      />
                    ))}
                  </div>

                  <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                    Vivid Yellow Podcast
                  </h3>

                  <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4 max-w-md">
                    Raw conversations with extraordinary people about work, life, and the uncomfortable truths that shape both.
                  </p>

                  <p className="text-white text-sm md:text-base font-semibold mb-6">
                    No scripts. No fluff. <span className="text-yellow-400">Just real talk.</span>
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-3 text-yellow-400 font-heading font-bold text-base group-hover:gap-4 transition-all duration-300">
                    Listen Now
                    <span className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-5 h-5 text-carbon ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* WaveMakers Connect - Smaller Card */}
          <Link
            href="/wavemakers-connect"
            className="lg:col-span-5 group relative block transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '300ms',
            }}
          >
            <div
              className="relative h-full overflow-hidden transition-all duration-500 group-hover:shadow-2xl"
              style={{
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #E8F4F7 0%, #D4EBF1 50%, #C0E2EA 100%)',
              }}
            >
              {/* Alice blue accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 z-20"
                style={{
                  background: 'linear-gradient(90deg, #4A90A4 0%, #6BB5C9 50%, #4A90A4 100%)',
                }}
              />

              {/* Decorative circles pattern */}
              <div className="absolute top-8 right-8 opacity-20">
                <div className="relative">
                  {[0, 1, 2].map((ring) => (
                    <div
                      key={ring}
                      className="absolute border-2 border-carbon rounded-full"
                      style={{
                        width: `${60 + ring * 40}px`,
                        height: `${60 + ring * 40}px`,
                        top: `${-ring * 20}px`,
                        left: `${-ring * 20}px`,
                        opacity: 1 - ring * 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 min-h-[320px] md:min-h-[380px] flex flex-col">
                {/* Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-carbon text-white text-xs font-bold uppercase tracking-wider"
                    style={{ borderRadius: '6px' }}
                  >
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Community
                  </span>
                </div>

                {/* WMC Logo */}
                <div className="mb-6">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 bg-white/80 flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                    style={{ borderRadius: '16px', boxShadow: '0 8px 30px rgba(74, 144, 164, 0.2)' }}
                  >
                    <Image
                      src="/images/wmc-logo.svg"
                      alt="WaveMakers Connect"
                      width={48}
                      height={48}
                      className="w-10 h-10 md:w-12 md:h-12"
                    />
                  </div>
                </div>

                {/* Main content */}
                <div className="mt-auto">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold text-carbon mb-3 leading-tight">
                    WaveMakers Connect
                  </h3>

                  <p className="text-g600 text-sm md:text-base leading-relaxed mb-4">
                    Quarterly offline events for 1000+ designers, engineers, entrepreneurs.
                  </p>

                  <p className="text-carbon text-sm md:text-base font-semibold mb-6">
                    No hype. <span style={{ color: '#4A90A4' }}>Just real connections.</span>
                  </p>

                  {/* Attendee avatars */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex -space-x-2">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-g300 to-g400"
                          style={{ zIndex: 5 - i }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-g600">
                      <span className="font-bold text-carbon">1000+</span> attendees
                    </span>
                  </div>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 font-heading font-bold text-base group-hover:gap-3 transition-all duration-300" style={{ color: '#4A90A4' }}>
                    Join Next Event
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Sound wave animation keyframes */}
      <style jsx>{`
        @keyframes soundWave {
          0%, 100% {
            transform: scaleY(0.5);
          }
          50% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </section>
  );
}
