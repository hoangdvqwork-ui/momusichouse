import { defineField, defineType } from "sanity";

export default defineType({
  name: "talent",
  title: "Talent",
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
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Taste, musical language, strengths, suitable brief types, per website-structure.md's stated purpose for Talent. Not written yet, don't fabricate.",
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
