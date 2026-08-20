"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight scroll-linked depth cue, used across the site (not just
 * the hero) so scrolling itself carries a bit of the same "space" feel
 * as the interactive dot field. Positive strength drifts an element up
 * as it approaches viewport center, negative drifts it down — vary by
 * index for a staggered, non-flat feel across a row of elements.
 */
export function useParallax<T extends HTMLElement>(strength = 24) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    function update() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const progress = (viewportCenter - elementCenter) / window.innerHeight;
      el.style.transform = `translateY(${progress * strength}px)`;
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return ref;
}
