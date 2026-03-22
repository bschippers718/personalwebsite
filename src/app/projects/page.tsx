import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Ben Schippers",
  description: "Things I've built.",
};

const projects = [
  {
    num: "01",
    name: "BenSchippers.com",
    href: "https://benschippers.com",
    year: 2025,
    status: "Active",
    description:
      "This website. Built with Next.js, Drizzle ORM, and Neon Postgres.",
    tags: ["Next.js", "Postgres"],
  },
];

export default function ProjectsPage() {
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
            Work
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
          PROJECTS.
        </h1>
        <p
          style={{
            fontSize: "0.95rem",
            color: "var(--dim)",
            lineHeight: 1.7,
            maxWidth: "32rem",
          }}
        >
          Things I&apos;ve built, shipped, or am currently working on.
        </p>
      </section>

      <div>
        {projects.map((project) => (
          <div
            key={project.num}
            style={{
              paddingBottom: "2.5rem",
              borderBottom: "1px solid var(--line)",
              display: "grid",
              gridTemplateColumns: "2.5rem 1fr",
              gap: "1.5rem",
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
              {project.num}
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "1rem",
                  marginBottom: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    color: "var(--bright)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link"
                    style={{ color: "inherit" }}
                  >
                    {project.name} ↗
                  </a>
                </h2>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--ghost)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginTop: "0.25rem",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {project.year} · {project.status}
                </span>
              </div>
              <p
                style={{
                  color: "var(--dim)",
                  lineHeight: 1.7,
                  marginBottom: "1rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.95rem",
                }}
              >
                {project.description}
              </p>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "10px",
                      padding: "0.15rem 0.5rem",
                      background: "var(--raised)",
                      border: "1px solid var(--line)",
                      color: "var(--dim)",
                      borderRadius: "3px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
