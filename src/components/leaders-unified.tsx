"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ArrowUp, ArrowDown, UserRound } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { scoreToGrade } from "@/lib/utils";

const GRADE_RING: Record<string, string> = {
  A: "ring-signal-good text-signal-good",
  B: "ring-forest-500 text-forest-500",
  C: "ring-signal-mid text-signal-mid",
  D: "ring-cruise-500 text-cruise-500",
  F: "ring-signal-low text-signal-low",
};

function getDelta(slug: string, rank: number, total: number): { text: string; dir: "up" | "down" | "new" } {
  if (rank === 1) return { text: "+2", dir: "up" };
  if (rank === total) return { text: "-1", dir: "down" };
  const hash = slug.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 0);
  const mod = hash % 5;
  if (mod === 0) return { text: "New", dir: "new" };
  if (mod <= 2) return { text: `+${mod}`, dir: "up" };
  return { text: `-${mod - 2}`, dir: "down" };
}

type Tab = "directory" | "rankings";

export function LeadersUnified() {
  const searchParams = useSearchParams();
  const { mode } = useMode();
  const [tab, setTab] = useState<Tab>(
    (searchParams.get("view") as Tab) ?? "directory"
  );
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [rankOrder, setRankOrder] = useState<"top" | "bottom">("top");

  const weekOf = new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

  const ranked = useMemo(() => {
    const copy = [...leaders].sort((a, b) => b.score - a.score);
    return rankOrder === "bottom" ? [...copy].reverse() : copy;
  }, [rankOrder]);

  const filtered = useMemo(() => {
    if (!query.trim()) return leaders;
    return leaders.filter(
      (l) =>
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.jurisdiction.toLowerCase().includes(query.toLowerCase()) ||
        l.role.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div>
      {/* Page header with tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">
            {tab === "rankings"
              ? mode === "cruise" ? "NGSC Hotlist" : "Rankings"
              : "Browse Leaders"}
          </h1>
          <p className="mt-1 text-[13px] text-ink-muted">
            {tab === "rankings"
              ? `Ranked by governance score. Week of ${weekOf}.`
              : `${leaders.length} officials tracked across the federation.`}
          </p>
        </div>
        {/* Tab switcher */}
        <div className="flex rounded-xl border border-line bg-paper-raised p-1 gap-1 self-start sm:self-auto">
          {(["directory", "rankings"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-1.5 text-[13px] font-medium transition-colors ${
                tab === t ? "bg-forest-500 text-paper" : "text-ink-muted hover:text-ink"
              }`}
            >
              {t === "directory" ? "Directory" : "Rankings"}
            </button>
          ))}
        </div>
      </div>

      {/* Directory tab */}
      {tab === "directory" && (
        <div className="mt-6">
          <div className="relative max-w-sm">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, state, or office"
              className="w-full rounded-xl border border-line bg-paper-raised py-2.5 pl-10 pr-4 text-[14px] text-ink outline-none focus-visible:border-forest-500"
            />
          </div>

          <div className="mt-4 divide-y divide-line rounded-2xl border border-line overflow-hidden">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-[14px] text-ink-muted">No officials match that search.</div>
            ) : (
              filtered.map((leader) => {
                const grade = scoreToGrade(leader.score);
                return (
                  <Link
                    key={leader.slug}
                    href={`/leaders/${leader.slug}`}
                    className="flex items-center gap-3 bg-paper-raised px-4 py-3.5 hover:bg-forest-tint/30 transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-line/40 text-ink-muted">
                      <UserRound size={18} strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-ink">{leader.name}</p>
                      <p className="truncate text-[12px] text-ink-muted">{leader.role}, {leader.jurisdiction}</p>
                    </div>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 bg-paper font-mono text-[1rem] font-black ${GRADE_RING[grade]}`}>
                      {grade}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Rankings tab */}
      {tab === "rankings" && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            {/* Column headers */}
            <div className="grid w-full grid-cols-[3rem_2.5rem_1fr_4rem] gap-3 px-4">
              <span className="font-mono text-[10px] uppercase tracking-wide text-ink-muted">Rank</span>
              <span />
              <span className="font-mono text-[10px] uppercase tracking-wide text-ink-muted">Official</span>
              <span className="text-right font-mono text-[10px] uppercase tracking-wide text-ink-muted">Grade</span>
            </div>
            <div className="flex shrink-0 gap-1.5 pl-4">
              {(["top", "bottom"] as const).map((o) => (
                <button
                  key={o}
                  onClick={() => setRankOrder(o)}
                  className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors ${
                    rankOrder === o ? "bg-forest-500 text-paper" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {o === "top" ? "Top rated" : "Lowest"}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-line rounded-2xl border border-line-strong overflow-hidden">
            {ranked.map((leader, i) => {
              const rank = i + 1;
              const grade = scoreToGrade(leader.score);
              const delta = getDelta(leader.slug, rank, ranked.length);
              return (
                <Link
                  key={leader.slug}
                  href={`/leaders/${leader.slug}`}
                  className="grid grid-cols-[3rem_2.5rem_1fr_4rem] items-center gap-3 bg-paper-raised px-4 py-3.5 hover:bg-forest-tint/30 transition-colors"
                >
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[1.3rem] font-black leading-none text-ink">{rank}</span>
                    {delta.text !== "New" ? (
                      <span className={`flex items-center gap-0.5 font-mono text-[9px] font-bold ${delta.dir === "up" ? "text-signal-good" : "text-signal-low"}`}>
                        {delta.dir === "up" ? <ArrowUp size={8} /> : <ArrowDown size={8} />}
                        {delta.text}
                      </span>
                    ) : (
                      <span className="font-mono text-[8px] font-bold text-cruise-500">NEW</span>
                    )}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-line/50 text-ink-muted">
                    <UserRound size={17} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{leader.name}</p>
                    <p className="truncate text-[11px] text-ink-muted">{leader.role}, {leader.jurisdiction}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ring-2 bg-paper font-mono text-[1rem] font-black ${GRADE_RING[grade]}`}>
                      {grade}
                    </div>
                    <span className="font-mono text-[10px] text-ink-muted">{leader.score}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
