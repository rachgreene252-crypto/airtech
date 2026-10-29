import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "@/components/ui/Image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { TechnicalFrame } from "@/components/ui/TechnicalFrame";
import { MetadataGrid } from "@/components/ui/MetadataGrid";
import { ProjectTile } from "@/components/projects/ProjectTile";
import type { Route } from "next";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectJsonLd } from "@/components/seo/ProjectJsonLd";
import {
  projects,
  getProjectBySlug,
  getRelatedProjects,
  getIndustryBySlug,
  getServiceBySlug,
  getTestimonialForProject,
} from "@/content";

// A sub-1200px photo stretched full-bleed across a desktop viewport visibly
// upscales — the same "all high quality images only" rule as everywhere
// else on the site. Originally a hardcoded set of two known-good paths;
// replaced 2026-09-24 with a real width check against `heroImage.width` (see
// content/types.ts's SanityImageRef) once most of the portfolio actually had
// large-enough source photography and a fixed allowlist meant every new
// photo needed a second manual edit here just to have its hero render at
// all — exactly the "why doesn't the hero show" gap that made project pages
// read as broken. Every heroImage/gallery entry with a real photo should
// carry its true pixel width; entries without one simply never qualify,
// which is the same safe default the old Set gave by omission.
const FULL_BLEED_MIN_WIDTH = 1200;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const images = project.heroImage?.src ? [{ url: project.heroImage.src }] : undefined;
  return {
    title: project.seo.title,
    description: project.seo.description,
    openGraph: { title: project.seo.title, description: project.seo.description, images, type: "article" },
    twitter: { card: "summary_large_image", title: project.seo.title, description: project.seo.description, images },
  };
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

  // Some provisional entries carry a generic "featured in our portfolio"
  // placeholder for airtechRole — that's the honest "scope not yet
  // documented" state, but it adds nothing as a metadata value, so it's
  // omitted rather than shown. Real scope lines still display.
  // Previous / next within the same sector, in portfolio order, so a
  // visitor can walk a sector without going back to the explorer.
  const siblings = projects.filter((p) => p.industrySlug === project.industrySlug);
  const at = siblings.findIndex((p) => p.slug === project.slug);
  const prev = siblings.length > 2 ? siblings[(at - 1 + siblings.length) % siblings.length] : undefined;
  const next = siblings.length > 1 ? siblings[(at + 1) % siblings.length] : undefined;
  const sectorHref = `/projects?industry=${project.industrySlug}#explore` as Route;
  const kicker = [industry?.name, project.location].filter(Boolean).join(" · ");

  const specificRole = /featured in airtech/i.test(project.airtechRole) ? "" : project.airtechRole;

  const storySections = [
    { label: "The challenge", body: project.challenge },
    { label: "Engineering solution", body: project.engineeringApproach },
    { label: "Execution", body: project.executionScope },
    { label: "Testing & commissioning", body: project.testingCommissioning },
    { label: "Outcome", body: project.outcome },
  ].filter((s): s is { label: string; body: string } => Boolean(s.body));

  // Full-bleed only for genuinely wide photos (2026-09-28: "a lot of the
  // images are being cut off"). The ~62vh banner is about 2.3:1 on desktop,
  // so a 4:3 or portrait photo lost most of its subject there. Anything
  // narrower than 16:10 renders framed at its own aspect ratio instead.
  const heroW = project.heroImage?.width ?? 0;
  const heroH = project.heroImage?.height ?? 0;
  const heroRatio = heroW && heroH ? heroW / heroH : 0;
  const heroIsFullBleedSafe = heroW >= FULL_BLEED_MIN_WIDTH && heroRatio >= 1.6;
  // Framed hero: natural aspect (no crop). Portrait photos are width-capped
  // so they don't run several screens tall.
  const frameMaxWidth = heroW
    ? Math.min(Math.round(heroW * 1.2), heroRatio && heroRatio < 1 ? 620 : Infinity)
    : undefined;

  return (
    <>
      <ProjectJsonLd project={project} industryName={industry?.name} />
      <nav aria-label="Portfolio" className="border-b border-(--color-line)">
        <Container className="flex min-h-12 items-center gap-2 text-sm">
          <Link href="/projects" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-(--color-ink-soft) hover:text-(--color-brand-blue)">
            <span aria-hidden="true">&larr;</span> Projects
          </Link>
          {industry && (
            <>
              <span aria-hidden="true" className="text-(--color-line-strong)">/</span>
              <Link href={sectorHref} className="inline-flex min-h-11 items-center font-medium text-(--color-brand-blue) hover:underline">
                {industry.name}
              </Link>
            </>
          )}
        </Container>
      </nav>
      {project.heroImage?.src && heroIsFullBleedSafe ? (
        <section
          className="relative max-h-[80svh] min-h-[420px] w-full overflow-hidden bg-(--color-ink)"
          // Banner takes the photo's own proportions so a curated crop (e.g.
          // Radisson, 2026-09-29) shows in full instead of a fixed 62vh slice.
          style={{ aspectRatio: String(heroRatio.toFixed(3)) }}
        >
          <Image
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            fill
            priority
            sizes="(max-width: 767px) 220vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/30 to-(--color-ink)/5" />
          {project.heroImage.credit && (
            <p className="absolute right-3 bottom-2 z-10 text-[0.6875rem] text-white/60">{project.heroImage.credit}</p>
          )}
          <Container className="absolute inset-x-0 bottom-0 z-10 pb-10 sm:pb-14">
            {kicker && (
              <p className="mb-4 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-white/85">{kicker}</p>
            )}
            <h1 className="max-w-4xl font-display text-display-xl font-semibold leading-[1.05] tracking-[-0.018em] text-balance text-(--color-paper)">
              {project.name}
            </h1>
          </Container>
        </section>
      ) : (
        <section className="border-b border-(--color-line)">
          <Container className="pt-10 pb-14">
            {kicker && (
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.18em] text-(--color-brand-blue)">{kicker}</p>
            )}
            <h1 className="mt-4 mb-10 max-w-4xl font-display text-display-xl font-semibold leading-[1.05] tracking-[-0.018em] text-balance text-(--color-ink)">
              {project.name}
            </h1>
            {/* A sub-1200px photo stretched across this container's width
                still upscales visibly on a wide desktop, so it doesn't get
                a pass just because it's not the full-bleed banner above.
                No image prop here at all falls through to TechnicalFrame's
                honest placeholder. */}
            {/* Cap the frame at ~1.2x the photo's native width so a small
                source (e.g. 468px) isn't stretched across the full 1200px+
                container. */}
            {/* Width is capped both by resolution (frameMaxWidth) and so the
                framed photo never exceeds ~75% of the viewport height.
                Centred (2026-10-08) so a capped photo doesn't leave a dead
                band down the right-hand side. */}
            <div
              className="mx-auto"
              style={
                heroRatio
                  ? {
                      maxWidth: `min(${frameMaxWidth && Number.isFinite(frameMaxWidth) ? `${frameMaxWidth}px` : "100%"}, calc(75svh * ${heroRatio.toFixed(3)}))`,
                    }
                  : undefined
              }
            >
              <TechnicalFrame
                image={project.heroImage}
                label={project.name}
                aspect={heroRatio ? "" : "aspect-[16/9] sm:aspect-[3/1]"}
                aspectRatio={heroRatio || undefined}
                priority
              />
            </div>
          </Container>
        </section>
      )}

      <Section border={false} className="pt-10 pb-12 sm:pb-14">
        <p className="mb-6 font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
          Project overview
        </p>
        <MetadataGrid
          items={[
            { label: "Client", value: project.clientDisplayApproved ? (project.client ?? "") : "" },
            { label: "Location", value: project.location ?? "" },
            { label: "Industry", value: industry?.name ?? "" },
            { label: "Airtech role", value: specificRole },
            { label: "Project type", value: project.projectType },
            { label: "Completion", value: project.completionYear ?? "" },
            { label: "Installed capacity", value: project.installedCapacity ?? "" },
            {
              label: "Status",
              value:
                project.projectStatus === "provisional"
                  ? "Case study in progress"
                  : project.projectStatus === "ongoing"
                    ? "Ongoing"
                    : "Completed",
            },
          ]}
        />
        {relatedServices.length > 0 && (
          <div className="mt-10 border-t border-(--color-line) pt-8">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-(--color-steel-soft)">
              Systems Airtech delivered
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/expertise/${s.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-(--color-brand-blue-tint) px-4 py-2 text-small font-medium text-(--color-brand-blue) transition-colors hover:bg-(--color-brand-blue-vivid) hover:text-white"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>

      {storySections.map((section, i) => (
        <Section key={section.label} tone={i % 2 === 0 ? "raised" : "paper"}>
          <div className="flex max-w-3xl gap-6">
            <span
              aria-hidden="true"
              className="font-mono text-sm font-semibold text-(--color-brand-blue-soft)"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                {section.label}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-(--color-ink)">{section.body}</p>
            </div>
          </div>
        </Section>
      ))}

      {project.gallery.length > 0 && (
        <Section tone="raised">
          <SectionHeader eyebrow="Gallery" heading="On site." />
          <div className="mt-10">
            <ProjectGallery images={project.gallery} projectName={project.name} />
          </div>
        </Section>
      )}

      {testimonial && (
        <Section className="text-center">
          <blockquote className="max-w-2xl mx-auto">
            <p className="font-display text-2xl sm:text-3xl leading-snug text-balance">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <footer className="mt-6 font-sans text-label text-(--color-steel)">
              {testimonial.personName}, {testimonial.personTitle} · {testimonial.organisation}
            </footer>
          </blockquote>
        </Section>
      )}

      {relatedProjects.length > 0 && (
        <Section>
          <SectionHeader eyebrow="More work" heading="Related projects." />
          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {relatedProjects.slice(0, 6).map((p) => (
              <li key={p.slug} className="relative aspect-[4/3]">
                <ProjectTile
                  project={p}
                  industryName={getIndustryBySlug(p.industrySlug)?.name.split(/[,&]/)[0].trim()}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="absolute inset-0"
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {next && (
        <nav aria-label={`More ${industry?.name ?? ""} projects`} className="border-t border-(--color-line)">
          <Container className="grid grid-cols-2 divide-x divide-(--color-line)">
            {[
              prev && { p: prev, label: "Previous", align: "items-start text-left pr-4", arrow: "\u2190" },
              { p: next, label: "Next", align: "col-start-2 items-end text-right pl-4", arrow: "\u2192" },
            ]
              .filter((x): x is NonNullable<typeof x> => Boolean(x))
              .map(({ p, label, align, arrow }) => (
              <Link
                key={label}
                href={`/projects/${p.slug}` as Route}
                className={`group flex min-h-24 flex-col justify-center gap-1 py-6 ${align}`}
              >
                <span className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-(--color-steel)">
                  {label === "Previous" ? `${arrow} ${label}` : `${label} ${arrow}`} in {industry?.name}
                </span>
                <span className="font-display text-[1.125rem] font-semibold leading-snug text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue) sm:text-[1.375rem]">
                  {p.name}
                </span>
              </Link>
            ))}
          </Container>
        </nav>
      )}

      <Section tone="raised" className="text-center">
        <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
          Planning a similar project?
        </p>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold max-w-2xl mx-auto text-balance text-(--color-ink)">
          Inquire for services from our engineering team.
        </h2>
        <div className="mt-8">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Enquire
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
