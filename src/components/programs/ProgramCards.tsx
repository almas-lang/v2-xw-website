'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ============================================
// PROGRAM ICONS - Icon Set 10: Orbit, Hexagon, Trident
// ============================================

const RippleIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <ellipse cx="24" cy="24" rx="18" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(-30 24 24)" opacity="0.4" />
    <ellipse cx="24" cy="24" rx="18" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(30 24 24)" opacity="0.4" />
    <ellipse cx="24" cy="24" rx="18" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(90 24 24)" opacity="0.4" />
    <circle cx="24" cy="24" r="5" fill="currentColor" />
  </svg>
);

const CurrentIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <path d="M24 4L40 14V34L24 44L8 34V14L24 4Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M24 12L32 18V30L24 36L16 30V18L24 12Z" fill="currentColor" opacity="0.2" />
    <circle cx="24" cy="24" r="4" fill="currentColor" />
  </svg>
);

const TideIcon = () => (
  <svg viewBox="0 0 48 48" className="w-full h-full">
    <path d="M24 44V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 16L24 8L20 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 16L24 8L28 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 16L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M24 16L28 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <path d="M16 44H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// ============================================
// PROGRAM DATA
// ============================================

const programs = [
  {
    id: 'current',
    name: 'CURRENT',
    tagline: 'Senior & Lead Roles',
    description: 'For mid-level designers with 2+ years experience who want senior and leadership roles at design mature companies',
    href: '/programs/senior-ux-designer-mentorship',
    icon: CurrentIcon,
    featured: true,
    badge: 'Most Popular',
    features: [
      'From executing designs to driving decisions',
      'Land senior/lead roles at better companies or get promoted internally',
      'Portfolio + interview prep that actually works (support until you achieve your goal)',
    ],
    tag: 'Includes AI-first design approach',
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
// COMPONENT - Option B: Featured Hero + Side Cards
// ============================================

export default function ProgramCards() {
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
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium">Choose Your Path</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-carbon mb-10">Our Programs</h2>
        </div>

        {/* Featured Card - Full Width */}
        {featuredProgram && (
          <div
            className="mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
            }}
          >
            <Link href={featuredProgram.href} className="group block">
              <div className="bg-carbon rounded-2xl p-8 md:p-10 relative overflow-hidden">
                {/* Badge */}
                <span className="absolute top-6 right-6 md:top-8 md:right-8 inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-bold rounded-full">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  {featuredProgram.badge}
                </span>

                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left - Icon & Name */}
                  <div className="flex-shrink-0 text-center md:text-left">
                    <div className="w-20 h-20 rounded-xl bg-g700 text-white flex items-center justify-center mx-auto md:mx-0 mb-4">
                      <div className="w-10 h-10">
                        <featuredProgram.icon />
                      </div>
                    </div>
                    <span className="text-white font-bold tracking-wider text-lg">{featuredProgram.name}</span>
                  </div>

                  {/* Right - Content */}
                  <div className="flex-1 pr-0 md:pr-32">
                    <p className="text-white/80 text-lg mb-6">{featuredProgram.description}</p>

                    {featuredProgram.features && (
                      <ul className="space-y-3 mb-8">
                        {featuredProgram.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-white/70">
                            <span className="text-g500 mt-0.5">→</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap items-center gap-4">
                      {featuredProgram.tag && (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-g700 text-white/70 text-sm rounded-lg">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {featuredProgram.tag}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl group-hover:gap-3 transition-all">
                        See Program Details
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Other Programs - Side by Side */}
        <div className="grid md:grid-cols-2 gap-6">
          {otherPrograms.map((program, index) => {
            const Icon = program.icon;
            return (
              <Link
                key={program.id}
                href={program.href}
                className="group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.1}s`,
                }}
              >
                <div className="h-full bg-alice/50 rounded-2xl p-6 md:p-8 border border-alice hover:border-accent/30 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-white text-carbon flex items-center justify-center flex-shrink-0">
                      <div className="w-7 h-7">
                        <Icon />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold tracking-wider text-g500">{program.name}</span>
                      <h3 className="text-xl font-bold text-carbon">{program.tagline}</h3>
                    </div>
                  </div>
                  <p className="text-g600 mb-4">{program.description}</p>
                  <span className="text-accent font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
