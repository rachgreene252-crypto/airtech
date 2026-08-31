import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectFeatureRow } from "@/components/projects/ProjectFeatureRow";
import { ProjectListRow } from "@/components/projects/ProjectListRow";
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
          <ul className="mt-10 grid grid-cols-1 gap-x-16 gap-y-5 sm:grid-cols-2">
            {industry.operationalChallenges.map((c) => (
              <li key={c} className="flex gap-4 text-body leading-relaxed text-(--color-ink-soft)">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-(--color-brand-blue)" />
                {c}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {industry.technicalRequirements.length > 0 && (
        <Section tone="raised">
          <SectionHeader eyebrow="Technical requirements" heading="What the system has to do." />
          <ul className="mt-10 grid grid-cols-1 gap-x-16 gap-y-5 sm:grid-cols-2">
            {industry.technicalRequirements.map((r) => (
              <li key={r} className="flex gap-4 text-body leading-relaxed text-(--color-ink-soft)">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-(--color-blueprint)" />
                {r}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {relatedServices.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Every project"
            heading="Every sector, all five services."
            description="Airtech delivers HVAC, electrical, plumbing, fire protection and ELV as one integrated scope on every project — the emphasis shifts by sector, the coverage does not."
          />
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/expertise/${s.slug}`}
                className="group block border-t border-(--color-line) pt-4"
              >
                <span className="font-mono text-xs text-(--color-brand-blue)">{s.disciplineCode}</span>
                <h3 className="mt-1 font-display text-lg font-semibold text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                  {s.name}
                </h3>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section tone="raised">
        <SectionHeader eyebrow="Projects" heading="Work in this sector." />
        <div className="mt-10">
          {relatedProjects.length > 0 ? (
            <>
              {relatedProjects.filter((p) => p.heroImage?.src).length > 0 && (
                <div>
                  {relatedProjects
                    .filter((p) => p.heroImage?.src)
                    .slice(0, 3)
                    .map((project, i) => (
                      <ProjectFeatureRow
                        key={project.slug}
                        project={project}
                        index={i + 1}
                        variant={i % 2 === 0 ? "side" : "side-reversed"}
                      />
                    ))}
                </div>
              )}
              {relatedProjects.filter((p) => !p.heroImage?.src).length > 0 && (
                <div className={relatedProjects.filter((p) => p.heroImage?.src).length > 0 ? "mt-10" : undefined}>
                  {relatedProjects
                    .filter((p) => !p.heroImage?.src)
                    .slice(0, 6)
                    .map((project) => (
                      <ProjectListRow key={project.slug} project={project} />
                    ))}
                </div>
              )}
            </>
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
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Discuss Your Project
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
