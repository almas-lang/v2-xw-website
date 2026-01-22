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
        <div className="max-w-[1000px] mx-auto px-5">
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

      {/* Distinct Strip with Side-by-side Layout */}
      <div className="py-12 md:py-16 bg-[#0A0A0A] border-t border-white/[0.06]">
        <div className="max-w-[1000px] mx-auto px-5">
          <div
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
            }}
          >
            {/* Summary on left */}
            <div>
              <p className="font-heading text-xl md:text-2xl font-semibold text-white leading-snug">
                That&apos;s why you finished courses but still aren&apos;t landing{' '}
                <span className="text-accent">senior & lead roles.</span>
              </p>
            </div>

            {/* Blog card on right */}
            <div className="max-w-sm md:ml-auto">
              <Link
                href="/resources/blogs/why-courses-dont-work"
                className="group block"
              >
                <article className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative w-full h-44 md:h-52 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80"
                      alt="Why courses don't work"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-carbon">
                        Article
                      </span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-2 text-g500 text-xs mb-3">
                      <span>Jan 10, 2025</span>
                      <span className="w-1 h-1 rounded-full bg-g400" />
                      <span>4 min read</span>
                    </div>
                    <h3 className="font-heading text-base md:text-lg font-semibold text-carbon mb-3 leading-snug group-hover:text-accent transition-colors">
                      Why UX Design Courses Don&apos;t Get You Senior Roles
                    </h3>
                    <p className="font-body text-sm text-g500 leading-relaxed mb-4 line-clamp-2">
                      You&apos;ve taken the courses. You have the certificates. But you&apos;re still not landing senior roles.
                    </p>
                    <span className="font-heading text-sm font-semibold text-accent inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                      Read Article
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
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
