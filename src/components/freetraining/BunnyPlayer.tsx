'use client';

import { useEffect, useRef, useCallback } from "react";

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

  const handleMessage = useCallback((event: MessageEvent) => {
    // Bunny Stream player posts messages for player events
    if (!event.data) return;

    // Bunny Stream may send data as a JSON string or an object
    let data = event.data;
    if (typeof data === 'string') {
      try { data = JSON.parse(data); } catch (_e) { return; }
    }
    if (typeof data !== 'object') return;

    const { event: eventType, currentTime, duration } = data;

    switch (eventType) {
      case 'play':
        if (!hasPlayedRef.current) {
          hasPlayedRef.current = true;
          onPlay?.();
        }
        break;
      case 'timeupdate':
        if (typeof currentTime === 'number' && typeof duration === 'number') {
          onTimeUpdate?.(currentTime, duration);
        }
        break;
      case 'ended':
        onEnded?.();
        break;
      case 'pause':
        if (typeof currentTime === 'number') {
          onPause?.(currentTime);
        }
        break;
    }
  }, [onPlay, onTimeUpdate, onEnded, onPause]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  // Bunny Stream embed URL format
  const embedUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&preload=true&responsive=true`;

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
    </div>
  );
}
