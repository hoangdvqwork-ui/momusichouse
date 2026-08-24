import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import PageHeading from "@/components/PageHeading";

// Bios not written yet, real prerequisite per website-structure.md
// ("Each profile should express taste, musical language, strengths, and
// suitable brief types") — don't fabricate, this is a structural stub.
const TALENTS: Record<string, { name: string }> = {
  mess: { name: "mess." },
  "tailor-m8s": { name: "Tailor M8S" },
};

// SEO audit ("Signal Check"), 2026-08-24 -- these pages had no metadata
// at all before this, falling back to the generic sitewide default.
// Description kept as modest as the page itself (no bio yet to draw
// from) rather than inventing one.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const talent = TALENTS[slug];
  if (!talent) return {};
  return {
    title: `${talent.name} | Mõ Music House Talents`,
    description: `${talent.name} — part of the talent roster at Mõ Music House.`,
    alternates: { canonical: `/talents/${slug}` },
    openGraph: {
      title: `${talent.name} | Mõ Music House Talents`,
      description: `${talent.name} — part of the talent roster at Mõ Music House.`,
    },
  };
}

export default async function TalentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const talent = TALENTS[slug];
  if (!talent) notFound();

  return (
    <>
      <div className="px-6 md:px-10 pt-32 pb-32 min-h-[60vh]">
        <PageHeading className="font-[family-name:var(--font-display-h1)] text-5xl md:text-7xl text-white mb-8">
          {talent.name}
        </PageHeading>
        <p className="text-white/50 max-w-lg">
          Bio, taste, and musical language not written yet, this page is a
          structural placeholder.
        </p>
      </div>
      <Footer />
    </>
  );
}
