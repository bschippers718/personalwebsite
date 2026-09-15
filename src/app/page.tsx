import Link from "next/link";
import GuideRow from "@/components/GuideRow";
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
          I co-founded and run TezLab, software for Tesla and Rivian owners.
          Before TezLab, I co-founded HappyFunCorp, a bootstrapped product
          studio acquired by Tiny for $30M in 2023.
        </p>
        <p className="mt-5 text-[1.05rem] leading-relaxed dim max-w-[33rem]">
          I also use NYC Open Data to understand how the city moves. NYC in
          Motion combines transit, taxi, and flight data in one 3D map. It is
          the first in a series of projects that make the city&apos;s public data
          easier to read.
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
          description="TezLab; HappyFunCorp, acquired by Tiny for $30M; and earlier business-listening work."
          href="/career"
        />
        <GuideRow
          title="Writing"
          description="Six TechCrunch essays on software markets, distribution, and product strategy."
          href="/writing"
        />
        <GuideRow
          title="Athletics"
          description={`${personalRecords[0].mark} mile, ${personalRecords[2].mark} half marathon, and the Grand Canyon rim to rim to rim in under 10 hours.`}
          href="/athletics"
        />
        <GuideRow
          title="Projects"
          description="NYC transit visualization, EV apps, an on-device X filter, and computer-vision tools."
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
