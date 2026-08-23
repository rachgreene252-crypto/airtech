import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { TechnicalFrame } from "@/components/ui/TechnicalFrame";
import { MetadataGrid } from "@/components/ui/MetadataGrid";
import { ProjectListRow } from "@/components/projects/ProjectListRow";
import {
  projects,
  getProjectBySlug,
  getRelatedProjects,
  getIndustryBySlug,
  getServiceBySlug,
  getTestimonialForProject,
} from "@/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.seo.title, description: project.seo.description };
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const industry = getIndustryBySlug(project.industrySlug);
  const relatedServices = project.relatedServiceSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedProjects = getRelatedProjects(project);
  const testimonial = project.testimonialId ? getTestimonialForProject(project.slug) : undefined;

  const storySections = [
    { label: "The challenge", body: project.challenge },
    { label: "Engineering solution", body: project.engineeringApproach },
    { label: "Execution", body: project.executionScope },
    { label: "Testing & commissioning", body: project.testingCommissioning },
    { label: "Outcome", body: project.outcome },
  ].filter((s): s is { label: string; body: string } => Boolean(s.body));

  return (
    <>
      {project.heroImage?.src ? (
        <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden bg-(--color-ink)">
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/30 to-(--color-ink)/5" />
          <Container className="relative z-10 pt-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.name },
              ]}
              className="text-(--color-paper)/70 [&_a]:text-(--color-paper)/70 [&_a:hover]:text-(--color-paper)"
            />
          </Container>
          <Container className="absolute inset-x-0 bottom-0 z-10 pb-10 sm:pb-14">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.98] max-w-4xl text-balance text-(--color-paper)">
              {project.name}
            </h1>
          </Container>
        </section>
      ) : (
        <section className="border-b border-(--color-line)">
          <Container className="pt-8 pb-10">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: project.name },
              ]}
            />
          </Container>
          <Container className="pb-14">
            <TechnicalFrame image={project.heroImage} label={project.name} aspect="aspect-[16/9]" priority />
            <h1 className="mt-8 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.98] max-w-4xl text-balance">
              {project.name}
            </h1>
          </Container>
        </section>
      )}

      <Section border={false} className="pt-0 pb-14 sm:pb-16">
        <MetadataGrid
          items={[
            { label: "Client", value: project.clientDisplayApproved ? (project.client ?? "") : "" },
            { label: "Location", value: project.location ?? "" },
            { label: "Industry", value: industry?.name ?? "" },
            { label: "Airtech role", value: project.airtechRole },
            { label: "Project type", value: project.projectType },
            { label: "Completion", value: project.completionYear ?? "" },
            { label: "Installed capacity", value: project.installedCapacity ?? "" },
            { label: "Status", value: project.projectStatus === "provisional" ? "Case study in progress" : project.projectStatus },
          ]}
        />
      </Section>

      {storySections.map((section, i) => (
        <Section key={section.label} tone={i % 2 === 0 ? "raised" : "paper"}>
          <div className="max-w-3xl">
            <h2 className="font-mono text-xs tracking-[0.1em] uppercase text-(--color-signal)">
              {section.label}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-(--color-ink)">{section.body}</p>
          </div>
        </Section>
      ))}

      {project.gallery.length > 0 && (
        <Section tone="raised">
          <SectionHeader eyebrow="Gallery" heading="On site." />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {project.gallery.map((img, i) => (
              <TechnicalFrame key={i} image={img} aspect="aspect-[4/3]" />
            ))}
          </div>
        </Section>
      )}

      {testimonial && (
        <Section className="text-center">
          <blockquote className="max-w-2xl mx-auto">
            <p className="font-display text-2xl sm:text-3xl leading-snug text-balance">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="mt-6 font-mono text-xs tracking-[0.06em] uppercase text-(--color-steel)">
              {testimonial.personName}, {testimonial.personTitle} · {testimonial.organisation}
            </footer>
          </blockquote>
        </Section>
      )}

      {relatedServices.length > 0 && (
        <Section tone="raised">
          <SectionHeader eyebrow="Scope" heading="Related services." />
          <div className="mt-10 flex flex-wrap gap-3">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/expertise/${s.slug}`}
                className="border border-(--color-line-strong) px-4 py-2 text-sm text-(--color-ink-soft) hover:border-(--color-signal) hover:text-(--color-signal) transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </Section>
      )}

      {relatedProjects.length > 0 && (
        <Section>
          <SectionHeader eyebrow="More work" heading="Related projects." />
          <div className="mt-10 border-t border-(--color-line)">
            {relatedProjects.map((p) => (
              <ProjectListRow key={p.slug} project={p} industryName={getIndustryBySlug(p.industrySlug)?.name} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="ink" className="text-center">
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
          {industry ? `Planning a ${industry.name.toLowerCase()} project?` : "Have a project in planning?"}
        </p>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold max-w-2xl mx-auto text-balance">
          Discuss your project with our engineering team.
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
