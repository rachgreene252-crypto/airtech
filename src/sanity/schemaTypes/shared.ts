import { defineField, defineType } from "sanity";

export const verificationStatusField = defineField({
  name: "status",
  title: "Verification status",
  type: "string",
  description:
    "Controls whether this content is safe to publish as a factual claim. See docs/IMPLEMENTATION_AUDIT.md — source-of-truth rule.",
  options: {
    list: [
      { title: "Verified", value: "verified" },
      { title: "Client confirmed", value: "client_confirmed" },
      { title: "Source only (brochure/legacy — needs confirmation)", value: "source_only" },
      { title: "Needs verification", value: "needs_verification" },
      { title: "Historical (do not use as current fact)", value: "historical" },
      { title: "Do not publish", value: "do_not_publish" },
    ],
  },
  initialValue: "needs_verification",
  validation: (rule) => rule.required(),
});

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "SEO title", type: "string", validation: (r) => r.max(70) }),
    defineField({ name: "description", title: "SEO description", type: "text", rows: 3, validation: (r) => r.max(160) }),
    defineField({ name: "ogImage", title: "Social share image", type: "image", options: { hotspot: true } }),
  ],
});
