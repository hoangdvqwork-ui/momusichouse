"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

// Restored 2026-08-23 -- was deleted when /projects moved to
// FocusGallery.tsx, now reverted back to a plain grid (see that page's
// comment). Unchanged from before the deletion except the no-image
// placeholder, which picked up the transparent/black fix from the
// flowy-hero tuning pass in the meantime.
export default function ProjectCard({
  slug,
  name,
  year,
  category,
  coverImage,
}: {
  slug: string;
  name: string;
  year: string;
  category: string;
  coverImage?: SanityImageSource | null;
}) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group relative block aspect-[4/3] overflow-hidden bg-black"
    >
      {coverImage ? (
        // unoptimized: Sanity's CDN already resizes/crops via the urlFor()
        // params above, so Next's own re-optimization is redundant and
        // burns Vercel's separate (quota-limited) image-optimization
        // pipeline. New cover photos started 402ing once the Hobby plan's
        // free quota was used up (2026-08-21) -- bypassing it here removes
        // that dependency entirely.
        <Image
          src={urlFor(coverImage).width(800).height(600).fit("crop").url()}
          alt={name}
          fill
          unoptimized
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover grayscale transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}
      <div
        className={
          coverImage
            ? "absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
            : "absolute inset-0 bg-transparent group-hover:bg-white/5 transition-colors"
        }
      />
      {/* Hover-only tint on top of the always-on gradient above, so the
          title reads clearly against busy/light cover photos without
          darkening the card permanently. */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <span className="text-white group-hover:text-accent transition-colors duration-300 text-lg font-[family-name:var(--font-display-h2h3)] leading-snug">
          {name}
        </span>
        <div className="flex items-center justify-between text-xs text-white/70 uppercase tracking-wide">
          <span>{year}</span>
          <span>{category}</span>
        </div>
      </div>
    </Link>
  );
}
