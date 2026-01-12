'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';

export default function Hero() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [scale, setScale] = useState(0.92);
  const videoRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Scale up on scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;
      const rect = videoRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when video enters viewport, 1 when it's centered
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.6)));

      // Scale from 0.92 to 1
      const newScale = 0.92 + (progress * 0.08);
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for fade transition
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVideoVisible(true);
      },
      { threshold: 0.2 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  // 3D tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 10, y: x * -10 }); // Subtle tilt (max 5deg)
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const handlePlay = () => {
    // TODO: Implement actual video playback
    console.log('Play video');
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg,
              #0a0a0a 0%,
              #1a1a1a 25%,
              #0f0f0f 50%,
              #1a1a1a 75%,
              #0a0a0a 100%
            )
          `,
        }}
      />

      {/* Subtle ambient glows */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse at 0% 0%, rgba(220,238,255,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 100%, rgba(255,0,35,0.04) 0%, transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-5">

        {/* Main Headline - No card, large and prominent */}
        <div className="pt-28 md:pt-40 pb-12 md:pb-16">
          <h1 className="font-heading text-[32px] sm:text-[42px] md:text-[56px] lg:text-[72px] font-bold text-white leading-[1.05] mb-6 md:mb-8 max-w-[900px]">
            Why Aren&apos;t You Getting{' '}
            <span className="text-accent">Senior &amp; Leadership UX Roles</span> Yet?
          </h1>

          {/* Subheadline */}
          <p className="font-body text-base md:text-lg text-g400 leading-relaxed mb-6 max-w-[700px]">
            1:1 Mentorship That Fixes YOUR Gaps, Not Generic Courses That Leave You Stuck
          </p>

          {/* Target audience */}
          <p className="text-sm text-g500 mb-8 md:mb-10 max-w-[500px]">
            For UX/UI/Product designers with 2+ years experience who are ready to grow but keep getting stuck at the same level.
          </p>

          <Button href="/book-call" showArrow>
            Book strategy call
          </Button>
        </div>

        {/* Video Section with 3D Tilt */}
        <div ref={videoRef} className="pb-6 md:pb-8" style={{ perspective: '1000px' }}>
          <button
            ref={buttonRef}
            onClick={handlePlay}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            className="group w-full relative overflow-hidden cursor-pointer py-24 md:py-40"
            style={{
              background: 'linear-gradient(135deg, rgba(220,238,255,0.06) 0%, rgba(220,238,255,0.02) 100%)',
              border: '1px solid rgba(220,238,255,0.1)',
              borderRadius: '12px',
              transform: `scale(${scale}) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isHovering ? 'none' : 'transform 0.3s ease-out',
              willChange: 'transform',
            }}
            aria-label="Play video"
          >

            {/* X watermark */}
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-extrabold text-[200px] md:text-[300px] text-white/[0.02] pointer-events-none select-none"
              aria-hidden="true"
            >
              X
            </span>

            {/* Play button with float + scale+fade transition */}
            <div
              className="relative z-10 flex flex-col items-center justify-center"
              style={{
                opacity: isVideoVisible ? 1 : 0,
                transform: isVideoVisible ? 'scale(1)' : 'scale(0.95)',
                transition: 'opacity 700ms cubic-bezier(0.4, 0, 0.2, 1), transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {/* Floating play button */}
              <div
                className="relative mb-4"
                style={{
                  animation: 'float 3s ease-in-out infinite',
                }}
              >
                <span className="absolute inset-0 rounded-full border-2 border-alice/30 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-alice/20 group-hover:border-alice/60 transition-all duration-300">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-white ml-1 group-hover:scale-110 group-hover:text-alice transition-all duration-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <p className="font-heading text-sm md:text-base font-semibold text-white mb-1 group-hover:text-alice transition-colors duration-300">Watch how it works</p>
              <p className="text-xs text-g500">12 min</p>
            </div>

            {/* CSS for float animation */}
            <style jsx>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
              }
            `}</style>
          </button>
        </div>

        {/* AI-first badge */}
        <div className="flex justify-center pb-12 md:pb-20">
          <span className="inline-flex items-center gap-2 text-alice text-sm md:text-base font-medium px-5 py-2.5 bg-alice/10 border border-alice/25" style={{ borderRadius: '100px' }}>
            <span className="w-2 h-2 rounded-full bg-alice animate-pulse" />
            Includes AI-first design approach
          </span>
        </div>

      </div>
    </section>
  );
}
