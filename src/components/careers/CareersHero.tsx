import Image from 'next/image';
import Breadcrumb from './Breadcrumb';

/** Listing-page hero. Same look as the "Join Our Mission" section on About. */
export default function CareersHero({ openCount }: { openCount: number }) {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A]">
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(212, 168, 83, 0.10) 0%, transparent 60%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 pt-24 md:pt-28 pb-16 md:pb-24">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Careers' }]} className="mb-10 animate-hero-fade-in" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4A853]/20 text-[#D4A853] text-xs font-bold uppercase tracking-wider mb-8 animate-hero-fade-in"
              style={{ borderRadius: '6px' }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              We&apos;re Hiring
            </span>

            <h1
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.1] mb-6 animate-hero-fade-in"
              style={{ animationDelay: '100ms' }}
            >
              Growth-first. <span className="text-[#D4A853]">No BS.</span> Until you win.
            </h1>

            <div className="w-16 h-1 bg-[#D4A853] mb-6 animate-hero-fade-in" style={{ animationDelay: '200ms' }} />

            <p className="text-white/70 text-lg md:text-xl max-w-lg mb-8 animate-hero-fade-in" style={{ animationDelay: '250ms' }}>
              We&apos;re a small team helping designers grow into senior and leadership roles. We&apos;ve trained and mentored
              3,000+ of them. If that sounds like your kind of place, let&apos;s talk.
            </p>

            <a
              href="#open-roles"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D4A853] hover:bg-[#D4A853]/90 text-white font-heading font-bold text-base transition-all duration-300 hover:gap-4 group animate-hero-fade-in"
              style={{ borderRadius: '12px', animationDelay: '300ms' }}
            >
              {openCount === 1 ? 'See the open role' : `See ${openCount} open roles`}
              <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-6-6m6 6l6-6" />
              </svg>
            </a>
          </div>

          <div className="relative animate-hero-slide-in" style={{ animationDelay: '200ms' }}>
            <div
              className="absolute -inset-3 border-2 border-[#D4A853]/20 pointer-events-none"
              style={{ borderRadius: '24px', transform: 'rotate(2deg)' }}
            />
            <div className="relative aspect-[4/3] overflow-hidden bg-white/5" style={{ borderRadius: '20px' }}>
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80"
                alt="The team working together around a table"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/40 via-transparent to-transparent" />
            </div>
            <div
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white/95 backdrop-blur-sm px-5 py-4 shadow-xl"
              style={{ borderRadius: '14px' }}
            >
              <p className="text-xs text-g400 uppercase tracking-wider mb-1">We&apos;re looking for</p>
              <div className="flex flex-wrap gap-2">
                {['Sales', 'Designers', 'Engineers', 'Strategists'].map((role) => (
                  <span key={role} className="px-2.5 py-1 bg-carbon text-white text-xs font-medium" style={{ borderRadius: '6px' }}>
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
