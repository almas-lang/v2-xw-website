'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ============================================
// PROGRAM ICONS - Bold, Geometric
// ============================================

const CurrentIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <path
      d="M8 36V20L24 8L40 20V36C40 38.2 38.2 40 36 40H12C9.8 40 8 38.2 8 36Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 40V28H30V40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="20" r="3" fill="currentColor" />
  </svg>
);

const RippleIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <circle cx="24" cy="24" r="4" fill="currentColor" />
    <circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
    <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <path d="M24 4V10M24 38V44M4 24H10M38 24H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const TideIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <path
      d="M6 38L16 24L24 32L34 18L42 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="42" cy="26" r="4" fill="currentColor" />
    <path d="M6 44H42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// ============================================
// PROGRAM DATA - SEO OPTIMIZED CONTENT
// ============================================

const currentFeatures = [
  'From executing designs to driving decisions',
  'Land senior/lead roles at better companies or get promoted internally',
  'Portfolio + interview prep that actually works (support until you achieve your goal)',
];

const programs = [
  {
    id: 'current',
    name: 'CURRENT',
    tagline: 'Reach Senior & Lead Roles',
    description: 'For mid-level designers with 2+ years experience who want senior and leadership roles at design mature companies',
    href: '/programs/senior-ux-designer-mentorship',
    icon: CurrentIcon,
    featured: true,
    badge: 'Most Popular',
    features: currentFeatures,
    aiFeature: 'Includes AI-first design approach',
  },
  {
    id: 'ripple',
    name: 'RIPPLE',
    tagline: 'Start your UX/UI Career',
    description: 'For fresh graduates or career switchers from any background',
    href: '/programs/career-transition-ux-mentorship',
    icon: RippleIcon,
  },
  {
    id: 'tide',
    name: 'TIDE',
    tagline: 'Move into Design Leadership',
    description: 'For the ones ready to lead/manage teams and drive influence',
    href: '/programs/ux-leadership-mentorship',
    icon: TideIcon,
  },
];

// ============================================
// COMPONENT
// ============================================

export default function Programs() {
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

  const featuredProgram = programs.find(p => p.featured);
  const otherPrograms = programs.filter(p => !p.featured);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)',
      }}
    >
      {/* Subtle diagonal lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            #18181B 40px,
            #18181B 41px
          )`,
        }}
      />

      {/* Content container - mobile first padding */}
      <div className="relative z-10 px-5 py-16 sm:py-20 md:py-24 lg:py-28 max-w-[1100px] mx-auto">
        {/* Header */}
        <div
          className="mb-10 sm:mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-accent" />
            <span className="font-body text-xs uppercase tracking-[0.2em] text-accent font-medium">Choose Your Path</span>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon leading-tight">
            Our Programs
          </h2>
        </div>

        {/* Featured Program - CURRENT */}
        {featuredProgram && (
          <div
            className="mb-5 sm:mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
            }}
          >
            <Link href={featuredProgram.href} className="group block">
              <div
                className="relative rounded-2xl overflow-hidden border border-g800 hover:border-g700 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #18181B 0%, #1f1f23 50%, #18181B 100%)',
                }}
              >
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 100% at 100% 0%, rgba(74,144,164,0.12) 0%, transparent 50%)',
                  }}
                />

                {/* Badge - mobile positioned */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-accent text-white text-[10px] sm:text-xs font-semibold rounded-full">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    {featuredProgram.badge}
                  </span>
                </div>

                {/* Content - mobile first layout */}
                <div className="relative z-10 p-5 sm:p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
                    {/* Icon + Name - stacked on mobile */}
                    <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-white/10 flex items-center justify-center text-alice flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                          <featuredProgram.icon />
                        </div>
                      </div>
                      <span className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-alice tracking-wide">
                        {featuredProgram.name}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="font-body text-sm sm:text-base md:text-lg text-g300 mb-5 sm:mb-6 leading-relaxed max-w-2xl">
                        {featuredProgram.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                        {featuredProgram.features?.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 sm:gap-3">
                            <span className="text-alice mt-0.5 flex-shrink-0 text-sm sm:text-base">→</span>
                            <span className="font-body text-xs sm:text-sm md:text-base text-g300">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* AI Badge + CTA - stack on mobile */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-g400 text-xs sm:text-sm">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                          </svg>
                          {featuredProgram.aiFeature}
                        </span>

                        <span className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-accent hover:bg-accent-hover text-white font-heading font-semibold text-xs sm:text-sm rounded-lg transition-all duration-300 group-hover:gap-3">
                          See Program Details
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Other Programs - RIPPLE & TIDE - Light alice theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {otherPrograms.map((program, index) => {
            const Icon = program.icon;
            return (
              <Link
                key={program.id}
                href={program.href}
                className="group block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.1}s`,
                }}
              >
                <div
                  className="relative h-full rounded-xl overflow-hidden border-2 border-alice-border/60 hover:border-accent/50 hover:shadow-lg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #DCEEFF 0%, #E8F4FF 50%, #DCEEFF 100%)',
                  }}
                >
                  {/* Subtle glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(255,0,35,0.06) 0%, transparent 50%)',
                    }}
                  />

                  {/* Content - mobile first */}
                  <div className="relative z-10 p-5 sm:p-6 md:p-8">
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Icon */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white border-2 border-alice-border/40 flex items-center justify-center text-carbon group-hover:border-accent/40 group-hover:text-accent transition-all duration-300 flex-shrink-0">
                        <div className="w-6 h-6 sm:w-8 sm:h-8">
                          <Icon />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Program name - BOLD and DARK */}
                        <span className="font-heading text-sm sm:text-base font-black text-carbon tracking-wider mb-1 block">
                          {program.name}
                        </span>
                        {/* Tagline */}
                        <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-carbon mb-2 group-hover:text-accent transition-colors">
                          {program.tagline}
                        </h3>
                        {/* Description */}
                        <p className="font-body text-xs sm:text-sm text-g600 leading-relaxed mb-4">
                          {program.description}
                        </p>
                        {/* CTA */}
                        <span className="inline-flex items-center gap-2 font-heading font-semibold text-xs sm:text-sm text-accent group-hover:gap-3 transition-all">
                          Learn More
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
