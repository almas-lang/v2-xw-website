'use client';

import { useEffect, useRef, useState } from 'react';

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
    <section ref={sectionRef} className="bg-carbon py-20 md:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
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
              <p className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-accent mb-2">
                {item.stat}
              </p>
              <p className="text-white font-medium mb-3">{item.label}</p>
              <p className="text-g500 text-sm italic leading-relaxed max-w-[280px] mx-auto">
                {item.context}
              </p>
            </div>
          ))}
        </div>

        {/* Connection line */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-g600" />
          <span className="w-3 h-3 rounded-full bg-accent" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-g600" />
        </div>

        {/* Solution */}
        <div
          className="bg-white/5 border border-white/10 p-6 md:p-10 lg:p-12 backdrop-blur-sm"
          style={{ borderRadius: '24px' }}
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Image placeholder */}
            <div
              className="w-full lg:w-2/5 aspect-[4/3] bg-g600 flex-shrink-0 flex items-center justify-center"
              style={{ borderRadius: '16px' }}
            >
              <svg className="w-12 h-12 text-g500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
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
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
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

