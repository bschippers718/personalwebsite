import { formatDistanceToNow } from "date-fns";
import type { Thought } from "@/db/schema";

interface ThoughtCardProps {
  thought: Thought;
  index?: number;
}

export default function ThoughtCard({ thought, index }: ThoughtCardProps) {
  const timeAgo = formatDistanceToNow(new Date(thought.createdAt), {
    addSuffix: true,
  });

  return (
    <article className="py-8 border-b border-[var(--border)] grid grid-cols-[2.5rem_1fr] gap-6 group">
      <div
        className="text-xs text-[var(--fg-faint)] pt-1 tabular-nums text-right"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {index !== undefined ? String(index).padStart(2, "0") : ""}
      </div>
      <div>
        <p className="text-[var(--fg)] leading-relaxed whitespace-pre-wrap break-words" style={{ fontFamily: "var(--font-serif)", fontSize: "1.05rem" }}>
          {thought.content}
        </p>
        <time
          className="block mt-3 text-xs text-[var(--fg-faint)] tracking-wide"
          dateTime={thought.createdAt.toISOString()}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {timeAgo}
        </time>
      </div>
    </article>
  );
}
