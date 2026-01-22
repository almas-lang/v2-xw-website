'use client';

import { useEffect, useRef, useState } from 'react';

const certifications = [
  {
    title: 'Core UX Design',
    issuer: 'Expwave',
    color: '#FF6B4A',
  },
  {
    title: 'SAFe Practice Consultant',
    issuer: 'Scaled Agile',
    color: '#4A90A4',
  },
  {
    title: 'Usability & UX Analyst',
    issuer: 'Human Factors Intl.',
    color: '#8B5CF6',
  },
  {
    title: 'Product Ownership',
    issuer: 'Scrum Alliance',
    color: '#10B981',
  },
  {
    title: 'Pedagogy Master',
    issuer: 'Expwave',
    color: '#FF6B4A',
  },
  {
    title: 'Service Design',
    issuer: 'Human Factors Intl.',
    color: '#F59E0B',
  },
];

export default function Certifications() {
  const [isVisible, setIsVisible] = useState(false);
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
      className="bg-gradient-to-br from-white via-gray-50 to-white py-16 md:py-24 px-5 overflow-hidden"
    >
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
          }}
        >
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-carbon mb-3">
            Certified By
          </h2>
          <p className="text-g500 text-sm">Our team holds certifications from</p>
        </div>

        {/* Floating tags */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? 'translateY(0) rotate(0deg)'
                  : `translateY(20px) rotate(${index % 2 === 0 ? -3 : 3}deg)`,
                transition: `all 0.6s ease ${0.1 + index * 0.1}s`,
              }}
            >
              <div
                className="px-4 py-3 md:px-5 md:py-3.5 bg-white rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-300 cursor-default group-hover:scale-105"
                style={{ borderColor: `${cert.color}30` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cert.color }}
                  />
                  <span className="font-semibold text-carbon text-sm">
                    {cert.title}
                  </span>
                </div>
                <p className="text-g400 text-xs pl-4">{cert.issuer}</p>
              </div>

              {/* Decorative dot on hover */}
              <div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: cert.color }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
