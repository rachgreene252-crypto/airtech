import { defineField, defineType } from "sanity";
import { verificationStatusField } from "./shared";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", validation: (r) => r.required() }),
    defineField({ name: "personName", title: "Person name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "personTitle", title: "Title", type: "string" }),
    defineField({ name: "organisation", title: "Organisation", type: "string" }),
    defineField({ name: "project", title: "Related project", type: "reference", to: [{ type: "project" }] }),
    verificationStatusField,
  ],
  preview: { select: { title: "personName", subtitle: "organisation" } },
});
