'use client';

import { useEffect, useRef, useState } from 'react';

const testimonials = [
  { id: 1, instagramUrl: 'https://www.instagram.com/reel/DGu7JDUPg15/embed/' },
  { id: 2, instagramUrl: 'https://www.instagram.com/reel/DOs9K9tjWIx/embed/' },
  { id: 3, instagramUrl: 'https://www.instagram.com/p/DLSJFreTQAW/embed/' },
];

const cardColors = ['#6366f1', '#8b5cf6', '#a78bfa'];

export default function WhatAttendeesSay() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      className="relative bg-[#0a0118] overflow-hidden"
    >
      {/* Animated gradient blobs - responsive */}
      <div
        className="absolute bottom-0 left-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: isVisible ? 1 : 0,
          animation: 'floatBlob 12s ease-in-out infinite',
          transition: 'opacity 1s ease-out',
        }}
      />
      <div
        className="absolute top-0 right-0 w-[150px] sm:w-[220px] md:w-[300px] h-[150px] sm:h-[220px] md:h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          filter: 'blur(35px)',
          opacity: isVisible ? 1 : 0,
          animation: 'floatBlob 15s ease-in-out infinite reverse',
          transition: 'opacity 1s ease-out 0.2s',
        }}
      />

      {/* Geometric patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -top-4 right-[10%] w-40 h-40 opacity-[0.04] hidden lg:block" viewBox="0 0 100 100">
          <defs>
            <pattern id="plusPattern" patternUnits="userSpaceOnUse" width="25" height="25">
              <path d="M 12.5 8 L 12.5 17 M 8 12.5 L 17 12.5" stroke="white" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#plusPattern)" />
        </svg>

        <svg className="absolute top-1/3 left-[6%] w-8 h-8 opacity-[0.1] hidden lg:block" viewBox="0 0 24 24">
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" stroke="white" strokeWidth="1.5" fill="none">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="20s" repeatCount="indefinite" />
          </path>
        </svg>

        <svg className="absolute bottom-1/4 right-[8%] w-10 h-10 opacity-[0.08] hidden lg:block" viewBox="0 0 40 40">
          <rect x="10" y="10" width="20" height="20" fill="none" stroke="white" strokeWidth="1" transform="rotate(45 20 20)" />
        </svg>

        <div className="absolute top-20 right-[20%] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-white/[0.08] hidden md:block" />
        <div className="absolute bottom-1/3 left-[12%] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[7px] border-t-white/[0.1] hidden lg:block" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-16 md:py-20 lg:py-24">
        {/* Header with glowing quote */}
        <div
          className="text-center mb-10 md:mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          {/* Decorative quote marks */}
          <div className="flex justify-center mb-4">
            <svg
              className="w-10 h-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{
                color: 'rgba(99, 102, 241, 0.3)',
                filter: isVisible ? 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.4))' : 'none',
                transition: 'filter 1s ease-out 0.5s',
              }}
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            What Attendees Say
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="mb-10 md:mb-14">
          {/* Mobile: Horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:hidden -mx-5 px-5">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[280px] snap-start"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                  transition: `all 0.5s ease-out ${0.1 + index * 0.1}s`,
                }}
              >
                <TestimonialCard testimonial={testimonial} index={index} color={cardColors[index]} />
              </div>
            ))}
          </div>

          {/* Desktop: Grid with floating effect */}
          <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="relative"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? `translateY(${hoveredIndex === index ? -8 : 0}px) rotate(${hoveredIndex === index ? 0 : (index === 1 ? 0 : index === 0 ? -1 : 1)}deg)`
                    : 'translateY(30px)',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: isVisible ? `${0.1 + index * 0.1}s` : '0s',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  index={index}
                  isHovered={hoveredIndex === index}
                  color={cardColors[index]}
                />
              </div>
            ))}
          </div>
        </div>

        {/* See more link */}
        <div
          className="flex justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.5s',
          }}
        >
          <a
            href="https://www.instagram.com/xperience_wave/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            See more of what people say
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

      {/* Animations */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
  isHovered = false,
  color,
}: {
  testimonial: { id: number; instagramUrl?: string };
  index: number;
  isHovered?: boolean;
  color: string;
}) {
  return (
    <div className="relative h-full group">
      {/* Animated gradient border */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}, transparent, ${color})`,
          backgroundSize: '200% 200%',
          animation: 'gradientBorder 3s ease infinite',
        }}
      />

      <div
        className={`relative h-full bg-[#0a0118] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${isHovered ? 'border-transparent' : ''}`}
      >
        {/* Video/Instagram embed area */}
        <div className="aspect-[9/16] bg-white/[0.02] flex items-center justify-center relative overflow-hidden">
          {testimonial.instagramUrl ? (
            <iframe
              src={testimonial.instagramUrl}
              className="w-full h-full border-0"
              allowFullScreen
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          ) : (
            <>
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${color}20 0%, transparent 70%)`,
                }}
              />

              {/* Video placeholder icon */}
              <div className="text-center relative z-10">
                <svg
                  className="w-12 h-12 mx-auto transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                  style={{
                    color: isHovered ? color : 'rgba(255,255,255,0.2)',
                    filter: isHovered ? `drop-shadow(0 0 10px ${color}60)` : 'none',
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
              </div>
            </>
          )}
        </div>

        {/* Number badge with glow */}
        <div
          className="absolute top-3 right-3 w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center transition-all duration-300 z-10"
          style={{
            backgroundColor: isHovered ? color : 'rgba(255,255,255,0.05)',
            color: isHovered ? 'white' : 'rgba(255,255,255,0.3)',
            boxShadow: isHovered ? `0 0 15px ${color}50` : 'none',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
