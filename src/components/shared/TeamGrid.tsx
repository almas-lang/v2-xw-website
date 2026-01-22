'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export interface TeamMember {
  name: string;
  role: string;
  experience?: string;
  companies?: string;
  focus?: string;
  linkedin: string;
  website?: string;
  initials?: string;
  color?: string; // For colored initials in light theme
}

export interface TeamGridProps {
  sectionLabel?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  primaryLabel: string;
  primaryMembers: TeamMember[];
  secondaryLabel: string;
  secondaryMembers: TeamMember[];
  footer?: React.ReactNode;
  theme?: 'light' | 'dark' | 'dark-teal';
  accentColor?: 'accent' | 'coral' | 'teal' | 'gold';
}

// Accent color mappings
const accentColors = {
  accent: {
    text: 'text-accent',
    bg: 'bg-accent',
    bgLight: 'bg-accent/20',
    hex: '#FF0023',
  },
  coral: {
    text: 'text-[#E85A4F]',
    bg: 'bg-[#E85A4F]',
    bgLight: 'bg-[#E85A4F]/20',
    hex: '#E85A4F',
  },
  teal: {
    text: 'text-[#4A90A4]',
    bg: 'bg-[#4A90A4]',
    bgLight: 'bg-[#4A90A4]/20',
    hex: '#4A90A4',
  },
  gold: {
    text: 'text-[#D4A853]',
    bg: 'bg-[#D4A853]',
    bgLight: 'bg-[#D4A853]/20',
    hex: '#D4A853',
  },
};

export default function TeamGrid({
  sectionLabel,
  title,
  subtitle,
  primaryLabel,
  primaryMembers,
  secondaryLabel,
  secondaryMembers,
  footer,
  theme = 'dark',
  accentColor = 'accent',
}: TeamGridProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const isDark = theme === 'dark' || theme === 'dark-teal';
  const isDarkTeal = theme === 'dark-teal';
  const colors = accentColors[accentColor];

  // Theme-specific background
  const getBgStyle = () => {
    if (isDarkTeal) {
      return {
        background: 'linear-gradient(180deg, #0a1420 0%, #0d1a28 50%, #0a1420 100%)',
      };
    }
    return {};
  };

  return (
    <section
      ref={sectionRef}
      className={`py-16 md:py-24 ${isDarkTeal ? '' : isDark ? 'bg-[#0A0A0A]' : 'bg-g50'}`}
      style={getBgStyle()}
    >
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div
          className="mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {sectionLabel && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: colors.hex }} />
              <span
                className="font-body text-[11px] uppercase tracking-[0.25em] font-medium"
                style={{ color: colors.hex }}
              >
                {sectionLabel}
              </span>
            </div>
          )}
          {subtitle && (
            <p className={`font-body text-sm mb-4 tracking-widest uppercase ${isDark ? 'text-g500' : 'text-g600'}`}>
              {subtitle}
            </p>
          )}
          {typeof title === 'string' ? (
            <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${isDark ? 'text-white' : 'text-carbon'}`}>
              {title}
            </h2>
          ) : (
            title
          )}
        </div>

        {/* Primary Label */}
        <div
          className="mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
          }}
        >
          <span
            className="font-body text-xs uppercase tracking-[0.2em] font-medium"
            style={{ color: colors.hex }}
          >
            {primaryLabel}
          </span>
          <div className={`w-full h-px mt-2 ${isDark ? 'bg-white/10' : 'bg-g200'}`} />
        </div>

        {/* Primary Members - Large editorial style */}
        <div className="space-y-6 md:space-y-8 mb-12 md:mb-16">
          {primaryMembers.map((member, index) => (
            <div
              key={member.name}
              className={`group grid md:grid-cols-12 gap-5 md:gap-6 items-center py-6 md:py-8 border-b ${isDark ? 'border-white/10' : 'border-g200'}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.15 + index * 0.1}s`,
              }}
            >
              {/* Photo/Initials */}
              <div className="md:col-span-3">
                {member.initials ? (
                  <div
                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center text-white font-heading text-4xl md:text-5xl font-bold shadow-lg group-hover:scale-105 transition-transform duration-300"
                    style={{
                      background: member.color
                        ? `linear-gradient(135deg, ${member.color} 0%, ${member.color}DD 100%)`
                        : `linear-gradient(135deg, ${colors.hex} 0%, ${colors.hex}DD 100%)`,
                    }}
                  >
                    {member.initials}
                  </div>
                ) : (
                  <div
                    className={`aspect-square max-w-[200px] rounded-lg group-hover:rounded-2xl transition-all duration-300 ${
                      isDark ? 'bg-gradient-to-br from-g600 to-g700' : 'bg-gradient-to-br from-g300 to-g400'
                    }`}
                  />
                )}
              </div>

              {/* Info */}
              <div className="md:col-span-6">
                {member.experience && (
                  <p className="font-heading text-sm mb-2" style={{ color: colors.hex }}>
                    {member.experience}+ Years Experience
                  </p>
                )}
                <h3 className={`font-heading text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-carbon'}`}>
                  {member.name}
                </h3>
                <p className={`font-body text-base md:text-lg mb-2 ${isDark ? 'text-g400' : 'text-g600'}`}>
                  {member.role}
                </p>
                {member.companies && (
                  <p className={`font-body text-sm ${isDark ? 'text-g500' : 'text-g500'}`}>{member.companies}</p>
                )}
              </div>

              {/* Focus & Links */}
              <div className="md:col-span-3 flex flex-col gap-3">
                {member.focus && (
                  <span
                    className={`text-sm px-4 py-2 rounded-full text-center ${
                      isDarkTeal ? 'bg-alice/10 text-alice' : isDark ? 'bg-white/10 text-white' : 'bg-alice text-carbon'
                    }`}
                  >
                    {member.focus}
                  </span>
                )}
                <div className="flex gap-3 justify-center">
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isDark
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-carbon text-white hover:bg-carbon/90'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </Link>
                  {member.website && (
                    <Link
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors"
                      style={{
                        borderColor: isDark ? 'rgba(255,255,255,0.2)' : colors.hex,
                        color: isDark ? 'white' : colors.hex,
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Website
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Label */}
        <div
          className="mb-6"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
          }}
        >
          <span
            className="font-body text-xs uppercase tracking-[0.2em] font-medium"
            style={{ color: colors.hex }}
          >
            {secondaryLabel}
          </span>
          <div className={`w-full h-px mt-2 ${isDark ? 'bg-white/10' : 'bg-g200'}`} />
        </div>

        {/* Secondary Members - Compact cards */}
        <div
          className={`grid gap-4 md:gap-5 mb-10 md:mb-12 ${
            secondaryMembers.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
          }`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.35s',
          }}
        >
          {secondaryMembers.map((member) => (
            <div
              key={member.name}
              className={`group p-5 rounded-xl border transition-all hover:shadow-md ${
                isDarkTeal
                  ? 'bg-alice/5 border-alice/10 hover:border-alice/20'
                  : isDark
                  ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  : 'bg-white border-g200 hover:border-g300'
              }`}
            >
              {/* Initials */}
              {member.initials ? (
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-heading text-lg font-bold mb-4 group-hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: `${colors.hex}20`,
                    color: colors.hex,
                  }}
                >
                  {member.initials}
                </div>
              ) : (
                <div
                  className={`w-12 h-12 rounded-xl mb-4 ${
                    isDark ? 'bg-gradient-to-br from-g600 to-g700' : 'bg-gradient-to-br from-g300 to-g400'
                  }`}
                />
              )}

              <h3 className={`font-heading text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-carbon'}`}>
                {member.name}
              </h3>
              <p className={`font-body text-sm mb-3 ${isDark ? 'text-g500' : 'text-g600'}`}>
                {member.role}
              </p>

              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 font-body text-sm transition-colors ${
                  isDark ? 'text-g400 hover:text-white' : 'text-g500 hover:text-carbon'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect →
              </Link>
            </div>
          ))}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </section>
  );
}
