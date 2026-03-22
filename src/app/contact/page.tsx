import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Ben Schippers",
  description: "Get in touch.",
};

const contacts = [
  {
    num: "01",
    label: "Email",
    href: "mailto:ben@benschippers.com",
    display: "ben@benschippers.com",
  },
  {
    num: "02",
    label: "GitHub",
    href: "https://github.com/bschippers718",
    display: "github.com/bschippers718",
    external: true,
  },
  {
    num: "03",
    label: "LinkedIn",
    href: "https://linkedin.com/in/benschippers",
    display: "linkedin.com/in/benschippers",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="content-container" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <section style={{ marginBottom: "5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--ghost)",
            }}
          >
            Say Hello
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 1,
            color: "var(--bright)",
            marginBottom: "2.5rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          CONTACT.
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--dim)",
            lineHeight: 1.7,
            maxWidth: "32rem",
          }}
        >
          The best way to reach me.
        </p>
      </section>

      <div style={{ borderTop: "1px solid var(--line)" }}>
        {contacts.map((contact) => (
          <div
            key={contact.num}
            className="contact-row"
            style={{
              paddingTop: "1.5rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid var(--line)",
              display: "grid",
              gridTemplateColumns: "2rem 1fr",
              gap: "1rem",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "var(--ghost)",
                paddingTop: "0.15rem",
                textAlign: "right",
                fontFamily: "var(--font-mono)",
              }}
            >
              {contact.num}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "1.5rem",
                  color: "var(--bright)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {contact.label}
              </span>
              <a
                href={contact.href}
                target={contact.external ? "_blank" : undefined}
                rel={contact.external ? "noopener noreferrer" : undefined}
                className="contact-link"
                style={{
                  fontSize: "0.875rem",
                  color: "var(--dim)",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {contact.display} ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
