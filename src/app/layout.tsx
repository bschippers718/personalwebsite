import type { Metadata } from "next";
import { Syne, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const syne = Syne({ subsets: ["latin"], variable: "--font-display" });
const ibmPlexMono = IBM_Plex_Mono({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Ben Schippers",
  description: "Thoughts, projects, and musings from Ben Schippers.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${ibmPlexMono.variable}`}>
      <body className="grid-bg scanlines">
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 w-full max-w-[72rem] mx-auto px-6 py-16 relative z-10">
            {children}
          </main>
          <footer className="w-full relative z-10">
            <div className="max-w-[72rem] mx-auto px-6 py-10 border-t border-[var(--line)] flex items-center justify-between">
              <p className="text-xs text-[var(--ghost)] tracking-widest uppercase" style={{ fontFamily: "var(--font-mono)" }}>
                built by <span style={{ color: "var(--bright)" }}>Ben Schippers</span> · {new Date().getFullYear()}
              </p>
              <p className="text-xs text-[var(--ghost)]" style={{ fontFamily: "var(--font-mono)" }}>
                NYC · product · code · miles
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
