import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Footer from "@/components/Footer";
import HeroMedia from "@/components/HeroMedia";
import PageHeading from "@/components/PageHeading";
import ProjectGallery from "@/components/ProjectGallery";
import { client } from "@/sanity/lib/client";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug }, { next: { revalidate: 300 } });
  if (!project) return {};

  // SEO audit ("Signal Check"), 2026-08-24 -- seoDescription has no
  // fallback when a project doesn't have one drafted yet (unlike
  // seoTitle, which already falls back to `${name} | Mõ Music House`
  // below), so the <meta description> tag was silently omitted
  // entirely on any project missing it. Falls back to a plain,
  // non-fabricated line built from fields every project actually has.
  const description =
    project.seoDescription || `${project.name} — ${project.category}, ${project.year || "Mõ Music House"}.`;
  const title = project.seoTitle || `${project.name} | Mõ Music House`;
  const ogImage = project.coverImage
    ? [{ url: urlFor(project.coverImage).width(1200).height(630).fit("crop").url() }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title, description, images: ogImage },
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
  const project = await client.fetch(projectBySlugQuery, { slug }, { next: { revalidate: 300 } });
  if (!project) notFound();

  // CreativeWork structured data, 2026-08-24 -- only fields the
  // document actually has populated make it in (no fabricated
  // uploadDate/duration for the video sub-property, etc.).
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    ...(project.seoDescription ? { description: project.seoDescription } : {}),
    ...(project.year ? { datePublished: project.year } : {}),
    ...(project.category ? { genre: project.category } : {}),
    ...(project.coverImage
      ? { image: urlFor(project.coverImage).width(1200).height(900).fit("crop").url() }
      : {}),
    ...(project.credit ? { creditText: project.credit } : {}),
    creator: { "@type": "Organization", name: "Mõ Music House" },
  };

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

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }}
      />

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

        {project.gallery && (
          <ProjectGallery images={project.gallery} projectName={project.name} />
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
