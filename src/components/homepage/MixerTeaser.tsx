"use client";

import { useEffect, useRef, useState } from "react";
import { beatDurationMs } from "@/lib/beat";

const BANDS = ["Low", "Mid-Low", "Mid", "High"];
const GLOW_PULSE = `eq-bar-glow-pulse ${beatDurationMs(4)}ms ease-in-out infinite`;

/**
 * Thin glowing level bar, standing in for the real gain sliders until
 * Web Audio is wired up. Not a native <input type="range"> reskinned —
 * removing the thumb and adding a gradient fill reliably needs
 * vendor-prefixed pseudo-elements (::-webkit-slider-thumb,
 * ::-moz-range-track, etc.) that render inconsistently across browsers.
 * Since this is disabled/non-interactive anyway (real wiring blocked on
 * the track), a plain div-based bar gives full, consistent control over
 * the look instead. Filled to 50% by default, representing the flat/0dB
 * center of a -12..+12 gain range.
 */
function EQBar({ band, level = 0.5 }: { band: string; level?: number }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-40 w-[3px] rounded-full bg-white/10">
        <div
          className="absolute bottom-0 left-0 w-full rounded-full"
          style={{
            height: `${level * 100}%`,
            background:
              "linear-gradient(to top, rgba(247,209,1,0.1), rgba(247,209,1,0.95))",
            boxShadow: "0 0 10px 1px rgba(247,209,1,0.55)",
            animation: GLOW_PULSE,
          }}
        />
      </div>
      <span className="text-white/50 text-xs uppercase tracking-wide">{band}</span>
    </div>
  );
}

/**
 * Section 5, "The Mixer (hidden)". Rebuilt 2026-08-21, dropping the
 * fixed-overlay/transform "full-bleed takeover" entirely — it was
 * fighting `position: fixed` measurement issues throughout this
 * session and reported as laggy in real use. This version is much
 * simpler: the Mixer is normal in-flow content (no overlay, no
 * `position: fixed`, no locked body scroll), collapsed to zero height
 * by default. Continuing to scroll down once already at the bottom of
 * the page ("the second scroll down") unlocks it, it reveals, and the
 * page just keeps scrolling normally into it like any other section.
 * Scrolling back up past it re-locks it (via IntersectionObserver: once
 * it's been seen and then leaves view, that can only mean scrolling up
 * past it, since it's the last section on the page), so the same
 * unlock gesture is needed again next time.
 *
 * Reveal height is a full viewport (`100vh`), not a fixed 640px —
 * scrolling into it should feel like entering a real section, not
 * peeking at a small panel.
 *
 * Real Web Audio wiring (4-band BiquadFilterNode EQ over a background
 * track) is specced in this skill's website-copy.md but still blocked
 * on an original Mõ-owned track that doesn't exist yet (repurposing a
 * client's commissioned piece is a rights problem) — so the reveal
 * mechanics below are real, the mixer itself is an honest "not live
 * yet" panel, not a working player.
 */
export default function MixerTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [unlocked, setUnlocked] = useState(false);
  const wasVisible = useRef(false);

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
          <p className="text-white/70 text-sm max-w-md text-center">
            The Mixer isn&rsquo;t live yet, it needs an original Mõ-owned
            track first. This is the interaction, not the sound.
          </p>
          <div className="grid grid-cols-4 gap-12">
            {BANDS.map((band) => (
              <EQBar key={band} band={band} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
