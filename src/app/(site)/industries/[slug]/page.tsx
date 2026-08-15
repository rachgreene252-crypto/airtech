import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { TechnicalFrame } from "@/components/ui/TechnicalFrame";
import { industries, getIndustryBySlug } from "@/content/industries";
import { getServiceBySlug } from "@/content/services";
import { getProjectsByIndustry } from "@/content/projects";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return { title: industry.seo.title, description: industry.seo.description };
}

export default async function IndustryDetailPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const relatedServices = industry.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedProjects = getProjectsByIndustry(industry.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.name },
        ]}
        eyebrow="Industry"
        heading={industry.name}
        description={industry.overview}
      />

      {industry.operationalChallenges.length > 0 && (
        <Section>
          <SectionHeader eyebrow="The challenge" heading="What makes this sector different." />
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            {industry.operationalChallenges.map((c) => (
              <li key={c} className="flex gap-3 border-b border-(--color-line) pb-4 text-(--color-ink)">
                <span aria-hidden="true" className="text-(--color-signal) font-mono">—</span>
                {c}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {industry.technicalRequirements.length > 0 && (
        <Section tone="raised">
          <SectionHeader eyebrow="Technical requirements" heading="What the system has to do." />
          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            {industry.technicalRequirements.map((r) => (
              <li key={r} className="flex gap-3 border-b border-(--color-line) pb-4 text-(--color-ink)">
                <span aria-hidden="true" className="text-(--color-blueprint) font-mono">—</span>
                {r}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {relatedServices.length > 0 && (
        <Section>
          <SectionHeader eyebrow="Relevant expertise" heading="Disciplines Airtech brings to this sector." />
          <div className="mt-10 flex flex-wrap gap-3">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/expertise/${s.slug}`}
                className="border border-(--color-line-strong) px-4 py-2 text-sm text-(--color-ink-soft) hover:border-(--color-blueprint) hover:text-(--color-blueprint) transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section tone="raised">
        <SectionHeader eyebrow="Projects" heading="Work in this sector." />
        <div className="mt-10">
          {relatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.slice(0, 6).map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                  <TechnicalFrame image={project.heroImage} label={project.name} showCaption={false} />
                  <h3 className="mt-4 font-display text-xl font-semibold group-hover:text-(--color-blueprint) transition-colors">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-(--color-steel)">{project.location}</p>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="Case studies in progress" description="Project documentation for this sector is being confirmed for publication." />
          )}
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold max-w-2xl mx-auto text-balance">
          Planning a {industry.name.toLowerCase()} project?
        </h2>
        <div className="mt-8">
          <ButtonLink href="/contact" size="lg">
            Discuss Your Project
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
