import { toEmbedUrl } from "@/lib/embedUrl";

// Site-wide showreel, not per-project content, so hardcoded here rather
// than modeled in Sanity (a single fixed URL isn't worth a CMS field).
// Update this if the reel changes.
const SHOWREEL_URL = "https://vimeo.com/1098824912?fl=ip&fe=ec";

export default function ShowreelSection() {
  const embed = toEmbedUrl(SHOWREEL_URL);
  if (!embed) return null;

  return (
    <section className="w-full bg-black/75 px-6 md:px-10 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-white/5 md:rounded-none">
          <iframe
            src={embed}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
