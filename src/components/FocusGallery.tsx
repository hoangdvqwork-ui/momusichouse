"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { toEmbedUrl } from "@/lib/embedUrl";
import type { SanityImageSource } from "@sanity/image-url";

export type GalleryProject = {
  slug: string;
  name: string;
  year: string;
  category: string;
  coverImage?: SanityImageSource | null;
  heroMediaType?: string;
  heroVideoUrl?: string;
  heroMediaFileUrl?: string;
  credit?: string;
};

/**
 * "Focus Gallery" /projects view, modeled on Framer's Focus Gallery
 * component (https://focus-gallery.framer.website/): media stacked in
 * normal scroll flow down the center, scaling/fading by distance from
 * the viewport's vertical center as you scroll (the item nearest
 * center reads as "focused"). Title (left) and credit (right) are
 * fixed, vertically centered, and swap to match whichever project is
 * currently focused -- they don't scroll with the stack.
 *
 * 2026-08-23: restored after a brief revert to a plain 3-column grid --
 * "the featured projects is shown exactly how the focus gallery is
 * now" (i.e. keep this for the default/featured view). The plain grid
 * instead became /projects/all, the full, uncurated library.
 *
 * Media: the focused item shows its real hero media (video embed) if
 * set, falling back to coverImage. Non-focused items always show
 * coverImage (a stack of live video embeds playing/loading at once
 * would be absurd) -- they only ever show one live embed, and only for
 * whichever item is actually front-and-center.
 *
 * Click-through: only the title text navigates to the real detail page
 * (`/projects/[slug]`) -- the media itself isn't a link.
 *
 * Mobile: no room for fixed side columns, so title/credit render
 * inline under each item's media instead of in fixed rails.
 *
 * `scoped` (2026-08-23, homepage "Selected Work" reuse): the /projects
 * page rails are `position: fixed` -- fine there since FocusGallery
 * *is* the page, nothing above or below it to leak over. Embedded as a
 * homepage section instead, fixed rails would keep floating over
 * About/Talents/etc. once scrolled past this section, since `fixed` is
 * viewport-relative, not section-relative. `scoped` swaps each rail to
 * `absolute inset-y-0` (stretches to match this component's own root
 * height, i.e. the full height of the item stack below) with a
 * `sticky top-0 h-screen` element nested inside -- same track+sticky-
 * child shape as the homepage slideshow experiment used, so each rail
 * sticks while scrolling through *this section's* range and releases
 * cleanly at its top/bottom instead of floating indefinitely.
 */
export default function FocusGallery({
  projects,
  scoped = false,
}: {
  projects: GalleryProject[];
  scoped?: boolean;
}) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    let raf = 0;

    function update() {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDist = Infinity;
      const distances: number[] = [];

      itemRefs.current.forEach((el, i) => {
        if (!el) {
          distances[i] = Infinity;
          return;
        }
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - viewportCenter);
        distances[i] = dist;

        // Falloff: full scale/opacity at the exact center, shrinking and
        // fading the further an item sits from it. Clamped to a max
        // reach so items well off-screen don't compute silly negatives.
        const t = Math.min(1, dist / (window.innerHeight * 0.75));
        const scale = 1 - t * 0.4;
        const opacity = 1 - t * 0.8;
        el.style.transform = `scale(${scale})`;
        el.style.opacity = String(opacity);

        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });

      setFocusedIndex((prev) => {
        if (prev === closestIndex) return prev;
        // Hysteresis: hand focus to a new item only once it's
        // meaningfully closer than the current one, not just barely --
        // otherwise sub-pixel scroll jitter right at the midpoint
        // between two items can flip focus back and forth, repeatedly
        // re-triggering the video mount/crossfade in GalleryItem for no
        // real scroll progress.
        const FOCUS_HYSTERESIS = 24; // px
        if (distances[prev] - closestDist < FOCUS_HYSTERESIS) return prev;
        return closestIndex;
      });
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length]);

  const focused = projects[focusedIndex];

  const leftRailContent = focused && (
    <Link
      href={`/projects/${focused.slug}`}
      className="pointer-events-auto text-2xl leading-tight text-white transition-colors hover:text-accent lg:text-3xl font-[family-name:var(--font-display-h1)]"
    >
      {focused.name}
    </Link>
  );

  const rightRailContent = focused && (
    <>
      {focused.credit && (
        <p className="whitespace-pre-line text-sm text-white/70">{focused.credit}</p>
      )}
      <p className="text-xs uppercase tracking-wide text-white/40">
        {[focused.year, focused.category].filter(Boolean).join(" · ")}
      </p>
    </>
  );

  return (
    <div className="relative w-full">
      {scoped ? (
        <>
          {/* Section-bounded rails: absolute box matches this component's
              own height (the item stack below), sticky content inside
              sticks only while scrolling through that range. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 hidden w-[28vw] md:block">
            <div className="sticky top-0 flex h-screen items-center px-6 md:px-10">
              {leftRailContent}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 hidden w-[28vw] md:block">
            <div className="sticky top-0 flex h-screen flex-col items-end justify-center gap-3 px-6 text-right md:px-10">
              {rightRailContent}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Fixed left rail: focused project's title, click-through to its detail page. */}
          <div className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-[28vw] items-center px-6 md:flex md:px-10">
            {leftRailContent}
          </div>

          {/* Fixed right rail: credit + year/category, no link -- only the title is clickable per the request. */}
          <div className="pointer-events-none fixed inset-y-0 right-0 z-30 hidden w-[28vw] flex-col items-end justify-center gap-3 px-6 text-right md:flex md:px-10">
            {rightRailContent}
          </div>
        </>
      )}

      {/* Center stack. */}
      <div className="flex flex-col items-center gap-24 py-[45vh]">
        {projects.map((project, i) => (
          <GalleryItem
            key={project.slug}
            project={project}
            isFocused={i === focusedIndex}
            setRef={(el) => {
              itemRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}

function GalleryItem({
  project,
  isFocused,
  setRef,
}: {
  project: GalleryProject;
  isFocused: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const embed = project.heroVideoUrl ? toEmbedUrl(project.heroVideoUrl) : null;
  const hasVideo = Boolean(project.heroMediaType && (embed || project.heroMediaFileUrl));

  // Crossfade, not a hard swap, 2026-08-24 -- the previous version
  // conditionally rendered *either* the cover image *or* the video
  // (`showVideo ? <video/iframe> : <cover>`), so the instant an item
  // became focused the cover unmounted and a cold iframe/video mounted
  // in its place. An iframe's own document/player takes a beat to
  // actually paint something, so that beat showed the section's plain
  // black background -- a real flash reported as "flick" switching
  // cover -> hero media.
  //
  // Fix: the cover image is now always mounted as a stable base layer
  // underneath (never removed while focus changes). The video layer
  // only mounts while focused, starts at opacity 0, and fades in via
  // CSS transition once it reports itself actually ready (`onLoad` for
  // an iframe, `onLoadedData` for a plain <video>) -- so the cover
  // stays fully visible the whole time the video is still loading,
  // and the switch reads as a crossfade instead of a cut-to-black.
  // Unmount is delayed by the same duration on blur so it fades back
  // out cleanly too, instead of popping away instantly.
  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (isFocused && hasVideo) {
      setMounted(true);
      return;
    }
    setVideoLoaded(false);
    if (!mounted) return;
    const timer = setTimeout(() => setMounted(false), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, hasVideo]);

  const videoVisible = isFocused && videoLoaded;

  return (
    <div
      ref={setRef}
      className="w-[85vw] max-w-2xl transition-[transform,opacity] duration-150 ease-out will-change-transform"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
        {project.coverImage && (
          <Image
            src={urlFor(project.coverImage).width(1000).height(750).fit("crop").url()}
            alt={project.name}
            fill
            unoptimized
            sizes="85vw"
            className="absolute inset-0 object-cover grayscale"
          />
        )}
        {mounted &&
          (embed ? (
            <iframe
              src={embed}
              onLoad={() => setVideoLoaded(true)}
              className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${videoVisible ? "opacity-100" : "opacity-0"}`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={project.heroMediaFileUrl}
              controls
              onLoadedData={() => setVideoLoaded(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${videoVisible ? "opacity-100" : "opacity-0"}`}
            />
          ))}
      </div>

      {/* Mobile-only: fixed side rails don't fit narrow screens, so title/credit go inline here instead. */}
      <div className="mt-4 text-center md:hidden">
        <Link
          href={`/projects/${project.slug}`}
          className="text-xl text-white transition-colors hover:text-accent font-[family-name:var(--font-display-h1)]"
        >
          {project.name}
        </Link>
        {project.credit && (
          <p className="mt-1 whitespace-pre-line text-xs text-white/60">{project.credit}</p>
        )}
        <p className="mt-1 text-xs uppercase tracking-wide text-white/40">
          {[project.year, project.category].filter(Boolean).join(" · ")}
        </p>
      </div>
    </div>
  );
}
