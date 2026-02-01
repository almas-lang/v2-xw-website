'use client';

import { useEffect, useRef, useState } from 'react';

const platforms = [
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/show/vividyellow',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: 'Apple Podcasts',
    url: 'https://podcasts.apple.com/vividyellow',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59-.312 1.16-.912 1.16h-.12c-.478 0-.864-.312-.96-.768-.36-1.512-.96-2.676-1.944-3.672-1.32-1.368-3.096-2.088-5.04-2.088-1.848 0-3.576.672-4.872 1.896-1.32 1.248-2.112 2.952-2.232 4.776-.024.336-.024.672 0 .984.096 1.68.744 3.24 1.824 4.44a7.3 7.3 0 002.064 1.656c.528.288.768.936.48 1.464-.288.528-.936.768-1.464.48a8.955 8.955 0 01-2.592-2.064c-1.392-1.56-2.184-3.552-2.28-5.664a8.034 8.034 0 010-1.2c.144-2.28 1.128-4.368 2.784-5.928C6.05 3.374 8.47 2.568 11.09 2.568h.775zm-.07 4.68c1.32 0 2.568.504 3.504 1.416a5.122 5.122 0 011.512 3.36c.048.48-.072.936-.312 1.344a1.958 1.958 0 01-1.032.84c-.456.144-.936.072-1.344-.168a1.946 1.946 0 01-.792-1.104c-.072-.288-.072-.6 0-.888.12-.504.12-1.032-.024-1.536a2.76 2.76 0 00-1.104-1.584 2.803 2.803 0 00-1.68-.528c-.6.024-1.152.216-1.608.552-.456.36-.792.864-.96 1.416a2.843 2.843 0 00.024 1.8c.144.36.096.768-.12 1.104a1.33 1.33 0 01-.912.552 1.32 1.32 0 01-1.008-.264 1.322 1.322 0 01-.48-.936 5.25 5.25 0 01.432-2.736 5.4 5.4 0 011.728-2.136 5.078 5.078 0 013.312-1.176l.864.072zm.238 5.64a1.895 1.895 0 011.776 1.272c.12.336.12.72.024 1.056l-1.536 5.472a.71.71 0 01-.336.408.71.71 0 01-.528.072.676.676 0 01-.408-.336.718.718 0 01-.072-.504l1.536-5.472c.048-.144.024-.288-.048-.408a.5.5 0 00-.36-.216.494.494 0 00-.408.096.484.484 0 00-.192.384l-.96 5.472a.711.711 0 01-.816.576.704.704 0 01-.576-.816l.96-5.472a1.895 1.895 0 011.944-1.584z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@xperiencewave',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Google Podcasts',
    url: 'https://podcasts.google.com/vividyellow',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0a1.44 1.44 0 00-1.44 1.44v1.92a1.44 1.44 0 102.88 0V1.44A1.44 1.44 0 0012 0zm0 6.72a1.44 1.44 0 00-1.44 1.44v7.68a1.44 1.44 0 102.88 0V8.16A1.44 1.44 0 0012 6.72zm-5.76.96a1.44 1.44 0 00-1.44 1.44v5.76a1.44 1.44 0 102.88 0V9.12a1.44 1.44 0 00-1.44-1.44zm11.52 0a1.44 1.44 0 00-1.44 1.44v5.76a1.44 1.44 0 102.88 0V9.12a1.44 1.44 0 00-1.44-1.44zM1.44 10.56A1.44 1.44 0 000 12v.96a1.44 1.44 0 102.88 0V12a1.44 1.44 0 00-1.44-1.44zm21.12 0A1.44 1.44 0 0021.12 12v.96a1.44 1.44 0 102.88 0V12a1.44 1.44 0 00-1.44-1.44zM12 18.24a1.44 1.44 0 00-1.44 1.44v2.88a1.44 1.44 0 102.88 0v-2.88A1.44 1.44 0 0012 18.24z"/>
      </svg>
    ),
  },
];

export default function NeverMissEpisode() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-yellow-400/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto px-5 text-center">
        {/* Header */}
        <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
          Never Miss an Episode
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          New episodes drop bi-weekly
        </p>

        {/* Platform Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/20 hover:border-yellow-400/50 hover:bg-yellow-400/10 rounded-lg text-white font-medium transition-all duration-200"
            >
              {platform.icon}
              {platform.name}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Email Subscribe */}
        <p className="text-white text-base md:text-lg font-medium mb-4">
          Or get episodes straight to your inbox
        </p>

        {isSubmitted ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            You&apos;re subscribed! Check your inbox.
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full sm:w-72 px-4 py-3 bg-white/5 border border-white/20 focus:border-yellow-400/50 rounded-lg text-white placeholder-gray-500 outline-none transition-colors"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-yellow-400 hover:bg-yellow-300 disabled:bg-yellow-400/50 text-black font-heading font-semibold rounded-lg transition-colors"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {error && (
              <p className="mt-3 text-red-400 text-sm">{error}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
