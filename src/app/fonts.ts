import localFont from "next/font/local";

// SEO audit ("Signal Check"), 2026-08-24 -- switched from .otf to
// .woff2 (converted via fonttools, originals kept in place alongside,
// just unreferenced now). 42-60% smaller per file depending on the
// family, on top of whatever Vercel's own Brotli transport compression
// already did -- WOFF2's font-specific compression still meaningfully
// beats a generically-compressed OTF. Licensing confirmed real
// (2026-08-24) for all three families, see globals.css.

// Display H1 — BT Danta
export const btDanta = localFont({
  src: [
    { path: "../../public/fonts/display-h1/BTDanta-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/display-h1/BTDanta-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/display-h1/BTDanta-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-bt-danta",
  display: "swap",
});

// Display H2/H3 — ABC Arizona Flare
export const arizonaFlare = localFont({
  src: [
    { path: "../../public/fonts/display-h2h3/ABCArizonaFlareTrial-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/display-h2h3/ABCArizonaFlareTrial-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/display-h2h3/ABCArizonaFlareTrial-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-arizona-flare",
  display: "swap",
});

// Body — ABC Arizona Sans
export const arizonaSans = localFont({
  src: [
    { path: "../../public/fonts/body/ABCArizonaSansTrial-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/body/ABCArizonaSansTrial-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/body/ABCArizonaSansTrial-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-arizona-sans",
  display: "swap",
});
