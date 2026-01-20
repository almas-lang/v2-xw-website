'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const painPoints = [
  {
    title: "Pre-Recorded, Not Personal",
    description: "You watch videos made for thousands of people. No one knows your name, your background, or what's holding you back.",
  },
  {
    title: "No One Pushes You Forward",
    description: "Courses let you go at your own pace - which usually means you stop halfway. No accountability, no progress.",
  },
  {
    title: "Certificates Don't Get You Hired",
    description: "Hiring managers don't care about course badges. They care about how you think, present, and solve real problems.",
  },
  {
    title: "No One Reviews Your Work",
    description: "You submit assignments into the void. No one looks at your portfolio. No one tells you what's actually wrong or how to fix it.",
  },
];

export default function WhyCoursesFailed() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
      }}
    >
      {/* Dramatic spotlight effect */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'rgba(255, 0, 35, 0.12)' }}
      />
      <div
        className="absolute bottom-[-30%] left-[-20%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(220, 238, 255, 0.06)' }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Diagonal line accent */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ opacity: 0.03 }}
      >
        <div
          className="absolute top-0 right-[20%] w-[1px] h-[200%] bg-white"
          style={{ transform: 'rotate(25deg)', transformOrigin: 'top' }}
        />
        <div
          className="absolute top-0 right-[40%] w-[1px] h-[200%] bg-white"
          style={{ transform: 'rotate(25deg)', transformOrigin: 'top' }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 py-14 sm:py-20 md:py-28 lg:py-32">
        {/* Top section - Hero headline */}
        <div className="mb-8 sm:mb-12 md:mb-20 lg:mb-28">
          <div
            className="max-w-4xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Overline */}
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 md:w-12 h-[1px] bg-accent" />
              <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-accent/80">The uncomfortable truth</span>
            </div>

            {/* Main headline - must be smaller than h1 */}
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.1] tracking-tight">
              Why{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-g300 to-g400">
                  Courses
                </span>
                {/* Animated strike */}
                <span
                  className="absolute left-0 top-1/2 h-[3px] md:h-[4px] bg-accent z-20"
                  style={{
                    width: isVisible ? '100%' : '0%',
                    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
                  }}
                />
              </span>
              <br />
              <span className="text-white">Didn&apos;t Work</span>
            </h2>
          </div>
        </div>

        {/* Pain points - Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-12 md:mb-20">
          {/* Left column - 2 cards stacked */}
          <div className="lg:col-span-5 space-y-4 md:space-y-6 lg:space-y-8">
            {painPoints.slice(0, 2).map((point, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
                  transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.15}s`,
                }}
              >
                <div
                  className={`relative p-6 md:p-8 lg:p-10 rounded-2xl border transition-all duration-500 ${
                    hoveredIndex === index
                      ? 'bg-white/[0.08] border-accent/40'
                      : 'bg-white/[0.02] border-white/[0.06]'
                  }`}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(255,0,35,0.1) 0%, transparent 70%)',
                      opacity: hoveredIndex === index ? 1 : 0,
                    }}
                  />

                  {/* Number indicator */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white/[0.03] leading-none select-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="relative z-10">
                    <h3 className={`font-heading text-lg md:text-xl font-bold mb-4 transition-colors duration-300 ${
                      hoveredIndex === index ? 'text-accent' : 'text-white'
                    }`}>
                      {point.title}
                    </h3>
                    <p className="font-body text-base md:text-lg text-g400 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right column - 2 cards with offset */}
          <div className="lg:col-span-7 lg:pt-16 space-y-4 md:space-y-6 lg:space-y-8">
            {painPoints.slice(2, 4).map((point, index) => (
              <div
                key={index + 2}
                className="group relative"
                onMouseEnter={() => setHoveredIndex(index + 2)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
                  transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${0.45 + index * 0.15}s`,
                }}
              >
                <div
                  className={`relative p-6 md:p-8 lg:p-10 rounded-2xl border transition-all duration-500 ${
                    hoveredIndex === index + 2
                      ? 'bg-white/[0.08] border-accent/40'
                      : 'bg-white/[0.02] border-white/[0.06]'
                  }`}
                >
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(ellipse at center, rgba(255,0,35,0.1) 0%, transparent 70%)',
                      opacity: hoveredIndex === index + 2 ? 1 : 0,
                    }}
                  />

                  {/* Number indicator */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white/[0.03] leading-none select-none">
                    {String(index + 3).padStart(2, '0')}
                  </div>

                  <div className="relative z-10">
                    <h3 className={`font-heading text-lg md:text-xl font-bold mb-4 transition-colors duration-300 ${
                      hoveredIndex === index + 2 ? 'text-accent' : 'text-white'
                    }`}>
                      {point.title}
                    </h3>
                    <p className="font-body text-base md:text-lg text-g400 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section - Summary + Blog */}
        <div
          className="relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.9s',
          }}
        >
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 md:mb-16" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Summary text */}
            <div>
              <p className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
                That&apos;s why you finished courses but still aren&apos;t landing{' '}
                <span className="text-accent">senior &amp; lead roles.</span>
              </p>
            </div>

            {/* Blog card */}
            <div className="relative group">
              <Link
                href="/resources/blogs/why-courses-dont-work"
                className="relative flex flex-col sm:flex-row gap-4 md:gap-5 p-4 md:p-5 rounded-2xl bg-white transition-all duration-300 overflow-hidden hover:shadow-2xl hover:shadow-black/40"
              >
                {/* Thumbnail */}
                <div className="relative w-full sm:w-36 md:w-44 h-36 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80"
                    alt="Why courses don't work"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Category with article icon */}
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="font-body text-xs uppercase tracking-wider text-accent font-medium">Article</span>
                  </div>

                  <h3 className="font-heading text-base md:text-lg font-bold text-carbon mb-2 leading-snug group-hover:text-accent transition-colors">
                    Why UX Design Courses Don&apos;t Get You Senior Roles (And What Actually Works)
                  </h3>

                  <div className="flex items-center gap-3 text-g500 text-sm mb-3">
                    <span>Jan 10, 2025</span>
                    <span className="w-1 h-1 rounded-full bg-g400" />
                    <span>4 min read</span>
                  </div>

                  <span className="font-heading text-sm font-semibold text-accent inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    Read Article
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
