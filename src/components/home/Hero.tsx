'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 20, y: y * 20 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(160deg,
                #0a0a0a 0%,
                #0a0a0a 30%,
                #0a0a0a 60%,
                #0a0a0a 100%
              )
            `,
          }}
        />

        {/* Animated gradient mesh */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,0,35,0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(220,238,255,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 50% 80%, rgba(255,0,35,0.04) 0%, transparent 50%)
            `,
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Large X watermark - right side */}
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 select-none pointer-events-none"
          style={{
            transform: `translate(${mousePosition.x * -0.3}px, calc(-50% + ${mousePosition.y * -0.3}px))`,
            transition: 'transform 0.5s ease-out',
          }}
        >
          <span
            className="font-heading font-black text-[400px] md:text-[600px] lg:text-[800px] leading-none"
            style={{
              background: 'linear-gradient(180deg, rgba(255,0,35,0.06) 0%, rgba(220,238,255,0.03) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            aria-hidden="true"
          >
            X
          </span>
        </div>

        {/* Floating geometric shapes */}
        <div
          className="absolute top-32 left-[15%] w-3 h-3 bg-accent/40 rounded-full"
          style={{
            transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
            transition: 'transform 0.4s ease-out',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-[40%] left-[8%] w-2 h-2 bg-alice/30 rounded-full hidden md:block"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            transition: 'transform 0.4s ease-out',
            animation: 'pulse 4s ease-in-out infinite 1s',
          }}
        />
        <div
          className="absolute bottom-[30%] left-[5%] w-1.5 h-1.5 bg-white/20 rounded-full hidden lg:block"
          style={{
            transform: `translate(${mousePosition.x * 2.5}px, ${mousePosition.y * 2.5}px)`,
            transition: 'transform 0.4s ease-out',
          }}
        />

        {/* Decorative line */}
        <div className="absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-transparent via-accent/20 to-transparent hidden md:block" />
        <div className="absolute bottom-0 right-1/3 w-px h-32 bg-gradient-to-t from-transparent via-alice/15 to-transparent hidden md:block" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5">
        <div className="min-h-screen flex flex-col justify-center pt-16 pb-6 sm:pt-20 sm:pb-10 md:pt-24 md:pb-12">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left column - Main content */}
            <div className="lg:col-span-7 xl:col-span-6">
              {/* Eyebrow badge */}
              <div
                className="mb-5 sm:mb-6 md:mb-8"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <span className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/[0.04] border border-white/10 backdrop-blur-sm rounded-full">
                  <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-accent" />
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white/80">1:1 UX Design Mentorship</span>
                </span>
              </div>

              {/* Main headline - Editorial style */}
              <div
                className="mb-6 md:mb-8"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
                }}
              >
                <h1 className="font-heading font-bold text-white leading-[1.08] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
                  <span className="block">
                    Why Aren&apos;t You Getting
                  </span>
                  <span className="block">
                    <span className="relative inline-block whitespace-nowrap">
                      <span className="text-accent">Senior &amp; Leadership</span>
                      {/* Underline accent */}
                      <svg
                        className="absolute -bottom-1 left-0 w-full h-2 sm:h-3 text-accent/40"
                        viewBox="0 0 200 12"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0,8 Q50,0 100,8 T200,8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </span>
                  <span className="block">
                    UX Roles{' '}
                    <span className="text-g500 font-normal italic">Yet?</span>
                  </span>
                </h1>
              </div>

              {/* Subheadline */}
              <div
                className="mb-4 sm:mb-5 md:mb-6"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                }}
              >
                <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                  1:1 Mentorship That Fixes <span className="font-semibold">YOUR</span> Gaps, Not Generic Courses That Leave You Stuck
                </p>
              </div>

              {/* Target audience */}
              <div
                className="mb-6 sm:mb-8 md:mb-10"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.25s',
                }}
              >
                <p className="text-lg md:text-xl text-white font-medium">
                  For UX/UI/Product designers with 2+ years experience who are ready to grow but keep getting stuck at the same level
                </p>
              </div>

              {/* CTA */}
              <div
                className="mb-8 sm:mb-10 md:mb-12"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.35s',
                }}
              >
                <Button href="https://app.xperiencewave.com/book/dc-strategy-call" size="lg" showArrow>
                  Book strategy call
                </Button>
              </div>

              {/* Social proof strip */}
              <div
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                }}
              >
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 md:gap-4">
                  {/* Overlapping avatars */}
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-g600 to-g700 border-2 border-carbon flex items-center justify-center text-[9px] sm:text-[10px] md:text-xs font-medium text-white/60"
                      >
                        {['AT', 'SM', 'RK', 'PS'][i - 1]}
                      </div>
                    ))}
                  </div>

                  <div className="text-xs sm:text-sm">
                    <span className="text-white font-semibold">140+</span>
                    <span className="text-g500 ml-1">mentored</span>
                  </div>

                  <div className="w-px h-5 bg-white/10" />

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="text-accent font-bold">80%</span>
                    <span className="text-g500">achieved goals</span>
                  </div>

                  <div className="w-px h-5 bg-white/10" />

                  <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                    <svg className="w-3.5 h-3.5 text-alice flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-g500">AI-first approach</span>
                  </div>
                </div>
              </div>

              {/* Mobile Stats Cards */}
              <div
                className="lg:hidden mt-10 flex flex-col gap-4 overflow-hidden"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease-out 0.4s',
                }}
              >
                <div className="grid grid-cols-2 gap-3">
                  {/* Card 1 - 38% salary hike */}
                  <div className="p-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl">
                    <div className="text-2xl font-heading font-bold text-white mb-1">38%</div>
                    <div className="text-xs text-g400">avg salary hike</div>
                    <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[80%] bg-gradient-to-r from-accent to-accent/60 rounded-full" />
                    </div>
                  </div>

                  {/* Card 2 - 5 weeks */}
                  <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-md border border-accent/20 rounded-xl">
                    <div className="text-xl font-heading font-bold text-accent mb-1">5 weeks</div>
                    <div className="text-xs text-white/70">fastest result</div>
                  </div>
                </div>

                {/* Card 3 - Mentees work at */}
                <div className="p-4 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-alice/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-alice" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-white text-sm font-medium">Mentees work at</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['JP Morgan', 'McKinsey', 'Intel', 'Deloitte'].map((company) => (
                      <span key={company} className="px-2 py-1 text-xs font-medium text-g300 bg-white/5 rounded-lg">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Visual element */}
            <div className="lg:col-span-5 xl:col-span-6 hidden lg:block">
              <div
                className="relative"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.95)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
                }}
              >
                {/* Floating stats cards */}
                <div className="relative h-[500px] xl:h-[560px]">
                  {/* Card 1 - Top right */}
                  <div
                    className="absolute top-0 right-0 p-5 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl w-[200px]"
                    style={{
                      transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
                      transition: 'transform 0.4s ease-out',
                    }}
                  >
                    <div className="text-3xl font-heading font-bold text-white mb-1">38%</div>
                    <div className="text-sm text-g400">avg salary hike</div>
                    <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[80%] bg-gradient-to-r from-accent to-accent/60 rounded-full" />
                    </div>
                  </div>

                  {/* Card 2 - Center */}
                  <div
                    className="absolute top-1/3 left-1/4 p-6 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl w-[240px]"
                    style={{
                      transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)`,
                      transition: 'transform 0.4s ease-out',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-alice/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-alice" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-white font-medium">Mentees work at</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['JP Morgan', 'McKinsey', 'Intel', 'Deloitte'].map((company) => (
                        <span key={company} className="px-2.5 py-1 text-xs font-medium text-g300 bg-white/5 rounded-lg">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card 3 - Bottom left */}
                  <div
                    className="absolute bottom-16 left-0 p-5 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-md border border-accent/20 rounded-2xl w-[220px]"
                    style={{
                      transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px)`,
                      transition: 'transform 0.4s ease-out',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-accent text-2xl font-heading font-bold">5 weeks</span>
                    </div>
                    <div className="text-sm text-white/70">fastest result achieved</div>
                  </div>

                  {/* Decorative orbiting ring */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-white/[0.03]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-dashed border-white/[0.05]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-carbon to-transparent pointer-events-none" />

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}
