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

            <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6 md:mb-8">
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
          {/* Image placeholder */}
          <div className="w-full max-w-[500px] aspect-[3/4] bg-g100 relative overflow-hidden" style={{ borderRadius: '24px' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-g300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
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
