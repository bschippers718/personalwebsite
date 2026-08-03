import Link from "next/link";
import ChannelNav from "./ChannelNav";

export default function Masthead() {
  return (
    <header className="w-full sticky top-0 z-50 bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--line)]">
      <div className="measure h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-[0.95rem] font-medium tracking-tight text-[var(--ink)]"
        >
          Ben Schippers
        </Link>
        <ChannelNav />
      </div>
    </header>
  );
}
