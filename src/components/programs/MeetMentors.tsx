'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import GlowContainer from '@/components/ui/GlowContainer';

const mentors = [
  {
    name: 'Shaik Murad Ahamed',
    role: 'Co-founder, Head of Design',
    experience: '13',
    companies: 'Credit Saison | Milaap | Yokogawa',
    focus: 'Design leadership & growth-based design',
    linkedin: 'https://linkedin.com/in/shaikmuradahamed',
    website: 'https://shaikmurad.com',
    size: 'large',
  },
  {
    name: 'Almas Tasneem',
    role: 'CEO & Co-founder',
    experience: '12',
    companies: 'Capgemini | CloudNuro',
    focus: 'Product design & brand strategy',
    linkedin: 'https://linkedin.com/in/almastasneem',
    size: 'large',
  },
  {
    name: 'Rishik Jha',
    role: 'Design Lead',
    experience: '7',
    companies: 'Skytex | Happiest Minds | NewSpace',
    focus: 'UX strategy & design systems',
    linkedin: 'https://linkedin.com/in/rishikjha',
    size: 'small',
  },
  {
    name: 'Fatima Sultana',
    role: 'Agile Coach',
    experience: '17',
    companies: 'GSK | EdgeVerve | Infosys',
    focus: 'Enterprise agility & delivery leadership',
    linkedin: 'https://linkedin.com/in/fatimasultana',
    size: 'small',
  },
];

export default function MeetMentors() {
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

  const largeMentors = mentors.filter(m => m.size === 'large');
  const smallMentors = mentors.filter(m => m.size === 'small');

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Dark gradient background like CTASection */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg,
              #0a1420 0%,
              #1a2836 25%,
              #0d1a28 50%,
              #1a2836 75%,
              #0a1420 100%
            )
          `,
        }}
      />

      {/* Subtle gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 0%, rgba(220,238,255,0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 100%, rgba(220,238,255,0.02) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-[1100px] mx-auto px-5 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
            Meet Your Core Mentors
          </h2>
          <p className="font-body text-base md:text-lg text-g400">
            15+ Experts. 4 Lead Your Journey
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
          {largeMentors.map((mentor, index) => (
            <div
              key={mentor.name}
              className="group transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${100 + index * 100}ms`,
              }}
            >
              <div
                className="bg-white/[0.03] border border-white/10 p-6 md:p-8 h-full relative overflow-hidden
                           hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500"
                style={{ borderRadius: '12px' }}
              >
                {/* Large experience number as background */}
                <span
                  className="absolute -top-4 -right-2 font-heading text-[140px] md:text-[180px] font-bold text-white/[0.03] leading-none select-none pointer-events-none
                             group-hover:text-alice/10 transition-colors duration-500"
                >
                  {mentor.experience}
                </span>

                <div className="relative z-10">
                  {/* Photo placeholder */}
                  <div
                    className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-g500 to-g600 mb-6
                               group-hover:from-alice/30 group-hover:to-alice/10 transition-all duration-500"
                    style={{ borderRadius: '8px' }}
                  />

                  {/* Name & Role */}
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-alice mb-1 group-hover:text-white transition-colors duration-300">
                    {mentor.name}
                  </h3>
                  <p className="font-body text-sm text-g400 mb-1">
                    {mentor.role}
                  </p>
                  <p className="font-heading text-sm font-semibold text-white mb-4">
                    {mentor.experience} years experience
                  </p>

                  {/* Companies */}
                  <p className="font-body text-sm text-g500 mb-5">
                    {mentor.companies}
                  </p>

                  {/* Focus Badge - Alice blue pill */}
                  <div
                    className="inline-block bg-alice text-carbon font-body text-sm px-4 py-2 mb-5"
                    style={{ borderRadius: '100px' }}
                  >
                    {mentor.focus}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={mentor.linkedin}
                      target="_blank"
                      className="text-g400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </Link>
                    {mentor.website && (
                      <Link
                        href={mentor.website}
                        target="_blank"
                        className="text-g400 hover:text-white transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12 md:mb-16">
          {smallMentors.map((mentor, index) => (
            <div
              key={mentor.name}
              className="group transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              <div
                className="bg-white/[0.03] border border-white/10 p-5 md:p-6 relative overflow-hidden
                           hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500"
                style={{ borderRadius: '12px' }}
              >
                <div className="flex gap-5">
                  {/* Photo placeholder */}
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gradient-to-br from-g500 to-g600
                               group-hover:from-alice/30 group-hover:to-alice/10 transition-all duration-500"
                    style={{ borderRadius: '8px' }}
                  />

                  <div className="flex-1 min-w-0">
                    {/* Name & Role */}
                    <h3 className="font-heading text-lg md:text-xl font-bold text-alice mb-0.5 group-hover:text-white transition-colors duration-300">
                      {mentor.name}
                    </h3>
                    <p className="font-body text-sm text-g400 mb-0.5">
                      {mentor.role}
                    </p>
                    <p className="font-heading text-sm font-semibold text-white mb-3">
                      {mentor.experience} years experience
                    </p>

                    {/* Companies */}
                    <p className="font-body text-xs text-g500 mb-4">
                      {mentor.companies}
                    </p>
                  </div>
                </div>

                {/* Focus Badge - Alice blue pill */}
                <div
                  className="inline-block bg-alice text-carbon font-body text-xs px-3 py-1.5 mt-4 mb-4"
                  style={{ borderRadius: '100px' }}
                >
                  {mentor.focus}
                </div>

                {/* Link */}
                <div className="block">
                  <Link
                    href={mentor.linkedin}
                    target="_blank"
                    className="text-g400 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="transition-all duration-700 max-w-3xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '500ms',
          }}
        >
          <GlowContainer color="alice">
            <p className="font-body text-base text-g300 text-center">
              <span className="text-alice font-semibold">+</span> clinic leads and specialists for portfolio critiques, mock interviews, and skill deep-dives
            </p>
          </GlowContainer>
        </div>
      </div>
    </section>
  );
}
