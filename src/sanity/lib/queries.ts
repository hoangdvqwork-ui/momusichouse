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
// breaking the section's layout.
export const homepageHighlightsQuery = defineQuery(`
  *[_type == "project" && homepageHighlight == true] | order(name asc) [0...5] {
    _id,
    name,
    "slug": slug.current,
    year,
    category,
    coverImage
  }
`);

// /projects page's default (non-"full library") view, 2026-08-23 —
// editor-curated via the `featured` boolean, capped at 20. Separate
// flag from `homepageHighlight` (different curation, different count) —
// see project.ts's field descriptions. Renders via FocusGallery, so
// needs the hero-media fields + credit that the plain grid queries
// above don't.
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
    musicLink
  }
`);
