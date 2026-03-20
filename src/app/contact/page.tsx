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
    <div>
      <section className="mb-20 pt-8">
        <div className="mb-6">
          <span
            className="text-xs tracking-widest uppercase text-[var(--accent-dim)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Say Hello
          </span>
        </div>
        <h1
          className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.0] text-[var(--fg)] mb-10"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          Contact.
        </h1>
        <p
          className="text-lg text-[var(--fg-muted)] leading-relaxed max-w-[30rem] italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          The best way to reach me.
        </p>
      </section>

      <div className="border-t border-[var(--border)]">
        {links.map((link, i) => (
          <div
            key={i}
            className="py-8 border-b border-[var(--border)] grid grid-cols-[2.5rem_1fr] gap-6"
          >
            <div
              className="text-xs text-[var(--fg-faint)] pt-1 tabular-nums text-right"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <span
                className="text-2xl text-[var(--fg)]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                {link.label}
              </span>
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="text-sm text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
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
