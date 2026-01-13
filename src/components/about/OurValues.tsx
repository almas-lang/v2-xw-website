'use client';

import { useEffect, useRef, useState } from 'react';

const values = [
  {
    number: '01',
    title: 'Growth-first',
    description: 'Careers moved. Products shipped. Revenue grown. That\'s how we measure success.',
    accent: 'accent',
  },
  {
    number: '02',
    title: 'Global Standards',
    description: 'India shouldn\'t feel like a career sentence. We\'re changing that.',
    accent: 'alice',
  },
  {
    number: '03',
    title: 'No BS',
    description: 'No politics. No fluff. No sugarcoating. We say what needs to be said.',
    accent: 'accent',
  },
  {
    number: '04',
    title: 'Until You Win',
    description: 'We don\'t stop when the contract ends. We stop when you win.',
    accent: 'alice',
  },
];

export default function OurValues() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
    <section ref={sectionRef} className="bg-carbon py-20 md:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-alice/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-16 md:mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <span className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 text-g400 text-sm font-medium mb-4" style={{ borderRadius: '100px' }}>
            What drives us
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Our Values
          </h2>
        </div>

        {/* Values grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative transition-all duration-500"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${150 + index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`
                  relative p-6 md:p-8 h-full overflow-hidden transition-all duration-500
                  ${hoveredIndex === index ? 'bg-white/10' : 'bg-white/[0.03]'}
                  border border-white/10 hover:border-white/20
                `}
                style={{ borderRadius: '20px' }}
              >
                {/* Accent line on left */}
                <div
                  className={`
                    absolute left-0 top-0 bottom-0 w-1 transition-all duration-500
                    ${value.accent === 'accent' ? 'bg-accent' : 'bg-alice'}
                    ${hoveredIndex === index ? 'opacity-100' : 'opacity-40'}
                  `}
                  style={{ borderRadius: '20px 0 0 20px' }}
                />

                {/* Large number watermark */}
                <span
                  className={`
                    absolute -top-4 -right-2 font-heading text-[120px] md:text-[150px] font-bold leading-none
                    transition-all duration-500 select-none pointer-events-none
                    ${hoveredIndex === index
                      ? value.accent === 'accent' ? 'text-accent/10' : 'text-alice/10'
                      : 'text-white/[0.03]'
                    }
                  `}
                >
                  {value.number}
                </span>

                {/* Content */}
                <div className="relative z-10">
                  <span
                    className={`
                      inline-block text-xs font-semibold tracking-wider uppercase mb-3
                      ${value.accent === 'accent' ? 'text-accent' : 'text-alice'}
                    `}
                  >
                    {value.number}
                  </span>

                  <h3
                    className={`
                      font-heading text-xl md:text-2xl font-bold mb-3 transition-colors duration-300
                      ${hoveredIndex === index ? 'text-white' : 'text-white/90'}
                    `}
                  >
                    {value.title}
                  </h3>

                  <p className="text-g400 leading-relaxed">
                    {value.description}
                  </p>
                </div>

                {/* Bottom decorative dot */}
                <div
                  className={`
                    absolute bottom-4 right-4 w-2 h-2 rounded-full transition-all duration-500
                    ${value.accent === 'accent' ? 'bg-accent' : 'bg-alice'}
                    ${hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                  `}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div
          className="mt-12 md:mt-16 text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '600ms',
          }}
        >
          <p className="text-g500 text-sm md:text-base">
            These aren't just words on a wall.{' '}
            <span className="text-white font-medium">They're how we operate every day.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
