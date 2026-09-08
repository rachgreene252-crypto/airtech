import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { industries, getIndustryBySlug } from "@/content/industries";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return { title: industry.seo.title, description: industry.seo.description };
}

/**
 * Industries now route straight to the filtered project database — a visitor
 * picking a sector sees Airtech's actual built work in it, not a second
 * directory competing with /projects. The per-sector engineering notes live
 * on in src/content/industries.ts and surface on the project pages.
 */
export default async function IndustryDetailPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();
  redirect(`/projects?industry=${industry.slug}`);
}
