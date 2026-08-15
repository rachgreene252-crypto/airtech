import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export { viewport } from "next-sanity/studio";

export const metadata = {
  title: "Airtech CMS",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div style={{ fontFamily: "system-ui", padding: "4rem", maxWidth: 640 }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Sanity Studio not connected</h1>
        <p style={{ marginTop: "1rem", lineHeight: 1.6 }}>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code>{" "}
          in your environment to connect a live Sanity project — see <code>.env.example</code> and{" "}
          <code>docs/OPEN_DECISIONS.md</code> (#8). Until then, the site renders content from the
          local seed in <code>src/content</code>.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
