"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Thoughts" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-[var(--border)]">
      <nav className="max-w-[52rem] mx-auto px-8 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-[var(--accent)] hover:text-[var(--fg)] transition-colors"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em" }}
        >
          BS
        </Link>
        <div className="flex gap-1" style={{ fontFamily: "var(--font-display)" }}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs tracking-widest uppercase transition-colors rounded-sm ${
                  active
                    ? "bg-[var(--bg-subtle)] text-[var(--fg)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
