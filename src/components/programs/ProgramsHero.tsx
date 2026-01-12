'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

const stats = [
  { value: '3000', suffix: '+', label: 'designers consulted' },
  { value: '140', suffix: '+', label: 'mentored 1:1' },
  { value: '80', suffix: '%', label: 'achieved their goals' },
];

export default function ProgramsHero() {
  const scrollToFinder = () => {
    document.getElementById('program-finder')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-[#0a0a0a] via-[#0f0f0f] to-[#141418] pt-24 md:pt-28 pb-0 overflow-hidden">
      {/* Subtle gradient orbs */}
      <div
        className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #DCEEFF 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF0023 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
          <Link href="/" className="text-g400 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-g600">&gt;</span>
          <span className="text-white font-medium">Programs</span>
        </nav>

        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center pb-12 md:pb-16">
          {/* Left - Image */}
          <div className="order-2 lg:order-1">
            <div
              className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden"
              style={{ borderRadius: '6px' }}
            >
              {/* Placeholder with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-g200 via-g100 to-g200">
                {/* Decorative elements */}
                <div className="absolute inset-4 border border-g300/50 rounded-lg" style={{ borderRadius: '6px' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-g400">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                      <path d="M21 15L16 10L4 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
              <div className="absolute -top-3 -left-3 w-16 h-16 bg-alice/20 rounded-full blur-xl" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <h1 className="font-heading text-[32px] md:text-[42px] lg:text-[52px] font-bold text-white leading-[1.1] mb-6">
              1:1 <span className="text-accent">UX   Mentorship</span> Programs That Actually Get You There
            </h1>

            <p className="font-body text-base md:text-lg text-g300 leading-relaxed mb-6">
              Whether you&apos;re starting out, stuck at mid-level, or ready to lead. A success path built for where you are
            </p>

            {/* Highlight Banner */}
            
            <div
              className="inline-block py-3 px-5 mb-8"
              style={{
                borderRadius: '6px',
                background: 'linear-gradient(90deg, rgba(220,238,255,0.1) 0%, rgba(220,238,255,0.2) 50%, rgba(220,238,255,0.1) 100%)',
                border: '1px solid rgba(220,238,255,0.15)',
              }}
            >
              <p className="font-heading text-sm md:text-base font-semibold text-alice">
                1:1 mentorship. AI-first design approach.<br className="hidden sm:block" />
                Support until you succeed
              </p>
            </div>

            <div>
              <Button onClick={scrollToFinder} showArrow>
                Find your program
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/* Stats Bar - Full width with X watermark */}
      <div className="bg-carbon py-10 md:py-12 relative overflow-hidden">
        {/* X watermark */}
        <span className="absolute top-1/2 right-[-80px] -translate-y-1/2 font-heading font-extrabold text-[250px] md:text-[350px] text-alice/[0.06] pointer-events-none select-none"
          aria-hidden="true"
        >
          X
        </span>

        <div className="max-w-[1200px] mx-auto px-5 relative z-10">
          <div className="flex flex-wrap justify-center md:justify-between gap-8 md:gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                  <span className="text-accent">{stat.suffix}</span>
                </div>
                <p className="text-g500 text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
