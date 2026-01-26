'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const YOUTUBE_VIDEO_ID = '97aNcaEpy34';

// Extend Window interface for YouTube API
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          playerVars: Record<string, number | string>;
          events: {
            onReady: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getPlayerState: () => number;
  destroy: () => void;
}

export default function HowMentorshipWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const hasAutoPlayed = useRef(false);

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT) return;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  // Initialize player when API is ready and section is visible
  const initPlayer = useCallback(() => {
    if (playerRef.current || !window.YT) return;

    playerRef.current = new window.YT.Player('youtube-player-programs', {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        mute: 1,
        playsinline: 1,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
      },
      events: {
        onReady: (event) => {
          // Auto-play muted immediately
          if (!hasAutoPlayed.current) {
            event.target.mute();
            event.target.playVideo();
            setIsPlaying(true);
            setIsMuted(true);
            hasAutoPlayed.current = true;
          }
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
          }
        },
      },
    });
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Initialize player when section becomes visible
          if (window.YT && window.YT.Player) {
            initPlayer();
          } else {
            window.onYouTubeIframeAPIReady = initPlayer;
          }
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [initPlayer]);

  // Handle play button click - unmute and restart
  const handlePlayClick = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0, true);
      playerRef.current.unMute();
      playerRef.current.playVideo();
      setIsMuted(false);
      setShowPlayButton(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a1420 0%, #0d1a28 50%, #0a1420 100%)',
      }}
    >
      {/* White background block - bottom on mobile, right column on desktop */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[50%] md:h-auto md:left-auto md:top-0 md:w-[55%] bg-white"
      />

      <div
        className="relative max-w-[1200px] mx-auto px-5"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
          {/* Text - centered on mobile, left on desktop */}
          <div className="md:w-[35%] relative z-10 text-center md:text-left py-4 md:py-0">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-8 h-[2px] bg-accent" />
              <span className="font-body text-[11px] uppercase tracking-[0.25em] text-accent font-medium">The Process</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Watch<br className="hidden sm:block" />
              <span className="text-g300"> how it</span><br className="hidden sm:block" />
              <span> works</span>
            </h2>
            <p className="mt-3 md:mt-4 font-body text-sm md:text-base text-g400 max-w-[280px] mx-auto md:mx-0">
              See the mentorship experience in action
            </p>
          </div>

          {/* Video */}
          <div className="w-full md:w-[65%] md:pl-8 relative z-10">
            <div
              className="relative w-full aspect-video overflow-hidden"
              style={{
                border: '2px solid #1A1A1A',
                boxShadow: isHovered ? '8px 8px 0 #1A1A1A' : '4px 4px 0 #1A1A1A',
                transform: isHovered ? 'translate(-2px, -2px)' : 'translate(0, 0)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* YouTube Player Container */}
              <div id="youtube-player-programs" className="absolute inset-0 w-full h-full" />

              {/* Play button overlay - shows when muted/not started */}
              {showPlayButton && (
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 hover:bg-black/20 transition-colors cursor-pointer"
                  aria-label="Play video with sound"
                >
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-white/50 flex items-center justify-center transition-all duration-300 hover:bg-white/90 group"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ml-1 text-white group-hover:text-carbon transition-colors duration-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}

              {/* Muted indicator */}
              {isPlaying && isMuted && showPlayButton && (
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/60 rounded-full text-white text-xs">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                  <span>Click to unmute</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
