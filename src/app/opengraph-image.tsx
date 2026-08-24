import { ImageResponse } from "next/og";

// Default social-share image, 2026-08-24 (SEO audit) -- Next.js picks
// this up automatically as the og:image/twitter:image for any page
// that doesn't set its own (project detail pages do, via their cover
// image -- see [slug]/page.tsx). No existing 1200x630 asset to reuse,
// so generated at request time instead of needing a designed file.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          Mõ Music House
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#F7D101",
            textAlign: "center",
          }}
        >
          The Sound of Ideas
        </div>
      </div>
    ),
    { ...size }
  );
}
