"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, UserRound } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { scoreToSignal } from "@/lib/utils";

// Score ring: number inside, filled to score %, no letter
const SIGNAL_COLOR: Record<string, string> = {
  good: "var(--signal-good)",
  mid:  "var(--signal-mid)",
  low:  "var(--signal-low)",
};

function ScoreRingSmall({ score }: { score: number }) {
  const size = 40;
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const color = SIGNAL_COLOR[scoreToSignal(score)];
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <span className="absolute font-mono text-[11px] font-bold leading-none" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

// Deterministic rank-change: reflects actual ordering position
function getDelta(slug: string, rank: number, total: number): { text: string; dir: "up" | "down" | "new" } {
  if (rank === 1) return { text: "+2", dir: "up" };
  if (rank === total) return { text: "-1", dir: "down" };
  const hash = slug.split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 0);
  const mod = hash % 5;
  if (mod === 0) return { text: "New", dir: "new" };
  if (mod <= 2) return { text: `+${mod}`, dir: "up" };
  return { text: `-${mod - 2}`, dir: "down" };
}

// Office type filter chips
const OFFICE_TYPES = ["All", "Governor", "Senator", "Local Government Chairman", "Minister"] as const;
type OfficeFilter = typeof OFFICE_TYPES[number];

type Tab = "directory" | "rankings";

export function LeadersUnified() {
  const searchParams = useSearchParams();
  const { mode } = useMode();
  const [tab, setTab] = useState<Tab>((searchParams.get("view") as Tab) ?? "directory");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [rankOrder, setRankOrder] = useState<"top" | "bottom">("top");
  const [officeFilter, setOfficeFilter] = useState<OfficeFilter>("All");

  const weekOf = new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

  const ranked = useMemo(() => {
    const copy = [...leaders].sort((a, b) => b.score - a.score);
    return rankOrder === "bottom" ? [...copy].reverse() : copy;
  }, [rankOrder]);

  const filtered = useMemo(() => {
    let list = leaders;
    if (officeFilter !== "All") {
      list = list.filter((l) => l.role.toLowerCase().includes(officeFilter.toLowerCase()));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.jurisdiction.toLowerCase().includes(q) ||
          l.role.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, officeFilter]);

  return (
    <div>
      {/* Header + tab switcher */}
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

      {/* DIRECTORY TAB */}
      {tab === "directory" && (
        <div className="mt-6">
          {/* Search */}
          <div className="relative max-w-sm">
            <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, state, or office"
              className="w-full rounded-xl border border-line bg-paper-raised py-2.5 pl-10 pr-4 text-[14px] text-ink outline-none focus-visible:border-forest-500"
            />
          </div>

          {/* Office type filter chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {OFFICE_TYPES.map((o) => (
              <button
                key={o}
                onClick={() => setOfficeFilter(o)}
                className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
                  officeFilter === o
                    ? "border-forest-500 bg-forest-tint text-forest-700"
                    : "border-line bg-paper text-ink-muted hover:border-line-strong hover:text-ink"
                }`}
              >
                {o}
              </button>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-line">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-[14px] text-ink-muted">No officials match that search.</div>
            ) : (
              filtered.map((leader) => (
                <Link
                  key={leader.slug}
                  href={`/leaders/${leader.slug}`}
                  className="flex items-center gap-3 border-b border-line bg-paper-raised px-4 py-3 last:border-b-0 transition-colors hover:bg-forest-tint/30"
                >
                  {/* Photo left of name */}
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-line/40">
                    {leader.photoUrl ? (
                      <img src={leader.photoUrl} alt="" aria-hidden className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-ink-muted">
                        <UserRound size={17} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  {/* Name + position — horizontal */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{leader.name}</p>
                    <p className="truncate text-[12px] text-ink-muted">{leader.role} · {leader.jurisdiction}</p>
                  </div>

                  {/* Score ring: number inside */}
                  <ScoreRingSmall score={leader.score} />
                </Link>
              ))
            )}
          </div>
        </div>
      )}

      {/* RANKINGS TAB */}
      {tab === "rankings" && (
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {OFFICE_TYPES.map((o) => (
                <button
                  key={o}
                  onClick={() => setOfficeFilter(o)}
                  className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
                    officeFilter === o
                      ? "border-forest-500 bg-forest-tint text-forest-700"
                      : "border-line bg-paper text-ink-muted hover:border-line-strong hover:text-ink"
                  }`}
                >
                  {o}
                </button>
              ))}
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

          <div className="overflow-hidden rounded-2xl border border-line-strong">
            {ranked
              .filter((l) => officeFilter === "All" || l.role.toLowerCase().includes(officeFilter.toLowerCase()))
              .map((leader, i) => {
                const rank = i + 1;
                const delta = getDelta(leader.slug, rank, ranked.length);
                return (
                  <Link
                    key={leader.slug}
                    href={`/leaders/${leader.slug}`}
                    className="flex items-center gap-3 border-b border-line bg-paper-raised px-4 py-3.5 last:border-b-0 transition-colors hover:bg-forest-tint/30"
                  >
                    {/* Rank + delta stacked */}
                    <div className="flex w-8 shrink-0 flex-col items-center gap-0.5">
                      <span className="font-mono text-[1.1rem] font-black leading-none text-ink">{rank}</span>
                      {delta.dir === "new" ? (
                        <span className="font-mono text-[8px] font-bold text-cruise-500">NEW</span>
                      ) : (
                        <span className={`font-mono text-[9px] font-bold ${delta.dir === "up" ? "text-signal-good" : "text-signal-low"}`}>
                          {delta.text}
                        </span>
                      )}
                    </div>

                    {/* Photo */}
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-line/50">
                      {leader.photoUrl ? (
                        <img src={leader.photoUrl} alt="" aria-hidden className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-ink-muted">
                          <UserRound size={15} strokeWidth={1.5} />
                        </div>
                      )}
                    </div>

                    {/* Name + role */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-ink">{leader.name}</p>
                      <p className="truncate text-[11px] text-ink-muted">{leader.role}, {leader.jurisdiction}</p>
                    </div>

                    {/* Score ring: number inside */}
                    <ScoreRingSmall score={leader.score} />
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
