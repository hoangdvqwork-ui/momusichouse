"use client";

import { useEffect, useRef } from "react";

/**
 * EXPERIMENT (branch: experiment/flowy-hero, 2026-08-22) — blurs and
 * accent-glows an element as it scrolls up through the top of the
 * viewport, then fades it out. Reusable per-element (attach the
 * returned ref to whatever wants the effect), same shape as
 * useParallax(strength): a hook that returns a ref, call it again on a
 * new element to extend coverage, no rework of the mechanism itself.
 *
 * Replaces ScrollEdgeGlow's original full-width backdrop-blur strips
 * for the *blur* specifically — those blurred everything sitting in
 * that screen region indiscriminately (photos, buttons, text alike),
 * since backdrop-filter blurs by screen region, not element type. This
 * scopes the blur to one element (the hero heading, first use) driven
 * by that element's own scroll position. ScrollEdgeGlow's ambient
 * gradient/glow (no blur) still runs sitewide alongside this.
 *
 * Tuned strong/obvious on explicit request, not subtle: blur ramps to
 * a real MAX_BLUR px and the accent-color text-shadow glow to a real,
 * visible spread by the time the element has scrolled fully past the
 * top edge -- not a faint effect someone could miss.
 *
 * TRIGGER is anchored to the element's own top edge, not an absolute
 * viewport-pixel value, and the ramp runs over the element's own height
 * (bug caught 2026-08-22 during testing: an absolute-pixel START/END
 * pair meant a typical vertically-centered hero already sat past the
 * trigger on a normal viewport height, giving a small nonzero blur at
 * true rest instead of cleanly zero -- viewport-height-dependent,
 * fixed by making it relative to the element instead).
 *
 * TRIGGER raised 380 (was 160) same day, "make it happen sooner" —
 * the ramp now starts while the element is still comfortably in the
 * lower/middle of the viewport instead of waiting until it's almost at
 * the top. Now also applied to every homepage heading-style text (About's
 * statement, talent names), not just the hero -- exactly the "call the
 * hook again on a new ref" extension the original build predicted.
 *
 * 2026-08-23, second bug caught while extending this to every page's
 * <h1> (not just homepage sections): TRIGGER=380 assumes the element
 * sits comfortably *below* 380px at true rest, true for a vertically-
 * centered full-screen hero but false for a normal page heading sitting
 * right under the nav (~128px down, e.g. /projects/all's h1) -- those
 * loaded already partway blurred, with zero scrolling. Fixed by
 * capturing each element's resting (pre-scroll) progress value once on
 * mount and re-normalizing against it, so progress is always exactly 0
 * at true page-load rest regardless of where an element happens to sit
 * on its page, and still reaches exactly 1 at the same "fully scrolled
 * past the top" point as before. A no-op correction for elements that
 * were already resting below TRIGGER (the hero), a real fix for ones
 * that weren't.
 */
const TRIGGER = 380; // px from viewport top: ramp starts once the element's top crosses below this
const MAX_BLUR = 18; // px
const MAX_GLOW = 46; // px text-shadow spread at full intensity
const ACCENT = "247, 209, 1";

export function useScrollEdgeBlur<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let restProgress: number | null = null;

    function rawProgress(rect: DOMRect) {
      const span = TRIGGER + rect.height;
      return Math.min(1, Math.max(0, (TRIGGER - rect.top) / span));
    }

    function update() {
      if (!el) return;
      const rect = el.getBoundingClientRect();

      // Captured once, on the first measurement (true page-load rest,
      // before any scroll has happened) -- whatever the raw formula
      // reports at that instant is treated as this element's own zero
      // point.
      if (restProgress === null) restProgress = rawProgress(rect);

      const raw = rawProgress(rect);
      const progress =
        restProgress >= 1 ? 0 : Math.min(1, Math.max(0, (raw - restProgress) / (1 - restProgress)));

      el.style.filter = progress > 0.01 ? `blur(${progress * MAX_BLUR}px)` : "none";
      el.style.opacity = String(1 - progress * 0.85);
      el.style.textShadow =
        progress > 0.02
          ? `0 0 ${8 + progress * MAX_GLOW}px rgba(${ACCENT}, ${0.35 + progress * 0.65})`
          : "none";
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
  }, []);

  return ref;
}
