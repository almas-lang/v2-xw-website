import Image from 'next/image';
import Link from 'next/link';

export default function BeyondMentorship() {
  return (
    <section className="bg-g100 py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon text-center mb-10 md:mb-14">
          Beyond Mentorship
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Vivid Yellow Podcast Card */}
          <Link
            href="/resources/podcast"
            className="group flex flex-col md:flex-row bg-white border border-g200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-g300"
            style={{ borderRadius: '6px' }}
          >
            {/* Media Section */}
            <div className="relative w-full md:w-48 lg:w-56 h-44 md:h-auto flex-shrink-0 bg-gradient-to-br from-carbon via-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center">
              {/* Podcast artwork background */}
              <div className="absolute inset-0 opacity-30">
                <Image
                  src="/images/vivid-yellow-podcast.jpeg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              {/* Play Button */}
              <div className="relative z-10 w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white ml-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {/* Amber glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
              <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider mb-2">
                Podcast
              </span>
              <h3 className="font-heading text-lg md:text-xl font-bold text-carbon mb-2 leading-tight">
                Vivid Yellow Podcast
              </h3>
              <p className="font-body text-sm md:text-base text-g600 mb-3 leading-relaxed">
                Raw conversations with extraordinary people about work, life, and the uncomfortable truths that shape both.
              </p>
              <p className="font-heading text-sm font-semibold text-carbon mb-4">
                No scripts. No fluff. Just real talk.
              </p>
              <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-accent group-hover:text-carbon transition-colors">
                Listen Now
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>

          {/* WaveMakers Connect Card */}
          <Link
            href="/community"
            className="group flex flex-col md:flex-row bg-white border border-g200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-g300"
            style={{ borderRadius: '6px' }}
          >
            {/* Media Section */}
            <div className="relative w-full md:w-48 lg:w-56 h-44 md:h-auto flex-shrink-0 bg-gradient-to-br from-alice via-alice-mid to-alice-dark flex items-center justify-center">
              {/* Community Icon */}
              <div className="relative z-10">
                <svg
                  className="w-20 h-20 text-accent/80 group-hover:scale-110 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent/30" />
              <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-accent/20" />
              <div className="absolute top-1/2 right-8 w-1.5 h-1.5 rounded-full bg-carbon/20" />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
              <span className="text-[11px] font-semibold text-alice-border uppercase tracking-wider mb-2">
                Community
              </span>
              <h3 className="font-heading text-lg md:text-xl font-bold text-carbon mb-2 leading-tight">
                WaveMakers Connect
              </h3>
              <p className="font-body text-sm md:text-base text-g600 mb-3 leading-relaxed">
                Quarterly offline events for 1000+ designers, engineers, entrepreneurs.
              </p>
              <p className="font-heading text-sm font-semibold text-carbon mb-4">
                No hype. Just real connections.
              </p>
              <span className="inline-flex items-center gap-2 font-heading font-semibold text-sm text-accent group-hover:text-carbon transition-colors">
                Join Next Event
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
