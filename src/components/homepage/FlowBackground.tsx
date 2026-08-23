"use client";

import { useEffect, useRef } from "react";
import { beatSin } from "@/lib/beat";

const ACCENT = { r: 0xf7, g: 0xd1, b: 0x01 };

/**
 * EXPERIMENT (branch: experiment/flowy-hero, 2026-08-21) — the dot-grid
 * canvas moved out of DotGridHero.tsx and made a fixed, viewport-sized,
 * always-mounted background layer for the whole homepage, instead of
 * living inside the first h-screen section only. Every section's own
 * background is now semi-transparent (see each component) so this shows
 * through consistently as you scroll, not just in the first viewport.
 *
 * "Reactive when scroll": rather than physically panning the canvas
 * (it's `position: fixed`, so it never moves — that's the point, it's a
 * backdrop, not scroll content), scroll VELOCITY feeds into the same
 * ambient-wave/ripple system the cursor already drives, smoothed via
 * lerp so a fast scroll visibly livens up the field and it settles back
 * to its idle ambient state once scrolling stops, rather than jittering
 * on every discrete scroll event.
 *
 * No more IntersectionObserver pause-when-offscreen (that only made
 * sense when the canvas was scoped to one section) — it's fixed, so
 * it's always "on screen" by definition. Paused instead on
 * document.visibilitychange (tab hidden) for battery/CPU.
 */
export default function FlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const scrollY = useRef(0);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SPACING = 29;
    const BASE_RADIUS = 1.3;
    const INFLUENCE = 200;
    const MAX_PUSH = 10;
    const RIPPLE_SPEED = 2.2;
    const RIPPLE_WAVELENGTH = 46;
    const AMBIENT_WAVELENGTH = 140;

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
      // decays back to ~0 once scrolling actually stops (raw delta goes
      // to 0, lerp chases it down).
      // 2026-08-22: lowered the divisor (was 36) so a normal scroll
      // speed saturates scrollBoost sooner -- tuned "more obvious" per
      // explicit request, was reading as too subtle at the old value.
      const rawVelocity = scrollY.current - lastScrollY;
      lastScrollY = scrollY.current;
      scrollVelocity.current += (rawVelocity - scrollVelocity.current) * 0.12;
      const scrollBoost = Math.min(1, Math.abs(scrollVelocity.current) / 18);

      for (let x = SPACING / 2; x < width; x += SPACING) {
        for (let y = SPACING / 2; y < height; y += SPACING) {
          const dx = x - mouse.current.x;
          const dy = y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const ambient =
            beatSin(t, 4, (x + y) / AMBIENT_WAVELENGTH) * 0.5 + 0.5;
          const ambientLift = ambient * (0.6 + scrollBoost * 2.2);

          let px = x;
          let py = y;
          let radius = BASE_RADIUS + ambientLift;
          let tint = 0;

          if (dist < INFLUENCE) {
            const proximity = 1 - dist / INFLUENCE;
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

          // A gentle vertical drift proportional to scroll velocity, on
          // top of the ambient/cursor displacement above -- the "flow"
          // that reads as the field responding to your scroll, not just
          // brightening. Drift and alpha boost both raised 2026-08-22,
          // same "more obvious" tuning pass as scrollBoost's divisor above.
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
      mouse.current = { x: e.clientX, y: e.clientY };
    }

    function handlePointerLeave() {
      mouse.current = { x: -9999, y: -9999 };
    }

    // Fades the canvas itself out once scrolled past the showreel
    // section, so this "flowy" treatment stays a homepage-opening
    // device rather than persisting behind the whole page forever.
    // Plain opacity on the canvas element, computed from the section's
    // own bounding rect -- separate from the per-dot draw loop above,
    // no need for this to run every animation frame.
    const FADE_DISTANCE = 400; // px past the showreel's bottom edge to complete the fade
    function updateFade() {
      const showreel = document.getElementById("showreel-section");
      let fadeOpacity = 1;
      if (showreel) {
        const rect = showreel.getBoundingClientRect();
        if (rect.bottom <= 0) {
          fadeOpacity = Math.max(0, 1 + rect.bottom / FADE_DISTANCE);
        }
      }
      canvas!.style.opacity = String(fadeOpacity);
    }

    function handleScroll() {
      scrollY.current = window.scrollY;
      updateFade();
    }

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        draw();
      }
    }

    resize();
    updateFade();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-screen w-screen transition-opacity duration-500"
      aria-hidden
    />
  );
}
