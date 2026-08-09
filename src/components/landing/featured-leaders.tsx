"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LeaderRow } from "@/components/leader-row";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";

const COPY = {
  taxpayer: { eyebrow: "03 / Currently trending", title: "Most evaluated this week", link: "View all leaders" },
  cruise: { eyebrow: "03 / Who dey trend", title: "Who everybody dey drag this week", link: "See everybody" },
};

export function FeaturedLeaders() {
  const { mode } = useMode();
  const copy = COPY[mode];

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
      <div className="flex items-end justify-between border-b border-line pb-6">
        <div>
          <span className="ledger-index text-[12px] text-forest-500">{copy.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl">
            {copy.title}
          </h2>
        </div>
        <Link
          href="/leaders"
          className="hidden items-center gap-1.5 text-[14px] font-medium text-ink hover:text-forest-500 sm:flex"
        >
          {copy.link} <ArrowRight size={15} />
        </Link>
      </div>

      <div>
        {leaders.map((leader, i) => (
          <LeaderRow key={leader.slug} leader={leader} index={i} />
        ))}
      </div>
    </section>
  );
}
