"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import FocusGallery from "@/components/FocusGallery";
import ProjectFilterBar from "@/components/ProjectFilterBar";
import { filterProjects } from "@/lib/filterProjects";
import type { GalleryProject } from "@/components/FocusGallery";

// /projects' client half, 2026-08-24: the "Project Library" button was
// previously only at the page's bottom (after scrolling all 20 items);
// this puts one at the top too, alongside a search+category filter bar
// -- filtering narrows the FocusGallery stack itself (a project that
// doesn't match search/category just isn't in the array FocusGallery
// receives, same as if it had never been "featured").
//
// `projects` is now *every* published project (galleryProjectsQuery),
// not just the featured 20 -- 2026-08-24, second pass: picking a
// category is supposed to surface every project in it, not just
// whichever of them also happen to be flagged featured. So the pool is
// featured-only with no category picked (the intended curated default
// view), but switches to the full set the moment a category is
// selected. Search stays scoped to whichever pool is currently active.
export default function FeaturedProjectsClient({ projects }: { projects: GalleryProject[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))).sort(),
    [projects]
  );
  const pool = category ? projects : projects.filter((p) => p.featured);
  const filtered = useMemo(
    () => filterProjects(pool, search, category),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [projects, search, category]
  );

  return (
    <>
      <div className="px-6 md:px-10 pb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link
          href="/projects/all"
          className="border border-white/20 px-6 py-3 text-sm text-white uppercase tracking-wide hover:border-accent hover:text-accent transition-colors w-fit"
        >
          Project Library
        </Link>
        <div className="md:max-w-xl md:w-full">
          <ProjectFilterBar
            categories={categories}
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <FocusGallery projects={filtered} />
      ) : (
        <p className="text-center text-white/50 py-24">No projects match that search.</p>
      )}

      <div className="flex justify-center pt-16">
        <Link
          href="/projects/all"
          className="text-white text-sm underline underline-offset-4 hover:text-accent transition-colors"
        >
          Full project library
        </Link>
      </div>
    </>
  );
}
