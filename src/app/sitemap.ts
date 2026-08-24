import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

// SEO audit ("Signal Check"), 2026-08-24 -- sitemap.xml didn't exist at
// all before this (404), and had never been submitted to Search
// Console. Includes every published project's detail page (not just
// the featured/homepage-highlighted subsets -- those flags control
// which *listing* a project shows up in, not whether its own detail
// page is a real, reachable, indexable URL) plus the two talent pages
// (hardcoded to match TalentsSection.tsx's own list -- there's no
// Sanity-backed talent collection to query yet) and every static page.
const BASE_URL = "https://www.momusichouse.com";
const TALENT_SLUGS = ["mess", "tailor-m8s"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects: { slug: string; updatedAt: string }[] = await client.fetch(
    `*[_type == "project" && defined(slug.current)]{"slug": slug.current, "updatedAt": _updatedAt}`
  );

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/projects`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/projects/all`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/talents`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/help-you-prompt`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly" as const, priority: 0.5 },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  const talentPages: MetadataRoute.Sitemap = TALENT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/talents/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...talentPages, ...projectPages];
}
