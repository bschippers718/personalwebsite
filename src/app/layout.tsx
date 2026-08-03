import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import Masthead from "@/components/Masthead";
import SiteFooter from "@/components/SiteFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Ben Schippers",
    template: "%s — Ben Schippers",
  },
  description:
    "Ben Schippers — founder, product builder, investor, and endurance athlete.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Ben Schippers",
    description: "Builder, athlete, investor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body>
        <div className="min-h-screen flex flex-col">
          <Masthead />
          <main className="flex-1 w-full">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
