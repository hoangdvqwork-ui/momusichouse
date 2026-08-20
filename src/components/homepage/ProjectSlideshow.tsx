"use client";

import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { useParallax } from "@/lib/useParallax";

// MVP highlight strip — first project per category, keeps this in sync
// with the shared placeholder data instead of its own list.
const HIGHLIGHTS = (
  ["Commercial & TVC Scoring", "Brand Sound & Sonic Identity", "Talent Booking & Artist Collaboration", "Live Event & Music Direction"] as const
).map((category) => PROJECTS.find((p) => p.category === category)!);

// Staggered per-panel depth, alternating direction so the row doesn't
// drift as one flat block, part of the sitewide parallax pass.
const PARALLAX_STRENGTHS = [18, -14, 22, -18];

function Panel({ project, strength }: { project: (typeof HIGHLIGHTS)[number]; strength: number }) {
  const ref = useParallax<HTMLDivElement>(strength);
  return (
    <div ref={ref} className="flex-1 h-[50vh] md:h-[60vh]">
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block h-full w-full overflow-hidden bg-white/5"
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />
        <span className="absolute inset-0 flex items-center justify-center text-center px-4 text-white text-lg md:text-xl font-[family-name:var(--font-display-h2h3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.name}
        </span>
      </Link>
    </div>
  );
}

export default function ProjectSlideshow() {
  return (
    <section className="min-h-screen w-full bg-black flex flex-col justify-center gap-10 px-6 md:px-10 py-20 overflow-hidden">
      <div className="flex w-full flex-col md:flex-row gap-4 md:gap-6">
        {HIGHLIGHTS.map((project, i) => (
          <Panel key={project.slug} project={project} strength={PARALLAX_STRENGTHS[i]} />
        ))}
      </div>

      <Link
        href="/projects"
        className="mx-auto text-white text-sm underline underline-offset-4 hover:text-accent transition-colors"
      >
        See all projects
      </Link>
    </section>
  );
}
