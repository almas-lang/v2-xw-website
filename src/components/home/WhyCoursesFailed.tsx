'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const painPoints = [
  {
    title: "Pre-Recorded, Not Personal",
    description: "You watch videos made for thousands of people. No one knows your name, your background, or what's holding you back.",
  },
  {
    title: "No One Pushes You Forward",
    description: "Courses let you go at your own pace - which usually means you stop halfway. No accountability, no progress.",
  },
  {
    title: "Certificates Don't Get You Hired",
    description: "Hiring managers don't care about course badges. They care about how you think, present, and solve real problems.",
  },
  {
    title: "No One Reviews Your Work",
    description: "You submit assignments into the void. No one looks at your portfolio. No one tells you what's actually wrong or how to fix it.",
  },
];

export default function WhyCoursesFailed() {
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
    <section ref={sectionRef} className="bg-[#0A0A0A]">
      {/* Main Content */}
      <div className="py-16 md:py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Header */}
          <div
            className="mb-12 md:mb-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="font-body text-[11px] uppercase tracking-[0.25em] text-accent font-medium">The uncomfortable truth</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Why Courses Didn&apos;t Work
            </h2>
          </div>

          {/* Pain Points Grid */}
          <div
            className="grid md:grid-cols-2 gap-px bg-white/[0.06] rounded-xl overflow-hidden"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 bg-[#0A0A0A] hover:bg-white/[0.03] transition-colors"
              >
                <span className="font-heading text-xs font-medium text-accent mb-4 block">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading text-lg md:text-xl font-semibold text-white mb-3">
                  {point.title}
                </h3>
                <p className="font-body text-sm md:text-base text-g400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distinct Strip with Side-by-side Layout - Light Theme */}
      <div className="py-14 md:py-20 bg-gradient-to-b from-[#f5f5f5] to-[#ebebeb] relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #d0d0d0 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="max-w-[1200px] mx-auto px-5 relative z-10">
          <div
            className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
            }}
          >
            {/* Summary on left */}
            <div className="flex-1 lg:max-w-[420px]">
              <p className="font-heading text-2xl md:text-3xl lg:text-[38px] font-bold text-carbon leading-[1.2]">
                That&apos;s why you finished courses but still aren&apos;t landing{' '}
                <span className="text-accent">senior & lead roles.</span>
              </p>
            </div>

            {/* Blog card on right - Image overlay style */}
            <div className="w-full lg:w-[480px] flex-shrink-0">
              <Link
                href="/resources/blogs/why-courses-dont-work"
                className="group block"
              >
                <article className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  {/* Background Image */}
                  <Image
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
                    alt="Why courses don't work"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

                  {/* Content */}
                  <div className="relative z-10 p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col justify-end">
                    {/* Tag */}
                    <span className="absolute top-6 left-6 md:top-8 md:left-8 px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg">
                      Deep Dive
                    </span>

                    {/* Title */}
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6 leading-snug">
                      Why UX Design Courses Don&apos;t Get You Senior Roles (And What Actually Works)
                    </h3>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 font-heading font-semibold text-white group-hover:gap-3 transition-all">
                        Read
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="font-body text-sm text-white/70">4 mins read</span>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
