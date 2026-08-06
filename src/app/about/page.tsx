import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookOpen, Users2, ScanSearch, Landmark } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <span className="ledger-index text-[12px] text-forest-500">About NGSC</span>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
          Governance data, without the 200-page PDF.
        </h1>
        <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-muted">
          Public governance data in Nigeria is fragmented, politicized, and
          usually buried inside reports nobody has time to read. NGSC exists
          to close that gap: a single place to see how an official is
          actually performing, built from structured citizen evaluations
          rather than sentiment and social media noise.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <AboutCard
            icon={<ScanSearch size={18} />}
            title="The problem"
            body="Most citizens, and most journalists, have no fast, objective way to track whether an official is delivering on infrastructure, healthcare, education, or fiscal management. Evaluation defaults to rhetoric because the data is out of reach."
          />
          <AboutCard
            icon={<Landmark size={18} />}
            title="The goal"
            body="Turn fragmented, intimidating governance data into a scannable scorecard: a grade, a score, and category breakdowns, built from real evaluations rather than a single institution's press release."
          />
          <AboutCard
            icon={<Users2 size={18} />}
            title="Who it's for"
            body="The everyday voter checking their state before an election. The diaspora Nigerian keeping up from abroad. The journalist or researcher who needs a citable, structured number rather than a vibe."
          />
          <AboutCard
            icon={<BookOpen size={18} />}
            title="Why it's structured this way"
            body="Ten fixed questions per evaluation, the same categories for every official, so one governor's score means the same thing as another's. See the full breakdown on the Methodology page."
          />
        </div>

        <div className="mt-14 border-t border-line pt-10">
          <h2 className="font-display text-xl font-medium text-ink">What NGSC is not</h2>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-muted">
            NGSC is not affiliated with INEC, any government body, or any
            political party. Scores are aggregated from citizen evaluations,
            not official government data, and are presented as public
            sentiment backed by structure, not as a certified audit.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function AboutCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-6">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-tint text-forest-500">
        {icon}
      </span>
      <h3 className="mt-4 font-display text-[15px] font-medium text-ink">{title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
