'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FAQ from '@/components/shared/FAQ';

export default function UXDesignServicesPage() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "UX Design Services",
            "provider": {
              "@type": "Organization",
              "name": "Xperience Wave"
            },
            "description": "Outcome-driven UX design for product teams. UX audits, product design, and ongoing support - without full-time hires.",
            "areaServed": "India",
            "serviceType": "UX Design"
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-[#030303] overflow-hidden">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary gradient orb - indigo */}
          <div
            className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full opacity-30 blur-[80px] md:blur-[120px] animate-pulse"
            style={{
              background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
              top: '-10%',
              right: '-20%',
              animationDuration: '8s',
            }}
          />
          {/* Secondary gradient orb - purple */}
          <div
            className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full opacity-20 blur-[60px] md:blur-[100px]"
            style={{
              background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
              bottom: '-5%',
              left: '-10%',
              animation: 'pulse 10s ease-in-out infinite',
            }}
          />
          {/* Accent gradient orb - cyan (hidden on mobile) */}
          <div
            className="absolute hidden md:block w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
            style={{
              background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)',
              top: '40%',
              left: '30%',
              animation: 'pulse 12s ease-in-out infinite reverse',
            }}
          />
        </div>

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Grid pattern overlay (hidden on mobile for performance) */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none hidden md:block"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating decorative elements (hidden on mobile) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
          <div
            className="absolute w-32 h-32 border border-indigo-500/20 rounded-full"
            style={{
              top: '15%',
              right: '20%',
              animation: 'float 20s ease-in-out infinite',
            }}
          />
          <div
            className="absolute w-20 h-20 border border-purple-500/15 rounded-full"
            style={{
              bottom: '25%',
              left: '15%',
              animation: 'float 15s ease-in-out infinite reverse',
            }}
          />
          <div className="absolute top-1/4 left-1/4">
            <div className="w-2 h-2 bg-indigo-400/30 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute bottom-1/3 right-1/4">
            <div className="w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-8 pt-24 md:pt-28 pb-16 md:pb-28">
          {/* Breadcrumb */}
          <nav
            className={`flex flex-wrap items-center gap-1.5 md:gap-2 text-xs md:text-sm mb-10 md:mb-16 transition-all duration-700 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="text-white/60 hover:text-white underline underline-offset-2 transition-colors">
              Home
            </Link>
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-white/60 underline underline-offset-2">For Business</span>
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/40 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="text-white font-medium">UX Design Services</span>
          </nav>

          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Text Content - First on mobile, first on desktop */}
            <div className="lg:col-span-7">
              {/* Headline */}
              <h1
                className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-5 md:mb-6 transition-all duration-700 ${
                  heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                Outcome-Driven <span className="text-indigo-400">UX Design Services</span> for Product Teams
              </h1>

              {/* Description */}
              <div
                className={`space-y-3 md:space-y-4 mb-6 md:mb-8 transition-all duration-700 ${
                  heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <p className="font-body text-base md:text-lg text-white/70 leading-relaxed">
                  Most design partners focus on deliverables - screens, hours, revisions. We focus on outcomes. Before we start, we define what success looks like for your business - reducing drop-offs, improving conversions, or shipping faster.
                </p>
                <p className="font-body text-base md:text-lg text-white/70 leading-relaxed">
                  UX audits, product design, and ongoing support without the overhead of full-time hires.
                </p>
              </div>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row gap-3 md:gap-4 transition-all duration-700 ${
                  heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <Link
                  href="#free-audit"
                  className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 md:py-3.5 bg-indigo-500 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Get Free UX Audit
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-3 md:py-3.5 border-2 border-indigo-400 text-indigo-400 text-sm md:text-base font-semibold rounded-lg hover:bg-indigo-400/10 transition-colors"
                >
                  Book Discovery Call
                </Link>
              </div>
            </div>

            {/* Image Area - Second on mobile, second on desktop */}
            <div
              className={`lg:col-span-5 transition-all duration-1000 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="relative">
                {/* Glow behind image */}
                <div className="absolute -inset-4 bg-indigo-500/20 rounded-3xl blur-2xl" />

                {/* Main image container */}
                <div
                  className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-1.5 md:p-2 border border-white/10 shadow-2xl lg:transform lg:perspective-1000 lg:rotate-y-[-5deg] lg:rotate-x-[2deg]"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-indigo-900/50">
                    <Image
                      src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80"
                      alt="UX Design Process - Team collaboration on product design"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Floating badge - hidden on small mobile */}
                  <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-indigo-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium shadow-lg hidden sm:block">
                    Based in Bangalore
                  </div>

                  {/* Floating metric card - hidden on small mobile */}
                  <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-[#030303] border border-white/20 text-white px-3 md:px-4 py-2 md:py-3 rounded-xl shadow-xl hidden sm:block">
                    <div className="text-xl lg:text-2xl font-bold text-indigo-400">50+</div>
                    <div className="text-[10px] md:text-xs text-white/80">Products Designed</div>
                  </div>
                </div>

                {/* Secondary floating element - desktop only */}
                <div
                  className="absolute -bottom-8 right-8 w-24 h-24 bg-indigo-500/10 backdrop-blur-sm rounded-xl border border-white/10 hidden lg:flex items-center justify-center"
                  style={{ animation: 'float 6s ease-in-out infinite' }}
                >
                  <svg className="w-10 h-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </section>

      {/* Problem Section */}
      <ProblemSection />

      {/* Why Teams Choose Us */}
      <WhyChooseUsSection />

      {/* Services We Offer */}
      <ServicesSection />

      {/* How We Work */}
      <HowWeWorkSection />

      {/* Is This Right For You */}
      <IsThisRightForYouSection />

      {/* Our Clients */}
      <OurClientsSection />

      {/* Free UX Audit CTA */}
      <FreeAuditCTASection />

      {/* FAQs */}
      <FAQ
        title="Frequently Asked Questions"
        faqs={faqData}
        theme="indigo"
        mode="light"
        showCTA={true}
        ctaText="Contact Us"
        ctaHref="/contact"
      />

      {/* From Our Blog */}
      <FromOurBlogSection />

      {/* Other Ways We Help */}
      <OtherWaysSection />

      {/* Final CTA */}
      <FinalCTASection />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </main>
  );
}

// ============================================
// Data
// ============================================
const whyUsData = [
  {
    num: '01',
    title: 'Business-first, not deliverable-first',
    desc: 'We define success metrics upfront - conversions, task completion, retention - and design toward those goals. Not screen counts.'
  },
  {
    num: '02',
    title: 'Fast, AI-augmented workflow',
    desc: 'We use AI across research, ideation, and iteration. Senior-level thinking at startup speed.'
  },
  {
    num: '03',
    title: 'Practitioner-led, not account-managed',
    desc: 'No juniors learning on your project. You work directly with our lead designers - 10+ years across healthcare, fintech, and SaaS.'
  },
  {
    num: '04',
    title: 'Flexible engagement, sensible pricing',
    desc: 'Project-based or retainer. Audit or full redesign. We adapt to what you need.'
  },
];

const problemsData = [
  {
    num: '01',
    title: 'No design capacity, but plenty of work',
    desc: 'You have developers, PMs, maybe even a designer or two - but design keeps slipping. Features ship without proper UX. Your team is stretched too thin to do it right.'
  },
  {
    num: '02',
    title: 'Partners that bill hours, not outcomes',
    desc: "You've tried outsourcing before. What you got: endless revisions, scope creep, invoices that don't match results. Deliverables, but no real improvement in your product metrics."
  },
  {
    num: '03',
    title: 'Slow, laid-back, and behind the curve',
    desc: "Most design partners work at their own pace, not yours. Weeks for a first draft. No urgency. And still designing like it's 2019 - no AI in their workflow, no efficiency gains passed on to you."
  },
  {
    num: '04',
    title: 'Hiring is expensive and takes forever',
    desc: 'A full-time senior designer costs ₹15-25L/year - plus months to hire and onboard. You need expert help now, not in Q3.'
  },
];

const processSteps = [
  {
    num: '1',
    title: 'Discovery Call',
    desc: 'We learn about your product, users, and challenges. 30 minutes, no pitch.',
  },
  {
    num: '2',
    title: 'Scope & Proposal',
    desc: 'We define goals, deliverables, timeline, and pricing. Clear proposal, no surprises.',
  },
  {
    num: '3',
    title: 'Design & Iterate',
    desc: 'Strategy, research, wireframes, UI, revisions. We work with you at every step.',
  },
  {
    num: '4',
    title: 'Handoff & Support',
    desc: 'Dev-ready files, specs, and assets. Plus follow-up support to ensure implementation.',
  },
];

// ============================================
// Problem Section Component
// ============================================
function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-20 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)' }}>
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-indigo-100/60 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-purple-100/50 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-indigo-50/80 rounded-full blur-[60px] md:blur-[80px] pointer-events-none" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #c7d2fe 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative shapes */}
      <div className="absolute top-16 right-12 w-16 h-16 border border-indigo-200 rounded-full opacity-50 hidden lg:block" />
      <div className="absolute bottom-24 left-16 w-24 h-24 border border-purple-200/50 rounded-full opacity-40 hidden lg:block" />
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-indigo-300 rounded-full opacity-60 hidden md:block" />
      <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-purple-300 rounded-full opacity-50 hidden md:block" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className={`text-center mb-10 md:mb-14 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-indigo-400" />
            <span className="text-indigo-500 text-sm font-medium uppercase tracking-wider">The Challenge</span>
            <span className="w-8 h-px bg-indigo-400" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-carbon leading-[1.15]">
            The Problem with Most Design Partners
          </h2>
        </div>

        {/* Mobile Layout: Stacked with quote in middle */}
        <div className="md:hidden space-y-4">
          {/* Card 1 */}
          <div
            className={`bg-g50 rounded-xl p-5 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="text-indigo-400 font-black text-2xl">{problemsData[0].num}</span>
            <h3 className="font-heading text-base font-bold text-carbon mt-2 mb-1.5">{problemsData[0].title}</h3>
            <p className="font-body text-sm text-g500 leading-relaxed">{problemsData[0].desc}</p>
          </div>

          {/* Card 2 */}
          <div
            className={`bg-g50 rounded-xl p-5 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="text-indigo-400 font-black text-2xl">{problemsData[1].num}</span>
            <h3 className="font-heading text-base font-bold text-carbon mt-2 mb-1.5">{problemsData[1].title}</h3>
            <p className="font-body text-sm text-g500 leading-relaxed">{problemsData[1].desc}</p>
          </div>

          {/* Quote Card */}
          <div
            className={`bg-indigo-500 rounded-2xl p-6 text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <svg className="w-8 h-8 text-indigo-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="font-heading text-lg font-semibold text-white leading-relaxed">
              You need a design partner who moves fast, thinks like an owner, and uses every tool available to get you results.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className={`bg-g50 rounded-xl p-5 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <span className="text-indigo-400 font-black text-2xl">{problemsData[2].num}</span>
            <h3 className="font-heading text-base font-bold text-carbon mt-2 mb-1.5">{problemsData[2].title}</h3>
            <p className="font-body text-sm text-g500 leading-relaxed">{problemsData[2].desc}</p>
          </div>

          {/* Card 4 */}
          <div
            className={`bg-g50 rounded-xl p-5 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <span className="text-indigo-400 font-black text-2xl">{problemsData[3].num}</span>
            <h3 className="font-heading text-base font-bold text-carbon mt-2 mb-1.5">{problemsData[3].title}</h3>
            <p className="font-body text-sm text-g500 leading-relaxed">{problemsData[3].desc}</p>
          </div>
        </div>

        {/* Desktop Layout: 3-Column Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {/* Left column */}
          <div className="space-y-5 lg:space-y-6">
            <div
              className={`bg-g50 rounded-2xl p-5 lg:p-6 hover:bg-indigo-50 transition-all duration-700 group ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="text-indigo-300 font-black text-2xl lg:text-3xl group-hover:text-indigo-400 transition-colors">{problemsData[0].num}</span>
              <h3 className="font-heading text-lg font-bold text-carbon mt-2 lg:mt-3 mb-1.5 lg:mb-2">{problemsData[0].title}</h3>
              <p className="font-body text-sm text-g500 leading-relaxed">{problemsData[0].desc}</p>
            </div>
            <div
              className={`bg-g50 rounded-2xl p-5 lg:p-6 hover:bg-indigo-50 transition-all duration-700 group ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <span className="text-indigo-300 font-black text-2xl lg:text-3xl group-hover:text-indigo-400 transition-colors">{problemsData[1].num}</span>
              <h3 className="font-heading text-lg font-bold text-carbon mt-2 lg:mt-3 mb-1.5 lg:mb-2">{problemsData[1].title}</h3>
              <p className="font-body text-sm text-g500 leading-relaxed">{problemsData[1].desc}</p>
            </div>
          </div>

          {/* Center Quote */}
          <div
            className={`bg-indigo-500 rounded-3xl p-6 lg:p-8 xl:p-10 text-center transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <svg className="w-10 h-10 lg:w-12 lg:h-12 text-indigo-300 mx-auto mb-4 lg:mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="font-heading text-lg lg:text-xl xl:text-2xl font-semibold text-white leading-relaxed">
              You need a design partner who moves fast, thinks like an owner, and uses every tool available to get you results.
            </p>
          </div>

          {/* Right column */}
          <div className="space-y-5 lg:space-y-6">
            <div
              className={`bg-g50 rounded-2xl p-5 lg:p-6 hover:bg-indigo-50 transition-all duration-700 group ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="text-indigo-300 font-black text-2xl lg:text-3xl group-hover:text-indigo-400 transition-colors">{problemsData[2].num}</span>
              <h3 className="font-heading text-lg font-bold text-carbon mt-2 lg:mt-3 mb-1.5 lg:mb-2">{problemsData[2].title}</h3>
              <p className="font-body text-sm text-g500 leading-relaxed">{problemsData[2].desc}</p>
            </div>
            <div
              className={`bg-g50 rounded-2xl p-5 lg:p-6 hover:bg-indigo-50 transition-all duration-700 group ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <span className="text-indigo-300 font-black text-2xl lg:text-3xl group-hover:text-indigo-400 transition-colors">{problemsData[3].num}</span>
              <h3 className="font-heading text-lg font-bold text-carbon mt-2 lg:mt-3 mb-1.5 lg:mb-2">{problemsData[3].title}</h3>
              <p className="font-body text-sm text-g500 leading-relaxed">{problemsData[3].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Why Choose Us Section Component
// ============================================
function WhyChooseUsSection() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let count = 0;
          const interval = setInterval(() => {
            count++;
            setVisibleCount(count);
            if (count >= whyUsData.length) {
              clearInterval(interval);
            }
          }, 200);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-20 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #030303 0%, #0a0a1a 50%, #030303 100%)' }}>
      {/* Background glows */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-500/15 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-indigo-500/15 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-indigo-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Decorative floating elements */}
      <div className="absolute top-20 right-16 w-20 h-20 border border-indigo-500/20 rounded-full opacity-60 hidden lg:block" />
      <div className="absolute bottom-32 left-12 w-28 h-28 border border-purple-500/15 rounded-full opacity-40 hidden lg:block" />
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-indigo-400/40 rounded-full hidden md:block" />
      <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-purple-400/50 rounded-full hidden md:block" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-indigo-500" />
            <span className="text-indigo-400 text-xs md:text-sm uppercase tracking-widest font-medium">Why Us</span>
            <span className="w-8 h-px bg-indigo-500" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white leading-[1.15]">
            Why Teams Choose Us
          </h2>
        </div>

        {/* Progressive Reveal Items */}
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          {whyUsData.map((item, i) => (
            <div
              key={i}
              className={`flex gap-4 md:gap-6 lg:gap-8 items-start transition-all duration-500 ${
                i < visibleCount
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8 md:translate-x-12'
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {/* Number bubble */}
              <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                i < visibleCount ? 'bg-indigo-500' : 'bg-white/5'
              }`}>
                <span className="text-xl lg:text-2xl font-black text-white">{item.num}</span>
              </div>

              {/* Content */}
              <div className={`flex-1 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 transition-all duration-500 hover:border-indigo-500/30 hover:bg-white/[0.07] ${
                i < visibleCount ? 'border-indigo-500/20' : ''
              }`}>
                <h3 className="font-heading text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="font-body text-sm md:text-base text-g400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Services Data
// ============================================
const servicesData = {
  featured: {
    id: 'design',
    title: 'UX UI Design Support',
    tagline: 'Design capacity when you need it.',
    description: 'End-to-end UX/UI design - from product strategy, research, and wireframes to high-fidelity UI and developer handoff. Fixed project or ongoing retainer, depending on what fits.',
    bestFor: 'Product teams without in-house design capacity. Companies with busy designers needing overflow support. Teams building V2 or new product lines.',
    timeline: '2 weeks - 12 weeks (depending on scope)',
  },
  secondary: {
    id: 'audit',
    title: 'UX Audit',
    tagline: 'Find what\'s broken in your product',
    description: 'A focused evaluation of your product\'s user experience. We identify friction points, usability issues, and quick-win opportunities - delivered as an actionable report with prioritized recommendations.',
    bestFor: 'Product teams seeing customer experience mishaps. Companies considering a redesign, overhaul or wanting to validate mid-way a new initiative.',
    timeline: '3 days - 3 weeks (depending on scope)',
  },
  additional: ['User Research', 'Usability Testing', 'Competitor Analysis', 'Design QA'],
};

// ============================================
// Custom SVG Illustrations
// ============================================

// Custom SVG Illustration for UX UI Design Support - Prototype & Interaction
function DesignIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="150" r="100" fill="url(#uxGrad1)" opacity="0.08"/>

      {/* Main screen */}
      <rect x="120" y="50" width="100" height="160" rx="10" fill="white" stroke="#6366F1" strokeWidth="2"/>
      <rect x="130" y="62" width="80" height="6" rx="2" fill="#c7d2fe"/>
      <rect x="130" y="76" width="50" height="8" rx="2" fill="#6366F1"/>

      {/* Interactive elements with hotspots */}
      <rect x="130" y="95" width="80" height="35" rx="4" fill="#eef2ff" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 2"/>
      <circle cx="200" cy="112" r="8" fill="#8B5CF6"/>
      <path d="M197 112 L203 112 M200 109 L200 115" stroke="white" strokeWidth="2"/>

      <rect x="130" y="140" width="80" height="25" rx="6" fill="#6366F1"/>
      <rect x="145" y="149" width="50" height="7" rx="2" fill="white"/>

      <rect x="130" y="175" width="38" height="25" rx="4" fill="#f5f3ff" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="4 2"/>
      <rect x="172" y="175" width="38" height="25" rx="4" fill="#f5f3ff"/>

      {/* Connection flow lines */}
      <path d="M220 112 C260 112, 260 80, 290 80" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
      <circle cx="290" cy="80" r="6" fill="#8B5CF6"/>

      <path d="M220 152 C270 152, 270 180, 300 180" stroke="#6366F1" strokeWidth="2" fill="none"/>
      <circle cx="300" cy="180" r="6" fill="#6366F1"/>

      {/* Target screens (small) */}
      <rect x="300" y="55" width="60" height="50" rx="6" fill="white" stroke="#e0e7ff" strokeWidth="1"/>
      <rect x="308" y="63" width="44" height="5" rx="1" fill="#8B5CF6"/>
      <rect x="308" y="73" width="44" height="20" rx="2" fill="#eef2ff"/>

      <rect x="310" y="160" width="60" height="50" rx="6" fill="white" stroke="#e0e7ff" strokeWidth="1"/>
      <rect x="318" y="168" width="44" height="5" rx="1" fill="#6366F1"/>
      <rect x="318" y="178" width="30" height="4" rx="1" fill="#c7d2fe"/>
      <rect x="318" y="188" width="44" height="12" rx="2" fill="#10b981"/>

      {/* Play button */}
      <circle cx="75" cy="130" r="25" fill="white" stroke="#6366F1" strokeWidth="2"/>
      <path d="M70 118 L85 130 L70 142 Z" fill="#6366F1"/>

      {/* Cursor */}
      <path d="M155 108 L168 128 L160 128 L164 140 L158 142 L154 130 L148 136 Z" fill="#6366F1"/>

      <defs>
        <linearGradient id="uxGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1"/>
          <stop offset="100%" stopColor="#8B5CF6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// Custom SVG Illustration for UX Audit
function AuditIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background shapes */}
      <circle cx="200" cy="150" r="100" fill="url(#auditGrad1)" opacity="0.08"/>
      <circle cx="100" cy="100" r="50" fill="#8B5CF6" opacity="0.1"/>
      <circle cx="320" cy="200" r="70" fill="#6366F1" opacity="0.08"/>

      {/* Main document/report */}
      <rect x="100" y="50" width="140" height="200" rx="8" fill="white" stroke="#e0e7ff" strokeWidth="2"/>
      <rect x="115" y="70" width="80" height="8" rx="2" fill="#6366F1"/>
      <rect x="115" y="90" width="110" height="4" rx="2" fill="#c7d2fe"/>
      <rect x="115" y="102" width="90" height="4" rx="2" fill="#c7d2fe"/>
      <rect x="115" y="114" width="100" height="4" rx="2" fill="#c7d2fe"/>

      {/* Checklist items */}
      <rect x="115" y="135" width="12" height="12" rx="2" fill="#6366F1"/>
      <path d="M118 141 L121 144 L126 138" stroke="white" strokeWidth="2" fill="none"/>
      <rect x="135" y="138" width="70" height="4" rx="2" fill="#e0e7ff"/>

      <rect x="115" y="155" width="12" height="12" rx="2" fill="#6366F1"/>
      <path d="M118 161 L121 164 L126 158" stroke="white" strokeWidth="2" fill="none"/>
      <rect x="135" y="158" width="60" height="4" rx="2" fill="#e0e7ff"/>

      <rect x="115" y="175" width="12" height="12" rx="2" fill="#8B5CF6" opacity="0.5"/>
      <rect x="135" y="178" width="80" height="4" rx="2" fill="#e0e7ff"/>

      <rect x="115" y="195" width="12" height="12" rx="2" fill="#8B5CF6" opacity="0.3"/>
      <rect x="135" y="198" width="50" height="4" rx="2" fill="#e0e7ff"/>

      {/* Magnifying glass */}
      <g transform="translate(240, 80)">
        <circle cx="45" cy="45" r="40" fill="none" stroke="#6366F1" strokeWidth="4"/>
        <circle cx="45" cy="45" r="30" fill="#6366F1" opacity="0.1"/>
        <line x1="75" y1="75" x2="100" y2="100" stroke="#6366F1" strokeWidth="6" strokeLinecap="round"/>
        {/* Reflection */}
        <path d="M30 30 Q35 25 45 28" stroke="white" strokeWidth="2" fill="none" opacity="0.6"/>
      </g>

      {/* Chart/Graph */}
      <g transform="translate(260, 170)">
        <rect width="90" height="70" rx="6" fill="white" stroke="#e0e7ff" strokeWidth="2"/>
        <rect x="15" y="45" width="12" height="15" rx="2" fill="#6366F1"/>
        <rect x="32" y="30" width="12" height="30" rx="2" fill="#8B5CF6"/>
        <rect x="49" y="20" width="12" height="40" rx="2" fill="#6366F1"/>
        <rect x="66" y="35" width="12" height="25" rx="2" fill="#a78bfa"/>
      </g>

      {/* Alert/Issue markers */}
      <circle cx="85" cy="140" r="12" fill="#f59e0b" opacity="0.9"/>
      <text x="85" y="145" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">!</text>

      <circle cx="70" cy="200" r="10" fill="#ef4444" opacity="0.8"/>
      <text x="70" y="204" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">×</text>

      {/* Floating elements */}
      <circle cx="320" cy="70" r="4" fill="#6366F1"/>
      <circle cx="80" cy="60" r="3" fill="#8B5CF6"/>
      <rect x="300" cy="250" width="15" height="15" rx="3" fill="#6366F1" opacity="0.2" transform="rotate(20 307 257)"/>

      <defs>
        <linearGradient id="auditGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1"/>
          <stop offset="100%" stopColor="#8B5CF6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// ============================================
// Services Section Component
// ============================================
function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-20 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 50%, #f8fafc 100%)' }}>
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-indigo-200/50 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-purple-200/40 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-indigo-100/60 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #c7d2fe 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-indigo-200 rounded-full opacity-60 hidden lg:block" />
      <div className="absolute bottom-32 right-16 w-32 h-32 border border-indigo-200/50 rounded-full opacity-40 hidden lg:block" />
      <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-indigo-300 rounded-full opacity-60 hidden md:block" />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-purple-300 rounded-full opacity-50 hidden md:block" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div
          className={`mb-10 md:mb-12 lg:mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-indigo-400" />
            <span className="text-indigo-500 text-sm font-medium uppercase tracking-wider">Our Services</span>
            <span className="w-8 h-px bg-indigo-400" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-carbon leading-[1.15]">
            UX Design Services We Offer
          </h2>
        </div>

        {/* Mobile Layout: Stacked */}
        <div className="lg:hidden space-y-4 mb-10">
          {/* Featured Card - Mobile */}
          <div
            className={`bg-indigo-500 rounded-2xl p-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
            </div>
            <p className="text-indigo-200 text-sm mb-1">{servicesData.featured.tagline}</p>
            <h3 className="font-heading text-xl font-bold text-white mb-3">{servicesData.featured.title}</h3>
            <p className="text-indigo-100 text-sm leading-relaxed mb-4">{servicesData.featured.description}</p>

            <div className="space-y-2 mb-5 text-sm">
              <div>
                <span className="text-white font-semibold">Best for: </span>
                <span className="text-indigo-100">{servicesData.featured.bestFor}</span>
              </div>
              <div>
                <span className="text-white font-semibold">Timeline: </span>
                <span className="text-indigo-100">{servicesData.featured.timeline}</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-500 text-sm font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Book a Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Secondary Card - Mobile */}
          <div
            className={`bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-6 shadow-lg shadow-indigo-100/50 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-500 mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <p className="text-indigo-500 text-sm mb-1">{servicesData.secondary.tagline}</p>
            <h3 className="font-heading text-xl font-bold text-carbon mb-3">{servicesData.secondary.title}</h3>
            <p className="text-g500 text-sm leading-relaxed mb-4">{servicesData.secondary.description}</p>

            <div className="space-y-2 mb-5 text-sm">
              <div>
                <span className="text-carbon font-semibold">Best for: </span>
                <span className="text-g500">{servicesData.secondary.bestFor}</span>
              </div>
              <div>
                <span className="text-carbon font-semibold">Timeline: </span>
                <span className="text-g500">{servicesData.secondary.timeline}</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500 text-white text-sm font-semibold rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Book a Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Desktop Layout: Featured + Secondary Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-10">
          {/* Featured Card - Large (2 columns) with Illustration Header */}
          <div
            className={`lg:col-span-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl overflow-hidden transition-all duration-700 group ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Illustration Header */}
            <div className="relative flex items-center justify-center p-4 bg-gradient-to-br from-indigo-400/30 to-purple-400/20">
              <DesignIllustration className="w-full h-auto max-w-[200px] group-hover:scale-105 transition-transform duration-300" />
            </div>

            <div className="p-8 xl:p-10">
              <p className="text-indigo-200 text-sm mb-2">{servicesData.featured.tagline}</p>
              <h3 className="font-heading text-2xl xl:text-3xl font-bold text-white mb-4">{servicesData.featured.title}</h3>
              <p className="text-indigo-100 text-base leading-relaxed mb-6 max-w-xl">{servicesData.featured.description}</p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <span className="text-white font-semibold text-sm block mb-1">Best for</span>
                  <span className="text-indigo-100 text-sm">{servicesData.featured.bestFor}</span>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <span className="text-white font-semibold text-sm block mb-1">Timeline</span>
                  <span className="text-indigo-100 text-sm">{servicesData.featured.timeline}</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-500 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Book a Call
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Secondary Card - Smaller (1 column) with Illustration Header */}
          <div
            className={`bg-white/80 backdrop-blur-sm border border-white rounded-3xl overflow-hidden shadow-lg shadow-indigo-100/50 hover:shadow-xl hover:shadow-indigo-200/50 transition-all duration-700 group ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Illustration Header */}
            <div className="relative flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
              <AuditIllustration className="w-full h-auto max-w-[200px] group-hover:scale-105 transition-transform duration-300" />
            </div>

            <div className="p-6 xl:p-8">
              <p className="text-indigo-500 text-sm mb-2">{servicesData.secondary.tagline}</p>
              <h3 className="font-heading text-xl xl:text-2xl font-bold text-carbon mb-3">{servicesData.secondary.title}</h3>
              <p className="text-g500 text-sm leading-relaxed mb-4">{servicesData.secondary.description}</p>

              <div className="space-y-3 mb-5 text-sm">
                <div>
                  <span className="text-carbon font-semibold">Best for: </span>
                  <span className="text-g500">{servicesData.secondary.bestFor}</span>
                </div>
                <div>
                  <span className="text-carbon font-semibold">Timeline: </span>
                  <span className="text-g500">{servicesData.secondary.timeline}</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Book a Call
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div
          className={`bg-white/60 backdrop-blur-sm border border-white rounded-2xl p-5 md:p-6 shadow-md shadow-indigo-100/30 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <h3 className="font-heading text-sm md:text-base font-bold text-carbon mb-4">
            Need something specific? We also offer
          </h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {servicesData.additional.map((service) => (
              <span
                key={service}
                className="px-4 py-2 bg-white border border-indigo-100 rounded-full text-carbon text-sm font-medium hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-500 transition-all cursor-pointer shadow-sm"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// How We Work Section Illustrations
// ============================================

function DiscoveryIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="150" r="80" fill="#EEF2FF" />
      <rect x="120" y="80" width="160" height="120" rx="8" fill="white" stroke="#6366F1" strokeWidth="3"/>
      <rect x="130" y="90" width="60" height="50" rx="4" fill="#E0E7FF"/>
      <rect x="200" y="90" width="70" height="50" rx="4" fill="#E0E7FF"/>
      <circle cx="160" cy="108" r="12" fill="#6366F1"/>
      <rect x="148" y="122" width="24" height="14" rx="2" fill="#6366F1"/>
      <circle cx="235" cy="108" r="12" fill="#8B5CF6"/>
      <rect x="223" y="122" width="24" height="14" rx="2" fill="#8B5CF6"/>
      <circle cx="170" cy="170" r="10" fill="#6366F1"/>
      <circle cx="200" cy="170" r="10" fill="#EF4444"/>
      <circle cx="230" cy="170" r="10" fill="#6366F1"/>
      <ellipse cx="100" cy="100" rx="30" ry="20" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="2"/>
      <ellipse cx="300" cy="120" rx="25" ry="18" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2"/>
    </svg>
  );
}

function ProposalIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="150" r="80" fill="#EEF2FF" />
      <rect x="140" y="60" width="120" height="160" rx="6" fill="white" stroke="#6366F1" strokeWidth="3"/>
      <rect x="155" y="80" width="70" height="8" rx="2" fill="#6366F1"/>
      <rect x="155" y="100" width="90" height="4" rx="2" fill="#E0E7FF"/>
      <rect x="155" y="112" width="80" height="4" rx="2" fill="#E0E7FF"/>
      <rect x="155" y="124" width="85" height="4" rx="2" fill="#E0E7FF"/>
      <rect x="155" y="145" width="12" height="12" rx="2" fill="#6366F1"/>
      <path d="M158 151 L161 154 L166 148" stroke="white" strokeWidth="2" fill="none"/>
      <rect x="175" y="148" width="60" height="4" rx="2" fill="#E0E7FF"/>
      <rect x="155" y="165" width="12" height="12" rx="2" fill="#6366F1"/>
      <path d="M158 171 L161 174 L166 168" stroke="white" strokeWidth="2" fill="none"/>
      <rect x="175" y="168" width="50" height="4" rx="2" fill="#E0E7FF"/>
      <rect x="155" y="185" width="12" height="12" rx="2" fill="#8B5CF6"/>
      <path d="M158 191 L161 194 L166 188" stroke="white" strokeWidth="2" fill="none"/>
      <rect x="175" y="188" width="55" height="4" rx="2" fill="#E0E7FF"/>
      <circle cx="290" cy="100" r="20" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="2"/>
      <text x="290" y="106" textAnchor="middle" fill="#8B5CF6" fontSize="16" fontWeight="bold">$</text>
      <rect x="80" y="120" width="40" height="40" rx="6" fill="#F5F3FF" stroke="#6366F1" strokeWidth="2"/>
      <rect x="90" y="130" width="20" height="3" rx="1" fill="#6366F1"/>
      <rect x="90" y="137" width="15" height="3" rx="1" fill="#6366F1"/>
      <rect x="90" y="144" width="18" height="3" rx="1" fill="#6366F1"/>
    </svg>
  );
}

function DesignProcessIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="150" r="80" fill="#EEF2FF" />
      <rect x="110" y="70" width="180" height="140" rx="8" fill="white" stroke="#6366F1" strokeWidth="3"/>
      <rect x="125" y="90" width="70" height="50" rx="4" fill="#E0E7FF"/>
      <rect x="205" y="90" width="70" height="25" rx="4" fill="#8B5CF6"/>
      <rect x="205" y="120" width="70" height="20" rx="4" fill="#F5F3FF" stroke="#6366F1" strokeWidth="1"/>
      <rect x="125" y="150" width="150" height="8" rx="2" fill="#E0E7FF"/>
      <rect x="125" y="165" width="100" height="6" rx="2" fill="#F5F3FF"/>
      <rect x="125" y="178" width="60" height="20" rx="4" fill="#6366F1"/>
      <path d="M260 130 L273 150 L265 150 L269 162 L263 164 L259 152 L253 158 Z" fill="#6366F1"/>
      <g transform="translate(300, 90)">
        <rect width="50" height="80" rx="6" fill="white" stroke="#8B5CF6" strokeWidth="2"/>
        <circle cx="25" cy="20" r="8" fill="#6366F1"/>
        <rect x="10" y="35" width="30" height="6" rx="2" fill="#E0E7FF"/>
        <rect x="10" y="48" width="30" height="6" rx="2" fill="#E0E7FF"/>
        <rect x="10" y="61" width="30" height="6" rx="2" fill="#E0E7FF"/>
      </g>
      <g transform="translate(60, 100)">
        <rect x="10" y="0" width="8" height="50" rx="2" fill="#8B5CF6"/>
        <path d="M10 50 L14 60 L18 50" fill="#6366F1"/>
      </g>
    </svg>
  );
}

function HandoffIllustration({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="150" r="80" fill="#EEF2FF" />
      <rect x="150" y="100" width="100" height="80" rx="4" fill="white" stroke="#6366F1" strokeWidth="3"/>
      <line x1="150" y1="130" x2="250" y2="130" stroke="#6366F1" strokeWidth="2"/>
      <line x1="200" y1="100" x2="200" y2="180" stroke="#6366F1" strokeWidth="2"/>
      <circle cx="200" cy="155" r="15" fill="#10B981"/>
      <path d="M193 155 L198 160 L208 150" stroke="white" strokeWidth="3" fill="none"/>
      <g transform="translate(260, 80)">
        <rect width="50" height="60" rx="4" fill="white" stroke="#8B5CF6" strokeWidth="2"/>
        <rect x="8" y="10" width="34" height="4" rx="1" fill="#8B5CF6"/>
        <rect x="8" y="20" width="30" height="3" rx="1" fill="#E0E7FF"/>
        <rect x="8" y="28" width="25" height="3" rx="1" fill="#E0E7FF"/>
        <rect x="8" y="40" width="34" height="12" rx="2" fill="#EEF2FF"/>
      </g>
      <g transform="translate(80, 90)">
        <rect width="45" height="55" rx="4" fill="white" stroke="#6366F1" strokeWidth="2"/>
        <rect x="8" y="10" width="30" height="4" rx="1" fill="#6366F1"/>
        <rect x="8" y="20" width="25" height="3" rx="1" fill="#E0E7FF"/>
        <rect x="8" y="28" width="20" height="3" rx="1" fill="#E0E7FF"/>
        <circle cx="22" cy="43" r="6" fill="#EEF2FF" stroke="#6366F1" strokeWidth="1"/>
      </g>
      <path d="M130 150 L140 150 M135 145 L130 150 L135 155" stroke="#6366F1" strokeWidth="2" fill="none"/>
      <path d="M260 150 L270 150 M265 145 L270 150 L265 155" stroke="#8B5CF6" strokeWidth="2" fill="none"/>
      <g transform="translate(170, 190)">
        <ellipse cx="30" cy="20" rx="35" ry="22" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="2"/>
        <circle cx="20" cy="20" r="3" fill="#8B5CF6"/>
        <circle cx="30" cy="20" r="3" fill="#8B5CF6"/>
        <circle cx="40" cy="20" r="3" fill="#8B5CF6"/>
      </g>
    </svg>
  );
}

// ============================================
// How We Work Section Component (Option 6)
// ============================================
function HowWeWorkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const illustrations = [DiscoveryIllustration, ProposalIllustration, DesignProcessIllustration, HandoffIllustration];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-indigo-500 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="howWeWorkGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#howWeWorkGrid)"/>
        </svg>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-indigo-300" />
            <span className="text-indigo-200 text-sm font-medium uppercase tracking-wider">The Process</span>
            <span className="w-8 h-px bg-indigo-300" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">How We Work</h2>
          <p className="text-white/70 max-w-xl mx-auto">Four simple steps to transform your product experience</p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => {
            const Illust = illustrations[i];
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 shadow-2xl hover:scale-105 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
              >
                <Illust className="w-full h-auto max-w-[140px] mx-auto mb-4" />
                <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="font-heading text-lg font-bold text-carbon text-center mb-2">{step.title}</h3>
                <p className="text-g500 text-sm text-center leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
          <p className="text-white/80 mb-4">Ready to start?</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-500 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
            Book Free Discovery Call
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Is This Right For You Data
// ============================================
const rightForYouData = {
  forYou: [
    'Product teams of 10+ size needing design capacity',
    'Companies without in-house design or with overwhelmed designers',
    'Teams building V2, new features, products, or planning a redesign',
    'Organisations that want outcomes, not just deliverables',
    'Teams in India or globally (we\'re based in Bangalore, work remotely everywhere)',
  ],
  notForYou: [
    { text: 'Teams wanting to upskill, not outsource', link: '/for-business/training-for-teams', linkText: 'Training for Teams' },
    { text: 'Companies looking to hire full-time designers', link: '/for-business/hire-ux-designers', linkText: 'Hire UX Designers' },
    { text: 'Early-stage startups without budget validation', link: null, linkText: null },
  ],
};

// ============================================
// Our Clients Data
// ============================================
const clientsData = {
  stats: [
    { value: '20+', label: 'businesses served' },
    { value: '13+', label: 'years experience' },
    { value: '100+', label: 'projects delivered' },
  ],
  clients: [
    { name: 'Yokogawa', logo: null },
    { name: 'GetCopayHelp', logo: '/images/services-getcopay.svg' },
    { name: 'Credit Saison', logo: null },
    { name: 'Tata Sky', logo: null },
    { name: 'Milaap', logo: null },
    { name: 'Motus', logo: null },
    { name: 'Vera Security', logo: null },
    { name: 'Westcon-Comstor', logo: null },
    { name: 'KredX', logo: null },
    { name: 'Adroit Vantage', logo: null },
  ],
  featured: {
    name: 'GetCopayHelp',
    logo: '/images/services-getcopay.svg',
    industry: 'Healthcare Fintech (US & UK)',
    description: 'Brand system, design system, and product design from scratch.',
  },
};

// ============================================
// FAQ Data
// ============================================
const faqData = [
  {
    question: "What's the minimum project size?",
    answer: "Our minimum engagement is ₹50,000. This ensures we can deliver meaningful work, not just surface-level advice.",
  },
  {
    question: "How much does a typical project cost?",
    answer: "UX audits range from ₹50K–3L depending on scope. Design projects range from ₹75K–10L+ depending on complexity, timeline, and engagement model. We provide a clear proposal after the discovery call.",
  },
  {
    question: "How long does a project take?",
    answer: "UX audits: 3 days – 3 weeks. Design projects: 2 weeks – 12 weeks. Depends on scope and your team's availability for feedback.",
  },
  {
    question: "Do you work with startups?",
    answer: "We work best with product companies that have validated their business model and have budget allocated for design. Early-stage startups exploring ideas may not be the right fit.",
  },
  {
    question: "Can you work as an extended team?",
    answer: "Yes. We offer monthly retainers for ongoing design support — acting as your design team without the overhead of full-time hires.",
  },
  {
    question: "Where are you based? Do you work remotely?",
    answer: "We're based in Bangalore, India. We work with product teams across India and globally - most of our collaboration happens remotely via Figma, Slack, and video calls.",
  },
  {
    question: "What's included in a UX audit?",
    answer: "Annotated screenshots, prioritized recommendations, executive summary, detailed report, and a 30-minute walkthrough call.",
  },
  {
    question: "Do you do development?",
    answer: "Not yet — but it's coming soon. Currently, we hand off dev-ready files with specs and assets. We can recommend development partners if needed.",
  },
  {
    question: "What if we're not sure what we need?",
    answer: "Book a discovery call. We'll assess your situation and recommend what helps — even if it's not us.",
  },
];

// ============================================
// Is This Right For You Section (Training Page Style)
// ============================================
function IsThisRightForYouSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #030303 0%, #0a0a1a 50%, #030303 100%)' }}>
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-indigo-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-purple-500/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-green-500/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Decorative floating elements */}
      <div className="absolute top-16 left-20 w-16 h-16 border border-indigo-500/20 rounded-full opacity-50 hidden lg:block" />
      <div className="absolute bottom-24 right-16 w-20 h-20 border border-green-500/15 rounded-full opacity-40 hidden lg:block" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-indigo-400/30 rounded-full hidden md:block" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-indigo-500" />
            <span className="text-indigo-400 text-sm font-medium uppercase tracking-wider">Right Fit</span>
            <span className="w-8 h-px bg-indigo-500" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white">Is This Right for You?</h2>
        </div>

        {/* Cards */}
        <div className="relative grid md:grid-cols-2 gap-6 md:gap-8">
          {/* VS Badge - Center */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[#1a1a1a] border border-white/20 items-center justify-center">
            <span className="text-white/60 text-sm font-medium">vs</span>
          </div>

          {/* This is for - Green border */}
          <div
            className={`bg-[#0a1a0a] border border-green-500/30 rounded-2xl p-6 md:p-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-white">This is for:</h3>
            </div>
            <ul className="space-y-3">
              {rightForYouData.forYou.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-g300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* This is not for - Gray border */}
          <div
            className={`bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-white">This is not for:</h3>
            </div>
            <ul className="space-y-3">
              {rightForYouData.notForYou.map((item, i) => (
                <li key={i} className="text-g400 text-sm">
                  <span className="text-g500">•</span> {item.text}
                  {item.link && (
                    <> → <Link href={item.link} className="text-indigo-400 hover:underline">{item.linkText}</Link></>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Our Clients Section Component
// ============================================
function OurClientsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden bg-white">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-indigo-100/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-100/50 rounded-full blur-[80px] pointer-events-none" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #e0e7ff 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-indigo-300 rounded-full opacity-60 hidden md:block" />
      <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-purple-300 rounded-full opacity-50 hidden md:block" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-10 md:mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-indigo-400" />
            <span className="text-indigo-500 text-sm font-medium uppercase tracking-wider">Trusted Partners</span>
            <span className="w-8 h-px bg-indigo-400" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-carbon">Our Clients</h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left - Clients */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="flex flex-wrap gap-3 mb-6">
              {clientsData.clients.map((client, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-5 py-3 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md transition-all"
                >
                  {client.logo ? (
                    <Image src={client.logo} alt={client.name} width={100} height={28} className="h-6 w-auto object-contain" />
                  ) : (
                    <span className="text-carbon font-medium">{client.name}</span>
                  )}
                </div>
              ))}
            </div>
            {/* Stats */}
            <div className="flex gap-8 pt-6 border-t border-gray-200">
              {clientsData.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-indigo-500">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Featured */}
          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="bg-indigo-500 rounded-2xl p-6 text-white h-full">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-4">Featured</span>
              <div className="w-full bg-white rounded-lg px-4 py-3 flex items-center justify-center mb-4">
                {clientsData.featured.logo ? (
                  <Image
                    src={clientsData.featured.logo}
                    alt={clientsData.featured.name}
                    width={140}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span className="font-medium text-sm text-carbon">{clientsData.featured.name}</span>
                )}
              </div>
              <h4 className="font-heading text-lg font-bold mb-2">{clientsData.featured.industry}</h4>
              <p className="text-white/80 text-sm">{clientsData.featured.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Free UX Audit CTA Section Component
// ============================================
function FreeAuditCTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    productUrl: '',
    role: '',
    whatsNotWorking: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/services-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          productUrl: formData.productUrl,
          role: formData.role,
          whatsNotWorking: formData.whatsNotWorking,
          source: 'ux-design-services-free-audit',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', productUrl: '', role: '', whatsNotWorking: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="free-audit"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 50%, #030303 100%)' }}
    >
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-indigo-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-purple-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-[800px] mx-auto px-5 md:px-8 relative z-10">
        {/* Content */}
        <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-indigo-500" />
            <span className="text-indigo-400 text-sm font-medium uppercase tracking-wider">Free Offer</span>
            <span className="w-8 h-px bg-indigo-500" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
            Free UX Audit for Your Product
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto mb-8 md:mb-10">
            Submit your product URL. We&apos;ll review it and send you a brief audit - friction points, quick wins, and what we&apos;d fix first. No call required.
          </p>

          {/* CTA or Form */}
          {!showForm ? (
            <div
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-500 text-white text-sm md:text-base font-semibold rounded-xl hover:bg-indigo-600 transition-colors mb-8"
              >
                Get Free UX Audit
              </button>

              <div className="text-white/60 mb-4">Prefer to talk first?</div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white text-sm md:text-base font-medium rounded-xl hover:bg-white/5 transition-colors"
              >
                Book a Discovery Call
              </Link>
            </div>
          ) : (
            <div
              className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 transition-all duration-500 ${showForm ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            >
              {submitStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">Thank you!</h3>
                  <p className="text-white/70">We&apos;ll connect with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-1.5">
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-1.5">
                        Work Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="productUrl" className="block text-white/80 text-sm font-medium mb-1.5">
                      Product URL / App URL <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="url"
                      id="productUrl"
                      required
                      value={formData.productUrl}
                      onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      placeholder="https://yourproduct.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-white/80 text-sm font-medium mb-1.5">
                      What&apos;s your role? <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="role"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    >
                      <option value="" className="bg-[#1a1a1a]">Select your role</option>
                      <option value="Founder / CEO" className="bg-[#1a1a1a]">Founder / CEO</option>
                      <option value="Product Manager" className="bg-[#1a1a1a]">Product Manager</option>
                      <option value="Engineering Lead" className="bg-[#1a1a1a]">Engineering Lead</option>
                      <option value="Design Lead" className="bg-[#1a1a1a]">Design Lead</option>
                      <option value="Marketing" className="bg-[#1a1a1a]">Marketing</option>
                      <option value="Other" className="bg-[#1a1a1a]">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="whatsNotWorking" className="block text-white/80 text-sm font-medium mb-1.5">
                      What&apos;s not working? <span className="text-white/40">(optional)</span>
                    </label>
                    <textarea
                      id="whatsNotWorking"
                      rows={3}
                      value={formData.whatsNotWorking}
                      onChange={(e) => setFormData({ ...formData, whatsNotWorking: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
                      placeholder="Tell us about the UX challenges you're facing..."
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Get My Free Audit'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 border border-white/20 text-white/70 font-medium rounded-lg hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Blog Data
// ============================================
const blogData = {
  title: 'How We Use AI in UX Design',
  description: "We use AI across research, ideation, and iteration - here's exactly how it speeds up our process without cutting corners.",
  highlightText: 'AI-augmented design.',
  highlightPrefix: "The result?",
  highlightSuffix: "Senior-level thinking at startup speed.",
  article: {
    tag: 'Deep Dive',
    title: 'Tamed AI power in design process changes the product game...',
    slug: 'ai-in-design-process',
    readTime: '4 mins read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  },
};

// ============================================
// From Our Blog Section Component
// ============================================
function FromOurBlogSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left Content */}
          <div
            className={`flex-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-indigo-400" />
              <span className="text-indigo-500 text-sm font-medium uppercase tracking-wider">From Our Blog</span>
              <span className="w-8 h-px bg-indigo-400" />
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-carbon tracking-tight mb-6">
              {blogData.title}
            </h2>

            <p className="text-sm md:text-base text-g600 leading-relaxed mb-8">
              {blogData.description}
            </p>

            {/* Highlighted callout - indigo accent */}
            <div className="relative pl-6 border-l-4 border-indigo-500">
              <p className="font-heading text-xl lg:text-2xl font-bold text-carbon leading-snug">
                {blogData.highlightPrefix}{' '}
                <span className="text-indigo-500">{blogData.highlightText}</span>{' '}
                {blogData.highlightSuffix}
              </p>
            </div>
          </div>

          {/* Right Card - Blog Link with Image */}
          <div
            className={`w-full lg:w-[380px] flex-shrink-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <Link
              href={`/resources/blogs/${blogData.article.slug}`}
              className="group block relative overflow-hidden border border-g200 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl rounded-lg"
            >
              {/* Background Image */}
              <Image
                src={blogData.article.image}
                alt={blogData.article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 min-h-[280px] md:min-h-[320px] flex flex-col justify-end">
                {/* Tag */}
                <span className="inline-block px-3 py-1 bg-indigo-500/80 backdrop-blur-sm text-white text-xs font-semibold mb-4 w-fit rounded">
                  {blogData.article.tag}
                </span>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-white mb-4 leading-snug">
                  {blogData.article.title}
                </h3>

                {/* Read link */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-white group-hover:gap-3 transition-all">
                    Read
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8H13M13 8L9 4M13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-white/70">{blogData.article.readTime}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Other Ways Data
// ============================================
const otherWaysData = [
  {
    title: 'Hire UX Designers',
    description: "Need to grow your design team? We place vetted, ready designers from our mentorship programs. Portfolio-reviewed, 60-day replacement guarantee.",
    link: '/for-business/hire-ux-designers',
    linkText: 'Explore Hire UX Designers',
  },
  {
    title: 'Training for Teams',
    description: "Want to upskill your team, not outsource? Practical workshops on leadership, research, design systems, and AI - built for your team's actual gaps.",
    link: '/for-business/training-for-teams',
    linkText: 'Explore Training',
  },
  {
    title: '1:1 Mentorship',
    description: "Have individual designers who want to grow? Our mentorship programs help designers move to more-confident, and senior/leadership roles - structured, practical, outcome-focused.",
    link: '/programs',
    linkText: 'Explore Programs',
  },
];

// ============================================
// Other Ways We Help Section Component
// ============================================
function OtherWaysSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 md:py-20 lg:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #030303 0%, #0a0a1a 50%, #030303 100%)' }}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-indigo-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-purple-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
        {/* Header with eyebrow */}
        <div className={`mb-10 md:mb-14 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-indigo-500" />
            <span className="text-indigo-400 text-sm font-medium uppercase tracking-wider">Beyond Services</span>
            <span className="w-8 h-px bg-indigo-500" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white leading-tight">
            Other Ways We Help Product Teams
          </h2>
        </div>

        {/* Minimal Text Layout - Option 4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {otherWaysData.map((item, i) => (
            <div
              key={i}
              className={`border-l-2 border-indigo-500/40 pl-5 md:pl-6 hover:border-indigo-500 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${100 + i * 100}ms` }}
            >
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="font-body text-sm md:text-base text-g400 leading-relaxed mb-4">
                {item.description}
              </p>
              <Link
                href={item.link}
                className="inline-flex items-center gap-1 text-indigo-400 font-medium text-sm hover:gap-2 transition-all"
              >
                {item.linkText}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Final CTA Section Component (X Motif)
// ============================================
function FinalCTASection() {
  return (
    <section id="discovery-call" className="relative py-14 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
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
          Ready to Fix Your Product&apos;s UX?
        </h2>

        {/* Subtext */}
        <p className="text-sm md:text-base text-g400 mb-8 max-w-[600px] mx-auto">
          Book a free discovery call. We&apos;ll learn about your product, diagnose what&apos;s broken, and recommend a path forward - even if it&apos;s not us.
        </p>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Book Free Discovery Call
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        {/* Contact info */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-x-2 gap-y-2">
          <span className="text-sm md:text-base text-g400">Prefer to talk first?</span>
          <span className="text-g600 mx-3 hidden sm:inline">|</span>
          <a href="mailto:hello@xperiencewave.com" className="text-sm md:text-base text-g400 hover:text-white transition-colors">
            hello@xperiencewave.com
          </a>
          <span className="text-g600 mx-3 hidden sm:inline">|</span>
          <a href="tel:+918147706841" className="text-sm md:text-base text-g400 hover:text-white transition-colors">
            +91 8147706841
          </a>
        </div>
      </div>
    </section>
  );
}
