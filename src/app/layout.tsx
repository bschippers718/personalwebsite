import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ben Schippers",
  description: "Thoughts, projects, and musings from Ben Schippers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${ibmPlexMono.variable}`}>
      <body className="grid-bg scanlines">
        <div className="page-wrapper">
          <Navbar />
          <main className="flex-1 relative z-10" style={{ paddingTop: "4rem" }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
