"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMode } from "@/lib/mode-context";
import { route } from "@/lib/asset";

const COPY = {
  taxpayer: {
    eyebrow: "03 / Trending evaluations",
    title:   "Most evaluated this week.",
    link:    "See all officials",
  },
  cruise: {
    eyebrow: "03 / Who dey Trend",
    title:   "Who everybody dey drag this week",
    link:    "See everybody",
  },
};

// Signal colours from design tokens
function signal(score: number) {
  if (score >= 65) return "var(--signal-good)";
  if (score >= 40) return "var(--signal-mid)";
  return "var(--signal-low)";
}

function ScoreRing({ score }: { score: number }) {
  const size = 44;
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const color = signal(score);
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <span className="absolute font-mono text-[11px] font-bold leading-none" style={{ color }}>{score}</span>
    </div>
  );
}

// Hardcoded trending leaders — real names per design, no photographs
const TRENDING = [
  {
    slug: "bola-ahmed-tinubu",
    name: "Bola Ahmed Tinubu",
    role: "President",
    jurisdiction: "Federal Republic of Nigeria",
    score: 74,
    delta: "+3",
    trend: "up" as const,
    initials: "BAT",
  },
  {
    slug: "babajide-olusola-sanwo-olu",
    name: "Babajide Olusola Sanwo-Olu",
    role: "Governor",
    jurisdiction: "Lagos State",
    score: 52,
    delta: "-3",
    trend: "down" as const,
    initials: "BOS",
  },
  {
    slug: "kashim-shettima",
    name: "Kashim Shettima",
    role: "Vice President",
    jurisdiction: "Federal Republic of Nigeria",
    score: 39,
    delta: "New",
    trend: "flat" as const,
    initials: "KS",
  },
];

export function FeaturedLeaders() {
  const { mode } = useMode();
  const copy = COPY[mode];

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
      {/* Section header */}
      <div className="flex items-end justify-between border-b border-line pb-4">
        <div>
          <span className="ledger-index text-[12px] text-forest-500 dark:text-forest-300">{copy.eyebrow}</span>
          <h2 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">{copy.title}</h2>
        </div>
        <Link
          href={route("/leaders")}
          className="flex items-center gap-1.5 text-[14px] font-medium text-ink-muted hover:text-forest-500"
        >
          {copy.link} <ArrowRight size={15} />
        </Link>
      </div>

      {/* Leader rows */}
      <div>
        {TRENDING.map((leader, i) => {
          const isUp   = leader.trend === "up";
          const isDown = leader.trend === "down";
          const deltaColor = isUp
            ? "text-[var(--signal-good)]"
            : isDown
              ? "text-[var(--signal-low)]"
              : "text-cruise-500";

          return (
            <Link
              key={leader.slug}
              href={route("/leaders")}
              className="flex items-center gap-4 border-b border-line py-4 transition-colors hover:bg-forest-tint/20 dark:hover:bg-white/5"
            >
              {/* Rank */}
              <div className="w-8 shrink-0 text-center">
                <span className="font-mono text-[13px] font-black text-ink">{String(i + 1).padStart(2, "0")}</span>
                {leader.delta !== "New" ? (
                  <p className={`font-mono text-[9px] font-bold leading-none ${deltaColor}`}>{leader.delta}</p>
                ) : (
                  <p className="font-mono text-[9px] font-bold leading-none text-cruise-500">New</p>
                )}
              </div>

              {/* Initials avatar — no actual photograph */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-forest-tint dark:bg-forest-tint/30">
                <span className="font-mono text-[10px] font-bold text-forest-700 dark:text-forest-300">
                  {leader.initials}
                </span>
              </div>

              {/* Name + role */}
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink">{leader.name}</p>
                <p className="truncate text-[12px] text-ink-muted">
                  {leader.role} · {leader.jurisdiction}
                </p>
              </div>

              {/* Score ring */}
              <ScoreRing score={leader.score} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
