import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Footer from "@/components/Footer";
import HeroMedia from "@/components/HeroMedia";
import PageHeading from "@/components/PageHeading";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug }, { cache: "no-store" });
  if (!project) return {};
  return {
    title: project.seoTitle || `${project.name} | Mõ Music House`,
    description: project.seoDescription,
  };
}

// Published only, deliberate — see queries.ts. Unpublished drafts are
// reviewable in /studio, not on the live site.
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug }, { cache: "no-store" });
  if (!project) notFound();

  return (
    <>
      {/* pt-32: HeroMedia used to render flush at y=0, so the fixed nav
          floated directly over the video with zero clearance (real bug,
          caught 2026-08-21 — every other page's content already clears
          the nav via this page's own pt-32 on the text wrapper below,
          the video just wasn't inside it). */}
      <div className="pt-32">
        <HeroMedia
          type={project.heroMediaType}
          videoUrl={project.heroVideoUrl}
          fileUrl={project.heroMediaFileUrl}
        />
      </div>

      <div className="px-6 md:px-10 pb-32">
        <span className="text-white/50 text-xs uppercase tracking-wide">
          {project.category} · {project.year}
        </span>
        <PageHeading className="font-[family-name:var(--font-display-h1)] text-4xl md:text-6xl text-white mt-4 mb-12 max-w-3xl">
          {project.name}
        </PageHeading>

        {project.caseStudy ? (
          <div className="prose prose-invert max-w-2xl text-white/80 [&_p]:mb-4">
            <PortableText value={project.caseStudy} />
          </div>
        ) : (
          <p className="text-white/50 max-w-lg">Case study copy not drafted yet.</p>
        )}

        {project.credit && (
          <p className="mt-16 text-white/50 text-sm whitespace-pre-line max-w-lg">
            {project.credit}
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}
