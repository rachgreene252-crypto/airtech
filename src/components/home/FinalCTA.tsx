import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Closing CTA — rebuilt 2026-09-10 with real project photography (was a
 * flat pattern-only panel) to match the client's reference, which closes
 * on a full-bleed photo rather than another flat section.
 */
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-(--color-line) py-24 sm:py-28 lg:py-32">
      <div className="absolute inset-0">
        <Image
          src="/images/landmarks/tiger-palace-resort.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,29,43,0.82) 0%, rgba(5,29,43,0.7) 45%, rgba(5,29,43,0.88) 100%)",
          }}
        />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-brand-blue-soft)">
          Have a project in planning?
        </p>
        <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-balance text-white">
          Let&apos;s build what&apos;s next.
        </h2>
        <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto">
          Tell us what you&apos;re building and we&apos;ll respond within one business day.
        </p>
        <div className="mt-9">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Inquire for Services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
