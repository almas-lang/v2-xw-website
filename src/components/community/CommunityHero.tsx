'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Seeded random for consistent SSR/client values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

// Generate deterministic particles
const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${seededRandom(i * 1.1) * 100}%`,
  size: seededRandom(i * 2.2) * 4 + 2,
  duration: seededRandom(i * 3.3) * 10 + 15,
  delay: seededRandom(i * 4.4) * 10,
  opacity: seededRandom(i * 5.5) * 0.4 + 0.1,
}));

// Confetti shapes
const confettiShapes = [
  { type: 'circle', color: '#6366f1', size: 8, left: '10%', top: '20%', delay: 0 },
  { type: 'square', color: '#8b5cf6', size: 6, left: '85%', top: '15%', delay: 0.5 },
  { type: 'circle', color: '#a78bfa', size: 10, left: '75%', top: '60%', delay: 1 },
  { type: 'square', color: '#6366f1', size: 5, left: '15%', top: '70%', delay: 1.5 },
  { type: 'circle', color: '#818cf8', size: 7, left: '90%', top: '40%', delay: 2 },
  { type: 'square', color: '#a78bfa', size: 8, left: '5%', top: '45%', delay: 2.5 },
  { type: 'circle', color: '#8b5cf6', size: 6, left: '60%', top: '80%', delay: 0.3 },
  { type: 'square', color: '#6366f1', size: 9, left: '30%', top: '10%', delay: 0.8 },
];

// Glowing orbs
const glowOrbs = [
  { size: 300, left: '10%', top: '20%', color: '#6366f1', blur: 100, delay: 0 },
  { size: 250, right: '5%', top: '40%', color: '#8b5cf6', blur: 120, delay: 0.5 },
  { size: 200, left: '30%', bottom: '10%', color: '#a78bfa', blur: 80, delay: 1 },
  { size: 180, right: '25%', top: '10%', color: '#818cf8', blur: 90, delay: 1.5 },
];

export default function CommunityHeroC() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative bg-[#0a0118] overflow-hidden min-h-[90vh]">
      {/* Floating particles - reduced on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full bg-white ${particle.id >= 15 ? 'hidden md:block' : ''}`}
            style={{
              left: particle.left,
              bottom: '-20px',
              width: particle.size,
              height: particle.size,
              opacity: isVisible ? particle.opacity : 0,
              animation: `rise ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              transition: 'opacity 1s ease-out',
            }}
          />
        ))}
      </div>

      {/* Glowing orbs - scaled down on mobile */}
      {glowOrbs.map((orb, index) => (
        <div
          key={index}
          className={`absolute rounded-full pointer-events-none ${index >= 2 ? 'hidden md:block' : ''}`}
          style={{
            width: `min(${orb.size}px, 60vw)`,
            height: `min(${orb.size}px, 60vw)`,
            left: orb.left,
            right: orb.right,
            top: orb.top,
            bottom: orb.bottom,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${Math.min(orb.blur, 60)}px)`,
            opacity: isVisible ? 0.15 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.5)',
            transition: `all 1.2s ease-out ${orb.delay}s`,
            animation: `pulse ${4 + index}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}

      {/* Confetti shapes */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {confettiShapes.map((shape, index) => (
          <div
            key={index}
            className={shape.type === 'circle' ? 'rounded-full' : 'rotate-45'}
            style={{
              position: 'absolute',
              left: shape.left,
              top: shape.top,
              width: shape.size,
              height: shape.size,
              backgroundColor: shape.color,
              opacity: isVisible ? 0.6 : 0,
              transform: isVisible ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(45deg)',
              transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${shape.delay}s`,
              animation: `confetti ${3 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${shape.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkle bursts */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease-out 0.5s' }}>
        {/* Sparkle 1 */}
        <g transform="translate(150, 200)">
          <line x1="0" y1="-15" x2="0" y2="15" stroke="#a78bfa" strokeWidth="2" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="-15" y1="0" x2="15" y2="0" stroke="#a78bfa" strokeWidth="2" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="-10" y1="-10" x2="10" y2="10" stroke="#a78bfa" strokeWidth="1.5" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="10" y1="-10" x2="-10" y2="10" stroke="#a78bfa" strokeWidth="1.5" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
          </line>
        </g>
        {/* Sparkle 2 */}
        <g transform="translate(85%, 30%)">
          <line x1="0" y1="-12" x2="0" y2="12" stroke="#818cf8" strokeWidth="2" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.15;0.4" dur="2.5s" repeatCount="indefinite" />
          </line>
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#818cf8" strokeWidth="2" opacity="0.4">
            <animate attributeName="opacity" values="0.4;0.15;0.4" dur="2.5s" repeatCount="indefinite" />
          </line>
        </g>
        {/* Sparkle 3 */}
        <g transform="translate(20%, 75%)">
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#6366f1" strokeWidth="1.5" opacity="0.35">
            <animate attributeName="opacity" values="0.35;0.1;0.35" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#6366f1" strokeWidth="1.5" opacity="0.35">
            <animate attributeName="opacity" values="0.35;0.1;0.35" dur="3s" repeatCount="indefinite" />
          </line>
        </g>
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav
          className="pt-24 md:pt-28 pb-8 md:pb-10"
          aria-label="Breadcrumb"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.5s ease-out',
          }}
        >
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/70">Community</span>
          </div>
        </nav>

        {/* Main content */}
        <div className="relative pb-20 md:pb-28">
          {/* Badge with celebration effect */}
          <div
            className="mb-5"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.5s ease-out 0.1s',
            }}
          >
            <span className="inline-flex items-center gap-2.5 text-sm text-indigo-400 font-medium px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              WaveMakers Connect
              <span className="text-xs">🎉</span>
            </span>
          </div>

          {/* Headline */}
          <div
            className="mb-6 max-w-4xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.15s',
            }}
          >
            <h1 className="font-heading font-bold text-white leading-[1.05] tracking-[-0.02em] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
              Where Product, Design, & Tech Meet
            </h1>
          </div>

          {/* Content row */}
          <div className="relative">
            <div className="max-w-xl">
              <div
                className="mb-5"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease-out 0.25s',
                }}
              >
                <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-1">
                  A free in-person event for designers, engineers, and entrepreneurs in Bangalore.
                </p>
                <p className="text-lg md:text-xl text-white font-medium">
                  No hype. Just real conversations.
                </p>
              </div>

              {/* Event details */}
              <div
                className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-white/60 text-sm"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease-out 0.3s',
                }}
              >
                <span>Sunday, Feb 15, 2025</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>11 AM onwards</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span>Bengaluru</span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-indigo-400 font-medium">Free</span>
              </div>

              {/* CTA */}
              <div
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease-out 0.35s',
                }}
              >
                <a
                  href="#register"
                  className="group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-semibold text-sm sm:text-base rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30"
                >
                  Register for Next Event
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Image composition */}
            <div
              className="hidden md:block absolute -right-8 lg:right-0 top-0 w-[340px] lg:w-[420px]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'rotate(-3deg) translateY(0)' : 'rotate(-3deg) translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            >
              <div
                className="relative bg-white p-2 rounded-sm shadow-2xl"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(99, 102, 241, 0.2)',
                }}
              >
                <div className="aspect-[4/3] bg-neutral-200 rounded-sm overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-300 flex items-center justify-center">
                    <svg className="w-12 h-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                </div>
                <div className="pt-3 pb-1 px-1">
                  <p className="text-neutral-500 text-xs font-medium text-center">Edition #4 · Dec 2024</p>
                </div>
              </div>

              <div
                className="absolute -bottom-16 -left-16 w-[180px] lg:w-[220px] bg-white p-1.5 rounded-sm shadow-xl"
                style={{
                  transform: 'rotate(6deg)',
                  boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.4)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 0.6s ease-out 0.6s',
                }}
              >
                <div className="aspect-[3/2] bg-neutral-200 rounded-sm overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Celebration badge */}
              <div
                className="absolute -top-4 -left-4 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold rounded-full shadow-lg"
                style={{
                  transform: 'rotate(-6deg)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 0.5s ease-out 0.7s',
                  animation: 'celebrate 2s ease-in-out infinite',
                }}
              >
                1370+ Members 🎊
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

      {/* Animations */}
      <style jsx global>{`
        @keyframes rise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.2;
          }
        }
        @keyframes confetti {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(5deg);
          }
          75% {
            transform: translateY(5px) rotate(-5deg);
          }
        }
        @keyframes celebrate {
          0%, 100% {
            transform: rotate(-6deg) scale(1);
          }
          50% {
            transform: rotate(-4deg) scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}
