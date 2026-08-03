import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  return (
    <div className="measure pt-24 fade">
      <div className="flex items-center justify-between mb-10">
        <h1
          className="text-[2rem] font-normal tracking-tight text-[var(--ink)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Thoughts
        </h1>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="nlink text-[0.82rem] cursor-pointer"
          >
            Sign out
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
