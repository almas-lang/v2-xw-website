'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function WhereToFindUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
      }}
    >
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-alice/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-10 md:mb-14 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon">
            Where to Find Us
          </h2>
        </div>

        {/* Unified Card */}
        <div
          className="relative bg-white border border-g200 overflow-hidden transition-all duration-700"
          style={{
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transitionDelay: '150ms',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left - Map */}
            <a
              href="https://maps.google.com/?q=Xperience+Wave+328+AECS+Layout+Singasandra+Bangalore+560068"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square lg:aspect-auto lg:min-h-[400px] bg-g100 overflow-hidden"
            >
              <Image
                src="/images/mapnew.png"
                alt="Xperience Wave office location"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Pulse ring - positioned at same location as pin */}
              <div
                className="absolute pointer-events-none"
                style={{ top: '58%', left: '73%' }}
              >
                <div
                  className="w-16 h-16 border-2 border-[#D4A853]/30 rounded-full"
                  style={{
                    marginTop: '-32px',
                    marginLeft: '-12px',
                    transformOrigin: 'center center',
                    animationName: isVisible ? 'pulse-location' : 'none',
                    animationDuration: '2s',
                    animationTimingFunction: 'ease-out',
                    animationIterationCount: 'infinite',
                  }}
                />
              </div>

              {/* Location pin on India (Bangalore) */}
              <div
                className="absolute"
                style={{ top: '58%', left: '73%' }}
              >
                <div
                  className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#D4A853] text-white transition-all duration-300 group-hover:scale-110"
                  style={{ borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)' }}
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    style={{ transform: 'rotate(45deg)' }}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-carbon/0 group-hover:bg-carbon/10 transition-colors duration-300 flex items-center justify-center">
                <span
                  className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm text-carbon font-heading font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                  style={{ borderRadius: '8px' }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Open in Maps
                </span>
              </div>
            </a>

            {/* Right - Contact Info */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
              {/* Visit Us */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center bg-[#D4A853]/10 text-[#D4A853]"
                    style={{ borderRadius: '10px' }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-carbon">Visit Us</h3>
                </div>
                <p className="text-g600 text-sm md:text-base leading-relaxed mb-3">
                  Xperience Wave, 328, AECS Layout,<br />
                  Singasandra, Bangalore, 560068
                </p>
                {/* Metro badge - highlighted */}
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-alice/20 text-alice text-xs font-semibold"
                  style={{ borderRadius: '6px', color: '#4A90A4' }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8M12 8v8" />
                  </svg>
                  700m from Singasandra Metro
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-g200 mb-8" />

              {/* Contact methods */}
              <div className="space-y-4 mb-8">
                {/* Email */}
                <a
                  href="mailto:hello@xperiencewave.com"
                  className="flex items-center gap-3 text-g600 hover:text-[#D4A853] transition-colors duration-300 group"
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center bg-g100 group-hover:bg-[#D4A853]/10 text-g400 group-hover:text-[#D4A853] transition-all duration-300"
                    style={{ borderRadius: '8px' }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base font-medium">hello@xperiencewave.com</span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+918041325804"
                  className="flex items-center gap-3 text-g600 hover:text-[#D4A853] transition-colors duration-300 group"
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center bg-g100 group-hover:bg-[#D4A853]/10 text-g400 group-hover:text-[#D4A853] transition-all duration-300"
                    style={{ borderRadius: '8px' }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="text-sm md:text-base font-medium">080-41325804</span>
                </a>
              </div>

              {/* CTA Button */}
              <Button
                href="https://maps.google.com/?q=Xperience+Wave+328+AECS+Layout+Singasandra+Bangalore+560068"
                variant="dark"
                showArrow
                className="w-full sm:w-auto justify-center"
              >
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Pulse animation */}
      <style jsx>{`
        @keyframes pulse-location {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
