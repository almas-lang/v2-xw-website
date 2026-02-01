'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQ from '@/components/shared/FAQ';
import GuideDownloadModal from '@/components/shared/GuideDownloadModal';

const trainingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Design Leadership Foundations Workshop',
  provider: {
    '@type': 'Organization',
    name: 'Xperience Wave',
  },
  serviceType: 'Corporate Training',
  areaServed: 'India',
  description: 'Practical UX workshops for design teams covering leadership, research, design systems, and AI.',
};

export default function TrainingForTeamsPage() {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const [expandedWorkshop, setExpandedWorkshop] = useState<number | null>(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getSectionStyle = (sectionId: string, delay = 0) => ({
    opacity: visibleSections[sectionId] ? 1 : 0,
    transform: visibleSections[sectionId] ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
  });

  const whyChooseUs = [
    {
      title: 'Gap-first, not curriculum-first',
      description: "We don't start with a syllabus. We start with a discovery call to understand what's actually broken - then build the training around that.",
    },
    {
      title: 'Practical frameworks, not theory',
      description: 'Every workshop ends with templates, checklists, and frameworks your team uses immediately. Not slides they forget by Tuesday.',
    },
    {
      title: 'Flexible formats, sensible pricing',
      description: 'Half-day or full-day. In-person or virtual. Priced for your team size - not per-seat enterprise licensing.',
    },
    {
      title: 'Led by practitioners, not academics',
      description: "13+ years leading design teams. Real scenarios from real companies. Not textbook theory from people who've never shipped.",
    },
  ];

  const problems = [
    {
      title: 'One curriculum, different gaps',
      description: 'Your senior designer needs stakeholder management. Your junior needs research fundamentals. Courses teach both the same thing.',
    },
    {
      title: 'Theory without application',
      description: 'They watch videos, get certificates, come back to work - and nothing changes. No frameworks they can use Monday.',
    },
    {
      title: 'Expensive, generic, no context',
      description: 'Most courses cost lakhs per person. Content is generic. No follow-up. No customization for your team.',
    },
  ];

  const featuredWorkshop = {
    title: 'Design Leadership Foundations',
    tagline: 'You got promoted. Now what?',
    badge: 'New',
    forWho: 'New design managers, senior designer moving into leadership',
    duration: 'Half-day (4 hours)',
    image: 'https://stories.freepiklabs.com/storage/66814/Leadership_Mesa-de-trabajo-1.svg',
    learnings: [
      'The mindset shift from IC to manager (and traps to avoid)',
      'How to hire, give feedback, and grow designers',
      'Running 1:1s and design critiques that actually work',
      'Influencing stakeholders without positional authority',
      'Handling difficult situations — underperformers, scope creep, exec pressure',
    ],
  };

  const workshops = [
    {
      title: 'Research That Actually Works',
      tagline: 'Stop skipping research. Start doing it right.',
      forWho: 'Designers who skip research or do it superficially, teams without dedicated researchers',
      duration: 'Half-day (4 hours)',
      image: 'https://stories.freepiklabs.com/storage/54705/Researchers_Mesa-de-trabajo-1.svg',
      learnings: [
        'When to use research vs. when to skip (and how to justify both)',
        'Planning research that fits real timelines',
        'Conducting interviews that uncover real insights',
        'Designing surveys that give actionable data',
        'Turning findings into outputs stakeholders actually use',
      ],
    },
    {
      title: 'Design Systems: Build to Scale',
      tagline: 'From scattered components to a system that works.',
      forWho: 'Design and dev teams building or fixing a design system',
      duration: 'Half-day (4 hours) or Full-day (8 hours)',
      image: 'https://stories.freepiklabs.com/storage/15192/Design-tools_Mesa-de-trabajo-1.svg',
      learnings: [
        'When to build a design system (and when not to)',
        'Token architecture that scales — color, typography, spacing',
        'Building components with proper anatomy, states, and variants',
        'Documentation developers actually use',
        'Governance and contribution processes that stick',
      ],
    },
    {
      title: 'AI for Design Teams',
      tagline: 'From confusion to clarity.',
      forWho: 'Design teams figuring out where AI fits in their workflow',
      duration: 'Half-day (4 hours)',
      image: 'https://stories.freepiklabs.com/storage/16342/Artificial-intelligence-(1)_Mesa-de-trabajo-1.svg',
      learnings: [
        'What AI actually is (and isn\'t) — no more confusion',
        'Where AI fits in each stage of the design process',
        'Decision framework: when to use AI vs. do it manually',
        'Real risks — hallucination, bias, privacy — and how to handle them',
        '30-day AI adoption roadmap for the team',
      ],
    },
  ];

  const howItWorksSteps = [
    {
      number: '1',
      title: 'Discovery Call',
      description: "We learn about your team - size, experience levels, challenges. We diagnose what's actually missing. 30 minutes, no pitch.",
    },
    {
      number: '2',
      title: 'We Recommend a Plan',
      description: "Based on gaps, we tell you which workshops will move the needle - and which won't. You get a clear proposal with format, timeline, and pricing.",
    },
    {
      number: '3',
      title: 'We Train Your Team',
      description: 'Interactive, practical sessions. Real scenarios, not lectures. Templates, frameworks, certificates, and follow-up support included.',
    },
  ];

  const isFor = [
    'Design teams of 5-50 looking to level up',
    'Companies building in-house design capability',
    'Orgs scaling UX maturity and consistency',
    'Teams with skill gaps in leadership, research, systems, or AI',
  ];

  const isNotFor = [
    { text: 'Individuals looking to switch careers', link: '/programs', linkText: 'Check out Programs' },
    { text: 'Designers seeking 1:1 mentorship', link: '/programs/current', linkText: 'Check out Current or Tide' },
    { text: 'Teams looking to hire designers, not train them', link: '/for-business/hire-ux-designers', linkText: 'We can help with that too' },
  ];

  const testimonialStats = [
    { value: '830+', label: 'Designers Trained' },
    { value: '140+', label: 'Moved to senior & lead roles' },
    { value: '13+', label: 'Years experience' },
  ];

  const quickWins = [
    {
      achievement: 'Assistant Manager at Isha Foundation',
      duration: 'In 3 months',
      name: 'Suril Pandya',
      image: '/images/suril.jpeg',
      linkedin: 'https://www.linkedin.com/in/suril-pandya-86964019/',
    },
    {
      achievement: 'Head of UX at Dot and Beyond',
      duration: 'In 4 months',
      name: 'Shahrukh Jamal',
      image: '/images/shah_rukh.jpeg',
      linkedin: 'https://www.linkedin.com/in/shahrukhjkhan/',
    },
    {
      achievement: 'Head of Design at Bob',
      duration: 'In 2 months',
      name: 'Pavan Muthyala',
      image: '/images/Pavan Mutyala.jpeg',
      linkedin: 'https://www.linkedin.com/in/pavan-muthyala/',
    },
    {
      achievement: 'Director at The Thinking Team',
      duration: 'In 3 months',
      name: 'Siva Karthik',
      image: '/images/siva_karthik.jpeg',
      linkedin: 'https://www.linkedin.com/in/sivakarthikvrimi/',
    },
  ];

  const featuredVideos = [
    {
      name: 'Pavitra Suji',
      role: 'Sr. Designer',
      company: 'McKinsey & Company',
      youtubeId: 'ozw4zab_gH0',
    },
    {
      name: 'Ashley Alemao',
      role: 'UX Designer',
      company: 'Millipixels',
      youtubeId: '9LurTodWb3Q',
    },
    {
      name: 'Vignesh',
      role: 'Sr. UX Designer',
      company: 'Siemens',
      youtubeId: 'H4R-ZVvCxvQ',
    },
  ];

  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const otherWays = [
    {
      icon: 'users',
      title: 'Hire UX Designers',
      description: "Need to grow your design team? We place vetted, ready designers from our mentorship programs. Portfolio-reviewed, 60-day replacement guarantee.",
      link: '/for-business/hire-ux-designers',
      linkText: 'Explore Hire UX Designers',
    },
    {
      icon: 'design',
      title: 'Design Services',
      description: "Need design work done, not a full-time hire? UX audits, product design, and ongoing support - without the overhead of hiring.",
      link: '/for-business/design-services',
      linkText: 'Explore Design Services',
    },
    {
      icon: 'mentorship',
      title: '1:1 Mentorship',
      description: "Have individual designers who want to grow? Our mentorship programs help designers move to more-confident, and senior/leadership roles - structured, practical, outcome-focused.",
      link: '/programs',
      linkText: 'Explore Programs',
    },
  ];

  const faqs = [
    {
      question: 'How much does it cost?',
      answer: 'Workshops start at ₹40,000 for half-day sessions (up to 12 people). Final pricing depends on team size, format (virtual or in-person), and location. We provide a clear proposal after the discovery call.',
    },
    {
      question: 'Do you offer virtual workshops?',
      answer: 'Yes. We run workshops in-person or virtually for teams anywhere. Virtual sessions are live and interactive - not recordings.',
    },
    {
      question: "What's the ideal team size?",
      answer: '8-12 is optimal for interaction and hands-on activities. We can accommodate 5-20 per session. Larger teams can be split into cohorts.',
    },
    {
      question: 'Can you customize a workshop for our specific challenges?',
      answer: "Yes - that's the point. We start with a discovery call to understand your gaps, then recommend (or tailor) workshops accordingly. We don't run generic off-the-shelf sessions.",
    },
    {
      question: "What's included in a workshop?",
      answer: 'Facilitation, all templates and frameworks, certificates for participants, and follow-up support.',
    },
    {
      question: "How is this different from courses like NN/g or online platforms?",
      answer: "Three ways: (1) We diagnose your team's gaps first - no one-size-fits-all curriculum. (2) Sensible pricing based on team size, not per-seat enterprise licensing. (3) Practical frameworks your team uses immediately, not theory they forget.",
    },
    {
      question: 'Do you work with international teams?',
      answer: 'Yes. Virtual workshops work across time zones. For in-person outside Bangalore, pricing includes workshop fee plus travel costs. Contact us for a custom quote.',
    },
    {
      question: "What if we're not sure which workshop we need?",
      answer: "That's what the discovery call is for. We'll assess your team's situation and recommend what will actually help - even if it's not a workshop.",
    },
  ];


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trainingSchema) }}
      />
      <main className="bg-[#030303]">
      {/* Hero Section - Full Background Image */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/95 to-[#030303]/70" />

        {/* Indigo glow accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 50% at 75% 50%, rgba(99,102,241,0.15) 0%, transparent 60%)' }}
        />

        {/* Content */}
        <div className="relative z-10 w-full pt-24 md:pt-28 pb-20 md:pb-28">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            {/* Breadcrumb - matching hire-ux-designers */}
            <nav className="flex items-center gap-2 text-sm mb-16 sm:mb-20" aria-label="Breadcrumb">
              <Link href="/" className="text-white/60 hover:text-white underline underline-offset-2 transition-colors">
                Home
              </Link>
              <svg className="w-4 h-4 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span className="text-white/60 underline underline-offset-2">For Business</span>
              <svg className="w-4 h-4 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span className="text-white font-medium">Training for Teams</span>
            </nav>

            {/* Hero Content with Accent Line */}
            <div
              id="hero"
              ref={(el) => { sectionRefs.current['hero'] = el; }}
              className="flex gap-8"
            >
              {/* Vertical Accent Line */}
              <div className="hidden lg:flex flex-col items-center">
                <div className="w-[2px] h-full min-h-[320px] bg-gradient-to-b from-indigo-400 via-indigo-400/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="max-w-2xl">
                <h1
                  className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
                  style={getSectionStyle('hero', 100)}
                >
                  UX Training for Teams - Built for Your Actual Gaps
                </h1>

                <p
                  className="text-lg md:text-xl text-g300 leading-relaxed mb-10"
                  style={getSectionStyle('hero', 200)}
                >
                  Generic courses teach everyone the same thing. Your team has different problems. We diagnose gaps first, then train on what actually matters - leadership, research, systems, or AI. Half-day and full-day workshops. In-person (Bangalore) or virtual.
                </p>

                {/* CTAs */}
                <div
                  className="flex flex-col sm:flex-row gap-4"
                  style={getSectionStyle('hero', 300)}
                >
                  <Link
                    href="https://calendly.com/team-xperiencewave/xw-strategy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors"
                  >
                    Book Free Discovery Call
                  </Link>
                  <button
                    onClick={() => setIsGuideModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-indigo-400 text-indigo-400 font-semibold rounded-lg hover:bg-indigo-400/10 transition-colors"
                  >
                    Download Team Gap Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 100%)' }}>
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="statsGridTraining" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#statsGridTraining)" />
          </svg>
        </div>

        {/* Center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] blur-3xl pointer-events-none"
          style={{ background: 'rgba(99,102,241,0.2)', opacity: 0.4 }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #6366f1 50%, transparent 100%)' }}
        />

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #6366f1 50%, transparent 100%)' }}
        />

        <div
          id="stats-section"
          ref={(el) => { sectionRefs.current['stats-section'] = el; }}
          className="relative max-w-[1200px] mx-auto px-5 py-8 md:py-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-6 md:gap-0">
            {/* Stat 1 */}
            <div
              className="relative text-center px-4 md:px-6 lg:px-8"
              style={getSectionStyle('stats-section', 0)}
            >
              <div
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10"
                style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
              />
              <div className="mb-1">
                <span className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  830+
                </span>
              </div>
              <span className="font-body text-xs md:text-sm tracking-wide uppercase text-g400">
                Designers Trained
              </span>
            </div>

            {/* Stat 2 */}
            <div
              className="relative text-center px-4 md:px-6 lg:px-8"
              style={getSectionStyle('stats-section', 100)}
            >
              <div
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10"
                style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
              />
              <div className="mb-1">
                <span className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  13+
                </span>
              </div>
              <span className="font-body text-xs md:text-sm tracking-wide uppercase text-g400">
                Years Experience
              </span>
            </div>

            {/* Stat 3 */}
            <div
              className="relative text-center px-4 md:px-6 lg:px-8 col-span-2 md:col-span-1"
              style={getSectionStyle('stats-section', 200)}
            >
              <div className="mb-1">
                <span className="font-heading text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                  JP Morgan, McKinsey, Intel, Deloitte
                </span>
              </div>
              <span className="font-body text-xs md:text-sm tracking-wide uppercase text-g400">
                Trusted By
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section - Alternating Zigzag */}
      <section
        id="problem"
        ref={(el) => { sectionRefs.current['problem'] = el; }}
        className="relative py-12 md:py-16 lg:py-20"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#030303]" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
          {/* Section Header */}
          <div style={getSectionStyle('problem', 0)}>
            <span className="flex items-center gap-3 text-indigo-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">
              <span className="w-8 h-[2px] bg-indigo-500" />
              The Challenge
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-8 md:mb-12">
              The Problem with Most UX Trainings
            </h2>
          </div>

          {/* Alternating Zigzag Layout */}
          <div className="space-y-8 md:space-y-12">
            {problems.map((problem, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 md:gap-8 lg:gap-12 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
                style={getSectionStyle('problem', (index + 1) * 100)}
              >
                {/* Large Number */}
                <div className={`flex-shrink-0 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <span className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-indigo-500/20 leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className={`flex-1 pt-1 md:pt-4 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-2">
                    {problem.title}
                  </h3>
                  <p className={`text-g400 text-sm md:text-base leading-relaxed max-w-xl ${index % 2 === 1 ? 'md:ml-auto' : ''}`}>
                    {problem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div
            className="mt-10 md:mt-12"
            style={getSectionStyle('problem', 500)}
          >
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 md:p-6">
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              <p className="text-center font-heading text-base md:text-lg font-medium text-white">
                Your team deserves training that's built for their actual gaps - not someone else's curriculum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Teams Choose Us Section */}
      <section
        id="why-choose-us"
        ref={(el) => { sectionRefs.current['why-choose-us'] = el; }}
        className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
      >
        {/* Gradient Background from Option 1 */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-[#030303] to-purple-950/30" />
        {/* Mesh gradient overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.3) 0%, transparent 50%)' }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
          {/* Section Header */}
          <div style={getSectionStyle('why-choose-us', 0)}>
            <span className="flex items-center gap-3 text-indigo-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">
              <span className="w-8 h-[2px] bg-indigo-500" />
              Why Us
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-12 md:mb-16">
              Why Teams Choose Us
            </h2>
          </div>

          {/* Option 9 Layout - Two column with vertical accent lines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="relative pl-5 md:pl-6"
                style={getSectionStyle('why-choose-us', (index + 1) * 100)}
              >
                <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-indigo-500 to-transparent" />
                <h3 className="font-heading text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-g400 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UX Workshops Section - Horizontal Scroll */}
      <section
        id="workshops"
        ref={(el) => { sectionRefs.current['workshops'] = el; }}
        className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        <div className="relative z-10">
          <div
            className="max-w-[1200px] mx-auto px-5 md:px-8 mb-12"
            style={getSectionStyle('workshops', 0)}
          >
            <span className="flex items-center gap-3 text-indigo-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">
              <span className="w-8 h-[2px] bg-indigo-500" />
              Workshops
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white">
              UX Workshops for Design Teams
            </h2>
          </div>

          <div
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Start spacer for proper left gutter */}
            <div className="flex-shrink-0 w-5 md:w-8 xl:w-[max(2rem,calc((100vw-1200px)/2+2rem))]" aria-hidden="true" />

            {/* Featured Workshop Card */}
            <div
              className="flex-shrink-0 w-[85vw] md:w-[500px] snap-start"
              style={getSectionStyle('workshops', 100)}
            >
              <div className="relative h-full min-h-[450px] rounded-2xl overflow-hidden border border-indigo-500/30 bg-gradient-to-b from-indigo-950 via-indigo-900/30 to-[#030303]">
                {/* Background Illustration */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[280px] h-[200px] md:w-[350px] md:h-[240px]">
                  <Image
                    src={featuredWorkshop.image}
                    alt={featuredWorkshop.title}
                    fill
                    className="object-contain"
                    style={{ filter: 'hue-rotate(200deg) saturate(1.2)' }}
                  />
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent" />

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-end">
                  <span className="inline-block w-fit px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-semibold mb-4">
                    {featuredWorkshop.badge}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">{featuredWorkshop.title}</h3>
                  <p className="text-g300 mb-4">{featuredWorkshop.tagline}</p>
                  <p className="text-g400 text-sm mb-2">
                    <span className="text-white">For:</span> {featuredWorkshop.forWho}
                  </p>
                  <p className="text-g400 text-sm mb-6">
                    <span className="text-white">Duration:</span> {featuredWorkshop.duration}
                  </p>
                  <Link
                    href="https://calendly.com/team-xperiencewave/xw-strategy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit px-5 py-2.5 bg-white text-indigo-900 text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors"
                  >
                    Book Discovery Call
                  </Link>
                </div>
              </div>
            </div>

            {/* Other Workshop Cards */}
            {workshops.map((workshop, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] md:w-[350px] snap-start"
                style={getSectionStyle('workshops', (index + 2) * 100)}
              >
                <div className="relative h-full min-h-[450px] rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/30 transition-colors bg-gradient-to-b from-indigo-950/80 via-slate-900/50 to-[#030303]">
                  {/* Background Illustration */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[200px] h-[160px] md:w-[250px] md:h-[200px]">
                    <Image
                      src={workshop.image}
                      alt={workshop.title}
                      fill
                      className="object-contain"
                      style={{ filter: 'hue-rotate(200deg) saturate(1.2)' }}
                    />
                  </div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent" />

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-end">
                    <h3 className="font-heading text-xl font-bold text-white mb-2">{workshop.title}</h3>
                    <p className="text-g400 text-sm mb-4">{workshop.tagline}</p>
                    <p className="text-g400 text-xs mb-2">
                      <span className="text-white font-medium">For:</span> {workshop.forWho}
                    </p>
                    <p className="text-g400 text-xs mb-4">
                      <span className="text-white font-medium">Duration:</span> {workshop.duration}
                    </p>
                    <button
                      onClick={() => setExpandedWorkshop(expandedWorkshop === index ? null : index)}
                      className="text-indigo-400 text-sm font-medium hover:text-indigo-300 transition-colors text-left flex items-center gap-1"
                    >
                      What they&apos;ll learn?
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${expandedWorkshop === index ? 'rotate-90' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Expandable Learnings */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-out ${
                        expandedWorkshop === index ? 'max-h-[300px] mt-4' : 'max-h-0'
                      }`}
                    >
                      <ul className="space-y-2 text-xs text-g300 border-t border-white/10 pt-4">
                        {workshop.learnings.map((learning, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-indigo-400 mt-0.5">•</span>
                            <span>{learning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Card */}
            <div
              className="flex-shrink-0 w-[85vw] md:w-[300px] snap-start"
              style={getSectionStyle('workshops', 600)}
            >
              <div className="h-full min-h-[400px] p-6 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] flex flex-col items-center justify-center text-center">
                <p className="text-white font-medium mb-2">Need something specific?</p>
                <p className="text-g400 text-sm mb-6">We build custom workshops for your team's unique challenges.</p>
                <Link
                  href="https://calendly.com/team-xperiencewave/xw-strategy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Book Free Discovery Call
                </Link>
              </div>
            </div>

            {/* End spacer for proper scroll padding */}
            <div className="flex-shrink-0 w-5 md:w-8 xl:w-[max(2rem,calc((100vw-1200px)/2+2rem))]" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* How It Works Section - Option 3: Cards with Arrows */}
      <section
        id="how-it-works"
        ref={(el) => { sectionRefs.current['how-it-works'] = el; }}
        className="relative py-20 md:py-28 lg:py-32"
      >
        <div className="absolute inset-0 bg-[#030303]" />
        {/* Mesh gradient */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.3) 0%, transparent 50%)' }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="text-center" style={getSectionStyle('how-it-works', 0)}>
            <span className="flex items-center justify-center gap-3 text-indigo-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">
              <span className="w-8 h-[2px] bg-indigo-500" />
              The Process
              <span className="w-8 h-[2px] bg-indigo-500" />
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-16">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2 items-stretch">
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-center"
                style={getSectionStyle('how-it-works', (index + 1) * 100)}
              >
                <div className="relative flex-1 p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.02] h-full overflow-hidden">
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-400 to-indigo-600" />
                  <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-g400 text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block px-2 flex-shrink-0">
                    <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            className="mt-16 text-center"
            style={getSectionStyle('how-it-works', 500)}
          >
            <p className="text-g400 mb-4">Ready to start?</p>
            <Link
              href="https://calendly.com/team-xperiencewave/xw-strategy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Book Free Discovery Call
            </Link>
          </div>
        </div>
      </section>

      {/* Is This Right for Your Team? Section - Option 1 with VS badge */}
      <section
        id="is-this-right"
        ref={(el) => { sectionRefs.current['is-this-right'] = el; }}
        className="relative py-20 md:py-28 lg:py-32"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#030303]" />

        <div className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-8">
          <div className="text-center" style={getSectionStyle('is-this-right', 0)}>
            <span className="flex items-center justify-center gap-3 text-indigo-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">
              <span className="w-8 h-[2px] bg-indigo-500" />
              Right Fit
              <span className="w-8 h-[2px] bg-indigo-500" />
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-12">
              Is This Right for Your Team?
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* VS badge in center - desktop */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0a0a0a] border border-white/20 items-center justify-center z-10">
              <span className="text-g400 text-xs font-bold">VS</span>
            </div>

            {/* This is for */}
            <div
              className="p-6 md:p-8 rounded-2xl border border-green-500/30 bg-green-500/5"
              style={getSectionStyle('is-this-right', 100)}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-white">This is for:</h3>
              </div>
              <ul className="space-y-3">
                {isFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-g300 text-sm">
                    <span className="text-green-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* VS badge - mobile */}
            <div className="flex md:hidden justify-center -my-3">
              <div className="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/20 flex items-center justify-center">
                <span className="text-g400 text-xs font-bold">VS</span>
              </div>
            </div>

            {/* This is not for */}
            <div
              className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
              style={getSectionStyle('is-this-right', 200)}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  <svg className="w-5 h-5 text-g400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-white">This is not for:</h3>
              </div>
              <ul className="space-y-3">
                {isNotFor.map((item, i) => (
                  <li key={i} className="text-g400 text-sm">
                    <span className="text-g500">•</span> {item.text} →{' '}
                    <Link href={item.link} className="text-indigo-400 hover:underline">
                      {item.linkText}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Real Transformation, Real People Section */}
      <section
        id="testimonials"
        ref={(el) => { sectionRefs.current['testimonials'] = el; }}
        className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#030303]" />
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Accent glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] blur-[150px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.15) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
          {/* Header */}
          <div
            className="text-center mb-10 sm:mb-12 md:mb-16"
            style={getSectionStyle('testimonials', 0)}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-indigo-500" />
              <span className="font-body text-xs uppercase tracking-[0.2em] font-medium text-indigo-400">Success Stories</span>
              <div className="w-8 h-[2px] bg-indigo-500" />
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
              Real Transformation, Real People
            </h2>
            <p className="font-body text-sm md:text-base text-g400 max-w-xl mx-auto">
              Hear from designers who made the shift
            </p>
          </div>

          {/* Large Stats Bar */}
          <div
            className="grid grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16 py-8 border-y border-white/10"
            style={getSectionStyle('testimonials', 100)}
          >
            {testimonialStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-500/40">{stat.value}</div>
                <div className="text-g400 text-xs sm:text-sm mt-1 md:mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Wins Cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12"
            style={getSectionStyle('testimonials', 200)}
          >
            {quickWins.map((win) => (
              <a
                key={win.name}
                href={win.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-[#0a0a0a] sm:hover:border-indigo-500/40 transition-all duration-300 h-full">
                  {/* Duration badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1.5 text-xs font-bold rounded-full text-indigo-400 bg-indigo-500/15 border border-indigo-500/30">
                      {win.duration}
                    </span>
                  </div>

                  {/* Achievement */}
                  <h4 className="font-heading text-base sm:text-lg font-bold text-white mb-5 leading-snug line-clamp-3">
                    {win.achievement}
                  </h4>

                  {/* Person with LinkedIn */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-g700 to-g800 ring-2 ring-white/10 overflow-hidden flex-shrink-0">
                        <img
                          src={win.image}
                          alt={win.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="font-body text-sm text-g400">{win.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#0A66C2] opacity-70 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Video Testimonials */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12"
            style={getSectionStyle('testimonials', 300)}
          >
            {featuredVideos.map((video) => {
              const isPlaying = playingVideo === video.name;
              return (
                <div
                  key={video.name}
                  className={`group ${!isPlaying ? 'cursor-pointer' : ''}`}
                  onClick={() => !isPlaying && setPlayingVideo(video.name)}
                >
                  <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                    isPlaying ? 'border-indigo-500/50' : 'border-white/10 sm:hover:border-indigo-500/40'
                  }`}>
                    {/* Image/Video area */}
                    <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
                      {/* Inline YouTube Player */}
                      {isPlaying ? (
                        <>
                          <iframe
                            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={`Testimonial video from ${video.name}`}
                          />
                          {/* Close button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingVideo(null);
                            }}
                            className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 transition-colors"
                            aria-label="Close video"
                          >
                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                            alt={video.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                          {/* Play button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="transform sm:group-hover:scale-110 transition-transform duration-300">
                              <div className="relative">
                                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2s' }} />
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                  <circle cx="24" cy="24" r="23" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="2" />
                                  <path d="M20 16L32 24L20 32V16Z" fill="white" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          {/* Info overlay at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                            <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-1">
                              {video.name}
                            </h3>
                            <p className="font-body text-sm text-white/90">
                              {video.role}
                            </p>
                            <p className="font-body text-xs sm:text-sm text-white/70">
                              {video.company}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div
            className="text-center"
            style={getSectionStyle('testimonials', 400)}
          >
            <Link
              href="/success-stories"
              className="group inline-flex items-center gap-1.5 font-body text-sm sm:text-base font-medium text-indigo-400 transition-all duration-300 hover:gap-2.5"
            >
              <span className="underline underline-offset-4 decoration-1">
                See all success stories
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Gap Analysis CTA Section */}
      <section
        id="gap-analysis"
        ref={(el) => { sectionRefs.current['gap-analysis'] = el; }}
        className="relative py-16 md:py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/50 via-[#0a0a0a] to-indigo-950/50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
          <div
            className="text-center mb-10"
            style={getSectionStyle('gap-analysis', 0)}
          >
            <span className="flex items-center justify-center gap-3 text-indigo-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">
              <span className="w-8 h-[2px] bg-indigo-500" />
              Free Resource
              <span className="w-8 h-[2px] bg-indigo-500" />
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
              Not Sure Where Your Team Needs Help?
            </h2>
            <p className="text-g400 max-w-2xl mx-auto">
              Use our Team Gap Analysis template to audit your team's skills across 6 key areas.
            </p>
          </div>

          {/* Feature Pills */}
          <div
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10"
            style={getSectionStyle('gap-analysis', 100)}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm">Skill assessment framework across 8 areas</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm">Scoring guide to identify priority gaps</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm">Suggested next steps based on results</span>
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row justify-center gap-4"
            style={getSectionStyle('gap-analysis', 200)}
          >
            <Link
              href="https://calendly.com/team-xperiencewave/xw-strategy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Book Free Discovery Call
            </Link>
            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-indigo-400 text-indigo-400 font-semibold rounded-lg hover:bg-indigo-400/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Team Gap Analysis
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Frequently Asked Questions"
        faqs={faqs}
        theme="indigo"
        mode="dark"
        ctaText="Contact Us"
        ctaHref="/contact"
      />

      {/* Other Ways We Help Product Teams Section */}
      <section
        id="other-ways"
        ref={(el) => { sectionRefs.current['other-ways'] = el; }}
        className="relative py-20 md:py-28 lg:py-32"
      >
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.3) 0%, transparent 50%)' }} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="text-center" style={getSectionStyle('other-ways', 0)}>
            <span className="flex items-center justify-center gap-3 text-indigo-400 text-xs uppercase tracking-[0.2em] font-medium mb-4">
              <span className="w-8 h-[2px] bg-indigo-500" />
              More Services
              <span className="w-8 h-[2px] bg-indigo-500" />
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-12">
              Other Ways We Help Product Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherWays.map((item, i) => (
              <div
                key={i}
                className="relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center overflow-hidden"
                style={getSectionStyle('other-ways', (i + 1) * 100)}
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-400 to-indigo-600" />
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-6">
                  {i === 0 && (
                    <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-g400 text-sm leading-relaxed mb-6">{item.description}</p>
                <Link href={item.link} className="inline-flex items-center text-indigo-400 font-medium text-sm hover:text-indigo-300 transition-colors">
                  {item.linkText} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section with X Motif */}
      <section className="relative py-14 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Subtle gradient overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 0%, rgba(99,102,241,0.05) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 100%, rgba(99,102,241,0.03) 0%, transparent 50%)
            `,
          }}
        />

        {/* X Motif - positioned on the right */}
        <span
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 font-heading font-extrabold text-[300px] md:text-[500px] lg:text-[600px] text-indigo-500/[0.06] pointer-events-none select-none"
          aria-hidden="true"
        >
          X
        </span>

        {/* Content */}
        <div className="relative z-10 max-w-[800px] mx-auto px-5 text-center">
          {/* Heading */}
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Ready to Build a Stronger Design Team?
          </h2>

          {/* Subtext */}
          <p className="font-body text-sm md:text-base text-g400 mb-8 max-w-[600px] mx-auto">
            Book a free discovery call. We'll diagnose your team's gaps and recommend what will actually help - even if it's not us.
          </p>

          {/* CTA Button */}
          <Link
            href="https://calendly.com/team-xperiencewave/xw-strategy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Book Free Discovery Call
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Contact info */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-x-2 gap-y-2">
            <span className="font-body text-sm md:text-base text-g400">Prefer to talk first?</span>
            <span className="text-g600 mx-3">|</span>
            <a href="mailto:training@xperiencewave.com" className="font-body text-sm md:text-base text-g400 hover:text-white transition-colors">
              training@xperiencewave.com
            </a>
            <span className="text-g600 mx-3">|</span>
            <a href="tel:+918147706841" className="font-body text-sm md:text-base text-g400 hover:text-white transition-colors">
              +91 8147706841
            </a>
          </div>
        </div>
      </section>
    </main>

    {/* Guide Download Modal */}
    <GuideDownloadModal
      isOpen={isGuideModalOpen}
      onClose={() => setIsGuideModalOpen(false)}
      guideType="team-gap-analysis"
    />
    </>
  );
}
