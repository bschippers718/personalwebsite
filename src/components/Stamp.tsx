interface StampProps {
  children: React.ReactNode;
}

export default function Stamp({ children }: StampProps) {
  return (
    <span className="text-[0.72rem] font-medium tracking-wide uppercase text-[var(--faint)] whitespace-nowrap">
      {children}
    </span>
  );
}
