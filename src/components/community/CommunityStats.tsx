'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 1370, suffix: '+', label: 'Members' },
  { value: 3, suffix: '', label: 'Editions' },
  { value: 12, suffix: '+', label: 'Speakers' },
  { value: null, display: 'Bangalore', label: 'Based in' },
];

// Seeded random for consistent SSR/client values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

// Floating particles with deterministic values (rounded to avoid hydration mismatch)
const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${Math.round(seededRandom(i * 1.1) * 100)}%`,
  size: Math.round(seededRandom(i * 2.2) * 3 + 1),
  duration: Math.round(seededRandom(i * 3.3) * 8 + 10),
  delay: Math.round(seededRandom(i * 4.4) * 5),
  opacity: Math.round(seededRandom(i * 5.5) * 30 + 10) / 100,
}));

export default function CommunityStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animated counting effect
  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts(
        stats.map((stat) =>
          stat.value !== null ? Math.round(stat.value * easeOut) : 0
        )
      );

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      className="relative bg-[#110b1f] overflow-hidden"
    >
      {/* Floating particles - reduced on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full bg-indigo-400 ${particle.id >= 8 ? 'hidden sm:block' : ''}`}
            style={{
              left: particle.left,
              bottom: '-10px',
              width: particle.size,
              height: particle.size,
              opacity: isVisible ? particle.opacity : 0,
              animation: `riseStats ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              transition: 'opacity 1s ease-out',
            }}
          />
        ))}
      </div>

      {/* Pulsing glow orbs behind stats - simplified on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-[12%] -translate-y-1/2 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-indigo-500 blur-[40px] sm:blur-[60px]"
          style={{
            opacity: isVisible ? 0.15 : 0,
            animation: 'pulseGlow 3s ease-in-out infinite',
            transition: 'opacity 0.5s ease-out',
          }}
        />
        <div
          className="absolute top-1/2 left-[37%] -translate-y-1/2 w-16 sm:w-28 h-16 sm:h-28 rounded-full bg-violet-500 blur-[35px] sm:blur-[50px] hidden sm:block"
          style={{
            opacity: isVisible ? 0.12 : 0,
            animation: 'pulseGlow 3.5s ease-in-out infinite 0.5s',
            transition: 'opacity 0.5s ease-out 0.1s',
          }}
        />
        <div
          className="absolute top-1/2 left-[62%] -translate-y-1/2 w-16 sm:w-28 h-16 sm:h-28 rounded-full bg-indigo-400 blur-[35px] sm:blur-[50px] hidden sm:block"
          style={{
            opacity: isVisible ? 0.12 : 0,
            animation: 'pulseGlow 4s ease-in-out infinite 1s',
            transition: 'opacity 0.5s ease-out 0.2s',
          }}
        />
        <div
          className="absolute top-1/2 left-[87%] -translate-y-1/2 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-violet-400 blur-[40px] sm:blur-[60px]"
          style={{
            opacity: isVisible ? 0.15 : 0,
            animation: 'pulseGlow 3s ease-in-out infinite 1.5s',
            transition: 'opacity 0.5s ease-out 0.3s',
          }}
        />
      </div>

      {/* Geometric patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="absolute top-4 left-[10%] w-2 h-2 border border-white/[0.08] rotate-45 hidden md:block" />
        <div className="absolute bottom-4 right-[12%] w-2 h-2 border border-indigo-500/20 rotate-45 hidden md:block" />
        <div className="absolute top-1/2 left-[5%] w-1.5 h-1.5 bg-white/[0.06] rotate-45 hidden lg:block" />
        <div className="absolute top-1/2 right-[6%] w-1.5 h-1.5 bg-indigo-500/20 rounded-full hidden lg:block" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative text-center group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                transition: `all 0.5s ease-out ${index * 0.1}s`,
              }}
            >
              <div className="mb-1 relative">
                <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-400 tracking-tight transition-all duration-300 group-hover:text-indigo-300 group-hover:scale-105 inline-block">
                  {stat.value !== null ? (
                    <>
                      {counts[index]}
                      {stat.suffix}
                    </>
                  ) : (
                    stat.display
                  )}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-white/50 uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes riseStats {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-120px);
            opacity: 0;
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            transform: translateY(-50%) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-50%) scale(1.2);
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
}
