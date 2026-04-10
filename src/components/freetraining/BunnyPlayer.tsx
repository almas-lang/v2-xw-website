'use client';

import { useEffect, useRef, useCallback, useState } from "react";

interface BunnyPlayerProps {
  videoId: string;
  libraryId: string;
  onPlay?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  onPause?: (currentTime: number) => void;
}
declare global {
  interface Window {
    playerjs: {
      Player: new (el: HTMLIFrameElement) => PlayerJsInstance;
    };
  }
}

interface PlayerJsInstance {
  on(event: 'ready', cb: () => void): void;
  on(event: 'play', cb: () => void): void;
  on(event: 'pause', cb: () => void): void;
  on(event: 'ended', cb: () => void): void;
  on(event: 'timeupdate', cb: (data: { seconds: number; duration: number }) => void): void;
  play(): void;
  pause(): void;
  mute(): void;
  unmute(): void;
  setCurrentTime(seconds: number): void;
  getCurrentTime(cb: (seconds: number) => void): void;
}

export function BunnyPlayer({
  videoId,
  libraryId,
  onPlay,
  onTimeUpdate,
  onEnded,
  onPause,
}: BunnyPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<PlayerJsInstance | null>(null);
  const hasPlayedRef = useRef(false);
  const userStartedRef = useRef(false);
  const [userStarted, setUserStarted] = useState(false);

  // Keep callbacks in a ref to avoid stale closures in Player.js listeners
  const callbacksRef = useRef({ onPlay, onTimeUpdate, onEnded, onPause });
  useEffect(() => {
    callbacksRef.current = { onPlay, onTimeUpdate, onEnded, onPause };
  }, [onPlay, onTimeUpdate, onEnded, onPause]);

  // Sync userStarted state to ref for Player.js callbacks
  useEffect(() => {
    userStartedRef.current = userStarted;
  }, [userStarted]);

  // Load Player.js script and initialise player
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//assets.mediadelivery.net/playerjs/playerjs-latest.min.js';
    script.async = true;

    script.onload = () => {
      const iframe = iframeRef.current;
      if (!iframe || !window.playerjs) return;

      const player = new window.playerjs.Player(iframe);
      playerRef.current = player;

      player.on('ready', () => {
        player.on('play', () => {
          if (!hasPlayedRef.current && userStartedRef.current) {
            hasPlayedRef.current = true;
            callbacksRef.current.onPlay?.();
          }
        });

        player.on('timeupdate', (data) => {
          if (userStartedRef.current) {
            callbacksRef.current.onTimeUpdate?.(data.seconds, data.duration);
          }
        });

        player.on('ended', () => {
          callbacksRef.current.onEnded?.();
        });

        player.on('pause', () => {
          if (userStartedRef.current) {
            player.getCurrentTime((seconds) => {
              callbacksRef.current.onPause?.(seconds);
            });
          }
        });
      });
    };

    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUserPlay = useCallback(() => {
    setUserStarted(true);
    const player = playerRef.current;
    if (player) {
      player.setCurrentTime(0);
      player.unmute();
      player.play();
    }
  }, []);

  const embedUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=true&muted=true&preload=true&responsive=true`;

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        ref={iframeRef}
        src={embedUrl}
        className="absolute inset-0 w-full h-full rounded-lg"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title="Free Training Video - How Designers Break Into Senior UX Roles"
      />
      {/* Play button overlay — shown until user clicks */}
      {!userStarted && (
        <button
          onClick={handleUserPlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg cursor-pointer transition-opacity hover:bg-black/20 z-10"
          aria-label="Play video from the beginning"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <svg className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}