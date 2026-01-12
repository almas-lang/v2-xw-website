'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

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

// Play button icon component
const PlayIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-lg"
  >
    <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="2" fill="none" />
    <path
      d="M20 16.5V31.5L32 24L20 16.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Avatar component with image support and fallback
const Avatar = ({
  name,
  image,
  size = 'large'
}: {
  name: string;
  image?: string;
  size?: 'large' | 'small'
}) => {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (size === 'small') {
    return (
      <div className="w-8 h-8 rounded-full bg-g200 flex items-center justify-center flex-shrink-0 overflow-hidden">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-heading text-xs font-semibold text-g500">{initials}</span>
        )}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-g100 to-g200 flex items-center justify-center overflow-hidden">
      {image && !imgError ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-heading text-6xl font-bold text-g300">{initials}</span>
      )}
    </div>
  );
};

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
    <section ref={sectionRef} className="bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[44px] font-bold text-carbon tracking-tight mb-3">
            {title}
          </h2>
          <p className="font-body text-base md:text-lg text-g600">
            {subtitle}
          </p>
        </div>

        {/* Featured Video Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-6 md:mb-8">
          {featuredStories.map((story, index) => {
            const delay = index * 100;
            return (
              <div
                key={story.name}
                className="group cursor-pointer transition-all duration-500 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${delay}ms`,
                }}
              >
                <div
                  className="relative bg-white border border-g200 overflow-hidden
                             hover:border-g300 hover:shadow-lg transition-all duration-300"
                  style={{ borderRadius: '6px' }}
                >
                  {/* Image/Video Thumbnail Area */}
                  <div className="relative aspect-[4/5] bg-g100 overflow-hidden">
                    {/* Avatar/Placeholder */}
                    <Avatar name={story.name} image={story.image} size="large" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-carbon/70 group-hover:text-carbon group-hover:scale-110 transition-all duration-300">
                        <PlayIcon />
                      </div>
                    </div>

                    {/* Gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-carbon mb-1">
                      {story.name}
                    </h3>
                    <p className="font-body text-sm text-g600">
                      {story.role}
                    </p>
                    <p className="font-body text-sm text-g500">
                      {story.company}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Win Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10 md:mb-12">
          {quickWins.map((win, index) => {
            const delay = 300 + index * 100;
            return (
              <div
                key={win.name}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                  transitionDelay: `${delay}ms`,
                }}
              >
                <div
                  className="bg-white border border-g200 p-5 h-full
                             hover:border-g300 hover:shadow-lg transition-all duration-300"
                  style={{ borderRadius: '6px' }}
                >
                  <h4 className="font-heading text-base font-bold text-carbon mb-2 leading-snug">
                    {win.achievement}
                  </h4>
                  <p className="font-heading text-sm font-semibold text-carbon mb-4">
                    {win.duration}
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar name={win.name} image={win.image} size="small" />
                    <span className="font-body text-sm text-g600">{win.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Link */}
        {showCTA && (
          <div
            className="text-center transition-all duration-500 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDelay: '700ms',
            }}
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-1 font-body text-base text-carbon font-medium
                         hover:text-accent transition-colors duration-200
                         underline underline-offset-4 decoration-1"
            >
              {ctaText}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path
                  d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
