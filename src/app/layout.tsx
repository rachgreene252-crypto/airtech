import type { Metadata, Viewport } from "next";
import { Inter_Tight, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Inter Tight — headings. Chosen 2026-09-26 from a four-way side-by-side
// (Archivo / Geist / Manrope / Inter Tight) rendered on the live site;
// replaces Archivo (which replaced Fraunces 2026-09-16). Inter Tight is
// Inter's display cut, so headings and body now read as one family.
const displayFont = Inter_Tight({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

// Inter — a neutral, highly legible grotesque for body and UI, the text
// companion to Inter Tight's display cuts.
const sansFont = Inter({
  variable: "--font-sans-face",
  subsets: ["latin"],
  display: "swap",
});

// IBM Plex Mono stays — reserved for genuine machine data (discipline codes,
// drawing references, spec values), never prose eyebrows.
const monoFont = IBM_Plex_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteTitle = "Airtech Industries | Engineering & Integrated MEP Partner, Nepal";
const siteDescription =
  "Airtech Industries is Nepal's engineering and integrated MEP partner: HVAC, electrical, PHE, fire protection, ELV and building systems, from design through commissioning and lifecycle support.";

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
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
