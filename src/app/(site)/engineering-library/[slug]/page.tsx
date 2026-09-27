import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { resources, getResourceBySlug, RESOURCE_KIND_LABELS } from "@/content/resources";

// Every library entry is a known, finite content record — prerender all of
// them so this route is fully static (no runtime data during prerender, no
// route-level loading fallback on first paint). getResourceBySlug + notFound
// still guard any slug outside this set.
export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

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
        eyebrow={RESOURCE_KIND_LABELS[resource.kind]}
        heading={resource.title}
        description={resource.summary}
      />
      <Section>
        {resource.body ? (
          <div className="max-w-2xl text-(--color-ink) leading-relaxed">{resource.body}</div>
        ) : (
          <div className="max-w-2xl">
            <EmptyState
              align="left"
              title="Available on request"
              description="The published PDF is being prepared. Consultants and specifiers can request the current version from the engineering team."
            />
            <a
              href={`mailto:info@airtech.com.np?subject=${encodeURIComponent(`Document request: ${resource.title}`)}`}
              className="mt-6 inline-flex items-center gap-1.5 text-small font-medium text-(--color-brand-blue) hover:underline"
            >
              Request by email <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </Section>
    </>
  );
}
