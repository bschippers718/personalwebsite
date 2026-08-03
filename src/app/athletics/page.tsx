import type { Metadata } from "next";
import ChannelHeader from "@/components/ChannelHeader";
import { personalRecords, highlights } from "@/content/athletics";

export const metadata: Metadata = {
  title: "Athletics",
  description: "Personal records, race results, and long miles.",
};

export default function AthleticsPage() {
  return (
    <div className="measure pt-24 fade">
      <ChannelHeader
        title="Athletics"
        note="Running, squash, and pushing limits. Personal records and results."
      />

      {/* PRs */}
      <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-px bg-[var(--line)] border border-[var(--line)] rounded-lg overflow-hidden mb-14">
        {personalRecords.map((pr) => (
          <div key={pr.event} className="bg-[var(--surface)] px-5 py-8 text-center">
            <div className="text-[1.9rem] leading-none font-medium tracking-tight text-[var(--ink)] tabular">
              {pr.mark}
            </div>
            <div className="dim mt-2 text-[0.8rem] uppercase tracking-wide">
              {pr.event}
            </div>
            {pr.detail && (
              <div className="faint mt-1 text-[0.78rem]">{pr.detail}</div>
            )}
          </div>
        ))}
      </div>

      {/* Results */}
      <div>
        {highlights.map((race) => (
          <div key={race.name} className="py-5 border-b border-[var(--line)]">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-[1.05rem] font-medium tracking-tight text-[var(--ink)]">
                {race.name}
              </h2>
              <span className="faint text-[0.72rem] font-medium tracking-wide uppercase whitespace-nowrap">
                {race.result}
              </span>
            </div>
            <p className="dim mt-1 text-[0.88rem]">{race.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
