"use client";

import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { useScrollEdgeBlur } from "@/lib/useScrollEdgeBlur";
import type { SanityImageSource } from "@sanity/image-url";

type ProjectListItem = {
  slug: string;
  name: string;
  year: string;
  category: string;
  coverImage?: SanityImageSource | null;
};

/**
 * Homepage highlight strip, rebuilt 2026-08-23 — replaces the
 * full-bleed sticky-stack slideshow (ProjectSlideshow.tsx, deleted).
 * That slideshow was reverted on request: this section now uses the
 * same plain grid layout as the /projects page (ProjectCard, same
 * component both places) instead of its own bespoke full-viewport
 * treatment. Content is editor-curated via the `homepageHighlight`
 * boolean on the project schema (see project.ts), capped at 5 in the
 * query itself (homepageHighlightsQuery, queries.ts) rather than here.
 */
export default function HomepageHighlights({ projects }: { projects: ProjectListItem[] }) {
  const headingRef = useScrollEdgeBlur<HTMLHeadingElement>();
  return (
    <section className="w-full bg-black px-6 md:px-10 py-24">
      <h2
        ref={headingRef}
        className="font-[family-name:var(--font-display-h1)] text-3xl md:text-5xl text-white mb-12"
      >
        Selected Work
      </h2>
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      ) : (
        <p className="text-white/50">Nothing flagged for the homepage yet.</p>
      )}
      <div className="flex justify-center pt-16">
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
