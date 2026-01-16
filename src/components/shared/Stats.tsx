'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: string;
  suffix: string;
  label: string;
}

interface StatsProps {
  stats?: Stat[];
  maxWidth?: string;
  theme?: 'default' | 'alice';
}

const defaultStats: Stat[] = [
  {
    value: '3000',
    suffix: '+',
    label: 'designers consulted',
  },
  {
    value: '140',
    suffix: '+',
    label: 'mentored 1:1',
  },
  {
    value: '80',
    suffix: '%',
    label: 'achieved their goals',
  },
];

export default function Stats({ stats = defaultStats, maxWidth = '1100px', theme = 'default' }: StatsProps) {
  const isAlice = theme === 'alice';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: isAlice
          ? 'linear-gradient(180deg, #0d1a28 0%, #142432 100%)'
          : 'linear-gradient(180deg, #1A1A1A 0%, #242424 100%)',
      }}
      aria-label="Our impact in numbers"
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="statsGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#statsGrid)" />
        </svg>
      </div>

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] blur-3xl pointer-events-none"
        style={{
          background: isAlice ? 'rgba(220, 238, 255, 0.15)' : 'rgba(255, 0, 35, 0.15)',
          opacity: isAlice ? 0.5 : 0.4
        }}
      />

      <div className="relative mx-auto px-5 py-10 md:py-14" style={{ maxWidth }}>
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative text-center px-6 md:px-8 lg:px-10 transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                transitionDelay: `${index * 120}ms`,
              }}
            >
              {/* Divider line between stats (not after last) */}
              {index < stats.length - 1 && (
                <div
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                  }}
                />
              )}

              <div className="mb-2">
                <span className="font-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white">
                  {stat.value}
                </span>
                <span className={`font-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-tight ${isAlice ? 'text-alice' : 'text-accent'}`}>
                  {stat.suffix}
                </span>
              </div>
              <span className="font-body text-sm md:text-base text-g400 tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{
          background: isAlice
            ? 'linear-gradient(90deg, transparent 0%, #4A90A4 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, #FF0023 50%, transparent 100%)'
        }}
      />
    </section>
  );
}
