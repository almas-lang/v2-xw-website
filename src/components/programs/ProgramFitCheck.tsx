'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

interface ProgramFitCheckProps {
  programName: string;
  forYou: string[];
  notForYou: string[];
  accentColor: 'coral' | 'teal' | 'gold';
}

const colorMap = {
  coral: {
    primary: '#E85A4F',
    gradient: 'linear-gradient(135deg, #E85A4F 0%, #FF6B5B 100%)',
    glow: 'rgba(232, 90, 79, 0.15)',
  },
  teal: {
    primary: '#4A90A4',
    gradient: 'linear-gradient(135deg, #4A90A4 0%, #5BA8BE 100%)',
    glow: 'rgba(74, 144, 164, 0.15)',
  },
  gold: {
    primary: '#D4A853',
    gradient: 'linear-gradient(135deg, #D4A853 0%, #E8C068 100%)',
    glow: 'rgba(212, 168, 83, 0.15)',
  },
};

// Alice blue - secondary brand color
const alice = {
  primary: '#4A90A4',
  light: 'rgba(74, 144, 164, 0.08)',
  medium: 'rgba(74, 144, 164, 0.15)',
  border: 'rgba(74, 144, 164, 0.25)',
};

export default function ProgramFitCheck({
  programName,
  forYou,
  notForYou,
  accentColor,
}: ProgramFitCheckProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const colors = colorMap[accentColor];

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
    <section
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden"
    >
      {/* Elegant diagonal lines pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            #000 40px,
            #000 41px
          )`,
        }}
      />

      {/* Subtle corner accents */}
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] opacity-[0.04]"
        style={{
          background: `radial-gradient(circle at 100% 0%, ${colors.primary} 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[250px] h-[250px] opacity-[0.03]"
        style={{
          background: `radial-gradient(circle at 0% 100%, ${colors.primary} 0%, transparent 70%)`,
        }}
      />

      {/* Geometric shapes - top right */}
      <div className="absolute top-12 right-12 md:top-20 md:right-20 opacity-[0.06]">
        <div
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2"
          style={{ borderColor: colors.primary }}
        />
        <div
          className="absolute top-4 left-4 w-16 h-16 md:w-24 md:h-24 rounded-full border"
          style={{ borderColor: colors.primary }}
        />
      </div>

      {/* Geometric shapes - bottom left (alice blue) */}
      <div className="absolute bottom-12 left-8 md:bottom-16 md:left-16 opacity-[0.08]">
        <div
          className="w-16 h-16 md:w-20 md:h-20 rotate-45"
          style={{ border: `1px solid ${alice.primary}` }}
        />
        <div
          className="absolute top-2 left-2 w-12 h-12 md:w-16 md:h-16 rotate-45"
          style={{ border: `1px solid ${alice.primary}` }}
        />
      </div>

      {/* Fine horizontal lines accent (alice blue) */}
      <div className="absolute top-1/2 left-0 w-20 md:w-32 -translate-y-1/2 opacity-[0.12]">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-[1px] mb-2"
            style={{
              background: alice.primary,
              width: `${100 - i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Right side alice blue accent lines */}
      <div className="absolute top-1/3 right-0 w-16 md:w-24 opacity-[0.1]">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-[1px] mb-3 ml-auto"
            style={{
              background: alice.primary,
              width: `${60 + i * 12}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1000px] mx-auto px-5">
        {/* Section Header */}
        <div
          className="text-center mb-8 md:mb-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon leading-tight">
            Is {programName} Right For You?
          </h2>
        </div>

        {/* Two Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-10 md:mb-12">
          {/* For You Card */}
          <div
            className="relative transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '150ms',
            }}
          >
            <div
              className="relative p-6 md:p-8 rounded-2xl border-2 h-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, #FAFAFA 100%)',
                borderColor: colors.primary,
              }}
            >
              {/* Header badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: colors.primary }}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-heading text-sm font-bold text-white uppercase tracking-wide">
                  This is for you if
                </span>
              </div>

              {/* List */}
              <ul className="space-y-4">
                {forYou.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                      transitionDelay: `${300 + index * 80}ms`,
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: colors.primary }}
                    >
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="font-body text-base text-carbon leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Not For You Card - Alice Blue themed */}
          <div
            className="relative transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '250ms',
            }}
          >
            <div
              className="relative p-6 md:p-8 rounded-2xl border h-full"
              style={{
                background: `linear-gradient(135deg, ${alice.light} 0%, rgba(74, 144, 164, 0.04) 100%)`,
                borderColor: alice.border,
              }}
            >
              {/* Header badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: alice.medium }}
              >
                <svg className="w-4 h-4" style={{ color: alice.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-heading text-sm font-bold uppercase tracking-wide" style={{ color: alice.primary }}>
                  Not for you if
                </span>
              </div>

              {/* List */}
              <ul className="space-y-4">
                {notForYou.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                      transitionDelay: `${400 + index * 80}ms`,
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: alice.primary }}
                    >
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span className="font-body text-base text-g700 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '600ms',
          }}
        >
          <p className="font-body text-lg text-g600 mb-4">Not sure if this fits?</p>
          <Button href="https://calendly.com/team-xperiencewave/xw-strategy" size="lg">
            Book a free strategy call
          </Button>
          <p className="font-body text-sm text-g500 mt-4 italic">— we&apos;ll tell you honestly</p>
        </div>
      </div>
    </section>
  );
}
