"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  thoughtId: number;
}

export default function DeleteButton({ thoughtId }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/thoughts/${thoughtId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      router.refresh();
    } catch {
      setLoading(false);
      setConfirming(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      onBlur={() => setConfirming(false)}
      className={`text-xs transition-colors disabled:opacity-40 ${
        confirming
          ? "text-red-500 hover:text-red-700"
          : "text-[var(--fg-muted)] hover:text-red-500"
      }`}
    >
      {loading ? "deleting..." : confirming ? "confirm delete" : "delete"}
    </button>
  );
}
