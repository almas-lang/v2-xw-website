'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Episode {
  title: string;
  guest: string;
  role: string;
  company: string;
  description: string;
  duration: string;
  image?: string;
  spotifyUrl: string;
  youtubeUrl?: string;
}

const latestEpisode: Episode = {
  title: 'Narratives that win. Storytelling as a Designer.',
  guest: 'Vivek Raju',
  role: 'Narrative Consultant',
  company: 'Kathasys',
  description: 'How storytelling shapes design outcomes, business decisions, and your credibility as a designer.',
  duration: '1:26:11',
  image: '/videos/podcast-latest.gif',
  spotifyUrl: 'https://open.spotify.com/episode/1dxvjcpOqk6uoZ6JDwjv4t?si=cSoBDPgWRHmM1jaC7f8Rtw',
  youtubeUrl: 'https://www.youtube.com/watch?v=pe_7USbdAmQ&list=PL3EVtiTwkoBcYYlgESWKdDnR6SlUizk2N',
};

export default function LatestEpisode() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-20 md:py-28 overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon text-center mb-12 md:mb-16">
          Latest Episode
        </h2>

        {/* Featured Episode Card */}
        <div className="relative bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-2xl md:rounded-3xl overflow-hidden border border-yellow-400/20 hover:border-yellow-400/40 transition-colors duration-300 group">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left - Image/Video */}
            <div className="relative aspect-video md:aspect-auto md:min-h-[400px]">
              <Image
                src={latestEpisode.image || ''}
                alt={latestEpisode.title}
                fill
                className="object-cover"
              />

              {/* Play button overlay */}
              <a
                href={latestEpisode.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-yellow-400 flex items-center justify-center shadow-2xl shadow-yellow-400/30 transform hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </a>

              {/* Duration badge */}
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg">
                <span className="text-white text-sm font-mono font-medium">{latestEpisode.duration}</span>
              </div>
            </div>

            {/* Right - Content */}
            <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
              {/* Yellow accent line */}
              <div className="w-12 h-1 bg-yellow-400 mb-6 rounded-full" />

              {/* Title */}
              <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                {latestEpisode.title}
              </h3>

              {/* Guest */}
              <p className="text-yellow-400 font-medium text-base mb-4">
                With {latestEpisode.guest}
              </p>

              {/* Guest Info Card */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src="/images/podcast-vivek.jpeg"
                    alt={latestEpisode.guest}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{latestEpisode.role}</p>
                  <p className="text-gray-400 text-sm">at {latestEpisode.company}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                {latestEpisode.description}
              </p>

              {/* CTA */}
              <a
                href={latestEpisode.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-yellow-400/25 hover:-translate-y-0.5 w-fit"
              >
                Listen now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
