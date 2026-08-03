export default function SiteFooter() {
  return (
    <footer className="w-full mt-32 border-t border-[var(--line)]">
      <div className="measure py-12 flex items-center justify-between text-[0.8rem] dim">
        <p>© {new Date().getFullYear()} Ben Schippers</p>
        <p className="faint">New York</p>
      </div>
    </footer>
  );
}
