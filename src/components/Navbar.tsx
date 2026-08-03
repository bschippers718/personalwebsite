"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--line)",
        background: "rgba(7,7,10,0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="content-container" style={{ height: "3rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
            color: "var(--bright)",
            flexShrink: 0,
          }}
        >
          BEN <span style={{ color: "var(--ember)" }}>SCHIPPERS</span>
        </Link>

        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            fontFamily: "var(--font-mono)",
            flexShrink: 0,
          }}
        >
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                  color: isActive ? "var(--ember)" : "var(--ghost)",
                  fontWeight: isActive ? 600 : 400,
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
