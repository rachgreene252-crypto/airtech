import type { Metadata, Viewport } from "next";
import { Oswald, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Condensed, bold, industrial — originally a signage/wayfinding face, which
// suits an engineering-drawing register. Chosen over Big Shoulders because
// this Next.js version has no fallback-metric data for that family.
//
// display: "optional" rather than "swap" — Oswald is dramatically narrower
// than any fallback sans-serif, so headlines re-wrap onto a different number
// of lines on swap regardless of metric-matched fallback (size-adjust
// matches average glyph size, not condensed-vs-normal width ratio). That
// reflow was pushing everything below the hero down, measured as CLS 0.7 on
// the homepage. "optional" uses the fallback for the entire page load if the
// font isn't already cached, trading "always show the exact display face"
// for "never reflow the page after first paint" — the right trade for a
// branding/headline font that isn't load-bearing content.
const displayFont = Oswald({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "optional",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  // "optional": body text on every page uses this font, so a swap-driven
  // reflow here (not just the display face) is what was actually behind the
  // measured CLS — see note above.
  display: "optional",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "optional",
});

const siteTitle = "Airtech Industries | Engineering & Integrated MEP Partner, Nepal";
const siteDescription =
  "Airtech Industries is Nepal's engineering and integrated MEP partner: HVAC, electrical, plumbing, fire protection and building systems, from design through commissioning and lifecycle support.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.airtech.com.np"
  ),
  title: {
    default: siteTitle,
    template: "%s | Airtech Industries",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "Airtech Industries",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

// Tints the mobile browser chrome (Safari/Chrome address bar, iOS status
// bar) to match the site's canvas instead of the browser default — no
// theme-color existed before this.
export const viewport: Viewport = {
  themeColor: "#f6f3ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
