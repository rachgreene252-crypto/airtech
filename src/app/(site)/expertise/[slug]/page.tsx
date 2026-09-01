import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
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
  const sectors = service.relatedIndustrySlugs
    .map((s) => getIndustryBySlug(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const stats = [
    { value: String(service.capabilities.length).padStart(2, "0"), label: "Capabilities" },
    service.subServices.length > 0
      ? { value: String(service.subServices.length).padStart(2, "0"), label: "Sub-services" }
      : null,
    service.systems.length > 0
      ? { value: String(service.systems.length).padStart(2, "0"), label: "System types" }
      : null,
  ].filter((x): x is { value: string; label: string } => Boolean(x));

  return (
    <>
      {/* Each discipline gets its own visual world via SystemMotif, rather
          than an identical hero template repeated seven times (brief §10). */}
      <section className="relative overflow-hidden bg-(--color-ink) pt-8 pb-16 sm:pb-20">
        <SystemMotif motif={motif} />
        <div className="absolute inset-0 bg-gradient-to-b from-(--color-ink)/40 via-transparent to-(--color-ink)" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[10rem] font-bold leading-none text-white/[0.04] sm:text-[16rem]"
        >
          {service.disciplineCode}
        </span>

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

          <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-white/15 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-semibold text-(--color-paper)">
                  {stat.value}
                </dt>
                <dd className="mt-1 font-sans text-label text-(--color-paper)/55">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section>
        <Reveal>
          <SectionHeader eyebrow="Capabilities" heading="What Airtech delivers." />
        </Reveal>
        <Reveal delay={0.05}>
          <ol className="mt-12 border-t border-(--color-line)">
            {service.capabilities.map((c, i) => (
              <li
                key={c}
                className="group flex items-baseline gap-5 border-b border-(--color-line) py-5 transition-colors hover:bg-(--color-paper-raised) sm:gap-8"
              >
                <span className="font-mono text-xs text-(--color-brand-blue) sm:text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-body leading-relaxed text-(--color-ink-soft) transition-colors group-hover:text-(--color-ink) sm:text-lg">
                  {c}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {service.subServices.length > 0 && (
        <Section tone="raised">
          <Reveal>
            <SectionHeader eyebrow="Technical scope" heading="The systems within this discipline." />
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-10 grid grid-cols-1 border-l border-t border-(--color-line-strong) sm:grid-cols-2 lg:grid-cols-3">
              {service.subServices.map((s, i) => (
                <div
                  key={s}
                  className="flex items-baseline gap-3 border-b border-r border-(--color-line-strong) px-5 py-4"
                >
                  <span className="font-mono text-[11px] text-(--color-steel-soft)">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-(--color-ink-soft)">{s}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {sectors.length > 0 && (
        <Section>
          <Reveal>
            <SectionHeader
              eyebrow="Where it's deployed"
              heading={`${service.name} across the sectors Airtech works in.`}
            />
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-10 grid grid-cols-1 border-l border-t border-(--color-line-strong) sm:grid-cols-2">
              {sectors.map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/industries/${sector.slug}`}
                  className="group flex items-center justify-between gap-4 border-b border-r border-(--color-line-strong) px-6 py-6 transition-colors hover:bg-(--color-paper-raised)"
                >
                  <span className="font-display text-lg font-semibold text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                    {sector.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-lg text-(--color-brand-blue) transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      <Section tone="raised">
        <Reveal>
          <SectionHeader eyebrow="Related projects" heading="Where this discipline has been delivered." />
        </Reveal>
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
        <h2 className="font-display text-display-m font-semibold max-w-2xl mx-auto text-balance">
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
