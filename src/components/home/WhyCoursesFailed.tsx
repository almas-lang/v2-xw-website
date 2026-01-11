import Link from 'next/link';
import Image from 'next/image';

const painPoints = [
  {
    title: "Pre-Recorded, Not Personal",
    description:
      "You watch videos made for thousands of people. No one knows your name, your background, or what's holding you back.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="10" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="24" cy="22" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M22 20L27 22.5L22 25V20Z" fill="currentColor"/>
        <line x1="6" y1="38" x2="42" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="38" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: "No One Pushes You Forward",
    description:
      "Courses let you go at your own pace - which usually means you stop halfway. No accountability, no progress.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M24 14V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 24L30 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 32L14 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        <path d="M32 32L34 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        <circle cx="24" cy="24" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: "Certificates Don't Get You Hired",
    description:
      "Hiring managers don't care about course badges. They care about how you think, present, and solve real problems.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="6" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <line x1="14" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="14" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        <circle cx="24" cy="38" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M21 38L23 40L27 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
        <path d="M20 42L18 46M28 42L30 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 12L38 6M38 12L32 6" stroke="#FF0023" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "No One Reviews Your Work",
    description:
      "You submit assignments into the void. No one looks at your portfolio. No one tells you what's actually wrong or how to fix it.",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="32" height="32" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M16 18H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
        <path d="M16 24H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
        <path d="M16 30H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
        <circle cx="36" cy="36" r="8" fill="#1a1a1a" stroke="currentColor" strokeWidth="2"/>
        <path d="M33 36L35 38L39 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.2"/>
        <path d="M36 33V39M33 36H39" stroke="#FF0023" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
];

export default function WhyCoursesFailed() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon text-center mb-12 md:mb-16">
          Why Courses Didn&apos;t Work For You
        </h2>

        {/* Pain Point Cards - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0f0f0f] border border-white/5 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-black/20"
            >
              {/* Icon */}
              <div className="text-accent mb-4 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,0,35,0.4)]">
                {point.icon}
              </div>

              {/* Content */}
              <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-2">
                {point.title}
              </h3>
              <p className="font-body text-sm md:text-base text-g400 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Gradient Banner */}
        <div
          className="relative rounded-xl py-5 px-6 md:px-8 mb-8 overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, rgba(220,238,255,0.3) 0%, rgba(220,238,255,0.9) 50%, rgba(220,238,255,0.3) 100%)',
          }}
        >
          <p className="font-heading text-base md:text-lg font-semibold text-carbon text-center">
            That&apos;s why you finished courses but still aren&apos;t landing senior &amp; lead roles.
          </p>
        </div>

        {/* Blog Card */}
        <div
          className="bg-g50 border border-g200 overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-lg hover:border-g300"
          style={{ borderRadius: '6px' }}
        >
          {/* Image */}
          <div className="relative w-full md:w-[480px] lg:w-[520px] flex-shrink-0 overflow-hidden">
            <div className="aspect-[4/3] md:aspect-auto md:h-full relative">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
                alt="Person frustrated while studying online courses"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Divider line for desktop */}
          <div className="hidden md:block w-px bg-g200 flex-shrink-0" />

          {/* Content */}
          <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
            <h3 className="font-heading text-xl md:text-2xl lg:text-[26px] font-bold text-carbon mb-5 leading-snug">
              Deep Dive: Why UX Design Courses Don&apos;t Get You Senior Roles (And What Actually Works)
            </h3>
            <Link
              href="/blog/why-courses-dont-work"
              className="inline-flex items-center gap-2 font-heading font-semibold text-carbon hover:text-accent transition-colors group/link underline underline-offset-4 decoration-1 mb-4"
            >
              Read
              <svg
                className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <path fill="currentColor" d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
              </svg>
            </Link>
            <p className="font-body text-sm text-g500">4 mins read</p>
          </div>
        </div>
      </div>
    </section>
  );
}
