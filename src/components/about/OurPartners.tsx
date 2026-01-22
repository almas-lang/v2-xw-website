'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const partners = [
  { name: 'Google', tier: 'featured', logo: '/images/logos/Google/Google_Logo_0.svg' },
  { name: 'Meta', tier: 'featured', logo: '/images/logos/Meta/Meta_idlf4cVSsS_0.svg' },
  { name: 'LinkedIn', tier: 'featured', logo: '/images/logos/LinkedIn/LinkedIn_Logo_0.svg' },
  { name: 'AWS', tier: 'featured', logo: '/images/logos/Amazon Web Services/Amazon Web Services_idS5TK0MYh_0.svg' },
  { name: 'Figma', tier: 'standard', logo: '/images/logos/Figma/Figma_Logo_0.svg' },
  { name: 'Nxuniq', tier: 'standard', logo: '/images/logos/nxuniq.png' },
  { name: 'Cashfree', tier: 'standard', logo: '/images/logos/Cashfree Payments/Cashfree Payments_idzBxeINHs_0.svg' },
  { name: 'Aisensy', tier: 'standard', logo: '/images/logos/Aisensy.png' },
  { name: 'Brevo', tier: 'standard', logo: '/images/logos/Brevo/Brevo_idgQGSgZ6E_0.svg' },
  { name: 'Uizard', tier: 'standard', logo: '/images/logos/Uizard.png' },
  { name: "It's Brown & Roasted", tier: 'standard', logo: '/images/logos/itsbrownandroasted.jpg' },
];

export default function OurPartners() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featuredPartners = partners.filter(p => p.tier === 'featured');
  const standardPartners = partners.filter(p => p.tier === 'standard');

  return (
    <section
      ref={sectionRef}
      className="relative pt-10 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 50%, #FAFAFA 100%)',
      }}
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPattern" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1A1A1A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>

        {/* Soft gradient overlays */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#D4A853]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-alice/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon">
            Our Partners
          </h2>
        </div>

        {/* Featured Partners - Larger boxes */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '150ms',
          }}
        >
          {featuredPartners.map((partner, index) => (
            <div
              key={partner.name}
              className="group relative bg-white border border-g200 hover:border-carbon/20 transition-all duration-500"
              style={{
                borderRadius: '16px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${200 + index * 80}ms`,
              }}
            >
              <div className="flex items-center justify-center h-20 md:h-24 px-4">
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={40}
                    className="object-contain"
                    style={{ maxHeight: '36px', width: 'auto' }}
                  />
                ) : (
                  <span className="font-heading font-bold text-base md:text-lg text-carbon/80 group-hover:text-carbon transition-colors duration-300 text-center">
                    {partner.name}
                  </span>
                )}
              </div>
              {/* Subtle accent line on hover */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#D4A853] group-hover:w-1/2 transition-all duration-500"
                style={{ borderRadius: '2px' }}
              />
            </div>
          ))}
        </div>

        {/* Standard Partners - Smaller, marquee-style row */}
        <div
          className="relative overflow-hidden transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '400ms',
          }}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div className="flex gap-4 animate-marquee">
            {[...standardPartners, ...standardPartners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 px-5 py-3 bg-g50 border border-g100 hover:bg-white hover:border-g200 transition-all duration-300 flex items-center justify-center min-w-[120px] h-[48px]"
                style={{ borderRadius: '10px' }}
              >
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={100}
                    height={28}
                    className="object-contain"
                    style={{ maxHeight: '24px', width: 'auto' }}
                  />
                ) : (
                  <span className="text-g500 hover:text-carbon text-sm font-medium whitespace-nowrap transition-colors duration-300">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicator */}
        <div
          className="flex items-center justify-center gap-2 mt-10 md:mt-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '600ms',
          }}
        >
          <div className="flex -space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#D4A853]"
                style={{ opacity: 1 - i * 0.25 }}
              />
            ))}
          </div>
          <p className="text-g400 text-sm">
            <span className="font-semibold text-carbon">3000+</span> designers consulted across these organizations
          </p>
        </div>
      </div>

      {/* Marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
