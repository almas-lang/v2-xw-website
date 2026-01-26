'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

// Seeded random for consistent SSR/client values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

// Confetti particles with deterministic values (rounded to avoid hydration mismatch)
const confettiParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.round(seededRandom(i * 1.1) * 100)}%`,
  size: Math.round(seededRandom(i * 2.2) * 6 + 3),
  duration: Math.round(seededRandom(i * 3.3) * 8 + 12),
  delay: Math.round(seededRandom(i * 4.4) * 5 * 10) / 10,
  color: ['#6366f1', '#8b5cf6', '#a78bfa', '#818cf8'][Math.floor(seededRandom(i * 5.5) * 4)],
  type: seededRandom(i * 6.6) > 0.5 ? 'circle' : 'square',
}));

export default function SaveYourSpot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      className="relative bg-[#0A0A0A] overflow-hidden"
    >
      {/* Dramatic center glow - responsive sizing */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] md:w-[600px] h-[50vw] md:h-[400px] max-w-[600px] max-h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.5})`,
          transition: 'all 1s ease-out',
          animation: isVisible ? 'breatheGlow 4s ease-in-out infinite' : 'none',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] md:w-[400px] h-[40vw] md:h-[300px] max-w-[400px] max-h-[300px] rounded-full pointer-events-none hidden sm:block"
        style={{
          background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: isVisible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.5})`,
          transition: 'all 1s ease-out 0.2s',
          animation: isVisible ? 'breatheGlow 5s ease-in-out infinite reverse' : 'none',
        }}
      />

      {/* Confetti particles - reduced on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confettiParticles.map((particle) => (
          <div
            key={particle.id}
            className={`${particle.type === 'circle' ? 'rounded-full' : 'rotate-45'} ${particle.id >= 10 ? 'hidden sm:block' : ''}`}
            style={{
              position: 'absolute',
              left: particle.left,
              bottom: '-20px',
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: isVisible ? 0.6 : 0,
              animation: `confettiRise ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              transition: 'opacity 1s ease-out',
            }}
          />
        ))}
      </div>

      {/* Geometric patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-1/4 -left-4 w-32 h-32 opacity-[0.05] hidden lg:block" viewBox="0 0 100 100">
          <path d="M 10 20 L 30 40 L 10 60 L 30 80" fill="none" stroke="white" strokeWidth="1.5" />
          <path d="M 30 20 L 50 40 L 30 60 L 50 80" fill="none" stroke="white" strokeWidth="1.5" />
        </svg>

        <svg className="absolute bottom-1/4 right-[6%] w-24 h-24 opacity-[0.06] hidden lg:block" viewBox="0 0 100 100">
          <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="white" strokeWidth="0.8">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="25s" repeatCount="indefinite" />
          </polygon>
        </svg>

        <div className="absolute top-1/3 right-[3%] w-3 h-3 rotate-45 border border-white/10 hidden lg:block" />
        <div className="absolute bottom-1/4 left-[4%] w-2 h-2 rotate-45 bg-indigo-500/15 hidden md:block" />
      </div>

      {/* Decorative rings */}
      <div
        className="absolute top-1/2 left-[5%] -translate-y-1/2 w-40 h-40 rounded-full border border-white/5 hidden lg:block"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(-50%) scale(1) rotate(0deg)' : 'translateY(-50%) scale(0.5) rotate(-20deg)',
          transition: 'all 1s ease-out 0.2s',
        }}
      />
      <div
        className="absolute top-1/2 right-[5%] -translate-y-1/2 w-24 h-24 rounded-full border border-indigo-500/10 hidden lg:block"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(-50%) scale(1) rotate(0deg)' : 'translateY(-50%) scale(0.5) rotate(20deg)',
          transition: 'all 1s ease-out 0.3s',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-14 md:py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto">
          {/* Headline */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s ease-out',
            }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Save Your Spot
            </h2>
          </div>

          {/* Event details as pills */}
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.1s',
            }}
          >
            {['Sunday, Feb 15, 2025', '11 AM onwards', 'Bangalore', 'Free'].map((item, index) => (
              <span
                key={item}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                  index === 3
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'bg-white/[0.06] text-white/70 border border-white/10 hover:border-white/20 hover:bg-white/[0.1]'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Urgency seats indicator */}
          <div
            className="flex justify-center mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.6s ease-out 0.2s',
            }}
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
                <span className="text-white/60 text-sm">Limited to 108 seats</span>
              </div>
              <span className="w-px h-4 bg-white/10" />
              <span className="text-amber-400 text-sm font-bold animate-pulse">12 remaining!</span>
            </div>
          </div>

          {/* CTA with dramatic glow */}
          <div
            className="relative inline-block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.6s ease-out 0.3s',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Button glow effect */}
            <div
              className="absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                filter: 'blur(20px)',
                opacity: isHovered ? 0.6 : 0.3,
                transform: `scale(${isHovered ? 1.1 : 1})`,
              }}
            />
            <Button href="/community/register" variant="indigo" size="lg" showArrow>
              Register Now
            </Button>
          </div>

          {/* Trust indicator */}
          <div
            className="mt-6 flex justify-center items-center gap-2 text-white/40 text-sm"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.5s ease-out 0.5s',
            }}
          >
            <span className="w-1 h-1 rounded-full bg-green-500" />
            <span>Join 1370+ community members</span>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />

      {/* Animations */}
      <style jsx global>{`
        @keyframes breatheGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
        @keyframes confettiRise {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-400px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
