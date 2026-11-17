"use client";

import { useRef, useState, useCallback, useEffect } from "react";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function VideoPlayer({
  src,
  poster,
  aspectRatio,
  duration,
  tag,
  caption,
  Visualizer,
}: {
  src: string;
  poster: string;
  aspectRatio: string;
  duration: number;
  tag: string;
  caption: string | null;
  Visualizer?: React.ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [realDuration, setRealDuration] = useState(duration);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrentTime(v.currentTime);
    const onMeta = () => { if (v.duration && isFinite(v.duration)) setRealDuration(v.duration); };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      v.currentTime = 0;
      v.play().catch(() => {});
    };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play(); else v.pause();
  }, []);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setMuted(val === 0);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    setMuted(next);
    v.muted = next;
    if (!next && volume === 0) {
      setVolume(0.5);
      v.volume = 0.5;
    }
  }, [muted, volume]);

  const goFullscreen = useCallback(() => {
    const container = posterRef.current;
    const v = videoRef.current;
    if (container?.requestFullscreen) {
      container.requestFullscreen();
    } else if (v && (v as any).webkitEnterFullScreen) {
      (v as any).webkitEnterFullScreen();
    }
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !realDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = pct * realDuration;
    setCurrentTime(v.currentTime);
  }, [realDuration]);

  const progress = realDuration > 0 ? (currentTime / realDuration) * 100 : 0;

  return (
    <div
      ref={cardRef}
      className="vcard glass spring-hover relative block w-full overflow-hidden text-left"
      style={{ borderRadius: "var(--radius-inner)" }}
    >
      <div
        ref={posterRef}
        className="poster relative cursor-pointer overflow-hidden"
        style={{ aspectRatio, background: "linear-gradient(145deg,#4a4a50,#18181a)" }}
        onClick={toggle}
        role="button"
        tabIndex={0}
        aria-label={`${playing ? "Pause" : "Play"} ${caption ?? "video"}`}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
      >
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster || undefined}
            preload="metadata"
            playsInline
            loop
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          Visualizer
        )}

        {tag && (
          <span
            className="absolute left-[14px] top-[14px] rounded-full border border-white/50 px-3 py-[5px] text-[12px] font-semibold tracking-[.04em] text-white"
            style={{ background: "rgba(255,255,255,.22)" }}
          >
            {tag}
          </span>
        )}

        <div
          className={`pbtn absolute left-1/2 top-[46%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60${playing ? " opacity-0" : ""}`}
          style={{ background: "rgba(255,255,255,.28)", WebkitBackdropFilter: "blur(14px)", backdropFilter: "blur(14px)", transition: "opacity .3s" }}
        >
          {playing ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M8 5v14M16 5v14" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M8 5l11 7-11 7z" />
            </svg>
          )}
        </div>

        <div
          className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-4 pb-3 text-[13px] font-medium tabular-nums text-white"
          style={{ paddingTop: 30, background: "linear-gradient(transparent,rgba(0,0,0,.55))" }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="min-w-[34px]">{fmt(currentTime)}</span>
          <div
            className="relative flex-1 cursor-pointer py-2"
            onClick={handleSeek}
            role="slider"
            aria-valuenow={Math.round(currentTime)}
            aria-valuemin={0}
            aria-valuemax={Math.round(realDuration)}
            aria-label="Seek"
            tabIndex={0}
          >
            <div className="h-[4px] w-full overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span>{fmt(realDuration)}</span>
          <button
            type="button"
            onClick={goFullscreen}
            className="ml-1 flex items-center justify-center"
            aria-label="Fullscreen"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3" />
            </svg>
          </button>
        </div>
      </div>

      {caption && (
        <div className="flex items-center justify-between gap-3 px-[18px] py-[14px]">
          <p className="text-[17px] font-semibold" style={{ margin: 0 }}>{caption}</p>
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={toggleMute}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted || volume === 0 ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="video-volume-slider"
              aria-label="Volume"
            />
          </div>
        </div>
      )}
    </div>
  );
}
