import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

// Project detail page's photo gallery, 2026-08-24 -- renders the
// `gallery` field added to the project schema earlier the same day.
// Same 3-column grid + grayscale treatment as ProjectCard/the /projects
// grids, for visual consistency with the rest of the site rather than
// inventing a new gallery pattern. unoptimized: see ProjectCard.tsx's
// comment -- Sanity's CDN already resizes/crops via urlFor(), Next's
// own optimization pipeline is redundant and quota-limited on Vercel.
export default function ProjectGallery({
  images,
  projectName,
}: {
  images: SanityImageSource[];
  projectName: string;
}) {
  if (images.length === 0) return null;

  return (
    <div className="mt-16 max-w-3xl">
      <h2 className="text-white/50 text-sm uppercase tracking-wide mb-6">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/10">
        {images.map((image, i) => (
          <div key={i} className="relative aspect-[4/3] bg-black">
            <Image
              src={urlFor(image).width(800).height(600).fit("crop").url()}
              alt={`${projectName} — photo ${i + 1}`}
              fill
              unoptimized
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover grayscale"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
