import Link from "next/link";
import Footer from "@/components/Footer";
import FocusGallery from "@/components/FocusGallery";
import { client } from "@/sanity/lib/client";
import { featuredProjectsQuery } from "@/sanity/lib/queries";
import type { GalleryProject } from "@/components/FocusGallery";

export const metadata = {
  title: "Projects | Mõ Music House",
  description:
    "Commercial scoring, sonic branding, talent collaboration, and live event music direction from Mõ Music House.",
};

// Default view: FocusGallery (scroll-focus stack), editor-curated via
// the `featured` boolean (project.ts), capped at 20
// (featuredProjectsQuery). 2026-08-23: "the featured projects is shown
// exactly how the focus gallery is now" -- the earlier plain-3-column
// revert only applies to the full, uncurated library at /projects/all,
// linked below.
export default async function ProjectsPage() {
  const projects: GalleryProject[] = await client.fetch(featuredProjectsQuery, {}, { cache: "no-store" });

  return (
    <>
      <div className="pt-32 pb-24">
        {projects.length === 0 ? (
          <p className="text-center text-white/50">Nothing flagged as featured yet.</p>
        ) : (
          <FocusGallery projects={projects} />
        )}
        <div className="flex justify-center pt-16">
          <Link
            href="/projects/all"
            className="border border-white/20 px-6 py-3 text-sm text-white uppercase tracking-wide hover:border-accent hover:text-accent transition-colors"
          >
            Full project library
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
