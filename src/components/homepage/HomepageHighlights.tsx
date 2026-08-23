"use client";

import Link from "next/link";
import FocusGallery from "@/components/FocusGallery";
import { useScrollEdgeBlur } from "@/lib/useScrollEdgeBlur";
import type { GalleryProject } from "@/components/FocusGallery";

/**
 * Homepage highlight strip. History: full-bleed sticky-stack slideshow
 * (ProjectSlideshow.tsx) -> plain ProjectCard grid -> this, 2026-08-23
 * -- now the same FocusGallery component /projects uses (`scoped`
 * mode: section-bounded sticky rails instead of viewport-fixed ones,
 * see that component's comment), so the homepage's "Selected Work"
 * section behaves and looks exactly like the featured projects view,
 * just capped at 5 instead of 20. Content is editor-curated via the
 * `homepageHighlight` boolean on the project schema (project.ts),
 * capped at 5 in the query itself (homepageHighlightsQuery,
 * queries.ts) rather than here.
 */
export default function HomepageHighlights({ projects }: { projects: GalleryProject[] }) {
  const headingRef = useScrollEdgeBlur<HTMLHeadingElement>();
  return (
    <section className="w-full bg-black">
      <div className="px-6 md:px-10 pt-24">
        <h2
          ref={headingRef}
          className="font-[family-name:var(--font-display-h1)] text-3xl md:text-5xl text-white"
        >
          Selected Work
        </h2>
      </div>
      {projects.length > 0 ? (
        <FocusGallery projects={projects} scoped />
      ) : (
        <p className="px-6 md:px-10 py-24 text-white/50">Nothing flagged for the homepage yet.</p>
      )}
      <div className="flex justify-center pb-16">
        <Link
          href="/projects"
          className="text-white text-sm underline underline-offset-4 hover:text-accent transition-colors"
        >
          See all projects
        </Link>
      </div>
    </section>
  );
}
