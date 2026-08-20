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
