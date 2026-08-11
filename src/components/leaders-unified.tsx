"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, UserRound, ChevronUp, ChevronDown } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { scoreToSignal } from "@/lib/utils";
import { getLandmark } from "@/lib/landmarks";
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

// Inline rank + delta — no icons, just +3 / -2 / NEW, all on one line
function RankCell({ rank, delta, trend }: { rank: number; delta?: string; trend: "up" | "down" | "flat" }) {
  const deltaEl = () => {
    if (!delta || delta === "+0") return null;
    if (delta === "New") return <span className="font-mono text-[9px] font-bold text-cruise-500 leading-none">NEW</span>;
    const isUp = trend === "up";
    return (
      <span
        className="font-mono text-[9px] font-bold leading-none"
        style={{ color: isUp ? "var(--signal-good)" : "var(--signal-low)" }}
      >
        {delta}
      </span>
    );
  };
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-mono text-[13px] font-black leading-none text-ink">{rank}</span>
      {deltaEl()}
    </div>
  );
}

const OFFICE_TYPES = ["All", "Governor", "Senator", "Local Government Chairman", "Minister"] as const;
type OfficeFilter = typeof OFFICE_TYPES[number];

const RANK_CATEGORIES = [
  "Overall", "Infrastructure", "Education", "Healthcare",
  "Transparency", "Security", "Power Supply", "Job Creation",
  "Economy", "Responsiveness", "Accountability",
] as const;
type RankCategory = typeof RANK_CATEGORIES[number];

export function LeadersUnified() {
  const { mode } = useMode();
  const [query, setQuery]               = useState("");
  const [officeFilter, setOfficeFilter] = useState<OfficeFilter>("All");
  const [rankCategory, setRankCategory] = useState<RankCategory>("Overall");
  const [rankDir, setRankDir]           = useState<"desc" | "asc">("desc");

  const filtered = useMemo(() => {
    let list = [...leaders];
    if (officeFilter !== "All") list = list.filter((l) => l.role.toLowerCase().includes(officeFilter.toLowerCase()));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((l) =>
        l.name.toLowerCase().includes(q) ||
        l.jurisdiction.toLowerCase().includes(q) ||
        l.role.toLowerCase().includes(q) ||
        l.party.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, officeFilter]);

  const ranked = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const val = (l: typeof leaders[number]) =>
        rankCategory === "Overall" ? l.score : (l.categories.find((c) => c.label === rankCategory)?.score ?? 0);
      return rankDir === "desc" ? val(b) - val(a) : val(a) - val(b);
    });
  }, [filtered, rankCategory, rankDir]);

  return (
    <div>
      {/* Hero — bleeds under nav with -mt-16 */}
      <div className="relative -mx-6 -mt-16 h-64 overflow-hidden lg:-mx-10 sm:h-72">
        <img
          src={asset("/flag.webp")}
          alt=""
          aria-hidden
          loading="eager"
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.20) 45%, rgba(0,0,0,0.80) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-6 lg:px-10">
          <h1 className="text-3xl font-bold text-paper sm:text-4xl">
            {mode === "cruise" ? "Who dey hold power?" : "Leaders & Rankings"}
          </h1>
          <p className="mt-1 text-[13px] text-paper/65">
            {mode === "cruise"
              ? "Search, filter, and rank any oga by any category."
              : "Search, filter, and rank by any category."}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, state, party, or office"
            className="w-full rounded-xl border border-line bg-paper-raised py-2.5 pl-10 pr-4 text-[14px] text-ink outline-none focus-visible:border-forest-500"
          />
        </div>

        {/* Office filter chips */}
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

        {/* Rank controls: one select + up/down toggle */}
        <div className="flex items-center gap-2">
          <select
            value={rankCategory}
            onChange={(e) => setRankCategory(e.target.value as RankCategory)}
            className="rounded-xl border border-line bg-paper-raised px-3 py-2 text-[13px] text-ink outline-none focus-visible:border-forest-500"
          >
            {RANK_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={() => setRankDir((d) => d === "desc" ? "asc" : "desc")}
            className="flex flex-col items-center rounded-xl border border-line bg-paper-raised px-2 py-1 transition-colors hover:border-forest-500"
            aria-label="Toggle sort direction"
          >
            <ChevronUp
              size={13}
              className={rankDir === "asc" ? "text-forest-500" : "text-ink-muted/40"}
            />
            <ChevronDown
              size={13}
              className={rankDir === "desc" ? "text-forest-500" : "text-ink-muted/40"}
            />
          </button>
        </div>

        {/* Table — no header row (avoided misalignment) */}
        <div className="overflow-hidden rounded-2xl border border-line">
          {ranked.length === 0 ? (
            <div className="py-12 text-center text-[14px] text-ink-muted">
              {mode === "cruise" ? "Nobody match that search. Try another name." : "No officials match that search."}
            </div>
          ) : (
            ranked.map((leader, i) => {
              const catScore = rankCategory === "Overall"
                ? leader.score
                : (leader.categories.find((c) => c.label === rankCategory)?.score ?? leader.score);
              const landmarkUrl = getLandmark(leader.jurisdiction, 0);

              return (
                <Link
                  key={leader.slug}
                  href={`/leaders/${leader.slug}`}
                  className="grid grid-cols-[3rem_2.5rem_1fr_4.5rem] items-center gap-3 border-b border-line bg-paper-raised px-4 py-3 last:border-b-0 transition-colors hover:bg-forest-tint/30"
                >
                  {/* Rank + delta — all on one line (stacked but compact) */}
                  <RankCell rank={i + 1} delta={leader.trendDelta} trend={leader.trend} />

                  {/* Landmark thumbnail avatar */}
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-line-strong">
                    <img
                      src={landmarkUrl}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Name + role */}
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-ink">{leader.name}</p>
                    <p className="truncate text-[11px] text-ink-muted">
                      {leader.role} · {leader.jurisdiction}
                    </p>
                    <p className="truncate text-[10px] text-ink-muted/70">
                      {leader.party} · {leader.evaluations.toLocaleString()} evals
                    </p>
                  </div>

                  {/* Score ring */}
                  <div className="flex justify-center">
                    <ScoreRing score={catScore} size={38} />
                  </div>
                </Link>
              );
            })
          )}
        </div>

        <p className="text-[12px] text-ink-muted">
          {ranked.length} results
          {officeFilter !== "All" ? ` · ${officeFilter}` : ""}
          {query ? ` matching "${query}"` : ""}
          {" "}· {rankCategory}, {rankDir === "desc" ? "highest first" : "lowest first"}
        </p>
      </div>
    </div>
  );
}
