import type { Metadata } from "next";
import ChannelHeader from "@/components/ChannelHeader";
import { career } from "@/content/career";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Building efficient products and the systems that help them scale.",
};

export default function CareerPage() {
  return (
    <div className="measure pt-24 fade">
      <ChannelHeader
        title="Career"
        note="I love working on projects that require a consistent focus on streamlining systems and thinking clearly about how every part connects. I love building beautifully efficient products — then creating the teams, operations, and commercial systems that help them scale."
      />

      <div>
        {career.map((entry) => (
          <article
            key={entry.org + entry.period}
            className="py-8 border-b border-[var(--line)]"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-[1.05rem] font-medium tracking-tight text-[var(--ink)]">
                {entry.org}
              </h2>
              <span className="faint text-[0.8rem] tabular whitespace-nowrap">
                {entry.period}
              </span>
            </div>
            <p className="mt-1 text-[0.92rem] text-[var(--ink)]">
              {entry.title}
            </p>
            {entry.detail && (
              <p className="dim mt-3 text-[0.9rem] leading-relaxed">
                {entry.detail}
              </p>
            )}
            {entry.highlights && entry.highlights.length > 0 && (
              <ul className="mt-4 space-y-2">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight.text}
                    className="relative pl-4 text-[0.86rem] leading-relaxed text-[var(--mid)] before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-1.5 before:bg-[var(--faint)]"
                  >
                    {highlight.href ? (
                      <a
                        href={highlight.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="qlink"
                      >
                        {highlight.text}
                      </a>
                    ) : (
                      highlight.text
                    )}
                  </li>
                ))}
              </ul>
            )}
            <p className="faint mt-4 text-[0.72rem] font-medium tracking-wide uppercase">
              {entry.statusLabel}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
