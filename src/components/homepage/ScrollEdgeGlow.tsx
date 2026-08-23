"use client";

import { useEffect, useRef, useState } from "react";

/**
 * EXPERIMENT (branch: experiment/flowy-hero, 2026-08-21) — an accent
 * glow pinned to the very top and bottom of the viewport, framing
 * content as it scrolls under those edges.
 *
 * 2026-08-22: dropped the backdrop-filter blur that used to live here.
 * It blurred everything in that screen region indiscriminately (photos,
 * buttons, text alike), since backdrop-filter operates on a screen
 * region, not an element type -- that's now handled per-element by
 * useScrollEdgeBlur (see the hero heading in DotGridHero.tsx), which can
 * be scoped to just the elements that should blur. This component keeps
 * only the ambient gradient/glow, no blur.
 *
 * "When scroll": a low, near-invisible base presence at rest, boosted to
 * full intensity while actively scrolling and settling back down ~500ms
 * after the last scroll event (same idle-timer pattern MixerTeaser uses
 * for its own scroll-gesture detection), so the effect visibly answers
 * scrolling rather than sitting there as a static vignette.
 *
 * z-40: above regular page content, below Nav (z-50) and CursorField
 * (z-200) -- frames the content, doesn't blur the nav or cursor effects
 * sitting on top of it.
 */
export default function ScrollEdgeGlow() {
  const [active, setActive] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function handleScroll() {
      setActive(true);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setActive(false), 500);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(idleTimer.current);
    };
  }, []);

  const base = {
    position: "fixed" as const,
    insetInline: 0,
    height: "14vh",
    minHeight: "90px",
    zIndex: 40,
    pointerEvents: "none" as const,
    transition: "opacity 0.6s ease",
    opacity: active ? 1 : 0.35,
  };

  return (
    <>
      <div
        aria-hidden
        style={{
          ...base,
          top: 0,
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent), radial-gradient(ellipse at top, rgba(247,209,1,0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        style={{
          ...base,
          bottom: 0,
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55), transparent), radial-gradient(ellipse at bottom, rgba(247,209,1,0.18), transparent 70%)",
        }}
      />
    </>
  );
}
