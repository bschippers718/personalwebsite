import type { Metadata } from "next";
import ChannelHeader from "@/components/ChannelHeader";
import { projects, statusMeta } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things built, shipped, or currently in progress.",
};

export default function ProjectsPage() {
  return (
    <div className="measure pt-24 fade">
      <ChannelHeader
        title="Projects"
        note="Things I've built, shipped, or am currently working on."
      />

      <div>
        {projects.map((project) => (
          <article key={project.name} className="py-6 border-b border-[var(--line)]">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-[1.05rem] font-medium tracking-tight text-[var(--ink)]">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qlink"
                  >
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
              </h2>
              <span className="faint text-[0.72rem] font-medium tracking-wide uppercase whitespace-nowrap">
                {statusMeta[project.status].label}
              </span>
            </div>
            <p className="dim mt-1.5 text-[0.9rem] leading-relaxed">
              {project.description}
            </p>
            <p className="faint mt-2 text-[0.78rem]">
              {project.tags.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
