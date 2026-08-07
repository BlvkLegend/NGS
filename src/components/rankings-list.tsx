"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { scoreToGrade } from "@/lib/utils";

const TABS = ["Top rated", "Lowest rated"] as const;
type Tab = (typeof TABS)[number];

const TREND_COLOR = { up: "text-signal-good", down: "text-signal-low", flat: "text-ink-muted" };

// Simulated "previous week" ranks for delta — deterministic per slug
function prevRank(slug: string, currentRank: number): number {
  const hash = slug.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 0) % 5;
  return currentRank + (hash - 2);
}

export function RankingsList() {
  const [tab, setTab] = useState<Tab>("Top rated");
  const { mode } = useMode();

  const sorted = useMemo(() => {
    const copy = [...leaders];
    if (tab === "Lowest rated") return copy.sort((a, b) => a.score - b.score);
    return copy.sort((a, b) => b.score - a.score);
  }, [tab]);

  // Format today as a "week of" string
  const weekOf = new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div>
      {/* Billboard-style header */}
      <div className="mb-6 border-b border-line pb-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">Week of {weekOf}</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-ink">
              {mode === "cruise" ? "NGSC Hot List" : "NGSC National Rankings"}
            </h2>
          </div>
          <div className="flex gap-1.5">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
                  tab === t ? "bg-forest-500 text-paper" : "text-ink-muted hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart rows */}
      <div className="divide-y divide-line">
        {sorted.map((leader, i) => {
          const rank = i + 1;
          const prev = prevRank(leader.slug, rank);
          const delta = prev - rank; // positive = moved up
          const isNew = prev < 0 || prev > sorted.length;
          const grade = scoreToGrade(leader.score);

          return (
            <Link
              key={leader.slug}
              href={`/leaders/${leader.slug}`}
              className="group flex items-center gap-4 py-4 transition-colors hover:bg-forest-tint/30 sm:gap-6 sm:py-5"
            >
              {/* Rank block */}
              <div className="flex w-12 shrink-0 flex-col items-center">
                <span className="font-mono text-[2rem] font-black leading-none text-ink">
                  {rank}
                </span>
                {isNew ? (
                  <span className="mt-0.5 rounded bg-cruise-500 px-1 py-0.5 font-mono text-[8px] font-bold text-paper">
                    NEW
                  </span>
                ) : delta !== 0 ? (
                  <span className={`mt-0.5 font-mono text-[11px] font-bold ${delta > 0 ? TREND_COLOR.up : TREND_COLOR.down}`}>
                    {delta > 0 ? `+${delta}` : delta}
                  </span>
                ) : (
                  <span className="mt-0.5 h-[1px] w-4 bg-ink-muted opacity-40" />
                )}
              </div>

              {/* Avatar */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-line/40 text-ink-muted">
                <UserRound size={20} strokeWidth={1.5} />
              </div>

              {/* Name + office */}
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-[1.05rem] font-semibold text-ink group-hover:underline">
                  {leader.name}
                </p>
                <p className="truncate text-[12px] text-ink-muted">
                  {leader.role} — {leader.jurisdiction}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-ink-muted">
                  <span>Score: <span className="font-mono font-bold text-ink">{leader.score}/100</span></span>
                </div>
              </div>

              {/* Grade badge */}
              <div className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border-2 font-mono text-[1.4rem] font-black ${
                grade === "A" ? "border-signal-good text-signal-good" :
                grade === "B" ? "border-forest-500 text-forest-500" :
                grade === "C" ? "border-signal-mid text-signal-mid" :
                grade === "D" ? "border-cruise-500 text-cruise-500" :
                "border-signal-low text-signal-low"
              }`}>
                {grade}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
