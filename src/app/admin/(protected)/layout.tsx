import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Double-check auth (middleware also protects, this is a safeguard)
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1
          className="text-2xl text-[var(--fg)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Admin
        </h1>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="text-xs text-[var(--fg-muted)] hover:text-[var(--accent)] transition-colors"
          >
            sign out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
