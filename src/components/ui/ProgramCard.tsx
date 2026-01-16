'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

// ============================================
// PROGRAM ILLUSTRATIONS - Modern Abstract
// ============================================

// RIPPLE - Starting point, growth potential
// Single point expanding into possibilities
export const RippleIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="rippleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A90A4" />
        <stop offset="100%" stopColor="#2D5A6B" />
      </linearGradient>
    </defs>
    {/* Background circle */}
    <circle cx="60" cy="60" r="50" fill="#F0F7FA" />
    {/* Concentric arcs - growth rings */}
    <path d="M60 25 A35 35 0 0 1 95 60" fill="none" stroke="#4A90A4" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
    <path d="M60 32 A28 28 0 0 1 88 60" fill="none" stroke="#4A90A4" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
    <path d="M60 40 A20 20 0 0 1 80 60" fill="none" stroke="#4A90A4" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    {/* Center point - the beginning */}
    <circle cx="60" cy="60" r="8" fill="url(#rippleGrad)" />
    {/* Arrow pointing outward - direction */}
    <path d="M75 45 L85 35 M85 35 L78 38 M85 35 L82 42" stroke="#4A90A4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// CURRENT - Forward momentum, leveling up
// Dynamic forward movement
export const CurrentWaveIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="currentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4A90A4" />
        <stop offset="100%" stopColor="#2D5A6B" />
      </linearGradient>
    </defs>
    {/* Background */}
    <rect x="10" y="10" width="100" height="100" rx="12" fill="#F0F7FA" />
    {/* Stacked bars showing progression - each higher than the last */}
    <rect x="22" y="70" width="16" height="28" rx="3" fill="#4A90A4" opacity="0.3" />
    <rect x="44" y="55" width="16" height="43" rx="3" fill="#4A90A4" opacity="0.5" />
    <rect x="66" y="38" width="16" height="60" rx="3" fill="#4A90A4" opacity="0.7" />
    <rect x="88" y="22" width="16" height="76" rx="3" fill="url(#currentGrad)" />
    {/* Upward arrow on top */}
    <path d="M96 18 L96 8 M96 8 L91 13 M96 8 L101 13" stroke="#2D5A6B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// TIDE - Leadership, influence, rising above
// Elevated position with broader view
export const TideIllustration = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="tideGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#4A90A4" />
        <stop offset="100%" stopColor="#2D5A6B" />
      </linearGradient>
    </defs>
    {/* Background */}
    <circle cx="60" cy="60" r="50" fill="#F0F7FA" />
    {/* Mountain/peak shape - leadership summit */}
    <path d="M60 25 L90 85 L30 85 Z" fill="url(#tideGrad)" />
    {/* Flag at the top */}
    <line x1="60" y1="25" x2="60" y2="15" stroke="#2D5A6B" strokeWidth="2" strokeLinecap="round" />
    <path d="M60 15 L75 22 L60 29" fill="#FF0023" />
    {/* Smaller peaks behind - team/followers */}
    <path d="M30 85 L45 60 L60 85" fill="#4A90A4" opacity="0.3" />
    <path d="M60 85 L75 55 L90 85" fill="#4A90A4" opacity="0.3" />
    {/* Base line */}
    <line x1="20" y1="85" x2="100" y2="85" stroke="#4A90A4" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
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
