import type { Metadata } from "next";
import ChannelHeader from "@/components/ChannelHeader";
import { contactChannels } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Ben Schippers or find him on X and GitHub.",
};

export default function ContactPage() {
  return (
    <div className="measure pt-24 fade">
      <ChannelHeader
        title="Contact"
        note="Email is the fastest way to reach me."
      />

      <div>
        {contactChannels.map((channel) => (
          <a
            key={channel.href}
            href={channel.href}
            target={channel.href.startsWith("mailto") ? undefined : "_blank"}
            rel={
              channel.href.startsWith("mailto")
                ? undefined
                : "noopener noreferrer"
            }
            className="rlink group flex items-baseline justify-between gap-6 py-5 border-b border-[var(--line)]"
          >
            <span className="text-[1.05rem] font-medium tracking-tight text-[var(--ink)]">
              {channel.label}
            </span>
            <span className="dim text-[0.9rem] truncate">{channel.handle}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
