import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { getServiceBySlug } from "@/content/services";

/**
 * One extraordinary section for HVAC — Airtech's historical strength and the
 * discipline with the deepest verified detail. Everything in the metadata
 * list is drawn straight from src/content/services.ts; nothing here invents
 * a capacity figure or spec that wasn't supplied.
 */
export function HVACSpotlight() {
  const hvac = getServiceBySlug("hvac");
  if (!hvac) return null;

  return (
    <section className="grid border-t border-(--color-line) bg-(--color-paper) lg:grid-cols-[1.05fr_1fr]">
      <div className="relative min-h-[46vh] lg:min-h-[86vh]">
        <Image
          src="/images/projects/nepal-mediciti-hospital.jpg"
          alt="Nepal Mediciti hospital, Lalitpur — Airtech HVAC scope"
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-(--color-ink)/15" />
      </div>

      <div className="flex items-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
            System Spotlight — 04
          </p>
          <h2 className="mt-4 font-display text-5xl sm:text-6xl font-semibold leading-[0.95] text-balance">
            HVAC.
          </h2>
          <p className="mt-3 font-display text-xl text-(--color-blueprint)">Engineered for scale.</p>
          <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-(--color-steel)">
            {hvac.detailedDescription}
          </p>

          <dl className="mt-10 space-y-6 border-t border-(--color-line) pt-6">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-(--color-steel-soft)">
                Systems
              </dt>
              <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-(--color-ink)">
                {hvac.systems.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-(--color-steel-soft)">
                Applications
              </dt>
              <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-(--color-ink)">
                {hvac.applications.slice(0, 4).join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.14em] uppercase text-(--color-steel-soft)">
                Delivery
              </dt>
              <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-(--color-ink)">
                {hvac.capabilities.slice(0, 4).join(" · ")}
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink href={"/expertise/hvac" as Route} variant="secondary">
              Explore HVAC
            </ButtonLink>
            <Link href="/projects" className="text-sm font-medium text-(--color-signal) hover:underline">
              See HVAC projects →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
