"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMode } from "@/lib/mode-context";
import { scoreToGrade } from "@/lib/utils";
import { route } from "@/lib/asset";
import type { Leader } from "@/lib/data";

const COPY = {
  taxpayer: {
    backLabel: "Browse leaders",
    inOffice: "In office since",
    evaluateBtn: (name: string) => `Evaluate ${name}`,
    compareBtn: "Compare",
    nextBtn: "Next",
    catTitle: "Category scores",
    catSub: (n: string) => `Aggregated from ${n} anonymous citizen evaluations.`,
  },
  cruise: {
    backLabel: "Back to the list",
    inOffice: "Don dey there since",
    evaluateBtn: (name: string) => `Drag ${name} now`,
    compareBtn: "Compare am",
    nextBtn: "Next oga",
    catTitle: "How dem score per area",
    catSub: (n: string) => `${n} citizens don submit their take.`,
  },
};

export function LeaderDetailActions({ leader, nextLeader }: { leader: Leader; nextLeader?: Leader }) {
  const { mode } = useMode();
  const c = COPY[mode];
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href={route(`/evaluate/${leader.slug}`)}
        className="flex items-center gap-2 rounded-full bg-forest-500 px-6 py-3 text-[14px] font-medium text-paper transition-colors hover:bg-forest-700"
      >
        {c.evaluateBtn(leader.name.split(" ")[0])} <ArrowRight size={15} />
      </Link>
      <Link
        href={route(`/compare?leader=${leader.slug}`)}
        className="rounded-full border border-line-strong px-6 py-3 text-[14px] font-medium text-ink transition-colors hover:bg-forest-tint"
      >
        {c.compareBtn}
      </Link>
      {nextLeader && (
        <Link
          href={route(`/leaders/${nextLeader.slug}`)}
          className="ml-auto flex items-center gap-1.5 text-[13px] font-medium text-ink-muted hover:text-forest-500"
        >
          {c.nextBtn} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

export function LeaderCategorySection({ leader }: { leader: Leader }) {
  const { mode } = useMode();
  const c = COPY[mode];
  return (
    <div>
      <h2 className="text-[13px] font-semibold uppercase tracking-wide text-ink-muted">{c.catTitle}</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
        {c.catSub(leader.evaluations.toLocaleString())}
      </p>
      <div className="mt-4 space-y-2.5">
        {leader.categories.map((cat) => (
          <div key={cat.label} className="flex items-center gap-3">
            <span className="w-36 shrink-0 text-[12px] text-ink-muted">{cat.label}</span>
            <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-forest-500" style={{ width: `${cat.score}%` }} />
            </div>
            <span className="w-7 shrink-0 text-right font-mono text-[12px] text-ink">{cat.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LeaderBackLink() {
  const { mode } = useMode();
  const c = COPY[mode];
  return c.backLabel;
}

export function LeaderInOfficeCopy() {
  const { mode } = useMode();
  return COPY[mode].inOffice;
}
