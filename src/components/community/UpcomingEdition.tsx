'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

const schedule = [
  { time: '11:00 AM', title: 'Doors Open', type: 'start' },
  { time: '11:15 AM', title: 'Speaker Session 1', type: 'talk' },
  { time: '11:45 AM', title: 'Trends Segment', type: 'segment' },
  { time: '12:00 PM', title: 'Keynote', type: 'keynote' },
  { time: '12:30 PM', title: 'Coffee Break', type: 'break' },
  { time: '12:50 PM', title: 'Speaker Session 2', type: 'talk' },
  { time: '1:30 PM', title: 'Activities + Networking', type: 'networking' },
  { time: '2:00 PM', title: 'Close', type: 'end' },
];

const speakers = [
  { name: 'Pratika Chavan', talk: '', link: 'https://www.linkedin.com/in/pratika-chavan/', linkText: 'See LinkedIn', image: '/images/community-speaker1.jpg' },
  { name: 'Sunita Bisoyi', talk: '', link: 'https://www.linkedin.com/in/bisoyi-sunitha/', linkText: 'See LinkedIn', image: '/images/community-speaker2.jpeg' },
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
        {/* Header */}
        <div
          className="text-center mb-8 md:mb-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
            Edition #4 - AI Threatening Specialists
          </h2>
        </div>

        {/* Event details pill */}
        <div
          className="flex justify-center mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out 0.1s',
          }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-0 px-5 py-4 sm:py-3 bg-white/[0.05] border border-white/10 rounded-2xl sm:rounded-full text-center sm:text-left backdrop-blur-sm">
            <span className="text-white/90 text-sm font-medium">
              Sunday, Feb 15, 2025 · 11 AM onwards
            </span>
            <span className="hidden sm:block w-px h-4 bg-white/20 mx-4" />
            <span className="text-white/60 text-sm">
              It's Brown & Roasted, Singasandra
            </span>
            <a
              href="#map"
              className="ml-0 sm:ml-3 text-indigo-400 hover:text-indigo-300 text-sm font-medium underline underline-offset-2 transition-colors"
            >
              Locate on Maps
            </a>
          </div>
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
            Speakers This Edition
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
            An afternoon of talks, trends, and real conversations. Here's what to expect.
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
                Limited to 108 seats · <span className="text-amber-400 font-medium animate-pulse">12 remaining</span>
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
