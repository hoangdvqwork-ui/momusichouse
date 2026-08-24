import type { MetadataRoute } from "next";

// SEO audit ("Signal Check"), 2026-08-24 -- robots.txt didn't exist at
// all before this (404). Allows everything indexable, including AI
// crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) -- a deliberate
// choice, not an accident of a missing file: no reason for a
// creative-services studio to opt out of AI-answer visibility, and
// most AI-answer citations come from pages that already rank well in
// normal search anyway. /studio (Sanity Studio, embedded) and /api
// (server routes, not content) are the only real exclusions.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api"],
    },
    sitemap: "https://www.momusichouse.com/sitemap.xml",
  };
}
