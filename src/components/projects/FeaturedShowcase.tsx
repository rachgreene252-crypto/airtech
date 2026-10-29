import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { getProjectBySlug } from "@/content/projects";
import { cn } from "@/lib/cn";
import { ProjectTile } from "./ProjectTile";

/**
 * Featured projects (2026-10-29 redesign): a small, curated hospitality
 * set, hospitality being the portfolio's lead sector. Six signature hotels
 * in an asymmetric editorial mosaic instead of a long card grid. Only
 * published records with real photography are listed; the rest of the
 * hotel work lives in the industry explorer below.
 *
 * The order and shapes are deliberate: Yak & Yeti leads (2026-10-05
 * client: "can be the first photo"), then the brands the brief names.
 */
const FEATURED: { slug: string; cls: string; size?: "lg"; sizes: string }[] = [
  {
    slug: "hotel-yak-and-yeti",
    cls: "aspect-[4/3] lg:aspect-auto lg:col-span-8 lg:row-span-2",
    size: "lg",
    sizes: "(min-width: 1024px) 66vw, 100vw",
  },
  { slug: "hyatt-centric-kathmandu", cls: "aspect-[16/10] sm:aspect-[3/2] lg:aspect-auto lg:col-span-4", sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" },
  { slug: "dusit-princess", cls: "aspect-[16/10] sm:aspect-[3/2] lg:aspect-auto lg:col-span-4", sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" },
  { slug: "the-soaltee", cls: "aspect-[16/10] sm:aspect-[3/2] lg:aspect-auto lg:col-span-5", sizes: "(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw" },
  { slug: "holiday-inn-express", cls: "aspect-[16/10] sm:aspect-[3/2] lg:aspect-auto lg:col-span-7", sizes: "(min-width: 1024px) 58vw, (min-width: 640px) 50vw, 100vw" },
  { slug: "hyatt-regency-kathmandu", cls: "aspect-[16/10] sm:col-span-2 sm:aspect-[21/9] lg:col-span-12 lg:aspect-auto lg:row-span-1", sizes: "100vw" },
];

export const FEATURED_SLUGS = FEATURED.map((f) => f.slug);

export function FeaturedShowcase({ priority = false }: { priority?: boolean }) {
  const items = FEATURED.map((f) => ({ ...f, project: getProjectBySlug(f.slug) })).filter(
    (f) => f.project?.heroImage?.src
  );
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
                Featured · Hospitality
              </p>
              <h2
                id="featured-heading"
                className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.018em] text-balance text-(--color-ink)"
              >
                Hotels that run on systems guests never notice.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="max-w-md text-body-l leading-relaxed text-(--color-steel)">
                HVAC, electrical, PHE and fire fighting delivered as one scope for Nepal&rsquo;s leading
                hotel brands, from heritage palaces to new-build towers.
              </p>
              <Link
                href={"/projects?industry=hospitality#explore" as Route}
                className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-(--color-brand-blue) transition-[gap] hover:gap-3"
              >
                Every hospitality project <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12 lg:auto-rows-[15.5rem] xl:auto-rows-[17rem]">
          {items.map((item, i) => {
            const eager = priority && i < 3;
            const tile = (
              <ProjectTile
                project={item.project!}
                industryName="Hospitality"
                index={i + 1}
                size={item.size}
                sizes={item.sizes}
                priority={eager}
                className="absolute inset-0"
              />
            );
            return (
              <li key={item.slug} className={cn("relative", item.cls, i === 0 && "sm:col-span-2")}>
                {/* Above-the-fold tiles paint immediately (LCP); the rest wipe in. */}
                {eager ? tile : <ClipReveal className="absolute inset-0" delay={(i % 3) * 0.08}>{tile}</ClipReveal>}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
