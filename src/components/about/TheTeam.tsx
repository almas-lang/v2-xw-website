'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const founders = [
  {
    name: 'Almas Tasneem',
    role: 'CEO & Co-founder',
    linkedin: 'https://linkedin.com/in/almastasneem',
    website: 'https://almastasneem.com',
    initials: 'AT',
    color: '#E85A4F',
  },
  {
    name: 'Shaik Murad',
    role: 'Head of Product & Co-founder',
    linkedin: 'https://linkedin.com/in/shaikmurad',
    website: 'https://shaikmurad.com',
    initials: 'SM',
    color: '#4A90A4',
  },
];

const advisors = [
  {
    name: 'Fatima Sultana',
    role: 'Product & Leadership Advisor',
    linkedin: 'https://linkedin.com/in/fatimasultana',
    initials: 'FS',
  },
  {
    name: 'Rishik Jha',
    role: 'Design Consultant',
    linkedin: 'https://linkedin.com/in/rishikjha',
    initials: 'RJ',
  },
  {
    name: 'Ankit Sharma',
    role: 'Tech Consultant',
    linkedin: 'https://linkedin.com/in/ankitsharma',
    initials: 'AS',
  },
];

export default function TheTeam() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFounder, setActiveFounder] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleFounderInteraction = (index: number | null) => {
    if (canHover) setActiveFounder(index);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#FAFBFC] py-20 md:py-28 lg:py-36">
      {/* Geometric background pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Diagonal lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalLines" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M-10,10 l20,-20 M0,40 l40,-40 M30,50 l20,-20" stroke="#1A1A1A" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>

        {/* Accent color blobs */}
        <div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #E85A4F 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #4A90A4 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        {/* Header - Bold editorial style */}
        <div
          className="mb-16 md:mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-1 bg-accent" style={{ borderRadius: '2px' }} />
            <span className="text-accent text-xs font-bold uppercase tracking-[0.15em]">
              Meet the team
            </span>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon leading-[1.1]">
            The Team
          </h2>
        </div>

        {/* Founders Section */}
        <div className="mb-20 md:mb-24">
          <div
            className="flex items-center gap-3 mb-10 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDelay: '100ms',
            }}
          >
            <span className="text-accent font-heading font-bold text-sm uppercase tracking-wider">Founders</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent max-w-[150px]" />
          </div>

          {/* Founders Grid - Offset layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {founders.map((founder, index) => (
              <div
                key={index}
                className={`group relative ${index === 1 ? 'lg:mt-12' : ''}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transitionDuration: '700ms',
                  transitionDelay: `${150 + index * 100}ms`,
                }}
                onMouseEnter={() => handleFounderInteraction(index)}
                onMouseLeave={() => handleFounderInteraction(null)}
              >
                <div
                  className="relative bg-white overflow-hidden transition-all duration-500 hover:shadow-xl"
                  style={{
                    borderRadius: '20px',
                    border: '1px solid #E8EAED',
                  }}
                >
                  {/* Colored top bar */}
                  <div
                    className="h-1.5 w-full transition-all duration-500"
                    style={{
                      background: activeFounder === index
                        ? founder.color
                        : `linear-gradient(90deg, ${founder.color}40 0%, ${founder.color}10 100%)`,
                    }}
                  />

                  <div className="p-6 md:p-8">
                    {/* Top: Initials + Number */}
                    <div className="flex items-start justify-between mb-8">
                      {/* Large initials with colored background */}
                      <div
                        className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center font-heading font-bold text-2xl md:text-3xl text-white transition-all duration-500 group-hover:scale-105"
                        style={{
                          borderRadius: '16px',
                          background: `linear-gradient(135deg, ${founder.color} 0%, ${founder.color}DD 100%)`,
                          boxShadow: activeFounder === index ? `0 8px 30px ${founder.color}40` : 'none',
                        }}
                      >
                        {founder.initials}
                      </div>

                      {/* Number badge */}
                      <div
                        className="w-10 h-10 flex items-center justify-center font-heading font-bold text-sm transition-colors duration-500"
                        style={{
                          borderRadius: '10px',
                          background: activeFounder === index ? founder.color : '#F3F4F6',
                          color: activeFounder === index ? '#fff' : '#9CA3AF',
                        }}
                      >
                        0{index + 1}
                      </div>
                    </div>

                    {/* Name & Role */}
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-carbon mb-2 leading-tight">
                      {founder.name}
                    </h3>
                    <p className="text-g500 text-sm md:text-base mb-6">
                      {founder.role}
                    </p>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                      <Link
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-carbon text-white text-sm font-medium hover:bg-carbon/90 transition-all duration-300"
                        style={{ borderRadius: '10px' }}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </Link>
                      <Link
                        href={founder.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300"
                        style={{
                          borderRadius: '10px',
                          background: `${founder.color}15`,
                          color: founder.color,
                        }}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        Website
                      </Link>
                    </div>
                  </div>

                  {/* Decorative corner shape */}
                  <div
                    className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-[0.05] transition-all duration-500 group-hover:opacity-[0.1] group-hover:scale-125"
                    style={{ background: founder.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advisors Section */}
        <div>
          <div
            className="flex items-center gap-3 mb-8 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDelay: '400ms',
            }}
          >
            <span className="font-heading font-bold text-sm uppercase tracking-wider" style={{ color: '#4A90A4' }}>
              Advisors
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-alice/30 to-transparent max-w-[150px]" />
          </div>

          {/* Advisors - Horizontal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {advisors.map((advisor, index) => (
              <Link
                key={index}
                href={advisor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white p-5 transition-all duration-500 hover:shadow-lg"
                style={{
                  borderRadius: '16px',
                  border: '1px solid #E8EAED',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${500 + index * 80}ms`,
                }}
              >
                {/* Initials */}
                <div
                  className="w-12 h-12 mb-4 flex items-center justify-center font-heading font-bold text-sm transition-all duration-300 group-hover:scale-110"
                  style={{
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #4A90A420 0%, #4A90A410 100%)',
                    color: '#4A90A4',
                  }}
                >
                  {advisor.initials}
                </div>

                <h4 className="font-heading text-lg font-bold text-carbon mb-1 group-hover:text-accent transition-colors duration-300">
                  {advisor.name}
                </h4>
                <p className="text-sm text-g500 mb-3">
                  {advisor.role}
                </p>

                {/* LinkedIn indicator */}
                <div className="flex items-center gap-2 text-g400 text-sm group-hover:text-carbon transition-colors duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>Connect</span>
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(90deg, #4A90A4 0%, #4A90A480 100%)',
                    borderRadius: '0 0 16px 16px',
                  }}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          className="mt-16 md:mt-20 text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '750ms',
          }}
        >
          <p className="text-g500 text-sm md:text-base">
            We're a tight-knit team that moves fast and cares deeply.{' '}
            <span className="text-carbon font-medium">Want to join us?</span>
          </p>
        </div>
      </div>
    </section>
  );
}
