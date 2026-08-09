import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { leaders } from "@/lib/data";
import { scoreToGrade } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NgscCardVisual } from "@/components/ngsc-card-visual";

export function generateStaticParams() {
  return leaders.map((l) => ({ slug: l.slug }));
}

const TREND_ICON = {
  up: <ArrowUpRight size={14} className="text-signal-good" />,
  down: <ArrowDownRight size={14} className="text-signal-low" />,
  flat: <Minus size={14} className="text-ink-muted" />,
};

export default async function LeaderProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const leader = leaders.find((l) => l.slug === slug);
  if (!leader) notFound();

  const grade = scoreToGrade(leader.score);

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <Link
          href="/leaders"
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} /> Browse leaders
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="ledger-index text-[12px] text-forest-500">
              {leader.role} · {leader.jurisdiction}
            </span>
            <h1 className="mt-4 font-display text-4xl font-medium text-ink">{leader.name}</h1>
            <p className="mt-2 text-[14px] text-ink-muted">
              {leader.party} · in office since {leader.tookOffice}
            </p>
          </div>
          <span className="mt-1 flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[12px] text-ink-muted">
            {TREND_ICON[leader.trend]} {leader.trendDelta ?? "Steady"}
          </span>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
          <Stat value={String(leader.score)} label="Governance score" />
          <Stat value={grade} label="Grade" />
          <Stat value={leader.evaluations.toLocaleString()} label="Citizen evaluations" />
          <Stat value={leader.tookOffice} label="In office since" />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="rotate-[-2deg]">
            <NgscCardVisual leader={leader} />
          </div>

          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-wide text-ink-muted">
              Category breakdown
            </h2>
            <div className="mt-4 space-y-3">
              {leader.categories.map((cat) => (
                <div key={cat.label} className="flex items-center gap-3">
                  <span className="w-36 shrink-0 text-[13px] text-ink-muted">{cat.label}</span>
                  <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-line">
                    <div className="h-full rounded-full bg-forest-500" style={{ width: `${cat.score}%` }} />
                  </div>
                  <span className="w-7 shrink-0 text-right font-mono text-[12.5px] text-ink">
                    {cat.score}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-ink-muted">
              This profile aggregates {leader.evaluations.toLocaleString()} citizen
              evaluations into a single governance record. File your own
              evaluation to add your view to the public average.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/evaluate/${leader.slug}`}
                className="flex items-center gap-2 rounded-full bg-forest-500 px-6 py-3 text-[14px] font-medium text-paper transition-colors hover:bg-forest-700"
              >
                Evaluate {leader.name.split(" ")[0]} <ArrowRight size={15} />
              </Link>
              <Link
                href={`/compare?leader=${leader.slug}`}
                className="rounded-full border border-line-strong px-6 py-3 text-[14px] font-medium text-ink transition-colors hover:bg-forest-tint"
              >
                Compare
              </Link>
              <Link
                href={`/card/${leader.slug}`}
                className="ml-auto flex items-center gap-1.5 text-[13px] font-medium text-ink hover:text-forest-500"
              >
                Full record <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-mono text-xl font-medium text-ink">{value}</div>
      <div className="mt-1 text-[12px] text-ink-muted">{label}</div>
    </div>
  );
}
