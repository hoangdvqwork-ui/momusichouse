import { defineField, defineType } from "sanity";

// Categories match the Work section content plan in automation-os's
// .claude/skills/momusic-content/modes/website-copy.md — grouped by
// search intent, not invented labels.
const CATEGORIES = [
  "Commercial & TVC Scoring",
  "Brand Sound & Sonic Identity",
  "Talent Booking & Artist Collaboration",
  "Live Event & Music Direction",
];

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: "Leave blank rather than guessing if not confirmed.",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: CATEGORIES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "homepageHighlight",
      title: "Homepage highlight",
      type: "boolean",
      initialValue: false,
      description:
        "Feature this project in the homepage highlight strip. Keep exactly 5 projects flagged at a time -- the query takes the first 5 flagged ones (by name), so a 6th flag just won't show rather than erroring.",
    }),
    defineField({
      name: "featured",
      title: "Featured (projects page)",
      type: "boolean",
      initialValue: false,
      description:
        "Show this project in the /projects page's default view (capped at 20). Everything else, flagged or not, is still reachable via that page's 'Full project library' link. Keep ~20 flagged at a time -- the query takes the first 20 (by name).",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      description: "Fallback/thumbnail image, e.g. for the /projects grid. Not the hero player below.",
    }),
    defineField({
      name: "heroMediaType",
      title: "Hero media type",
      type: "string",
      description:
        "Final-product video shown at the top of the project's own page. Pick one, or leave unset if there's nothing to show yet.",
      options: {
        list: ["Video link", "Uploaded file"],
        layout: "radio",
      },
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Hero video URL",
      type: "url",
      description: "YouTube, Vimeo, or a direct video file URL.",
      hidden: ({ parent }) => parent?.heroMediaType !== "Video link",
    }),
    defineField({
      name: "heroMediaFile",
      title: "Hero media file",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.heroMediaType !== "Uploaded file",
    }),
    defineField({
      name: "caseStudy",
      title: "Case study",
      type: "array",
      of: [{ type: "block" }],
      description: "Not drafted yet for most projects, see the Work section content plan.",
    }),
    defineField({
      name: "persona",
      title: "Persona",
      type: "string",
      description: "Who this case study is written for, from reference/audience-table.md.",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "credit",
      title: "Credit",
      type: "text",
    }),
    defineField({
      name: "mediaLink",
      title: "Media link",
      type: "url",
    }),
    defineField({
      name: "musicLink",
      title: "Music link",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category" },
  },
});
