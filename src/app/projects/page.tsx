import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Ben Schippers",
  description: "Things I've built.",
};

interface Project {
  name: string;
  description: string;
  url?: string;
  year: number;
  status: "active" | "archived" | "wip";
  tags?: string[];
}

const projects: Project[] = [
  {
    name: "BenSchippers.com",
    description: "This website. Built with Next.js, Drizzle ORM, and Neon Postgres.",
    url: "https://benschippers.com",
    year: 2025,
    status: "active",
    tags: ["Next.js", "Postgres"],
  },
];

const statusLabel: Record<Project["status"], string> = {
  active: "Active",
  archived: "Archived",
  wip: "In Progress",
};

export default function ProjectsPage() {
  return (
    <div>
      <section className="mb-20 pt-8">
        <div className="mb-6">
          <span
            className="text-xs tracking-widest uppercase text-[var(--accent-dim)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Work
          </span>
        </div>
        <h1
          className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.0] text-[var(--fg)] mb-10"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          Projects.
        </h1>
        <p
          className="text-lg text-[var(--fg-muted)] leading-relaxed max-w-[30rem] italic"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Things I&apos;ve built, shipped, or am currently working on.
        </p>
      </section>

      <div className="border-t border-[var(--border)]">
        {projects.map((project, i) => (
          <div
            key={i}
            className="py-10 border-b border-[var(--border)] grid grid-cols-[2.5rem_1fr] gap-6"
          >
            <div
              className="text-xs text-[var(--fg-faint)] pt-1 tabular-nums text-right"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                <h2
                  className="text-2xl text-[var(--fg)]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em" }}
                >
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      {project.name} ↗
                    </a>
                  ) : (
                    project.name
                  )}
                </h2>
                <span
                  className="text-xs text-[var(--fg-faint)] tracking-widest uppercase mt-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.year} &middot; {statusLabel[project.status]}
                </span>
              </div>
              <p
                className="text-[var(--fg-muted)] leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem" }}
              >
                {project.description}
              </p>
              {project.tags && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs text-[var(--fg-faint)] border border-[var(--border)] rounded-sm"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
