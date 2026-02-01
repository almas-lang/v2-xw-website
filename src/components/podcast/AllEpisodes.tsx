'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Episode {
  id: string;
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

const episodes: Episode[] = [
  {
    id: '1',
    title: 'Sell Design, But Deliver Outcomes',
    guest: 'Abhimanyu Sirothia',
    role: 'Design Director',
    company: 'Designit',
    description: 'Exploring how fascinating a journey from an engineer in business intelligence to leader in UX Design',
    duration: '1:57:38',
    image: '/images/podcast-abhimanyu.jpeg',
    spotifyUrl: 'https://open.spotify.com/show/5ULMerqiVi3L2HLHMeynoL',
    youtubeUrl: 'https://www.youtube.com/watch?v=aDJZzBwrNSo',
  },
  {
    id: '2',
    title: 'How Design Decisions Get Made In Maang',
    guest: 'Rohan Baruah',
    role: 'Principal Design Manager',
    company: 'Microsoft',
    description: 'Intricacies of design within large organisations, focusing on how design processes are managed',
    duration: '1:47:47',
    image: '/images/podcast-rohan.jpeg',
    spotifyUrl: 'https://open.spotify.com/episode/3XcFRQCdlsiqkc7jdmL4SV?si=qLNdZFn1SDuZ5B-om7oJgw',
    youtubeUrl: 'https://www.youtube.com/watch?v=-jhGKH1NgZA',
  },
  {
    id: '3',
    title: 'From Electrical Engineer to Google TV Designer',
    guest: 'Kumar Rohit Chandra',
    role: 'UX Designer',
    company: 'Google',
    description: 'Unconventional journey from electrical engineering to designing for Google TV',
    duration: '1:47:58',
    image: '/images/podcast-rohit.jpg',
    spotifyUrl: 'https://open.spotify.com/episode/3tNuA9bnydzQTKhQZfaPtL?si=JUH46YVDQ4WBKGLoEZNGyQ',
    youtubeUrl: 'https://www.youtube.com/watch?v=jJhD5saurGA',
  },
  {
    id: '4',
    title: 'Narratives that win. Storytelling as a Designer.',
    guest: 'Vivek Raju',
    role: 'Narrative Consultant',
    company: 'Kathasys',
    description: 'How storytelling shapes design outcomes, business decisions, and your credibility as a designer.',
    duration: '1:26:11',
    image: '/images/podcast-vivek.jpeg',
    spotifyUrl: 'https://open.spotify.com/show/5ULMerqiVi3L2HLHMeynoL',
  },
];

function EpisodeCard({ episode, index }: { episode: Episode; index: number }) {
  return (
    <div
      className="group bg-white rounded-xl md:rounded-2xl border border-g200 hover:border-yellow-400/50 hover:shadow-xl hover:shadow-yellow-400/5 transition-all duration-300 overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-40 md:w-48 aspect-video sm:aspect-square flex-shrink-0">
          <Image
            src={episode.image || ''}
            alt={episode.guest}
            fill
            className="object-cover"
          />

          {/* Play overlay */}
          <a
            href={episode.youtubeUrl || episode.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center transform hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </a>

          {/* Duration */}
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs font-mono text-white">
            {episode.duration}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-5 flex flex-col">
          {/* Title */}
          <h3 className="font-heading text-lg md:text-xl font-bold text-carbon mb-1 leading-snug group-hover:text-yellow-600 transition-colors">
            {episode.title}
          </h3>

          {/* Guest */}
          <p className="text-g500 text-sm mb-3">
            With {episode.guest}
          </p>

          {/* Guest Info */}
          <div className="flex items-center gap-3 mb-3 p-2.5 bg-g50 rounded-lg">
            <div className="w-8 h-8 rounded-md bg-yellow-400/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-carbon text-sm font-medium truncate">{episode.role}</p>
              <p className="text-g400 text-xs truncate">at {episode.company}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-g500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
            {episode.description}
          </p>

          {/* CTA */}
          <a
            href={episode.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:-translate-y-0.5 w-fit"
          >
            Listen
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AllEpisodes() {
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
      className="relative bg-[#f5f5f5] py-20 md:py-28 overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon text-center mb-12 md:mb-16">
          All Episodes
        </h2>

        {/* Episodes Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {episodes.map((episode, index) => (
            <EpisodeCard key={episode.id} episode={episode} index={index} />
          ))}
        </div>

        {/* See All Link */}
        <div className="text-center">
          <Link
            href="https://www.youtube.com/@thevividyellow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-heading text-base font-semibold text-yellow-600 hover:text-yellow-700 underline underline-offset-4 transition-colors"
          >
            See all Episodes
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
