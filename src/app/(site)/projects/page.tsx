import Footer from "@/components/Footer";
import FeaturedProjectsClient from "@/components/FeaturedProjectsClient";
import { client } from "@/sanity/lib/client";
import { featuredProjectsQuery } from "@/sanity/lib/queries";
import type { GalleryProject } from "@/components/FocusGallery";

export const metadata = {
  title: "Projects | Mõ Music House",
  description:
    "Commercial scoring, sonic branding, talent collaboration, and live event music direction from Mõ Music House.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Mõ Music House",
    description:
      "Commercial scoring, sonic branding, talent collaboration, and live event music direction from Mõ Music House.",
  },
};

// Default view: FocusGallery (scroll-focus stack), editor-curated via
// the `featured` boolean (project.ts), capped at 20
// (featuredProjectsQuery). 2026-08-23: "the featured projects is shown
// exactly how the focus gallery is now" -- the earlier plain-3-column
// revert only applies to the full, uncurated library at /projects/all.
// 2026-08-24: search+category filter and a top "Project Library"
// button moved into FeaturedProjectsClient.tsx (client, needs state).
export default async function ProjectsPage() {
  const projects: GalleryProject[] = await client.fetch(featuredProjectsQuery, {}, { next: { revalidate: 300 } });

  return (
    <>
      <div className="pt-32 pb-24">
        {projects.length === 0 ? (
          <p className="text-center text-white/50">Nothing flagged as featured yet.</p>
        ) : (
          <FeaturedProjectsClient projects={projects} />
        )}
      </div>
      <Footer />
    </>
  );
}
