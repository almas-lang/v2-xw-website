'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Step {
  title: string;
  description: string;
  image?: string;
}

interface IncludedItem {
  text: string;
}

interface HowItWorksProps {
  programName: string;
  subtitle?: string;
  steps: Step[];
  includedItems: IncludedItem[];
  accentColor: 'coral' | 'teal' | 'gold';
}

const colorMap = {
  coral: {
    primary: '#E85A4F',
    gradient: 'linear-gradient(135deg, #E85A4F 0%, #FF6B5B 100%)',
    glow: 'rgba(232, 90, 79, 0.12)',
    light: 'rgba(232, 90, 79, 0.08)',
  },
  teal: {
    primary: '#4A90A4',
    gradient: 'linear-gradient(135deg, #4A90A4 0%, #5BA8BE 100%)',
    glow: 'rgba(74, 144, 164, 0.12)',
    light: 'rgba(74, 144, 164, 0.08)',
  },
  gold: {
    primary: '#D4A853',
    gradient: 'linear-gradient(135deg, #D4A853 0%, #E8C068 100%)',
    glow: 'rgba(212, 168, 83, 0.12)',
    light: 'rgba(212, 168, 83, 0.08)',
  },
};

// Alice blue - secondary brand color
const alice = {
  primary: '#4A90A4',
  light: 'rgba(74, 144, 164, 0.08)',
};

export default function HowItWorks({
  programName,
  subtitle = 'A structured 3-month program with support until you reach your goal',
  steps,
  includedItems,
  accentColor,
}: HowItWorksProps) {
  const [currentStep, setCurrentStep] = useState(0);
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

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 relative overflow-hidden"
      style={{ background: '#FAFAFA' }}
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.3]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="howWorksGrid" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#E0E0E0" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#howWorksGrid)" />
        </svg>
      </div>

      {/* Alice blue decorative corner accent */}
      <div
        className="absolute top-0 left-0 w-[200px] h-[200px] opacity-[0.06]"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${alice.primary} 0%, transparent 70%)`,
        }}
      />

      {/* Alice blue geometric accent - bottom right */}
      <div className="absolute bottom-16 right-8 md:bottom-20 md:right-16 opacity-[0.08]">
        <div
          className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2"
          style={{ borderColor: alice.primary }}
        />
        <div
          className="absolute -top-2 -left-2 w-8 h-8 md:w-10 md:h-10 rounded-full border"
          style={{ borderColor: alice.primary }}
        />
      </div>

      <div className="relative max-w-[1000px] mx-auto px-5">
        {/* Header */}
        <div
          className="text-center mb-10 md:mb-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-3">
            How {programName} UX Mentor Program Works
          </h2>
          <p className="font-body text-base md:text-lg text-g600 max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Step Carousel */}
        <div
          className="mb-10 md:mb-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '150ms',
          }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1A1A1A 0%, #252525 50%, #1A1A1A 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            {/* Geometric shapes on the card */}
            <div
              className="absolute top-8 right-8 w-32 h-32 rounded-full border opacity-[0.06]"
              style={{ borderColor: colors.primary }}
            />
            <div
              className="absolute top-16 right-16 w-20 h-20 rounded-full border opacity-[0.08]"
              style={{ borderColor: colors.primary }}
            />
            <div
              className="absolute bottom-20 left-6 w-24 h-24 rotate-45 border opacity-[0.05]"
              style={{ borderColor: alice.primary }}
            />
            <div
              className="absolute bottom-28 left-14 w-14 h-14 rotate-45 border opacity-[0.07]"
              style={{ borderColor: alice.primary }}
            />
            {/* Subtle diagonal lines */}
            <div className="absolute inset-0 opacity-[0.02]">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 w-[1px] h-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    background: 'white',
                    transform: `rotate(${-10 + i * 5}deg)`,
                  }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                  background: colors.gradient,
                }}
              />
            </div>

            <div className="relative p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                {/* Image placeholder */}
                <div
                  className="relative aspect-[4/3] rounded-xl overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {steps[currentStep].image ? (
                    <Image
                      src={steps[currentStep].image}
                      alt={steps[currentStep].title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="font-heading text-[80px] md:text-[100px] font-black text-white/[0.06]"
                      >
                        {currentStep + 1}
                      </span>
                    </div>
                  )}
                  {/* Step number badge */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full"
                    style={{ background: colors.primary }}
                  >
                    <span className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                      Step {currentStep + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div
                    className="inline-block px-3 py-1 rounded-full mb-4 text-xs font-bold uppercase tracking-wider"
                    style={{ background: `rgba(232, 90, 79, 0.15)`, color: colors.primary }}
                  >
                    Step {currentStep + 1} of {steps.length}
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-3">
                    {steps[currentStep].title}
                  </h3>
                  <p className="font-body text-base text-neutral-400 leading-relaxed">
                    {steps[currentStep].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex items-center justify-center gap-2 pb-6">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    background: index === currentStep ? colors.primary : 'rgba(255,255,255,0.2)',
                    transform: index === currentStep ? 'scale(1.2)' : 'scale(1)',
                  }}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '300ms',
          }}
        >
          <h3 className="font-heading text-lg md:text-xl font-bold text-carbon text-center mb-6">
            What&apos;s included
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {includedItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-sm"
                style={{
                  background: alice.light,
                  border: '1px solid rgba(74, 144, 164, 0.15)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                  transitionDelay: `${400 + index * 50}ms`,
                }}
              >
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{ background: alice.primary }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="font-body text-sm md:text-base text-g700 leading-relaxed">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
