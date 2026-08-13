"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, UserRound, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { scoreToSignal } from "@/lib/utils";
import { asset } from "@/lib/asset";

const SIGNAL_COLOR: Record<string, string> = {
  good: "var(--signal-good)",
  mid:  "var(--signal-mid)",
  low:  "var(--signal-low)",
};

function ScoreRing({ score, size = 40 }: { score: number; size?: number }) {
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const color = SIGNAL_COLOR[scoreToSignal(score)];
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <span className="absolute font-mono font-bold leading-none" style={{ fontSize: size < 36 ? 9 : 11, color }}>
        {score}
      </span>
    </div>
  );
}

function TrendBadge({ delta, trend }: { delta?: string; trend: "up" | "down" | "flat" }) {
  if (!delta || delta === "+0") return <Minus size={12} className="text-ink-muted" />;
  if (delta === "New")
    return <span className="font-mono text-[10px] font-bold text-cruise-500">NEW</span>;
  if (trend === "up")
    return <span className="flex items-center gap-0.5 font-mono text-[10px] font-bold text-signal-good"><TrendingUp size={10} />{delta}</span>;
  return <span className="flex items-center gap-0.5 font-mono text-[10px] font-bold text-signal-low"><TrendingDown size={10} />{delta}</span>;
}

const OFFICE_TYPES = ["All", "Governor", "Senator", "Local Government Chairman", "Minister"] as const;
type OfficeFilter = typeof OFFICE_TYPES[number];

// Ranking categories — shown as sortable chips
const RANK_CATEGORIES = [
  "Overall",
  "Infrastructure",
  "Education",
  "Healthcare",
  "Transparency",
  "Security",
  "Power Supply",
  "Job Creation",
  "Economy",
  "Responsiveness",
  "Accountability",
] as const;
type RankCategory = typeof RANK_CATEGORIES[number];

export function LeadersUnified() {
  const { mode } = useMode();
  const [query, setQuery]               = useState("");
  const [officeFilter, setOfficeFilter] = useState<OfficeFilter>("All");
  const [rankCategory, setRankCategory] = useState<RankCategory>("Overall");
  const [rankDir, setRankDir]           = useState<"desc" | "asc">("desc");

  const totalCount = leaders.length;

  // 1. Filter by office type + search
  const filtered = useMemo(() => {
    let list = [...leaders];
    if (officeFilter !== "All") {
      list = list.filter((l) => l.role.toLowerCase().includes(officeFilter.toLowerCase()));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.jurisdiction.toLowerCase().includes(q) ||
          l.role.toLowerCase().includes(q) ||
          l.party.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, officeFilter]);

  // 2. Sort by chosen ranking category
  const ranked = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const getVal = (l: typeof leaders[number]) => {
        if (rankCategory === "Overall") return l.score;
        const cat = l.categories.find((c) => c.label === rankCategory);
        return cat?.score ?? 0;
      };
      return rankDir === "desc" ? getVal(b) - getVal(a) : getVal(a) - getVal(b);
    });
  }, [filtered, rankCategory, rankDir]);

  return (
    <div>
      {/* Hero photo band — assembly interior */}
      <div className="relative -mx-6 h-44 overflow-hidden lg:-mx-10 sm:h-52">
        <img
          src={asset("/assembly-interior.webp")}
          alt=""
          aria-hidden
          loading="eager"
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.80) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6 lg:px-10">
          <h1 className="text-3xl font-bold text-paper sm:text-4xl">
            {mode === "cruise" ? "Who dey hold power?" : "Leaders & Rankings"}
          </h1>
          <p className="mt-1 text-[13px] text-paper/65">
            {mode === "cruise"
              ? `${totalCount} officials wey citizens don score. See who dey deliver.`
              : `${totalCount} officials tracked. Search, filter, and rank by any category.`}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* ── ROW 1: Search ── */}
        <div className="relative max-w-sm">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, state, party, or office"
            className="w-full rounded-xl border border-line bg-paper-raised py-2.5 pl-10 pr-4 text-[14px] text-ink outline-none focus-visible:border-forest-500"
          />
        </div>

        {/* ── ROW 2: Office type filter chips ── */}
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

        {/* ── ROW 3: Ranking category chips + direction toggle ── */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted mr-1">
            Rank by:
          </span>
          {RANK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                if (rankCategory === cat) setRankDir((d) => d === "desc" ? "asc" : "desc");
                else { setRankCategory(cat); setRankDir("desc"); }
              }}
              className={`flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                rankCategory === cat
                  ? "border-cruise-500 bg-cruise-tint text-cruise-700"
                  : "border-line bg-paper text-ink-muted hover:border-line-strong hover:text-ink"
              }`}
            >
              {cat}
              {rankCategory === cat && (
                <span className="font-mono text-[9px]">{rankDir === "desc" ? "↓" : "↑"}</span>
              )}
            </button>
          ))}
        </div>

        {/* ── ROW 4: Ranking table ── */}
        <div className="overflow-hidden rounded-2xl border border-line">
          {/* Table header */}
          <div className="grid grid-cols-[2.5rem_auto_1fr_5rem_4rem] items-center gap-3 border-b border-line bg-paper px-4 py-2">
            <span className="font-mono text-[10px] uppercase tracking-wide text-ink-muted">#</span>
            <span className="font-mono text-[10px] uppercase tracking-wide text-ink-muted">Official</span>
            <span className="font-mono text-[10px] uppercase tracking-wide text-ink-muted hidden sm:block">Role · State</span>
            <span className="font-mono text-[10px] uppercase tracking-wide text-ink-muted text-center">
              {rankCategory === "Overall" ? "Score" : rankCategory.slice(0, 6)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wide text-ink-muted text-center">Trend</span>
          </div>

          {ranked.length === 0 ? (
            <div className="py-12 text-center text-[14px] text-ink-muted">
              {mode === "cruise" ? "Nobody match that search. Try another name." : "No officials match that search."}
            </div>
          ) : (
            ranked.map((leader, i) => {
              const catScore = rankCategory === "Overall"
                ? leader.score
                : (leader.categories.find((c) => c.label === rankCategory)?.score ?? leader.score);

              return (
                <Link
                  key={leader.slug}
                  href={`/leaders/${leader.slug}`}
                  className="grid grid-cols-[2.5rem_auto_1fr_5rem_4rem] items-center gap-3 border-b border-line bg-paper-raised px-4 py-3 last:border-b-0 transition-colors hover:bg-forest-tint/30"
                >
                  {/* Rank number + delta stacked */}
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-[13px] font-black leading-none text-ink">{i + 1}</span>
                    <TrendBadge delta={leader.trendDelta} trend={leader.trend} />
                  </div>

                  {/* Photo */}
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-line/40">
                    {leader.photoUrl ? (
                      <img src={leader.photoUrl} alt="" aria-hidden className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-ink-muted">
                        <UserRound size={15} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  {/* Name + role (on mobile shows below photo) */}
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{leader.name}</p>
                    <p className="truncate text-[11px] text-ink-muted sm:hidden">
                      {leader.role} · {leader.jurisdiction}
                    </p>
                    <p className="hidden truncate text-[11px] text-ink-muted sm:block">
                      {leader.party} · {leader.evaluations.toLocaleString()} evals
                    </p>
                  </div>

                  {/* Role · state (desktop) — hidden on mobile (shown in name cell) */}
                  <div className="hidden min-w-0 sm:block">
                    <p className="truncate text-[11px] text-ink-muted">{leader.role}</p>
                    <p className="truncate text-[10px] text-ink-muted/70">{leader.jurisdiction}</p>
                  </div>

                  {/* Score ring — chosen category score */}
                  <div className="flex justify-center">
                    <ScoreRing score={catScore} size={38} />
                  </div>

                  {/* Trend */}
                  <div className="flex justify-center">
                    <TrendBadge delta={leader.trendDelta} trend={leader.trend} />
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Results count */}
        <p className="text-[12px] text-ink-muted">
          {ranked.length} of {totalCount} officials
          {officeFilter !== "All" ? ` · ${officeFilter}` : ""}
          {query ? ` matching "${query}"` : ""}
          {" "}· sorted by {rankCategory} {rankDir === "desc" ? "(highest first)" : "(lowest first)"}
        </p>
      </div>
    </div>
  );
}
