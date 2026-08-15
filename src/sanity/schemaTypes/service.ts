import { defineField, defineType } from "sanity";
import { verificationStatusField } from "./shared";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "detail", title: "Capabilities" },
    { name: "relations", title: "Related content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "overview", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "overview", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "overview",
      options: {
        list: [
          "hvac",
          "electrical",
          "plumbing-public-health",
          "fire-protection",
          "elv-security",
          "bms-systems-integration",
          "engineering-advisory",
        ],
      },
    }),
    defineField({ name: "disciplineCode", title: "Discipline code", description: "Short drawing-sheet style code, e.g. M, E, PHE, FP, ELV, BMS", type: "string", group: "overview" }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 2, group: "overview" }),
    defineField({ name: "detailedDescription", title: "Detailed description", type: "text", group: "overview" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "overview", options: { hotspot: true } }),

    defineField({ name: "capabilities", title: "Capabilities", type: "array", of: [{ type: "string" }], group: "detail" }),
    defineField({ name: "subServices", title: "Technical sub-services", type: "array", of: [{ type: "string" }], group: "detail" }),
    defineField({ name: "systems", title: "Systems", type: "array", of: [{ type: "string" }], group: "detail" }),
    defineField({ name: "applications", title: "Applications", type: "array", of: [{ type: "string" }], group: "detail" }),

    defineField({ name: "relatedIndustries", title: "Related industries", type: "array", group: "relations", of: [{ type: "reference", to: [{ type: "industry" }] }] }),
    defineField({ name: "relatedProjects", title: "Related projects", type: "array", group: "relations", of: [{ type: "reference", to: [{ type: "project" }] }] }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    { ...verificationStatusField, group: "overview" },
  ],
  preview: { select: { title: "name", subtitle: "category" } },
});
