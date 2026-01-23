'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePlay = () => {
    // TODO: Implement video modal or embed
    console.log('Play video clicked');
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Light gradient background block - bottom portion on mobile, right column on desktop */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[55%] md:h-auto md:left-auto md:top-0 md:w-[50%]"
        style={{ background: 'linear-gradient(180deg, #F5F5F5 0%, #FFFFFF 50%, #F5F5F5 100%)' }}
      />

      <div
        className="relative max-w-[1200px] mx-auto px-5"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
          {/* Text - centered on mobile, left on desktop */}
          <div className="md:w-[35%] relative z-10 text-center md:text-left py-4 md:py-0">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Watch<br className="hidden sm:block" />
              <span className="text-accent"> how it</span><br className="hidden sm:block" />
              <span> works</span>
            </h2>
            <p className="mt-3 md:mt-4 font-body text-sm md:text-base text-g400 max-w-[280px] mx-auto md:mx-0">
              See the mentorship experience in action
            </p>
          </div>

          {/* Video */}
          <div className="w-full md:w-[65%] md:pl-8 relative z-10">
            <button
              onClick={handlePlay}
              className="relative w-full aspect-video overflow-hidden cursor-pointer transition-all duration-300 rounded-lg"
              style={{
                border: '2px solid rgba(255,255,255,0.2)',
                boxShadow: isHovered ? '8px 8px 0 rgba(255,255,255,0.1)' : '4px 4px 0 rgba(255,255,255,0.1)',
                transform: isHovered ? 'translate(-2px, -2px)' : 'translate(0, 0)',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              aria-label="Play video: Watch how it works"
            >
              {/* Video background */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #3a3a3a 0%, #4a4a4a 50%, #3a3a3a 100%)',
                }}
              />

              {/* Play button - outlined */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? 'white' : 'transparent',
                  }}
                >
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ml-1 transition-colors duration-300 ${isHovered ? 'text-carbon' : 'text-white'}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
