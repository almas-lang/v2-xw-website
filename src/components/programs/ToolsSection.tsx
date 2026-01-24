'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Tool } from '@/data/programData';

interface ToolsSectionProps {
  tools: Tool[];
  footerText?: string;
}

export default function ToolsSection({
  tools,
  footerText = '+ more tools for analytics, prototyping, content, and outreach',
}: ToolsSectionProps) {
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

  // Filter tools with logos and split into 3 rows for marquee effect
  const toolsWithLogos = tools.filter(tool => tool.logo);
  const row1 = toolsWithLogos.slice(0, 8);
  const row2 = toolsWithLogos.slice(8, 16);
  const row3 = toolsWithLogos.slice(16);

  const renderTool = (tool: Tool, index: number, variant: 'white' | 'teal' = 'white') => {
    if (!tool.logo) return null;

    const baseClasses = variant === 'white'
      ? 'flex-shrink-0 px-6 py-4 bg-white border border-g200 rounded-2xl hover:border-g300 hover:shadow-sm'
      : 'flex-shrink-0 px-6 py-4 rounded-2xl hover:scale-105';

    const tealStyle = variant === 'teal'
      ? { background: 'rgba(74, 144, 164, 0.1)', border: '1px solid rgba(74, 144, 164, 0.2)' }
      : {};

    const sizeClass = tool.size === 'xlarge'
      ? 'w-[180px] h-[56px]'
      : tool.size === 'large'
        ? 'w-[140px] h-[44px]'
        : 'w-[100px] h-[32px]';

    return (
      <div
        key={`${tool.name}-${index}`}
        className={`${baseClasses} flex items-center justify-center transition-all duration-300 cursor-default`}
        style={tealStyle}
        title={tool.name}
      >
        <div className={`${sizeClass} relative`}>
          <Image
            src={tool.logo}
            alt={tool.name}
            fill
            className="object-contain"
          />
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 lg:py-24 relative overflow-hidden"
      style={{ background: '#FAFAFA' }}
    >
      {/* Alice blue gradient accents */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] opacity-[0.08]"
        style={{
          background: 'radial-gradient(circle at 0% 0%, #4A90A4 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle at 100% 100%, #4A90A4 0%, transparent 60%)',
        }}
      />

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(#4A90A4 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Geometric accents */}
      <div className="absolute top-16 right-16 opacity-[0.06]">
        <div className="w-24 h-24 rounded-full border-2" style={{ borderColor: '#4A90A4' }} />
        <div className="absolute top-4 left-4 w-16 h-16 rounded-full border" style={{ borderColor: '#4A90A4' }} />
      </div>
      <div className="absolute bottom-20 left-12 opacity-[0.05]">
        <div className="w-16 h-16 rotate-45 border" style={{ borderColor: '#4A90A4' }} />
      </div>

      {/* Gradient edges for fade effect */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #FAFAFA 0%, transparent 100%)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #FAFAFA 0%, transparent 100%)' }}
      />

      {/* Header */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-5 mb-12 md:mb-16">
        <h2
          className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          UX Design Tools You&apos;ll Work With
        </h2>
      </div>

      {/* Marquee rows */}
      <div
        className="space-y-4 md:space-y-5 transition-all duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: '200ms',
        }}
      >
        {/* Row 1 - moves right */}
        <div className="relative overflow-hidden">
          <div className="flex gap-4 animate-marquee-right">
            {[...row1, ...row1, ...row1, ...row1].map((tool, index) => renderTool(tool, index, 'white'))}
          </div>
        </div>

        {/* Row 2 - moves left (reverse) - alice blue themed */}
        <div className="relative overflow-hidden">
          <div className="flex gap-4 animate-marquee-left">
            {[...row2, ...row2, ...row2, ...row2].map((tool, index) => renderTool(tool, index, 'teal'))}
          </div>
        </div>

        {/* Row 3 - moves right slower */}
        <div className="relative overflow-hidden">
          <div className="flex gap-4 animate-marquee-right-slow">
            {[...row3, ...row1.slice(0, 4), ...row3, ...row1.slice(0, 4), ...row3, ...row1.slice(0, 4)].map((tool, index) => renderTool(tool, index, 'white'))}
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-5 mt-12 md:mt-16">
        <p
          className="font-body text-sm md:text-base text-g500 text-center transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: '400ms',
          }}
        >
          {footerText}
        </p>
      </div>

      {/* CSS for marquee animations */}
      <style jsx>{`
        @keyframes marquee-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-left {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes marquee-right-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
        .animate-marquee-left {
          animation: marquee-left 25s linear infinite;
        }
        .animate-marquee-right-slow {
          animation: marquee-right-slow 40s linear infinite;
        }
        .animate-marquee-right:hover,
        .animate-marquee-left:hover,
        .animate-marquee-right-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
