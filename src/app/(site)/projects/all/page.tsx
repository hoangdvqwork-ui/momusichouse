import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import PageHeading from "@/components/PageHeading";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";

export const metadata = {
  title: "Full Project Library | Mõ Music House",
  description:
    "The complete list of commercial scoring, sonic branding, talent collaboration, and live event music direction work from Mõ Music House.",
};

type ProjectListItem = {
  slug: string;
  name: string;
  year: string;
  category: string;
  coverImage?: SanityImageSource | null;
};

// Fixed display order, matches the schema's own category list — not
// the query's alphabetical sort. A category with nothing published yet
// is skipped rather than shown as an empty heading.
const CATEGORY_ORDER = [
  "Commercial & TVC Scoring",
  "Brand Sound & Sonic Identity",
  "Talent Booking & Artist Collaboration",
  "Live Event & Music Direction",
];

// The complete, uncurated project list, 2026-08-23 — /projects itself
// now shows only the editor-curated `featured` subset (FocusGallery),
// this page is the "Full project library" link from there: every
// published project, no flag required, grouped by category, plain
// 3-column grid (restored from before FocusGallery existed).
export default async function AllProjectsPage() {
  const projects: ProjectListItem[] = await client.fetch(allProjectsQuery, {}, { cache: "no-store" });

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    projects: projects.filter((p) => p.category === category),
  })).filter((g) => g.projects.length > 0);

  return (
    <>
      <div className="px-6 md:px-10 pt-32 pb-24 overflow-hidden">
        <PageHeading className="font-[family-name:var(--font-display-h1)] text-4xl md:text-6xl text-white mb-16">
          Full Project Library
        </PageHeading>
        {projects.length === 0 ? (
          <p className="text-white/50">Nothing published yet.</p>
        ) : (
          <div className="flex flex-col gap-16">
            {groups.map(({ category, projects: categoryProjects }) => (
              <div key={category}>
                <h2 className="text-white/50 text-sm uppercase tracking-wide mb-6">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
                  {categoryProjects.map((project) => (
                    <ProjectCard key={project.slug} {...project} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
