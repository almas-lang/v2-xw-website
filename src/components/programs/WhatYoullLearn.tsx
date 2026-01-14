'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

interface LearningModule {
  title: string;
  subtitle?: string;
  items: string[];
}

interface WhatYoullLearnProps {
  programName: string;
  subtitle?: string;
  modules: LearningModule[];
  aiModule?: {
    title: string;
    description: string;
  };
  accentColor: 'coral' | 'teal' | 'gold';
}

const colorMap = {
  coral: {
    primary: '#E85A4F',
    secondary: '#FF8A80',
  },
  teal: {
    primary: '#4A90A4',
    secondary: '#7EC8E3',
  },
  gold: {
    primary: '#D4A853',
    secondary: '#F5D78E',
  },
};

export default function WhatYoullLearn({
  programName,
  subtitle = 'A curriculum built from 13 years of corporate design experience - not theory from textbooks',
  modules,
  aiModule,
  accentColor,
}: WhatYoullLearnProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const colors = colorMap[accentColor];

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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#0F0F0F' }}
    >
      {/* Large accent shape - bold geometric element */}
      <div
        className="absolute -top-[300px] -right-[200px] w-[700px] h-[700px] rounded-full opacity-[0.07]"
        style={{ background: colors.primary }}
      />

      {/* Grid lines for texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] w-full"
            style={{
              top: `${i * 5}%`,
              background: 'linear-gradient(90deg, transparent 0%, #fff 50%, transparent 100%)'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1200px] mx-auto px-5 py-16 md:py-24">
        {/* Header - Editorial style */}
        <div
          className="mb-16 md:mb-20 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div
              className="h-[2px] w-12"
              style={{ background: colors.primary }}
            />
            <span
              className="font-heading text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: colors.primary }}
            >
              Curriculum
            </span>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.1] max-w-3xl">
            What You&apos;ll Learn In{' '}
            <span style={{ color: colors.primary }}>{programName}</span>
          </h2>
          <p className="font-body text-base md:text-lg text-neutral-400 max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Modules Grid - Magazine layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* First module - Featured large */}
          <div
            className="col-span-12 md:col-span-7 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transitionDelay: '200ms',
            }}
          >
            <div
              className="h-full p-8 md:p-10 rounded-2xl relative group"
              style={{
                background: 'linear-gradient(135deg, #1A1A1A 0%, #141414 100%)',
                border: '1px solid #2a2a2a',
              }}
            >
              {/* Number accent */}
              <span
                className="absolute -top-4 -left-2 font-heading text-[120px] md:text-[160px] font-black leading-none opacity-[0.03] select-none"
                style={{ color: colors.primary }}
              >
                01
              </span>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${colors.primary}08 0%, transparent 50%)`
                }}
              />

              <div className="relative">
                <h3
                  className="font-heading text-lg md:text-xl font-bold uppercase tracking-wide mb-2"
                  style={{ color: colors.primary }}
                >
                  {modules[0]?.title}
                </h3>
                <p className="font-body text-sm md:text-base text-neutral-400 mb-8 max-w-md">
                  {modules[0]?.subtitle}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {modules[0]?.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                        style={{ background: colors.primary }}
                      />
                      <span className="font-body text-sm text-neutral-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Second module - Stacked right */}
          <div
            className="col-span-12 md:col-span-5 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transitionDelay: '300ms',
            }}
          >
            <div
              className="h-full p-8 rounded-2xl relative group"
              style={{
                background: 'linear-gradient(135deg, #1A1A1A 0%, #141414 100%)',
                border: '1px solid #2a2a2a',
              }}
            >
              <span
                className="absolute -top-4 -left-2 font-heading text-[120px] font-black leading-none opacity-[0.03] select-none"
                style={{ color: colors.primary }}
              >
                02
              </span>

              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 70% 30%, ${colors.primary}08 0%, transparent 50%)`
                }}
              />

              <div className="relative">
                <h3
                  className="font-heading text-lg font-bold uppercase tracking-wide mb-2"
                  style={{ color: colors.primary }}
                >
                  {modules[1]?.title}
                </h3>
                <p className="font-body text-sm text-neutral-400 mb-6">
                  {modules[1]?.subtitle}
                </p>

                <div className="space-y-3">
                  {modules[1]?.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                        style={{ background: colors.primary }}
                      />
                      <span className="font-body text-sm text-neutral-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Third module */}
          <div
            className="col-span-12 md:col-span-5 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transitionDelay: '400ms',
            }}
          >
            <div
              className="h-full p-8 rounded-2xl relative group"
              style={{
                background: 'linear-gradient(135deg, #1A1A1A 0%, #141414 100%)',
                border: '1px solid #2a2a2a',
              }}
            >
              <span
                className="absolute -top-4 -left-2 font-heading text-[120px] font-black leading-none opacity-[0.03] select-none"
                style={{ color: colors.primary }}
              >
                03
              </span>

              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 30% 70%, ${colors.primary}08 0%, transparent 50%)`
                }}
              />

              <div className="relative">
                <h3
                  className="font-heading text-lg font-bold uppercase tracking-wide mb-2"
                  style={{ color: colors.primary }}
                >
                  {modules[2]?.title}
                </h3>
                <p className="font-body text-sm text-neutral-400 mb-6">
                  {modules[2]?.subtitle}
                </p>

                <div className="space-y-3">
                  {modules[2]?.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span
                        className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                        style={{ background: colors.primary }}
                      />
                      <span className="font-body text-sm text-neutral-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Module - Accent card */}
          {aiModule && (
            <div
              className="col-span-12 md:col-span-4 transition-all duration-1000"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transitionDelay: '500ms',
              }}
            >
              <div
                className="h-full p-8 rounded-2xl relative overflow-hidden"
                style={{ background: colors.primary }}
              >
                {/* Pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      -45deg,
                      transparent,
                      transparent 10px,
                      rgba(0,0,0,0.1) 10px,
                      rgba(0,0,0,0.1) 20px
                    )`,
                  }}
                />

                <div className="relative">
                  <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wide mb-3">
                    {aiModule.title}
                  </h3>
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    {aiModule.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CTA Card - Alice Blue themed */}
          <div
            className="col-span-12 md:col-span-3 transition-all duration-1000"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
              transitionDelay: '600ms',
            }}
          >
            <div
              className="h-full p-8 rounded-2xl flex flex-col justify-center items-center text-center"
              style={{
                background: 'rgba(74, 144, 164, 0.12)',
                border: '2px dashed rgba(74, 144, 164, 0.4)',
              }}
            >
              <p className="font-body text-sm text-neutral-400 mb-5">
                Not sure if this fits?
              </p>
              <Button href="/book-call">
                Book a call
              </Button>
              <p className="font-body text-xs text-neutral-500 mt-4 italic">
                — we&apos;ll tell you honestly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
