'use client';

import { useEffect, useRef } from 'react';

export default function WhatIsVividYellow() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f5f5f5] py-20 md:py-28 lg:py-32 overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon">
            What is <span className="text-yellow-500">Vivid Yellow</span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left - Sticky Note */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Shadow under sticky */}
              <div className="absolute -bottom-3 left-4 right-4 h-8 bg-black/10 rounded-lg blur-xl" />

              {/* Sticky Note */}
              <div
                className="relative bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-400 p-8 py-12 md:p-10 md:py-16 rounded-sm shadow-lg"
                style={{
                  transform: 'rotate(-2deg)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)'
                }}
              >
                {/* Tape effect at top */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/40 backdrop-blur-sm"
                  style={{
                    transform: 'rotate(2deg)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />

                {/* Content */}
                <div className="relative">
                  <p className="font-body text-base md:text-lg text-black/80 italic leading-relaxed mb-6">
                    Every product started as a scribble on a{' '}
                    <span className="font-semibold text-black">(vivid) yellow</span> sticky.
                  </p>
                  <p className="font-body text-base md:text-lg text-black/80 italic leading-relaxed">
                    This podcast is those conversations.
                  </p>
                </div>

                {/* Slight fold effect bottom right */}
                <div
                  className="absolute bottom-0 right-0 w-8 h-8"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.05) 50%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right - Body Content */}
          <div className="lg:col-span-7 space-y-6">
            <p className="font-body text-base md:text-lg text-g600 leading-relaxed">
              Vivid Yellow is a podcast that goes beyond surface-level industry talk.
            </p>

            <p className="font-body text-base md:text-lg text-g600 leading-relaxed">
              Every episode is a conversation - not an interview. We sit down with designers, product leaders, founders, and makers who are building real products.
            </p>

            <p className="font-body text-base md:text-lg text-g600 leading-relaxed">
              We explore the questions that don&apos;t get asked in polished conference talks: How did you actually navigate that career pivot? What does your real process look like? How do you balance craft with business realities?
            </p>

            {/* Episode Schedule Badge */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-carbon rounded-full">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="font-heading text-base font-semibold text-white">
                  New episodes drop bi-weekly.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
