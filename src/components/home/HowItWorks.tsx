'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

const steps = [
  {
    number: '1',
    title: "Book a Strategy call",
    description: "We assess where you are, where you want to go, what's blocking you, and if we will be able to help you",
  },
  {
    number: '2',
    title: "Get Your Curated Plan",
    description: "Based on your gaps and goals, we create a personalised learning path - not a generic curriculum",
  },
  {
    number: '3',
    title: "Achieve Your Goal",
    description: "Frequent 1:1 sessions, clinics, reviews, and support until you reach your career goal",
  },
];

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-20 md:py-28 lg:py-32 overflow-hidden bg-white">
      <div className="max-w-[1000px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div
          className="mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-accent" />
            <span className="font-body text-[11px] uppercase tracking-[0.25em] text-accent font-medium">The Process</span>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-3">
            How It Works
          </h2>
          <p className="font-body text-sm md:text-base text-g500">
            From stuck to senior & leaders in 3 steps
          </p>
        </div>

        {/* Progress Steps - Desktop */}
        <div className="hidden md:block">
          {/* Progress Track */}
          <div
            className="relative mb-10"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            {/* Background track */}
            <div className="absolute top-5 left-[10%] right-[10%] h-px bg-g200" />

            {/* Active track */}
            <div
              className="absolute top-5 left-[10%] h-px bg-[#A8D4F0]"
              style={{
                width: isVisible ? '80%' : '0%',
                transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
              }}
            />

            {/* Step indicators */}
            <div className="relative flex justify-between px-[5%]">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  style={{
                    width: '30%',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                    transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.15}s`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-semibold text-base shadow-sm"
                    style={{
                      backgroundColor: '#DCEEFF',
                      border: '2px solid #A8D4F0',
                      color: '#1A1A1A'
                    }}
                  >
                    {step.number}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.5 + index * 0.1}s`,
                }}
              >
                <h3 className="font-heading text-lg md:text-xl font-semibold text-carbon mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-g500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="relative pl-10">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-g200" />

            {/* Active line */}
            <div
              className="absolute left-4 top-0 w-px bg-[#A8D4F0]"
              style={{
                height: isVisible ? '100%' : '0%',
                transition: 'height 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }}
            />

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.15}s`,
                  }}
                >
                  <div
                    className="absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center font-heading font-semibold text-sm"
                    style={{ backgroundColor: '#DCEEFF', border: '2px solid #A8D4F0' }}
                  >
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-carbon mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-g500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-12 md:mt-16 flex justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
          }}
        >
          <Button href="https://calendly.com/team-xperiencewave/xw-strategy" showArrow>
            Start with Step 1
          </Button>
        </div>
      </div>
    </section>
  );
}
