import Link from 'next/link';
import VideoSection from './VideoSection';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#111] pt-24 md:pt-28 pb-0 relative overflow-hidden">
      {/* Alice Blue X watermark - 6% opacity, right aligned */}
      <span
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 font-heading font-extrabold text-[400px] md:text-[600px] lg:text-[800px] text-[#DCEEFF]/[0.06] pointer-events-none select-none"
        aria-hidden="true"
      >
        X
      </span>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        {/* Hero Content */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h1 className="font-heading text-[28px] md:text-[40px] lg:text-[52px] font-bold text-white leading-tight mb-4 md:mb-6">
            Why Aren&apos;t You Getting{' '}
            <span className="text-accent">Senior &amp; Leadership UX Roles</span> Yet?
          </h1>
          <p className="font-heading text-lg md:text-xl lg:text-2xl font-semibold text-g300 mb-3">
            1:1 Mentorship That Fixes YOUR Gaps, Not Generic Courses That Leave You Stuck
          </p>
          <div
            className="rounded-xl py-3 px-6 md:px-8 inline-block"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(220,238,255,0.3) 50%, transparent 100%)',
            }}
          >
            <p className="text-sm md:text-base text-g300">
              For UX/UI/Product designers with 2+ years experience who are ready to grow but keep
              getting stuck at the same level
            </p>
          </div>
        </div>

        {/* Video Section */}
        <VideoSection />

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 pt-6 pb-12 md:pb-16">
          <Button href="#watch-video" showArrow>
            Watch how it works
          </Button>
          <Link href="#book-call" className="text-accent hover:text-white text-sm md:text-base transition-colors">
            Book a free strategy call
          </Link>
          <span className="inline-block px-3 py-1.5 bg-alice/10 text-alice text-xs md:text-sm font-medium rounded-full">
            Includes AI-first design approach
          </span>
        </div>
      </div>
    </section>
  );
}
