import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Ben Schippers",
  description: "Things I've built.",
};

const GITHUB_USERNAME = "bschippers718";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  created_at: string;
  topics: string[];
}

async function getRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed&direction=desc`,
    {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) return [];

  const repos: GitHubRepo[] = await res.json();
  return repos.filter((r) => !r.fork && !r.archived);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Swift: "#F05138",
  Ruby: "#701516",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
};

export default async function ProjectsPage() {
  const repos = await getRepos();

  return (
    <div className="content-container" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <section style={{ marginBottom: "3rem" }}>
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
          Public repositories from{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--ember)", textDecoration: "none" }}
          >
            github.com/{GITHUB_USERNAME}
          </a>
          . Sorted by most recently pushed.
        </p>
      </section>

      {repos.length === 0 ? (
        <p style={{ color: "var(--ghost)", textAlign: "center", padding: "3rem 0" }}>
          Unable to load repositories right now.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            border: "1px solid var(--line)",
            background: "var(--line)",
          }}
        >
          {repos.map((repo, i) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-repo-row"
              style={{ background: "var(--base)" }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--ghost)",
                  textAlign: "right",
                  fontFamily: "var(--font-mono)",
                  minWidth: "2rem",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {repo.name}
                  </span>
                  {repo.stargazers_count > 0 && (
                    <span style={{ fontSize: "11px", color: "var(--ember)" }}>
                      ★ {repo.stargazers_count}
                    </span>
                  )}
                </div>
                {repo.description && (
                  <div
                    style={{
                      color: "var(--dim)",
                      fontSize: "0.8rem",
                      marginTop: "0.2rem",
                      lineHeight: 1.5,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {repo.description}
                  </div>
                )}
                {repo.topics.length > 0 && (
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginTop: "0.4rem" }}>
                    {repo.topics.slice(0, 5).map((topic) => (
                      <span
                        key={topic}
                        style={{
                          fontSize: "9px",
                          padding: "0.1rem 0.4rem",
                          background: "var(--raised)",
                          border: "1px solid var(--line)",
                          color: "var(--ghost)",
                          borderRadius: "3px",
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                {repo.language && (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "11px", color: "var(--ghost)" }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: langColors[repo.language] || "var(--dim)",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                <span
                  className="project-date-desktop"
                  style={{
                    fontSize: "11px",
                    color: "var(--ghost)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatDate(repo.pushed_at)}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
