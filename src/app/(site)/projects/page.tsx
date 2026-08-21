import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url";

export const metadata = {
  title: "Projects | Mõ Music House",
  description:
    "Commercial scoring, sonic branding, talent collaboration, and live event music direction from Mõ Music House.",
};

type ProjectListItem = {
  slug: string;
  name: string;
  year: string;
  category: string;
  coverImage?: SanityImageSource | null;
};

// Fixed display order, not the query's alphabetical sort. A category
// with nothing published yet is skipped rather than shown as an empty
// heading. Commercial & TVC Scoring pushed to the bottom on request
// 2026-08-21 -- diverges from ProjectSlideshow.tsx's homepage order,
// deliberately: this page's order is about how the grid should read
// top-to-bottom, not the schema's category list order.
const CATEGORY_ORDER = [
  "Brand Sound & Sonic Identity",
  "Talent Booking & Artist Collaboration",
  "Live Event & Music Direction",
  "Commercial & TVC Scoring",
];

// Published only, deliberate — see src/sanity/lib/queries.ts.
export default async function ProjectsPage() {
  const projects: ProjectListItem[] = await client.fetch(allProjectsQuery, {}, { cache: "no-store" });

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    projects: projects.filter((p) => p.category === category),
  })).filter((g) => g.projects.length > 0);

  return (
    <>
      <div className="px-6 md:px-10 pt-32 pb-24 overflow-hidden">
        <h1 className="font-[family-name:var(--font-display-h1)] text-4xl md:text-6xl text-white mb-16">
          Projects
        </h1>
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
