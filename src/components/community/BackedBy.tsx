'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SponsorModal from './SponsorModal';

const sponsors = [
  { type: 'Powered by', name: 'WaveMakers Connect', logo: '/images/wmc-logo.png', color: '#6366f1' },
  { type: 'F&B Partner', name: "It's Brown and Roasted", logo: '/images/logos/itsbrownandroasted.jpg', color: '#92400e' },
];

export default function BackedBy() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-[#fffbf7] via-white to-[#faf7f5] overflow-hidden"
    >
      {/* Soft grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm gradient blobs - responsive */}
      <div
        className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-[150px] sm:w-[200px] md:w-[250px] h-[150px] sm:h-[200px] md:h-[250px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)',
          filter: 'blur(30px)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-out',
        }}
      />
      <div
        className="absolute -bottom-5 sm:-bottom-10 -right-5 sm:-right-10 w-[120px] sm:w-[160px] md:w-[200px] h-[120px] sm:h-[160px] md:h-[200px] rounded-full pointer-events-none hidden sm:block"
        style={{
          background: 'radial-gradient(circle, rgba(180, 83, 9, 0.05) 0%, transparent 70%)',
          filter: 'blur(25px)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 1s ease-out 0.2s',
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Heart */}
        <svg className="absolute top-8 right-[15%] w-5 h-5 opacity-[0.08] hidden lg:block" viewBox="0 0 24 24" fill="#ec4899">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        {/* Star */}
        <svg className="absolute bottom-12 left-[10%] w-4 h-4 opacity-[0.1] hidden lg:block" viewBox="0 0 24 24" fill="#fbbf24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        {/* Handshake icon */}
        <svg className="absolute top-1/2 left-[5%] w-6 h-6 opacity-[0.06] hidden lg:block" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
          <path d="M18 8.5V6a2 2 0 00-2-2h-1.172a2 2 0 00-1.414.586L12 6l-1.414-1.414A2 2 0 009.172 4H8a2 2 0 00-2 2v2.5M3 14h3l3 3 6-6 3 3h3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-14 md:py-16 lg:py-20">
        {/* Two column layout */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">

          {/* Left: Header + CTA */}
          <div
            className="lg:max-w-[320px]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out',
            }}
          >
            <div className="relative inline-block mb-3">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900">
                Backed By
              </h2>
              {/* Decorative underline */}
              <svg className="absolute -bottom-1 left-0 w-24 h-2" viewBox="0 0 96 8" fill="none">
                <path d="M2 5 Q 24 1, 48 5 T 94 4" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />
              </svg>
            </div>
            <p className="text-neutral-500 text-base mb-6">
              Partners who make this possible
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-semibold text-sm sm:text-base rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-0.5"
            >
              {/* Button glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  filter: 'blur(15px)',
                  transform: 'translateY(4px)',
                }}
              />
              Sponsor with Us
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>

          {/* Right: Sponsor cards with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-5 lg:gap-6">
            {sponsors.map((sponsor, index) => (
              <div
                key={sponsor.name}
                className="group relative flex-1 sm:w-[260px] lg:w-[300px]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? `translateY(0) rotate(${index === 0 ? -1 : 1}deg)`
                    : 'translateY(20px)',
                  transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.1 + index * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gradient border on hover */}
                <div
                  className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${sponsor.color}, ${sponsor.color}40, ${sponsor.color})`,
                  }}
                />

                <div
                  className="relative h-full p-5 bg-white rounded-2xl transition-all duration-500"
                  style={{
                    boxShadow: hoveredIndex === index
                      ? `0 20px 40px -12px ${sponsor.color}25`
                      : '0 4px 12px rgba(0,0,0,0.03)',
                    transform: hoveredIndex === index ? 'scale(1.02) rotate(0deg)' : 'rotate(0deg)',
                  }}
                >
                  {/* Accent line at top */}
                  <div
                    className="absolute top-0 left-4 right-4 h-0.5 rounded-full transition-all duration-500"
                    style={{
                      background: hoveredIndex === index
                        ? `linear-gradient(90deg, transparent, ${sponsor.color}, transparent)`
                        : `linear-gradient(90deg, transparent, ${sponsor.color}30, transparent)`,
                    }}
                  />

                  {/* Type label with icon */}
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: hoveredIndex === index ? sponsor.color : `${sponsor.color}40`,
                      }}
                    />
                    <span
                      className="text-xs font-semibold uppercase tracking-wider transition-colors duration-300"
                      style={{ color: hoveredIndex === index ? sponsor.color : '#9ca3af' }}
                    >
                      {sponsor.type}
                    </span>
                  </div>

                  {/* Logo with gradient background */}
                  <div
                    className="aspect-[2/1] rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500 p-4"
                    style={{
                      background: index === 0
                        ? '#1a1a2e'
                        : hoveredIndex === index
                          ? `linear-gradient(135deg, ${sponsor.color}08, ${sponsor.color}15)`
                          : 'linear-gradient(135deg, #f5f5f5, #fafafa)',
                    }}
                  >
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={200}
                      height={80}
                      className="w-auto h-full max-h-16 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Corner decoration */}
                  <div
                    className="absolute bottom-3 right-3 w-3 h-3 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                    style={{ backgroundColor: sponsor.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      {/* Sponsor Modal */}
      <SponsorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
