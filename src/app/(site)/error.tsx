"use client";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function SiteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section border={false}>
      <Container className="text-center py-16">
        <p className="font-sans text-label font-medium text-(--color-brand-blue)">Error</p>
        <h1 className="mt-5 font-display text-4xl sm:text-5xl font-bold">Something went wrong.</h1>
        <p className="mt-5 text-(--color-steel) max-w-md mx-auto">
          Please try again, or email us at info@airtech.com.np if the problem continues.
        </p>
        <div className="mt-9">
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </Container>
    </Section>
  );
}
