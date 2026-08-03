import Link from "next/link";

interface GuideRowProps {
  title: string;
  description: string;
  href: string;
}

export default function GuideRow({ title, description, href }: GuideRowProps) {
  return (
    <Link
      href={href}
      className="rlink group flex items-baseline justify-between gap-6 py-6 border-b border-[var(--line)]"
    >
      <div className="min-w-0">
        <span className="rtitle block text-[1.2rem] font-medium tracking-tight text-[var(--ink)]">
          {title}
        </span>
        <span className="dim block mt-1.5 text-[0.95rem] leading-relaxed">
          {description}
        </span>
      </div>
      <span className="go shrink-0 text-base">→</span>
    </Link>
  );
}
