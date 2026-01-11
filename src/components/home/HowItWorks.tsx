import Link from 'next/link';

const steps = [
  {
    number: 1,
    title: "Book a Strategy call",
    description:
      "We assess where you are, where you want to go, what's blocking you, and if we will be able to help you",
  },
  {
    number: 2,
    title: "Get Your Curated Plan",
    description:
      "Based on your gaps and goals, we create a personalised learning path - not a generic curriculum",
  },
  {
    number: 3,
    title: "Achieve Your Goal",
    description:
      "Frequent 1:1 sessions, clinics, reviews, and support until you reach your career goal",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-16 md:py-24"
      style={{
        backgroundColor: '#F9F9F9',
        backgroundImage: `
          linear-gradient(180deg, rgba(220,238,255,0.5) 0%, rgba(220,238,255,0.1) 50%, rgba(220,238,255,0.4) 100%),
          radial-gradient(#D4D4D8 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 24px 24px',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon mb-3">
            How It Works
          </h2>
          <p className="font-body text-lg md:text-xl text-g600">
            From stuck to senior &amp; leaders in 3 steps
          </p>
        </div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden md:block relative">
          {/* Horizontal connecting line */}
          <div className="absolute top-6 left-0 right-0 h-[2px] bg-g200" />

          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.number} className="relative flex-1 text-center px-4">
                {/* Number Circle */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-white border-[3px] border-g300 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading text-sm font-bold text-g500">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-heading text-lg lg:text-xl font-semibold text-carbon mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm md:text-base text-g600 leading-relaxed max-w-[280px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="md:hidden relative pl-8">
          {/* Vertical connecting line */}
          <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-g200" />

          <div className="space-y-10">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                {/* Number Circle */}
                <div className="absolute -left-8 top-0 z-10 w-6 h-6 rounded-full bg-white border-[3px] border-g300 flex items-center justify-center">
                  <span className="font-heading text-[11px] font-bold text-g500">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-0">
                  <h3 className="font-heading text-base font-semibold text-carbon mb-1">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-g600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            href="#book-call"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-hover text-white font-heading font-semibold text-base md:text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            Book strategy call
          </Link>
        </div>
      </div>
    </section>
  );
}
