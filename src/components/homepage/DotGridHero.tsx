"use client";

import { useScrollEdgeBlur } from "@/lib/useScrollEdgeBlur";

/**
 * EXPERIMENT (branch: experiment/flowy-hero, 2026-08-21): the dot-grid
 * canvas that used to live here moved to FlowBackground.tsx, a fixed
 * sitewide layer instead of a per-section canvas -- see that file's
 * comment for why. This is now just the first-viewport heading, sitting
 * in normal flow with a transparent background so FlowBackground shows
 * through behind it, same as every other homepage section.
 *
 * 2026-08-22: heading now carries useScrollEdgeBlur, so it blurs and
 * accent-glows away as it scrolls past the top edge instead of just
 * cutting off -- see that hook's comment for the full reasoning.
 */
export default function DotGridHero() {
  const ref = useScrollEdgeBlur<HTMLHeadingElement>();

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6">
      <h1
        ref={ref}
        className="pointer-events-none text-center font-[family-name:var(--font-display-h1)] text-[9vw] leading-[0.95] text-white md:text-[5vw]"
      >
        The Sound of Ideas
      </h1>
    </section>
  );
}
