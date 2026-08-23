"use client";

import type { ReactNode } from "react";
import { useScrollEdgeBlur } from "@/lib/useScrollEdgeBlur";

/**
 * Shared <h1> for every content page's top-of-page title (Projects,
 * Project detail, Contact, Help You Prompt, Talent detail), 2026-08-23
 * -- carries useScrollEdgeBlur so the scroll-blur-and-glow effect
 * (originally hero-only, then extended to homepage headings) now
 * applies sitewide, not just on the homepage. One component instead of
 * repeating the hook + ref wiring on every page's own h1.
 */
export default function PageHeading({
  children,
  className = "font-[family-name:var(--font-display-h1)] text-4xl md:text-6xl text-white",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useScrollEdgeBlur<HTMLHeadingElement>();
  return (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  );
}
