"use client";

import { useState, useEffect, useCallback } from "react";

interface TezLabStatus {
  connected: boolean;
  hasAccessToken: boolean;
  hasRefreshToken: boolean;
}

async function mcpFetch(tool: string, args: Record<string, unknown> = {}) {
  const res = await fetch("/api/tezlab/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tool, args }),
  });

  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`MCP call failed: ${res.status}`);

  const data = await res.json();
  return data.result;
}

function extractText(result: unknown): string | null {
  if (!result || typeof result !== "object") return null;
  const r = result as { content?: Array<{ type: string; text: string }> };
  if (r.content && Array.isArray(r.content)) {
    const textPart = r.content.find((c) => c.type === "text");
    return textPart?.text || null;
  }
  return null;
}

export function useTezLab() {
  const [status, setStatus] = useState<TezLabStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    vehicles?: unknown;
    batteryHealth?: unknown;
    efficiency?: unknown;
    drives?: unknown;
    charges?: unknown;
    stats?: unknown;
  }>({});

  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/tezlab/status");
      const s = await res.json();
      setStatus(s);
      return s.connected;
    } catch {
      setStatus({ connected: false, hasAccessToken: false, hasRefreshToken: false });
      return false;
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [vehicles, batteryHealth, efficiency, drives, charges, stats] =
        await Promise.allSettled([
          mcpFetch("list_vehicles"),
          mcpFetch("get_battery_health"),
          mcpFetch("get_efficiency"),
          mcpFetch("get_drives"),
          mcpFetch("get_charges"),
          mcpFetch("get_stats"),
        ]);

      setData({
        vehicles: vehicles.status === "fulfilled" ? parseResult(vehicles.value) : undefined,
        batteryHealth: batteryHealth.status === "fulfilled" ? parseResult(batteryHealth.value) : undefined,
        efficiency: efficiency.status === "fulfilled" ? parseResult(efficiency.value) : undefined,
        drives: drives.status === "fulfilled" ? parseResult(drives.value) : undefined,
        charges: charges.status === "fulfilled" ? parseResult(charges.value) : undefined,
        stats: stats.status === "fulfilled" ? parseResult(stats.value) : undefined,
      });
    } catch (err) {
      console.error("Error fetching TezLab data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkStatus().then((connected) => {
      if (connected) {
        fetchData();
      } else {
        setLoading(false);
      }
    });
  }, [checkStatus, fetchData]);

  return { status, loading, data, refetch: fetchData };
}

function parseResult(result: unknown): unknown {
  const text = extractText(result);
  if (text) {
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
  return result;
}
