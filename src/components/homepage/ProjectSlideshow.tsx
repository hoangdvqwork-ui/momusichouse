"use client";

import Link from "next/link";
import Image from "next/image";
import { useParallax } from "@/lib/useParallax";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

type ProjectListItem = {
  slug: string;
  name: string;
  year: string;
  category: string;
  coverImage?: SanityImageSource | null;
};

// Fixed category order for the highlight strip, independent of the
// query's alphabetical sort. One panel per category, first published
// match wins; a category with nothing published yet is skipped rather
// than shown empty, so the strip degrades to 3 (or fewer) panels
// gracefully as content fills in.
const CATEGORY_ORDER = [
  "Commercial & TVC Scoring",
  "Brand Sound & Sonic Identity",
  "Talent Booking & Artist Collaboration",
  "Live Event & Music Direction",
] as const;

// Staggered per-panel depth, alternating direction so the row doesn't
// drift as one flat block, part of the sitewide parallax pass.
const PARALLAX_STRENGTHS = [18, -14, 22, -18];

function Panel({ project, strength }: { project: ProjectListItem; strength: number }) {
  const ref = useParallax<HTMLDivElement>(strength);
  return (
    <div ref={ref} className="flex-1 h-[50vh] md:h-[60vh]">
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block h-full w-full overflow-hidden bg-white/5"
      >
        {project.coverImage ? (
          // unoptimized: see ProjectCard.tsx's comment -- Sanity's CDN
          // already resizes/crops via urlFor(), Next's own optimization
          // pipeline is both redundant and quota-limited on Vercel.
          <Image
            src={urlFor(project.coverImage).width(800).height(960).fit("crop").url()}
            alt={project.name}
            fill
            unoptimized
            sizes="(min-width: 768px) 25vw, 100vw"
            className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
        <span className="absolute inset-0 flex items-center justify-center text-center px-4 text-white text-lg md:text-xl font-[family-name:var(--font-display-h2h3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.name}
        </span>
      </Link>
    </div>
  );
}

export default function ProjectSlideshow({ projects }: { projects: ProjectListItem[] }) {
  const highlights = CATEGORY_ORDER.map((category) =>
    projects.find((p) => p.category === category)
  ).filter((p): p is ProjectListItem => Boolean(p));

  return (
    <section className="min-h-screen w-full bg-black flex flex-col justify-center gap-10 px-6 md:px-10 py-20 overflow-hidden">
      {highlights.length > 0 ? (
        <div className="flex w-full flex-col md:flex-row gap-4 md:gap-6">
          {highlights.map((project, i) => (
            <Panel key={project.slug} project={project} strength={PARALLAX_STRENGTHS[i]} />
          ))}
        </div>
      ) : (
        <p className="text-white/50 text-center">Nothing published yet.</p>
      )}

      <Link
        href="/projects"
        className="mx-auto text-white text-sm underline underline-offset-4 hover:text-accent transition-colors"
      >
        See all projects
      </Link>
    </section>
  );
}
