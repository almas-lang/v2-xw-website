'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Logo paths mapping
const companyLogos: Record<string, { path: string; width: number; height: number }> = {
  'JP Morgan': { path: '/images/logos/jpmorgan', width: 120, height: 40 },
  'McKinsey': { path: '/images/logos/McKinsey & Company/McKinsey.png', width: 120, height: 40 },
  'Intel': { path: '/images/logos/Intel/Intel_idF_neNFIz_0.svg', width: 80, height: 32 },
  'Deloitte': { path: '/images/logos/Deloitte/Deloitte_idXbysKEDR_0.svg', width: 100, height: 32 },
  'Accenture': { path: '/images/logos/Accenture/Accenture_id4vRrAYpl_0.svg', width: 110, height: 32 },
  'Siemens': { path: '/images/logos/Siemens/Siemens_id0if2F9r8_0.svg', width: 100, height: 32 },
  'Bosch': { path: '/images/logos/Bosch/Bosch_idi5e7gC2E_0.svg', width: 100, height: 32 },
  'TCS': { path: '/images/logos/Tata Consultancy Services/Tata_Consultancy_Services_old_logo.png', width: 120, height: 40 },
  'Sapient': { path: '/images/logos/Sapient.png', width: 100, height: 32 },
  'Ericsson': { path: '/images/logos/Ericsson/Ericsson_id130lHJL9_0.svg', width: 100, height: 32 },
  'Cognizant': { path: '/images/logos/Cognizant/Cognizant_idqBwjBQXB_0.svg', width: 110, height: 32 },
  'Infosys': { path: '/images/logos/Infosys/Infosys_idxq8SaZnR_0.svg', width: 90, height: 32 },
  'Google': { path: '/images/logos/Google/Google_Logo_0.svg', width: 90, height: 32 },
  'Meta': { path: '/images/logos/Meta/Meta_idlf4cVSsS_0.svg', width: 90, height: 32 },
  'LinkedIn': { path: '/images/logos/LinkedIn/LinkedIn_Logo_0.svg', width: 100, height: 32 },
  'AWS': { path: '/images/logos/Amazon Web Services/Amazon Web Services_idS5TK0MYh_0.svg', width: 50, height: 32 },
  'Figma': { path: '/images/logos/Figma/Figma_Logo_0.svg', width: 80, height: 32 },
};

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
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon tracking-tight transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {title}
          </h2>
        </div>

        {/* Company Logos Grid */}
        <div className="flex flex-col gap-4 md:gap-5 mb-10 md:mb-14">
          {companies.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap justify-center items-center gap-3 md:gap-4"
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
                    <div className="px-6 py-4 md:px-8 md:py-5 bg-white border border-g200 rounded-xl flex items-center justify-center min-w-[140px] md:min-w-[160px] h-[60px] md:h-[70px] hover:border-g300 hover:shadow-sm transition-all duration-300">
                      {companyLogos[company] ? (
                        <Image
                          src={companyLogos[company].path}
                          alt={company}
                          width={companyLogos[company].width}
                          height={companyLogos[company].height}
                          className="object-contain"
                          style={{ maxHeight: '32px', width: 'auto' }}
                        />
                      ) : (
                        <span className="font-heading text-base md:text-lg font-semibold text-carbon">
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
