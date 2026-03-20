import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

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
    <html lang="en">
      <body>
        <div className="noise" aria-hidden="true" />
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1 w-full max-w-[52rem] mx-auto px-8 py-16">
            {children}
          </main>
          <footer className="w-full max-w-[52rem] mx-auto px-8 py-10 border-t border-[var(--border)] flex items-center justify-between">
            <p
              className="text-[var(--fg-faint)] text-xs tracking-widest uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ben Schippers
            </p>
            <p className="text-[var(--fg-faint)] text-xs" style={{ fontFamily: "var(--font-display)" }}>
              {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
