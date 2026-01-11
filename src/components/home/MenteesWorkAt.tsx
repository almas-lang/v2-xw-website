'use client';

import { useEffect, useRef, useState } from 'react';

const companies = [
  ['JP Morgan', 'McKinsey', 'Intel', 'Deloitte', 'Accenture', 'Siemens'],
  ['Bosch', 'TCS', 'Sapient', 'Ericsson', 'Cognizant', 'Infosys'],
];

export default function MenteesWorkAt() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #1a1a1f 0%, #2d2d35 25%, #1f1f24 50%, #2a2a30 75%, #1a1a1f 100%)`,
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs for depth */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-[44px] font-bold text-white tracking-tight">
            Our Mentees Now Work At
          </h2>
        </div>

        {/* Company Pills Grid */}
        <div className="flex flex-col gap-4 md:gap-5 mb-12 md:mb-16">
          {companies.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap justify-center gap-3 md:gap-4"
            >
              {row.map((company, companyIndex) => {
                const delay = (rowIndex * 6 + companyIndex) * 50;
                return (
                  <div
                    key={company}
                    className="transition-all duration-500 ease-out"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                      transitionDelay: `${delay}ms`,
                    }}
                  >
                    <div
                      className="px-6 py-3 md:px-8 md:py-3.5 bg-white
                                 font-heading text-sm md:text-base font-semibold text-carbon
                                 shadow-sm hover:shadow-md
                                 hover:scale-[1.02] hover:-translate-y-0.5
                                 transition-all duration-300 cursor-default
                                 border border-g200"
                      style={{ borderRadius: '6px' }}
                    >
                      {company}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="max-w-4xl mx-auto">
          <div
            className="relative py-5 px-6 md:py-6 md:px-10 overflow-hidden"
            style={{
              borderRadius: '6px',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Inner glow effect */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
              }}
            />

            <p className="relative font-body text-sm md:text-base lg:text-lg text-white/90 text-center leading-relaxed">
              From global consulting firms to Fortune 500 tech companies - our mentees land roles at design-mature organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
