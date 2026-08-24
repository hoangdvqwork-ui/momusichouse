import Footer from "@/components/Footer";
import AllProjectsClient from "@/components/AllProjectsClient";
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

// The complete, uncurated project list, 2026-08-23 — /projects itself
// now shows only the editor-curated `featured` subset (FocusGallery),
// this page is the "Full project library" link from there: every
// published project, no flag required, grouped by category, plain
// 3-column grid (restored from before FocusGallery existed). 2026-08-24:
// search+category filter moved into AllProjectsClient.tsx (client,
// needs state).
export default async function AllProjectsPage() {
  const projects: ProjectListItem[] = await client.fetch(allProjectsQuery, {}, { cache: "no-store" });

  return (
    <>
      <div className="px-6 md:px-10 pt-32 pb-24 overflow-hidden">
        <PageHeading className="font-[family-name:var(--font-display-h1)] text-4xl md:text-6xl text-white mb-16">
          Full Project Library
        </PageHeading>
        {projects.length === 0 ? (
          <p className="text-white/50">Nothing published yet.</p>
        ) : (
          <AllProjectsClient projects={projects} />
        )}
      </div>
      <Footer />
    </>
  );
}
