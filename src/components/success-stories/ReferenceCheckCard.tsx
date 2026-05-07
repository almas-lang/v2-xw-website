'use client';

import { useEffect, useState } from 'react';

interface ReferenceCheckCardProps {
  part1: string;
  part2: string;
}

export default function ReferenceCheckCard({ part1, part2 }: ReferenceCheckCardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const images = [part1, part2];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
    };
    if (activeIndex !== null) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = 'unset';
    };
  }, [activeIndex, images.length]);

  return (
    <>
      <div className="max-w-5xl mx-auto mb-10 sm:mb-14">
        <div className="relative rounded-2xl sm:rounded-3xl border border-indigo-500/20 bg-white shadow-lg overflow-hidden">
          {/* Accent ribbon */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 sm:px-6 py-3 sm:py-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-heading text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">
                Reference check in the wild
              </span>
            </span>
            <span className="font-body text-xs sm:text-sm text-white/90">
              A prospective mentee messaged our alumnus directly on LinkedIn &mdash; here&apos;s how it went.
            </span>
          </div>

          {/* Context */}
          <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-2">
            <p className="font-body text-sm sm:text-base text-g600 leading-relaxed max-w-3xl">
              Gopicca found Jonah&apos;s profile through our mentorship page and cold-messaged him
              to ask if the program was worth it. This is his unfiltered reply, not a
              testimonial we asked for.
            </p>
          </div>

          {/* Screenshots pair */}
          <div className="relative px-5 sm:px-8 pb-6 sm:pb-8 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[part1, part2].map((src, i) => (
                <div key={src} className="relative">
                  <div className="absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full bg-indigo-600 text-white font-heading text-xs font-bold flex items-center justify-center shadow-md">
                    {i + 1}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-g200 bg-g100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-indigo-400/50"
                    aria-label={`Open screenshot ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`Reference check conversation, part ${i + 1}`}
                      loading="lazy"
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Connector line between the two screenshots (desktop only) */}
            <div
              className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            >
              <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          {/* Pull quote */}
          <div className="border-t border-g200 px-5 sm:px-8 py-5 sm:py-6 bg-g100/50">
            <p className="font-heading text-base sm:text-lg italic text-carbon leading-snug">
              &ldquo;I&rsquo;m telling you &mdash; this can truly shift your career. My career
              changed after I joined his course. I jumped from Senior to Lead position. I
              would say it&rsquo;s worth the investment.&rdquo;
            </p>
            <p className="font-body text-xs sm:text-sm text-g500 mt-2">
              &mdash; Jonah Immanuel, Sr. Lead Designer at Wongdoody
            </p>
          </div>

          {/* Outcome footer */}
          <div className="border-t border-indigo-500/20 px-5 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-indigo-50 via-white to-indigo-50/50">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-indigo-500 ring-offset-2 ring-offset-white">
                  <img
                    src="/images/Gopicca B R.jpeg"
                    alt="Gopicca B R"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-600 text-white font-body text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    How it ended
                  </span>
                </div>
                <p className="font-heading text-sm sm:text-base font-bold text-carbon leading-snug">
                  Gopicca joined the program.
                </p>
                <p className="font-body text-xs sm:text-sm text-g600 leading-snug mt-0.5">
                  She&apos;s now a mentee writing her own success story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveIndex(null)}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-white/10 text-white font-body text-xs">
            Part {activeIndex + 1} of {images.length}
          </div>
          <img
            src={images[activeIndex]}
            alt={`Reference check conversation, part ${activeIndex + 1}`}
            className="relative max-w-full max-h-[90vh] w-auto h-auto rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
