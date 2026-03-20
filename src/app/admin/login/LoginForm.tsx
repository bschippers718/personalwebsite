"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        throw new Error("Incorrect password");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          autoComplete="current-password"
          className="w-full px-4 py-3 border border-[var(--border)] bg-transparent text-[var(--fg)] placeholder-[var(--fg-muted)] outline-none focus:border-[var(--accent)] transition-colors text-sm font-mono"
          style={{ fontFamily: "var(--font-mono)" }}
          disabled={loading}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading || !password}
        className="w-full py-3 border border-[var(--fg)] text-[var(--fg)] text-sm hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[var(--bg)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "signing in..." : "sign in"}
      </button>
    </form>
  );
}
