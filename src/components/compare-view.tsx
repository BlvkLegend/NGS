"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { GradeBadge } from "@/components/grade-badge";
import { leaders } from "@/lib/data";

export function CompareView() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("leader");
  const initialLeft = leaders.find((l) => l.slug === preselected)?.slug ?? leaders[0].slug;
  const initialRight = leaders.find((l) => l.slug !== initialLeft)?.slug ?? leaders[1].slug;

  const [leftSlug, setLeftSlug] = useState(initialLeft);
  const [rightSlug, setRightSlug] = useState(initialRight);

  const left = leaders.find((l) => l.slug === leftSlug)!;
  const right = leaders.find((l) => l.slug === rightSlug)!;

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <LeaderSelect value={leftSlug} onChange={setLeftSlug} exclude={rightSlug} />
        <LeaderSelect value={rightSlug} onChange={setRightSlug} exclude={leftSlug} />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-10">
        <LeaderSummary leader={left} />
        <LeaderSummary leader={right} />
      </div>

      <div className="mt-10 border-t border-line pt-10">
        <h2 className="text-[13px] font-medium uppercase tracking-wide text-ink-muted">
          Category comparison
        </h2>
        <div className="mt-4 space-y-5">
          {left.categories.map((cat, i) => {
            const rightScore = right.categories[i]?.score ?? 0;
            return (
              <div key={cat.label} className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <BarValue value={cat.score} align="right" />
                <span className="text-center text-[12px] text-ink-muted">{cat.label}</span>
                <BarValue value={rightScore} align="left" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LeaderSelect({
  value,
  onChange,
  exclude,
}: {
  value: string;
  onChange: (v: string) => void;
  exclude: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-line bg-paper-raised px-3.5 py-2.5 text-[14px] text-ink outline-none focus-visible:border-forest-500"
    >
      {leaders
        .filter((l) => l.slug !== exclude)
        .map((l) => (
          <option key={l.slug} value={l.slug}>
            {l.name} · {l.jurisdiction}
          </option>
        ))}
    </select>
  );
}

function LeaderSummary({ leader }: { leader: (typeof leaders)[number] }) {
  return (
    <div className="flex items-center gap-4">
      <GradeBadge score={leader.score} size="md" />
      <div>
        <div className="font-display text-lg font-medium text-ink">{leader.name}</div>
        <div className="font-mono text-[13px] text-ink-muted">{leader.score}/100</div>
      </div>
    </div>
  );
}

function BarValue({ value, align }: { value: number; align: "left" | "right" }) {
  return (
    <div className={`flex items-center gap-2 ${align === "right" ? "flex-row-reverse" : ""}`}>
      <div className="h-[5px] w-full max-w-32 overflow-hidden rounded-full bg-line">
        <div
          className={`h-full rounded-full bg-forest-500 ${align === "right" ? "ml-auto" : ""}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="font-mono w-7 shrink-0 text-[12px] text-ink">{value}</span>
    </div>
  );
}
