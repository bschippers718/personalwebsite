import { getThoughts } from "@/lib/thoughts";
import ThoughtCard from "@/components/ThoughtCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const thoughts = await getThoughts().catch(() => []);

  return (
    <div>
      {/* Hero */}
      <section className="mb-24 pt-8">
        <div className="mb-6">
          <span
            className="text-xs tracking-widest uppercase text-[var(--accent-dim)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Software &amp; Ideas
          </span>
        </div>
        <h1
          className="text-[clamp(3rem,8vw,5.5rem)] leading-[1.0] text-[var(--fg)] mb-10"
          style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.03em" }}
        >
          Ben<br />
          <span className="text-[var(--fg-faint)]">Schippers.</span>
        </h1>
        <p
          className="text-lg text-[var(--fg-muted)] leading-relaxed max-w-[30rem]"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
        >
          I build software and think about how technology shapes the way we
          live and work. This is where I keep notes on things I&apos;m reading,
          making, and figuring out.
        </p>
      </section>

      {/* Thoughts feed */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <span
            className="text-xs tracking-widest uppercase text-[var(--accent-dim)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Thoughts
          </span>
          <span
            className="text-xs text-[var(--fg-faint)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {thoughts.length} {thoughts.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        <div className="border-t border-[var(--border)]">
          {thoughts.length === 0 ? (
            <p
              className="text-[var(--fg-faint)] py-20 text-center italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Nothing here yet.
            </p>
          ) : (
            thoughts.map((thought, i) => (
              <ThoughtCard key={thought.id} thought={thought} index={i + 1} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
