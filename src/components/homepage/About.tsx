"use client";

import { useParallax } from "@/lib/useParallax";

export default function About() {
  const ref = useParallax<HTMLParagraphElement>(16);
  return (
    <section className="w-full bg-black px-6 md:px-10 py-32 flex justify-center overflow-hidden">
      <p
        ref={ref}
        className="max-w-3xl text-center text-xl md:text-3xl leading-snug text-white font-[family-name:var(--font-display-h2h3)]"
      >
        Mõ Music House makes music for ideas that need to be heard: in
        branding, film, culture, experience. Anyone can push a button and
        get a song. Knowing which one&rsquo;s worth hearing is a different
        thing. Every project, its own sound, no formula.
      </p>
    </section>
  );
}
