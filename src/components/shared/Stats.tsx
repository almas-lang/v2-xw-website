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
  theme?: 'default' | 'alice' | 'white' | 'alice-light' | 'horizontal-light';
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
  const isWhite = theme === 'white';
  const isAliceLight = theme === 'alice-light';
  const isHorizontalLight = theme === 'horizontal-light';
  const isLightTheme = isWhite || isAliceLight || isHorizontalLight;
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

  // Theme-based styles
  const getBackground = () => {
    if (isHorizontalLight) return 'linear-gradient(90deg, #F5F5F5 0%, #FFFFFF 30%, #FFFFFF 70%, #F5F5F5 100%)';
    if (isAliceLight) return 'linear-gradient(180deg, #e8f4ff 0%, #dceeff 50%, #d0e8f8 100%)';
    if (isWhite) return 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)';
    if (isAlice) return 'linear-gradient(180deg, #0d1a28 0%, #142432 100%)';
    return 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)';
  };

  const getGlowColor = () => {
    if (isHorizontalLight) return 'rgba(255, 0, 35, 0.06)';
    if (isAliceLight) return 'rgba(74, 144, 164, 0.15)';
    if (isWhite) return 'rgba(255, 0, 35, 0.08)';
    if (isAlice) return 'rgba(220, 238, 255, 0.15)';
    return 'rgba(255, 0, 35, 0.15)';
  };

  const getAccentColor = () => {
    if (isHorizontalLight) return 'text-accent';
    if (isAliceLight) return 'text-[#2a6a7c]';
    if (isWhite) return 'text-accent';
    if (isAlice) return 'text-alice';
    return 'text-accent';
  };

  const getValueColor = () => {
    if (isHorizontalLight) return 'text-carbon';
    if (isAliceLight) return 'text-[#0d1a28]';
    if (isWhite) return 'text-carbon';
    return 'text-white';
  };

  const getLabelColor = () => {
    if (isHorizontalLight) return 'text-g600';
    if (isAliceLight) return 'text-[#4A90A4]';
    if (isWhite) return 'text-g500';
    return 'text-g400';
  };

  const getDividerGradient = () => {
    if (isHorizontalLight) return 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.08) 50%, transparent 100%)';
    if (isAliceLight) return 'linear-gradient(180deg, transparent 0%, rgba(74,144,164,0.3) 50%, transparent 100%)';
    if (isWhite) return 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)';
    return 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)';
  };

  const getBottomLineGradient = () => {
    if (isHorizontalLight) return 'linear-gradient(90deg, transparent 0%, #FF0023 50%, transparent 100%)';
    if (isAliceLight) return 'linear-gradient(90deg, transparent 0%, #4A90A4 50%, transparent 100%)';
    if (isWhite) return 'linear-gradient(90deg, transparent 0%, #FF0023 50%, transparent 100%)';
    if (isAlice) return 'linear-gradient(90deg, transparent 0%, #4A90A4 50%, transparent 100%)';
    return 'linear-gradient(90deg, transparent 0%, #FF0023 50%, transparent 100%)';
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: getBackground() }}
      aria-label="Our impact in numbers"
    >
      {/* Noise texture - lighter for white theme */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isLightTheme ? 0.03 : 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0" style={{ opacity: isLightTheme ? 0.04 : 0.02 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="statsGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={isAliceLight ? '#4A90A4' : (isLightTheme ? '#000000' : '#ffffff')} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#statsGrid)" />
        </svg>
      </div>

      {/* Decorative dots pattern for light themes */}
      {isLightTheme && (
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: isAliceLight
              ? 'radial-gradient(circle at 1px 1px, #4A90A4 1px, transparent 0)'
              : 'radial-gradient(circle at 1px 1px, #d0d0d0 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      )}

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] blur-3xl pointer-events-none"
        style={{
          background: getGlowColor(),
          opacity: isLightTheme ? 0.8 : (isAlice ? 0.5 : 0.4)
        }}
      />

      {/* Side accent glows for light themes */}
      {(isWhite || isHorizontalLight) && (
        <>
          <div
            className="absolute top-0 left-0 w-[400px] h-[300px] blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(220,238,255,0.4) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[300px] blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(255,0,35,0.08) 0%, transparent 70%)' }}
          />
        </>
      )}

      {/* Side accent glows for alice-light theme */}
      {isAliceLight && (
        <>
          <div
            className="absolute top-0 left-0 w-[500px] h-[300px] blur-[120px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(74,144,164,0.2) 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[300px] blur-[120px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(13,26,40,0.1) 0%, transparent 70%)' }}
          />
        </>
      )}

      <div className="relative mx-auto px-5 py-8 md:py-10" style={{ maxWidth }}>
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative text-center px-6 md:px-10 lg:px-14 transition-all duration-700"
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
                  style={{ background: getDividerGradient() }}
                />
              )}

              <div className="mb-2">
                <span className={`font-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-tight ${getValueColor()}`}>
                  {stat.value}
                </span>
                <span className={`font-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-tight ${getAccentColor()}`}>
                  {stat.suffix}
                </span>
              </div>
              <span className={`font-body text-sm md:text-base tracking-wide uppercase ${getLabelColor()}`}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: getBottomLineGradient() }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: getBottomLineGradient() }}
      />
    </section>
  );
}
