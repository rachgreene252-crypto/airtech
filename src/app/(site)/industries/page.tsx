import { redirect } from "next/navigation";

/**
 * 2026-10-29: sectors are browsed in one place, the industry explorer on
 * /projects (each /industries/[slug] already lands there pre-filtered).
 * This index used to be a second, parallel sector directory.
 */
export default function IndustriesPage() {
  redirect("/projects#explore");
}
