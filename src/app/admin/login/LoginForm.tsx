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
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoComplete="current-password"
        className="w-full px-4 py-3 border border-[var(--line)] rounded-lg bg-[var(--surface)] placeholder-[var(--faint)] outline-none focus:border-[var(--faint)] text-[0.95rem] transition-colors"
        disabled={loading}
      />
      {error && <p className="text-[0.82rem] accent">{error}</p>}
      <button
        type="submit"
        disabled={loading || !password}
        className="w-full py-3 rounded-lg bg-[var(--ink)] text-[var(--bg)] text-[0.9rem] font-medium hover:opacity-85 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-opacity"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
