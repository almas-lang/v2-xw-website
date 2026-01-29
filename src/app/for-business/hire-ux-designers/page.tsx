'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TestimonialCarousel from '@/components/shared/TestimonialCarousel';
import FAQ from '@/components/shared/FAQ';
import MenteesWorkAt from '@/components/shared/MenteesWorkAt';
import Button from '@/components/ui/Button';
import HiringGuideModal from '@/components/shared/HiringGuideModal';

// Note: Metadata moved to layout.tsx for this client component

const stats = [
  { value: '3000+', label: 'Designers Trained' },
  { value: '210+', label: 'Ready to Hire' },
  { value: '48-72 hrs', label: 'To Match Profiles' },
  { value: '<2 weeks', label: 'Avg. Time to Hire' },
];

const successStories = [
  { name: 'Suril Pandya', role: 'Assistant Manager at Isha Foundation', image: '/images/suril.jpeg' },
  { name: 'Shahrukh Jamal', role: 'Head of UX at Dot and Beyond', image: '/images/shah_rukh.jpeg' },
  { name: 'Pavan Muthyala', role: 'Head of Design at Bob', image: '/images/Pavan Mutyala.jpeg' },
  { name: 'Siva Karthik', role: 'Director at The Thinking Team', image: '/images/siva_karthik.jpeg' },
  { name: 'Kritika Singh', role: 'Lead Product designer at a German startup', image: '/images/Kritika Singh.jpeg' },
  { name: 'Radhakrishna A', role: 'Principal Designer at Informatica', image: '/images/Radhakrishna Aekbote.jpeg' },
  { name: 'Sheetal P', role: 'Design Lead at CX100', image: '/images/sheetal.png' },
  { name: 'Jonah Immanuel', role: 'Sr. Lead Designer at Wongdoody', image: '/images/Jonah_Immanuel.png' },
  { name: 'Divya Srinivas', role: 'UX Designer at SenecaGlobal', image: '/images/Divya.jpeg' },
  { name: 'Maitreyee Kane', role: 'Designer at Montran India', image: '/images/Maitreyee-kane.jpeg' },
  { name: 'Akash Kale', role: 'UI/UX Design Associate at JLL', image: '/images/Akash.jpeg' },
  { name: 'Ramesh Vatti', role: 'UX Designer at Deloitte', image: '/images/Ramesh.jpeg' },
  { name: 'Ashley', role: 'UX Designer', image: '/images/ashley.png' },
  { name: 'Navisha Fernando', role: 'UX Designer', image: '/images/Navisha Fernando.jpeg' },
  { name: 'Jerin John', role: 'UX Designer', image: '/images/Jerin John.jpeg' },
  { name: 'Sreekanth VK', role: 'UX Designer', image: '/images/Sreekanth VK.jpeg' },
  { name: 'Vikram Rajak', role: 'UX Designer', image: '/images/Vikram Rajak.jpeg' },
  { name: 'Abhishek', role: 'UX Designer', image: '/images/abhishek.jpeg' },
  { name: 'Vignesh', role: 'UX Designer', image: '/images/vignesh.jpeg' },
  { name: 'Shivangini', role: 'UX Designer', image: '/images/shivangini.jpeg' },
  { name: 'Vidhyasagar', role: 'UX Designer', image: '/images/Vidhyasagar.jpeg' },
  { name: 'Maulin Rajput', role: 'UX Designer', image: '/images/Maulin Rajput.jpeg' },
  { name: 'Utkarsh Choudhary', role: 'UX Designer', image: '/images/Utkarsh Choudhary.jpeg' },
];

const hiringManagerQuotes = [
  {
    quote: "Our designer from Xperience Wave reduced our checkout drop-off by 23% in their first quarter. They didn't just push pixels - they understood our conversion funnel and prioritized impact over aesthetics.",
    name: 'VP of Product',
    company: 'Series B E-commerce Platform',
  },
  {
    quote: "What impressed me was their ability to translate business metrics into design decisions. They proactively aligned with our OKRs and measured their work against revenue outcomes, not just design deliverables.",
    name: 'Chief Product Officer',
    company: 'Series A Fintech Startup',
  },
  {
    quote: "We needed someone who could influence product strategy, not just execute mockups. The designer we hired now leads cross-functional sprint planning and has become a key voice in our roadmap discussions.",
    name: 'Head of Product',
    company: 'Enterprise SaaS Company',
  },
];

const hiringFAQs = [
  {
    question: 'What design roles can you help us hire?',
    answer: 'UX Designers, Product Designers, UI Designers, Visual Designers, UX Researchers, UX Writers, Interaction Designers, Design Leads, Design Managers, and Principal Designers.',
  },
  {
    question: 'Which industries do you work with?',
    answer: 'SaaS, Fintech, EdTech, HealthTech, E-commerce, and Enterprise Software. We work best with funded tech companies scaling their product teams.',
  },
  {
    question: 'How do you handle timezone differences when hiring remote designers?',
    answer: "We filter for timezone overlap before sharing profiles. Our designers are available across India, UAE, Singapore, US, UK, and Australia. You'll only see candidates who can work your hours.",
  },
  {
    question: 'How do you ensure communication quality with remote UX designers?',
    answer: "Every designer in our pool completed a 90-day mentorship that includes async communication, stakeholder management, and documentation. They've already worked in distributed teams.",
  },
  {
    question: 'How do you prevent moonlighting when hiring designers from India?',
    answer: "We only recommend designers actively seeking full-time roles. No passive candidates. No side-hustlers. We've trained them - we know their availability and commitment.",
  },
  {
    question: 'How quickly can you share UX designer profiles?',
    answer: 'Within 48-72 hours of understanding your requirements.',
  },
  {
    question: "What if the designer doesn't work out after hiring?",
    answer: 'If they leave within 30 days, we provide a free replacement.',
  },
  {
    question: 'Who employs the designer after placement?',
    answer: 'You do. They join your payroll directly - full-time, contract, or project-based. We facilitate the match, not the employment.',
  },
];

export default function HireUXDesignersPage() {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

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
    transform: visibleSections[sectionId] ? 'translateY(0)' : 'translateY(40px)',
    transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
  });

  const getItemStyle = (sectionId: string, index: number) => ({
    opacity: visibleSections[sectionId] ? 1 : 0,
    transform: visibleSections[sectionId] ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms`,
  });

  return (
    <main>
      {/* Hero Section - Dark Overlay Style */}
      <section className="bg-carbon relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1600&q=80"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Glow Effects */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(99,102,241,0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(220,238,255,0.05) 0%, transparent 50%)
            `,
          }}
        />

        {/* Floating Decorative Elements */}
        <div className="absolute top-32 left-[12%] w-3 h-3 bg-indigo-500/40 rounded-full hidden md:block animate-pulse" />
        <div className="absolute top-[45%] right-[8%] w-2 h-2 bg-white/30 rounded-full hidden lg:block animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[30%] left-[5%] w-2 h-2 bg-indigo-400/30 rounded-full hidden lg:block animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 pt-24 md:pt-28 pb-20 md:pb-28">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8">
            {/* Breadcrumb */}
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
              <span className="text-white font-medium">Hire UX Designers</span>
            </nav>

            {/* Hero Content */}
            <div
              id="hero-content"
              ref={(el) => { sectionRefs.current['hero-content'] = el; }}
              className="max-w-[700px]"
            >
              <h1
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
                style={getSectionStyle('hero-content', 0)}
              >
                Hire Trained UX Designers From India
              </h1>

              <p
                className="text-lg md:text-xl text-g300 leading-relaxed mb-8"
                style={getSectionStyle('hero-content', 150)}
              >
                Hire from a pool of <strong className="text-white">3000+</strong> UX designers we trained ourselves. No resume roulette. No fake case studies. Just designers who can actually do the work.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4" style={getSectionStyle('hero-content', 300)}>
                <Link
                  href="/for-business/hire-ux-designers/requirements"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Share Your Requirements
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <button
                  onClick={() => setIsGuideModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-indigo-400 text-indigo-400 font-semibold rounded-lg hover:bg-indigo-400/10 transition-colors"
                >
                  Download: How to Hire UX Designer from India (Free Guide)
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
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
              <pattern id="statsGridHire" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#statsGridHire)" />
          </svg>
        </div>

        {/* Center glow - indigo themed */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] blur-3xl pointer-events-none"
          style={{ background: 'rgba(99,102,241,0.15)', opacity: 0.4 }}
        />

        {/* Top accent line - indigo */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #6366f1 50%, transparent 100%)' }}
        />

        {/* Bottom accent line - indigo */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #6366f1 50%, transparent 100%)' }}
        />

        <div
          id="stats-section"
          ref={(el) => { sectionRefs.current['stats-section'] = el; }}
          className="relative max-w-[1200px] mx-auto px-5 py-8 md:py-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-6 md:gap-0">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative text-center px-4 md:px-6 lg:px-8"
                style={getItemStyle('stats-section', index)}
              >
                {/* Divider line between stats (not after last) */}
                {index < stats.length - 1 && (
                  <div
                    className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-10"
                    style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
                  />
                )}
                <div className="mb-1">
                  <span className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                    {stat.value}
                  </span>
                </div>
                <span className="font-body text-xs md:text-sm tracking-wide uppercase text-g400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Hiring is Broken Section */}
      <section className="bg-carbon py-16 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Glow Effects */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 80% 30%, rgba(99,102,241,0.05) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 10% 70%, rgba(220,238,255,0.04) 0%, transparent 50%)
            `,
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-8">
          <div
            id="why-broken-section"
            ref={(el) => { sectionRefs.current['why-broken-section'] = el; }}
            className="grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center"
          >
            {/* Left - Chat Mockup */}
            <div className="order-2 lg:order-1" style={getItemStyle('why-broken-section', 1)}>
              <div className="bg-[#1c1c1e] rounded-[2rem] p-2 shadow-2xl max-w-[420px] mx-auto lg:mx-0">
                {/* Status bar */}
                <div className="bg-[#2c2c2e] rounded-t-[1.75rem] px-6 py-3 flex justify-between items-center text-white text-sm">
                  <span>9:41</span>
                  <span>100%</span>
                </div>

                {/* Chat header */}
                <div className="bg-[#1c1c1e] px-4 py-3 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-indigo-500" />
                  <div>
                    <p className="text-white font-semibold">Hiring Manager</p>
                    <p className="text-white/50 text-sm">Active now</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="bg-[#000000] p-4 space-y-3 rounded-b-[1.75rem]">
                  {/* Sent */}
                  <div className="flex justify-end">
                    <div className="bg-[#0b93f6] text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%]">
                      <p className="text-[15px]">Hey! How's the new designer working out?</p>
                      <p className="text-white/60 text-xs mt-1">2:34 PM</p>
                    </div>
                  </div>

                  {/* Received */}
                  <div className="flex justify-start">
                    <div className="bg-[#3a3a3c] text-white px-4 py-2.5 rounded-2xl rounded-bl-md">
                      <p className="text-[15px]">Don't even get me started</p>
                      <p className="text-white/50 text-xs mt-1">2:35 PM</p>
                    </div>
                  </div>

                  {/* Received */}
                  <div className="flex justify-start">
                    <div className="bg-[#3a3a3c] text-white px-4 py-2.5 rounded-2xl rounded-bl-md">
                      <p className="text-[15px]">Remember that amazing portfolio?</p>
                      <p className="text-white/50 text-xs mt-1">2:35 PM</p>
                    </div>
                  </div>

                  {/* Sent */}
                  <div className="flex justify-end">
                    <div className="bg-[#0b93f6] text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%]">
                      <p className="text-[15px]">The one with the fintech redesign?</p>
                      <p className="text-white/60 text-xs mt-1">2:36 PM</p>
                    </div>
                  </div>

                  {/* Received */}
                  <div className="flex justify-start">
                    <div className="bg-[#3a3a3c] text-white px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[85%]">
                      <p className="text-[15px]">Yeah turns out that was a 'team project'</p>
                      <p className="text-white/50 text-xs mt-1">2:36 PM</p>
                    </div>
                  </div>

                  {/* Received */}
                  <div className="flex justify-start">
                    <div className="bg-[#3a3a3c] text-white px-4 py-2.5 rounded-2xl rounded-bl-md max-w-[85%]">
                      <p className="text-[15px]">He can't even run a user interview</p>
                      <p className="text-white/50 text-xs mt-1">2:37 PM</p>
                    </div>
                  </div>

                  {/* Sent - Emoji */}
                  <div className="flex justify-end">
                    <div className="bg-[#0b93f6] text-white px-4 py-2.5 rounded-2xl rounded-br-md">
                      <p className="text-2xl">😬</p>
                      <p className="text-white/60 text-xs mt-1">2:37 PM</p>
                    </div>
                  </div>

                  {/* Received */}
                  <div className="flex justify-start">
                    <div className="bg-[#3a3a3c] text-white px-4 py-2.5 rounded-2xl rounded-bl-md">
                      <p className="text-[15px]">3 months wasted. Again.</p>
                      <p className="text-white/50 text-xs mt-1">2:38 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="order-1 lg:order-2" style={getItemStyle('why-broken-section', 0)}>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.15] mb-6">
                Why Hiring UX Designers is Broken
              </h2>

              <div className="space-y-4 text-sm md:text-base text-g400 leading-relaxed">
                <p>
                  Stunning portfolio. Great interview. Three months later — they can't run a user interview and half their case studies were <span className="text-white font-medium">team projects</span>.
                </p>

                <p className="text-red-400 font-semibold">
                  That's the best case.
                </p>

                <p>
                  Worse? Remote designers juggling <span className="text-white font-medium">3 jobs</span>. Ghosting after onboarding. Zero accountability. Portfolios that look great but were actually made by their "friend."
                </p>

                <p>
                  Recruitment agencies? They forward LinkedIn profiles. They've <span className="text-red-400">never seen the designer actually work</span>. They don't know Figma from Fiverr.
                </p>

                <p>
                  Freelance platforms? You're gambling. Sorting through 200 proposals to find someone who might be decent. No guarantee they'll stick around.
                </p>
              </div>

            </div>
          </div>

          {/* Banner */}
          <div
            id="why-broken-banner"
            ref={(el) => { sectionRefs.current['why-broken-banner'] = el; }}
            className="mt-12 md:mt-16 bg-indigo-500/15 border border-indigo-400/30 rounded-xl px-6 py-5"
            style={getSectionStyle('why-broken-banner')}
          >
            <p className="text-lg md:text-xl text-white font-semibold text-center">
              What if you could hire someone we've already trained, tested, and bet on?
            </p>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div
        className="h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 50%, transparent 100%)' }}
      />

      {/* How Hiring Works Section */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          {/* Eyebrow Header */}
          <div
            id="how-it-works-header"
            ref={(el) => { sectionRefs.current['how-it-works-header'] = el; }}
            style={getSectionStyle('how-it-works-header')}
          >
            <span className="flex items-center justify-center gap-3 text-indigo-500 text-xs uppercase tracking-[0.3em] font-medium mb-4">
              <span className="w-8 h-[1px] bg-indigo-500/50" />
              Our Process
              <span className="w-8 h-[1px] bg-indigo-500/50" />
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon text-center leading-[1.15] mb-4">
              How Hiring Through Xperience Wave Works
            </h2>
            <p className="text-sm md:text-base text-g500 text-center mb-12 md:mb-16 max-w-2xl mx-auto">
              From first call to hired designer in under two weeks
            </p>
          </div>

          {/* Steps - Card Based Design */}
          <div
            id="how-it-works-steps"
            ref={(el) => { sectionRefs.current['how-it-works-steps'] = el; }}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {/* Step 1 */}
            <div
              className="relative bg-white rounded-2xl p-6 md:p-8 border border-g200 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              style={getItemStyle('how-it-works-steps', 0)}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-400 to-indigo-600" />
              <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold text-xl mb-5">
                1
              </div>
              <h3 className="text-xl font-bold text-carbon mb-3">Tell Us What You Need</h3>
              <p className="text-sm md:text-base text-g500 leading-relaxed">
                Quick 20-minute call. We understand the role, team dynamics, budget, and what "good" looks like for your context.
              </p>
              <div className="mt-5 pt-5 border-t border-g200">
                <span className="text-sm font-medium text-indigo-600">20 min call</span>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="relative bg-white rounded-2xl p-6 md:p-8 border border-g200 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              style={getItemStyle('how-it-works-steps', 1)}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-400 to-indigo-600" />
              <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold text-xl mb-5">
                2
              </div>
              <h3 className="text-xl font-bold text-carbon mb-3">We Match From Our Trained Pool</h3>
              <p className="text-sm md:text-base text-g500 leading-relaxed">
                Within 48-72 hours, you get 3-5 handpicked UX designer profiles - with our notes on fit, strengths, and working style.
              </p>
              <div className="mt-5 pt-5 border-t border-g200">
                <span className="text-sm font-medium text-indigo-600">48-72 hours</span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="relative bg-white rounded-2xl p-6 md:p-8 border border-g200 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              style={getItemStyle('how-it-works-steps', 2)}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-400 to-indigo-600" />
              <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold text-xl mb-5">
                3
              </div>
              <h3 className="text-xl font-bold text-carbon mb-3">Interview, Hire, Done</h3>
              <p className="text-sm md:text-base text-g500 leading-relaxed">
                You interview. We help close. Designer joins your payroll. 60-day replacement guarantee if it doesn't work out.
              </p>
              <div className="mt-5 pt-5 border-t border-g200">
                <span className="text-sm font-medium text-indigo-600">60-day guarantee</span>
              </div>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="mt-12 md:mt-16 bg-carbon rounded-2xl p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-6 md:gap-0">
              <div className="text-center md:border-r md:border-white/10">
                <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">&lt;2 weeks</div>
                <div className="text-sm text-g400">Average time to hire</div>
              </div>
              <div className="text-center md:border-r md:border-white/10">
                <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">85%</div>
                <div className="text-sm text-g400">Clients interview 2+ candidates</div>
              </div>
              <div className="text-center">
                <div className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">92%</div>
                <div className="text-sm text-g400">Still employed after 6 months</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div
        className="h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 50%, transparent 100%)' }}
      />

      {/* Why We're Different Section */}
      <section className="bg-carbon py-16 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Glow Effects */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 60% 50% at 30% 20%, rgba(99,102,241,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 70% 80%, rgba(220,238,255,0.04) 0%, transparent 50%)
            `,
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-8">
          {/* Header */}
          <div
            id="why-different-header"
            ref={(el) => { sectionRefs.current['why-different-header'] = el; }}
            className="text-center mb-12 md:mb-16"
            style={getSectionStyle('why-different-header')}
          >
            {/* Eyebrow Header */}
            <span className="flex items-center justify-center gap-3 text-indigo-400 text-xs uppercase tracking-[0.3em] font-medium mb-4">
              <span className="w-8 h-[1px] bg-indigo-400/50" />
              The Difference
              <span className="w-8 h-[1px] bg-indigo-400/50" />
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.15] mb-4">
              Why We're Different
            </h2>
            <p className="text-sm md:text-base text-g400">
              Not a recruitment agency. A training company that places designers.
            </p>
          </div>

          {/* Intro Block - Asymmetric Layout */}
          <div
            id="why-different-intro"
            ref={(el) => { sectionRefs.current['why-different-intro'] = el; }}
            className="grid lg:grid-cols-12 gap-6 mb-10"
          >
            <div className="lg:col-span-4" style={getItemStyle('why-different-intro', 0)}>
              <div className="h-full bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 md:p-8 flex items-center justify-center min-h-[180px]">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-1">90</div>
                  <div className="text-indigo-200 text-sm md:text-base font-medium">days together</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8" style={getItemStyle('why-different-intro', 1)}>
              <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex items-center">
                <p className="text-sm md:text-base text-g400 leading-relaxed">
                  Traditional recruiters scan resumes and hope for the best. We've spent 90 days with these designers. We've seen their work. We've watched them struggle, learn, and level up. We don't forward profiles we recommend people we'd hire ourselves.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Cards - Bento Grid */}
          <div
            id="feature-cards"
            ref={(el) => { sectionRefs.current['feature-cards'] = el; }}
            className="grid md:grid-cols-2 gap-4 mb-16 md:mb-20"
          >
            {/* No Moonlighters */}
            <div
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
              style={getItemStyle('feature-cards', 0)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">No Moonlighters</h3>
                  <p className="text-sm md:text-base text-g300 leading-relaxed">
                    Every designer is actively seeking full-time work. No side-hustlers. No passive candidates who'll ghost after onboarding. We verify availability before sharing profiles.
                  </p>
                </div>
              </div>
            </div>

            {/* No Resume Roulette */}
            <div
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
              style={getItemStyle('feature-cards', 1)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">No Resume Roulette</h3>
                  <p className="text-sm md:text-base text-g300 leading-relaxed">
                    We've worked with these designers for 90 days in our mentorship programs. We've reviewed their research, critiqued their designs, and watched them present. We know what they can actually do.
                  </p>
                </div>
              </div>
            </div>

            {/* No Timezone Surprises */}
            <div
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
              style={getItemStyle('feature-cards', 2)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">No Timezone Surprises</h3>
                  <p className="text-sm md:text-base text-g300 leading-relaxed">
                    We filter for your working hours before you see a single profile. India, UAE, Singapore, US, UK - we match overlap first.
                  </p>
                </div>
              </div>
            </div>

            {/* No Communication Gaps */}
            <div
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
              style={getItemStyle('feature-cards', 3)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">No Communication Gaps</h3>
                  <p className="text-sm md:text-base text-g300 leading-relaxed">
                    All designers are trained in async updates, stakeholder management, and documentation. They know how to work in distributed teams without hand-holding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {/* Xperience Wave - Featured */}
            <div className="relative bg-indigo-600 rounded-2xl p-6 md:p-8 order-1 md:order-2 border-2 border-indigo-400">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-6 text-center">Xperience Wave</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-indigo-200 text-xs uppercase tracking-wide mb-1">Vetting</div>
                  <div className="text-white font-medium text-sm">Min. 90-day mentorship + project work</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-indigo-200 text-xs uppercase tracking-wide mb-1">Time to hire</div>
                  <div className="text-white font-medium text-sm">Under 2 weeks</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-indigo-200 text-xs uppercase tracking-wide mb-1">Quality guarantee</div>
                  <div className="text-white font-medium text-sm">60-day replacement</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-indigo-200 text-xs uppercase tracking-wide mb-1">Designer accountability</div>
                  <div className="text-white font-medium text-sm">We know them personally</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-indigo-200 text-xs uppercase tracking-wide mb-1">Cost</div>
                  <div className="text-white font-medium text-sm">As little as 10% of CTC</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-indigo-200 text-xs uppercase tracking-wide mb-1">Moonlighting risk</div>
                  <div className="text-white font-medium text-sm">Verified full-time seekers</div>
                </div>
              </div>
            </div>

            {/* Traditional Recruiters */}
            <div className="bg-white rounded-2xl p-6 md:p-8 order-2 md:order-1 border border-g200">
              <h3 className="text-lg font-bold text-carbon mb-6 text-center">Traditional recruiters</h3>
              <div className="space-y-4">
                <div className="border-b border-g200 pb-4">
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Vetting</div>
                  <div className="text-g600 text-sm">Resume screening</div>
                </div>
                <div className="border-b border-g200 pb-4">
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Time to hire</div>
                  <div className="text-g600 text-sm">4-8 weeks</div>
                </div>
                <div className="border-b border-g200 pb-4">
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Quality guarantee</div>
                  <div className="text-g600 text-sm">30-day (if any)</div>
                </div>
                <div className="border-b border-g200 pb-4">
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Designer accountability</div>
                  <div className="text-g600 text-sm">None after placement</div>
                </div>
                <div className="border-b border-g200 pb-4">
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Cost</div>
                  <div className="text-g600 text-sm">15-25% of CTC</div>
                </div>
                <div>
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Moonlighting risk</div>
                  <div className="text-g600 text-sm">Unknown</div>
                </div>
              </div>
            </div>

            {/* Freelance Platforms */}
            <div className="bg-white rounded-2xl p-6 md:p-8 order-3 border border-g200">
              <h3 className="text-lg font-bold text-carbon mb-6 text-center">Freelance Platforms</h3>
              <div className="space-y-4">
                <div className="border-b border-g200 pb-4">
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Vetting</div>
                  <div className="text-g600 text-sm">Self-reported skills</div>
                </div>
                <div className="border-b border-g200 pb-4">
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Time to hire</div>
                  <div className="text-g600 text-sm">Variable</div>
                </div>
                <div className="border-b border-g200 pb-4">
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Quality guarantee</div>
                  <div className="text-g600 text-sm">None</div>
                </div>
                <div className="border-b border-g200 pb-4">
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Designer accountability</div>
                  <div className="text-g600 text-sm">None</div>
                </div>
                <div className="border-b border-g200 pb-4">
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Cost</div>
                  <div className="text-g600 text-sm">Hourly + platform fees</div>
                </div>
                <div>
                  <div className="text-g400 text-xs uppercase tracking-wide mb-1">Moonlighting risk</div>
                  <div className="text-g600 text-sm">High</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div
        className="h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 50%, transparent 100%)' }}
      />

      {/* Meet Our Job-Ready UX Designers Section */}
      <section className="bg-white py-16 md:py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Sticky Content */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon leading-[1.1] mb-4">
                Meet Our Job-Ready UX Designers
              </h2>
              <p className="text-g500 leading-relaxed mb-8">
                Designers with up to 15 years of experience who chose to level up. They came to us for research methods, systems thinking, and AI workflows — not Figma basics. They're already at companies like JP Morgan, McKinsey, Intel, and Deloitte. The same caliber is available in our hiring pool.
              </p>

              {/* Experience Stats with Progress Bars */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-indigo-600 w-16">6%</div>
                  <div className="flex-1 h-2 bg-g100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: '6%' }} />
                  </div>
                  <div className="text-sm text-g500 w-32">Junior (0-2 yrs)</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-indigo-600 w-16">39%</div>
                  <div className="flex-1 h-2 bg-g100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '39%' }} />
                  </div>
                  <div className="text-sm text-g500 w-32">Mid-Level (2-5 yrs)</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-indigo-600 w-16">35%</div>
                  <div className="flex-1 h-2 bg-g100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: '35%' }} />
                  </div>
                  <div className="text-sm text-g500 w-32">Senior (5-8 yrs)</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-indigo-600 w-16">20%</div>
                  <div className="flex-1 h-2 bg-g100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-800 rounded-full" style={{ width: '20%' }} />
                  </div>
                  <div className="text-sm text-g500 w-32">Lead / Head (8+ yrs)</div>
                </div>
              </div>
            </div>

            {/* Right - Profile Cards */}
            <div className="space-y-4">
              {/* Profile 1 */}
              <div className="bg-white rounded-2xl p-6 border border-g200 hover:border-g300 hover:shadow-sm transition-all">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-900/80 via-carbon to-carbon border border-indigo-500/30 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    SP
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-carbon text-lg">Senior Product Designer</h3>
                        <p className="text-sm text-indigo-600">7 years • Enterprise Fintech</p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Available</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">Research</span>
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">Design Systems</span>
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">AI Workflows</span>
                    </div>
                    <p className="text-sm text-g500">Programs: <span className="font-medium text-carbon">Current</span></p>
                  </div>
                </div>
              </div>

              {/* Profile 2 */}
              <div className="bg-white rounded-2xl p-6 border border-g200 hover:border-g300 hover:shadow-sm transition-all">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-900/80 via-carbon to-carbon border border-indigo-500/30 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    LD
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-carbon text-lg">Lead Design Manager</h3>
                        <p className="text-sm text-indigo-600">12 yrs • Global Consulting</p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Available</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">Design Ops</span>
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">Strategy</span>
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">Team Building</span>
                    </div>
                    <p className="text-sm text-g500">Programs: <span className="font-medium text-carbon">Tide</span></p>
                  </div>
                </div>
              </div>

              {/* Profile 3 */}
              <div className="bg-white rounded-2xl p-6 border border-g200 hover:border-g300 hover:shadow-sm transition-all">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-900/80 via-carbon to-carbon border border-indigo-500/30 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    MU
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-carbon text-lg">Mid-level UX Designer</h3>
                        <p className="text-sm text-indigo-600">4 yrs • B2B SaaS Startup</p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Available</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">UI Systems</span>
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">Prototyping</span>
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">Figma Expert</span>
                    </div>
                    <p className="text-sm text-g500">Programs: <span className="font-medium text-carbon">Current</span></p>
                  </div>
                </div>
              </div>

              {/* Profile 4 */}
              <div className="bg-white rounded-2xl p-6 border border-g200 hover:border-g300 hover:shadow-sm transition-all">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-900/80 via-carbon to-carbon border border-indigo-500/30 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    SR
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-carbon text-lg">Senior UX Researcher</h3>
                        <p className="text-sm text-indigo-600">6 yrs • Healthcare & Wellness</p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Available</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">Qual Research</span>
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">Usability</span>
                      <span className="bg-g100 text-g600 text-xs px-2 py-1 rounded">Psychology</span>
                    </div>
                    <p className="text-sm text-g500">Programs: <span className="font-medium text-carbon">Current</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indigo CTA Banner */}
          <div className="mt-12 md:mt-16 bg-indigo-600 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-indigo-200 text-sm mb-1">Real profiles from our pool. Full details shared after we connect.</p>
              <p className="text-white text-xl md:text-2xl font-bold">Want Full Profiles?</p>
            </div>
            <Link
              href="/for-business/hire-ux-designers/requirements"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors flex-shrink-0"
            >
              Share Your Requirements
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div
        className="h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 50%, transparent 100%)' }}
      />

      {/* Skills Our Designers Are Trained In Section - Option 5: Accordion Cards */}
      <section className="bg-carbon py-16 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Glow Effects */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 50% 30%, rgba(99,102,241,0.05) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 20% 80%, rgba(220,238,255,0.03) 0%, transparent 50%)
            `,
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-8">
          {/* Eyebrow Header */}
          <div
            id="skills-header"
            ref={(el) => { sectionRefs.current['skills-header'] = el; }}
            style={getSectionStyle('skills-header')}
          >
            <span className="flex items-center justify-center gap-3 text-indigo-400 text-xs uppercase tracking-[0.3em] font-medium mb-4">
              <span className="w-8 h-[1px] bg-indigo-400/50" />
              Training Curriculum
              <span className="w-8 h-[1px] bg-indigo-400/50" />
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-[1.15] mb-12 md:mb-16">
              Skills Our Designers Are Trained In
            </h2>
          </div>

          <div
            id="skills-cards"
            ref={(el) => { sectionRefs.current['skills-cards'] = el; }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {/* Design & Execution Card */}
            <div className="bg-gradient-to-r from-indigo-600/20 to-transparent border border-indigo-500/30 rounded-2xl overflow-hidden">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Design & Execution</h3>
                </div>
                <span className="text-indigo-400 text-sm">6 skills</span>
              </div>
              <div className="px-6 pb-6 grid sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Product Strategy & Roadmapping
                </div>
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Design Systems Architecture
                </div>
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Business Metrics & KPIs
                </div>
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Component Libraries & Tokens
                </div>
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Stakeholder Communication
                </div>
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Design-to-Dev Handoff
                </div>
              </div>
            </div>

            {/* Business & Leadership Card */}
            <div className="bg-gradient-to-r from-red-600/20 to-transparent border border-red-500/30 rounded-2xl overflow-hidden">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Business & Leadership</h3>
                </div>
                <span className="text-red-400 text-sm">6 skills</span>
              </div>
              <div className="px-6 pb-6 grid sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Business & Product Strategy
                </div>
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Stakeholder Management
                </div>
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Systems Thinking & Design Ops
                </div>
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cross-functional Collaboration
                </div>
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Presentation & Storytelling
                </div>
                <div className="flex items-center gap-2 text-g200 text-sm p-2">
                  <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Systemic & Visionary Leadership
                </div>
              </div>
            </div>

            {/* Stats Banner */}
            <div className="bg-carbon rounded-2xl p-5 border border-white/10">
              <p className="text-center text-sm md:text-base text-g300">
                <span className="text-white font-medium">Every designer:</span> 1:1 Mentored · 26+ projects · 30+ tools · Job-ready
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div
        className="h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 50%, transparent 100%)' }}
      />

      {/* Design Roles We Help You Hire Section - Option 3: Bento Grid */}
      <section className="bg-g50 py-16 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #d0d0d0 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Corner glows */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-[1200px] mx-auto px-5 md:px-8">
          {/* Header with animation */}
          <div
            id="design-roles-header"
            ref={(el) => { sectionRefs.current['design-roles-header'] = el; }}
            style={getSectionStyle('design-roles-header')}
          >
            {/* Eyebrow Header */}
            <span className="flex items-center justify-center gap-3 text-indigo-500 text-xs uppercase tracking-[0.3em] font-medium mb-4">
              <span className="w-8 h-[1px] bg-indigo-500/50" />
              Hiring Roles
              <span className="w-8 h-[1px] bg-indigo-500/50" />
            </span>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon text-center leading-[1.15] mb-12 md:mb-16">
              Design Roles We Help You Hire
            </h2>
          </div>

          <div
            id="design-roles-grid"
            ref={(el) => { sectionRefs.current['design-roles-grid'] = el; }}
            className="grid md:grid-cols-3 gap-4"
          >
            {/* IC Card - Large */}
            <div
              className="md:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-g200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={getItemStyle('design-roles-grid', 0)}
            >
              <h3 className="text-lg font-bold text-carbon mb-4">Individual Contributors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">UX</div>
                  <span className="text-carbon text-sm font-medium">UX Designer</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">UI</div>
                  <span className="text-carbon text-sm font-medium">UI Designer</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">PD</div>
                  <span className="text-carbon text-sm font-medium">Product Designer</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-xs font-bold">VD</div>
                  <span className="text-carbon text-sm font-medium">Visual Designer</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">UR</div>
                  <span className="text-carbon text-sm font-medium">UX Researcher</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-bold">UW</div>
                  <span className="text-carbon text-sm font-medium">UX Writer</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">IX</div>
                  <span className="text-carbon text-sm font-medium">Interaction Designer</span>
                </div>
              </div>
            </div>

            {/* Stats - IC Roles */}
            <div
              className="bg-gradient-to-br from-indigo-900/80 via-carbon to-carbon rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300"
              style={getItemStyle('design-roles-grid', 1)}
            >
              <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-1">7</div>
              <div className="text-sm text-indigo-300">IC Roles</div>
            </div>

            {/* Stats - Leadership Roles */}
            <div
              className="bg-gradient-to-br from-indigo-900/80 via-carbon to-carbon rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-indigo-500/30 hover:border-indigo-500/50 transition-all duration-300"
              style={getItemStyle('design-roles-grid', 2)}
            >
              <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-1">6</div>
              <div className="text-sm text-indigo-300">Leadership Roles</div>
            </div>

            {/* Leadership Card - Large */}
            <div
              className="md:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-g200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              style={getItemStyle('design-roles-grid', 3)}
            >
              <h3 className="text-lg font-bold text-carbon mb-4">Leadership & Specialists</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-bold">SD</div>
                  <span className="text-carbon text-sm font-medium">Senior Designer</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">LD</div>
                  <span className="text-carbon text-sm font-medium">Lead Designer</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">DM</div>
                  <span className="text-carbon text-sm font-medium">Design Manager</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xs font-bold">PD</div>
                  <span className="text-carbon text-sm font-medium">Principal Designer</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white text-xs font-bold">HD</div>
                  <span className="text-carbon text-sm font-medium">Head of Design</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-g100 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white text-xs font-bold">DO</div>
                  <span className="text-carbon text-sm font-medium">Design Ops</span>
                </div>
              </div>
            </div>

            {/* Industries - Full Width */}
            <div
              className="md:col-span-3 bg-carbon rounded-2xl p-6 text-center hover:border-indigo-500/30 border border-white/10 transition-all duration-300"
              style={getItemStyle('design-roles-grid', 4)}
            >
              <p className="text-g400 text-sm mb-2">Industries We've Placed In</p>
              <p className="text-white">Fintech · SaaS · Healthcare · E-commerce · Enterprise · EdTech · Consulting · B2B Products</p>
            </div>
          </div>
        </div>
      </section>

      {/* Where Our Designers Work Now Section */}
      <MenteesWorkAt
        title="Where Our Designers Work Now"
        footerText="From global consulting firms to Fortune 500 tech companies - our designers land roles at design-mature organizations."
      />

      {/* Section Divider */}
      <div
        className="h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 50%, transparent 100%)' }}
      />

      {/* Trained by Us. Hired by Them. Section - Photo Wall */}
      <section className="bg-carbon py-16 md:py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <h2
            id="photo-wall-header"
            ref={(el) => { sectionRefs.current['photo-wall-header'] = el; }}
            className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-[1.15] mb-12 md:mb-16"
            style={getSectionStyle('photo-wall-header')}
          >
            Trained by Us. Hired by Them.
          </h2>

          {/* Photo wall hidden for now */}

          {/* Testimonial Carousel - What Hiring Managers Say */}
          <TestimonialCarousel testimonials={hiringManagerQuotes} />

          {/* See All Link - hidden for now */}
        </div>
      </section>

      {/* Section Divider */}
      <div
        className="h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.4) 50%, transparent 100%)' }}
      />

      {/* Pricing Transparency Section */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-[#FAFAFA]">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pricingGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6366f1" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pricingGrid)" />
          </svg>
        </div>

        <div className="max-w-[1100px] mx-auto px-5 md:px-8 relative z-10">
          {/* Header */}
          <div
            id="pricing-header"
            ref={(el) => { sectionRefs.current['pricing-header'] = el; }}
            className="text-center mb-8 md:mb-10"
            style={getSectionStyle('pricing-header')}
          >
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon leading-[1.15] mb-3">
              Pricing Transparency
            </h2>
            <p className="text-sm md:text-base text-g500">
              As low as <span className="text-indigo-600 font-bold">10%</span> of the designer&apos;s annual CTC (one-time).
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mb-8 md:mb-10">
            {/* Center Line - Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-600 -translate-x-1/2 rounded-full" />

            {/* Mobile Line */}
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-600 rounded-full" />

            {/* Step 1 - Right */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 mb-6 md:mb-8">
              <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                <div className="bg-white rounded-2xl p-6 border border-g200 ml-14 md:ml-0">
                  <div className="flex items-center gap-3 md:justify-end mb-3">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-indigo-600 text-sm font-semibold">Within 48-72 hours</span>
                  </div>
                  <h3 className="font-bold text-carbon text-lg mb-2">Curated shortlist (3-5 candidates)</h3>
                  <p className="text-g500 text-sm md:text-base">Our detailed notes on each candidate&apos;s strengths and fit</p>
                </div>
              </div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 md:w-14 md:h-14 bg-indigo-600 rounded-full flex items-center justify-center z-10 shadow-md order-1 md:order-2">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <div className="md:w-1/2 md:pl-12 order-3" />
            </div>

            {/* Step 2 - Left */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 mb-6 md:mb-8">
              <div className="md:w-1/2 md:pr-12 order-2" />
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 md:w-14 md:h-14 bg-indigo-500 rounded-full flex items-center justify-center z-10 shadow-md order-1">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <div className="md:w-1/2 md:pl-12 order-3">
                <div className="bg-white rounded-2xl p-6 border border-g200 ml-14 md:ml-0">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-indigo-600 text-sm font-semibold">During interviews</span>
                  </div>
                  <h3 className="font-bold text-carbon text-lg mb-2">Interview coordination</h3>
                  <p className="text-g500 text-sm md:text-base">Interview coordination and offer negotiation support</p>
                </div>
              </div>
            </div>

            {/* Step 3 - Right */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 mb-6 md:mb-8">
              <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-g200 ml-14 md:ml-0">
                  <div className="flex items-center gap-3 md:justify-end mb-3">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-indigo-600 text-sm font-semibold">On offer acceptance</span>
                  </div>
                  <h3 className="font-bold text-carbon text-lg mb-2">Pay <span className="text-indigo-600">50%</span> of the fee</h3>
                  <p className="text-g500 text-sm md:text-base">First payment only when your candidate accepts</p>
                </div>
              </div>
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 md:w-14 md:h-14 bg-indigo-500 rounded-full flex items-center justify-center z-10 shadow-md order-1 md:order-2">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="md:w-1/2 md:pl-12 order-3" />
            </div>

            {/* Step 4 - Left */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
              <div className="md:w-1/2 md:pr-12 order-2" />
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 md:w-14 md:h-14 bg-indigo-600 rounded-full flex items-center justify-center z-10 shadow-md order-1">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="md:w-1/2 md:pl-12 order-3">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-g200 ml-14 md:ml-0">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-indigo-600 text-sm font-semibold">60-day guarantee</span>
                  </div>
                  <h3 className="font-bold text-carbon text-lg mb-2">Pay remaining <span className="text-indigo-600">50%</span></h3>
                  <p className="text-g500 text-sm md:text-base">60-day replacement guarantee — or get a free replacement if needed</p>
                </div>
              </div>
            </div>
          </div>

          {/* No Fee Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-5 md:p-6 text-center mb-8 shadow-md">
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-5 h-5 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white text-base md:text-lg font-bold">No placement, no fee.</p>
            </div>
            <p className="text-indigo-200 text-sm">You only pay when you hire.</p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-g500 mb-4">Have questions about pricing?</p>
            <Link href="/for-business/hire-ux-designers/requirements" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors">
              Let&apos;s talk →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Frequently Asked Questions About Hiring UX Designers"
        faqs={hiringFAQs}
        showCTA={true}
        ctaText="Share Requirements"
        ctaHref="/for-business/hire-ux-designers/requirements"
      />

      {/* TODO: Uncomment when Design Services and Team Training pages are ready
      <section className="py-16 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-[1.15] mb-12">
            Other Ways We Help Product Teams
          </h2>

          <div className="relative space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all">
              <div className="grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-3">Design Services</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Need design work done, not a full-time hire? UX audits, product design, and ongoing support - without the overhead of hiring.
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <Link href="/design-services" className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 transition-colors text-sm">
                    Explore Design Services
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all">
              <div className="grid md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8">
                  <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-3">Team Training</h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    Have an in-house team that needs levelling up? Workshops on research, design systems, and AI workflows - for teams that want to build internal capability.
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <Link href="/team-training" className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-500 transition-colors text-sm">
                    Explore Team Training
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* How to Hire Guide Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-g100 to-g50">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Free Guide
              </div>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon leading-[1.15] mb-4">
                How to Hire UX Designers from India
              </h2>
              <p className="text-sm md:text-base text-g500 leading-relaxed">
                A complete guide for international teams: What to look for, what to avoid, and how to set up remote designers for success.
              </p>
            </div>

            {/* Right Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-g200 relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-red-500/5 rounded-full" />

              <div className="relative">
                <h3 className="font-bold text-carbon mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  Topics covered:
                </h3>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3 text-g600">
                    <svg className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Where to find UX designers in India
                  </li>
                  <li className="flex items-start gap-3 text-g600">
                    <svg className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    How to evaluate portfolios (and spot fakes)
                  </li>
                  <li className="flex items-start gap-3 text-g600">
                    <svg className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Salary benchmarks by experience level
                  </li>
                  <li className="flex items-start gap-3 text-g600">
                    <svg className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Timezone and communication best practices
                  </li>
                  <li className="flex items-start gap-3 text-g600">
                    <svg className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Contract and compliance considerations
                  </li>
                </ul>

                <button onClick={() => setIsGuideModalOpen(true)} className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all group">
                  <span className="border-b-2 border-indigo-600">Download Free Guide</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready To Hire CTA Section */}
      <section className="relative py-14 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
        {/* Dark gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg,
                #0a0a0a 0%,
                #0a0a0a 25%,
                #0a0a0a 50%,
                #0a0a0a 75%,
                #0a0a0a 100%
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

        {/* X Motif - positioned on the right */}
        <span
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 font-heading font-extrabold text-[300px] md:text-[500px] lg:text-[600px] text-accent/[0.06] pointer-events-none select-none"
          aria-hidden="true"
        >
          X
        </span>

        {/* Content */}
        <div className="relative z-10 max-w-[800px] mx-auto px-5 text-center">
          {/* Heading */}
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
            Ready To Hire?
          </h2>

          {/* Subtext */}
          <p className="font-body text-sm md:text-base text-g400 mb-8 max-w-[600px] mx-auto">
            Tell us what you&apos;re looking for. We&apos;ll share matched profiles within 48-72 hours.
          </p>

          {/* CTA Button */}
          <Button href="/for-business/hire-ux-designers/requirements" showArrow>
            Share Requirements
          </Button>

          {/* Contact info */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-x-2 gap-y-2">
            <span className="font-body text-sm md:text-base text-g400">Prefer to talk first?</span>
            <span className="text-g600 mx-3">|</span>
            <a href="mailto:hire@xperiencewave.com" className="font-body text-sm md:text-base text-g400 hover:text-white transition-colors">
              hire@xperiencewave.com
            </a>
            <span className="text-g600 mx-3">|</span>
            <a href="tel:+918147706841" className="font-body text-sm md:text-base text-g400 hover:text-white transition-colors">
              +91 8147706841
            </a>
          </div>
        </div>
      </section>

      {/* Hiring Guide Modal */}
      <HiringGuideModal isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} />
    </main>
  );
}
