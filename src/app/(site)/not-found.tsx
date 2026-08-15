import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Section border={false}>
      <Container className="text-center py-16">
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-(--color-signal)">404</p>
        <h1 className="mt-5 font-display text-5xl sm:text-6xl font-bold">Page not found.</h1>
        <p className="mt-5 text-(--color-steel) max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist, or has moved.
        </p>
        <div className="mt-9 flex justify-center gap-4">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            View projects
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
