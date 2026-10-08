import type { Metadata, Viewport } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

const title = "Fernando Vazquez — Fullstack Developer";

export const metadata: Metadata = {
  metadataBase: new URL("https://fernandovazquez.dev"),
  title,
  description: site.description,
  authors: [{ name: site.name }],
  icons: { icon: "/icon.png" },
  openGraph: {
    type: "website",
    title,
    description: site.description,
    url: "https://fernandovazquez.dev",
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0f0f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        {children}
        <Reveal />
      </body>
    </html>
  );
}
