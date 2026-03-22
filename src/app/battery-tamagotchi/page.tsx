"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./animations.css";

// ─── Mock Data (swap with TezLab MCP calls) ─────────────────────────────────

const VEHICLE = {
  name: "Model Y Long Range",
  year: 2022,
  miles: 28420,
  vin: "5YJ3E1...R4F",
};

const BATTERY = {
  healthPct: 94.2,
  degradationPct: 5.8,
  maxRangeMiles: 273,
  originalRangeMiles: 290,
  trend: "+0.1% this month",
  trendDirection: "up" as const,
};

const EFFICIENCY = {
  averagePct: 87,
  last30Days: 84,
  bestWeek: 93,
  streakWins: 5,
};

const GHOST_RACE = {
  routeName: "Home → Office",
  you: { efficiency: 87, kwhPerMile: 0.26 },
  ghost: { efficiency: 82, kwhPerMile: 0.29, label: "Your Avg" },
  delta: "+5%",
  result: "won" as const,
  personalBest: true,
};

const RECENT_DRIVES = [
  { date: "Mar 21", distance: "34.7 mi", efficiency: 84, result: "won" as const, route: "Home → Midtown" },
  { date: "Mar 20", distance: "12.3 mi", efficiency: 91, result: "won" as const, route: "Office → Gym" },
  { date: "Mar 19", distance: "28.1 mi", efficiency: 76, result: "lost" as const, route: "Brooklyn → JFK" },
  { date: "Mar 18", distance: "8.9 mi", efficiency: 89, result: "won" as const, route: "Home → Office" },
  { date: "Mar 17", distance: "41.2 mi", efficiency: 72, result: "lost" as const, route: "Road trip seg" },
];

const RECENT_CHARGES = [
  { date: "Mar 21", type: "L2 Home", from: 42, to: 80, coreImpact: +3, good: true },
  { date: "Mar 20", type: "L2 Home", from: 35, to: 78, coreImpact: +3, good: true },
  { date: "Mar 18", type: "Supercharger", from: 12, to: 95, coreImpact: -2, good: false },
  { date: "Mar 17", type: "L2 Home", from: 28, to: 80, coreImpact: +3, good: true },
  { date: "Mar 15", type: "L2 Work", from: 55, to: 80, coreImpact: +2, good: true },
];

const LIVE_DRIVE = {
  active: true,
  elapsed: "18:32",
  distanceMi: 14.2,
  efficiency: 89,
  avgSpeedMph: 34,
  energyKwh: 3.7,
  rangeRemainingMi: 142,
  batteryPct: 52,
};

// ─── Evolution Logic ─────────────────────────────────────────────────────────

type EvolutionStage = "Spark" | "Arc" | "Bolt" | "Storm" | "Nova";

interface Evolution {
  stage: EvolutionStage;
  level: number;
  ringCount: number;
  coreSize: number;
  glowIntensity: number;
  color: string;
  nextStage: EvolutionStage | null;
  progressToNext: number;
}

function getEvolution(core: number, pulse: number): Evolution {
  const combined = (core + pulse) / 2;
  if (combined >= 95) return { stage: "Nova", level: 5, ringCount: 5, coreSize: 56, glowIntensity: 1, color: "#00e676", nextStage: null, progressToNext: 100 };
  if (combined >= 85) return { stage: "Storm", level: 4, ringCount: 4, coreSize: 48, glowIntensity: 0.8, color: "#00e676", nextStage: "Nova", progressToNext: ((combined - 85) / 10) * 100 };
  if (combined >= 70) return { stage: "Bolt", level: 3, ringCount: 3, coreSize: 40, glowIntensity: 0.6, color: "#00e676", nextStage: "Storm", progressToNext: ((combined - 70) / 15) * 100 };
  if (combined >= 50) return { stage: "Arc", level: 2, ringCount: 2, coreSize: 32, glowIntensity: 0.4, color: "#26a69a", nextStage: "Bolt", progressToNext: ((combined - 50) / 20) * 100 };
  return { stage: "Spark", level: 1, ringCount: 1, coreSize: 24, glowIntensity: 0.2, color: "#4a6741", nextStage: "Arc", progressToNext: (combined / 50) * 100 };
}

// ─── Design Tokens ───────────────────────────────────────────────────────────

const T = {
  bg: "#0a0a14",
  card: "#0f0f1c",
  cardBorder: "#1a1a2e",
  green: "#00e676",
  greenDim: "rgba(0, 230, 118, 0.12)",
  greenGhost: "rgba(0, 230, 118, 0.06)",
  orange: "#ff9100",
  red: "#ff4757",
  text: "#e4e4ec",
  textDim: "#6b6b8a",
  textGhost: "#55556e",
  divider: "#141428",
};

// ─── Ring Gauge Component ────────────────────────────────────────────────────

function RingGauge({
  value,
  label,
  sublabel,
  size = 140,
  strokeWidth = 5,
  color = T.green,
}: {
  value: number;
  label: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const r = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - value / 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={T.cardBorder}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="gauge-track"
          style={{ filter: `drop-shadow(0 0 4px ${color}40)` }}
        />
      </svg>
      <div style={{ marginTop: `-${size / 2 + 18}px`, textAlign: "center", position: "relative" }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.6rem",
          fontWeight: 800,
          color: T.text,
          letterSpacing: "-0.02em",
        }}>
          {value.toFixed(1)}%
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: `${size / 2 - 38}px` }}>
        <div style={{
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: T.textDim,
          fontWeight: 500,
        }}>
          {label}
        </div>
        {sublabel && (
          <div style={{ fontSize: "11px", color: T.textGhost, marginTop: "0.25rem" }}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Creature Visualization ──────────────────────────────────────────────────

function Creature({ evolution, compact = false }: { evolution: Evolution; compact?: boolean }) {
  const viewSize = compact ? 160 : 240;
  const center = viewSize / 2;
  const rings = [];

  const ringConfigs = [
    { r: 38, dash: "4 8", width: 1.5, opacity: 0.7 },
    { r: 50, dash: "2 12", width: 1, opacity: 0.5 },
    { r: 62, dash: "8 6", width: 1.2, opacity: 0.4 },
    { r: 74, dash: "3 15", width: 0.8, opacity: 0.3 },
    { r: 86, dash: "12 4", width: 1, opacity: 0.25 },
  ];

  for (let i = 0; i < evolution.ringCount; i++) {
    const cfg = ringConfigs[i];
    rings.push(
      <circle
        key={i}
        cx={center} cy={center}
        r={compact ? cfg.r * 0.67 : cfg.r}
        className={`creature-ring ring-${i + 1}`}
        stroke={evolution.color}
        strokeWidth={cfg.width}
        strokeDasharray={cfg.dash}
        opacity={cfg.opacity * evolution.glowIntensity}
      />
    );
  }

  const coreR = compact ? evolution.coreSize * 0.55 : evolution.coreSize * 0.8;

  return (
    <div style={{ position: "relative", width: viewSize, height: viewSize }}>
      <svg width={viewSize} height={viewSize} style={{ position: "absolute", inset: 0 }}>
        {rings}
      </svg>

      {evolution.level >= 5 && (
        <div className="corona" style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: coreR * 3.5,
          height: coreR * 3.5,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${evolution.color}18 0%, transparent 70%)`,
        }} />
      )}

      <div
        className={evolution.stage === "Spark" ? "core-orb-spark" : "core-orb"}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: coreR,
          height: coreR,
          borderRadius: "50%",
          background: `radial-gradient(circle at 40% 35%, ${evolution.color}cc, ${evolution.color}60 50%, ${evolution.color}20 80%, transparent)`,
          boxShadow: `0 0 ${20 * evolution.glowIntensity}px ${evolution.color}40, 0 0 ${50 * evolution.glowIntensity}px ${evolution.color}20`,
        }}
      />

      {evolution.level >= 4 && (
        <>
          <div className="particle particle-1" style={{ top: "50%", left: "50%", background: evolution.color }} />
          <div className="particle particle-2" style={{ top: "50%", left: "50%", background: evolution.color }} />
        </>
      )}
      {evolution.level >= 5 && (
        <div className="particle particle-3" style={{ top: "50%", left: "50%", background: evolution.color }} />
      )}
    </div>
  );
}

// ─── Ghost Race Bar ──────────────────────────────────────────────────────────

function GhostRace({ data, compact = false }: { data: typeof GHOST_RACE; compact?: boolean }) {
  const maxEff = Math.max(data.you.efficiency, data.ghost.efficiency, 100);
  const youWidth = (data.you.efficiency / maxEff) * 100;
  const ghostWidth = (data.ghost.efficiency / maxEff) * 100;

  return (
    <div>
      {!compact && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "1rem",
        }}>
          <span style={{ fontSize: "11px", color: T.textDim, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>
            {data.routeName}
          </span>
          {data.personalBest && (
            <span style={{ fontSize: "10px", color: T.orange, fontWeight: 600, letterSpacing: "0.08em" }}>
              PERSONAL BEST
            </span>
          )}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: compact ? "0.5rem" : "0.75rem" }}>
        <div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.3rem",
            fontSize: compact ? "10px" : "11px",
          }}>
            <span style={{ color: T.green, fontWeight: 600, letterSpacing: "0.1em" }}>YOU</span>
            <span style={{ color: T.text, fontFamily: "var(--font-display)", fontWeight: 700 }}>
              {data.you.efficiency}%
            </span>
          </div>
          <div style={{ height: compact ? 6 : 8, background: T.cardBorder, borderRadius: 1, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${youWidth}%`,
              background: T.green,
              borderRadius: 1,
              boxShadow: `0 0 8px ${T.green}40`,
              transition: "width 1s ease-out",
            }} />
          </div>
        </div>

        <div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.3rem",
            fontSize: compact ? "10px" : "11px",
          }}>
            <span style={{ color: T.textGhost, fontWeight: 500, letterSpacing: "0.1em" }}>
              {compact ? "GHOST" : data.ghost.label.toUpperCase()}
            </span>
            <span style={{ color: T.textDim }}>{data.ghost.efficiency}%</span>
          </div>
          <div style={{ height: compact ? 6 : 8, background: T.cardBorder, borderRadius: 1, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${ghostWidth}%`,
              background: T.textGhost,
              borderRadius: 1,
              transition: "width 1s ease-out",
            }} />
          </div>
        </div>
      </div>

      <div style={{
        marginTop: compact ? "0.5rem" : "0.75rem",
        fontSize: compact ? "11px" : "12px",
        color: data.result === "won" ? T.green : T.red,
        fontWeight: 600,
      }}>
        {data.delta} {data.result === "won" ? "better than ghost" : "behind ghost"}
      </div>
    </div>
  );
}

// ─── HUD Mode (Tesla In-Car View) ───────────────────────────────────────────

function HudView({ evolution, onExit }: { evolution: Evolution; onExit: () => void }) {
  const drive = LIVE_DRIVE;

  const hudStats = [
    { label: "DISTANCE", value: `${drive.distanceMi}`, unit: "mi" },
    { label: "EFFICIENCY", value: `${drive.efficiency}`, unit: "%", color: T.green },
    { label: "AVG SPEED", value: `${drive.avgSpeedMph}`, unit: "mph" },
    { label: "ENERGY", value: `${drive.energyKwh}`, unit: "kWh" },
    { label: "RANGE", value: `${drive.rangeRemainingMi}`, unit: "mi" },
    { label: "BATTERY", value: `${drive.batteryPct}`, unit: "%" },
  ];

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "#000",
      color: T.text,
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-mono)",
    }}>
      {/* HUD Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem 1.5rem",
        borderBottom: `1px solid ${T.cardBorder}`,
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: 8, height: 8,
            borderRadius: "50%",
            background: T.green,
            boxShadow: `0 0 6px ${T.green}60`,
          }} />
          <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: T.textDim }}>
            BATTERY TAMAGOTCHI
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {drive.active && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: T.green,
                animation: "core-pulse 1.5s ease-in-out infinite",
              }} />
              <span style={{ fontSize: "10px", color: T.green, letterSpacing: "0.15em", fontWeight: 600 }}>
                LIVE · {drive.elapsed}
              </span>
            </div>
          )}
          <button
            onClick={onExit}
            style={{
              background: "none",
              border: `1px solid ${T.cardBorder}`,
              color: T.textGhost,
              fontSize: "10px",
              letterSpacing: "0.15em",
              padding: "0.35rem 0.75rem",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
            }}
          >
            EXIT HUD
          </button>
        </div>
      </div>

      {/* HUD Body */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>

        {/* Top: Creature + Tamagotchi stats */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          padding: "1.25rem 2rem",
          borderBottom: `1px solid ${T.cardBorder}`,
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Creature evolution={evolution} compact />
            <div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 800,
                color: T.green,
                letterSpacing: "0.1em",
              }}>
                {evolution.stage.toUpperCase()}
              </div>
              <div style={{ fontSize: "10px", color: T.textGhost, marginTop: "0.2rem" }}>
                LVL {evolution.level}/5
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "CORE", value: `${BATTERY.healthPct}%` },
              { label: "PULSE", value: `${EFFICIENCY.averagePct}%` },
              { label: "STREAK", value: `${EFFICIENCY.streakWins}W` },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "9px", letterSpacing: "0.18em", color: T.textDim, marginBottom: "0.25rem" }}>
                  {s.label}
                </div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: T.text,
                }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Drive Stats */}
        {drive.active && (
          <div style={{ padding: "1.25rem 2rem", flex: 1 }}>
            <div style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: T.textDim,
              marginBottom: "1rem",
              fontWeight: 500,
            }}>
              CURRENT DRIVE
            </div>

            <div className="tama-hud-stats-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "1px",
              background: T.cardBorder,
              border: `1px solid ${T.cardBorder}`,
            }}>
              {hudStats.map((stat) => (
                <div key={stat.label} style={{
                  background: "#050510",
                  padding: "1.25rem 0.75rem",
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                    fontWeight: 800,
                    color: stat.color || T.text,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}>
                    {stat.value}
                    <span style={{
                      fontSize: "0.5em",
                      fontWeight: 500,
                      color: T.textDim,
                      marginLeft: "0.15em",
                    }}>
                      {stat.unit}
                    </span>
                  </div>
                  <div style={{
                    fontSize: "8px",
                    letterSpacing: "0.18em",
                    color: T.textDim,
                    marginTop: "0.5rem",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mini ghost comparison from last drive */}
            <div style={{
              marginTop: "1rem",
              padding: "0.85rem 1rem",
              border: `1px solid ${T.cardBorder}`,
              background: "#050510",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontSize: "10px", color: T.textDim, letterSpacing: "0.1em" }}>
                LAST GHOST · {GHOST_RACE.routeName}
              </span>
              <span style={{
                fontSize: "10px",
                fontWeight: 600,
                color: GHOST_RACE.result === "won" ? T.green : T.red,
              }}>
                {GHOST_RACE.result === "won" ? "WON" : "LOST"} {GHOST_RACE.delta}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

function HudPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}

export default function BatteryTamagotchiPage() {
  const [hudMode, setHudMode] = useState(false);

  const core = BATTERY.healthPct;
  const pulse = EFFICIENCY.averagePct;
  const evolution = getEvolution(core, pulse);

  return (
    <div style={{
      background: T.bg,
      minHeight: "100vh",
      color: T.text,
      fontFamily: "var(--font-mono)",
      position: "relative",
    }}>
      {hudMode && (
        <HudPortal>
          <HudView evolution={evolution} onExit={() => setHudMode(false)} />
        </HudPortal>
      )}

      {/* ── Header ── */}
      <div style={{
        borderBottom: `1px solid ${T.cardBorder}`,
        padding: "0 1.5rem",
      }}>
        <div style={{
          maxWidth: "72rem",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "3.5rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: T.green,
              boxShadow: `0 0 6px ${T.green}60`,
            }} />
            <span style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: T.textDim,
              fontWeight: 500,
            }}>
              BATTERY TAMAGOTCHI
            </span>
            <span style={{
              fontSize: "9px",
              color: T.textGhost,
              border: `1px solid ${T.cardBorder}`,
              padding: "0.15rem 0.4rem",
              letterSpacing: "0.1em",
              marginLeft: "0.25rem",
            }}>
              by TezLab
            </span>
          </div>

          <button
            onClick={() => setHudMode(true)}
            style={{
              background: "none",
              border: `1px solid ${T.cardBorder}`,
              color: T.textDim,
              fontSize: "10px",
              letterSpacing: "0.15em",
              padding: "0.4rem 0.85rem",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = T.green;
              e.currentTarget.style.color = T.green;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.cardBorder;
              e.currentTarget.style.color = T.textDim;
            }}
          >
            LAUNCH HUD
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* ── Creature + Evolution ── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "3.5rem 0 2rem",
          borderBottom: `1px solid ${T.divider}`,
        }}>
          <Creature evolution={evolution} />

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: T.green,
              letterSpacing: "0.15em",
            }}>
              {evolution.stage.toUpperCase()}
            </div>
            <div style={{
              fontSize: "11px",
              color: T.textGhost,
              marginTop: "0.35rem",
              letterSpacing: "0.05em",
            }}>
              Level {evolution.level} of 5
              {evolution.nextStage && ` · ${Math.round(evolution.progressToNext)}% to ${evolution.nextStage}`}
            </div>
          </div>

          {evolution.nextStage && (
            <div style={{
              marginTop: "1rem",
              width: "200px",
              height: 3,
              background: T.cardBorder,
              borderRadius: 2,
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: `${evolution.progressToNext}%`,
                background: T.green,
                borderRadius: 2,
                transition: "width 1s ease-out",
              }} />
            </div>
          )}
        </div>

        {/* ── Vehicle Info ── */}
        <div style={{
          padding: "1rem 0",
          borderBottom: `1px solid ${T.divider}`,
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}>
          {[
            `${VEHICLE.year} ${VEHICLE.name}`,
            `${VEHICLE.miles.toLocaleString()} mi`,
            VEHICLE.vin,
          ].map((item, i) => (
            <span key={i} style={{
              fontSize: "11px",
              color: T.textDim,
              letterSpacing: "0.08em",
            }}>
              {item}
            </span>
          ))}
        </div>

        {/* ── Core & Pulse Gauges ── */}
        <div className="tama-stats-grid" style={{
          background: T.cardBorder,
          border: `1px solid ${T.cardBorder}`,
          marginTop: "2rem",
        }}>
          <div style={{ background: T.card, padding: "2.5rem 2rem", display: "flex", justifyContent: "center" }}>
            <RingGauge
              value={core}
              label="Core"
              sublabel={`Battery Health · ${BATTERY.trend}`}
              color={T.green}
              size={170}
            />
          </div>
          <div style={{ background: T.card, padding: "2.5rem 2rem", display: "flex", justifyContent: "center" }}>
            <RingGauge
              value={pulse}
              label="Pulse"
              sublabel={`Avg Efficiency · ${EFFICIENCY.streakWins}-win streak`}
              color={T.green}
              size={170}
            />
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="tama-substats-grid" style={{
          background: T.cardBorder,
          borderLeft: `1px solid ${T.cardBorder}`,
          borderRight: `1px solid ${T.cardBorder}`,
          borderBottom: `1px solid ${T.cardBorder}`,
        }}>
          {[
            { label: "30-Day Eff.", value: `${EFFICIENCY.last30Days}%` },
            { label: "Best Week", value: `${EFFICIENCY.bestWeek}%` },
            { label: "Max Range", value: `${BATTERY.maxRangeMiles} mi` },
            { label: "Degradation", value: `${BATTERY.degradationPct}%` },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: T.card,
              padding: "1rem",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.18em", color: T.textDim, textTransform: "uppercase" as const, marginBottom: "0.35rem" }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: T.text }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Live Drive ── */}
        {LIVE_DRIVE.active && (
          <div style={{ marginTop: "2rem" }}>
            <div style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: T.textDim,
              textTransform: "uppercase" as const,
              marginBottom: "0.75rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: T.green,
                animation: "core-pulse 1.5s ease-in-out infinite",
              }} />
              Current Drive · {LIVE_DRIVE.elapsed}
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: T.cardBorder,
              border: `1px solid ${T.cardBorder}`,
            }}>
              {[
                { label: "Distance", value: `${LIVE_DRIVE.distanceMi} mi` },
                { label: "Efficiency", value: `${LIVE_DRIVE.efficiency}%`, color: T.green },
                { label: "Avg Speed", value: `${LIVE_DRIVE.avgSpeedMph} mph` },
                { label: "Energy Used", value: `${LIVE_DRIVE.energyKwh} kWh` },
                { label: "Range Left", value: `${LIVE_DRIVE.rangeRemainingMi} mi` },
                { label: "Battery", value: `${LIVE_DRIVE.batteryPct}%` },
              ].map((stat) => (
                <div key={stat.label} style={{ background: T.card, padding: "1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "9px", letterSpacing: "0.18em", color: T.textDim, textTransform: "uppercase" as const, marginBottom: "0.35rem" }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: stat.color || T.text,
                  }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: "0.5rem",
              fontSize: "10px",
              color: T.textGhost,
              textAlign: "center",
              padding: "0.5rem",
            }}>
              Ghost comparison available after drive completes
            </div>
          </div>
        )}

        {/* ── Last Drive · Ghost Comparison ── */}
        <div style={{ marginTop: "2rem" }}>
          <div style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: T.textDim,
            textTransform: "uppercase" as const,
            marginBottom: "0.75rem",
            fontWeight: 500,
          }}>
            Last Drive · Ghost Comparison
          </div>
          <div style={{
            border: `1px solid ${T.cardBorder}`,
            background: T.card,
            padding: "1.25rem 1.5rem",
          }}>
            <GhostRace data={GHOST_RACE} />
          </div>
        </div>

        {/* ── Two Column: Charges + Drives ── */}
        <div className="tama-activity-grid" style={{
          marginTop: "2rem",
          paddingBottom: "3rem",
        }}>
          {/* Recent Charges */}
          <div>
            <div style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: T.textDim,
              textTransform: "uppercase" as const,
              marginBottom: "0.75rem",
              fontWeight: 500,
            }}>
              Charge Log
            </div>
            <div style={{
              border: `1px solid ${T.cardBorder}`,
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              background: T.cardBorder,
            }}>
              {RECENT_CHARGES.map((charge, i) => (
                <div key={i} style={{
                  background: T.card,
                  padding: "0.85rem 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.75rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", minWidth: 0 }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                      background: charge.good ? T.green : T.red,
                      boxShadow: charge.good ? `0 0 4px ${T.green}50` : `0 0 4px ${T.red}50`,
                    }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: "12px", color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {charge.type}
                      </div>
                      <div style={{ fontSize: "10px", color: T.textDim }}>
                        {charge.from}% → {charge.to}%
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    color: charge.coreImpact > 0 ? T.green : T.red,
                    whiteSpace: "nowrap",
                  }}>
                    {charge.coreImpact > 0 ? "+" : ""}{charge.coreImpact} Core
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Drives */}
          <div>
            <div style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: T.textDim,
              textTransform: "uppercase" as const,
              marginBottom: "0.75rem",
              fontWeight: 500,
            }}>
              Drive Log
            </div>
            <div style={{
              border: `1px solid ${T.cardBorder}`,
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              background: T.cardBorder,
            }}>
              {RECENT_DRIVES.map((drive, i) => (
                <div key={i} style={{
                  background: T.card,
                  padding: "0.85rem 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.75rem",
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "12px", color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {drive.route}
                    </div>
                    <div style={{ fontSize: "10px", color: T.textDim }}>
                      {drive.distance} · {drive.efficiency}% eff
                    </div>
                  </div>
                  <span style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    padding: "0.2rem 0.5rem",
                    border: "1px solid",
                    borderColor: drive.result === "won" ? `${T.green}40` : `${T.red}30`,
                    color: drive.result === "won" ? T.green : T.red,
                    background: drive.result === "won" ? `${T.green}08` : `${T.red}08`,
                  }}>
                    {drive.result === "won" ? "WON" : "LOST"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
