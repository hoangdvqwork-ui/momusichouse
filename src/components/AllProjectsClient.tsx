"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilterBar from "@/components/ProjectFilterBar";
import { filterProjects } from "@/lib/filterProjects";
import type { SanityImageSource } from "@sanity/image-url";

type ProjectListItem = {
  slug: string;
  name: string;
  year: string;
  category: string;
  coverImage?: SanityImageSource | null;
};

// Fixed display order, matches the schema's own category list — not
// the query's alphabetical sort. A category with nothing published yet
// (or nothing matching the current filter) is skipped rather than
// shown as an empty heading.
const CATEGORY_ORDER = [
  "Commercial & TVC Scoring",
  "Brand Sound & Sonic Identity",
  "Talent Booking & Artist Collaboration",
  "Live Event & Music Direction",
];

// /projects/all's client half, 2026-08-24 -- search+category filter
// bar on top of the grouped grid. Same filterProjects.ts logic as
// FeaturedProjectsClient.tsx (/projects); the category dropdown here
// mostly just jumps straight to one group, since search already
// narrows within a group too.
export default function AllProjectsClient({ projects }: { projects: ProjectListItem[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = useMemo(
    () => filterProjects(projects, search, category),
    [projects, search, category]
  );
  const groups = useMemo(
    () =>
      CATEGORY_ORDER.map((c) => ({
        category: c,
        projects: filtered.filter((p) => p.category === c),
      })).filter((g) => g.projects.length > 0),
    [filtered]
  );

  return (
    <>
      <div className="mb-16">
        <ProjectFilterBar
          categories={CATEGORY_ORDER}
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-white/50">No projects match that search.</p>
      ) : (
        <div className="flex flex-col gap-16">
          {groups.map(({ category: c, projects: categoryProjects }) => (
            <div key={c}>
              <h2 className="text-white/50 text-sm uppercase tracking-wide mb-6">{c}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
                {categoryProjects.map((project) => (
                  <ProjectCard key={project.slug} {...project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
