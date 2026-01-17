'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function WhyMentorship() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-[1000px] mx-auto px-5">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left Content */}
          <div
            className="flex-1 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
          >
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon tracking-tight mb-6">
              Why Mentorship, Not Courses?
            </h2>

            <p className="font-body text-base md:text-lg text-g600 leading-relaxed mb-8">
              Courses teach the same content to thousands. No one knows your gaps,
              reviews your work, or pushes you forward. That's why you finished courses
              but still aren't landing senior roles.
            </p>

            {/* Highlighted callout */}
            <div className="relative pl-6 border-l-4 border-alice-dark">
              <p className="font-heading text-xl md:text-2xl font-bold text-carbon leading-snug">
                Mentorship is different. It's built for{' '}
                <span className="text-alice-dark">YOUR</span> situation.
              </p>
            </div>
          </div>

          {/* Right Card - Blog Link */}
          <div
            className="w-full lg:w-[380px] flex-shrink-0 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '150ms',
            }}
          >
            <Link
              href="/blog/why-courses-fail"
              className="group block relative overflow-hidden border border-g200 hover:border-g300 transition-all duration-300 hover:shadow-xl"
              style={{ borderRadius: '6px' }}
            >
              {/* Background Image */}
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
                alt="Person studying courses"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col justify-end">
                {/* Tag */}
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold mb-4 w-fit" style={{ borderRadius: '4px' }}>
                  Deep Dive
                </span>

                {/* Title */}
                <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-4 leading-snug">
                  Why UX Design Courses Don't Get You Senior Roles (And What Actually Works)
                </h3>

                {/* Read link */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-white group-hover:gap-3 transition-all">
                    Read
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8H13M13 8L9 4M13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-body text-sm text-white/70">4 mins read</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
