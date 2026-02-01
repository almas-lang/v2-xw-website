'use client';

import { useEffect, useRef, useState } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Finally a design podcast that doesn't feel like a LinkedIn post read aloud.",
    name: 'Shaik Anas',
    role: 'Design',
    company: 'Bangalore School',
  },
  {
    quote: 'Some content makes you pause. Some makes you feel seen. This did both.',
    name: 'Divya Srinivas',
    role: 'UX Designer',
    company: 'SenecaGlobal',
  },
  {
    quote: "The career pivot episodes helped me navigate my transition from engineering to design.",
    name: 'Rahul Menon',
    role: 'UX Designer',
    company: 'Razorpay',
  },
];

export default function WhatListenersSay() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#fafafa] to-white py-20 md:py-28 overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Yellow Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-yellow-400/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-yellow-400/30 rounded-full" />
      <div className="absolute top-40 right-20 w-2 h-2 bg-yellow-400/40 rounded-full" />
      <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-yellow-400/20 rounded-full" />
      <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-yellow-400/30 rounded-full" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5">
        {/* Header */}
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon text-center mb-12 md:mb-16">
          What Listeners Say
        </h2>

        {/* Testimonial Card */}
        <div className="relative">
          {/* Yellow glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-br from-yellow-400/20 to-yellow-600/5 rounded-[2rem] blur-2xl opacity-60" />

          {/* Large quote mark - decorative */}
          <div className="absolute -top-4 left-4 md:-top-6 md:left-8 z-20">
            <svg className="w-16 h-16 md:w-20 md:h-20 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Card */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-yellow-400/30 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl shadow-black/20">
            {/* Quote Container */}
            <div className="relative min-h-[200px] md:min-h-[180px] flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  {/* Quote */}
                  <p className="font-body text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-8 max-w-3xl text-center">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                      <span className="font-heading text-black font-bold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="font-heading text-base font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {testimonial.role} @ {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-yellow-400 w-8'
                      : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            className="w-12 h-12 rounded-full bg-white border-2 border-g200 hover:border-yellow-400 hover:bg-yellow-400 flex items-center justify-center transition-all duration-200 group shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 text-g500 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
            className="w-12 h-12 rounded-full bg-white border-2 border-g200 hover:border-yellow-400 hover:bg-yellow-400 flex items-center justify-center transition-all duration-200 group shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 text-g500 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
