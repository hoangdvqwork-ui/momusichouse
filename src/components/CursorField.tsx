"use client";

import { useEffect, useRef, useState } from "react";
import { beatDurationMs } from "@/lib/beat";

let ringId = 0;

/**
 * Sitewide "vibration" layer (suggestion set from the hero tuning pass,
 * extended everywhere on request 2026-08-20; swapped from a solid glow
 * to a frosted-glass lens on request 2026-08-21): a tinted backdrop-blur
 * circle follows the cursor, distorting whatever's beneath it, pulsing
 * on the shared beat clock — and every click sends out an expanding
 * glass ring, a literal sound-ping. Fixed overlay, mounted once in
 * (site)/layout.tsx so it's outside the Studio route entirely.
 * `pointer-events: none` throughout, never intercepts real clicks.
 */
export default function CursorField() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [rings, setRings] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      const glow = glowRef.current;
      if (!glow) return;
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }

    function handleClick(e: MouseEvent) {
      const id = ringId++;
      setRings((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRings((prev) => prev.filter((r) => r.id !== id));
      }, 1000);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20"
        style={{
          animation: `cursor-field-glass-pulse ${beatDurationMs(4)}ms ease-in-out infinite`,
        }}
      />
      {rings.map((ring) => (
        <span
          key={ring.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
          style={{ left: ring.x, top: ring.y, animation: "cursor-field-glass-ring 1s ease-out forwards" }}
        />
      ))}
    </div>
  );
}
