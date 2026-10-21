'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'requesting' | 'recording' | 'recorded' | 'unsupported' | 'denied';

const inputClass =
  'w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4A853] focus:ring-2 focus:ring-[#D4A853]/20 transition-all';

function pickMimeType() {
  if (typeof MediaRecorder === 'undefined') return '';
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? '';
}

function extensionFor(mimeType: string) {
  if (mimeType.includes('mp4')) return 'm4a';
  if (mimeType.includes('ogg')) return 'ogg';
  return 'webm';
}

function formatSeconds(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Records a short audio answer in the browser with a hard time cap, with an
 * "upload a file instead" fallback for browsers that block the microphone.
 * Calls `onChange` with the resulting File (or null when cleared).
 */
export default function VoiceNoteRecorder({
  id,
  maxSeconds,
  onChange,
}: {
  id: string;
  maxSeconds: number;
  onChange: (file: File | null) => void;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAtRef = useRef(0);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setStatus('unsupported');
      setShowUpload(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      clearTimer();
      stopStream();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    stopStream();
    recorderRef.current = null;
    chunksRef.current = [];
    setElapsed(0);
    setAudioUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return null;
    });
    setFileName(null);
    setStatus((current) => (current === 'unsupported' ? current : 'idle'));
    onChange(null);
  }, [clearTimer, stopStream, onChange]);

  const stopRecording = useCallback(() => {
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== 'inactive') recorder.stop();
    clearTimer();
  }, [clearTimer]);

  const startRecording = useCallback(async () => {
    setStatus('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = pickMimeType();
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const type = recorder.mimeType || mimeType || 'audio/webm';
        const blob = new Blob(chunksRef.current, { type });
        const file = new File([blob], `voice-note.${extensionFor(type)}`, { type });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setFileName(null);
        setStatus('recorded');
        stopStream();
        onChange(file);
      };

      recorder.start(250);
      startedAtRef.current = Date.now();
      setElapsed(0);
      setStatus('recording');
      timerRef.current = setInterval(() => {
        const seconds = Math.floor((Date.now() - startedAtRef.current) / 1000);
        setElapsed(Math.min(seconds, maxSeconds));
        if (seconds >= maxSeconds) stopRecording();
      }, 200);
    } catch (error) {
      console.error('Microphone access failed:', error);
      stopStream();
      setStatus('denied');
      setShowUpload(true);
    }
  }, [maxSeconds, onChange, stopRecording, stopStream]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;
    setAudioUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return URL.createObjectURL(file);
    });
    setFileName(file.name);
    setStatus('recorded');
    onChange(file);
  };

  const remaining = maxSeconds - elapsed;
  const progress = Math.min(100, (elapsed / maxSeconds) * 100);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
      {status === 'recorded' && audioUrl ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-[#D4A853]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {fileName ? `Attached: ${fileName}` : `Recorded, ${formatSeconds(elapsed)}`}
          </div>
          <audio controls src={audioUrl} className="w-full" preload="metadata" />
          <button type="button" onClick={reset} className="text-sm text-white/60 hover:text-white underline underline-offset-2 transition-colors">
            {fileName ? 'Remove and try again' : 'Record again'}
          </button>
        </div>
      ) : (
        <>
          {status !== 'unsupported' && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {status === 'recording' ? (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-carbon font-heading font-bold text-sm rounded-xl hover:bg-white/90 transition-colors"
                >
                  <span className="w-3 h-3 bg-[#FF0023] rounded-sm" />
                  Stop
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startRecording}
                  disabled={status === 'requesting'}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#D4A853] text-white font-heading font-bold text-sm rounded-xl hover:bg-[#D4A853]/90 disabled:opacity-60 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
                  </svg>
                  {status === 'requesting' ? 'Allowing microphone…' : status === 'denied' ? 'Try recording again' : 'Start recording'}
                </button>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs text-white/50 mb-1.5">
                  <span>{status === 'recording' ? 'Recording' : `Up to ${formatSeconds(maxSeconds)}`}</span>
                  <span className={status === 'recording' && remaining <= 10 ? 'text-[#FF6B6B] font-semibold' : ''}>
                    {status === 'recording' ? `${formatSeconds(remaining)} left` : ''}
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#D4A853] transition-[width] duration-200" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          )}

          {status === 'denied' && (
            <p className="text-sm text-[#FF6B6B]">
              We couldn&apos;t access your microphone. Allow it in your browser settings, or upload a recording below.
            </p>
          )}
          {status === 'unsupported' && (
            <p className="text-sm text-white/60">Your browser can&apos;t record audio here. Upload a recording from your phone instead.</p>
          )}

          {showUpload ? (
            <div>
              <label htmlFor={`${id}-upload`} className="block text-xs text-white/50 mb-2">
                Upload an audio file (MP3, M4A, WAV, WebM or OGG, up to 15MB)
              </label>
              <input id={`${id}-upload`} type="file" accept="audio/*,.m4a,.mp3,.wav,.webm,.ogg" onChange={handleUpload} className={`${inputClass} file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:text-sm`} />
            </div>
          ) : (
            status !== 'recording' && (
              <button type="button" onClick={() => setShowUpload(true)} className="text-xs text-white/40 hover:text-white underline underline-offset-2 transition-colors">
                Upload an audio file instead
              </button>
            )
          )}
        </>
      )}
    </div>
  );
}
