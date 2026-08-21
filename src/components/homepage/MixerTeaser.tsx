"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { beatDurationMs } from "@/lib/beat";

type Band = {
  label: string;
  type: BiquadFilterType;
  frequency: number;
  q?: number;
};

// Center frequencies/types per the spec in momusic-content's
// website-copy.md build plan (drafted before the track existed).
const BANDS: Band[] = [
  { label: "Low", type: "lowshelf", frequency: 150 },
  { label: "Mid-Low", type: "peaking", frequency: 600, q: 1 },
  { label: "Mid", type: "peaking", frequency: 2000, q: 1 },
  { label: "High", type: "highshelf", frequency: 6000 },
];

const GLOW_PULSE = `eq-bar-glow-pulse ${beatDurationMs(4)}ms ease-in-out infinite`;

// level 0..1 (0.5 = flat) -> gain in dB, +-12dB range per spec.
function levelToGain(level: number) {
  return (level - 0.5) * 24;
}

/**
 * Draggable gain bar for one EQ band. Not a native <input type="range">
 * reskinned — removing the thumb and adding a gradient fill reliably
 * needs vendor-prefixed pseudo-elements that render inconsistently
 * across browsers, and this needs pointer-drag-anywhere-on-the-track
 * behavior anyway (native range only drags the thumb). Plain
 * pointer-event handling on a div gives full control.
 */
function EQBar({
  band,
  level,
  onChange,
}: {
  band: Band;
  level: number;
  onChange: (level: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const levelFromPointer = useCallback((clientY: number) => {
    const track = trackRef.current;
    if (!track) return null;
    const rect = track.getBoundingClientRect();
    const fraction = 1 - (clientY - rect.top) / rect.height; // bottom = 0, top = 1
    return Math.min(1, Math.max(0, fraction));
  }, []);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const next = levelFromPointer(e.clientY);
    if (next !== null) onChange(next);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.buttons !== 1) return;
    const next = levelFromPointer(e.clientY);
    if (next !== null) onChange(next);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(1, level + 0.05));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(0, level - 0.05));
    }
  }

  const gain = levelToGain(level);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label={`${band.label} gain`}
        aria-valuemin={-12}
        aria-valuemax={12}
        aria-valuenow={Math.round(gain)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onKeyDown={handleKeyDown}
        className="relative h-40 w-[3px] rounded-full bg-white/10 cursor-pointer touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <div
          className="absolute bottom-0 left-0 w-full rounded-full pointer-events-none"
          style={{
            height: `${level * 100}%`,
            background:
              "linear-gradient(to top, rgba(247,209,1,0.1), rgba(247,209,1,0.95))",
            boxShadow: "0 0 10px 1px rgba(247,209,1,0.55)",
            animation: GLOW_PULSE,
          }}
        />
      </div>
      <span className="text-white/50 text-xs uppercase tracking-wide">{band.label}</span>
      <span className="text-white/30 text-[10px] tabular-nums">
        {gain > 0 ? "+" : ""}
        {gain.toFixed(0)}dB
      </span>
    </div>
  );
}

/**
 * Section 5, "The Mixer (hidden)". Reveal mechanics (scroll-to-unlock,
 * relock on scroll-up) unchanged from the 2026-08-21 rebuild, see prior
 * comment history in git blame. What changed 2026-08-21 (later same
 * day): the real Mõ-owned track landed (`public/audio/mixer.mp3`), so
 * the Web Audio wiring specced in momusic-content's website-copy.md
 * (four BiquadFilterNodes, one per band, drag-to-set gain) is now live
 * instead of an honest "not live yet" placeholder.
 *
 * Audio graph is built lazily on first Play click, not on mount —
 * browsers block AudioContext/playback without a user gesture, and
 * constructing everything inside that same click handler is the
 * simplest way to satisfy that reliably across browsers (Safari in
 * particular is strict about this).
 */
export default function MixerTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [unlocked, setUnlocked] = useState(false);
  const wasVisible = useRef(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const filterNodesRef = useRef<BiquadFilterNode[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [levels, setLevels] = useState<number[]>(BANDS.map(() => 0.5));

  function setupAudioGraph() {
    if (audioCtxRef.current || !audioRef.current) return;
    const ctx = new AudioContext();
    const source = ctx.createMediaElementSource(audioRef.current);
    const filters = BANDS.map((band) => {
      const filter = ctx.createBiquadFilter();
      filter.type = band.type;
      filter.frequency.value = band.frequency;
      if (band.q) filter.Q.value = band.q;
      filter.gain.value = levelToGain(0.5);
      return filter;
    });
    // Chain: source -> low -> mid-low -> mid -> high -> destination.
    let node: AudioNode = source;
    for (const filter of filters) {
      node.connect(filter);
      node = filter;
    }
    node.connect(ctx.destination);
    audioCtxRef.current = ctx;
    filterNodesRef.current = filters;
  }

  async function togglePlay() {
    try {
      setupAudioGraph();
      const ctx = audioCtxRef.current;
      const audio = audioRef.current;
      if (!ctx || !audio) return;
      if (ctx.state === "suspended") await ctx.resume();

      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[mixer] togglePlay failed", err);
    }
  }

  function handleLevelChange(index: number, level: number) {
    setLevels((prev) => {
      const next = [...prev];
      next[index] = level;
      return next;
    });
    const filter = filterNodesRef.current[index];
    if (filter) filter.gain.value = levelToGain(level);
  }

  function handleReset() {
    setLevels(BANDS.map(() => 0.5));
    filterNodesRef.current.forEach((filter) => {
      filter.gain.value = levelToGain(0.5);
    });
  }

  // Keep isPlaying in sync with the actual element (covers the pause
  // that happens when the section re-locks and any browser-driven pause).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  // Pause playback whenever the section re-locks (scrolled back up past it).
  useEffect(() => {
    if (!unlocked) audioRef.current?.pause();
  }, [unlocked]);

  // Tear down the AudioContext on unmount, not just pause the element.
  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  // Unlock on continued scroll-down at the true bottom of the page —
  // but only on a genuinely SEPARATE scroll after the first one settles.
  // One continuous wheel/trackpad gesture fires many discrete `wheel`
  // events (easily dozens, from momentum/inertia); if the tail end of
  // that same gesture happens to land past the bottom, those trailing
  // events satisfied "at bottom + scrolling down" instantly, so it
  // unlocked as part of the same motion, no felt "second" scroll at
  // all (reported bug). Fix: track whether the scroll has come to rest
  // at the bottom (no wheel events for ~200ms) before arming — only a
  // new gesture after that pause can actually trigger unlock.
  useEffect(() => {
    if (unlocked) return;

    const armed = { current: false };
    let idleTimer: ReturnType<typeof setTimeout> | undefined;

    function atBottom() {
      return (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 24
      );
    }

    function handleWheel(e: WheelEvent) {
      if (e.deltaY > 0 && atBottom()) {
        if (armed.current) {
          setUnlocked(true);
          return;
        }
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          armed.current = true;
        }, 200);
      } else {
        armed.current = false;
        clearTimeout(idleTimer);
      }
    }

    // Touch already has a natural gesture boundary (touchend), no
    // debounce needed there the way continuous wheel events require.
    let touchStartY = 0;
    function handleTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }
    function handleTouchEnd(e: TouchEvent) {
      const deltaY = touchStartY - e.changedTouches[0].clientY; // positive = swiped up = "scroll down" intent
      if (deltaY > 24 && atBottom()) {
        if (armed.current) {
          setUnlocked(true);
        } else {
          armed.current = true;
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [unlocked]);

  // Re-lock once scrolled back up past it (was visible, now isn't).
  useEffect(() => {
    if (!unlocked) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wasVisible.current = true;
        } else if (wasVisible.current) {
          setUnlocked(false);
          wasVisible.current = false;
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [unlocked]);

  return (
    <section className="w-full bg-black">
      <div className="w-full flex items-center justify-center py-16 text-white/50 text-xs tracking-[0.3em] uppercase">
        Scroll down and volume up
      </div>

      <div
        ref={sectionRef}
        className="overflow-hidden transition-[max-height] duration-500 ease-out"
        style={{ maxHeight: unlocked ? "100vh" : "0px" }}
      >
        <div className="min-h-screen px-6 md:px-10 py-16 flex flex-col items-center justify-center gap-16">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption -- instrumental track, no dialogue to caption */}
          <audio ref={audioRef} src="/audio/mixer.mp3" loop preload="none" />

          <div className="flex flex-col items-center gap-3 text-center">
            <button
              type="button"
              onClick={togglePlay}
              className="rounded-full border border-accent px-8 py-3 text-accent text-sm uppercase tracking-wide hover:bg-accent/10 transition-colors"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <p className="text-white/50 text-xs max-w-md">
              Drag each band to shape the mix. This is our sound, in your hands.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-12">
            {BANDS.map((band, i) => (
              <EQBar
                key={band.label}
                band={band}
                level={levels[i]}
                onChange={(level) => handleLevelChange(i, level)}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="text-white/40 text-xs uppercase tracking-wide hover:text-accent transition-colors"
          >
            Reset to flat
          </button>
        </div>
      </div>
    </section>
  );
}
