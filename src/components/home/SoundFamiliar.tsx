'use client';

import { useState } from 'react';

const painPoints = [
  "I've applied to 50+ jobs but barely get callbacks",
  "I did courses but still can't crack senior role interviews",
  "I'm stuck doing screens while others around me get promoted",
  "I don't know what's actually wrong with my portfolio",
];

const forYouPoints = [
  "Have 2+ years experience but keep getting stuck at the same level",
  "Tried courses, bootcamps, or certifications that didn't work",
  "Want senior roles at product companies, not just any job",
  "Are ready to put in the work with the right guidance",
];

export default function SoundFamiliar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-g50 py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Sound Familiar Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-carbon mb-8 md:mb-12">
            Sound Familiar?
          </h2>

          {/* Pain Points */}
          <ul className="space-y-3 md:space-y-4 max-w-2xl mx-auto mb-8 text-left md:text-center">
            {painPoints.map((point, index) => (
              <li
                key={index}
                className="font-heading text-base md:text-lg lg:text-xl text-g600 transition-all duration-300 cursor-default hover:text-carbon hover:scale-[1.02]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span className={`inline-block transition-colors duration-300 text-accent ${hoveredIndex !== index ? 'md:text-g400' : ''}`}>
                  •
                </span>{' '}
                &ldquo;{point}&rdquo;
              </li>
            ))}
          </ul>

          <p className="font-heading text-lg md:text-xl font-semibold text-carbon text-left md:text-center">
            If any of these hit home, you&apos;re in the right place
          </p>
        </div>

        {/* For You Card */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Dark Card */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0a0a0a] rounded-t-2xl p-8 md:p-12 overflow-hidden shadow-xl">
            {/* Content */}
            <div className="relative z-10">
              <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-white text-center mb-8 md:mb-10">
                This <span className="text-accent">mentorship</span> is for UX/UI/Product designers who
              </h3>

              <ul className="space-y-4 md:space-y-5 max-w-2xl mx-auto">
                {forYouPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 group"
                  >
                    {/* Animated checkmark */}
                    <span className="flex-shrink-0 mt-0.5">
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-green-500 transition-colors duration-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M5 12l5 5L20 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover:stroke-dashoffset-0"
                        />
                      </svg>
                    </span>
                    <span className="font-body text-sm md:text-base text-g300 group-hover:text-white transition-colors duration-300">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom disclaimer bar */}
          <div className="relative">
            <div className="bg-alice rounded-b-2xl py-4 px-6 text-center">
              <p className="font-heading text-sm md:text-base font-semibold text-carbon">
                Not for designers looking for quick certificates or magic shortcuts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
