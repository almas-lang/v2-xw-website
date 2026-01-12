'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

// ============================================
// WATER-THEMED ILLUSTRATIONS
// ============================================

export const RippleIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="rippleGradUI" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DCEEFF" />
        <stop offset="100%" stopColor="#a8d4f5" />
      </linearGradient>
    </defs>
    {/* Center drop point */}
    <circle cx="60" cy="60" r="6" fill="url(#rippleGradUI)" />
    {/* Ripple circles - expanding outward */}
    <circle cx="60" cy="60" r="18" fill="none" stroke="#DCEEFF" strokeWidth="2" opacity="0.8" />
    <circle cx="60" cy="60" r="32" fill="none" stroke="#DCEEFF" strokeWidth="1.5" opacity="0.6" />
    <circle cx="60" cy="60" r="46" fill="none" stroke="#DCEEFF" strokeWidth="1" opacity="0.4" />
    <circle cx="60" cy="60" r="58" fill="none" stroke="#DCEEFF" strokeWidth="0.5" opacity="0.2" />
    {/* Small splash particles */}
    <circle cx="60" cy="48" r="2" fill="#DCEEFF" opacity="0.7" />
    <circle cx="72" cy="55" r="1.5" fill="#DCEEFF" opacity="0.5" />
    <circle cx="48" cy="58" r="1.5" fill="#DCEEFF" opacity="0.5" />
  </svg>
);

export const CurrentWaveIllustration = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="currentGradUI" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DCEEFF" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#c5e4ff" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#a8d4f5" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="currentGrad2UI" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#DCEEFF" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#f0f8ff" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <path d="M-20,100 Q30,60 80,100 T180,100 T280,100" fill="none" stroke="url(#currentGradUI)" strokeWidth="3" />
    <path d="M-20,120 Q30,80 80,120 T180,120 T280,120" fill="none" stroke="url(#currentGradUI)" strokeWidth="2.5" strokeOpacity="0.8" />
    <path d="M-20,140 Q30,100 80,140 T180,140 T280,140" fill="none" stroke="url(#currentGradUI)" strokeWidth="2" strokeOpacity="0.6" />
    <path d="M0,180 Q50,130 100,150 T200,140 L200,200 L0,200 Z" fill="url(#currentGrad2UI)" />
    <circle cx="40" cy="90" r="3" fill="#DCEEFF" opacity="0.8" />
    <circle cx="100" cy="110" r="2" fill="#DCEEFF" opacity="0.6" />
    <circle cx="160" cy="95" r="2.5" fill="#DCEEFF" opacity="0.7" />
    <circle cx="70" cy="130" r="1.5" fill="#DCEEFF" opacity="0.5" />
  </svg>
);

export const TideIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="tideGradUI" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#DCEEFF" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#c5e4ff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#f0f8ff" stopOpacity="0.2" />
      </linearGradient>
      <linearGradient id="tideWaveGradUI" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a8d4f5" />
        <stop offset="50%" stopColor="#DCEEFF" />
        <stop offset="100%" stopColor="#a8d4f5" />
      </linearGradient>
    </defs>
    {/* Rising tide base */}
    <path d="M0,120 L0,70 Q30,60 60,70 T120,65 L120,120 Z" fill="url(#tideGradUI)" />
    {/* Wave crests */}
    <path d="M0,75 Q15,65 30,72 T60,68 T90,72 T120,68" fill="none" stroke="url(#tideWaveGradUI)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M0,85 Q15,78 30,82 T60,78 T90,82 T120,78" fill="none" stroke="#DCEEFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    {/* Rising arrow indicator */}
    <path d="M60,50 L60,25" stroke="#DCEEFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    <path d="M52,33 L60,25 L68,33" fill="none" stroke="#DCEEFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    {/* Spray particles */}
    <circle cx="30" cy="58" r="2" fill="#DCEEFF" opacity="0.6" />
    <circle cx="90" cy="55" r="1.5" fill="#DCEEFF" opacity="0.5" />
    <circle cx="60" cy="52" r="2.5" fill="#DCEEFF" opacity="0.7" />
  </svg>
);

// ============================================
// TYPES
// ============================================

export interface ProgramDetail {
  label: string;
  value: string;
}

export interface ProgramCardProps {
  id: string;
  name: string;
  title: string;
  description?: string;
  illustration: 'ripple' | 'current' | 'tide';
  details: ProgramDetail[];
  features?: string[];
  href: string;
  variant?: 'light' | 'dark';
  isPopular?: boolean;
  animationDelay?: number;
}

// ============================================
// ILLUSTRATION MAP
// ============================================

const illustrationMap = {
  ripple: RippleIllustration,
  current: CurrentWaveIllustration,
  tide: TideIllustration,
};

// ============================================
// PROGRAM CARD COMPONENT
// ============================================

export default function ProgramCard({
  name,
  title,
  description,
  illustration,
  details,
  features,
  href,
  variant = 'light',
  isPopular = false,
  animationDelay = 0,
}: ProgramCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const Illustration = illustrationMap[illustration];

  const isDark = variant === 'dark';

  return (
    <div
      ref={cardRef}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      <div
        className={`relative overflow-hidden border transition-all duration-300 hover:shadow-2xl group ${
          isDark
            ? 'bg-gradient-to-br from-carbon via-[#1a1a1a] to-[#2a2a2a] border-g700 hover:border-g600'
            : 'bg-white border-g200 hover:border-g300'
        }`}
        style={{ borderRadius: '6px' }}
      >
        {/* Background wave pattern for dark variant */}
        {isDark && (
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute right-0 top-0 w-2/3 h-full">
              <CurrentWaveIllustration />
            </div>
          </div>
        )}

        {/* Popular Badge */}
        {isPopular && (
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-block px-3 py-1.5 bg-g700 text-g300 text-xs font-semibold rounded-full">
              Most Popular
            </span>
          </div>
        )}

        <div className={`relative z-10 flex flex-col ${isDark ? 'lg:flex-row' : 'md:flex-row'}`}>
          {/* Illustration Side */}
          <div
            className={`relative flex-shrink-0 flex flex-col items-center justify-center ${
              isDark
                ? 'w-full lg:w-auto py-8 lg:py-12 lg:px-10'
                : 'w-full md:w-56 lg:w-64 py-10 md:py-12 bg-gradient-to-br from-g50 to-white'
            }`}
          >
            {/* Illustration Container */}
            <div
              className={`rounded-2xl shadow-xl flex items-center justify-center overflow-hidden
                          group-hover:scale-105 transition-transform duration-500 bg-white ${
                            isDark ? 'w-32 h-32 md:w-40 md:h-40' : 'w-32 h-32 md:w-36 md:h-36 border border-g100'
                          }`}
            >
              <div className="w-full h-full p-4">
                <Illustration />
              </div>
            </div>
            {/* Program Name */}
            <span
              className={`font-heading text-xl md:text-2xl font-bold tracking-wider mt-4 ${
                isDark ? 'text-alice' : 'text-carbon'
              }`}
            >
              {name}
            </span>
          </div>

          {/* Content Side */}
          <div className={`flex-1 ${isDark ? 'p-6 md:p-8 lg:p-10 lg:pl-4' : 'p-6 md:p-8 lg:p-10'}`}>
            {/* Title */}
            <h3
              className={`font-heading text-xl md:text-2xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-carbon'
              }`}
            >
              {title}
            </h3>

            {/* Description for dark variant */}
            {isDark && description && (
              <p className="font-body text-base md:text-lg text-g300 mb-6 leading-relaxed max-w-2xl">
                {description}
              </p>
            )}

            {/* Features list for dark variant */}
            {isDark && features && features.length > 0 && (
              <ul className="space-y-3 mb-6">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-alice mt-0.5">→</span>
                    <span className="font-body text-sm md:text-base text-g300">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Details Grid */}
            <div className={`space-y-3 ${isDark ? 'mb-6' : 'mb-8'}`}>
              {details.map((detail, i) => (
                <div key={i} className="flex gap-4">
                  <span
                    className={`font-body text-sm w-24 flex-shrink-0 ${
                      isDark ? 'text-g400' : 'text-g500'
                    }`}
                  >
                    {detail.label}:
                  </span>
                  <span
                    className={`font-body text-sm ${isDark ? 'text-g300' : 'text-g600'}`}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button href={href} size={isDark ? 'md' : 'sm'} showArrow>
              See Program Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
