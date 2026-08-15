import { defineField, defineType } from "sanity";
import { verificationStatusField } from "./shared";

export const certification = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuingBody", title: "Issuing body", type: "string" }),
    defineField({ name: "validUntil", title: "Valid until", type: "date" }),
    defineField({ name: "documentImage", title: "Certificate image", type: "image" }),
    verificationStatusField,
  ],
  preview: { select: { title: "name", subtitle: "issuingBody" } },
});

export const partner = defineType({
  name: "partner",
  title: "Partner / OEM",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "relationshipNote", title: "Relationship note", type: "string", description: "Keep neutral — do not use 'authorized dealer/distributor' wording unless legally confirmed." }),
    verificationStatusField,
  ],
  preview: { select: { title: "name" } },
});
