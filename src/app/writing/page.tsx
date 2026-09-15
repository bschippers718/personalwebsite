import type { Metadata } from "next";
import ChannelHeader from "@/components/ChannelHeader";
import { articles } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on products, software, data, and technology markets.",
};

export default function WritingPage() {
  return (
    <div className="measure pt-24 fade">
      <ChannelHeader
        title="Writing"
        note="Six essays on software markets, APIs, distribution, and product strategy."
      />

      <div>
        {articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rlink group flex items-baseline justify-between gap-6 py-5 border-b border-[var(--line)]"
          >
            <div className="min-w-0">
              <span className="rtitle block text-[1.1rem] font-medium tracking-tight text-[var(--ink)] leading-snug">
                {article.title}
              </span>
              <span className="dim block mt-1 text-[0.85rem]">
                {article.publication} · {article.date}
              </span>
            </div>
            <span className="go shrink-0 text-sm">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
