import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { services, getServiceBySlug } from "@/content/services";
import { getIndustryBySlug } from "@/content/industries";
import { getProjectsByService } from "@/content/projects";
import { TechnicalFrame } from "@/components/ui/TechnicalFrame";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/expertise/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.seo.title, description: service.seo.description };
}

export default async function ServiceDetailPage({ params }: PageProps<"/expertise/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedIndustries = service.relatedIndustrySlugs
    .map((s) => getIndustryBySlug(s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const relatedProjects = getProjectsByService(service.slug);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Expertise", href: "/expertise" },
          { label: service.name },
        ]}
        eyebrow={`Discipline ${service.disciplineCode}`}
        heading={service.name}
        description={service.detailedDescription}
      />

      <Section>
        <SectionHeader eyebrow="Capabilities" heading="What Airtech delivers." />
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
          {service.capabilities.map((c) => (
            <li key={c} className="flex gap-3 border-b border-(--color-line) pb-4 text-(--color-ink)">
              <span aria-hidden="true" className="text-(--color-signal) font-mono">—</span>
              {c}
            </li>
          ))}
        </ul>
      </Section>

      {service.subServices.length > 0 && (
        <Section tone="raised">
          <SectionHeader eyebrow="Sub-services" heading="Technical scope." />
          <div className="mt-10 flex flex-wrap gap-3">
            {service.subServices.map((s) => (
              <span
                key={s}
                className="border border-(--color-line-strong) px-4 py-2 text-sm text-(--color-ink-soft)"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>
      )}

      {relatedIndustries.length > 0 && (
        <Section>
          <SectionHeader eyebrow="Applications" heading="Where this discipline is applied." />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-(--color-line)">
            {relatedIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="bg-(--color-paper) p-6 hover:bg-(--color-paper-raised) transition-colors"
              >
                <h3 className="font-display text-xl font-semibold">{industry.name}</h3>
                <span className="mt-3 inline-block text-sm text-(--color-blueprint)">View sector →</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section tone="raised">
        <SectionHeader eyebrow="Related projects" heading="Where this discipline has been delivered." />
        <div className="mt-10">
          {relatedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.slice(0, 3).map((project) => (
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
            <EmptyState title="Case studies in progress" description="Project documentation for this discipline is being confirmed for publication." />
          )}
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold max-w-2xl mx-auto text-balance">
          Planning a project that needs {service.name.toLowerCase()}?
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
