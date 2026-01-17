import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left - Dark side */}
        <div className="w-full lg:w-1/2 bg-carbon relative flex items-center justify-center p-8 lg:p-16 min-h-[70vh] lg:min-h-screen">
          {/* Large watermark number */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[180px] md:text-[250px] lg:text-[300px] font-bold text-white/[0.03] pointer-events-none select-none">
            13
          </span>

          <div className="relative z-10 max-w-[500px]">
            {/* H1 for SEO - styled subtle but semantically H1 */}
            <h1 className="text-alice/60 text-sm font-medium tracking-widest uppercase mb-6">
              About Xperience Wave
            </h1>

            <p className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 md:mb-8">
              13+ Years Building Products for{' '}
              <span className="text-accent">Millions.</span>
            </p>

            <p className="font-body text-base md:text-lg text-g400 leading-relaxed mb-6 md:mb-8">
              We've delivered banking systems, enterprise software, SaaS products,
              consumer apps, and wealth management ecosystems.
            </p>

            {/* Floating stat pills */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              <span className="px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xs md:text-sm font-medium" style={{ borderRadius: '100px' }}>
                1Cr+ users impacted
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xs md:text-sm font-medium" style={{ borderRadius: '100px' }}>
                20+ products shipped <span className="text-g400">(Million+ downloads, 4+ ratings)</span>
              </span>
              <span className="px-3 md:px-4 py-1.5 md:py-2 bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent text-xs md:text-sm font-medium" style={{ borderRadius: '100px' }}>
                3000+ designers consulted
              </span>
            </div>
          </div>
        </div>

        {/* Right - Light side with image */}
        <div className="w-full lg:w-1/2 bg-white relative flex items-center justify-center p-8 lg:p-16 min-h-[60vh] lg:min-h-screen">
          {/* Hero Image */}
          <div className="w-full max-w-[500px] aspect-[3/4] relative overflow-hidden" style={{ borderRadius: '24px' }}>
            <Image
              src="/images/abouthero.png"
              alt="Xperience Wave founders - UX mentorship experts"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Overlapping text card */}
          <div
            className="absolute bottom-6 left-4 right-4 md:bottom-8 md:left-8 md:right-auto lg:bottom-16 lg:-left-16 bg-white shadow-2xl p-5 md:p-6 max-w-full md:max-w-[320px]"
            style={{ borderRadius: '12px' }}
          >
            <p className="font-heading text-lg md:text-xl font-bold text-carbon mb-2">
              Now building Careers Too.
            </p>
            <p className="text-sm text-g500">
              <strong>Designers</strong> - careers that matter
              <br />
              <strong>Businesses</strong> - products that scale
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
