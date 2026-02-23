'use client';

import { useState, useRef, useCallback } from "react";
import YouTube, { YouTubeProps, YouTubePlayer as YTPlayer } from "react-youtube";

interface YouTubePlayerProps {
  videoId: string;
  onPlay?: () => void;
  onEnd?: () => void;
}

export function FTYouTubePlayer({ videoId, onPlay, onEnd }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserClicked, setHasUserClicked] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
      fs: 1,
      cc_load_policy: 0,
      iv_load_policy: 3,
      disablekb: 1,
    },
  };

  const onReady: YouTubeProps["onReady"] = useCallback((event: { target: YTPlayer }) => {
    playerRef.current = event.target;
    event.target.mute();
    event.target.playVideo();
  }, []);

  const handleStateChange: YouTubeProps["onStateChange"] = useCallback((event: { data: number }) => {
    // 1 = playing
    if (event.data === 1 && !isPlaying) {
      setIsPlaying(true);
    }
    // 0 = ended
    if (event.data === 0) {
      onEnd?.();
    }
  }, [isPlaying, onEnd]);

  const handlePlayClick = () => {
    if (playerRef.current) {
      setHasUserClicked(true);
      playerRef.current.seekTo(0, true);
      playerRef.current.unMute();
      playerRef.current.playVideo();
      onPlay?.();
    }
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl" style={{ paddingTop: '56.25%' }}>
      {/* YouTube player — always mounted, plays muted in background */}
      <div className="absolute inset-0">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={handleStateChange}
          className="w-full h-full"
          iframeClassName="w-full h-full"
        />
      </div>

      {/* Thumbnail fallback — shown until video actually starts playing */}
      {!isPlaying && !hasUserClicked && (
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className="absolute inset-0 w-full h-full object-cover z-[1]"
        />
      )}

      {/* Play button overlay */}
      {!hasUserClicked && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors flex items-center justify-center group z-10"
          aria-label="Play video"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 bg-ft-red rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-2xl">
            <svg className="w-10 h-10 md:w-12 md:h-12 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
