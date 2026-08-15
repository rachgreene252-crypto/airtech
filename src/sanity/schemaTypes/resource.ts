import { defineField, defineType } from "sanity";
import { verificationStatusField } from "./shared";

export const resource = defineType({
  name: "resource",
  title: "Resource / Insight",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: { list: ["guideline", "bulletin", "download", "insight"] },
    }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 2 }),
    defineField({ name: "publishedDate", title: "Published date", type: "date" }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "file", title: "Downloadable file", type: "file" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    verificationStatusField,
  ],
  preview: { select: { title: "title", subtitle: "kind" } },
});
