'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    '1Cr+ users impacted',
    '20+ products shipped (Million+ downloads, 4+ ratings)',
    '3000+ designers consulted',
  ];

  return (
    <section className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 pt-32 pb-8">
        {/* Header content */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span
            className="inline-block text-[#D4A853] text-xs uppercase tracking-[0.4em] font-medium mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.1s',
            }}
          >
            ◆ About Xperience Wave ◆
          </span>

          <h2
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            13+ Years Building Products for Millions.
            <br />
            <span className="text-[#D4A853]">Now building Careers Too.</span>
          </h2>

          <div
            className="max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.4s',
            }}
          >
            <p className="font-body text-lg text-white/50 leading-relaxed mb-6 italic">
              We&apos;ve delivered banking systems, enterprise software, SaaS products, consumer
              apps, security platforms, crowdfunding models, and wealth management ecosystems.
            </p>
            <p className="text-white/70 mb-4">Now we use that experience to help</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-8">
              <span className="text-white/60">
                <strong className="text-white">Designers</strong> - build careers that matter
              </span>
              <span className="text-white/60">
                <strong className="text-white">Businesses</strong> - build products that scale
              </span>
            </div>
          </div>
        </div>

        {/* Bottom image - wide banner */}
        <div
          className="relative mx-auto max-w-5xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
          }}
        >
          <div className="aspect-[21/9] bg-gradient-to-b from-[#0A0A0A] to-[#0A0A0A] rounded-t-2xl flex items-center justify-center relative overflow-hidden">
            {/* Placeholder - replace with actual image */}
            <Image
              src="/images/about-hero.jpg"
              alt="Xperience Wave Team"
              fill
              className="object-cover rounded-t-2xl"
              priority
            />
            {/* Gold top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A853] to-transparent" />
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="text-center mt-8 pt-6 border-t border-[#D4A853]/20"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.7s',
          }}
        >
          <p className="text-[#D4A853]/80 text-sm">{stats.join(' | ')}</p>
        </div>
      </div>
    </section>
  );
}
