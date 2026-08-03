import Link from "next/link";
import GuideRow from "@/components/GuideRow";
import { articles } from "@/content/writing";
import { personalRecords } from "@/content/athletics";

export default function HomePage() {
  return (
    <div className="measure">
      {/* Intro */}
      <section className="fade pt-28 pb-8">
        <h1
          className="text-[3.5rem] leading-[1.05] font-normal tracking-tight text-[var(--ink)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Ben Schippers
        </h1>
        <p className="mt-8 text-[1.15rem] leading-relaxed dim max-w-[33rem]">
          Entrepreneur and product architect building at the intersection of
          technology and energy, and co-chair of Brooklyn Roasting Company. I
          make software, run long distances, and write about how tech reshapes
          markets.
        </p>
        <p className="mt-8 text-[1rem]">
          <Link href="/contact" className="qlink">
            Get in touch
          </Link>
        </p>
      </section>

      {/* Index */}
      <section className="fade mt-20">
        <GuideRow
          title="Career"
          description="Three-time founder — TezLab, a $30M HappyFunCorp exit, and Austin Ventures-backed Workstreamer."
          href="/career"
        />
        <GuideRow
          title="Writing"
          description={`Essays in TechCrunch, FastCompany, Forbes, and Inc. ${articles.length} pieces.`}
          href="/writing"
        />
        <GuideRow
          title="Athletics"
          description={`${personalRecords[0].mark} mile, ${personalRecords[2].mark} half marathon, 42 miles across the Grand Canyon.`}
          href="/athletics"
        />
        <GuideRow
          title="Projects"
          description="EV software, ML leaderboards, computer vision, and this site."
          href="/projects"
        />
        <GuideRow
          title="Contact"
          description="Email, X, and GitHub."
          href="/contact"
        />
      </section>
    </div>
  );
}
