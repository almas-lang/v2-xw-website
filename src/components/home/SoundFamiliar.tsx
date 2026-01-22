'use client';

import { useEffect, useRef, useState } from 'react';

const painPoints = [
  "I've applied to 50+ jobs but barely get callbacks",
  "I did courses but still can't crack senior role interviews",
  "I'm stuck doing screens while others around me get promoted",
  "I don't know what's actually wrong with my portfolio",
];

const forYouPoints = [
  { number: '01', text: "Have 2+ years experience but keep getting stuck at the same level" },
  { number: '02', text: "Tried courses, bootcamps, or certifications that didn't work" },
  { number: '03', text: "Want senior roles at product companies, not just any job" },
  { number: '04', text: "Are ready to put in the work with the right guidance" },
];

export default function SoundFamiliar() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-rotate pain points
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % painPoints.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Top Section - Pain Points */}
      <div className="bg-white relative">
        {/* Diagonal stripe accent */}
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(-45deg, #FF0023, #FF0023 2px, transparent 2px, transparent 20px)',
          }}
        />

        <div className="max-w-[1200px] mx-auto px-5 py-12 sm:py-16 md:py-24 lg:py-32">
          {/* Mobile: Title → Carousel → Subtitle | Desktop: (Title + Subtitle) left, Carousel right */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-20 lg:items-center">
            {/* Title */}
            <div
              className="order-1"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className="relative">
                {/* Large background text */}
                <span
                  className="absolute -top-6 -left-3 md:-top-8 md:-left-4 font-heading text-[80px] md:text-[180px] font-black text-g100/50 leading-none select-none pointer-events-none"
                  aria-hidden="true"
                >
                  ?
                </span>

                <h2 className="relative font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon leading-[1.1]">
                  Sound
                  <br />
                  <span className="relative inline-block">
                    Familiar
                    {/* Underline */}
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-4 text-accent/30"
                      viewBox="0 0 200 16"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,12 Q40,4 80,12 T160,12 T240,12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="text-accent">?</span>
                </h2>

                {/* Subtitle - visible only on desktop */}
                <p className="hidden lg:block mt-6 font-body text-base text-g500 max-w-md">
                  If any of these hit home, you&apos;re in the right place.
                </p>
              </div>
            </div>

            {/* Rotating Pain Points */}
            <div
              className="order-2"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
              }}
            >
              <div className="relative min-h-[120px] md:min-h-[160px] flex items-center pb-8">
                {/* Quote mark */}
                <span className="absolute -top-2 -left-1 md:-top-4 md:-left-6 font-heading text-5xl md:text-8xl text-accent/20 leading-none select-none">
                  &ldquo;
                </span>

                {/* Pain point display */}
                <div className="relative pl-6 md:pl-8">
                  {painPoints.map((point, index) => (
                    <p
                      key={index}
                      className={`absolute top-0 left-6 md:left-8 right-0 font-heading text-base md:text-xl font-medium text-carbon leading-snug transition-all duration-500 ${
                        activeIndex === index
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-4 pointer-events-none'
                      }`}
                    >
                      {point}&rdquo;
                    </p>
                  ))}

                  {/* Static placeholder for height */}
                  <p className="font-heading text-base md:text-xl font-medium text-transparent leading-snug pointer-events-none pr-4" aria-hidden="true">
                    {painPoints[0]}&rdquo;
                  </p>
                </div>

                {/* Pagination dots */}
                <div className="absolute bottom-0 left-6 md:left-8 flex gap-2">
                  {painPoints.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeIndex === index
                          ? 'bg-accent w-6'
                          : 'bg-g300 hover:bg-g400'
                      }`}
                      aria-label={`View pain point ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Subtitle - visible only on mobile, comes after carousel */}
            <div
              className="order-3 lg:hidden -mt-2"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
              }}
            >
              <p className="font-body text-sm text-g500">
                If any of these hit home, you&apos;re in the right place.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - For You */}
      <div className="relative bg-[#0A0A0A] overflow-hidden">
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 120%, rgba(255,0,35,0.06) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-[900px] mx-auto px-5 py-12 sm:py-16 md:py-24 lg:py-32 relative z-10">
          {/* Header */}
          <div
            className="mb-8 sm:mb-12 md:mb-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-accent" />
              <p className="font-body text-xs uppercase tracking-[0.2em] text-accent font-medium">Who this is for</p>
            </div>
            <h3 className="font-heading text-lg md:text-xl font-bold text-white leading-snug">
              This mentorship is for<br className="hidden md:block" /> UX/UI/Product designers who
            </h3>
          </div>

          {/* For You Points - Editorial List */}
          <div className="space-y-0">
            {forYouPoints.map((point, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.4 + index * 0.1}s`,
                }}
              >
                {/* Top border for first item */}
                {index === 0 && <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />}

                <div className="relative flex items-center gap-4 sm:gap-6 md:gap-8 py-5 sm:py-6 md:py-8 border-b border-white/10 group-hover:border-accent/30 transition-colors">
                  {/* Accent line on hover */}
                  <div className="absolute left-0 top-6 bottom-6 w-[3px] bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-full" />

                  {/* Number */}
                  <span className="font-heading text-3xl md:text-4xl font-bold text-accent md:text-white/10 group-hover:text-accent transition-colors duration-300 w-12 flex-shrink-0 pl-4">
                    {point.number}
                  </span>

                  {/* Content */}
                  <p className="font-body text-sm md:text-base text-g300 group-hover:text-white transition-colors duration-300 flex-1">
                    {point.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div
            className="mt-12 md:mt-16 lg:mt-20"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
            }}
          >
            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-alice/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-alice" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-body text-sm md:text-base text-g400">
                Not for designers looking for quick certificates or magic shortcuts.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
