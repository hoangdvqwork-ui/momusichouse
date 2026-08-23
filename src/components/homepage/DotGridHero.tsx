"use client";

import { useEffect, useRef } from "react";
import { beatSin } from "@/lib/beat";
import { useScrollEdgeBlur } from "@/lib/useScrollEdgeBlur";

const ACCENT = { r: 0xf7, g: 0xd1, b: 0x01 };

/**
 * Recreation of the Framer "Interactive Grid" reference (internally
 * named Dot_Background in its own module source) — a mouse-reactive
 * dot grid. Framer's component isn't portable to a plain Next.js app
 * (licensed to Framer's own runtime), so this is a from-scratch canvas
 * version.
 *
 * 2026-08-23 — reverted back to hero-only scope. The flowy-hero branch
 * had briefly moved this canvas out into FlowBackground.tsx as a fixed,
 * sitewide layer behind the whole homepage; reverted on request back to
 * this file, scoped to just the hero section again (canvas absolute
 * within this section, not fixed to the viewport; IntersectionObserver
 * pauses the rAF loop when the hero scrolls offscreen, same as before
 * that experiment — see the observer below for why that matters
 * beyond just CPU). FlowBackground.tsx and its whole
 * fade-past-the-showreel-section mechanism are gone with it — moot
 * once the canvas no longer needs to span past this section.
 *
 * Scroll-velocity reactivity (added during the FlowBackground
 * experiment) is kept: smoothed scroll velocity feeds into the same
 * ambient-wave/ripple system the cursor drives, same as before,
 * just now only running while the hero itself is in view.
 */
export default function DotGridHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const scrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const headingRef = useScrollEdgeBlur<HTMLHeadingElement>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 29; // ~22% more dots than the original 32px grid
    const BASE_RADIUS = 1.3;
    const INFLUENCE = 200; // ripple reach, wider than the old static-push radius
    const MAX_PUSH = 10;
    const RIPPLE_SPEED = 2.2; // radians/sec, how fast the wave travels outward
    const RIPPLE_WAVELENGTH = 46; // px between ripple crests
    const AMBIENT_WAVELENGTH = 140; // tempo itself comes from the shared beat clock, see lib/beat.ts

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let lastScrollY = window.scrollY;
    const start = performance.now();

    function resize() {
      const el = canvas as HTMLCanvasElement;
      const context = ctx as CanvasRenderingContext2D;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = el.clientWidth;
      height = el.clientHeight;
      el.width = width * dpr;
      el.height = height * dpr;
      context.scale(dpr, dpr);
    }

    function draw() {
      const context = ctx as CanvasRenderingContext2D;
      const t = (performance.now() - start) / 1000;
      context.clearRect(0, 0, width, height);

      // Smoothed scroll velocity: lerp toward the raw per-frame delta so
      // a single scroll tick doesn't spike the field, and it naturally
      // decays back to ~0 once scrolling actually stops.
      const rawVelocity = scrollY.current - lastScrollY;
      lastScrollY = scrollY.current;
      scrollVelocity.current += (rawVelocity - scrollVelocity.current) * 0.12;
      const scrollBoost = Math.min(1, Math.abs(scrollVelocity.current) / 18);

      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          const dx = x - mouse.current.x;
          const dy = y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Ambient idle vibration, always present, gives the field
          // life even with no pointer on the section. Locked to the
          // shared site tempo (lib/beat.ts) rather than an arbitrary
          // speed, per-dot phase offset from position keeps it a wave
          // across the grid rather than everything pulsing in unison.
          const ambient = beatSin(t, 4, (x + y) / AMBIENT_WAVELENGTH) * 0.5 + 0.5;
          const ambientLift = ambient * (0.6 + scrollBoost * 2.2);

          let px = x;
          let py = y;
          let radius = BASE_RADIUS + ambientLift;
          let tint = 0;

          if (dist < INFLUENCE) {
            const proximity = 1 - dist / INFLUENCE;
            // Traveling ripple: a wave that moves outward from the
            // cursor over time rather than a static falloff.
            const ripple =
              Math.sin(dist / RIPPLE_WAVELENGTH - t * RIPPLE_SPEED) * 0.5 + 0.5;
            const force =
              proximity * MAX_PUSH * (0.5 + ripple * 0.5) * (1 + scrollBoost * 1.6);
            const angle = Math.atan2(dy, dx);
            px = x + Math.cos(angle) * force;
            py = y + Math.sin(angle) * force;
            radius += proximity * ripple * 2.2;
            tint = proximity * ripple;
          }

          py += scrollVelocity.current * -0.16;

          const cr = Math.round(255 + (ACCENT.r - 255) * tint);
          const cg = Math.round(255 + (ACCENT.g - 255) * tint);
          const cb = Math.round(255 + (ACCENT.b - 255) * tint);
          const alpha = 0.35 + ambientLift * 0.2 + tint * 0.35 + scrollBoost * 0.4;

          context.beginPath();
          context.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${Math.min(1, alpha)})`;
          context.arc(px, py, radius, 0, Math.PI * 2);
          context.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function handlePointerLeave() {
      mouse.current = { x: -9999, y: -9999 };
    }

    function handleScroll() {
      scrollY.current = window.scrollY;
    }

    resize();

    // Only run the rAF loop while the hero is actually on screen --
    // once scrolled past, there's no reason to keep redrawing a canvas
    // nobody's looking at.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) draw();
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
        <h1
          ref={headingRef}
          className="font-[family-name:var(--font-display-h1)] text-center text-[9vw] md:text-[5vw] leading-[0.95] text-white"
        >
          The Sound of Ideas
        </h1>
      </div>
    </section>
  );
}
