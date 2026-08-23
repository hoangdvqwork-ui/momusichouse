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

function Panel({
  project,
  strength,
  zIndex,
}: {
  project: ProjectListItem;
  strength: number;
  zIndex: number;
}) {
  const ref = useParallax<HTMLDivElement>(strength);
  return (
    // Outer div is the sticky "track" -- taller than the viewport
    // (130vh) so the inner sticky panel actually has room to hold in
    // place for a beat before the next slide's own track arrives and
    // covers it. A track exactly h-screen (first attempt) gives the
    // sticky child zero room to stick: its own box starts and ends its
    // stick range at the same scroll instant, so nothing actually
    // pins in view -- confirmed via live measurement, all 4 panels sat
    // at nearly-identical rects instead of stacking as distinct slides.
    <div className="relative h-[130vh] w-full">
      <div ref={ref} className="sticky top-0 h-screen w-full" style={{ zIndex }}>
        <Link
          href={`/projects/${project.slug}`}
          className="group relative block h-full w-full overflow-hidden bg-black"
        >
          {project.coverImage ? (
            // unoptimized: see ProjectCard.tsx's comment -- Sanity's CDN
            // already resizes/crops via urlFor(), Next's own optimization
            // pipeline is both redundant and quota-limited on Vercel.
            <Image
              src={urlFor(project.coverImage).width(1600).height(1600).fit("crop").url()}
              alt={project.name}
              fill
              unoptimized
              sizes="100vw"
              className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
          <span className="absolute inset-0 flex items-center justify-center text-center px-4 text-white text-3xl md:text-5xl font-[family-name:var(--font-display-h1)]">
            {project.name}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function ProjectSlideshow({ projects }: { projects: ProjectListItem[] }) {
  const highlights = CATEGORY_ORDER.map((category) =>
    projects.find((p) => p.category === category)
  ).filter((p): p is ProjectListItem => Boolean(p));

  return (
    <section className="w-full bg-black/75">
      {/* Full-bleed SLIDESHOW, corrected again 2026-08-23: the previous
          version had each panel individually full-viewport but stacked
          in plain document flow -- correct sizing, but scrolling through
          them just reads as one long continuous page, not a slideshow.
          A real slideshow means one slide fully covers the screen and
          the NEXT one visibly replaces it. Built with `position: sticky`
          (not scroll-snap -- see globals.css's comment on the four failed
          mandatory-snap attempts and the nested-scroll-container height
          collapse that kept happening): each panel sticks to the top of
          the viewport once it reaches it, and stays pinned there for a
          beat (each `Panel`'s outer track is 130vh -- see that
          component's comment for why the track needs to be taller than
          the sticky child itself) while the next panel's track arrives
          and covers it (later panels get a higher z-index, so panel 2
          visually slides over panel 1, not the reverse). No JS
          scroll-jacking, no risk of trapping the page scroll -- purely
          CSS position + stacking, same reliability profile as the rest
          of this experiment's scroll effects. Title always visible,
          centered per panel. */}
      {highlights.length > 0 ? (
        <div className="relative w-full">
          {highlights.map((project, i) => (
            <Panel
              key={project.slug}
              project={project}
              strength={PARALLAX_STRENGTHS[i]}
              zIndex={i + 1}
            />
          ))}
        </div>
      ) : (
        <p className="text-white/50 text-center py-20">Nothing published yet.</p>
      )}

      <div className="flex justify-center py-10">
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
