import DotGridHero from "@/components/homepage/DotGridHero";
import ScrollEdgeGlow from "@/components/homepage/ScrollEdgeGlow";
import HomepageHighlights from "@/components/homepage/HomepageHighlights";
import ShowreelSection from "@/components/homepage/ShowreelSection";
import About from "@/components/homepage/About";
import TalentsSection from "@/components/homepage/TalentsSection";
import MixerTeaser from "@/components/homepage/MixerTeaser";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { homepageHighlightsQuery } from "@/sanity/lib/queries";

// Published only, deliberate — see src/sanity/lib/queries.ts.
export default async function Home() {
  const highlights = await client.fetch(homepageHighlightsQuery, {}, { cache: "no-store" });

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
      <MixerTeaser />
    </>
  );
}
