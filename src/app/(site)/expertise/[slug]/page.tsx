import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import Image from "@/components/ui/Image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { ProjectTile } from "@/components/projects/ProjectTile";
import { BuildingModel } from "@/components/engineering/BuildingModel";
import { SYSTEM_COLOR, SYSTEM_SHORT, type SystemSlug } from "@/components/engineering/model";
import { services, getServiceBySlug } from "@/content/services";
import { getIndustryBySlug } from "@/content/industries";
import { getProjectsByService, hasTileImage } from "@/content/projects";

const SIGNATURE_HOTELS = ["hyatt-regency-kathmandu", "fairfield-by-marriott-thamel", "the-soaltee"];

// Same real photographs as the overview atlas, where one shows the discipline.
const PHOTO: Partial<Record<SystemSlug, { src: string; alt: string; caption: string }>> = {
  hvac: { src: "/images/projects/mit-college-2.jpg", alt: "VRF outdoor units installed on the roof of MIT College", caption: "VRF outdoor units · MIT College" },
  electrical: { src: "/images/projects/mit-college-4.jpg", alt: "A cable tray run beside a ceiling cassette unit at MIT College", caption: "Cable tray and services coordination · MIT College" },
  "fire-protection": { src: "/images/process/fire-pump-room.jpg", alt: "A fire-fighting pump room: sprinkler and hydrant pumps, a diesel fire pump, valves and gauges", caption: "Fire-fighting pump room · Airtech site" },
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/expertise/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.seo.title, description: service.seo.description };
}

/**
 * One discipline (2026-10-29 rebuild). Its own header in the discipline's
 * drawing colour, with a real photograph or, where none exists, the
 * building drawing with this system isolated; then what Airtech delivers as
 * a numbered schedule, the systems and applications, delivered projects as
 * photo tiles, and a strip to move to any other discipline.
 */
export default async function ServiceDetailPage({ params }: PageProps<"/expertise/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const sys = service.slug as SystemSlug;
  const color = SYSTEM_COLOR[sys];
  const photo = PHOTO[sys];
  const all = getProjectsByService(service.slug);
  const ordered = [
    ...SIGNATURE_HOTELS.map((s) => all.find((p) => p.slug === s)).filter((p): p is NonNullable<typeof p> => Boolean(p)),
    ...all.filter((p) => !SIGNATURE_HOTELS.includes(p.slug)),
  ];
  const tiles = ordered.filter(hasTileImage).slice(0, 6);
  const named = ordered.filter((p) => !tiles.includes(p)).slice(0, 8);
  const index = services.findIndex((s) => s.slug === service.slug);

  return (
    <>
      <Container className="pt-8 sm:pt-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Expertise", href: "/expertise" }, { label: service.name }]} visuallyHidden />
        <Link href={`/expertise#${service.slug}` as Route} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-(--color-ink-soft) hover:text-(--color-brand-blue)">
          <span aria-hidden="true">&larr;</span> All disciplines
        </Link>

        <div className="mt-4 grid gap-10 border-b border-(--color-line-strong) pb-12 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-16">
          <div className="lg:col-span-6">
            <div className="flex items-baseline gap-4">
              <span aria-hidden="true" className="font-display text-[4rem] font-bold leading-none tracking-[-0.04em] sm:text-[5.5rem]" style={{ color }}>
                {service.disciplineCode}
              </span>
              <span className="font-mono text-[0.75rem] tracking-[0.16em] text-(--color-steel)">
                Discipline {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
            </div>
            <h1 className="mt-5 font-display text-display-xl font-semibold leading-[1.04] tracking-[-0.022em] text-balance text-(--color-ink)">
              {service.name}
            </h1>
            <p className="mt-5 text-body-l leading-relaxed text-(--color-steel)">{service.detailedDescription}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <ButtonLink href="/contact/project-enquiry" size="lg">
                Inquire for Services
              </ButtonLink>
              <a href="#delivered" className="inline-flex min-h-11 items-center text-sm font-semibold text-(--color-brand-blue) hover:underline">
                Where it&rsquo;s been delivered <span aria-hidden="true" className="ml-1">&darr;</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            {photo ? (
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
                  <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5" style={{ background: color }} />
                </div>
                <figcaption className="mt-2.5 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-(--color-steel)">{photo.caption}</figcaption>
              </figure>
            ) : (
              <figure className="overflow-hidden rounded-[3px] border border-(--color-line-strong) bg-white">
                <span aria-hidden="true" className="block h-1.5" style={{ background: color }} />
                <div className="relative aspect-[4/3] px-2">
                  <BuildingModel
                    className="h-full w-full"
                    highlight={sys}
                    colorCoded
                    title={`Axonometric drawing of a typical building with the ${service.name} system isolated`}
                  />
                </div>
                <figcaption className="border-t border-(--color-line) px-4 py-2.5 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-(--color-steel)">
                  Where {SYSTEM_SHORT[sys]} runs in a typical building · not to scale
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </Container>

      {/* What Airtech delivers: a numbered schedule, not cards. */}
      <section aria-labelledby="delivers-heading" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em]" style={{ color }}>
                Scope
              </p>
              <h2 id="delivers-heading" className="mt-4 font-display text-display-m font-semibold leading-tight text-(--color-ink)">
                What Airtech delivers.
              </h2>
            </div>
            <ol className="lg:col-span-8">
              {service.capabilities.map((c, i) => (
                <li key={c} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-t border-(--color-line) py-5 last:border-b">
                  <span className="font-mono text-[0.875rem] font-semibold tabular-nums" style={{ color }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-body-l leading-relaxed text-(--color-ink-soft)">{c}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Systems and applications as a two-column schedule. */}
      <section aria-label="Systems and applications" className="border-y border-(--color-line) bg-(--color-paper-raised) py-16 sm:py-20">
        <Container>
          <dl className="grid gap-12 md:grid-cols-2">
            <div>
              <dt className="border-b-2 pb-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-(--color-ink)" style={{ borderColor: color }}>
                Systems within {SYSTEM_SHORT[sys]}
              </dt>
              {service.subServices.map((s) => (
                <dd key={s} className="border-b border-(--color-line-strong) py-3 text-body text-(--color-ink)">
                  {s}
                </dd>
              ))}
            </div>
            <div>
              <dt className="border-b-2 border-(--color-ink) pb-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-(--color-ink)">
                Typical applications
              </dt>
              {service.applications.map((a) => (
                <dd key={a} className="border-b border-(--color-line-strong) py-3 text-body text-(--color-ink)">
                  {a}
                </dd>
              ))}
            </div>
          </dl>
        </Container>
      </section>

      {/* Delivered projects */}
      <section id="delivered" aria-labelledby="delivered-heading" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em]" style={{ color }}>
            On site
          </p>
          <h2 id="delivered-heading" className="mt-4 font-display text-display-m font-semibold leading-tight text-(--color-ink)">
            Where {SYSTEM_SHORT[sys]} has been delivered.
          </h2>
          {tiles.length > 0 ? (
            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {tiles.map((p) => (
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
          ) : (
            <p className="mt-6 text-body text-(--color-steel)">Project documentation for this discipline is being confirmed for publication.</p>
          )}
          {named.length > 0 && (
            <p className="mt-8 text-body leading-relaxed text-(--color-steel)">
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-(--color-ink)">Also </span>
              {named.map((p, j) => (
                <span key={p.slug}>
                  <Link href={`/projects/${p.slug}` as Route} className="font-medium text-(--color-ink) underline decoration-(--color-line-strong) underline-offset-4 hover:text-(--color-brand-blue)">
                    {p.name}
                  </Link>
                  {j < named.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
          )}
        </Container>
      </section>

      {/* Every other discipline, one tap away */}
      <nav aria-label="Other disciplines" className="border-t border-(--color-line)">
        <Container>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {services.map((s) => {
              const on = s.slug === service.slug;
              const c = SYSTEM_COLOR[s.slug as SystemSlug];
              return (
                <li key={s.slug} className="border-b border-r border-(--color-line) lg:border-b-0">
                  <Link
                    href={`/expertise/${s.slug}` as Route}
                    aria-current={on ? "page" : undefined}
                    className="group relative flex min-h-20 flex-col justify-center gap-1 px-4 py-4"
                  >
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] transition-transform duration-300" style={{ background: c, transform: on ? "scaleX(1)" : "scaleX(0.15)", transformOrigin: "left" }} />
                    <span className="font-mono text-[0.75rem] font-semibold" style={{ color: c }}>
                      {s.disciplineCode}
                    </span>
                    <span className={on ? "text-sm font-semibold text-(--color-ink)" : "text-sm font-medium text-(--color-steel) group-hover:text-(--color-ink)"}>
                      {SYSTEM_SHORT[s.slug as SystemSlug]}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>
    </>
  );
}
