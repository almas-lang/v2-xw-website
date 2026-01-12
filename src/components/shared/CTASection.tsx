import Button from '@/components/ui/Button';

const defaultBenefits = [
  "Free 45 mins-call",
  "We assess your gaps",
  "No obligations",
  "Walk away with clarity",
];

interface CTASectionProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  benefits?: string[];
}

export default function CTASection({
  title = (
    <>
      Your Senior/Lead Role Is Waiting.
      <br />
      Are You Ready?
    </>
  ),
  subtitle = "Book a free strategy call and get clarity on what's blocking you - whether you join us or not",
  buttonText = "Book strategy call",
  buttonHref = "/book-call",
  benefits = defaultBenefits,
}: CTASectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Dark gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg,
              #0a0a0a 0%,
              #1a1a1a 25%,
              #0f0f0f 50%,
              #1a1a1a 75%,
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
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {title}
        </h2>

        {/* Subtext */}
        <p className="font-body text-base md:text-lg text-g400 mb-8 max-w-[600px] mx-auto">
          {subtitle}
        </p>

        {/* CTA Button */}
        <Button href={buttonHref} showArrow>
          {buttonText}
        </Button>

        {/* Benefits */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-x-2 gap-y-2">
          {benefits.map((benefit, index) => (
            <span key={index} className="flex items-center">
              <span className="font-body text-sm md:text-base text-g400">
                {benefit}
              </span>
              {index < benefits.length - 1 && (
                <span className="text-g600 mx-3">|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
