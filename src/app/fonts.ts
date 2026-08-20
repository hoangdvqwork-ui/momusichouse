import localFont from "next/font/local";

// Display H1 — BT Danta (not a trial font)
export const btDanta = localFont({
  src: [
    { path: "../../public/fonts/display-h1/BTDanta-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/display-h1/BTDanta-Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/display-h1/BTDanta-ExtraBold.otf", weight: "800", style: "normal" },
  ],
  variable: "--font-bt-danta",
  display: "swap",
});

// Display H2/H3 — ABC Arizona Flare (TRIAL, dev/preview only, see globals.css note)
export const arizonaFlare = localFont({
  src: [
    { path: "../../public/fonts/display-h2h3/ABCArizonaFlareTrial-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/display-h2h3/ABCArizonaFlareTrial-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/display-h2h3/ABCArizonaFlareTrial-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-arizona-flare",
  display: "swap",
});

// Body — ABC Arizona Sans (TRIAL, dev/preview only, see globals.css note)
export const arizonaSans = localFont({
  src: [
    { path: "../../public/fonts/body/ABCArizonaSansTrial-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/body/ABCArizonaSansTrial-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/body/ABCArizonaSansTrial-Medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-arizona-sans",
  display: "swap",
});
