'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const locations = [
  { name: 'Ireland', x: 44, y: 32, flag: '🇮🇪' },
  { name: 'UK', x: 47, y: 30, flag: '🇬🇧' },
  { name: 'UAE', x: 60, y: 48, flag: '🇦🇪' },
  { name: 'India', x: 68, y: 50, flag: '🇮🇳' },
];

// Option 3: Mini Map (~400px height)
export default function GlobalPresenceMini() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-10 md:py-14 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAFAFA 0%, #F5F5F5 100%)' }}
    >
      <div className="max-w-[800px] mx-auto px-5">
        {/* Heading */}
        <div
          className="text-center mb-6 md:mb-8 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-carbon">
            4 Countries. <span className="text-accent">1 Team</span>
          </h2>
        </div>

        {/* Mini Map */}
        <div
          className="relative max-w-2xl mx-auto transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.95)',
            transitionDelay: '150ms',
          }}
        >
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: '16px' }}
          >
            <Image
              src="/images/mapnew.png"
              alt="World map showing Xperience Wave locations"
              width={800}
              height={400}
              className="w-full h-auto"
            />

            {/* Location Markers */}
            <div className="absolute inset-0">
              {locations.map((loc, index) => (
                <div
                  key={loc.name}
                  className="absolute"
                  style={{
                    left: `${loc.x}%`,
                    top: `${loc.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Dot */}
                  <div
                    className="w-3 h-3 rounded-full bg-accent transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'scale(1)' : 'scale(0)',
                      transitionDelay: `${300 + index * 100}ms`,
                      boxShadow: '0 0 0 3px rgba(232, 90, 79, 0.2)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Location Labels Below */}
          <div
            className="flex flex-wrap justify-center gap-4 mt-4 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transitionDelay: '400ms',
            }}
          >
            {locations.map((loc) => (
              <span key={loc.name} className="flex items-center gap-1.5 text-sm text-g600">
                <span>{loc.flag}</span>
                <span className="font-medium">{loc.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
