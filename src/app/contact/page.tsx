import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Ben Schippers",
  description: "Get in touch.",
};

interface ContactLink {
  label: string;
  href: string;
  description: string;
}

const links: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:ben@benschippers.com",
    description: "ben@benschippers.com",
  },
  {
    label: "GitHub",
    href: "https://github.com/benschippersmini",
    description: "github.com/benschippersmini",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/benschippersmini",
    description: "linkedin.com/in/benschippersmini",
  },
];

export default function ContactPage() {
  return (
    <div style={{ marginTop: "3rem" }}>
      <section style={{ marginBottom: "5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "11px", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--ghost)" }}>
            Say Hello
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.0, color: "var(--bright)", marginBottom: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
          CONTACT.
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--dim)", lineHeight: 1.7, maxWidth: "32rem" }}>
          The best way to reach me.
        </p>
      </section>

      <div style={{ borderTop: "1px solid var(--line)" }}>
        {links.map((link, i) => (
          <div
            key={i}
            style={{ paddingBottom: "2rem", borderBottom: "1px solid var(--line)", display: "grid", gridTemplateColumns: "2.5rem 1fr", gap: "1.5rem" }}
          >
            <div style={{ fontSize: "11px", color: "var(--ghost)", paddingTop: "0.15rem", textAlign: "right", fontFamily: "var(--font-mono)" }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "1.5rem", color: "var(--bright)", fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                {link.label}
              </span>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="contact-link"
                style={{ fontSize: "0.875rem", color: "var(--dim)", textDecoration: "none", fontFamily: "var(--font-mono)" }}
              >
                {link.description} ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
