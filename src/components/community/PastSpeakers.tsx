'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const speakers = [
  { name: 'Mohammed Fahad', title: 'Art Director @ Bangalore School of Design & Tech', featured: true, color: '#6366f1', image: '/images/community-fahad.JPG', imagePosition: 'right 20%' },
  { name: 'Ankit Sharma', title: 'Senior Engineer @ Guidewire', featured: false, color: '#8b5cf6', image: '/images/community-ankit.jpg' },
  { name: 'Almas Tasneem', title: 'CEO & Founder @ Xperience Wave', featured: true, color: '#ec4899', image: '/images/community-almas.jpg' },
  { name: 'Pavan Muthyala', title: 'Head of Design @ Bob', featured: false, color: '#f59e0b', image: '/images/community-pavan.JPG' },
  { name: 'Shaik Murad', title: 'Head of Product & Design @ Xperience Wave', featured: false, color: '#10b981', image: '/images/community-murad.jpg' },
  { name: 'Pradeep', title: 'Speaker @ WaveMakers Connect', featured: true, color: '#6366f1', image: '/images/community-pradeep.JPG' },
  { name: 'Rishik Jha', title: 'Lead Designer @ Happiest Minds', featured: false, color: '#f97316', image: '/images/community-rishik.jpg' },
  // { name: 'Shaik Anas', title: 'Designer from Bangalore School of Design & Tech', featured: false, color: '#8b5cf6' },
  { name: 'Vidhya Sagar', title: 'Award Winning UX Designer from NIFT', featured: false, color: '#14b8a6', image: '/images/community-vidyasagar.JPG', imagePosition: 'center 15%' },
];

// Seeded random for consistent SSR/client values
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

// Confetti dots with deterministic values
const confettiDots = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${seededRandom(i * 1.1) * 100}%`,
  top: `${seededRandom(i * 2.2) * 100}%`,
  size: seededRandom(i * 3.3) * 6 + 3,
  color: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'][Math.floor(seededRandom(i * 4.4) * 5)],
  delay: seededRandom(i * 5.5) * 2,
}));

export default function PastSpeakers() {
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
      className="relative bg-gradient-to-b from-white via-[#fafafa] to-white overflow-hidden"
    >
      {/* Soft grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Confetti dots - reduced on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confettiDots.map((dot) => (
          <div
            key={dot.id}
            className={`absolute rounded-full ${dot.id >= 12 ? 'hidden sm:block' : ''}`}
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
              opacity: isVisible ? 0.15 : 0,
              transition: `opacity 0.5s ease-out ${dot.delay}s`,
              animation: isVisible ? `confettiPulse ${3 + dot.delay}s ease-in-out ${dot.delay}s infinite` : 'none',
            }}
          />
        ))}
      </div>

      {/* Decorative circles with gradient - responsive */}
      <div
        className="absolute -top-16 sm:-top-32 -right-16 sm:-right-32 w-48 sm:w-96 h-48 sm:h-96 rounded-full hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.5)',
          transition: 'all 1s ease-out 0.3s',
        }}
      />
      <div
        className="absolute -bottom-10 sm:-bottom-20 -left-10 sm:-left-20 w-32 sm:w-64 h-32 sm:h-64 rounded-full hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.5)',
          transition: 'all 1s ease-out 0.5s',
        }}
      />

      {/* Playful shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute top-20 left-[8%] w-6 h-6 opacity-[0.12] hidden lg:block" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <svg className="absolute bottom-32 right-[10%] w-5 h-5 opacity-[0.1] hidden lg:block" viewBox="0 0 24 24" fill="#ec4899">
          <circle cx="12" cy="12" r="10" />
        </svg>
        <div className="absolute top-1/3 right-[5%] w-3 h-3 rotate-45 bg-amber-400/15 hidden lg:block" />
        <div className="absolute bottom-1/4 left-[6%] w-4 h-4 rounded-full border-2 border-indigo-400/15 hidden lg:block" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-16 md:py-20 lg:py-24">
        {/* Header with decorative underline */}
        <div
          className="mb-10 md:mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <div className="relative inline-block">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Past Speakers
            </h2>
            {/* Hand-drawn underline */}
            <svg className="absolute -bottom-1 left-0 w-32 h-2" viewBox="0 0 120 8" fill="none">
              <path d="M2 5 Q 30 2, 60 5 T 118 4" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
            </svg>
          </div>
          <p className="text-neutral-600 text-lg max-w-xl mt-2">
            People who've shared ideas at Bangalore's design and tech community event.
          </p>
        </div>

        {/* Speakers - Horizontal scroll on mobile, creative grid on desktop */}
        <div className="mb-12 md:mb-16">
          {/* Mobile: Horizontal scroll */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:hidden -mx-5 px-5">
            {speakers.map((speaker, index) => (
              <div
                key={speaker.name}
                className="flex-shrink-0 w-[280px] snap-start"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                  transition: `all 0.5s ease-out ${0.1 + index * 0.05}s`,
                }}
              >
                <SpeakerCard speaker={speaker} index={index} isHovered={false} color={speaker.color} />
              </div>
            ))}
          </div>

          {/* Desktop: Creative asymmetric grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {speakers.map((speaker, index) => (
              <div
                key={speaker.name}
                className={`
                  ${speaker.featured ? 'lg:col-span-2' : ''}
                  ${index === 0 ? 'lg:col-start-1' : ''}
                `}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? `translateY(0) rotate(${hoveredIndex === index ? 0 : (index % 3 === 0 ? -1 : index % 3 === 1 ? 0 : 1)}deg)`
                    : 'translateY(30px)',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: isVisible ? `${0.1 + index * 0.05}s` : '0s',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <SpeakerCard
                  speaker={speaker}
                  index={index}
                  featured={speaker.featured}
                  isHovered={hoveredIndex === index}
                  color={speaker.color}
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA with enhanced styling */}
        <div
          className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out 0.6s',
          }}
        >
          {/* Decorative line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

          <span className="text-neutral-600 font-medium">Want to speak?</span>
          <a
            href="#apply"
            className="group relative inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-heading font-semibold text-sm sm:text-base rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5"
          >
            {/* Button glow */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                filter: 'blur(15px)',
                transform: 'translateY(5px)',
                zIndex: -1,
              }}
            />
            Apply now
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes confettiPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.3); opacity: 0.25; }
        }
        @keyframes borderGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

function SpeakerCard({
  speaker,
  index,
  featured = false,
  isHovered = false,
  color,
}: {
  speaker: { name: string; title: string; image?: string; imagePosition?: string };
  index: number;
  featured?: boolean;
  isHovered?: boolean;
  color: string;
}) {
  return (
    <div className="relative h-full group">
      {/* Colored border glow on hover */}
      <div
        className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}40, ${color})`,
          backgroundSize: '200% 200%',
          animation: isHovered ? 'borderGlow 2s ease-in-out infinite' : 'none',
        }}
      />

      <div
        className={`relative h-full bg-white rounded-2xl overflow-hidden transition-all duration-500 ${featured ? 'p-5 lg:p-6' : 'p-4 lg:p-5'}`}
        style={{
          boxShadow: isHovered ? `0 20px 40px -12px ${color}30` : '0 2px 8px rgba(0,0,0,0.04)',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        {/* Colored accent line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
          style={{
            background: isHovered
              ? `linear-gradient(90deg, ${color}, ${color}80, ${color})`
              : `linear-gradient(90deg, ${color}40, ${color}20)`,
          }}
        />

        {/* Number badge with color */}
        <div
          className="absolute top-4 right-4 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isHovered ? color : '#f5f5f5',
            color: isHovered ? 'white' : '#9ca3af',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Photo with colored overlay on hover */}
        <div className={`relative ${featured ? 'aspect-[16/10] lg:aspect-[2/1]' : 'aspect-[4/3]'} mb-4 rounded-xl bg-neutral-100 overflow-hidden`}>
          {speaker.image ? (
            <Image
              src={speaker.image}
              alt={speaker.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: speaker.imagePosition || 'center' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-10 h-10 text-neutral-300 transition-colors duration-300 group-hover:text-neutral-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          )}
          {/* Colored overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, ${color}10 0%, transparent 60%)`,
            }}
          />
        </div>

        {/* Content */}
        <div>
          <h3
            className={`font-heading font-bold text-neutral-900 mb-1 transition-colors duration-300 ${featured ? 'text-lg' : 'text-base'}`}
            style={{ color: isHovered ? color : undefined }}
          >
            {speaker.name}
          </h3>
          <p className={`text-neutral-500 mb-3 line-clamp-2 ${featured ? 'text-sm' : 'text-xs'}`}>
            {speaker.title}
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs font-medium transition-colors duration-300"
            style={{ color: isHovered ? color : '#9ca3af' }}
          >
            LinkedIn
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </a>
        </div>

        {/* Corner decoration */}
        <div
          className="absolute bottom-3 right-3 w-4 h-4 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
