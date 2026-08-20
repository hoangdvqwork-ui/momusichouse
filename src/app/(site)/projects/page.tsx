import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

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

// Published only, deliberate — see src/sanity/lib/queries.ts.
export default async function ProjectsPage() {
  const projects: ProjectListItem[] = await client.fetch(allProjectsQuery, {}, { cache: "no-store" });

  return (
    <>
      <div className="px-6 md:px-10 pt-32 pb-24 overflow-hidden">
        <h1 className="font-[family-name:var(--font-display-h1)] text-4xl md:text-6xl text-white mb-16">
          Projects
        </h1>
        {projects.length === 0 ? (
          <p className="text-white/50">Nothing published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} index={i} {...project} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
