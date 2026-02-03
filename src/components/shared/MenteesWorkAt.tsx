'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Logo paths mapping
const companyLogos: Record<string, { path: string; width: number; height: number }> = {
  'JP Morgan': { path: '/images/jpmorgan.png', width: 120, height: 40 },
  'McKinsey': { path: '/images/McKinsey.png', width: 120, height: 40 },
  'Intel': { path: '/images/Intel.png', width: 80, height: 32 },
  'Deloitte': { path: '/images/Deloitte.png', width: 100, height: 32 },
  'Accenture': { path: '/images/Accenture.png', width: 110, height: 32 },
  'Siemens': { path: '/images/Siemens.png', width: 100, height: 32 },
  'Bosch': { path: '/images/Bosch.png', width: 100, height: 32 },
  'TCS': { path: '/images/Tata_Consultancy_Services.png', width: 120, height: 40 },
  'Sapient': { path: '/images/Sapient.png', width: 100, height: 32 },
  'Ericsson': { path: '/images/Ericsson.png', width: 100, height: 32 },
  'Cognizant': { path: '/images/Cognizant.png', width: 110, height: 32 },
  'Infosys': { path: '/images/Infosys.png', width: 90, height: 32 },
  'Google': { path: '/images/Google.png', width: 90, height: 32 },
  'Meta': { path: '/images/Meta.png', width: 90, height: 32 },
  'LinkedIn': { path: '/images/LinkedIn.png', width: 100, height: 32 },
  'AWS': { path: '/images/AWS.png', width: 50, height: 32 },
  'Figma': { path: '/images/Figma-Logo.png', width: 80, height: 32 },
};

const defaultCompanies = [
  ['JP Morgan', 'McKinsey', 'Intel', 'Deloitte', 'Accenture'],
  ['Siemens', 'Bosch', 'TCS', 'Sapient', 'Ericsson', 'Cognizant', 'Infosys'],
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
      className="relative py-12 sm:py-16 md:py-24 lg:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 50%, #FAFAFA 100%)',
      }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="menteesGrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1A1A1A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#menteesGrid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <div
            className="flex items-center justify-center gap-3 mb-4 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="w-8 h-[2px] bg-accent" />
            <span className="font-body text-xs uppercase tracking-[0.2em] text-accent font-medium">Where They Work</span>
            <div className="w-8 h-[2px] bg-accent" />
          </div>
          <h2
            className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon tracking-tight transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '100ms',
            }}
          >
            {title}
          </h2>
        </div>

        {/* Company Logos Grid */}
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10 md:mb-14">
          {companies.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4"
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
                    <div className="px-3 py-3 sm:px-4 sm:py-3.5 md:px-6 md:py-5 bg-white border border-g200 rounded-lg sm:rounded-xl flex items-center justify-center min-w-[90px] sm:min-w-[110px] md:min-w-[140px] h-[50px] sm:h-[56px] md:h-[70px] hover:border-g300 hover:shadow-sm transition-all duration-300">
                      {companyLogos[company] ? (
                        <Image
                          src={companyLogos[company].path}
                          alt={company}
                          width={companyLogos[company].width}
                          height={companyLogos[company].height}
                          className="object-contain max-h-[24px] sm:max-h-[28px] md:max-h-[32px] w-auto"
                        />
                      ) : (
                        <span className="font-heading text-sm sm:text-base md:text-lg font-semibold text-carbon">
                          {company}
                        </span>
                      )}
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
          <p className="font-body text-sm md:text-base text-g500 text-center leading-relaxed">
            {footerText}
          </p>
        </div>
      </div>
    </section>
  );
}
