'use client';

import { useEffect, useRef, useState } from 'react';

const defaultCompanies = [
  ['JP Morgan', 'McKinsey', 'Intel', 'Deloitte', 'Accenture', 'Siemens'],
  ['Bosch', 'TCS', 'Sapient', 'Ericsson', 'Cognizant', 'Infosys'],
];

interface MenteesWorkAtProps {
  title?: string;
  companies?: string[][];
  footerText?: string;
}

export default function MenteesWorkAt({
  title = 'Our Mentees Now Work At',
  companies = defaultCompanies,
  footerText = 'From global consulting firms to Fortune 500 tech companies - our mentees land roles at design-mature organizations.',
}: MenteesWorkAtProps) {
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
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 40%, #0F1419 70%, #0F0F0F 100%)',
      }}
    >
      {/* Gradient orbs */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] opacity-[0.15]"
        style={{
          background: 'radial-gradient(circle, #4A90A4 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #E85A4F 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Geometric accents */}
      <div className="absolute top-12 right-12 md:top-20 md:right-20 opacity-[0.08]">
        <div className="w-32 h-32 rounded-full border" style={{ borderColor: '#4A90A4' }} />
        <div className="absolute top-6 left-6 w-20 h-20 rounded-full border" style={{ borderColor: '#4A90A4' }} />
      </div>
      <div className="absolute bottom-16 left-8 md:bottom-24 md:left-16 opacity-[0.06]">
        <div className="w-20 h-20 rotate-45 border" style={{ borderColor: '#E85A4F' }} />
        <div className="absolute top-3 left-3 w-14 h-14 rotate-45 border" style={{ borderColor: '#E85A4F' }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {title}
          </h2>
        </div>

        {/* Company Pills Grid */}
        <div className="flex flex-col gap-4 md:gap-5 mb-10 md:mb-14">
          {companies.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap justify-center gap-3 md:gap-4"
            >
              {row.map((company, companyIndex) => {
                const delay = (rowIndex * 6 + companyIndex) * 50;
                const useAlice = (rowIndex + companyIndex) % 2 === 0;
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
                      className="px-6 py-3 md:px-8 md:py-3.5
                                 font-heading text-sm md:text-base font-semibold text-white
                                 hover:scale-[1.04] hover:-translate-y-0.5
                                 transition-all duration-300 cursor-default
                                 rounded-lg backdrop-blur-sm"
                      style={{
                        background: useAlice
                          ? 'rgba(74, 144, 164, 0.15)'
                          : 'rgba(255, 255, 255, 0.08)',
                        border: useAlice
                          ? '1px solid rgba(74, 144, 164, 0.3)'
                          : '1px solid rgba(255, 255, 255, 0.12)',
                      }}
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
        <div
          className="max-w-3xl mx-auto transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '400ms',
          }}
        >
          <p className="font-body text-sm md:text-base text-neutral-400 text-center leading-relaxed">
            {footerText}
          </p>
        </div>
      </div>
    </section>
  );
}
