import type { Metadata } from "next";
import "./globals.css";
import { btDanta, arizonaFlare, arizonaSans } from "./fonts";

export const metadata: Metadata = {
  title: "Mõ Music House",
  description: "The Sound of your Idea.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${btDanta.variable} ${arizonaFlare.variable} ${arizonaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
