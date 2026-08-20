import { ImageResponse } from "next/og";

export const alt = "Airtech Industries — Engineering & Integrated MEP Partner, Nepal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// No og-image existed at all before this — shared links had no preview
// card. Satori (next/og's renderer) doesn't load the site's actual web
// fonts without embedding font files, so this uses generic sans-serif
// weights rather than pixel-matching Oswald/IBM Plex — acceptable for a
// share-card, which is seen once in a feed, not read as body content.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#f6f3ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="40" height="40" viewBox="0 0 32 32">
            <rect width="32" height="32" fill="#252629" />
            <path
              d="M8 24 L16 7 L24 24 M11.5 17 H20.5"
              stroke="#c6a15b"
              strokeWidth="2.4"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="square"
            />
          </svg>
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2, color: "#252629" }}>AIRTECH</span>
          <span style={{ fontSize: 14, letterSpacing: 3, color: "#66645a", textTransform: "uppercase" }}>
            Reliability Matters
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 56 }}>
          <span style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, color: "#252629" }}>
            Engineering
          </span>
          <span style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, color: "#8a6428" }}>
            complex spaces.
          </span>
        </div>

        <span style={{ marginTop: 40, fontSize: 20, letterSpacing: 2, color: "#66645a", textTransform: "uppercase" }}>
          Est. 2000 · MEP since 2013 · Kathmandu, Nepal
        </span>
      </div>
    ),
    { ...size }
  );
}
