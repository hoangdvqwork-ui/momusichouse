import HalftonePortrait from "./HalftonePortrait";

const TALENTS = [
  { name: "mess.", href: "/talents/mess", src: "/talents/mess.jpg" },
  { name: "Tailor M8S", href: "/talents/tailor-m8s", src: "/talents/tailorm8s.jpg" },
];

export default function TalentsSection() {
  return (
    <section className="w-full bg-black">
      {/* Mobile: inset gutter instead of full-bleed (px-4/gap-4/py-4,
          request 2026-08-22). Desktop keeps the original edge-to-edge
          two-column layout, untouched. */}
      <div className="grid grid-cols-1 gap-4 px-4 py-4 md:gap-0 md:px-0 md:py-0 md:grid-cols-2">
        {TALENTS.map((talent) => (
          <HalftonePortrait key={talent.href} name={talent.name} href={talent.href} src={talent.src} />
        ))}
      </div>
    </section>
  );
}
