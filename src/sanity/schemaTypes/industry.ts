import { defineField, defineType } from "sanity";
import { verificationStatusField } from "./shared";

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "detail", title: "Detail" },
    { name: "relations", title: "Related content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "overview", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "overview", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "overview", title: "Overview", type: "text", group: "overview" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "overview", options: { hotspot: true } }),

    defineField({ name: "operationalChallenges", title: "Operational challenges", type: "array", of: [{ type: "string" }], group: "detail" }),
    defineField({ name: "technicalRequirements", title: "Technical requirements", type: "array", of: [{ type: "string" }], group: "detail" }),
    defineField({ name: "airtechCapabilities", title: "Airtech capabilities", type: "array", of: [{ type: "string" }], group: "detail" }),
    defineField({ name: "proofPoints", title: "Proof points", type: "array", of: [{ type: "string" }], group: "detail" }),

    defineField({ name: "relatedServices", title: "Related services", type: "array", group: "relations", of: [{ type: "reference", to: [{ type: "service" }] }] }),
    defineField({ name: "relatedProjects", title: "Related projects", type: "array", group: "relations", of: [{ type: "reference", to: [{ type: "project" }] }] }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    { ...verificationStatusField, group: "overview" },
  ],
  preview: { select: { title: "name" } },
});
