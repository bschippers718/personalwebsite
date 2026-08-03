interface ChannelHeaderProps {
  title: string;
  note?: string;
}

export default function ChannelHeader({ title, note }: ChannelHeaderProps) {
  return (
    <div className="mb-14">
      <h1
        className="text-[3rem] leading-[1.05] font-normal tracking-tight text-[var(--ink)]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h1>
      {note && <p className="dim mt-4 text-[1rem] leading-relaxed max-w-[33rem]">{note}</p>}
    </div>
  );
}
