'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface JoinConversationProps {
  heading?: string;
}

export default function JoinConversation({ heading = 'Join The Conversation' }: JoinConversationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)',
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
            <pattern id="beyondGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#beyondGrid)" />
        </svg>
      </div>

      {/* Glow effects */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[300px] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(250,204,21,0.1) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[250px] blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(74,144,164,0.1) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 px-5 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-[1100px] mx-auto">
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
              <span className="font-body text-xs uppercase tracking-[0.2em] text-accent font-medium">Connect</span>
              <div className="w-8 h-[2px] bg-accent" />
            </div>
            <h2 className="font-heading text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white leading-tight">
              {heading}
            </h2>
          </div>

          {/* Cards - Stack on mobile, side by side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">

            {/* Vivid Yellow Podcast Card */}
            <Link
              href="/podcast"
              className="group block"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
              }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden border border-yellow-400/20 sm:hover:border-yellow-400/50 transition-all duration-500">
                {/* Background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #262620 50%, #1a1a1a 100%)',
                  }}
                />

                {/* Background image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/vivid-yellow-podcast.jpeg"
                    alt=""
                    fill
                    className="object-cover opacity-30 sm:group-hover:opacity-40 sm:group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/70 to-[#1a1a1a]/40" />
                </div>

                {/* Yellow top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 z-20"
                  style={{ background: 'linear-gradient(90deg, #FACC15 0%, #FDE047 50%, #FACC15 100%)' }}
                />

                {/* Content */}
                <div className="relative z-10 p-5 sm:p-6 md:p-8 min-h-[280px] sm:min-h-[320px] flex flex-col">
                  {/* Badge */}
                  <div className="mb-auto">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400 text-carbon text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                      </svg>
                      Podcast
                    </span>
                  </div>

                  {/* Sound wave - always animated */}
                  <div className="flex items-end gap-0.5 sm:gap-1 mb-4 h-6 sm:h-8">
                    {[4, 7, 3, 8, 5, 9, 4, 6, 8, 5, 7, 4].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 bg-yellow-400 rounded-full"
                        style={{
                          height: `${h * 2.5}px`,
                          animation: 'soundWave 1.2s ease-in-out infinite',
                          animationDelay: `${i * 0.08}s`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                    Vivid Yellow Podcast
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed mb-3 max-w-md">
                    Raw conversations with extraordinary people about work, life, and the uncomfortable truths that shape both.
                  </p>

                  <p className="text-white text-xs sm:text-sm font-semibold mb-5">
                    No scripts. No fluff. <span className="text-yellow-400">Just real talk.</span>
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-400 flex items-center justify-center sm:group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-400/30">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-carbon ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="font-heading font-bold text-sm sm:text-base text-yellow-400 sm:group-hover:underline">
                      Listen Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* WaveMakers Connect Card */}
            <Link
              href="/wavemakers-connect"
              className="group block"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
              }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden border border-alice/20 sm:hover:border-alice/50 transition-all duration-500">
                {/* Background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #1a2025 50%, #1a1a1a 100%)',
                  }}
                />

                {/* Decorative circles */}
                <div className="absolute top-6 right-6 sm:top-8 sm:right-8 opacity-10">
                  {[0, 1, 2].map((ring) => (
                    <div
                      key={ring}
                      className="absolute border border-alice rounded-full"
                      style={{
                        width: `${50 + ring * 35}px`,
                        height: `${50 + ring * 35}px`,
                        top: `${-ring * 17}px`,
                        left: `${-ring * 17}px`,
                      }}
                    />
                  ))}
                </div>

                {/* Alice top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 z-20"
                  style={{ background: 'linear-gradient(90deg, #4A90A4 0%, #6BB5C9 50%, #4A90A4 100%)' }}
                />

                {/* Content */}
                <div className="relative z-10 p-5 sm:p-6 md:p-8 min-h-[280px] sm:min-h-[320px] flex flex-col">
                  {/* Badge */}
                  <div className="mb-5 sm:mb-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-alice text-carbon text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Community
                    </span>
                  </div>

                  {/* Logo */}
                  <div className="mb-5 sm:mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-xl flex items-center justify-center sm:group-hover:scale-105 transition-transform duration-300 border border-white/10">
                      <Image
                        src="/images/wmc-logo.svg"
                        alt="WaveMakers Connect"
                        width={40}
                        height={40}
                        className="w-8 h-8 sm:w-10 sm:h-10"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                    WaveMakers Connect
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                    Quarterly offline events for 1000+ designers, engineers, entrepreneurs.
                  </p>

                  <p className="text-white text-xs sm:text-sm font-semibold mb-5">
                    No hype. <span className="text-alice">Just real connections.</span>
                  </p>

                  {/* Attendee avatars + CTA */}
                  <div className="mt-auto flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <div className="flex -space-x-2">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#1a1a1a] bg-gradient-to-br from-g500 to-g600"
                            style={{ zIndex: 5 - i }}
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-white/70">
                        <span className="font-bold text-white">1000+</span> attendees
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-2 font-heading font-bold text-sm sm:text-base text-alice sm:group-hover:underline">
                      Join Next Event
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,35,0.3) 50%, transparent 100%)' }}
      />

      {/* Sound wave animation */}
      <style jsx>{`
        @keyframes soundWave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
