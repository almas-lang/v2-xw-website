'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

const comparisonData = [
  { courses: 'Same for everyone', mentorship: 'Curated for your gaps' },
  { courses: 'Pre-recorded videos', mentorship: 'Live 1:1 Sessions' },
  { courses: 'No accountability', mentorship: 'Frequent check-ins' },
  { courses: 'No feedback', mentorship: 'Reviews until ready' },
  { courses: 'No AI depth', mentorship: 'AI-first mindset + designing for AI products' },
  { courses: 'Certificates', mentorship: 'Actual interview preparation' },
  { courses: "You're on your own", mentorship: 'Support until you achieve your goals' },
];

export default function MentorshipComparison() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e5e5 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-14 sm:py-20 md:py-28 lg:py-32">
        {/* Header */}
        <div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-accent" />
            <span className="font-body text-xs uppercase tracking-[0.2em] text-accent font-medium">The Difference</span>
            <div className="w-8 h-[2px] bg-accent" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon leading-tight mb-3">
            How 1:1 Mentorship Fixes This
          </h2>
          <p className="font-body text-sm md:text-base text-g500">
            Everything courses get wrong, we get right.
          </p>
        </div>

        {/* Comparison Table */}
        <div
          className="mb-8 sm:mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
          }}
        >
          {/* Table Header */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
            <div className="flex items-center gap-2 px-4 md:px-6">
              <svg className="w-4 h-4 text-g500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              <span className="font-heading text-xs md:text-sm font-bold text-g500 uppercase tracking-wider">Courses</span>
            </div>
            <div className="flex items-center gap-2 px-4 md:px-6">
              <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="font-heading text-xs md:text-sm font-bold text-accent uppercase tracking-wider">1:1 Mentorship</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="space-y-3 md:space-y-4">
            {comparisonData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-3 md:gap-4"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.08}s`,
                }}
              >
                {/* Courses - Muted */}
                <div className="relative group">
                  <div className="relative py-4 px-4 md:px-6 rounded-lg bg-g100 border border-g200">
                    <span className="inline font-body text-sm md:text-base text-g600 line-through decoration-g500 decoration-[1px]">
                      {item.courses}
                    </span>
                  </div>
                </div>

                {/* Mentorship - Highlighted */}
                <div className="relative group">
                  <div className="relative py-4 px-4 md:px-6 rounded-lg bg-alice/50 border border-alice-border hover:bg-alice hover:border-accent/20 transition-all duration-300">
                    {/* Left accent */}
                    <div
                      className="absolute left-0 top-2 bottom-2 w-[3px] bg-accent rounded-full"
                      style={{
                        transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'top',
                        transition: `transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.6 + index * 0.1}s`,
                      }}
                    />
                    <span className="font-body text-sm md:text-base text-carbon font-medium">
                      {item.mentorship}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom - Stats + CTA */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.9s',
          }}
        >
          {/* Statement */}
          <p className="font-heading text-base md:text-lg font-semibold text-carbon">
            This is why <span className="text-2xl md:text-3xl font-black text-accent">80%</span> of our mentees achieve their goals.
          </p>

          {/* CTA */}
          <Button href="https://calendly.com/team-xperiencewave/xw-strategy" size="lg" showArrow>
            Book strategy call
          </Button>
        </div>
      </div>
    </section>
  );
}
