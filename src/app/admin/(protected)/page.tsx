import { getThoughts } from "@/lib/thoughts";
import ComposeBox from "@/components/ComposeBox";
import DeleteButton from "@/components/DeleteButton";
import { formatDistanceToNow } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const thoughts = await getThoughts().catch(() => []);

  return (
    <div>
      <ComposeBox />

      <div>
        <h2
          className="text-sm text-[var(--fg-muted)] mb-6 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          All thoughts ({thoughts.length})
        </h2>

        {thoughts.length === 0 ? (
          <p className="text-sm text-[var(--fg-muted)] py-8 text-center">
            No thoughts yet.
          </p>
        ) : (
          <div>
            {thoughts.map((thought) => (
              <div
                key={thought.id}
                className="py-5 border-b border-[var(--border)] last:border-0"
              >
                <p className="text-sm text-[var(--fg)] whitespace-pre-wrap break-words mb-2">
                  {thought.content}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-xs text-[var(--fg-muted)]">
                    {formatDistanceToNow(new Date(thought.createdAt), { addSuffix: true })}
                  </time>
                  <DeleteButton thoughtId={thought.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
