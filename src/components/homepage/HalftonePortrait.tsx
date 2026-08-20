"use client";

import { useEffect, useRef, useState } from "react";
import { beatDurationMs } from "@/lib/beat";

const ACCENT = { r: 0xf7, g: 0xd1, b: 0x01 };
const IDLE_PULSE = `portrait-idle-pulse ${beatDurationMs(8)}ms ease-in-out infinite`;

/**
 * Hover-to-halftone portrait. Same sampling/interactivity architecture
 * as the earlier ASCII version (swapped 2026-08-20 on request): samples
 * the source image (or a placeholder gradient when no photo exists yet)
 * at a fine grid, draws a dot per cell sized by how dark that pixel is,
 * classic print-halftone convention (more ink where the image is
 * darker). Dots near the cursor grow and tint toward the site's accent
 * color for a live feel rather than a flat on/off swap.
 */
export default function HalftonePortrait({
  src,
  name,
  href,
}: {
  src?: string;
  name: string;
  href: string;
}) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (!hovering) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLS = 90;
    let raf = 0;
    let sample: Uint8ClampedArray | null = null;
    let sampleW = 0;
    let sampleH = 0;

    function buildSample() {
      const off = document.createElement("canvas");
      off.width = COLS;
      const aspect = container!.clientHeight / container!.clientWidth;
      const rows = Math.round(COLS * aspect);
      off.height = rows;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;

      if (src) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          // Replicate the visible <img>'s object-cover crop here too —
          // drawing the full image into a COLSxrows box regardless of
          // its own aspect ratio was stretching it (bug, caught
          // 2026-08-20), the halftone didn't match what's actually
          // shown before hover.
          const iw = img.naturalWidth;
          const ih = img.naturalHeight;
          const targetAspect = rows / COLS;
          const srcAspect = ih / iw;
          let sx = 0, sy = 0, sw = iw, sh = ih;
          if (srcAspect > targetAspect) {
            sh = iw * targetAspect;
            sy = (ih - sh) / 2;
          } else {
            sw = ih / targetAspect;
            sx = (iw - sw) / 2;
          }
          offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, COLS, rows);
          sample = offCtx.getImageData(0, 0, COLS, rows).data;
          sampleW = COLS;
          sampleH = rows;
        };
      } else {
        const gradient = offCtx.createLinearGradient(0, 0, COLS, rows);
        gradient.addColorStop(0, "#1a1a1a");
        gradient.addColorStop(1, "#4a4a4a");
        offCtx.fillStyle = gradient;
        offCtx.fillRect(0, 0, COLS, rows);
        sample = offCtx.getImageData(0, 0, COLS, rows).data;
        sampleW = COLS;
        sampleH = rows;
      }
    }

    function resize() {
      canvas!.width = container!.clientWidth;
      canvas!.height = container!.clientHeight;
    }

    function draw() {
      if (!sample) {
        raf = requestAnimationFrame(draw);
        return;
      }
      const w = canvas!.width;
      const h = canvas!.height;
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, w, h);

      const cellW = w / sampleW;
      const cellH = h / sampleH;
      const maxRadius = Math.max(cellW, cellH) * 0.62;

      for (let row = 0; row < sampleH; row++) {
        for (let col = 0; col < sampleW; col++) {
          const idx = (row * sampleW + col) * 4;
          const r = sample[idx];
          const g = sample[idx + 1];
          const b = sample[idx + 2];
          const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
          const darkness = 1 - luminance;

          const px = col * cellW + cellW / 2;
          const py = row * cellH + cellH / 2;
          const dx = px - mouse.current.x;
          const dy = py - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const boost = Math.max(0, 1 - dist / 200);

          const radius = maxRadius * Math.min(1, darkness * 0.85 + boost * 0.5);
          if (radius < 0.4) continue;

          const t = boost; // 0 = white dot, 1 = accent-tinted
          const cr = Math.round(255 + (ACCENT.r - 255) * t);
          const cg = Math.round(255 + (ACCENT.g - 255) * t);
          const cb = Math.round(255 + (ACCENT.b - 255) * t);

          ctx!.beginPath();
          ctx!.fillStyle = `rgba(${cr}, ${cg}, ${cb}, 0.9)`;
          ctx!.arc(px, py, radius, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    buildSample();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [hovering, src]);

  return (
    <a
      ref={containerRef}
      href={href}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={(e) => {
        const rect = containerRef.current!.getBoundingClientRect();
        mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }}
      className="group relative block h-[70vh] md:h-[80vh] w-full overflow-hidden bg-white/5"
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- sampled onto a canvas at hover time, next/image's optimization isn't relevant here
        <img
          src={src}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200"
          style={{
            opacity: hovering ? 0 : 1,
            animation: hovering ? "none" : IDLE_PULSE,
          }}
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-[#4a4a4a] transition-opacity duration-200"
          style={{
            opacity: hovering ? 0 : 1,
            animation: hovering ? "none" : IDLE_PULSE,
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 transition-opacity duration-200"
        style={{ opacity: hovering ? 1 : 0 }}
      />
      <span className="absolute bottom-6 left-6 text-white text-xl font-[family-name:var(--font-display-h2h3)]">
        {name}
      </span>
    </a>
  );
}
