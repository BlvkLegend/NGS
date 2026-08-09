import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  BookOpen, Users2, ScanSearch, Landmark,
  ArrowRight, Shield, Ban, BarChart3, Mic2,
} from "lucide-react";

// Lagos / Nigerian civic street photography — no human faces, public spaces
const HERO_PHOTO = "https://images.unsplash.com/photo-1618396583029-58e03a25d1c5?auto=format&fit=crop&w=1400&q=75";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* Hero band: photo + headline, full width */}
      <div className="relative mx-auto max-w-[1400px] overflow-hidden px-0">
        <div className="relative h-52 w-full overflow-hidden sm:h-64 lg:h-72">
          <img
            src={HERO_PHOTO}
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-center"
            loading="eager"
          />
          {/* Left-to-right fade so text is always readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, var(--paper) 0%, color-mix(in srgb, var(--paper) 75%, transparent) 40%, transparent 75%)",
            }}
          />
          {/* Bottom fade into paper */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-paper to-transparent" />

          {/* Headline overlaid on the photo */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-10">
            <span className="ledger-index text-[12px] text-forest-500">About NGSC</span>
            <h1 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              Governance data, without the 200-page PDF.
            </h1>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 pb-16 pt-6 lg:px-10">

        {/* Wide intro text — full column, not half width */}
        <p className="max-w-3xl text-[16px] leading-relaxed text-ink-muted">
          Public governance data in Nigeria is fragmented, politicized, and buried inside reports
          nobody reads. NGSC closes that gap: one place to see how an official is actually
          performing, built from structured citizen evaluations rather than sentiment and social
          media noise.
        </p>

        <div className="mt-8">
          <Link
            href="/start"
            className="inline-flex items-center gap-2 rounded-xl bg-forest-500 px-5 py-3 text-[15px] font-semibold text-paper transition-colors hover:bg-forest-700"
          >
            Rate a leader <ArrowRight size={15} />
          </Link>
        </div>

        {/* What / Why grid — 2 columns at sm, stays wide */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          <AboutCard icon={<ScanSearch size={18} />} title="The problem"
            body="Most citizens and journalists have no fast, objective way to track whether an official is delivering on infrastructure, healthcare, education, or fiscal management. Evaluation defaults to rhetoric because structured data is out of reach." />
          <AboutCard icon={<Landmark size={18} />} title="The goal"
            body="Turn fragmented, intimidating governance data into a scannable NGSC card: a grade, a score, and category breakdowns, built from real citizen evaluations rather than a single institution's press release." />
          <AboutCard icon={<Users2 size={18} />} title="Who it is for"
            body="The everyday voter checking their state before an election. The diaspora Nigerian keeping up from abroad. The journalist or researcher who needs a citable, structured score rather than a vibe." />
          <AboutCard icon={<BookOpen size={18} />} title="Why it is structured this way"
            body="Ten fixed questions per evaluation, the same categories for every official, so one governor's score means the same thing as another's. Every evaluation is anonymous. No account needed." />
        </div>

        {/* What NGSC is NOT — dark surface with photo inset */}
        <div className="relative mt-16 overflow-hidden rounded-2xl bg-forest-900">
          {/* Faint street texture behind the dark band */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1648023199223-25d3622bcb13?auto=format&fit=crop&w=1400&q=40")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative px-6 py-10 lg:px-10">
            <h2 className="text-2xl font-bold text-paper">What NGSC is not</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <NotCard icon={<Ban size={16} />} title="Not a government body"
                body="NGSC has no affiliation with INEC, any ministry, or any political party. We are an independent citizen project. Nothing on this platform is an official government record or certified audit." />
              <NotCard icon={<Shield size={16} />} title="Not a partisan tool"
                body="The same ten questions apply to every official regardless of party. The scoring formula is public and consistent. We do not editorialize outside of satirical rank titles, which are clearly labelled." />
              <NotCard icon={<BarChart3 size={16} />} title="Not a polling service"
                body="Scores reflect structured citizen evaluations across ten fixed categories, not open-ended polls or star ratings. The methodology is designed to be reproducible and comparable across officials and time." />
              <NotCard icon={<Mic2 size={16} />} title="Not a social media platform"
                body="NGSC does not store profiles, followers, or social graphs. Evaluations are fully anonymous. The voice feature converts speech to text locally in your browser; no raw audio is ever transmitted or stored." />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-line pt-10">
          <Link href="/methodology" className="text-[14px] font-medium text-forest-500 hover:underline">
            Read the full methodology
          </Link>
          <span className="text-ink-muted">|</span>
          <Link href="/research" className="text-[14px] font-medium text-forest-500 hover:underline">
            Open the research table
          </Link>
          <span className="text-ink-muted">|</span>
          <Link href="/leaders" className="text-[14px] font-medium text-forest-500 hover:underline">
            Browse leaders
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function AboutCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
        {icon}
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}

function NotCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-paper/10 bg-paper/5 p-6">
      <div className="flex items-center gap-2.5">
        <span className="text-paper/60">{icon}</span>
        <h3 className="text-[14px] font-semibold text-paper">{title}</h3>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-paper/60">{body}</p>
    </div>
  );
}
