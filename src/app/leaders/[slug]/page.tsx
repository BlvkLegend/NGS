import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, Share2 } from "lucide-react";
import { leaders } from "@/lib/data";
import { scoreToGrade } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NgscCardVisual } from "@/components/ngsc-card-visual";
import { LandmarkBanner } from "@/components/landmark-banner";

export function generateStaticParams() {
  return leaders.map((l) => ({ slug: l.slug }));
}

export default async function LeaderProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const leader = leaders.find((l) => l.slug === slug);
  if (!leader) notFound();

  const grade = scoreToGrade(leader.score);
  const nextLeader = leaders.find((l) => l.slug !== leader.slug);

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
        <Link
          href="/leaders"
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} /> Browse leaders
        </Link>

        {/* Landmark banner — picture BEFORE title and name */}
        <div className="mt-5">
          <LandmarkBanner jurisdiction={leader.jurisdiction} height="h-36 sm:h-44">
            <div className="flex items-end gap-4">
              {/* Person avatar before name */}
              <div className="mb-0.5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-paper/40 bg-paper/15 backdrop-blur-sm">
                <span className="font-mono text-[1.1rem] font-bold text-paper">{leader.photoInitials}</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/60">
                  {leader.role} · {leader.jurisdiction}
                </span>
                <h1 className="mt-0.5 text-2xl font-bold text-paper sm:text-3xl">{leader.name}</h1>
                <p className="mt-0.5 text-[12px] text-paper/60">
                  {leader.party} · In office since {leader.tookOffice}
                </p>
              </div>
            </div>
          </LandmarkBanner>
        </div>

        {/* Quick stat strip */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-5 sm:grid-cols-3">
          <Stat value={String(leader.score)} sub="/100" label="Governance score" />
          <Stat value={grade} label="Grade" />
          <Stat value={leader.evaluations.toLocaleString()} label="Citizen evaluations" />
        </div>

        {/* Actions immediately under grading — not at bottom */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href={`/evaluate/${leader.slug}`}
            className="flex items-center gap-2 rounded-xl bg-forest-500 px-5 py-2.5 text-[14px] font-semibold text-paper transition-colors hover:bg-forest-700"
          >
            Evaluate {leader.name.split(" ")[0]} <ArrowRight size={15} />
          </Link>
          <Link
            href={`/compare?leader=${leader.slug}`}
            className="rounded-xl border border-line-strong px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:bg-forest-tint"
          >
            Compare
          </Link>
          {nextLeader && (
            <Link
              href={`/leaders/${nextLeader.slug}`}
              className="ml-auto flex items-center gap-1.5 text-[13px] font-medium text-ink-muted hover:text-forest-500"
            >
              Next <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {/* Main content: card + breakdown */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[auto_1fr]">
          {/* NGSC card */}
          <div className="flex flex-col gap-3">
            <div className="group relative">
              <NgscCardVisual leader={leader} />
              <Link
                href={`/scorecard/${leader.slug}`}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-ink opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                aria-label="Share this card"
              >
                <Share2 size={14} />
              </Link>
            </div>
            <p className="text-[11px] text-ink-muted">
              Tap the share icon or{" "}
              <Link href={`/scorecard/${leader.slug}`} className="text-forest-500 hover:underline">
                open the full shareable card
              </Link>
            </p>
          </div>

          {/* Right column: category breakdown only */}
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-wide text-ink-muted">
              Category scores
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
              Aggregated from {leader.evaluations.toLocaleString()} anonymous citizen evaluations.
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
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Stat({ value, sub, label }: { value: string; sub?: string; label: string }) {
  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span className="font-mono text-xl font-bold text-ink">{value}</span>
        {sub && <span className="font-mono text-[13px] text-ink-muted">{sub}</span>}
      </div>
      <div className="mt-0.5 text-[12px] text-ink-muted">{label}</div>
    </div>
  );
}
