"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/career", label: "Career" },
  { href: "/writing", label: "Writing" },
  { href: "/athletics", label: "Athletics" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function ChannelNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Site" className="overflow-x-auto">
      <ul className="flex items-center gap-4 sm:gap-5 whitespace-nowrap">
        {links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`nlink text-[0.82rem] ${active ? "active font-medium" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
