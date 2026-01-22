'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

interface InvestmentSectionProps {
  title?: string;
  subtitle?: string;
  pricing: {
    amount: string;
    period: string;
    equivalent?: string;
    note: string;
  };
  roi: {
    stat: string;
    description: string;
  };
  guarantee: string;
  paymentOptions?: string[];
  accentColor: 'coral' | 'teal' | 'gold';
}

const colorMap = {
  coral: {
    primary: '#E85A4F',
    gradient: 'linear-gradient(135deg, #E85A4F 0%, #D64A3F 100%)',
  },
  teal: {
    primary: '#4A90A4',
    gradient: 'linear-gradient(135deg, #4A90A4 0%, #3A7A8E 100%)',
  },
  gold: {
    primary: '#D4A853',
    gradient: 'linear-gradient(135deg, #D4A853 0%, #C49843 100%)',
  },
};

// Alice blue - secondary brand color
const alice = {
  primary: '#4A90A4',
  light: 'rgba(74, 144, 164, 0.15)',
  border: 'rgba(74, 144, 164, 0.3)',
};

export default function InvestmentSection({
  title = 'UX Mentorship Investment',
  subtitle = 'Your career growth is worth investing in',
  pricing,
  roi,
  guarantee,
  paymentOptions = ['EMI available with major banks and credit cards', 'Subscription payment models available'],
  accentColor,
}: InvestmentSectionProps) {
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
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
      }}
    >
      {/* Gradient orbs */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] opacity-[0.12]"
        style={{
          background: `radial-gradient(circle, ${colors.primary} 0%, transparent 60%)`,
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] opacity-[0.1]"
        style={{
          background: `radial-gradient(circle, ${alice.primary} 0%, transparent 60%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Geometric accents */}
      <div className="absolute top-16 left-12 md:left-20 opacity-[0.06]">
        <div className="w-24 h-24 rounded-full border" style={{ borderColor: alice.primary }} />
        <div className="absolute top-4 left-4 w-16 h-16 rounded-full border" style={{ borderColor: alice.primary }} />
      </div>
      <div className="absolute bottom-20 right-8 md:right-16 opacity-[0.05]">
        <div className="w-20 h-20 rotate-45 border" style={{ borderColor: colors.primary }} />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            {title}
          </h2>
          <p className="font-body text-base md:text-lg text-neutral-400">
            {subtitle}
          </p>
        </div>

        {/* Main Pricing Card */}
        <div
          className="mb-8 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '150ms',
          }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #252525 0%, #1F1F1F 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Pricing header */}
            <div className="p-8 md:p-10 pb-6 md:pb-8">
              <div className="flex flex-wrap items-baseline gap-2 mb-3">
                <span className="font-heading text-2xl md:text-3xl font-bold text-white">
                  Starting at {pricing.amount}
                </span>
                <span className="font-body text-lg md:text-xl text-white/80">
                  /{pricing.period}
                </span>
                {pricing.equivalent && (
                  <span className="font-body text-sm text-white/50">
                    ({pricing.equivalent})
                  </span>
                )}
              </div>
              <p className="font-body text-sm md:text-base text-white/60 leading-relaxed max-w-lg">
                {pricing.note}
              </p>
            </div>

            {/* ROI Section */}
            <div
              className="mx-4 md:mx-6 mb-4 md:mb-6 p-6 md:p-8 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex items-start gap-4">
                {/* Stat highlight */}
                <div
                  className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center"
                  style={{ background: colors.gradient }}
                >
                  <span className="font-heading text-lg md:text-xl font-bold text-white">
                    {roi.stat}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-heading text-base md:text-lg font-bold text-white mb-1">
                    Average salary hike
                  </h4>
                  <p className="font-body text-sm md:text-base text-white/70 leading-relaxed">
                    {roi.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee Banner - Alice Blue themed for dark mode */}
        <div
          className="mb-10 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '300ms',
          }}
        >
          <div
            className="relative p-6 md:p-8 rounded-2xl text-center overflow-hidden"
            style={{
              background: alice.light,
              border: `2px dashed ${alice.border}`,
            }}
          >
            {/* Corner accents */}
            <div
              className="absolute top-0 left-0 w-3 h-3 rounded-br-lg"
              style={{ background: alice.primary }}
            />
            <div
              className="absolute top-0 right-0 w-3 h-3 rounded-bl-lg"
              style={{ background: alice.primary }}
            />
            <div
              className="absolute bottom-0 left-0 w-3 h-3 rounded-tr-lg"
              style={{ background: alice.primary }}
            />
            <div
              className="absolute bottom-0 right-0 w-3 h-3 rounded-tl-lg"
              style={{ background: alice.primary }}
            />

            <p
              className="font-heading text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: alice.primary }}
            >
              Our Guarantee
            </p>
            <p className="font-body text-base md:text-lg text-white leading-relaxed max-w-xl mx-auto">
              {guarantee}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className="text-center mb-10 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '400ms',
          }}
        >
          <Button href="https://calendly.com/team-xperiencewave/xw-strategy" size="lg">
            Book a free strategy call
          </Button>
        </div>

        {/* Payment Options */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '500ms',
          }}
        >
          <div
            className="p-5 md:p-6 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {/* Cashfree badge */}
              <div
                className="px-5 py-2.5 rounded-lg font-heading text-sm font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                }}
              >
                Powered by Cashfree
              </div>

              {/* Payment options */}
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                {paymentOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: alice.primary }}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-body text-sm text-neutral-300">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
