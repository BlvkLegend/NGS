import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AchievementBadge } from "@/components/achievement-badge";
import { GradeBadge } from "@/components/grade-badge";
import { currentUser, myEvaluations, achievements } from "@/lib/data";
import { EmptyState } from "@/components/empty-state";
import { route } from "@/lib/asset";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex items-center gap-5">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-tint font-display text-xl font-medium text-forest-700">
            {currentUser.initials}
          </span>
          <div>
            <h1 className="font-display text-2xl font-medium text-ink">{currentUser.name}</h1>
            <p className="text-[13px] text-ink-muted">
              {currentUser.handle} · {currentUser.state} · member since {currentUser.memberSince}
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
          <Stat value={String(currentUser.evaluationsFiled)} label="Evaluations filed" />
          <Stat value={`${currentUser.streakWeeks} weeks`} label="Current streak" />
          <Stat value={String(achievements.filter((a) => a.earned).length)} label="Badges earned" />
          <Stat value={String(myEvaluations.length)} label="Officials evaluated" />
        </div>

        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-medium text-ink">Your evaluations</h2>
          </div>
          {myEvaluations.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="You haven't filed an evaluation yet"
                body="Find an official and share your honest assessment. It takes about six minutes."
                action={
                  <Link href={route("/leaders")} className="text-[13px] font-medium text-forest-500 hover:underline">
                    Browse leaders
                  </Link>
                }
              />
            </div>
          ) : (
            <div className="mt-4 divide-y divide-line border-t border-line">
              {myEvaluations.map((e) => (
                <Link
                  key={e.leaderSlug}
                  href={route(`/card/${e.leaderSlug}?s=${e.score}`)}
                  className="flex items-center justify-between py-4 hover:bg-forest-tint/40"
                >
                  <div className="flex items-center gap-4">
                    <GradeBadge score={e.score} size="sm" />
                    <div>
                      <div className="text-[14px] font-medium text-ink">{e.leaderName}</div>
                      <div className="text-[12px] text-ink-muted">Filed {e.filedOn}</div>
                    </div>
                  </div>
                  <ArrowRight size={15} className="text-ink-muted" />
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="font-display text-xl font-medium text-ink">Achievements</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {achievements.map((a) => (
              <AchievementBadge key={a.id} achievement={a} />
            ))}
          </div>
        </section>
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
