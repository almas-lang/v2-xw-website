'use client';

import { useEffect, useRef, useState } from 'react';

const roles = [
  { label: 'Designers', size: 'lg', rotation: -2, color: '#818cf8' },
  { label: 'Engineers', size: 'lg', rotation: 1, color: '#a78bfa' },
  { label: 'Founders', size: 'md', rotation: -1, color: '#6366f1' },
  { label: 'Product Managers', size: 'lg', rotation: 2, color: '#8b5cf6' },
  { label: 'Recruiters', size: 'md', rotation: -3, color: '#818cf8' },
  { label: 'Sales & Business', size: 'md', rotation: 1, color: '#a78bfa' },
  { label: 'Investors', size: 'md', rotation: -2, color: '#6366f1' },
];

// Orbiting dots
const orbitingDots = [
  { size: 4, radius: 120, duration: 20, delay: 0 },
  { size: 3, radius: 180, duration: 25, delay: 5 },
  { size: 5, radius: 250, duration: 30, delay: 10 },
  { size: 3, radius: 100, duration: 18, delay: 3 },
];

export default function WhosInTheRoom() {
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
        className="absolute top-0 left-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate(-20%, -20%)' : 'translate(-20%, -20%) scale(0.5)',
          transition: 'all 1s ease-out',
          animation: 'blobFloat 15s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[180px] sm:w-[280px] md:w-[350px] h-[180px] sm:h-[280px] md:h-[350px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(35px)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate(20%, 20%)' : 'translate(20%, 20%) scale(0.5)',
          transition: 'all 1s ease-out 0.2s',
          animation: 'blobFloat 18s ease-in-out infinite reverse',
        }}
      />

      {/* Orbiting dots */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {orbitingDots.map((dot, index) => (
          <div
            key={index}
            className="absolute top-1/2 left-1/2"
            style={{
              width: dot.size,
              height: dot.size,
              opacity: isVisible ? 0.4 : 0,
              transition: `opacity 1s ease-out ${dot.delay * 0.1}s`,
              animation: `orbit${index} ${dot.duration}s linear infinite`,
              animationDelay: `${dot.delay}s`,
            }}
          >
            <div
              className="w-full h-full rounded-full bg-indigo-400"
              style={{ boxShadow: '0 0 10px rgba(129, 140, 248, 0.5)' }}
            />
          </div>
        ))}
      </div>

      {/* Network connection SVG with animated lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
        style={{
          opacity: isVisible ? 0.2 : 0,
          transition: 'opacity 1s ease-out 0.5s',
        }}
      >
        {/* Animated dashed lines connecting different areas */}
        <line x1="15%" y1="35%" x2="30%" y2="50%" stroke="url(#lineGradient1)" strokeWidth="1" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="70%" y1="30%" x2="85%" y2="45%" stroke="url(#lineGradient2)" strokeWidth="1" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="25%" y1="65%" x2="40%" y2="80%" stroke="url(#lineGradient1)" strokeWidth="1" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="0" to="24" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="60%" y1="70%" x2="75%" y2="55%" stroke="url(#lineGradient2)" strokeWidth="1" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="45%" y1="25%" x2="55%" y2="40%" stroke="url(#lineGradient1)" strokeWidth="1" strokeDasharray="6 6">
          <animate attributeName="stroke-dashoffset" from="0" to="24" dur="2.2s" repeatCount="indefinite" />
        </line>

        {/* Connection nodes */}
        <circle cx="15%" cy="35%" r="3" fill="#6366f1" opacity="0.6">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="85%" cy="45%" r="3" fill="#8b5cf6" opacity="0.6">
          <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="40%" cy="80%" r="2" fill="#a78bfa" opacity="0.5">
          <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Gradients */}
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Geometric patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -top-10 -right-10 w-60 h-60 opacity-[0.04] hidden lg:block" viewBox="0 0 100 100">
          <defs>
            <pattern id="crosshatch" patternUnits="userSpaceOnUse" width="10" height="10">
              <path d="M 0 5 L 10 5 M 5 0 L 5 10" stroke="white" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#crosshatch)" />
        </svg>

        <svg className="absolute top-20 left-[8%] w-12 h-12 opacity-[0.1] hidden lg:block" viewBox="0 0 40 40">
          <polygon points="20,5 35,35 5,35" fill="none" stroke="white" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-24 right-[10%] w-8 h-8 opacity-[0.08] hidden md:block" viewBox="0 0 40 40">
          <polygon points="20,5 35,35 5,35" fill="none" stroke="white" strokeWidth="1" transform="rotate(180 20 20)" />
        </svg>

        <div className="absolute top-1/3 left-[5%] w-2 h-2 rotate-45 border border-white/10 hidden lg:block" />
        <div className="absolute bottom-1/3 right-[6%] w-3 h-3 rotate-45 bg-indigo-500/10 hidden lg:block" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-16 md:py-20 lg:py-24">
        {/* Header */}
        <div
          className="text-center max-w-2xl mx-auto mb-10 md:mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease-out',
          }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Who's in the Room
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            The best conversations happen when different perspectives meet. That's why every edition brings together Bangalore's product, design, and tech community.
          </p>
        </div>

        {/* Roles with glow effect on hover */}
        <div className="relative flex flex-wrap justify-center items-center gap-4 md:gap-5 lg:gap-6 max-w-4xl mx-auto">
          {roles.map((role, index) => (
            <div
              key={role.label}
              className="relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? `rotate(${hoveredIndex === index ? 0 : role.rotation}deg) scale(${hoveredIndex === index ? 1.08 : 1})`
                  : `rotate(${role.rotation}deg) translateY(20px)`,
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: isVisible ? `${0.1 + index * 0.08}s` : '0s',
                zIndex: hoveredIndex === index ? 10 : 1,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glow effect behind badge */}
              <div
                className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300"
                style={{
                  background: role.color,
                  opacity: hoveredIndex === index ? 0.4 : 0,
                  transform: 'scale(1.2)',
                }}
              />
              <span
                className={`
                  relative inline-block cursor-pointer select-none
                  border-2 rounded-full
                  font-medium text-white/80
                  transition-all duration-300
                  hover:text-[#0a0118]
                  ${role.size === 'lg'
                    ? 'px-7 py-4 text-base md:text-lg'
                    : 'px-5 py-3 text-sm md:text-base'
                  }
                `}
                style={{
                  borderColor: hoveredIndex === index ? role.color : 'rgba(255,255,255,0.3)',
                  backgroundColor: hoveredIndex === index ? role.color : 'transparent',
                  boxShadow: hoveredIndex === index ? `0 10px 40px ${role.color}40` : 'none',
                }}
              >
                {role.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div
          className="flex justify-center mt-10 md:mt-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.8s',
          }}
        >
          <div className="flex items-center gap-3 text-sm text-white/40">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-white/20" />
            <span>1370+ members and growing</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-white/20" />
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

      {/* Animations */}
      <style jsx global>{`
        @keyframes blobFloat {
          0%, 100% { transform: translate(-20%, -20%) scale(1); }
          50% { transform: translate(-15%, -25%) scale(1.1); }
        }
        @keyframes orbit0 {
          from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }
        @keyframes orbit1 {
          from { transform: rotate(0deg) translateX(180px) rotate(0deg); }
          to { transform: rotate(-360deg) translateX(180px) rotate(360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(0deg) translateX(250px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(250px) rotate(-360deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(-360deg) translateX(100px) rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
