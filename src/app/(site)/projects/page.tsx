import Footer from "@/components/Footer";
import FocusGallery from "@/components/FocusGallery";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import type { GalleryProject } from "@/components/FocusGallery";

export const metadata = {
  title: "Projects | Mõ Music House",
  description:
    "Commercial scoring, sonic branding, talent collaboration, and live event music direction from Mõ Music House.",
};

// Fixed display order, not the query's alphabetical sort. Carried over
// from the old grid layout -- still used here to order the flat gallery
// stack, just without the visible category headers the grid used to
// have (Focus Gallery's reference has no section dividers, one
// continuous stack). Commercial & TVC Scoring pushed to the bottom on
// request 2026-08-21.
const CATEGORY_ORDER = [
  "Brand Sound & Sonic Identity",
  "Talent Booking & Artist Collaboration",
  "Live Event & Music Direction",
  "Commercial & TVC Scoring",
];

// Published only, deliberate — see src/sanity/lib/queries.ts.
export default async function ProjectsPage() {
  const projects: GalleryProject[] = await client.fetch(allProjectsQuery, {}, { cache: "no-store" });

  const ordered = CATEGORY_ORDER.flatMap((category) =>
    projects.filter((p) => p.category === category)
  );

  return (
    <>
      <div className="pt-32 pb-24">
        {ordered.length === 0 ? (
          <p className="text-center text-white/50">Nothing published yet.</p>
        ) : (
          <FocusGallery projects={ordered} />
        )}
      </div>
      <Footer />
    </>
  );
}
