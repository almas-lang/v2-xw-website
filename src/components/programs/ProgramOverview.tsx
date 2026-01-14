'use client';

import { useEffect, useRef, useState } from 'react';

interface ProgramOverviewProps {
  title?: string;
  subtitle?: string;
  targetRoles: {
    title: string;
    items: string[];
  };
  salaryGoal: {
    title: string;
    value: string;
  };
  timeline: {
    title: string;
    value: string;
  };
  abilities: string[];
  accentColor: 'coral' | 'teal' | 'gold';
}

const colorMap = {
  coral: {
    primary: '#E85A4F',
    light: 'rgba(232, 90, 79, 0.15)',
    border: 'rgba(232, 90, 79, 0.3)',
  },
  teal: {
    primary: '#4A90A4',
    light: 'rgba(74, 144, 164, 0.15)',
    border: 'rgba(74, 144, 164, 0.3)',
  },
  gold: {
    primary: '#D4A853',
    light: 'rgba(212, 168, 83, 0.15)',
    border: 'rgba(212, 168, 83, 0.3)',
  },
};

export default function ProgramOverview({
  title = "What You'll Achieve",
  subtitle = "This isn't about learning more. It's about becoming employable",
  targetRoles,
  salaryGoal,
  timeline,
  abilities,
  accentColor,
}: ProgramOverviewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const colors = colorMap[accentColor];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="py-12 md:py-16 lg:py-20 scroll-mt-20 relative overflow-hidden"
      style={{ background: '#1A1A1A' }}
    >
      {/* Grid lines for texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] w-full"
            style={{
              top: `${i * 8}%`,
              background: 'linear-gradient(90deg, transparent 0%, #fff 50%, transparent 100%)'
            }}
          />
        ))}
      </div>

      {/* Accent glow */}
      <div
        className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: colors.primary }}
      />

      <div className="relative max-w-[1100px] mx-auto px-5">
        {/* Section Header */}
        <div
          className="text-center mb-10 md:mb-14 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            {title}
          </h2>
          <p className="font-body text-base md:text-lg text-neutral-400 max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Stats Row - Horizontal layout */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '150ms',
          }}
        >
          {/* Target Roles */}
          <div
            className="relative p-6 md:p-8 md:rounded-l-2xl md:rounded-r-none rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #252525 0%, #1F1F1F 100%)',
              borderRight: 'none',
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1 md:h-auto md:w-1 md:top-4 md:bottom-4 md:left-0 rounded-full"
              style={{ background: colors.primary }}
            />
            <h3 className="font-heading text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
              {targetRoles.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {targetRoles.items.map((role, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm font-body text-white rounded-full"
                  style={{ background: colors.light, border: `1px solid ${colors.border}` }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Salary Goal */}
          <div
            className="relative p-6 md:p-8 rounded-2xl md:rounded-none"
            style={{
              background: 'linear-gradient(135deg, #252525 0%, #1F1F1F 100%)',
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1 md:h-auto md:w-1 md:top-4 md:bottom-4 md:left-0 rounded-full"
              style={{ background: colors.primary }}
            />
            <h3 className="font-heading text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
              {salaryGoal.title}
            </h3>
            <p className="font-body text-base text-white leading-relaxed">
              {salaryGoal.value}
            </p>
          </div>

          {/* Timeline */}
          <div
            className="relative p-6 md:p-8 md:rounded-r-2xl md:rounded-l-none rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, #252525 0%, #1F1F1F 100%)',
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-1 md:h-auto md:w-1 md:top-4 md:bottom-4 md:left-0 rounded-full"
              style={{ background: colors.primary }}
            />
            <h3 className="font-heading text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
              {timeline.title}
            </h3>
            <p className="font-body text-base text-white leading-relaxed">
              {timeline.value}
            </p>
          </div>
        </div>

        {/* You'll Be Able To Section */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '300ms',
          }}
        >
          <h3 className="font-heading text-lg md:text-xl font-bold text-white text-center mb-8">
            You&apos;ll Be Able To
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {abilities.map((ability, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                  transitionDelay: `${400 + index * 60}ms`,
                }}
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: colors.primary }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="font-body text-sm md:text-base text-neutral-300 leading-relaxed">
                  {ability}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
