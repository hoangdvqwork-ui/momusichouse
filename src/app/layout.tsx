import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { btDanta, arizonaFlare, arizonaSans } from "./fonts";

// SEO audit ("Signal Check"), 2026-08-24:
// - metadataBase makes every relative OG/canonical URL sitewide
//   resolve against the real canonical domain instead of Vercel's own
//   deployment URL. www, not apex -- apex 308-redirects to www live,
//   confirmed during the audit.
// - Default title/description updated off the stale placeholder ("The
//   Sound of your Idea." didn't even match the current hero copy, "The
//   Sound of Ideas") -- this is the sitewide fallback now, the
//   homepage itself sets its own more specific pair (page.tsx).
// - openGraph/twitter here are the sitewide defaults; pages with their
//   own og:image (project detail) override via their own metadata.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.momusichouse.com"),
  title: "Mõ Music House",
  description:
    "Commercial scoring, sonic branding, talent booking, and live event music direction from Mõ Music House.",
  openGraph: {
    siteName: "Mõ Music House",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Organization structured data, sitewide -- gives Google (and AI
// systems) a single, consistent entity to attach the brand to, rather
// than inferring it fresh from page text on every crawl.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mõ Music House",
  url: "https://www.momusichouse.com",
  logo: "https://www.momusichouse.com/logo/Mo_logo_black.svg",
  description:
    "Commercial scoring, sonic branding, talent booking, and live event music direction, based in Vietnam.",
  email: "hello@momusichouse.com",
  telephone: "+84338114494",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${btDanta.variable} ${arizonaFlare.variable} ${arizonaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <main className="flex-1 flex flex-col">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
