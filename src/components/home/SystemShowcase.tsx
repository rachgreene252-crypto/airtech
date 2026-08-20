import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SystemMotif } from "@/components/ui/SystemMotif";
import { getServiceBySlug } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Six engineering disciplines as six distinct product reveals — not six
 * repetitions of the same [image / title / description] template. Each gets
 * its own image (real Airtech project photography, "Our Landmark Projects" —
 * AIPL PROFILE 2026.pptx slide 8), its own visual metaphor, and its own
 * animation treatment, so the visitor discovers a different engineering
 * world each time rather than reading the same card six times.
 */
const PANELS = [
  {
    slug: "hvac",
    index: "01",
    image: "/images/projects/nepal-mediciti-hospital.jpg",
    imageAlt: "Nepal Mediciti hospital, Lalitpur",
    motif: "airflow" as const,
  },
  {
    slug: "electrical",
    index: "02",
    image: "/images/projects/laxmi-motors-kd-plant.jpg",
    imageAlt: "Laxmi Motors KD Plant, Parasi",
    motif: "energy" as const,
  },
  {
    slug: "plumbing-public-health",
    index: "03",
    image: "/images/projects/caan-office-building.jpg",
    imageAlt: "CAAN Office Building, Kathmandu",
    motif: "flow" as const,
  },
  {
    slug: "fire-protection",
    index: "04",
    image: "/images/projects/ncell-iconic-building.jpg",
    imageAlt: "Ncell Iconic Building, Kathmandu",
    motif: "detect" as const,
  },
  {
    slug: "elv-security",
    index: "05",
    // Nepal Mediciti deliberately not reused here — it's already the
    // Opening hero and the HVACSpotlight image; repeating it a third time
    // within a six-panel sequence read as "we only have one photo." Laxmi
    // Motors is a real, if less thematically obvious, pairing.
    image: "/images/projects/laxmi-motors-kd-plant.jpg",
    imageAlt: "Laxmi Motors KD Plant, Parasi — facility detail",
    motif: "signal" as const,
  },
  {
    slug: "bms-systems-integration",
    index: "06",
    image: "/images/projects/caan-office-building.jpg",
    imageAlt: "CAAN Office Building, Kathmandu — facade detail",
    motif: "converge" as const,
  },
];

export function SystemShowcase() {
  return (
    <section className="bg-(--color-paper)">
      {PANELS.map((panel, i) => {
        const service = getServiceBySlug(panel.slug);
        if (!service) return null;
        const reversed = i % 2 === 1;

        return (
          <div
            key={panel.slug}
            className={cn(
              "grid min-h-[92vh] items-stretch border-t border-(--color-line) lg:grid-cols-2",
              i === 0 && "border-t-0"
            )}
          >
            <div
              className={cn(
                "relative min-h-[42vh] overflow-hidden bg-(--color-ink)",
                reversed && "lg:order-2"
              )}
            >
              <Image
                src={panel.image}
                alt={panel.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={cn("object-cover", panel.motif === "detect" && "grayscale-[0.3]")}
              />
              <div className="absolute inset-0 bg-(--color-ink)/45" />
              <div className="absolute inset-0 bg-(--color-blueprint) mix-blend-color opacity-30" />
              <SystemMotif motif={panel.motif} />
            </div>

            <div className={cn("flex items-center px-6 py-16 sm:px-10 lg:px-16", reversed && "lg:order-1")}>
              <Reveal>
                <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-blueprint)">
                  {panel.index} — {service.disciplineCode}
                </p>
                <h3 className="mt-4 font-display text-4xl sm:text-5xl font-semibold leading-[0.98] text-balance">
                  {service.name}
                </h3>
                <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-(--color-steel)">
                  {service.shortDescription}
                </p>
                <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-(--color-line) pt-5 font-mono text-xs tracking-[0.05em] uppercase text-(--color-steel-soft)">
                  {service.subServices.slice(0, 5).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <Link
                  href={`/expertise/${service.slug}`}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal) hover:gap-2.5 transition-all"
                >
                  Explore {service.name}
                  <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}
