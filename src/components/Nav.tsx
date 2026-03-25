"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-[var(--line)] bg-[rgba(7,7,10,0.8)] backdrop-blur-[20px]">
      <div className="max-w-[72rem] mx-auto px-6 h-12 flex items-center justify-between">
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.1em", color: "var(--bright)" }}
        >
          BEN <span style={{ color: "var(--ember)" }}>SCHIPPERS</span>
        </Link>
        <div className="flex gap-3 sm:gap-6" style={{ fontFamily: "var(--font-mono)" }}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-[9px] sm:text-xs tracking-wider sm:tracking-widest uppercase transition-colors"
                style={{
                  color: active ? "var(--ember)" : "var(--ghost)",
                  fontWeight: active ? 600 : 400,
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
