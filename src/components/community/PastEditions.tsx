'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Past edition images (from 3 editions so far)
const editionImages = [
  { src: '/images/community-pe1.jpg', label: 'Edition #1' },
  { src: '/images/community-pe2.jpg', label: 'Edition #1' },
  { src: '/images/community-pe3.jpg', label: 'Edition #2' },
  { src: '/images/community-pe4.jpg', label: 'Edition #2' },
  { src: '/images/community-pe5.JPG', label: 'Edition #3' },
  { src: '/images/community-pe6.JPG', label: 'Edition #3' },
  { src: '/images/community-pe7.jpg', label: 'Edition #3' },
];

// Tape/pin colors for polaroid styling
const tapeColors = ['#fcd34d', '#fbbf24', '#f59e0b', '#fde68a', '#fef3c7'];
const pinColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

export default function PastEditions() {
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
      className="relative bg-gradient-to-b from-[#fffbf5] via-white to-[#faf8f5] overflow-hidden"
    >
      {/* Soft grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm gradient blobs */}
      <div
        className="absolute top-0 right-0 w-[40%] h-[50%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(251, 191, 36, 0.08) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[35%] h-[40%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Scattered decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Camera icon */}
        <svg className="absolute top-16 left-[8%] w-8 h-8 opacity-[0.08] hidden lg:block" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        {/* Star */}
        <svg className="absolute bottom-24 right-[10%] w-6 h-6 opacity-[0.1] hidden lg:block" viewBox="0 0 24 24" fill="#fbbf24" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        {/* Heart */}
        <svg className="absolute top-1/3 right-[5%] w-5 h-5 opacity-[0.08] hidden lg:block" viewBox="0 0 24 24" fill="#ec4899" stroke="none">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-16 md:py-20 lg:py-24">
        {/* Header - centered with decorative line */}
        <div
          className="text-center mb-10 md:mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <div className="relative inline-block">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              From Past Editions
            </h2>
            {/* Wavy underline */}
            <svg className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-40 h-2" viewBox="0 0 160 8" fill="none">
              <path d="M2 4 Q 20 0, 40 4 T 80 4 T 120 4 T 158 4" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            </svg>
          </div>
          <p className="text-neutral-600 text-lg mt-2">
            Moments from Bangalore's design and tech meetup.
          </p>
        </div>

        {/* Image collage - Polaroid style */}
        <div className="relative">
          {/* Mobile: Horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:hidden -mx-5 px-5">
            {editionImages.slice(0, 5).map((edition, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[260px] snap-start"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? `translateX(0) rotate(${index % 2 === 0 ? -2 : 2}deg)` : 'translateX(20px)',
                  transition: `all 0.5s ease-out ${0.1 + index * 0.08}s`,
                }}
              >
                <div className="relative bg-white p-2 pb-10 rounded-sm shadow-lg">
                  {/* Tape decoration */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 rounded-sm opacity-80"
                    style={{
                      background: tapeColors[index % tapeColors.length],
                      transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)`,
                    }}
                  />
                  <div className="aspect-[4/5] bg-neutral-100 overflow-hidden">
                    <Image
                      src={edition.src}
                      alt={edition.label}
                      width={260}
                      height={325}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center text-neutral-500 text-xs mt-2 font-medium">{edition.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Bento grid with polaroid styling */}
          <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-5 lg:gap-6" style={{ height: '540px' }}>
            {/* Large left image - spans 1 col, 2 rows */}
            <div
              className="col-span-1 row-span-2 relative group cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) rotate(-2deg)' : 'translateY(30px)',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
              }}
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Polaroid frame */}
              <div
                className="relative w-full h-full bg-white p-2 pb-12 rounded-sm transition-all duration-500"
                style={{
                  transform: hoveredIndex === 0 ? 'scale(1.03) rotate(0deg)' : 'rotate(0deg)',
                  boxShadow: hoveredIndex === 0 ? '0 25px 50px -12px rgba(0,0,0,0.2)' : '0 10px 30px -10px rgba(0,0,0,0.1)',
                }}
              >
                {/* Tape decoration */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 rounded-sm z-10 opacity-90"
                  style={{ background: tapeColors[0], transform: 'rotate(-5deg)' }}
                />
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src={editionImages[0].src}
                    alt={editionImages[0].label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="absolute bottom-3 left-0 right-0 text-center text-neutral-500 text-xs font-medium">{editionImages[0].label}</p>
              </div>
            </div>

            {/* Large right top image - spans 3 cols, 1 row */}
            <div
              className="col-span-3 row-span-1 relative group cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) rotate(1deg)' : 'translateY(30px)',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
              }}
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Polaroid frame */}
              <div
                className="relative w-full h-full bg-white p-2 pb-10 rounded-sm transition-all duration-500"
                style={{
                  transform: hoveredIndex === 1 ? 'scale(1.02) rotate(0deg)' : 'rotate(0deg)',
                  boxShadow: hoveredIndex === 1 ? '0 25px 50px -12px rgba(0,0,0,0.2)' : '0 10px 30px -10px rgba(0,0,0,0.1)',
                }}
              >
                {/* Push pin decoration */}
                <div
                  className="absolute -top-2 left-8 w-4 h-4 rounded-full z-10 shadow-md"
                  style={{ background: pinColors[0] }}
                />
                <div
                  className="absolute -top-2 right-8 w-4 h-4 rounded-full z-10 shadow-md"
                  style={{ background: pinColors[1] }}
                />
                <div className="w-full h-full overflow-hidden">
                  <Image
                    src={editionImages[3].src}
                    alt={editionImages[3].label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="absolute bottom-2 left-0 right-0 text-center text-neutral-500 text-xs font-medium">{editionImages[3].label} - Community Meetup</p>
              </div>
            </div>

            {/* Bottom 3 images */}
            {[1, 2, 4].map((imgIndex, i) => (
              <div
                key={imgIndex}
                className="relative group cursor-pointer"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? `translateY(0) rotate(${i === 1 ? 0 : i === 0 ? 2 : -2}deg)`
                    : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.3 + i * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredIndex(imgIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Polaroid frame */}
                <div
                  className="relative w-full h-full bg-white p-1.5 pb-8 rounded-sm transition-all duration-500"
                  style={{
                    transform: hoveredIndex === imgIndex ? 'scale(1.05) rotate(0deg)' : 'rotate(0deg)',
                    boxShadow: hoveredIndex === imgIndex ? '0 20px 40px -10px rgba(0,0,0,0.2)' : '0 8px 20px -8px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* Tape decoration */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm z-10 opacity-85"
                    style={{
                      background: tapeColors[(i + 1) % tapeColors.length],
                      transform: `rotate(${i === 1 ? 0 : i === 0 ? 5 : -5}deg)`,
                    }}
                  />
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={editionImages[imgIndex].src}
                      alt={editionImages[imgIndex].label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="absolute bottom-1.5 left-0 right-0 text-center text-neutral-400 text-[10px] font-medium">{editionImages[imgIndex].label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Floating decorative elements */}
          <div
            className="absolute -top-6 -right-6 w-24 h-24 rounded-full hidden lg:block"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0)',
              transition: 'all 0.6s ease-out 0.5s',
            }}
          />
          <div
            className="absolute -bottom-4 left-1/4 w-4 h-4 rounded-full hidden lg:block"
            style={{
              background: pinColors[2],
              opacity: isVisible ? 0.3 : 0,
              transition: 'opacity 0.5s ease-out 0.6s',
            }}
          />
          <div
            className="absolute top-1/2 -left-3 w-3 h-3 rounded-full hidden lg:block"
            style={{
              background: pinColors[4],
              opacity: isVisible ? 0.25 : 0,
              transition: 'opacity 0.5s ease-out 0.7s',
            }}
          />
        </div>
      </div>

      {/* Hide scrollbar utility */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
