import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { leaders } from "@/lib/data";
import { scoreToGrade } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NgscCardVisual } from "@/components/ngsc-card-visual";
import { LandmarkBanner } from "@/components/landmark-banner";
import { Share2 } from "lucide-react";
import { LeaderDetailActions, LeaderCategorySection, LeaderBackLink, LeaderInOfficeCopy } from "@/components/leader-detail-view";
import { route } from "@/lib/asset";

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
          href={route("/leaders")}
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} /> <LeaderBackLink />
        </Link>

        <div className="mt-5">
          <LandmarkBanner jurisdiction={leader.jurisdiction} height="h-36 sm:h-44">
            <div className="flex items-end gap-4">
              <div className="mb-0.5 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-paper/40 bg-paper/15 backdrop-blur-sm">
                <span className="font-mono text-[1.1rem] font-bold text-paper">{leader.photoInitials}</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-paper/60">
                  {leader.role} · {leader.jurisdiction}
                </span>
                <h1 className="mt-0.5 text-2xl font-bold text-paper sm:text-3xl">{leader.name}</h1>
                <p className="mt-0.5 text-[12px] text-paper/60">
                  {leader.party} · <LeaderInOfficeCopy /> {leader.tookOffice}
                </p>
              </div>
            </div>
          </LandmarkBanner>
        </div>

        {/* Stat strip */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-5 sm:grid-cols-3">
          <Stat value={String(leader.score)} sub="/100" label="Governance score" />
          <Stat value={grade} label="Grade" />
          <Stat value={leader.evaluations.toLocaleString()} label="Citizen evaluations" />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[auto_1fr]">
          <div className="flex flex-col gap-3">
            <div className="group relative">
              <NgscCardVisual leader={leader} />
              <Link
                href={route(`/scorecard/${leader.slug}`)}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-ink opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                aria-label="Share this card"
              >
                <Share2 size={14} />
              </Link>
            </div>
            <p className="text-[11px] text-ink-muted">
              Hover for share icon or{" "}
              <Link href={route(`/scorecard/${leader.slug}`)} className="text-forest-500 hover:underline">
                open the full card
              </Link>
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <LeaderCategorySection leader={leader} />
            <LeaderDetailActions leader={leader} nextLeader={nextLeader} />
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
