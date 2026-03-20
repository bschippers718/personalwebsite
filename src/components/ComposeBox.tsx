"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ComposeBox() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/thoughts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post thought");
      }

      setContent("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  const charCount = content.length;
  const maxChars = 500;

  return (
    <form onSubmit={handleSubmit} className="mb-12">
      <div className="border border-[var(--border)] focus-within:border-[var(--accent)] transition-colors">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What's on your mind?"
          maxLength={maxChars}
          rows={4}
          className="w-full px-4 py-3 bg-transparent text-[var(--fg)] placeholder-[var(--fg-muted)] resize-none outline-none text-sm font-mono"
          style={{ fontFamily: "var(--font-mono)" }}
          disabled={loading}
        />
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border)]">
          <span className={`text-xs ${charCount > maxChars * 0.9 ? "text-red-500" : "text-[var(--fg-muted)]"}`}>
            {charCount}/{maxChars}
          </span>
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="text-xs px-4 py-1.5 border border-[var(--fg)] text-[var(--fg)] hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[var(--bg)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "posting..." : "post"}
          </button>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-500">{error}</p>
      )}
      <p className="mt-1.5 text-xs text-[var(--fg-muted)]">
        ⌘↵ to submit
      </p>
    </form>
  );
}
