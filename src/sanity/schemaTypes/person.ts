import { defineField, defineType } from "sanity";
import { verificationStatusField } from "./shared";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "bio", title: "Biography", type: "text" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "yearsWithAirtech", title: "Years with Airtech", type: "string" }),
    verificationStatusField,
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
