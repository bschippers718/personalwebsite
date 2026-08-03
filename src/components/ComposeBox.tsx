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
    <form onSubmit={handleSubmit}>
      <div className="border border-[var(--line)] rounded-lg bg-[var(--surface)] focus-within:border-[var(--faint)] transition-colors">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="New thought..."
          maxLength={maxChars}
          rows={4}
          className="w-full px-4 py-3 bg-transparent placeholder-[var(--faint)] resize-none outline-none text-[0.95rem] rounded-lg"
          disabled={loading}
        />
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--line)]">
          <span className={`text-[0.78rem] tabular ${charCount > maxChars * 0.9 ? "accent" : "faint"}`}>
            {charCount}/{maxChars}
          </span>
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="text-[0.82rem] font-medium text-[var(--accent)] hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-opacity"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
      {error && <p className="mt-2 text-[0.82rem] accent">{error}</p>}
      <p className="mt-2 text-[0.78rem] faint">Cmd+Enter to post</p>
    </form>
  );
}
