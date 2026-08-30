import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SystemMotif, SERVICE_MOTIFS } from "@/components/ui/SystemMotif";
import { ProjectFeatureRow } from "@/components/projects/ProjectFeatureRow";
import { ProjectListRow } from "@/components/projects/ProjectListRow";
import { services, getServiceBySlug } from "@/content/services";
import { getIndustryBySlug } from "@/content/industries";
import { getProjectsByService } from "@/content/projects";

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

  const relatedProjects = getProjectsByService(service.slug);
  const featuredProjects = relatedProjects.filter((p) => p.heroImage?.src).slice(0, 2);
  const listedProjects = relatedProjects.filter((p) => !p.heroImage?.src).slice(0, 4);
  const motif = SERVICE_MOTIFS[service.slug] ?? "signal";

  return (
    <>
      {/* Each discipline gets its own visual world via SystemMotif, rather
          than an identical hero template repeated seven times (brief §10). */}
      <section className="relative overflow-hidden bg-(--color-ink) pt-8 pb-14 sm:pb-16">
        <SystemMotif motif={motif} />
        <div className="absolute inset-0 bg-gradient-to-b from-(--color-ink)/40 via-transparent to-(--color-ink)" />
        <Container className="relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Expertise", href: "/expertise" },
              { label: service.name },
            ]}
            className="text-(--color-paper)/60 [&_a]:text-(--color-paper)/60 [&_a:hover]:text-(--color-paper)"
          />
          <p className="mt-8 font-sans text-label font-medium text-(--color-brand-blue-soft)">
            Discipline <span className="font-mono">{service.disciplineCode}</span>
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.96] text-balance text-(--color-paper)">
            {service.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-(--color-paper)/75 leading-relaxed">
            {service.detailedDescription}
          </p>
        </Container>
      </section>

      <Section>
        <SectionHeader eyebrow="Capabilities" heading="What Airtech delivers." />
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          {service.capabilities.map((c) => (
            <li key={c} className="flex gap-3 text-(--color-ink)">
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

      <Section tone="raised">
        <SectionHeader eyebrow="Related projects" heading="Where this discipline has been delivered." />
        <div className="mt-10">
          {relatedProjects.length > 0 ? (
            <>
              {featuredProjects.length > 0 && (
                <div>
                  {featuredProjects.map((project, i) => (
                    <ProjectFeatureRow
                      key={project.slug}
                      project={project}
                      industryName={getIndustryBySlug(project.industrySlug)?.name}
                      index={i + 1}
                      variant={i % 2 === 0 ? "side" : "side-reversed"}
                    />
                  ))}
                </div>
              )}
              {listedProjects.length > 0 && (
                <div className={featuredProjects.length > 0 ? "mt-10" : undefined}>
                  {listedProjects.map((project) => (
                    <ProjectListRow
                      key={project.slug}
                      project={project}
                      industryName={getIndustryBySlug(project.industrySlug)?.name}
                    />
                  ))}
                </div>
              )}
            </>
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
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Discuss Your Project
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
