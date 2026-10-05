'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { VENUE_MAPS_URL, VENUE_MAPS_EMBED_URL } from './venue';

const schedule = [
  { time: '10:00 AM', title: 'Doors Open', type: 'start' },
  { time: '10:15 AM', title: 'Speaker Session 1', type: 'talk' },
  { time: '10:45 AM', title: 'Trends Segment', type: 'segment' },
  { time: '11:00 AM', title: 'Keynote', type: 'keynote' },
  { time: '11:30 AM', title: 'Coffee Break', type: 'break' },
  { time: '11:50 AM', title: 'Speaker Session 2', type: 'talk' },
  { time: '12:30 PM', title: 'Activities + Networking', type: 'networking' },
  { time: '1:00 PM', title: 'Close', type: 'end' },
];

const speakers = [
  { name: 'Abhimanyu Sirothia', talk: 'Design Director, Designit', link: 'https://www.youtube.com/watch?v=aDJZzBwrNSo', linkText: 'Watch His Podcast Episode', image: '/images/podcast-abhimanyu.jpeg' },
];

export default function UpcomingEdition() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSchedule, setHoveredSchedule] = useState<number | null>(null);
  const [hoveredSpeaker, setHoveredSpeaker] = useState<number | null>(null);
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
      className="relative bg-[#0a0118] overflow-hidden"
    >
      {/* Animated gradient blobs - responsive */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[450px] md:w-[600px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          opacity: isVisible ? 1 : 0,
          animation: 'breathe 8s ease-in-out infinite',
          transition: 'opacity 1s ease-out',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full pointer-events-none hidden sm:block"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: isVisible ? 1 : 0,
          animation: 'breathe 10s ease-in-out infinite reverse',
          transition: 'opacity 1s ease-out 0.2s',
        }}
      />

      {/* Geometric patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-20 -left-10 w-48 h-48 opacity-[0.03] hidden lg:block" viewBox="0 0 100 100">
          <defs>
            <pattern id="upcomingGrid" patternUnits="userSpaceOnUse" width="20" height="20">
              <rect width="20" height="20" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#upcomingGrid)" />
        </svg>

        <svg className="absolute top-1/4 right-[5%] w-16 h-16 opacity-[0.06] hidden lg:block" viewBox="0 0 100 100">
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="white" strokeWidth="1.5">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="30s" repeatCount="indefinite" />
          </polygon>
        </svg>

        <svg className="absolute bottom-20 left-[10%] w-32 h-32 opacity-[0.05] hidden lg:block" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>

        <div className="absolute top-1/3 left-[4%] w-4 h-4 rotate-45 border border-white/[0.08] hidden lg:block" />
        <div className="absolute bottom-1/4 right-[8%] w-3 h-3 rotate-45 border border-indigo-500/15 hidden md:block" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-16 md:py-20 lg:py-28">
        {/* Edition header: details left, map right */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center mb-16 md:mb-20 max-w-5xl mx-auto">
          {/* Left: event details */}
          <div
            className="text-center md:text-left"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s ease-out',
            }}
          >
            <span className="inline-block text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-3">
              Edition #4
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              The Designers We&apos;re Becoming
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
              A morning with Bangalore designers about speaking up with PMs and developers, telling your story well, and growing as AI changes the work.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className="text-white/90 text-base font-medium">
                  Saturday, Oct 24, 2026 · 10 AM – 1 PM
                </span>
              </div>
              <div className="flex items-start justify-center md:justify-start gap-3">
                <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-white/70 text-base">
                  Soul Staje, 16th Cross Rd, HSR Layout
                  <br className="hidden md:block" />
                  <span className="md:hidden"> </span>
                  (opp. NIFT College), Bengaluru
                </span>
              </div>
            </div>
            <a
              href={VENUE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm font-medium underline underline-offset-2 transition-colors"
            >
              Get directions on Google Maps →
            </a>
          </div>

          {/* Right: map, one click opens Google Maps */}
          <a
            id="map"
            href={VENUE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Soul Staje in Google Maps for directions"
            className="group relative block rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.12)] transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_50px_rgba(99,102,241,0.25)]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.15s',
            }}
          >
            <iframe
              src={VENUE_MAPS_EMBED_URL}
              title="Soul Staje on Google Maps"
              className="w-full h-[240px] sm:h-[300px] border-0 block pointer-events-none"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              tabIndex={-1}
              aria-hidden="true"
            />
            {/* Click hint */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3 pt-10 bg-gradient-to-t from-black/50 to-transparent pointer-events-none">
              <span className="px-4 py-1.5 bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium rounded-full shadow-lg transition-colors">
                Tap for directions →
              </span>
            </div>
          </a>
        </div>

        {/* Speakers This Edition */}
        <div
          className="mb-16 md:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.15s',
          }}
        >
          <h3 className="font-heading text-lg font-bold text-white text-center mb-8">
            Speaker This Edition
          </h3>

          {/* Speaker cards with gradient border on hover */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-12">
            {speakers.map((speaker, index) => (
              <div
                key={speaker.name}
                className="group relative"
                style={{
                  transform: isVisible
                    ? `translateY(${index === 0 ? '-8px' : '8px'}) rotate(${hoveredSpeaker === index ? 0 : (index === 0 ? -2 : 2)}deg)`
                    : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.2 + index * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredSpeaker(index)}
                onMouseLeave={() => setHoveredSpeaker(null)}
              >
                {/* Gradient border glow */}
                <div
                  className="absolute -inset-[2px] rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa, #6366f1)',
                    backgroundSize: '300% 300%',
                    animation: 'gradientShift 3s ease infinite',
                  }}
                />
                <div className="relative w-[280px] sm:w-[300px] bg-[#0a0118] border border-white/10 rounded-3xl p-4 transition-all duration-300 group-hover:border-transparent">
                  {/* Photo with glow */}
                  <div className="aspect-[4/3] bg-white/[0.05] rounded-2xl mb-4 flex items-center justify-center overflow-hidden relative">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
                      }}
                    />
                    {speaker.image ? (
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <svg className="w-12 h-12 text-white/10 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    )}
                  </div>

                  {/* Speaker info */}
                  <div className="text-center">
                    <h4 className="font-heading font-bold text-white text-base mb-1">
                      {speaker.name}
                    </h4>
                    {speaker.talk && (
                      <p className="text-white/50 text-sm mb-3">
                        {speaker.talk}
                      </p>
                    )}
                    <a
                      href={speaker.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 text-sm font-medium underline underline-offset-2 transition-colors"
                    >
                      {speaker.linkText}
                    </a>
                  </div>

                  {/* Number indicator with pulse */}
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-indigo-500 text-white text-sm font-bold flex items-center justify-center shadow-lg"
                    style={{
                      boxShadow: hoveredSpeaker === index
                        ? '0 0 20px rgba(99, 102, 241, 0.6), 0 4px 15px rgba(99, 102, 241, 0.4)'
                        : '0 4px 15px rgba(99, 102, 241, 0.3)',
                      transition: 'box-shadow 0.3s ease-out',
                    }}
                  >
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule section */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.25s',
          }}
        >
          <p className="text-white/60 text-center text-base mb-8 max-w-xl mx-auto">
            A morning of talks, trends, and real conversations. Here's what to expect.
          </p>

          {/* Timeline schedule with animated line */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative">
              {/* Animated vertical line */}
              <div className="absolute left-[72px] sm:left-[88px] top-0 bottom-0 w-px bg-white/10" />
              <div
                className="absolute left-[72px] sm:left-[88px] top-0 w-px bg-gradient-to-b from-indigo-500 to-violet-500"
                style={{
                  height: isVisible ? '100%' : '0%',
                  transition: 'height 2s ease-out 0.5s',
                }}
              />

              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center gap-4 sm:gap-6 py-3 cursor-pointer group"
                  onMouseEnter={() => setHoveredSchedule(index)}
                  onMouseLeave={() => setHoveredSchedule(null)}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s ease-out ${0.3 + index * 0.05}s`,
                  }}
                >
                  {/* Time */}
                  <span className={`w-[60px] sm:w-[72px] text-right text-sm font-medium transition-colors duration-200 ${
                    hoveredSchedule === index ? 'text-white' : 'text-white/50'
                  }`}>
                    {item.time}
                  </span>

                  {/* Dot with pulse animation */}
                  <div className="relative">
                    <div className={`relative z-10 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      hoveredSchedule === index
                        ? 'bg-indigo-500 border-indigo-500 scale-125'
                        : item.type === 'keynote'
                          ? 'bg-indigo-500/50 border-indigo-500/50'
                          : 'bg-[#0a0118] border-white/30'
                    }`} />
                    {hoveredSchedule === index && (
                      <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-50" />
                    )}
                  </div>

                  {/* Title */}
                  <span className={`text-sm sm:text-base transition-all duration-200 ${
                    hoveredSchedule === index
                      ? 'text-white translate-x-1'
                      : item.type === 'keynote'
                        ? 'text-indigo-400'
                        : 'text-white/70'
                  } ${item.type === 'keynote' ? 'font-medium' : ''}`}>
                    {item.title}
                  </span>

                  {/* Highlight bar on hover */}
                  <div
                    className="absolute inset-0 -mx-4 rounded-lg bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Seats indicator with urgency animation */}
          <div
            className="flex justify-center mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.5s ease-out 0.5s',
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] rounded-full border border-amber-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-white/70 text-sm">
                Limited to 108 seats · <span className="text-amber-400 font-medium animate-pulse">Filling fast</span>
              </span>
            </div>
          </div>

          {/* CTA with glow */}
          <div
            className="flex justify-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.5s ease-out 0.55s',
            }}
          >
            <Button href="/community/register" variant="indigo" size="lg" showArrow className="hover:scale-105 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              Register Now
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

      {/* Animations */}
      <style jsx global>{`
        @keyframes breathe {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.8; }
          50% { transform: translateX(-50%) scale(1.1); opacity: 1; }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
