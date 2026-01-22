'use client';

import { useEffect, useRef, useState } from 'react';

const values = [
  {
    number: '01',
    title: 'Growth-first',
    description: 'Careers moved. Products shipped. Revenue grown. That\'s how we measure success.',
  },
  {
    number: '02',
    title: 'Global Standards',
    description: 'India shouldn\'t feel like a career sentence. We\'re changing that.',
  },
  {
    number: '03',
    title: 'No BS',
    description: 'No politics. No fluff. No sugarcoating. We say what needs to be said.',
  },
  {
    number: '04',
    title: 'Until You Win',
    description: 'We don\'t stop when the contract ends. We stop when you win.',
  },
];

export default function OurValues() {
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
    <section ref={sectionRef} className="bg-white py-20 md:py-32 relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="max-w-[1000px] mx-auto px-5 relative z-10">
        {/* Header - Elegant */}
        <div
          className="text-center mb-16 md:mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-[#D4A853] text-xs uppercase tracking-[0.4em] font-medium">What Drives Us</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-carbon tracking-wide">
            Our <span className="font-bold">Values</span>
          </h2>
        </div>

        {/* Values - Elegant list */}
        <div className="space-y-0">
          {values.map((value, index) => (
            <div
              key={index}
              className="group grid md:grid-cols-12 gap-6 md:gap-8 items-center py-8 md:py-10 border-t border-g200 hover:bg-g50 transition-all duration-500 px-6 -mx-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.8s ease ${0.1 + index * 0.1}s`,
              }}
            >
              {/* Number */}
              <div className="md:col-span-2">
                <span className="text-[#D4A853] text-3xl md:text-4xl font-heading font-light">{value.number}</span>
              </div>

              {/* Title */}
              <div className="md:col-span-4">
                <h3 className="font-heading text-xl md:text-2xl text-carbon font-semibold group-hover:text-[#D4A853] transition-colors duration-500">{value.title}</h3>
              </div>

              {/* Description */}
              <div className="md:col-span-6">
                <p className="text-g500 leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-g200" />
        </div>

        {/* Footer */}
        <div
          className="mt-12 md:mt-16 text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '600ms',
          }}
        >
          <p className="text-g400 text-sm italic">
            These aren't just words on a wall.{' '}
            <span className="text-carbon not-italic font-medium">They're how we operate every day.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
