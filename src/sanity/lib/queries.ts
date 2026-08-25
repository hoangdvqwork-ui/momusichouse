import { defineQuery } from "next-sanity";

// Published only, deliberate — draft-and-hold means unpublished copy
// should be reviewable in Studio, not visible on the live site. Order
// isn't meaningful yet (no publish order established), alphabetical by
// name for now.
export const allProjectsQuery = defineQuery(`
  *[_type == "project"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    year,
    category,
    coverImage
  }
`);

// Homepage highlight strip, 2026-08-23 — editor-curated via the
// `homepageHighlight` boolean (project.ts), capped at 5 in the query
// itself so a 6th flagged project just doesn't show rather than
// breaking the section's layout. Renders via FocusGallery (scoped mode,
// same component as /projects), so needs the hero-media fields + credit
// that a plain grid wouldn't.
export const homepageHighlightsQuery = defineQuery(`
  *[_type == "project" && homepageHighlight == true] | order(name asc) [0...5] {
    _id,
    name,
    "slug": slug.current,
    year,
    category,
    coverImage,
    heroMediaType,
    heroVideoUrl,
    "heroMediaFileUrl": heroMediaFile.asset->url,
    credit
  }
`);

// /projects page's default (non-"full library") view, 2026-08-23 —
// editor-curated via the `featured` boolean, capped at 20. Separate
// flag from `homepageHighlight` (different curation, different count) —
// see project.ts's field descriptions. Renders via FocusGallery, so
// needs the hero-media fields + credit that the plain grid queries
// above don't.
//
// 2026-08-24: /projects now fetches *every* published project via
// galleryProjectsQuery below instead of this one, so the category
// filter can show the full set once a category is picked (was
// filtering within the featured-only 20, "only the featured one" per
// the request). This query is kept -- nothing else references it yet,
// but it's the honest "just the curated 20" shape if that's ever
// needed standalone again.
export const featuredProjectsQuery = defineQuery(`
  *[_type == "project" && featured == true] | order(name asc) [0...20] {
    _id,
    name,
    "slug": slug.current,
    year,
    category,
    coverImage,
    heroMediaType,
    heroVideoUrl,
    "heroMediaFileUrl": heroMediaFile.asset->url,
    credit
  }
`);

// Every published project, FocusGallery shape (+ the `featured` flag
// itself so the client can tell curated apart from everything else),
// 2026-08-24 — /projects' default view still only *shows* the curated
// `featured` subset, but the category filter needs the full pool so
// picking a category surfaces every project in it, not just the ones
// that happen to also be flagged featured.
export const galleryProjectsQuery = defineQuery(`
  *[_type == "project"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    year,
    category,
    coverImage,
    heroMediaType,
    heroVideoUrl,
    "heroMediaFileUrl": heroMediaFile.asset->url,
    credit,
    featured
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    year,
    category,
    coverImage,
    heroMediaType,
    heroVideoUrl,
    "heroMediaFileUrl": heroMediaFile.asset->url,
    caseStudy,
    persona,
    seoTitle,
    seoDescription,
    credit,
    mediaLink,
    musicLink,
    gallery
  }
`);
