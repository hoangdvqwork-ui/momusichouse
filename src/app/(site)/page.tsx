import DotGridHero from "@/components/homepage/DotGridHero";
import ScrollEdgeGlow from "@/components/homepage/ScrollEdgeGlow";
import HomepageHighlights from "@/components/homepage/HomepageHighlights";
import ShowreelSection from "@/components/homepage/ShowreelSection";
import About from "@/components/homepage/About";
import TalentsSection from "@/components/homepage/TalentsSection";
// MixerTeaser hidden 2026-08-24 on request -- component untouched,
// just not rendered. Re-add the import + <MixerTeaser /> below to
// bring it back.
// import MixerTeaser from "@/components/homepage/MixerTeaser";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { homepageHighlightsQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";

// SEO audit ("Signal Check"), 2026-08-24 -- homepage previously had no
// metadata of its own at all, falling back to the root layout's
// generic default. This is the page most likely to actually get
// clicked from a search result, so it gets the most specific pair.
export const metadata: Metadata = {
  title: "Mõ Music House — Music Production & Sonic Branding | Vietnam",
  description:
    "Commercial scoring, sonic branding, talent booking, and live event music direction from Mõ Music House. Music for ideas that need to be heard.",
  alternates: { canonical: "/" },
};

// Published only, deliberate — see src/sanity/lib/queries.ts.
export default async function Home() {
  const highlights = await client.fetch(homepageHighlightsQuery, {}, { next: { revalidate: 300 } });

  return (
    <>
      {/* 2026-08-23: FlowBackground (fixed, sitewide dot-grid) reverted
          -- DotGridHero owns its own canvas again, scoped to just this
          first section. See that file's comment. */}
      <ScrollEdgeGlow />

      <div className="snap-section">
        <DotGridHero />
      </div>
      <HomepageHighlights projects={highlights} />
      <ShowreelSection />
      <About />
      <TalentsSection />
      <Footer />
    </>
  );
}
