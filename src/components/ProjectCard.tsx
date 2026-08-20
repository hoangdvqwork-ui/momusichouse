"use client";

import Link from "next/link";
import Image from "next/image";
import { useParallax } from "@/lib/useParallax";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Alternating strength by column position so a row of three doesn't
// drift as one flat block, part of the sitewide parallax pass.
const STRENGTHS = [14, -10, 18];

export default function ProjectCard({
  index,
  slug,
  name,
  year,
  category,
  coverImage,
}: {
  index: number;
  slug: string;
  name: string;
  year: string;
  category: string;
  coverImage?: SanityImageSource | null;
}) {
  const ref = useParallax<HTMLDivElement>(STRENGTHS[index % STRENGTHS.length]);
  return (
    <div ref={ref}>
      <Link
        href={`/projects/${slug}`}
        className="group relative block aspect-[4/3] overflow-hidden bg-black"
      >
        {coverImage ? (
          <Image
            src={urlFor(coverImage).width(800).height(600).fit("crop").url()}
            alt={name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
        <div
          className={
            coverImage
              ? "absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"
              : "absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors"
          }
        />
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <span className="text-white text-lg font-[family-name:var(--font-display-h2h3)] leading-snug">
            {name}
          </span>
          <div className="flex items-center justify-between text-xs text-white/70 uppercase tracking-wide">
            <span>{year}</span>
            <span>{category}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
