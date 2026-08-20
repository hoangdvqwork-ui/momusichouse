import DotGridHero from "@/components/homepage/DotGridHero";
import ProjectSlideshow from "@/components/homepage/ProjectSlideshow";
import ShowreelSection from "@/components/homepage/ShowreelSection";
import About from "@/components/homepage/About";
import TalentsSection from "@/components/homepage/TalentsSection";
import MixerTeaser from "@/components/homepage/MixerTeaser";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { allProjectsQuery } from "@/sanity/lib/queries";

// Published only, deliberate — see src/sanity/lib/queries.ts.
export default async function Home() {
  const projects = await client.fetch(allProjectsQuery, {}, { cache: "no-store" });

  return (
    <>
      {/* Sections 1-2: snap-scroll clears the hero on the way into the
          slideshow. `proximity` (globals.css) is the known-safe,
          verified version. A local nested-scroll-container was tried
          three separate ways (see globals.css history) to get a real
          guaranteed `mandatory` snap without risking the page-wide trap
          an earlier `mandatory` attempt caused — all three hit a
          reproducible collapse (children losing their real height
          inside the overflow-y:scroll parent, confirmed via actual
          scrollable range, not just a stale measurement), root cause
          not resolved. Reverted rather than keep guessing. */}
      <div className="snap-section">
        <DotGridHero />
      </div>
      <div className="snap-section">
        <ProjectSlideshow projects={projects} />
      </div>
      <ShowreelSection />
      <About />
      <TalentsSection />
      <Footer />
      <MixerTeaser />
    </>
  );
}
