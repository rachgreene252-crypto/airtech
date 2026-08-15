import { defineField, defineType } from "sanity";
import { verificationStatusField } from "./shared";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "story", title: "Case study" },
    { name: "media", title: "Media" },
    { name: "relations", title: "Related content" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Project name", type: "string", group: "overview", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "overview", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "client", title: "Client", type: "string", group: "overview" }),
    defineField({ name: "clientDisplayApproved", title: "Client name/logo approved for display", type: "boolean", group: "overview", initialValue: false }),
    defineField({ name: "location", title: "Location", type: "string", group: "overview" }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "reference",
      to: [{ type: "industry" }],
      group: "overview",
    }),
    defineField({ name: "projectType", title: "Project type", type: "string", group: "overview" }),
    defineField({ name: "completionYear", title: "Completion year", type: "string", group: "overview" }),
    defineField({
      name: "projectStatus",
      title: "Project status",
      type: "string",
      group: "overview",
      options: { list: ["completed", "ongoing", "provisional"] },
      initialValue: "provisional",
    }),
    defineField({ name: "airtechRole", title: "Airtech role", type: "text", rows: 2, group: "overview" }),
    defineField({ name: "installedCapacity", title: "Installed capacity / key metric", type: "string", group: "overview" }),
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", group: "overview", initialValue: false }),

    defineField({ name: "challenge", title: "The challenge", type: "text", group: "story" }),
    defineField({ name: "engineeringApproach", title: "Engineering solution", type: "text", group: "story" }),
    defineField({ name: "executionScope", title: "Execution", type: "text", group: "story" }),
    defineField({ name: "oemSystems", title: "OEM / equipment systems", type: "array", of: [{ type: "string" }], group: "story" }),
    defineField({ name: "testingCommissioning", title: "Testing & commissioning", type: "text", group: "story" }),
    defineField({ name: "outcome", title: "Outcome / measurable result", type: "text", group: "story" }),

    defineField({ name: "heroImage", title: "Hero image", type: "image", group: "media", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "caption", type: "string" }] }],
    }),

    defineField({
      name: "relatedServices",
      title: "Related services",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({
      name: "relatedProjects",
      title: "Related projects",
      type: "array",
      group: "relations",
      of: [{ type: "reference", to: [{ type: "project" }] }],
    }),
    defineField({ name: "testimonial", title: "Testimonial", type: "reference", to: [{ type: "testimonial" }], group: "relations" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
    { ...verificationStatusField, group: "overview" },
  ],
  preview: {
    select: { title: "name", subtitle: "client", media: "heroImage" },
  },
});
