'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface ProgramHeroProps {
  programName: string;
  tagline: string;
  problemStatement?: string; // Italic text above description
  description: string;
  targetAudience: string[];
  duration: string;
  accentColor: 'coral' | 'teal' | 'gold';
  features?: string[];
  badge?: string;
  breadcrumbLabel?: string;
  topBanner?: string; // Full-width banner at top of hero
  heroImage?: string; // Optional hero image - replaces description box
}

const colorMap = {
  coral: {
    primary: '#E85A4F',
    gradient: 'linear-gradient(135deg, #E85A4F 0%, #FF6B5B 50%, #E85A4F 100%)',
    bgGlow: 'rgba(232, 90, 79, 0.15)',
    textClass: 'text-accent',
  },
  teal: {
    primary: '#4A90A4',
    gradient: 'linear-gradient(135deg, #4A90A4 0%, #5BA8BE 50%, #4A90A4 100%)',
    bgGlow: 'rgba(74, 144, 164, 0.15)',
    textClass: 'text-alice',
  },
  gold: {
    primary: '#D4A853',
    gradient: 'linear-gradient(135deg, #D4A853 0%, #E8C068 50%, #D4A853 100%)',
    bgGlow: 'rgba(212, 168, 83, 0.15)',
    textClass: 'text-[#D4A853]',
  },
};

export default function ProgramHero({
  programName,
  tagline,
  problemStatement,
  description,
  targetAudience,
  duration,
  accentColor,
  features = [],
  badge,
  breadcrumbLabel,
  topBanner,
  heroImage,
}: ProgramHeroProps) {
  const colors = colorMap[accentColor];

  return (
    <>
      {/* Top Banner - Outside hero section, below fixed nav */}
      {topBanner && (
        <div
          className="relative w-full mt-14 md:mt-16"
          style={{
            background: 'linear-gradient(180deg, #2A2A2A 0%, #232323 100%)',
          }}
        >
          {/* Subtle noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 py-3 text-center">
            <p className="font-body text-sm md:text-base text-white/90 tracking-wide">
              {topBanner}
            </p>
          </div>
          {/* Accent gradient line at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: colors.gradient }}
          />
        </div>
      )}

      <section className="relative min-h-[85vh] flex items-center bg-carbon overflow-hidden">

      {/* Large program name watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-heading font-black text-[180px] sm:text-[280px] md:text-[380px] lg:text-[480px] uppercase tracking-tighter opacity-[0.03]"
          style={{ color: colors.primary }}
        >
          {programName}
        </span>
      </div>

      {/* Gradient orbs */}
      <div
        className="absolute top-20 -left-32 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: colors.bgGlow }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      <div className={`relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 w-full ${topBanner ? 'pt-6 pb-24 md:pt-8 md:pb-32' : 'py-24 md:py-32'}`}>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-10" aria-label="Breadcrumb">
          <Link href="/" className="text-g400 hover:text-white underline underline-offset-2 transition-colors">
            Home
          </Link>
          <span className="text-g600">/</span>
          <Link href="/programs" className="text-g400 hover:text-white underline underline-offset-2 transition-colors">
            Programs
          </Link>
          <span className="text-g600">/</span>
          <span className="text-white font-medium">{breadcrumbLabel || programName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Content - Main */}
          <div className="lg:col-span-7">
            {/* Badge if provided */}
            {badge && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 mb-6"
                style={{
                  background: colors.primary,
                  borderRadius: '100px',
                }}
              >
                <span className="text-sm text-white font-semibold">{badge}</span>
              </div>
            )}

            {/* Duration badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 mb-6 ${badge ? 'ml-2' : ''}`}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <svg className="w-4 h-4 text-g400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-g300 font-medium">{duration}</span>
            </div>

            {/* Program name */}
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-4 leading-[0.95] tracking-tight">
              <span style={{ color: colors.primary }}>{programName}</span>
            </h1>

            {/* Tagline */}
            <p
              className="font-heading text-xl sm:text-2xl md:text-3xl font-bold mb-6 leading-snug"
              style={{ color: colors.primary }}
            >
              {tagline}
            </p>

            {/* Problem Statement - Italic */}
            {problemStatement && (
              <p className="font-body text-lg md:text-xl text-white/90 italic leading-relaxed mb-6 max-w-xl">
                {problemStatement}
              </p>
            )}

            {/* Description - Only shown in left column when heroImage exists */}
            {heroImage && (
              <p className="font-body text-base md:text-lg text-g300 leading-relaxed mb-8 max-w-xl">
                {description}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button href="/book-call" showArrow>
                Book strategy call
              </Button>
              <Link
                href="#overview"
                className="inline-flex items-center gap-2 font-body text-base text-alice underline underline-offset-4 decoration-alice hover:text-white hover:decoration-white transition-colors"
              >
                See What You'll Learn
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Content - Hero Image OR Description Box */}
          <div className="lg:col-span-5">
            {heroImage ? (
              /* Hero Image + Pills below */
              <div className="space-y-6">
                <div className="relative">
                  {/* Decorative glow behind image */}
                  <div
                    className="absolute -inset-4 rounded-3xl blur-2xl opacity-40"
                    style={{ background: colors.bgGlow }}
                  />
                  {/* Image container */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      borderRadius: '20px',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <Image
                      src={heroImage}
                      alt={`${programName} program`}
                      width={600}
                      height={500}
                      className="w-full h-auto object-cover"
                      priority
                    />
                    {/* Subtle gradient overlay at bottom */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                      style={{
                        background: 'linear-gradient(to top, rgba(26,26,26,0.6) 0%, transparent 100%)',
                      }}
                    />
                  </div>
                  {/* Accent line at bottom */}
                  <div
                    className="absolute -bottom-1 left-6 right-6 h-[3px] rounded-full"
                    style={{ background: colors.gradient }}
                  />
                </div>

                {/* Features as pills - below image */}
                {features && features.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          borderRadius: '100px',
                          border: '1px solid rgba(255,255,255,0.12)',
                        }}
                      >
                        <svg
                          className="w-3.5 h-3.5 flex-shrink-0"
                          style={{ color: colors.primary }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Description Box - Default when no image */
              <div
                className="relative p-8 lg:p-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.06) 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Accent gradient line at top */}
                <div
                  className="absolute top-0 left-8 right-8 h-[2px]"
                  style={{ background: colors.gradient }}
                />

                {/* Description */}
                <p className="font-body text-lg md:text-xl text-g200 leading-relaxed mb-8">
                  {description}
                </p>

                {/* Features as pills */}
                {features && features.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          borderRadius: '100px',
                          border: '1px solid rgba(255,255,255,0.12)',
                        }}
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: colors.primary }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-carbon to-transparent pointer-events-none" />
    </section>
    </>
  );
}
