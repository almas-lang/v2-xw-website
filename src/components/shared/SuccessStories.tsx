'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ============================================
// DATA - SEO OPTIMIZED CONTENT
// ============================================

const featuredStories = [
  {
    name: 'Pavitra Suji',
    role: 'Sr. Designer',
    company: 'McKinsey & Company',
    image: '/images/testimonials/pavitra-suji.jpg',
    video: '/videos/pavi.MP4',
  },
  {
    name: 'Ashley Alemao',
    role: 'UX Designer',
    company: 'Millipixels',
    image: '/images/testimonials/ashley-alemao.jpg',
    video: '/videos/Ashley.mp4',
  },
  {
    name: 'Vignesh',
    role: 'Sr. UX Designer',
    company: 'Siemens',
    image: '/images/testimonials/vignesh.jpg',
    youtubeId: 'H4R-ZVvCxvQ',
  },
];

// Default Quick Wins data (used on main pages)
const defaultQuickWins = [
  {
    achievement: 'Lead Product designer at a German startup',
    duration: 'In 3 months',
    name: 'Kritika Singh',
    image: '/images/Kritika Singh.jpeg',
    linkedin: 'https://www.linkedin.com/in/kritikasinghchauhan/',
  },
  {
    achievement: 'Lead Designer to Principal Designer at Informatica',
    duration: 'In 4 months',
    name: 'Radhakrishna A',
    image: '/images/Radhakrishna Aekbote.jpeg',
    linkedin: 'https://www.linkedin.com/in/radhakrishnaaekbote/',
  },
  {
    achievement: 'Sr. Designer to Design Lead at CX100',
    duration: 'In 2 months',
    name: 'Sheetal P',
    image: '/images/sheetal.png',
    linkedin: 'https://www.linkedin.com/in/sheetalpimparwar/',
  },
  {
    achievement: 'Sr. Lead Designer at Wongdoody',
    duration: 'In 2 months',
    name: 'Jonah Immanuel',
    image: '/images/Jonah_Immanuel.png',
    linkedin: 'https://www.linkedin.com/in/jonahimmanuel/',
  },
];

// Quick Wins type export for use in other components
export interface QuickWin {
  achievement: string;
  duration: string;
  name: string;
  image: string;
  linkedin: string;
}

// ============================================
// COMPONENTS
// ============================================

const PlayIcon = ({ size = 48 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="23" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="2" />
    <path
      d="M20 16L32 24L20 32V16Z"
      fill="white"
    />
  </svg>
);

const LinkedInIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const CloseIcon = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// Video Modal Component
const VideoModal = ({
  isOpen,
  onClose,
  videoSrc,
  youtubeId,
  name,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  youtubeId?: string;
  name: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current && videoSrc) {
      videoRef.current.play();
    }
  }, [isOpen, videoSrc]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isYouTubeShort = youtubeId !== undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className={`relative rounded-2xl overflow-hidden bg-black shadow-2xl ${
          isYouTubeShort ? 'w-full max-w-[400px] aspect-[9/16]' : 'w-full max-w-4xl max-h-[90vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close video"
        >
          <CloseIcon className="w-5 h-5 text-white" />
        </button>

        {/* YouTube Embed */}
        {youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Testimonial video from ${name}`}
          />
        ) : videoSrc ? (
          /* Local Video */
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            autoPlay
            className="w-full h-full max-h-[90vh] object-contain"
            aria-label={`Testimonial video from ${name}`}
          >
            Your browser does not support the video tag.
          </video>
        ) : null}
      </div>
    </div>
  );
};

const Avatar = ({
  name,
  image,
  size = 'large'
}: {
  name: string;
  image?: string;
  size?: 'large' | 'medium' | 'small'
}) => {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    large: 'w-full h-full',
    medium: 'w-12 h-12 sm:w-14 sm:h-14',
    small: 'w-8 h-8 sm:w-10 sm:h-10',
  };

  const textSizes = {
    large: 'text-5xl sm:text-6xl',
    medium: 'text-lg sm:text-xl',
    small: 'text-xs sm:text-sm',
  };

  if (size === 'large') {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-g700 to-carbon overflow-hidden">
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className={`font-heading ${textSizes[size]} font-bold text-g500`}>{initials}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-g200 to-g300 flex items-center justify-center flex-shrink-0 overflow-hidden ring-2 ring-g200`}>
      {image && !imgError ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={`font-heading ${textSizes[size]} font-semibold text-g500`}>{initials}</span>
      )}
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

interface SuccessStoriesProps {
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaHref?: string;
  quickWins?: QuickWin[];
  accentColor?: 'teal' | 'gold' | 'coral' | 'default';
}

// Theme color mapping
const themeColors = {
  default: {
    accent: '#FF0023',
    accentBg: 'rgba(255, 0, 35, 0.1)',
    accentBorder: 'rgba(255, 0, 35, 0.2)',
    ctaText: '#1e3a5f', // Dark blue like in screenshot
  },
  teal: {
    accent: '#4A90A4',
    accentBg: 'rgba(74, 144, 164, 0.1)',
    accentBorder: 'rgba(74, 144, 164, 0.2)',
    ctaText: '#4A90A4',
  },
  gold: {
    accent: '#D4A853',
    accentBg: 'rgba(212, 168, 83, 0.1)',
    accentBorder: 'rgba(212, 168, 83, 0.2)',
    ctaText: '#B8943F',
  },
  coral: {
    accent: '#E85A4F',
    accentBg: 'rgba(232, 90, 79, 0.1)',
    accentBorder: 'rgba(232, 90, 79, 0.2)',
    ctaText: '#E85A4F',
  },
};

export default function SuccessStories({
  title = 'Real Transformation, Real People',
  subtitle = 'Hear from designers who made the shift',
  showCTA = true,
  ctaText = 'See all success stories',
  ctaHref = '/success-stories',
  quickWins = defaultQuickWins,
  accentColor = 'default',
}: SuccessStoriesProps) {
  const theme = themeColors[accentColor];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ src?: string; youtubeId?: string; name: string } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleVideoClick = (story: typeof featuredStories[0]) => {
    if (story.video || story.youtubeId) {
      setActiveVideo({
        src: story.video,
        youtubeId: story.youtubeId,
        name: story.name
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e5e5 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Accent glow - subtle */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(220,238,255,0.4) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 px-5 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div
            className="text-center mb-10 sm:mb-12 md:mb-16"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px]" style={{ backgroundColor: theme.accent }} />
              <span className="font-body text-xs uppercase tracking-[0.2em] font-medium" style={{ color: theme.accent }}>Success Stories</span>
              <div className="w-8 h-[2px]" style={{ backgroundColor: theme.accent }} />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-carbon leading-tight mb-3">
              {title}
            </h2>
            <p className="font-body text-sm md:text-base text-g500 max-w-xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Quick Wins Section - Now on top */}
          <div
            className="mb-8 sm:mb-10 md:mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            }}
          >
            {/* Quick win cards - 4 columns on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {quickWins.map((win, index) => (
                <a
                  key={win.name}
                  href={win.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + index * 0.08}s`,
                  }}
                >
                  <div className="relative p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-g200 sm:hover:border-[#0A66C2]/40 bg-white shadow-sm sm:hover:shadow-lg transition-all duration-300 h-full">
                    {/* Duration badge */}
                    <div className="mb-4">
                      <span
                        className="inline-block px-3 py-1.5 text-xs font-bold rounded-full"
                        style={{
                          color: theme.accent,
                          backgroundColor: theme.accentBg,
                          border: `1px solid ${theme.accentBorder}`
                        }}
                      >
                        {win.duration}
                      </span>
                    </div>

                    {/* Achievement */}
                    <h4 className="font-heading text-base sm:text-lg font-bold text-carbon mb-5 leading-snug line-clamp-3">
                      {win.achievement}
                    </h4>

                    {/* Person with LinkedIn */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <Avatar name={win.name} image={win.image} size="small" />
                        <span className="font-body text-sm text-g600">{win.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#0A66C2] opacity-70 group-hover:opacity-100 transition-opacity">
                        <LinkedInIcon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Featured Video Testimonials - Now on bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {featuredStories.map((story, index) => {
              const hasVideo = story.video || story.youtubeId;
              return (
              <div
                key={story.name}
                className={`group ${hasVideo ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => handleVideoClick(story)}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${0.5 + index * 0.1}s`,
                }}
              >
                <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden border-2 border-g200 transition-all duration-500 shadow-md ${hasVideo ? 'sm:hover:border-accent/40 sm:hover:shadow-xl' : ''}`}>
                  {/* Image/Video area */}
                  <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden">
                    {story.video ? (
                      <video
                        src={story.video}
                        className="absolute inset-0 w-full h-full object-cover"
                        preload="metadata"
                        muted
                        playsInline
                      />
                    ) : story.youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${story.youtubeId}/maxresdefault.jpg`}
                        alt={story.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <Avatar name={story.name} image={story.image} size="large" />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Play button - only show if video exists */}
                    {hasVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="transform sm:group-hover:scale-110 transition-transform duration-300">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2s' }} />
                            <PlayIcon size={48} />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Info overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                      <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-1">
                        {story.name}
                      </h3>
                      <p className="font-body text-sm text-white/90">
                        {story.role}
                      </p>
                      <p className="font-body text-xs sm:text-sm text-white/70">
                        {story.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* CTA - Simple text link */}
          {showCTA && (
            <div
              className="text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
              }}
            >
              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-1.5 font-body text-sm sm:text-base font-medium transition-all duration-300 hover:gap-2.5"
                style={{ color: theme.ctaText }}
              >
                <span className="underline underline-offset-4 decoration-1">
                  {ctaText}
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bottom subtle line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }}
      />

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          videoSrc={activeVideo.src}
          youtubeId={activeVideo.youtubeId}
          name={activeVideo.name}
        />
      )}
    </section>
  );
}
