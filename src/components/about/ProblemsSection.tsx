'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ProblemsSection() {
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
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden bg-[#F0F0F0]">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="problemsGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A1A1A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#problemsGrid)" />
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-4">
          The Problems No One Fixed
        </h2>
        <p className="text-g500 mb-12 md:mb-16 max-w-[500px]">The numbers tell the story.</p>

        {/* Giant stats with full context */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-20">
          {[
            {
              stat: '$359B',
              label: 'spent on training yearly',
              context: 'Companies spend $359 billion on training every year. Only 12% of employees ever apply what they learned.',
            },
            {
              stat: '89%',
              label: 'of designers stuck',
              context: 'Designers invest years in their careers. 89% of them have no clear path forward.',
            },
            {
              stat: '90%',
              label: 'of products fail',
              context: 'Products launch every day. 90% of them fail - most never asked what customers needed.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-[#D4A853] mb-2">
                {item.stat}
              </p>
              <p className="text-carbon font-medium mb-3">{item.label}</p>
              <p className="text-g500 text-sm italic leading-relaxed max-w-[280px] mx-auto">
                {item.context}
              </p>
            </div>
          ))}
        </div>

        {/* Connection line */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-g300" />
          <span className="w-3 h-3 rounded-full bg-[#D4A853]" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-g300" />
        </div>

        {/* Solution - Black card */}
        <div
          className="bg-carbon p-6 md:p-10 lg:p-12"
          style={{ borderRadius: '24px' }}
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Image */}
            <div
              className="w-full lg:w-2/5 aspect-[4/3] flex-shrink-0 relative overflow-hidden"
              style={{ borderRadius: '16px' }}
            >
              <Image
                src="/images/about-we-exist.jpg"
                alt="That's why we exist"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="font-body text-lg md:text-xl text-g400 italic mb-6">
                These aren't separate problems. They're the same problem:
                <span className="text-white not-italic block mt-2 font-semibold">
                  No one's connecting work to results.
                </span>
              </p>

              <p className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                That's why we exist
              </p>

              <ul className="space-y-3">
                {[
                  'We train designers who actually get results.',
                  'We build products that actually work.',
                  "We don't stop until the numbers change.",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-g300">
                    <span className="w-2 h-2 rounded-full bg-[#D4A853] flex-shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

