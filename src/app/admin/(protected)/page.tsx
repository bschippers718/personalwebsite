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

      <div className="mt-12">
        <h2 className="dim text-[0.85rem] mb-2">
          All thoughts ({thoughts.length})
        </h2>

        {thoughts.length === 0 ? (
          <p className="py-12 dim text-[0.95rem]">Nothing filed yet.</p>
        ) : (
          thoughts.map((thought) => (
            <div key={thought.id} className="py-5 border-b border-[var(--line)]">
              <p className="text-[0.95rem] leading-relaxed whitespace-pre-wrap break-words text-[var(--ink)]">
                {thought.content}
              </p>
              <div className="flex items-center justify-between mt-2">
                <time className="faint text-[0.8rem]">
                  {formatDistanceToNow(new Date(thought.createdAt), {
                    addSuffix: true,
                  })}
                </time>
                <DeleteButton thoughtId={thought.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
