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
    <article className="py-6 border-b border-[var(--line)] grid grid-cols-[2.5rem_1fr] gap-6 group">
      <div
        className="text-xs text-[var(--ghost)] pt-0.5 tabular-nums text-right"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {index !== undefined ? String(index).padStart(2, "0") : ""}
      </div>
      <div>
        <p className="text-[var(--bright)] leading-relaxed whitespace-pre-wrap break-words" style={{ fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>
          {thought.content}
        </p>
        <time
          className="block mt-2 text-xs text-[var(--ghost)] tracking-wide"
          dateTime={thought.createdAt.toISOString()}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {timeAgo}
        </time>
      </div>
    </article>
  );
}
