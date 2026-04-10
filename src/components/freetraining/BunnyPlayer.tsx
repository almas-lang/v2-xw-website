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

export function BunnyPlayer({
  videoId,
  libraryId,
  onPlay,
  onTimeUpdate,
  onEnded,
  onPause,
}: BunnyPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const hasPlayedRef = useRef(false);
  const [userStarted, setUserStarted] = useState(false);

  const postCommand = useCallback((command: string, value?: number) => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    const msg: Record<string, unknown> = { event: 'command', func: command };
    if (value !== undefined) msg.value = value;
    iframe.contentWindow.postMessage(JSON.stringify(msg), '*');
  }, []);

  const handleUserPlay = useCallback(() => {
    setUserStarted(true);
    // Seek to beginning, unmute, and play
    postCommand('seek', 0);
    postCommand('unmute');
    postCommand('play');
  }, [postCommand]);

  const handleMessage = useCallback((event: MessageEvent) => {
    if (!event.data) return;

    let data = event.data;
    if (typeof data === 'string') {
      try { data = JSON.parse(data); } catch (_e) { return; }
    }
    if (typeof data !== 'object') return;

    const { event: eventType, currentTime, duration } = data;

    switch (eventType) {
      case 'play':
        if (!hasPlayedRef.current && userStarted) {
          hasPlayedRef.current = true;
          onPlay?.();
        }
        break;
      case 'timeupdate':
        if (userStarted && typeof currentTime === 'number' && typeof duration === 'number') {
          onTimeUpdate?.(currentTime, duration);
        }
        break;
      case 'ended':
        onEnded?.();
        break;
      case 'pause':
        if (userStarted && typeof currentTime === 'number') {
          onPause?.(currentTime);
        }
        break;
    }
  }, [onPlay, onTimeUpdate, onEnded, onPause, userStarted]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  // Autoplay muted in background; user click restarts with sound
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
