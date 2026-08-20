import HalftonePortrait from "./HalftonePortrait";

const TALENTS = [
  { name: "mess.", href: "/talents/mess", src: "/talents/mess.jpg" },
  { name: "Tailor M8S", href: "/talents/tailor-m8s", src: "/talents/tailorm8s.jpg" },
];

export default function TalentsSection() {
  return (
    <section className="w-full bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {TALENTS.map((talent) => (
          <HalftonePortrait key={talent.href} name={talent.name} href={talent.href} src={talent.src} />
        ))}
      </div>
    </section>
  );
}
