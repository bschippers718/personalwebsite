import Image from "next/image";
import Link from "next/link";
import GuideRow from "@/components/GuideRow";
import { articles } from "@/content/writing";
import { personalRecords } from "@/content/athletics";
import { projects } from "@/content/projects";

const nowBuilding = projects.find((p) => p.name === "NYC in Motion");

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
        <p className="mt-5 text-[1.05rem] leading-relaxed dim max-w-[33rem]">
          I also love working with NYC Open Data. I&apos;m building a suite of
          projects that explores how New York moves and makes what&apos;s happening
          around your block easier to see and understand.
        </p>
        <p className="mt-8 text-[1rem]">
          <Link href="/contact" className="qlink">
            Get in touch
          </Link>
        </p>
      </section>

      {/* Building now */}
      {nowBuilding?.url && nowBuilding.image && (
        <section className="fade mt-16">
          <p className="text-[0.72rem] font-medium tracking-wide uppercase text-[var(--accent)]">
            Building now
          </p>
          <h2 className="mt-2 text-[1.2rem] font-medium tracking-tight text-[var(--ink)]">
            <a
              href={nowBuilding.url}
              target="_blank"
              rel="noopener noreferrer"
              className="qlink"
            >
              {nowBuilding.name}
            </a>
          </h2>
          <p className="dim mt-1.5 text-[0.95rem] leading-relaxed">
            A live 3D map of New York as a stack of moving layers: subway trains
            at their real depth under the street, buses, ferries, taxis, and
            every aircraft overhead, drawn over the city&apos;s buildings. Pull the
            layers apart, or ride in the cab of a train across the Manhattan
            Bridge.
          </p>
          <a
            href={nowBuilding.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-5 overflow-hidden rounded-sm border border-[var(--line)]"
          >
            <Image
              src={nowBuilding.image.src}
              alt={nowBuilding.image.alt}
              width={nowBuilding.image.width}
              height={nowBuilding.image.height}
              sizes="(max-width: 640px) 100vw, 38rem"
              priority
              className="block w-full h-auto"
            />
          </a>
          <p className="mt-3 text-[0.82rem] flex flex-wrap gap-x-4 gap-y-1">
            <a
              href={nowBuilding.url}
              target="_blank"
              rel="noopener noreferrer"
              className="qlink"
            >
              Open the live map
            </a>
            {nowBuilding.repo && (
              <a
                href={nowBuilding.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="qlink"
              >
                View on GitHub
              </a>
            )}
            <Link href="/projects" className="qlink">
              All projects
            </Link>
          </p>
        </section>
      )}

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
          description="A live 3D map of New York, EV software, focused social tools, shared AI, ML research, and computer vision."
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
