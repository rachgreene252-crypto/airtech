import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getResourceBySlug } from "@/content/resources";

// No generateStaticParams: src/content/resources.ts entries are all
// status: "source_only" with no fileUrl/body until Task 26 seeds real
// placeholder entries (Phase 8) — this route resolves on demand.

export async function generateMetadata({
  params,
}: PageProps<"/engineering-library/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return { title: resource.seo.title, description: resource.seo.description };
}

export default async function EngineeringLibraryDetailPage({
  params,
}: PageProps<"/engineering-library/[slug]">) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Engineering Library", href: "/engineering-library" },
          { label: resource.title },
        ]}
        eyebrow={resource.kind}
        heading={resource.title}
        description={resource.summary}
      />
      <Section>
        <div className="max-w-2xl text-(--color-ink) leading-relaxed">
          {resource.body ?? "Content coming soon."}
        </div>
      </Section>
    </>
  );
}
