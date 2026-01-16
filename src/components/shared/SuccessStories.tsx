'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ============================================
// DATA - SEO OPTIMIZED CONTENT
// ============================================

const featuredStories = [
  {
    name: 'Pavitra Suji',
    role: 'Sr. Designer',
    company: 'McKinsey & Company',
    image: '/images/testimonials/pavitra-suji.jpg',
  },
  {
    name: 'Ashley Alemao',
    role: 'UX Designer',
    company: 'Millipixels',
    image: '/images/testimonials/ashley-alemao.jpg',
  },
  {
    name: 'Vignesh',
    role: 'Sr. UX Designer',
    company: 'Siemens',
    image: '/images/testimonials/vignesh.jpg',
  },
];

const quickWins = [
  {
    achievement: 'Lead Product designer at a German startup',
    duration: 'In 3 months',
    name: 'Kritika Singh',
    image: '/images/testimonials/kritika-singh.jpg',
  },
  {
    achievement: 'Lead Designer to Principal Designer at Informatica',
    duration: 'In 4 months',
    name: 'Radhakrishna A',
    image: '/images/testimonials/radhakrishna-a.jpg',
  },
  {
    achievement: 'Sr. Designer to Design Lead at CX100',
    duration: 'In 2 months',
    name: 'Sheetal P',
    image: '/images/testimonials/sheetal-p.jpg',
  },
  {
    achievement: 'Sr. Lead Designer at Wongdoody',
    duration: 'In 2 months',
    name: 'Jonah Immanuel',
    image: '/images/testimonials/jonah-immanuel.jpg',
  },
];

// ============================================
// COMPONENTS
// ============================================

const PlayIcon = ({ size = 48 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="23" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="2" />
    <path
      d="M20 16L32 24L20 32V16Z"
      fill="white"
    />
  </svg>
);

const Avatar = ({
  name,
  image,
  size = 'large'
}: {
  name: string;
  image?: string;
  size?: 'large' | 'medium' | 'small'
}) => {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    large: 'w-full h-full',
    medium: 'w-12 h-12 sm:w-14 sm:h-14',
    small: 'w-8 h-8 sm:w-10 sm:h-10',
  };

  const textSizes = {
    large: 'text-5xl sm:text-6xl',
    medium: 'text-lg sm:text-xl',
    small: 'text-xs sm:text-sm',
  };

  if (size === 'large') {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-g700 to-carbon overflow-hidden">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className={`font-heading ${textSizes[size]} font-bold text-g500`}>{initials}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-g200 to-g300 flex items-center justify-center flex-shrink-0 overflow-hidden ring-2 ring-g200`}>
      {image && !imgError ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={`font-heading ${textSizes[size]} font-semibold text-g500`}>{initials}</span>
      )}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

interface SuccessStoriesProps {
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export default function SuccessStories({
  title = 'Real Transformation, Real People',
  subtitle = 'Hear from designers who made the shift',
  showCTA = true,
  ctaText = 'See all success stories',
  ctaHref = '/success-stories',
}: SuccessStoriesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e5e5 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Accent glow - subtle */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(220,238,255,0.4) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 px-5 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div
            className="text-center mb-10 sm:mb-12 md:mb-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="font-body text-xs uppercase tracking-[0.2em] text-accent font-medium">Success Stories</span>
              <div className="w-8 h-[2px] bg-accent" />
            </div>
            <h2 className="font-heading text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] font-bold text-carbon leading-tight mb-3">
              {title}
            </h2>
            <p className="font-body text-sm sm:text-base md:text-lg text-g500 max-w-xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Featured Video Testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {featuredStories.map((story, index) => (
              <div
                key={story.name}
                className="group cursor-pointer"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + index * 0.1}s`,
                }}
              >
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-g200 sm:hover:border-accent/40 transition-all duration-500 sm:hover:shadow-xl shadow-md">
                  {/* Image area */}
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
                    <Avatar name={story.name} image={story.image} size="large" />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="transform sm:group-hover:scale-110 transition-transform duration-300">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2s' }} />
                          <PlayIcon size={48} />
                        </div>
                      </div>
                    </div>

                    {/* Info overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                      <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-white mb-1">
                        {story.name}
                      </h3>
                      <p className="font-body text-sm text-white/90">
                        {story.role}
                      </p>
                      <p className="font-body text-xs sm:text-sm text-white/70">
                        {story.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Wins Section */}
          <div
            className="mb-8 sm:mb-10 md:mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
            }}
          >
            {/* Quick wins header */}
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <span className="font-heading text-sm sm:text-base font-bold text-carbon uppercase tracking-wider">Quick Wins</span>
              <div className="flex-1 h-px bg-gradient-to-r from-g300 to-transparent" />
            </div>

            {/* Quick win cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {quickWins.map((win, index) => (
                <div
                  key={win.name}
                  className="group"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.5 + index * 0.08}s`,
                  }}
                >
                  <div className="relative p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 border-g200 sm:hover:border-accent/40 bg-white shadow-sm sm:hover:shadow-md transition-all duration-300 h-full">
                    {/* Duration badge */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                      <span className="inline-block px-2.5 py-1 text-[10px] sm:text-xs font-bold text-accent bg-accent/10 border border-accent/20 rounded-full">
                        {win.duration}
                      </span>
                    </div>

                    {/* Achievement */}
                    <h4 className="font-heading text-sm sm:text-base font-bold text-carbon mb-4 pr-16 sm:pr-20 leading-snug">
                      {win.achievement}
                    </h4>

                    {/* Person */}
                    <div className="flex items-center gap-3">
                      <Avatar name={win.name} image={win.image} size="small" />
                      <span className="font-body text-xs sm:text-sm text-g600">{win.name}</span>
                    </div>

                    {/* Left accent line - always visible */}
                    <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-accent/60 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          {showCTA && (
            <div
              className="text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
              }}
            >
              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-accent sm:hover:bg-accent-hover text-white rounded-lg sm:rounded-xl shadow-md sm:hover:shadow-lg transition-all duration-300"
              >
                <span className="font-heading font-semibold text-sm sm:text-base">
                  {ctaText}
                </span>
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transform sm:group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom subtle line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}
      />
    </section>
  );
}
