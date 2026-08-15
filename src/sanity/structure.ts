import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Airtech Content")
    .items([
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("industry").title("Industries"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      S.documentTypeListItem("certification").title("Certifications"),
      S.documentTypeListItem("partner").title("Partners / OEMs"),
      S.documentTypeListItem("person").title("Team"),
      S.documentTypeListItem("resource").title("Resources / Insights"),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.documentTypeListItem("navigation").title("Navigation"),
    ]);
