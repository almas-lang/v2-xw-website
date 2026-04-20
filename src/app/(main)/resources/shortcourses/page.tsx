'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LeadCaptureModal, { LeadType } from '@/components/shared/LeadCaptureModal';

// ============================================
// COURSE DATA
// ============================================

interface Course {
  id: string;
  title: string;
  rating: string;
  ratingCount: string;
  status: string;
  duration: string;
  originalPrice: string;
  price: string;
  discount: string;
  learnings: string[];
  image: string;
  leadType: LeadType;
}

const courses: Course[] = [
  {
    id: 'design-strategy-course',
    title: 'Design Strategy for Product Designers',
    rating: '4.9',
    ratingCount: '1245',
    status: 'Coming soon',
    duration: '4 hours',
    originalPrice: '2,999',
    price: '1,999',
    discount: '33',
    learnings: [
      'Position design at the center of business growth',
      'Build strategic frameworks stakeholders buy into',
      'Tie design decisions to revenue and retention',
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    leadType: 'course-design-strategy',
  },
  {
    id: 'ux-research-course',
    title: 'Mixed Methods UX Research: From Plan to Insights',
    rating: '4.8',
    ratingCount: '3832',
    status: 'Coming soon',
    duration: '6 hours',
    originalPrice: '2,499',
    price: '1,499',
    discount: '40',
    learnings: [
      'Combine qualitative and quantitative research effectively',
      'Plan, conduct, and synthesize research in real projects',
      'Present findings that drive product decisions',
    ],
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    leadType: 'course-ux-research',
  },
  {
    id: 'portfolio-course',
    title: 'Portfolio That Gets You Hired',
    rating: '4.9',
    ratingCount: '892',
    status: 'Coming soon',
    duration: '3 hours',
    originalPrice: '1,999',
    price: '999',
    discount: '50',
    learnings: [
      'Structure case studies hiring managers actually read',
      'Show impact with metrics (even under NDA)',
      'Avoid the 7 mistakes that kill interview chances',
    ],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    leadType: 'course-portfolio',
  },
  {
    id: 'design-system-course',
    title: 'Build a Practical Design System (Fast)',
    rating: '4.8',
    ratingCount: '1156',
    status: 'Coming soon',
    duration: '8 hours',
    originalPrice: '2,999',
    price: '1,999',
    discount: '33',
    learnings: [
      'Set up tokens, components, and documentation that scales',
      'Ship consistent UI without slowing down your team',
      'Avoid over-engineering — build only what you need',
    ],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    leadType: 'course-design-system',
  },
];

// ============================================
// COMPONENT
// ============================================

export default function ShortCoursesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeadType, setSelectedLeadType] = useState<LeadType>('course-design-strategy');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openModal = (leadType: LeadType) => {
    setSelectedLeadType(leadType);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0d1a28 0%, #0a1520 30%, #0f1d2d 60%, #0a1420 100%)',
        }}
      >
        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] blur-[100px] md:blur-[150px]"
            style={{ background: 'radial-gradient(ellipse, rgba(220,238,255,0.15) 0%, transparent 60%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] blur-[80px] md:blur-[120px]"
            style={{ background: 'radial-gradient(ellipse, rgba(74,144,164,0.12) 0%, transparent 60%)' }}
          />
          <div
            className="absolute top-1/3 left-1/3 w-[200px] h-[200px] md:w-[300px] md:h-[300px] blur-[80px] md:blur-[100px]"
            style={{ background: 'radial-gradient(ellipse, rgba(255,0,35,0.06) 0%, transparent 50%)' }}
          />
        </div>

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #DCEEFF 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 pt-24 md:pt-28 pb-12 md:pb-16">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm mb-8 md:mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Link href="/" className="text-alice/60 hover:text-alice underline underline-offset-2 transition-colors">Home</Link>
            <svg className="w-4 h-4 text-alice/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <Link href="/resources" className="text-alice/60 hover:text-alice underline underline-offset-2 transition-colors">Resources</Link>
            <svg className="w-4 h-4 text-alice/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-alice font-medium">Short Courses</span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 mb-5 md:mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
              }}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/20 border border-accent/30 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-xs font-medium text-accent uppercase tracking-wider">Coming Soon</span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5 md:mb-6"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
              }}
            >
              Short Courses for{' '}
              <span className="text-alice">Focused Growth</span>
            </h1>

            {/* Description */}
            <p
              className="font-body text-base md:text-lg text-alice/70 leading-relaxed mb-6 md:mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
              }}
            >
              Bite-sized, practical courses that teach exactly what you need. No fluff, just skills that move your career forward.
            </p>

            {/* Stats */}
            <div
              className="flex items-center gap-4 md:gap-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.25s',
              }}
            >
              {[
                { value: '4', label: 'Courses' },
                { value: '21+', label: 'Hours' },
                { value: 'Lifetime', label: 'Access' },
              ].map((stat, i) => (
                <div key={i} className="flex items-baseline gap-1.5 md:gap-2">
                  <span className="font-heading text-xl md:text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-alice/60 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* COURSES SECTION - EDITORIAL STYLE */}
      {/* ============================================ */}
      <section className="bg-[#FAFAF8] py-20 md:py-28">
        <div className="max-w-[1000px] mx-auto px-5">
          {/* Section Header */}
          <div
            className="text-center mb-14 md:mb-20"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon">
              Learn UX Skills. Self-Paced Courses
            </h2>
            <p className="font-body text-base md:text-lg text-g500 mt-4">
              Affordable, practical courses to build skills that get you hired
            </p>
          </div>

          {/* Courses List - Editorial Layout */}
          <div className="space-y-20 md:space-y-28">
            {courses.map((course, index) => {
              const isAvailable = course.status !== 'Coming soon';
              const isEven = index % 2 === 0;

              return (
                <article
                  key={course.id}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${0.35 + index * 0.1}s`,
                  }}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2">
                    <div className="aspect-[4/3] relative rounded-sm overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      {!isAvailable && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white text-sm uppercase tracking-widest font-medium">Coming Soon</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2">
                    <span className="text-xs uppercase tracking-widest text-accent font-medium">
                      {course.duration} • {course.rating} ★
                    </span>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-carbon mt-2 mb-4">
                      {course.title}
                    </h3>
                    <ul className="space-y-2.5 text-g600 text-sm md:text-base mb-6">
                      {course.learnings.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-accent">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap items-center gap-6">
                      <div>
                        <span className="text-g400 line-through text-sm">₹{course.originalPrice}</span>
                        <span className="text-2xl font-bold text-carbon ml-2">₹{course.price}</span>
                      </div>
                      <button
                        onClick={() => !isAvailable && openModal(course.leadType)}
                        className={`text-sm uppercase tracking-wider font-semibold transition-colors ${
                          isAvailable
                            ? 'text-carbon underline underline-offset-4 hover:text-accent'
                            : 'text-accent hover:text-accent/80'
                        }`}
                      >
                        {isAvailable ? 'Enroll Now →' : 'Notify Me →'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Dark gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0d1a28 0%, #0a1520 50%, #0f1d2d 100%)',
          }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[300px] h-[200px] md:w-[500px] md:h-[300px] blur-[120px]"
            style={{ background: 'radial-gradient(ellipse, rgba(220,238,255,0.12) 0%, transparent 60%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-[250px] h-[200px] md:w-[350px] md:h-[250px] blur-[100px]"
            style={{ background: 'radial-gradient(ellipse, rgba(255,0,35,0.06) 0%, transparent 60%)' }}
          />
        </div>

        {/* Wave Motif */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute top-1/3 left-0 w-full h-auto opacity-[0.04]"
            viewBox="0 0 1200 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 50 Q150 20 300 50 T600 50 T900 50 T1200 50"
              stroke="#DCEEFF"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[700px] mx-auto px-5 text-center">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Want <span className="text-alice">Personalized</span> Learning?
          </h2>

          <p className="font-body text-sm md:text-base text-alice/70 mb-6 md:mb-8 max-w-lg mx-auto">
            Short courses are great for specific skills. But if you want a complete transformation with 1:1 guidance, explore our mentorship programs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-5 py-3 md:px-7 md:py-3.5 bg-alice hover:bg-alice/90 text-carbon font-heading font-semibold rounded-xl transition-all duration-300 hover:gap-3"
            >
              Explore Programs
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <Link
              href="https://app.xperiencewave.com/book/dc-strategy-call"
              className="inline-flex items-center gap-2 px-5 py-3 md:px-7 md:py-3.5 bg-transparent border-2 border-alice/30 hover:border-alice/50 text-alice font-heading font-semibold rounded-xl transition-all duration-300"
            >
              Book Free Call
            </Link>
          </div>

          {/* Trust points */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-xs md:text-sm text-alice/50">
            <span>140+ designers mentored</span>
            <span className="text-alice/30">·</span>
            <span>80% achieved their goals</span>
            <span className="text-alice/30">·</span>
            <span>38% avg salary hike</span>
          </div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leadType={selectedLeadType}
      />
    </>
  );
}
