'use client';

import { useEffect, useRef } from 'react';

interface Theme {
  title: string;
  description: string;
  highlighted?: boolean;
}

const themes: Theme[] = [
  {
    title: 'Design',
    description: 'The craft, the process, and the politics of creating great experiences.',
  },
  {
    title: 'Product',
    description: 'How design, product and technology come together and bring wonders',
  },
  {
    title: 'Leadership',
    description: 'Moving from IC to manager, building teams and navigating dynamics',
  },
  {
    title: 'Career',
    description: 'Portfolio, job switches and the moves that actually matter',
  },
  {
    title: 'Trends & Tech',
    description: "What's changing and what it means for practitioners.",
  },
  {
    title: 'Fresh Takes',
    description: 'We go where the conversation takes us',
    highlighted: true,
  },
];

function ThemeCard({ theme, index }: { theme: Theme; index: number }) {
  if (theme.highlighted) {
    return (
      <div
        className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl md:rounded-2xl p-6 md:p-8 overflow-hidden group"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Yellow accent glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />

        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
          {theme.title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          {theme.description}
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-xl md:rounded-2xl border border-g200 hover:border-yellow-400/50 p-6 md:p-8 transition-all duration-300 hover:shadow-lg group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-yellow-400/10 group-hover:bg-yellow-400/20 flex items-center justify-center mb-4 transition-colors">
        {theme.title === 'Design' && (
          <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )}
        {theme.title === 'Product' && (
          <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )}
        {theme.title === 'Leadership' && (
          <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )}
        {theme.title === 'Career' && (
          <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )}
        {theme.title === 'Trends & Tech' && (
          <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )}
      </div>

      <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mb-2 group-hover:text-yellow-600 transition-colors">
        {theme.title}
      </h3>
      <p className="text-g500 text-sm md:text-base leading-relaxed">
        {theme.description}
      </p>
    </div>
  );
}

export default function WhatWeTalkAbout() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f5f5f5] py-20 md:py-28 overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-4">
            What We Talk About
          </h2>
          <p className="text-g500 text-lg">
            Themes we explore across episodes
          </p>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {themes.map((theme, index) => (
            <ThemeCard key={index} theme={theme} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
