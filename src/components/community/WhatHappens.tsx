'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Floating doodle shapes
const doodles = [
  { type: 'star', left: '5%', top: '15%', size: 20, rotation: 15, delay: 0 },
  { type: 'circle', left: '92%', top: '25%', size: 12, rotation: 0, delay: 0.2 },
  { type: 'squiggle', left: '88%', top: '70%', size: 30, rotation: -10, delay: 0.4 },
  { type: 'star', left: '8%', top: '75%', size: 16, rotation: -20, delay: 0.3 },
  { type: 'plus', left: '95%', top: '45%', size: 14, rotation: 45, delay: 0.1 },
];

export default function WhatHappens() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPill, setHoveredPill] = useState<number | null>(null);
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
      className="relative bg-white overflow-hidden"
    >
      {/* Soft grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Pastel gradient blobs - responsive sizes */}
      <div
        className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(199, 210, 254, 0.4) 0%, transparent 70%)',
          filter: 'blur(25px)',
          opacity: isVisible ? 1 : 0,
          animation: 'floatBlob 12s ease-in-out infinite',
          transition: 'opacity 1s ease-out',
        }}
      />
      <div
        className="absolute -bottom-5 sm:-bottom-10 -right-5 sm:-right-10 w-[120px] sm:w-[250px] h-[120px] sm:h-[250px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(221, 214, 254, 0.35) 0%, transparent 70%)',
          filter: 'blur(25px)',
          opacity: isVisible ? 1 : 0,
          animation: 'floatBlob 15s ease-in-out infinite reverse',
          transition: 'opacity 1s ease-out 0.2s',
        }}
      />
      <div
        className="absolute top-1/2 right-[20%] w-[180px] h-[180px] rounded-full pointer-events-none hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(254, 215, 170, 0.25) 0%, transparent 70%)',
          filter: 'blur(30px)',
          opacity: isVisible ? 1 : 0,
          animation: 'floatBlob 18s ease-in-out infinite',
          transition: 'opacity 1s ease-out 0.4s',
        }}
      />

      {/* Playful doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {doodles.map((doodle, index) => (
          <div
            key={index}
            className="absolute hidden md:block"
            style={{
              left: doodle.left,
              top: doodle.top,
              opacity: isVisible ? 0.15 : 0,
              transform: `rotate(${doodle.rotation}deg)`,
              transition: `opacity 0.5s ease-out ${doodle.delay}s`,
              animation: isVisible ? `doodleFloat ${3 + index}s ease-in-out ${doodle.delay}s infinite` : 'none',
            }}
          >
            {doodle.type === 'star' && (
              <svg width={doodle.size} height={doodle.size} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            )}
            {doodle.type === 'circle' && (
              <svg width={doodle.size} height={doodle.size} viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
              </svg>
            )}
            {doodle.type === 'squiggle' && (
              <svg width={doodle.size} height={doodle.size * 0.5} viewBox="0 0 40 20" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round">
                <path d="M2 10 Q 8 2, 14 10 T 26 10 T 38 10" />
              </svg>
            )}
            {doodle.type === 'plus' && (
              <svg width={doodle.size} height={doodle.size} viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-20 md:py-28">
        {/* Bento-style layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">

          {/* Main text card - with dot grid pattern */}
          <div
            className="lg:col-span-2 relative bg-gradient-to-br from-[#fafafa] to-[#f5f5f7] rounded-3xl p-8 md:p-10 lg:p-12 overflow-hidden border border-neutral-100 group"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out',
            }}
          >
            {/* Dot grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Floating accent circles with glow */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                filter: 'blur(20px)',
                transform: isVisible ? 'scale(1)' : 'scale(0)',
                transition: 'transform 0.6s ease-out 0.3s',
                animation: isVisible ? 'pulseGlow 4s ease-in-out infinite' : 'none',
              }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
                filter: 'blur(15px)',
                transform: isVisible ? 'scale(1)' : 'scale(0)',
                transition: 'transform 0.6s ease-out 0.4s',
                animation: isVisible ? 'pulseGlow 5s ease-in-out infinite reverse' : 'none',
              }}
            />

            {/* Hand-drawn underline decoration */}
            <svg className="absolute top-[72px] left-8 md:left-10 lg:left-12 w-40 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 160 12" fill="none">
              <path d="M2 8 Q 40 2, 80 8 T 158 6" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="8" to="0" dur="0.5s" fill="freeze" />
              </path>
            </svg>

            <div className="relative z-10">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
                What Happens
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-4">
                This isn't your typical design meetup. No loud music. No surface-level networking. Just real speakers, real topics, and real conversations.
              </p>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Every edition features industry talks, a trends segment, and time to actually connect with people in product, design, and tech.
              </p>
            </div>
          </div>

          {/* Image card with accent stripe and hover effect */}
          <div
            className="lg:col-span-1 lg:row-span-2 relative bg-neutral-100 rounded-3xl overflow-hidden min-h-[280px] lg:min-h-0 group cursor-pointer"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) rotate(1deg)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.1s',
            }}
          >
            {/* Animated gradient stripe at top */}
            <div
              className="absolute top-0 left-0 right-0 h-2 overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa, #6366f1)',
                backgroundSize: '200% 100%',
                animation: 'gradientSlide 3s linear infinite',
              }}
            />

            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
              }}
            />

            <Image
              src="/images/community-whathappens.jpg"
              alt="WaveMakers Connect Event"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Edition badge with bounce */}
            <div
              className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-xs font-medium text-neutral-700 rounded-full shadow-sm"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.5s ease-out 0.4s',
              }}
            >
              Edition #3
            </div>

            {/* Corner decoration */}
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-indigo-300/30 rounded-tr-lg" />
          </div>

          {/* Highlight pills row with hover effects */}
          <div
            className="lg:col-span-2 flex flex-wrap gap-3"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.2s',
            }}
          >
            {['Industry Speakers', 'Trends Segment', 'Networking + Coffee', 'Free'].map((item, index) => (
              <span
                key={item}
                className={`relative px-5 py-3 text-sm font-medium rounded-full cursor-pointer transition-all duration-300 ${
                  index === 3
                    ? 'bg-indigo-500 text-white hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/25'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg'
                }`}
                style={{
                  transform: hoveredPill === index ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredPill(index)}
                onMouseLeave={() => setHoveredPill(null)}
              >
                {item}
                {/* Sparkle on Free badge */}
                {index === 3 && (
                  <span
                    className="absolute -top-1 -right-1 text-xs"
                    style={{
                      animation: 'sparkle 1.5s ease-in-out infinite',
                    }}
                  >
                    ✨
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, -10px) scale(1.05); }
        }
        @keyframes doodleFloat {
          0%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
          50% { transform: translateY(-5px) rotate(var(--rotation, 0deg)); }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes gradientSlide {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.6; transform: scale(1.2) rotate(10deg); }
        }
      `}</style>
    </section>
  );
}
