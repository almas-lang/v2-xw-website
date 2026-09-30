'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import FAQ from '@/components/shared/FAQ';
import BlogSection from '@/components/shared/BlogSection';
import CTASection from '@/components/shared/CTASection';
import LeadCaptureModal, { LeadType } from '@/components/shared/LeadCaptureModal';

// ============================================
// DATA
// ============================================

const resourceCategories = [
  {
    id: 'blog',
    title: 'Blog',
    description: 'Career tips, insights, case studies for UX designers',
    href: '/resources/blogs',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'tools',
    title: 'UX Tools',
    description: 'Free AI-powered tools & calculators to support UX',
    href: '/resources/tools',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: 'courses',
    title: 'Self-Paced Courses',
    description: 'Affordable, self-paced courses to level up',
    href: '/resources/shortcourses',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    id: 'faqs',
    title: 'FAQs',
    description: 'Quick answers to common UX career questions',
    href: '/resources/faq',
    icon: (
      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
];

const templates = [
  {
    id: 'ux-salary-data',
    title: 'India UX Salary & Hiring Data Sheet',
    description: 'UX salary ranges by role, city & sector in India, sector hiring status, and AI skill premium data. Sep 2026 edition, updated quarterly.',
    tag: 'Free',
    href: '/resources/tools/ux-salary-data',
  },
  {
    id: 'case-study',
    title: 'UX Case Study Template',
    description: 'Build a portfolio case study in just hours. Easy to use framework with examples.',
    tag: 'Free',
    href: '#',
  },
  {
    id: 'skills-assessment',
    title: 'UX Skills Assessment 100',
    description: 'Find out your design skill gaps across 100 competencies in your UX career ecosystem.',
    tag: 'Free',
    href: '#',
  },
];

interface AITool {
  id: string;
  title: string;
  description: string;
  tag: 'Free' | 'Upcoming';
  leadType: LeadType;
}

const aiTools: AITool[] = [
  {
    id: 'design-strategy',
    title: 'Design Strategy GPT',
    description: 'Position design at the centre of business growth. Get a strategic framework for any project in minutes.',
    tag: 'Free',
    leadType: 'design-strategy-gpt',
  },
  {
    id: 'ux-audit',
    title: 'UX Audit GPT',
    description: 'Evaluate any screen against usability heuristics. Get actionable fixes, not generic feedback.',
    tag: 'Upcoming',
    leadType: 'ux-audit-gpt',
  },
];

const courses = [
  {
    id: 'design-strategy-course',
    title: 'Design Strategy for Product Designers',
    rating: '4.9',
    ratingCount: '1245',
    learnings: [
      'Position design at the center of business growth',
      'Build strategic frameworks stakeholders buy into',
      'Tie design decisions to revenue and retention',
    ],
    duration: '4 hours',
    originalPrice: '2,999',
    price: '1,999',
    discount: '33',
    tag: 'New',
    href: '#',
  },
  {
    id: 'ux-research-course',
    title: 'Mixed Methods UX Research: From Plan to Insights',
    rating: '4.8',
    ratingCount: '3832',
    learnings: [
      'Combine qualitative and quantitative research effectively',
      'Plan, conduct, and synthesize research in real projects',
      'Present findings that drive product decisions',
    ],
    duration: '6 hours',
    originalPrice: '2,499',
    price: '1,499',
    discount: '40',
    tag: 'New',
    href: '#',
  },
];

const faqs = [
  {
    question: 'How do I transition into UX design?',
    answer: 'Start by learning UX fundamentals through online courses, build a portfolio with personal or volunteer projects, and network with other designers. Focus on understanding user research, information architecture, and interaction design. Consider mentorship for personalized guidance and faster results.',
  },
  {
    question: 'What salary can I expect as a UX designer in India?',
    answer: 'It depends on experience and company type: Entry (0-2 yrs): ₹4-8 LPA | Mid (2-5 yrs): ₹8-18 LPA | Senior (5-8 yrs): ₹18-28 LPA | Lead/Principal (8+ yrs): ₹28-45+ LPA. Product companies and funded startups pay higher than agencies. Location matters less now with remote roles.',
  },
  {
    question: 'Do I need a degree to become a UX designer?',
    answer: "No. Most hiring managers care about your portfolio, problem-solving ability, and communication skills — not your degree. A design or psychology degree can help, but it's not required. What matters is showing you understand users, can think strategically, and can ship real work. Self-taught designers with strong portfolios regularly get hired over candidates with degrees but weak case studies.",
  },
  {
    question: 'How do I build a portfolio with no experience?',
    answer: "Three ways: 1) Redesign existing products — Pick an app you use, identify real problems, and design solutions. Document your thinking. 2) Concept projects — Invent a realistic problem and design end-to-end. 3) Volunteer or freelance — NGOs, early-stage startups, and small businesses need design help. Focus on showing your process, not just pretty screens. Hiring managers want to see how you think.",
  },
  {
    question: "What's the difference between UX and UI design?",
    answer: "UX (User Experience) is about how a product works — research, flows, information architecture, and making sure users can achieve their goals without friction. UI (User Interface) is about how it looks — visual design, typography, colors, spacing. In practice, most product companies expect designers to do both. Focus on being good at solving user problems — the labels matter less.",
  },
  {
    question: 'How long does it take to learn UX design?',
    answer: "If you're focused and consistent: Basics (tools + methods): 2-3 months | Portfolio-ready: 4-6 months | Job-ready (with feedback + iteration): 6-9 months. Speed depends on how much time you invest weekly and whether you get feedback from experienced designers. Courses alone won't get you hired — real projects and mentorship accelerate the process.",
  },
];

// ============================================
// COMPONENTS - MOBILE FIRST
// ============================================

function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const keywords = [
    { text: 'Templates', color: '#4A90A4' },
    { text: 'Tools', color: '#FF0023' },
    { text: 'Guides', color: '#D4A853' },
    { text: 'Courses', color: '#6366F1' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Dark Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 100%)',
        }}
      />

      {/* Animated gradient orbs */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(74,144,164,0.15) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,35,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 pt-24 md:pt-28 pb-12 md:pb-20">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-sm mb-8 sm:mb-10"
          aria-label="Breadcrumb"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Link href="/" className="text-g400 hover:text-white underline underline-offset-2 transition-colors">
            Home
          </Link>
          <svg className="w-4 h-4 text-g500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-white font-medium">Resources</span>
        </nav>

        {/* Main content */}
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight mb-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
            }}
          >
            UX Design Resources
          </h1>

          {/* Colorful keywords */}
          <div
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s',
            }}
          >
            {keywords.map((keyword, index) => (
              <span
                key={keyword.text}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm md:text-base font-heading font-semibold"
                style={{
                  borderColor: `${keyword.color}50`,
                  color: keyword.color,
                  backgroundColor: `${keyword.color}10`,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: keyword.color }}
                />
                {keyword.text}
              </span>
            ))}
          </div>

          <p
            className="font-body text-base md:text-lg lg:text-xl text-g300 mb-8 md:mb-10 max-w-2xl mx-auto"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            Everything you need to build your UX portfolio, crack design interviews, and grow your career - built from real mentorship experience.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-10 md:mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          >
            <Link
              href="#resources"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-accent hover:bg-accent/90 text-white font-heading font-semibold text-sm md:text-base rounded-xl transition-all"
            >
              Browse Resources
            </Link>
            <Link
              href="#templates"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-heading font-semibold text-sm md:text-base rounded-xl transition-all"
            >
              Get Interview Prep Checklist
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
            }}
          >
            <div className="inline-block px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <p className="font-heading font-medium text-white text-sm md:text-base">
                50+ resources
                <span className="text-g500 mx-3">·</span>
                Used by 3000+ designers
                <span className="text-g500 mx-3">·</span>
                Updated regularly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
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
    <section ref={sectionRef} id="resources" className="py-12 md:py-20 bg-snow">
      <div className="px-5 md:px-8 max-w-[1200px] mx-auto">
        {/* Header */}
        <div
          className="text-center mb-8 md:mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon">
            Resources for UX Designers
          </h2>
        </div>

        {/* Category Cards - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {resourceCategories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className="group block p-4 md:p-6 bg-white rounded-xl border-2 border-g200 hover:border-accent hover:shadow-lg hover:-translate-y-1 active:bg-accent/5 transition-all duration-300 cursor-pointer"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + index * 0.1}s`,
              }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-alice group-hover:bg-accent group-hover:text-white group-hover:scale-110 flex items-center justify-center text-carbon mb-3 md:mb-4 transition-all duration-300">
                {category.icon}
              </div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-heading text-base md:text-lg font-bold text-carbon group-hover:text-accent mb-1 md:mb-2 transition-colors">
                    {category.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-g500 leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-g300 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TemplatesSection() {
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
      id="templates"
      className="py-12 md:py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(220,238,255,0.3) 0%, rgba(220,238,255,0.1) 100%)',
      }}
    >
      {/* X pattern - hidden on mobile */}
      <div className="hidden md:block absolute top-10 right-10 opacity-[0.03] select-none pointer-events-none">
        <span className="font-heading font-black text-[200px] text-carbon">X</span>
      </div>

      <div className="px-5 md:px-8 max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div
          className="text-center mb-8 md:mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
            <div className="w-6 md:w-8 h-[2px] bg-accent" />
            <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-accent font-medium">Downloads</span>
            <div className="w-6 md:w-8 h-[2px] bg-accent" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-2 md:mb-4">
            Free UX Templates & Downloads
          </h2>
          <p className="font-body text-sm md:text-lg text-g500">
            Practical resources to accelerate your UX design career
          </p>
        </div>

        {/* Template Cards */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 mb-6 md:mb-8">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className="p-5 md:p-8 bg-white/70 rounded-xl border-2 border-g200 transition-all duration-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + index * 0.1}s`,
              }}
            >
              <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full mb-3 md:mb-4 ${template.href !== '#' ? 'bg-accent' : 'bg-g400'}`}>
                {template.href !== '#' ? 'Free' : 'Coming Soon'}
              </span>
              <h3 className="font-heading text-lg md:text-xl font-bold text-carbon mb-2 md:mb-3">
                {template.title}
              </h3>
              <p className="font-body text-sm md:text-base text-g500 mb-5 md:mb-6 leading-relaxed">
                {template.description}
              </p>
              {template.href !== '#' ? (
                <Link
                  href={template.href}
                  className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-accent hover:bg-accent/90 text-white font-heading font-semibold rounded-lg transition-colors min-h-[48px]"
                >
                  Download Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-g200 text-g500 font-heading font-semibold rounded-lg cursor-not-allowed min-h-[48px]">
                  Coming Soon
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Notify Me Link */}
        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
          }}
        >
          <p className="font-body text-sm text-g500">
            Want to be notified when these are ready? Subscribe to our newsletter below.
          </p>
        </div>
      </div>
    </section>
  );
}


function AIToolsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeadType, setSelectedLeadType] = useState<LeadType>('design-strategy-gpt');
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

  const openModal = (leadType: LeadType) => {
    setSelectedLeadType(leadType);
    setIsModalOpen(true);
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0a0a0a 0%, #0a0a0a 50%, #0a0a0a 100%)',
      }}
    >
      {/* Gradient accents */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 50%, rgba(220,238,255,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 80% 50%, rgba(255,0,35,0.06) 0%, transparent 50%)
          `,
        }}
      />

      {/* X watermark - hidden on mobile */}
      <div className="hidden md:block absolute -left-10 bottom-0 opacity-[0.02] select-none pointer-events-none">
        <span className="font-heading font-black text-[300px] text-white">X</span>
      </div>

      <div className="px-5 md:px-8 max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div
          className="text-center mb-8 md:mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
            Free AI Tools for UX Designers
          </h2>
          <p className="font-body text-sm md:text-lg text-g400">
            GPT-powered tools to accelerate your design work
          </p>
        </div>

        {/* Tool Cards */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 mb-6 md:mb-8">
          {aiTools.map((tool, index) => (
            tool.tag === 'Free' ? (
              <button
                key={tool.id}
                onClick={() => openModal(tool.leadType)}
                className="group block w-full text-left p-5 md:p-8 rounded-xl border-2 border-white/10 bg-white/[0.03] hover:border-alice/50 hover:bg-white/[0.06] hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] cursor-pointer transition-all duration-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + index * 0.1}s`,
                }}
              >
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 md:mb-4 text-carbon bg-alice group-hover:scale-105 transition-transform">
                  {tool.tag}
                </span>
                <h3 className="font-heading text-lg md:text-xl font-bold text-white group-hover:text-alice mb-2 md:mb-3 transition-colors">
                  {tool.title}
                </h3>
                <p className="font-body text-sm md:text-base text-g400 mb-5 md:mb-6 leading-relaxed">
                  {tool.description}
                </p>
                <span className="inline-flex items-center gap-2 text-alice font-heading font-semibold group-hover:gap-3 transition-all duration-300">
                  Try Now — Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            ) : (
              <button
                key={tool.id}
                onClick={() => openModal(tool.leadType)}
                className="group block w-full text-left p-5 md:p-8 rounded-xl border-2 border-white/10 bg-white/[0.03] hover:border-alice/50 hover:bg-white/[0.06] cursor-pointer transition-all duration-300"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.2 + index * 0.1}s`,
                }}
              >
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 md:mb-4 text-white/70 bg-white/10">
                  {tool.tag}
                </span>
                <h3 className="font-heading text-lg md:text-xl font-bold text-white/70 group-hover:text-white mb-2 md:mb-3 transition-colors">
                  {tool.title}
                </h3>
                <p className="font-body text-sm md:text-base text-g500 mb-5 md:mb-6 leading-relaxed">
                  {tool.description}
                </p>
                <span className="inline-flex items-center gap-2 text-g500 group-hover:text-alice font-heading font-semibold transition-colors">
                  Join Waitlist
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            )
          ))}
        </div>

        {/* Explore All Link */}
        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
          }}
        >
          <Link
            href="/resources/tools"
            className="inline-flex items-center gap-2 px-4 py-2 font-heading font-semibold text-alice active:text-white transition-colors min-h-[44px]"
          >
            Explore All Tools
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leadType={selectedLeadType}
      />
    </section>
  );
}

function CoursesSection() {
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
    <section ref={sectionRef} className="py-12 md:py-20 bg-snow">
      <div className="px-5 md:px-8 max-w-[900px] mx-auto">
        {/* Header */}
        <div
          className="text-center mb-8 md:mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon mb-2 md:mb-4">
            Learn UX Skills. Self-Paced Courses
          </h2>
          <p className="font-body text-sm md:text-lg text-g500">
            Affordable, practical courses to build skills that get you hired
          </p>
        </div>

        {/* Course Cards - Horizontal layout with image */}
        <div className="space-y-6 mb-6 md:mb-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-g200 overflow-hidden hover:shadow-lg hover:border-alice transition-all duration-300"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + index * 0.15}s`,
              }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Area */}
                <div className="md:w-[280px] lg:w-[320px] flex-shrink-0 bg-snow border-b md:border-b-0 md:border-r border-g200">
                  <div className="aspect-[4/3] md:aspect-auto md:h-full flex items-center justify-center p-6 md:p-8">
                    <div className="w-full h-full min-h-[160px] md:min-h-full rounded-xl bg-white border border-g200 flex items-center justify-center">
                      <svg className="w-12 h-12 text-g300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-5 md:p-6 lg:p-8 relative">
                  {/* Status Badge */}
                  <span className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1 bg-[#4A90A4] text-white text-xs font-bold rounded-full">
                    {course.tag}
                  </span>

                  {/* Title */}
                  <h3 className="font-heading text-lg md:text-xl font-bold text-carbon mb-2 pr-20 underline decoration-1 underline-offset-4 decoration-g300">
                    {course.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-4 text-sm">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-carbon">{course.rating}</span>
                    <span className="text-g500">/ 5 Ratings</span>
                    <span className="text-g400">(Out of {course.ratingCount} ratings)</span>
                  </div>

                  {/* What you'll learn */}
                  <div className="mb-5">
                    <p className="font-heading font-semibold text-sm text-carbon mb-2">What you&apos;ll learn:</p>
                    <ul className="space-y-1.5">
                      {course.learnings.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-g600">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Duration & Pricing */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5 text-sm">
                    <span className="font-semibold text-carbon">{course.duration}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-g400 line-through">₹ {course.originalPrice}</span>
                      <span className="font-bold text-carbon">₹ {course.price}</span>
                      <span className="text-accent font-medium">({course.discount}% off)</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={course.href}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-heading font-semibold text-sm transition-all duration-300"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
          }}
        >
          <Link
            href="/resources/shortcourses"
            className="inline-flex items-center gap-2 font-heading font-semibold text-carbon underline underline-offset-4 hover:text-accent transition-colors"
          >
            View All Courses
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      setStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0a0a0a 0%, #0a0a0a 50%, #0a0a0a 100%)',
      }}
    >
      {/* Gradient accents */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 30% 50%, rgba(255,0,35,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 70% 50%, rgba(220,238,255,0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* X watermark - hidden on mobile */}
      <div className="hidden md:block absolute -right-10 top-0 opacity-[0.03] select-none pointer-events-none">
        <span className="font-heading font-black text-[200px] text-white">X</span>
      </div>

      <div className="px-5 md:px-8 max-w-[600px] mx-auto text-center relative z-10">
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-4">
            Get Monthly UX Insights
          </h2>
          <p className="font-body text-sm md:text-lg text-g400 mb-6 md:mb-8">
            Career tips, design strategy, industry trends delivered once a month. No spam, only growth.
          </p>

          {status === 'success' ? (
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl mb-4">
              <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-heading text-lg font-semibold">Thanks for subscribing!</span>
              </div>
              <p className="font-body text-sm text-g400">
                Check your inbox for a confirmation email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading'}
                className={`w-full px-4 py-4 rounded-xl border-2 bg-white/5 font-body text-white placeholder:text-g500 focus:outline-none focus:ring-2 transition-all min-h-[52px] ${
                  status === 'error'
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-white/10 focus:border-accent focus:ring-accent/20'
                }`}
              />
              {status === 'error' && errorMessage && (
                <p className="font-body text-sm text-red-400 text-left" role="alert">
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-4 bg-accent text-white font-heading font-semibold rounded-xl hover:bg-accent/90 active:bg-accent/80 disabled:bg-accent/50 transition-colors min-h-[52px] flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}

          <p className="text-xs md:text-sm text-g500">
            Join 2,000+ designers already subscribed
          </p>
        </div>
      </div>
    </section>
  );
}



// ============================================
// MAIN PAGE
// ============================================

export default function ResourcesPage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <TemplatesSection />
      <BlogSection background="white" />
      <AIToolsSection />
      <CoursesSection />
      <NewsletterSection />
      <FAQ faqs={faqs} title="Frequently Asked Questions" theme="default" />
      <CTASection
        title={<>Your Design Role is Waiting.<br />Are You Ready?</>}
        subtitle="Book a free strategy call. We'll review where you are, understand your goals, and help you identify if mentorship is right for you."
      />
    </>
  );
}
