'use client';

import { useState, useEffect } from 'react';

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen bg-white relative overflow-hidden flex items-center">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#e5e5e5 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Accent glow - top right */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-[0.06] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #FF0023 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left - Content */}
          <div>
            {/* Eyebrow */}
            <div
              className="mb-5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <h1 className="inline-flex items-center gap-3 text-g500 text-sm font-medium tracking-[0.15em] uppercase">
                <span className="w-8 h-px bg-accent" />
                About Xperience Wave
              </h1>
            </div>

            {/* Main headline */}
            <h2
              className="font-heading text-4xl sm:text-5xl md:text-[56px] font-bold text-carbon leading-[1.1] tracking-[-0.02em] mb-5"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
              }}
            >
              <span className="text-accent">13+ Years</span> Building
              <br />
              Products for <span className="text-accent">Millions.</span>
            </h2>

            {/* Description */}
            <p
              className="font-body text-base md:text-lg text-g600 leading-relaxed max-w-[480px] mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
              }}
            >
              We&apos;ve delivered banking systems, enterprise software, SaaS products,
              consumer apps, and wealth management ecosystems.
            </p>

            {/* Stats row */}
            <div
              className="flex flex-wrap gap-2"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }}
            >
              <div className="px-3 py-2 bg-g100 border border-g200 rounded-full">
                <span className="text-carbon text-sm font-medium">1Cr+ users impacted</span>
              </div>
              <div className="px-3 py-2 bg-g100 border border-g200 rounded-full">
                <span className="text-carbon text-sm font-medium">20+ products shipped</span>
              </div>
              <div className="px-3 py-2 bg-accent/10 border border-accent/20 rounded-full">
                <span className="text-accent text-sm font-medium">3000+ designers consulted</span>
              </div>
            </div>
          </div>

          {/* Right - Image placeholder */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            <div className="aspect-square max-w-[480px] ml-auto rounded-2xl bg-g100 border border-g200 flex items-center justify-center">
              <span className="text-g400 text-sm">Hero Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
