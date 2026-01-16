'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

const steps = [
  {
    number: '1',
    title: "Book a Strategy Call",
    description: "We assess where you are, where you want to go, what's blocking you, and if we can help",
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
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden bg-white">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e5e5 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-16 md:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-accent" />
            <span className="font-body text-xs uppercase tracking-[0.2em] text-accent font-medium">The Process</span>
            <div className="w-8 h-[2px] bg-accent" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-carbon mb-4">
            How It Works
          </h2>
          <p className="font-body text-lg text-g500">
            From stuck to senior in 3 simple steps
          </p>
        </div>

        {/* Steps - Desktop */}
        <div className="hidden md:block">
          {/* Timeline track */}
          <div className="relative">
            {/* Background line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-g200 rounded-full" />

            {/* Progress line - animated */}
            <div
              className="absolute top-8 left-0 h-1 bg-gradient-to-r from-accent via-accent to-alice rounded-full"
              style={{
                width: isVisible ? '100%' : '0%',
                transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }}
            />

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                  style={{
                    width: '30%',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.4 + index * 0.2}s`,
                  }}
                >
                  {/* Step circle */}
                  <div className="relative mb-8">
                    {/* Outer ring - animated */}
                    <div
                      className="absolute -inset-2 rounded-full border-2 border-accent/20"
                      style={{
                        transform: isVisible ? 'scale(1)' : 'scale(0)',
                        opacity: isVisible ? 1 : 0,
                        transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.6 + index * 0.2}s`,
                      }}
                    />
                    {/* Main circle */}
                    <div className="relative w-16 h-16 rounded-full bg-alice flex items-center justify-center shadow-lg">
                      <span className="font-heading text-2xl font-bold text-carbon">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl font-bold text-carbon mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-base text-g500 leading-relaxed max-w-[280px]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Steps - Mobile */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-g200" />

            {/* Animated progress line */}
            <div
              className="absolute left-7 top-0 w-0.5 bg-gradient-to-b from-accent to-alice"
              style={{
                height: isVisible ? '100%' : '0%',
                transition: 'height 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }}
            />

            <div className="space-y-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex gap-6"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.15}s`,
                  }}
                >
                  {/* Step circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-alice flex items-center justify-center shadow-lg z-10 relative">
                      <span className="font-heading text-xl font-bold text-carbon">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="font-heading text-lg font-bold text-carbon mb-2">
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
          className="mt-16 md:mt-20 flex justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s',
          }}
        >
          <Button href="/book-call" size="lg" showArrow>
            Start with Step 1
          </Button>
        </div>
      </div>
    </section>
  );
}
