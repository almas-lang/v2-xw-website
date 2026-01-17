'use client';

import { useEffect, useRef, useState } from 'react';

const certifications = [
  {
    title: 'Core UX Design',
    issuer: 'Expwave',
    color: '#FF6B4A', // accent
  },
  {
    title: 'SAFe Practice Consultant',
    issuer: 'Scaled Agile',
    color: '#4A90A4', // alice blue
  },
  {
    title: 'Usability & UX Analyst',
    issuer: 'Human Factors Intl.',
    color: '#8B5CF6', // purple
  },
  {
    title: 'Product Ownership',
    issuer: 'Scrum Alliance',
    color: '#10B981', // green
  },
  {
    title: 'Pedagogy Master',
    issuer: 'Expwave',
    color: '#FF6B4A', // accent
  },
  {
    title: 'Service Design',
    issuer: 'Human Factors Intl.',
    color: '#F59E0B', // amber
  },
];

export default function Certifications() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(true); // Default true, will update on mount
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect if device supports hover (desktop vs touch)
    const hoverQuery = window.matchMedia('(hover: hover)');
    setCanHover(hoverQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    hoverQuery.addEventListener('change', handleChange);
    return () => hoverQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Helper: determine if card should show active/colored state
  const isCardActive = (index: number) => {
    if (!canHover) return true; // Mobile: always show colors
    return hoveredIndex === index; // Desktop: only on hover
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 50%, #0F0F0F 100%)',
      }}
    >
      {/* Large background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-heading font-bold text-[60px] sm:text-[100px] md:text-[150px] lg:text-[200px] text-white/[0.02] whitespace-nowrap tracking-wider select-none"
          style={{ transform: 'rotate(-5deg)' }}
        >
          CERTIFIED
        </span>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-1/4 w-48 md:w-72 h-48 md:h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-48 md:w-72 h-48 md:h-72 bg-alice/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-10 md:mb-14 lg:mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          {/* Decorative line with diamond */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-white/30" />
            <div className="w-2 h-2 bg-accent rotate-45" />
            <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-white/30" />
          </div>

          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
            Certified by
          </h2>
          <p className="text-g500 text-sm md:text-base max-w-md mx-auto">
            Industry-recognized credentials that back our expertise
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {certifications.map((cert, index) => {
            const active = isCardActive(index);

            return (
              <div
                key={index}
                className="group relative transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  transitionDelay: `${150 + index * 80}ms`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`
                    relative h-full p-5 md:p-6 transition-all duration-500
                    bg-white/[0.03] backdrop-blur-sm
                    border border-white/[0.08]
                    ${active ? 'bg-white/[0.06] border-white/20' : ''}
                  `}
                  style={{ borderRadius: '16px' }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-6 right-6 h-[2px] transition-all duration-500"
                    style={{
                      background: active
                        ? `linear-gradient(90deg, transparent, ${cert.color}, transparent)`
                        : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                      opacity: active ? 1 : 0.5,
                    }}
                  />

                  {/* Badge icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-500"
                      style={{
                        background: active ? `${cert.color}20` : 'rgba(255,255,255,0.05)',
                        borderRadius: '10px',
                      }}
                    >
                      {/* Shield/badge icon */}
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 transition-all duration-500"
                        style={{ color: active ? cert.color : '#666' }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>

                    {/* Verified checkmark */}
                    <div
                      className={`
                        w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500
                        ${active ? 'bg-white/10' : 'bg-transparent'}
                      `}
                    >
                      <svg
                        className="w-4 h-4 transition-all duration-500"
                        style={{ color: active ? cert.color : '#444' }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className={`
                      font-heading text-base md:text-lg font-bold mb-1 transition-colors duration-500
                      ${active ? 'text-white' : 'text-white/80'}
                    `}
                  >
                    {cert.title}
                  </h3>

                  <p
                    className="text-sm transition-colors duration-500 flex items-center gap-2"
                    style={{ color: active ? cert.color : '#888' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: active ? cert.color : '#555',
                      }}
                    />
                    {cert.issuer}
                  </p>

                  {/* Glow effect - subtle on mobile, full on desktop hover */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${cert.color}${canHover ? '08' : '05'}, transparent 70%)`,
                      opacity: active ? 1 : 0,
                      borderRadius: '16px',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <div
          className="flex items-center justify-center gap-3 mt-10 md:mt-14 lg:mt-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '800ms',
          }}
        >
          <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-g600 text-xs uppercase tracking-widest">Verified Expertise</span>
          <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-white/20" />
        </div>
      </div>
    </section>
  );
}
