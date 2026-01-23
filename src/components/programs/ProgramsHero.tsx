'use client';

/**
 * Programs Hero - Alice Blue Theme
 * - Dark background with strong alice blue tint
 * - Alice blue dominant gradients
 * - Flowing wave pattern
 * - Cool, professional, tech-forward feel
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

// ============================================
// DATA - SEO OPTIMIZED CONTENT
// ============================================

const stats = [
  { value: '3000', suffix: '+', label: 'designers consulted' },
  { value: '140', suffix: '+', label: 'mentored' },
  { value: '80', suffix: '%', label: 'achieved their goals' },
];

// ============================================
// COMPONENT
// ============================================

export default function ProgramsHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToFinder = () => {
    document.getElementById('program-finder')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden">
      {/* Hero Section - ALICE BLUE THEME */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(180deg, #0a1420 0%, #0d1a28 50%, #0a1420 100%)',
        }}
      >
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Alice blue gradient orbs - dominant */}
        <div
          className="absolute top-0 left-0 w-[700px] h-[700px] blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(220,238,255,0.15) 0%, transparent 60%)' }}
        />
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] blur-[150px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(74,144,164,0.12) 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(220,238,255,0.08) 0%, transparent 60%)' }}
        />

        {/* Flowing wave pattern */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-[0.06]"
          viewBox="0 0 600 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 200 C150 100, 300 300, 450 200 S600 100, 750 200"
            stroke="#DCEEFF"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0 220 C150 120, 300 320, 450 220 S600 120, 750 220"
            stroke="#DCEEFF"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M0 240 C150 140, 300 340, 450 240 S600 140, 750 240"
            stroke="#DCEEFF"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M0 180 C150 80, 300 280, 450 180 S600 80, 750 180"
            stroke="#4A90A4"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M0 160 C150 60, 300 260, 450 160 S600 60, 750 160"
            stroke="#4A90A4"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </svg>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroGridBlue" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#DCEEFF" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroGridBlue)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 pt-24 md:pt-28 pb-14 sm:pb-18 md:pb-20">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm mb-8 sm:mb-10"
            aria-label="Breadcrumb"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Link href="/" className="text-alice/60 hover:text-alice underline underline-offset-2 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-alice/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-alice font-medium">Programs</span>
          </nav>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left column - Text content */}
            <div className="lg:col-span-6">
              {/* Eyebrow - Alice blue themed */}
              <div
                className="mb-6 sm:mb-8"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
                }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-alice/10 border border-alice/20 rounded-full">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alice opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-alice" />
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-alice">Choose Your Path</span>
                </span>
              </div>

              {/* H1 - Alice blue accent */}
              <h1
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5 sm:mb-6"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
                }}
              >
                1:1{' '}
                <span className="relative inline-block">
                  <span className="text-accent">UX Mentorship</span>
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 sm:h-3 text-alice/40"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,8 Q50,0 100,8 T200,8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{' '}
                Programs That Actually Get You There
              </h1>

              {/* Description */}
              <p
                className="font-body text-base md:text-lg text-g300 leading-relaxed mb-6 sm:mb-8 max-w-2xl"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                }}
              >
                Whether you&apos;re starting out, stuck at mid-level, or ready to lead. A success path built for where you are
              </p>

              {/* CTA */}
              <div
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
                }}
              >
                <Button onClick={scrollToFinder} size="lg" showArrow>
                  Find your program
                </Button>
              </div>
            </div>

            {/* Right column - Image with Stats */}
            <div
              className="lg:col-span-6 hidden lg:block"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.95)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }}
            >
              <div className="relative">
                {/* Alice blue glow behind image */}
                <div
                  className="absolute -inset-12 blur-3xl opacity-50 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(220,238,255,0.25) 0%, rgba(74,144,164,0.15) 50%, transparent 70%)',
                  }}
                />

                {/* Free-floating image */}
                <div className="relative aspect-[4/3] scale-150 origin-center translate-y-10">
                  <Image
                    src="/images/programs-hero.png"
                    alt="UX Mentorship Programs"
                    fill
                    className="object-contain drop-shadow-2xl"
                    style={{
                      filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.4)) drop-shadow(0 10px 20px rgba(220, 238, 255, 0.1))',
                    }}
                    priority
                  />
                </div>

                {/* Badges below image */}
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  {['1:1 mentorship', 'AI-first design approach', 'Support until you succeed'].map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-alice/10 border border-alice/20 rounded-lg text-alice text-sm font-medium"
                    >
                      <svg className="w-4 h-4 text-alice" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom border - alice blue */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(220,238,255,0.3) 50%, transparent 100%)' }}
        />
      </div>

      {/* Stats Section - Light alice theme */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #e8f4ff 0%, #dceeff 50%, #d0e8f8 100%)',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #4A90A4 50%, transparent 100%)' }}
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroStatsGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4A90A4" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroStatsGrid)" />
          </svg>
        </div>

        {/* Decorative dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #4A90A4 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] blur-3xl pointer-events-none"
          style={{ background: 'rgba(74, 144, 164, 0.15)', opacity: 0.8 }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative text-center px-8 md:px-12 lg:px-16 transition-all duration-700"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                  transitionDelay: `${0.4 + index * 0.12}s`,
                }}
              >
                {index < stats.length - 1 && (
                  <div
                    className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, rgba(74,144,164,0.3) 50%, transparent 100%)',
                    }}
                  />
                )}

                <div className="mb-2">
                  <span className="font-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#0d1a28]">
                    {stat.value}
                  </span>
                  <span className="font-heading text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#2a6a7c]">
                    {stat.suffix}
                  </span>
                </div>
                <span className="font-body text-sm md:text-base text-[#4A90A4] tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #4A90A4 50%, transparent 100%)' }}
        />
      </div>
    </section>
  );
}
