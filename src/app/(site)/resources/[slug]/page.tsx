import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getResourceBySlug } from "@/content/resources";

// No generateStaticParams: src/content/resources.ts is deliberately empty
// (no resource content has been supplied yet — see docs/OPEN_DECISIONS.md).
// This route resolves on demand once resources are published via the CMS.

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return { title: resource.seo.title, description: resource.seo.description };
}

export default async function ResourceDetailPage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Resources", href: "/resources" },
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
