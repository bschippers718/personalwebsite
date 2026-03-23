"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface TezLabStatus {
  connected: boolean;
  hasAccessToken: boolean;
  hasRefreshToken: boolean;
}

export interface TezLabVehicle {
  vin: string;
  displayName: string;
  model: string;
  modelYear: number;
  odometer: number;
  connectionState: string;
  lastSeen: string;
  commandStatus: string;
  imageUrl?: string;
}

export interface TezLabData {
  vehicleStatus?: unknown;
  batteryHealth?: unknown;
  efficiency?: unknown;
  drives?: unknown;
  charges?: unknown;
  stats?: unknown;
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

function parseResult(result: unknown): unknown {
  const text = extractText(result);
  if (text) {
    try { return JSON.parse(text); } catch { return text; }
  }
  const r = result as Record<string, unknown> | null;
  if (r?.structuredContent) return r.structuredContent;
  return result;
}

function parseVehicles(raw: unknown): TezLabVehicle[] {
  if (!raw || typeof raw !== "object") return [];
  const obj = raw as Record<string, unknown>;
  const arr = (obj.vehicles ?? obj) as unknown[];
  if (!Array.isArray(arr)) return [];
  return arr.map((v) => {
    const d = v as Record<string, unknown>;
    return {
      vin: String(d.vin ?? ""),
      displayName: String(d.display_name ?? d.name ?? "Vehicle"),
      model: String(d.model ?? ""),
      modelYear: Number(d.model_year ?? d.year ?? 0),
      odometer: Math.round(Number(d.odometer ?? 0)),
      connectionState: String(d.connection_state ?? "unknown"),
      lastSeen: String(d.last_seen ?? ""),
      commandStatus: String(d.command_status ?? ""),
      imageUrl: d.image_url ? String(d.image_url) : undefined,
    };
  });
}

function pickBestVehicle(vehicles: TezLabVehicle[]): string | undefined {
  if (!vehicles.length) return undefined;
  const online = vehicles.filter((v) => v.connectionState === "online");
  if (online.length === 1) return online[0].vin;
  if (online.length > 1) {
    const sorted = [...online].sort(
      (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime(),
    );
    return sorted[0].vin;
  }
  const sorted = [...vehicles].sort(
    (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime(),
  );
  return sorted[0].vin;
}

async function batchFetch(calls: Array<{ tool: string; args?: Record<string, unknown> }>) {
  const res = await fetch("/api/tezlab/batch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ calls }),
  });

  if (res.status === 401) return { auth: false, results: [] };
  if (!res.ok) return { auth: true, results: [], error: `Server error: ${res.status}` };

  const { results } = (await res.json()) as {
    results: Array<{ tool: string; result?: unknown; error?: string }>;
  };
  return { auth: true, results: results ?? [] };
}

export function useTezLab() {
  const [status, setStatus] = useState<TezLabStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<TezLabVehicle[]>([]);
  const [selectedVin, setSelectedVin] = useState<string | null>(null);
  const [data, setData] = useState<TezLabData>({});
  const [error, setError] = useState<string | null>(null);
  const retryCount = useRef(0);
  const retryTimer = useRef<NodeJS.Timeout | null>(null);

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

  const fetchVehicles = useCallback(async (): Promise<TezLabVehicle[] | null> => {
    const { auth, results, error: fetchErr } = await batchFetch([
      { tool: "list_vehicles", args: {} },
    ]);
    if (!auth) return null;
    if (fetchErr || !results.length) return null;

    const r = results.find((r) => r.tool === "list_vehicles");
    if (!r?.result) return null;

    return parseVehicles(parseResult(r.result));
  }, []);

  const fetchVehicleData = useCallback(async (vin: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const vinArgs = { vin };
      const { auth, results, error: fetchErr } = await batchFetch([
        { tool: "get_vehicle_status", args: vinArgs },
        { tool: "get_battery_health", args: vinArgs },
        { tool: "get_efficiency", args: vinArgs },
        { tool: "get_drives", args: vinArgs },
        { tool: "get_charges", args: vinArgs },
        { tool: "get_stats", args: vinArgs },
      ]);

      if (!auth) { setLoading(false); return false; }

      if (fetchErr) {
        setError(fetchErr);
        setLoading(false);
        return false;
      }

      const successes = results.filter((r) => r.result && !r.error);
      if (successes.length === 0) {
        setError("MCP server unavailable — retrying…");
        setLoading(false);
        return false;
      }

      const find = (name: string) => {
        const r = results.find((r) => r.tool === name);
        return r?.result ? parseResult(r.result) : undefined;
      };

      setData({
        vehicleStatus: find("get_vehicle_status"),
        batteryHealth: find("get_battery_health"),
        efficiency: find("get_efficiency"),
        drives: find("get_drives"),
        charges: find("get_charges"),
        stats: find("get_stats"),
      });

      retryCount.current = 0;
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Error fetching TezLab data:", err);
      setError("Network error — retrying…");
      setLoading(false);
      return false;
    }
  }, []);

  const selectVehicle = useCallback(
    (vin: string) => {
      setSelectedVin(vin);
      setData({});
      fetchVehicleData(vin);
    },
    [fetchVehicleData],
  );

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const connected = await checkStatus();
      if (!connected || cancelled) {
        setLoading(false);
        return;
      }

      const vList = await fetchVehicles();
      if (cancelled) return;

      if (!vList || !vList.length) {
        setError("MCP server unavailable — retrying…");
        scheduleRetry();
        return;
      }

      setVehicles(vList);
      const best = pickBestVehicle(vList);
      if (!best) { setLoading(false); return; }
      setSelectedVin(best);

      const ok = await fetchVehicleData(best);
      if (ok || cancelled) return;
      scheduleRetry();
    }

    function scheduleRetry() {
      if (cancelled) return;
      if (retryCount.current >= 5) {
        setError("MCP server unavailable. Click Connect to retry.");
        setLoading(false);
        return;
      }
      const delay = Math.min(5000 * Math.pow(2, retryCount.current), 60000);
      retryCount.current++;
      retryTimer.current = setTimeout(() => {
        if (!cancelled) init();
      }, delay);
    }

    init();
    return () => {
      cancelled = true;
      if (retryTimer.current) clearTimeout(retryTimer.current);
    };
  }, [checkStatus, fetchVehicles, fetchVehicleData]);

  return {
    status,
    loading,
    vehicles,
    selectedVin,
    selectVehicle,
    data,
    error,
    refetch: () => selectedVin ? fetchVehicleData(selectedVin) : Promise.resolve(false),
  };
}
