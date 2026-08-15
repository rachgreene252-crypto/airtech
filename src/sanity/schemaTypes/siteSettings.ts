import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", title: "Registered company name", type: "string" }),
    defineField({ name: "brandName", title: "Brand name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "establishedYear", title: "Established year", type: "string" }),
    defineField({ name: "headOffice", title: "Head office address", type: "text", rows: 2 }),
    defineField({ name: "primaryEmail", title: "Primary email", type: "string" }),
    defineField({
      name: "phone",
      title: "Phone (leave blank until confirmed)",
      type: "string",
      description: "Do not fill until Airtech management confirms the current number — see docs/OPEN_DECISIONS.md #1.",
    }),
    defineField({ name: "whatsapp", title: "WhatsApp number", type: "string" }),
    defineField({ name: "leadNotificationEmail", title: "Lead notification email", type: "string" }),
  ],
});

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Menu title", type: "string" }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL", type: "string" }),
            defineField({
              name: "children",
              title: "Sub-items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "href", title: "URL", type: "string" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
