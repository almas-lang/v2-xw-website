'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Guest {
  name: string;
  role: string;
  company: string;
  image: string;
  episodeUrl: string;
  comingSoon?: boolean;
}

const guests: Guest[] = [
  {
    name: 'Abhimanyu Sirothia',
    role: 'Design Director',
    company: 'Designit',
    image: '/images/podcast-abhimanyu.jpeg',
    episodeUrl: 'https://www.youtube.com/watch?v=aDJZzBwrNSo',
  },
  {
    name: 'Rohan Baruah',
    role: 'Principal Design Manager',
    company: 'Microsoft',
    image: '/images/podcast-rohan.jpeg',
    episodeUrl: 'https://www.youtube.com/watch?v=-jhGKH1NgZA',
  },
  {
    name: 'Kumar Rohit Chandra',
    role: 'UX Designer',
    company: 'Google',
    image: '/images/podcast-rohit.jpg',
    episodeUrl: 'https://www.youtube.com/watch?v=jJhD5saurGA',
  },
  {
    name: 'Vivek Raju',
    role: 'Narrative Consultant',
    company: 'Kathasys',
    image: '/images/podcast-vivek.jpeg',
    episodeUrl: 'https://open.spotify.com/episode/1dxvjcpOqk6uoZ6JDwjv4t',
  },
  {
    name: 'Radhakrishna Aekbote',
    role: 'Principal Designer',
    company: 'Informatica',
    image: '/images/Radhakrishna Aekbote.jpeg',
    episodeUrl: '',
    comingSoon: true,
  },
  {
    name: 'Amit Tiwari',
    role: 'Product Manager & 2X founder',
    company: 'Palaash',
    image: '/images/podcast-amit.jpg',
    episodeUrl: '',
    comingSoon: true,
  },
];

function GuestCard({ guest }: { guest: Guest }) {
  return (
    <div className="group bg-white rounded-xl md:rounded-2xl border border-g200 hover:border-yellow-400/50 hover:shadow-lg transition-all duration-300 overflow-hidden p-5 md:p-6">
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-g100">
        <Image
          src={guest.image}
          alt={guest.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        {/* Yellow overlay on hover */}
        <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/10 transition-colors duration-300" />
      </div>

      {/* Info */}
      <h3 className="font-heading text-lg md:text-xl font-bold text-carbon mb-1 leading-snug">
        {guest.name}
      </h3>
      <p className="text-g500 text-sm mb-4">
        {guest.role} at {guest.company}
      </p>

      {/* Link */}
      {guest.comingSoon ? (
        <span className="inline-flex items-center gap-1.5 text-g400 font-medium text-sm">
          Coming Soon
        </span>
      ) : (
        <a
          href={guest.episodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-yellow-600 hover:text-yellow-700 font-medium text-sm transition-colors group/link"
        >
          Listen to Episode
          <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
    </div>
  );
}

export default function LeadersWhoJoined() {
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
          Leaders Who&apos;ve Joined Us
        </h2>

        {/* Guests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {guests.map((guest, index) => (
            <GuestCard key={index} guest={guest} />
          ))}
        </div>
      </div>
    </section>
  );
}
