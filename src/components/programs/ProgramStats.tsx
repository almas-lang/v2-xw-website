'use client';

import { useEffect, useRef, useState } from 'react';

interface ProgramStatsProps {
  stats: {
    value: string;
    label: string;
  }[];
  accentColor: 'coral' | 'teal' | 'gold';
}

const colorMap = {
  coral: {
    primary: '#E85A4F',
    gradient: 'linear-gradient(135deg, #E85A4F 0%, #FF6B5B 100%)',
    glow: 'rgba(232, 90, 79, 0.25)',
  },
  teal: {
    primary: '#4A90A4',
    gradient: 'linear-gradient(135deg, #4A90A4 0%, #5BA8BE 100%)',
    glow: 'rgba(74, 144, 164, 0.25)',
  },
  gold: {
    primary: '#D4A853',
    gradient: 'linear-gradient(135deg, #D4A853 0%, #E8C068 100%)',
    glow: 'rgba(212, 168, 83, 0.25)',
  },
};

export default function ProgramStats({ stats, accentColor }: ProgramStatsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const colors = colorMap[accentColor];

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
    <div
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)',
      }}
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
        style={{ background: colors.glow, opacity: 0.3 }}
      />

      <div className="relative max-w-[1100px] mx-auto px-5 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative text-center px-8 md:px-12 lg:px-16 transition-all duration-700"
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
                <span
                  className="font-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
                  style={{ color: colors.primary }}
                >
                  {stat.value}
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
        style={{ background: colors.gradient }}
      />
    </div>
  );
}
