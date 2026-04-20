'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LeadCaptureModal, { LeadType } from '@/components/shared/LeadCaptureModal';

// ============================================
// TOOL DATA
// ============================================

interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  color: 'accent' | 'alice';
  leadType: LeadType;
  available: boolean;
  href?: string;
}

const tools: Tool[] = [
  {
    id: 'mentorship-evaluator',
    name: 'UX Mentorship Evaluator',
    tagline: 'Score any program out of 100',
    description: 'Rate any UX mentorship program across 6 weighted categories. 20 questions. Works on any program - including ours.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'accent',
    leadType: 'mentorship-evaluator',
    available: true,
  },
  {
    id: 'design-team-systems-audit',
    name: 'Design Team Systems Audit',
    tagline: 'Score your team\'s systems out of 100',
    description: 'Audit your design team across 5 dimensions: review cadence, stakeholder integration, role clarity, maturity roadmap, and growth systems. 20 questions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'accent',
    leadType: 'design-team-systems-audit',
    available: true,
  },
  {
    id: 'research-synthesis',
    name: 'Research Synthesis GPT',
    tagline: 'From chaos to clarity',
    description: 'Turn messy interview notes into clear themes, insights, and recommendations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12h6M9 16h6" strokeLinecap="round" />
      </svg>
    ),
    color: 'accent',
    leadType: 'research-synthesis-gpt',
    available: false,
  },
  {
    id: 'microcopy-writer',
    name: 'UX Microcopy Writer GPT',
    tagline: 'Sound human, not robotic',
    description: 'Generate button labels, error messages, tooltips, and empty states.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'alice',
    leadType: 'microcopy-writer-gpt',
    available: false,
  },
  {
    id: 'portfolio-feedback',
    name: 'Portfolio Feedback GPT',
    tagline: 'Think like a hiring manager',
    description: 'Get case studies reviewed like a hiring manager would. Spot weak storytelling.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'accent',
    leadType: 'portfolio-feedback-gpt',
    available: false,
  },
  {
    id: 'resume-reviewer',
    name: 'Resume Reviewer GPT',
    tagline: 'What recruiters actually see',
    description: 'Score your UX resume against what recruiters actually scan for. Get specific fixes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'alice',
    leadType: 'resume-reviewer-gpt',
    available: false,
  },
  {
    id: 'salary-negotiation',
    name: 'Salary Negotiation GPT',
    tagline: 'Know your worth',
    description: 'Scripts and tactics for negotiating UX offers in India. Built on the RIVER framework.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'accent',
    leadType: 'salary-negotiation-gpt',
    available: true,
  },
  {
    id: 'design-strategy',
    name: 'Design Strategy GPT',
    tagline: 'Position design strategically',
    description: 'Position design at the centre of business growth. Get a strategic framework for any project in minutes.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'alice',
    leadType: 'design-strategy-gpt',
    available: true,
  },
  {
    id: 'ux-audit',
    name: 'UX Audit GPT',
    tagline: 'Evaluate any screen',
    description: 'Evaluate any screen against usability heuristics. Get actionable fixes, not generic feedback.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'accent',
    leadType: 'ux-audit-gpt',
    available: false,
  },
];

// ============================================
// COMPONENT
// ============================================

export default function ToolsPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeadType, setSelectedLeadType] = useState<LeadType>('design-strategy-gpt');

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
      {/* HERO SECTION - Dark with X Motif */}
      {/* ============================================ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 30%, #0a0a0a 60%, #0a0a0a 100%)',
        }}
      >
        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] blur-[100px] md:blur-[150px]"
            style={{ background: 'radial-gradient(ellipse, rgba(255,0,35,0.12) 0%, transparent 60%)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] blur-[80px] md:blur-[120px]"
            style={{ background: 'radial-gradient(ellipse, rgba(74,144,164,0.1) 0%, transparent 60%)' }}
          />
        </div>

        {/* X Motif - simple outline */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-black text-[50vw] md:text-[35vw] text-transparent leading-none select-none"
            style={{
              WebkitTextStroke: '1px rgba(255,0,35,0.04)',
            }}
          >
            X
          </span>
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 pt-24 md:pt-28 pb-12 md:pb-16 lg:pb-20">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm mb-8 md:mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Link href="/" className="text-g500 hover:text-white underline underline-offset-2 transition-colors">Home</Link>
            <svg className="w-4 h-4 text-g600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <Link href="/resources" className="text-g500 hover:text-white underline underline-offset-2 transition-colors">Resources</Link>
            <svg className="w-4 h-4 text-g600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-white font-medium">AI Tools</span>
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
              <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-xs font-medium text-accent uppercase tracking-wider">Free AI Tools</span>
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
              AI Tools Built for{' '}
              <span className="text-accent">UX Designers</span>
            </h1>

            {/* Description */}
            <p
              className="font-body text-base md:text-lg text-g400 leading-relaxed mb-6 md:mb-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
              }}
            >
              Custom GPTs that actually understand UX workflows. From research synthesis to salary negotiation — free tools that save you hours.
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
                { value: '8', label: 'Tools' },
                { value: '100%', label: 'Free' },
                { value: '24/7', label: 'Available' },
              ].map((stat, i) => (
                <div key={i} className="flex items-baseline gap-1.5 md:gap-2">
                  <span className="font-heading text-xl md:text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-g500 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-snow to-transparent" />
      </section>

      {/* ============================================ */}
      {/* TOOLS GRID - Mobile-first cards */}
      {/* ============================================ */}
      <section className="relative py-12 md:py-20 bg-snow overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #e0e0e0 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-5">
          {/* Section Header */}
          <div
            className="text-center mb-8 md:mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-6 h-[2px] bg-accent" />
              <span className="font-body text-xs uppercase tracking-[0.2em] text-accent font-medium">Choose Your Tool</span>
              <div className="w-6 h-[2px] bg-accent" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon">
              Explore Our AI Assistants
            </h2>
          </div>

          {/* Featured Tools - Available Now */}
          {tools.filter(t => t.available).map((tool, idx) => {
            const isAccentTool = tool.color === 'accent';
            const borderColor = isAccentTool ? 'border-accent/30' : 'border-[#2D6A7A]/30';
            const borderHover = isAccentTool ? 'hover:border-accent/50' : 'hover:border-[#2D6A7A]/50';
            const bgGradient = isAccentTool ? 'from-accent/10' : 'from-[#2D6A7A]/10';
            const badgeBg = isAccentTool ? 'bg-accent' : 'bg-[#2D6A7A]';
            const iconBg = isAccentTool ? 'bg-accent/15' : 'bg-[#2D6A7A]/15';
            const iconColor = isAccentTool ? 'text-accent' : 'text-[#2D6A7A]';
            const taglineColor = isAccentTool ? 'text-accent' : 'text-[#2D6A7A]';
            const hoverTextColor = isAccentTool ? 'group-hover:text-accent' : 'group-hover:text-[#2D6A7A]';
            const btnBg = isAccentTool ? 'bg-accent' : 'bg-[#2D6A7A]';
            const btnHover = isAccentTool ? 'group-hover:bg-accent/90' : 'group-hover:bg-[#245a68]';

            const cardContent = (
              <div className={`relative p-6 md:p-10 rounded-2xl border-2 ${borderColor} bg-gradient-to-br ${bgGradient} to-transparent ${borderHover} hover:shadow-xl transition-all duration-300`}>
                {/* Featured badge */}
                <div className="absolute -top-3 left-6 md:left-10">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white ${badgeBg} rounded-full`}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Available Now
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}>
                    <div className={`w-8 h-8 md:w-10 md:h-10 ${iconColor}`}>
                      {tool.icon}
                    </div>
                  </div>

                  <div className="flex-1">
                    <span className={`inline-block text-xs font-medium uppercase tracking-wider mb-2 ${taglineColor}`}>
                      {tool.tagline}
                    </span>
                    <h3 className={`font-heading text-2xl md:text-3xl font-bold text-carbon ${hoverTextColor} mb-3 transition-colors`}>
                      {tool.name}
                    </h3>
                    <p className="font-body text-base md:text-lg text-g500 leading-relaxed max-w-2xl">
                      {tool.description}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <span className={`inline-flex items-center justify-center gap-2 px-8 py-4 ${btnBg} text-white font-heading font-bold text-lg rounded-xl ${btnHover} transition-all duration-300 min-h-[56px]`}>
                      Try Now — Free
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            );

            return (
              <div
                key={tool.id}
                className="mb-8 md:mb-10"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.35 + idx * 0.06}s`,
                }}
              >
                {tool.href ? (
                  <Link href={tool.href} className="block w-full text-left group">
                    {cardContent}
                  </Link>
                ) : (
                  <button onClick={() => openModal(tool.leadType)} className="block w-full text-left group">
                    {cardContent}
                  </button>
                )}
              </div>
            );
          })}

          {/* Other Tools Label */}
          <div className="mb-6">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-g400 font-medium">More Tools Coming Soon</span>
          </div>

          {/* Other Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {tools.filter(t => !t.available).map((tool, index) => {
              const isAccent = tool.color === 'accent';

              return (
                <div
                  key={tool.id}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.45 + index * 0.06}s`,
                  }}
                >
                  <button
                    onClick={() => openModal(tool.leadType)}
                    className={`relative h-full w-full text-left p-5 md:p-6 rounded-2xl border transition-all duration-300 overflow-hidden group cursor-pointer ${isAccent ? 'bg-accent/[0.03] border-accent/10 hover:border-accent/30 hover:bg-accent/[0.06]' : 'bg-[#2D6A7A]/[0.03] border-[#2D6A7A]/10 hover:border-[#2D6A7A]/30 hover:bg-[#2D6A7A]/[0.06]'}`}
                  >
                    {/* Top accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${isAccent ? 'bg-accent/50' : 'bg-[#2D6A7A]/50'}`} />

                    {/* Icon */}
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 ${isAccent ? 'bg-accent/10' : 'bg-[#2D6A7A]/10'}`}>
                      <div className={`w-6 h-6 md:w-7 md:h-7 ${isAccent ? 'text-accent/60 group-hover:text-accent' : 'text-[#2D6A7A]/60 group-hover:text-[#2D6A7A]'} transition-colors`}>
                        {tool.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <span className={`inline-block text-xs font-medium uppercase tracking-wider mb-2 ${isAccent ? 'text-accent/60' : 'text-[#2D6A7A]/60'}`}>
                      {tool.tagline}
                    </span>

                    <h3 className="font-heading text-lg md:text-xl font-bold text-carbon/70 group-hover:text-carbon mb-2 transition-colors">
                      {tool.name}
                    </h3>

                    <p className="font-body text-sm text-g400 leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    {/* CTA */}
                    <span className={`inline-flex items-center gap-2 font-heading font-semibold text-sm ${isAccent ? 'text-accent/60 group-hover:text-accent' : 'text-[#2D6A7A]/60 group-hover:text-[#2D6A7A]'} transition-colors`}>
                      Join Waitlist
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION - Dark with X motif */}
      {/* ============================================ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Dark gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
          }}
        />

        {/* Gradient overlays */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 30% 0%, rgba(255,0,35,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 100%, rgba(220,238,255,0.06) 0%, transparent 50%)
            `,
          }}
        />

        {/* X Motif */}
        <span
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 font-heading font-extrabold text-[200px] md:text-[400px] text-accent/[0.04] pointer-events-none select-none"
        >
          X
        </span>

        {/* Content */}
        <div className="relative z-10 max-w-[700px] mx-auto px-5 text-center">
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Want Tools Built For{' '}
            <span className="text-accent">Your</span> Workflow?
          </h2>

          <p className="font-body text-sm md:text-base text-g400 mb-6 md:mb-8 max-w-lg mx-auto">
            Join our mentorship and get access to exclusive tools, templates, and resources designed for your specific career goals.
          </p>

          <Link
            href="https://app.xperiencewave.com/book/dc-strategy-call"
            className="inline-flex items-center gap-2 px-5 py-3 md:px-7 md:py-3.5 bg-accent hover:bg-accent-hover text-white font-heading font-semibold rounded-xl transition-all duration-300 hover:gap-3"
          >
            Book Strategy Call
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Trust points */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 text-xs md:text-sm text-g500">
            <span>Free 45-min call</span>
            <span className="text-g600">·</span>
            <span>No obligations</span>
            <span className="text-g600">·</span>
            <span>Walk away with clarity</span>
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
