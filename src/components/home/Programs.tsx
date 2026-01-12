import Link from 'next/link';
import {
  RippleIllustration,
  CurrentWaveIllustration,
  TideIllustration,
} from '@/components/ui/ProgramCard';

const currentFeatures = [
  'From executing designs to driving decisions',
  'Land senior/lead roles at better companies or get promoted internally',
  'Portfolio + interview prep that actually works (support until you achieve your goal)',
];

export default function Programs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon">
            Our Programs
          </h2>
        </div>

        {/* CURRENT - Hero Card */}
        <div className="relative mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-carbon via-[#1a1a1a] to-[#2a2a2a] border border-g700">
          {/* Background wave pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 w-2/3 h-full">
              <CurrentWaveIllustration />
            </div>
          </div>

          <div className="relative z-10 p-6 md:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left: Illustration + Name */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-4 overflow-hidden">
                  <div className="w-full h-full p-4">
                    <CurrentWaveIllustration />
                  </div>
                </div>
                <span className="font-heading text-2xl md:text-3xl font-bold text-alice tracking-wide">
                  CURRENT
                </span>
              </div>

              {/* Right: Content */}
              <div className="flex-1">
                {/* Badge */}
                <span className="inline-block px-4 py-1.5 bg-g700 text-g300 text-xs font-semibold rounded-full mb-4">
                  Most Popular
                </span>

                {/* Description */}
                <p className="font-body text-base md:text-lg text-g300 mb-6 leading-relaxed max-w-2xl">
                  For mid-level designers with 2+ years experience who want senior and leadership roles at design mature companies
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {currentFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-alice mt-0.5">→</span>
                      <span className="font-body text-sm md:text-base text-g300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* AI Badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-g400 text-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    Includes AI-first design approach
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href="/programs/current"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-heading font-semibold text-base rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 gap-2"
                >
                  See Program Details
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RIPPLE & TIDE - Secondary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RIPPLE Card */}
          <Link
            href="/programs/ripple"
            className="group relative bg-g50 hover:bg-white rounded-2xl border border-g200 hover:border-alice-border p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 opacity-30 group-hover:opacity-50 transition-opacity">
              <RippleIllustration />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-6">
              {/* Illustration */}
              <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0 border border-g100 group-hover:shadow-lg transition-shadow">
                <div className="w-20 h-20">
                  <RippleIllustration />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className="font-heading text-lg font-bold text-alice-border tracking-wider mb-1 block">
                  RIPPLE
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mb-3">
                  Start your UX/UI Career
                </h3>
                <p className="font-body text-sm md:text-base text-g600 mb-4 leading-relaxed">
                  For fresh graduates or career switchers from any background
                </p>
                <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-accent group-hover:text-carbon transition-colors">
                  Learn More
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          {/* TIDE Card */}
          <Link
            href="/programs/tide"
            className="group relative bg-g50 hover:bg-white rounded-2xl border border-g200 hover:border-alice-border p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 opacity-30 group-hover:opacity-50 transition-opacity">
              <TideIllustration />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-6">
              {/* Illustration */}
              <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0 border border-g100 group-hover:shadow-lg transition-shadow">
                <div className="w-20 h-20">
                  <TideIllustration />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className="font-heading text-lg font-bold text-alice-border tracking-wider mb-1 block">
                  TIDE
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-carbon mb-3">
                  Move into Design Leadership
                </h3>
                <p className="font-body text-sm md:text-base text-g600 mb-4 leading-relaxed">
                  For the ones ready to lead/manage teams and drive influence
                </p>
                <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-accent group-hover:text-carbon transition-colors">
                  Learn More
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
