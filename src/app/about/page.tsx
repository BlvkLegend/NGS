import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookOpen, Users2, ScanSearch, Landmark, ArrowRight, Shield, Ban, BarChart3, Mic2 } from "lucide-react";
import { asset } from "@/lib/asset";

// flag.webp is actually the assembly interior — use it correctly here for Browse Leaders / assembly context
// about-hero.png is the Nigerian flag civic image — correct for About
const HERO_PHOTO    = asset("/about-hero.png");
const NOT_PHOTO     = asset("/assembly-interior.webp");  // National Assembly interior

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* FULL-BLEED HERO — nav stays on top, hero sits under it */}
      <div className="relative min-h-[72vh] w-full overflow-hidden">
        <img
          src={HERO_PHOTO}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
        {/* Gradient: dark everywhere so ALL hero text is readable in light AND dark mode */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.70) 75%, rgba(0,0,0,0.92) 100%)",
          }}
        />

        {/* All hero content inside the photo */}
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-14 pt-32 lg:px-10">
          <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-300">
            About NGSC
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-paper sm:text-5xl lg:text-6xl">
            Governance data, without the 200-page PDF.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-paper/75">
            Public governance data in Nigeria is fragmented, politicized, and buried inside reports
            nobody reads. NGSC closes that gap: one place to see how an official is actually
            performing, built from structured citizen evaluations rather than sentiment and social
            media noise.
          </p>
          <div className="mt-8">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-xl bg-forest-500 px-6 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-forest-700"
            >
              Rate a leader <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 pb-16 pt-14 lg:px-10">
        {/* What / Why grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          <AboutCard icon={<ScanSearch size={18} />} title="The problem"
            body="Most citizens and journalists have no fast, objective way to track whether an official is delivering on infrastructure, healthcare, education, or fiscal management. Evaluation defaults to rhetoric because structured data is out of reach." />
          <AboutCard icon={<Landmark size={18} />} title="The goal"
            body="Turn fragmented, intimidating governance data into a scannable NGSC card: a grade, a score, and category breakdowns, built from real citizen evaluations rather than a single institution's press release." />
          <AboutCard icon={<Users2 size={18} />} title="Who it is for"
            body="The everyday voter checking their state before an election. The diaspora Nigerian keeping up from abroad. The journalist or researcher who needs a citable, structured score rather than a vibe." />
          <AboutCard icon={<BookOpen size={18} />} title="Why it is structured this way"
            body="Ten fixed questions per evaluation, the same categories for every official, so one governor's score means the same thing as another's. Every evaluation is anonymous. No account needed." />
        </div>

        {/* What NGSC is NOT — National Assembly interior photo background */}
        <div className="relative mt-14 overflow-hidden rounded-2xl">
          <img
            src={NOT_PHOTO}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Strong dark overlay so cards and text read on the busy photo */}
          <div className="absolute inset-0 bg-black/78" />

          <div className="relative px-6 py-12 lg:px-10">
            <h2 className="text-2xl font-bold text-paper">What NGSC is not</h2>
            <p className="mt-1 text-[13px] text-paper/60">
              Important distinctions before you evaluate.
            </p>
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
    <div className="rounded-2xl border border-paper/15 bg-paper/8 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2.5">
        <span className="text-paper/70">{icon}</span>
        <h3 className="text-[14px] font-semibold text-paper">{title}</h3>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-paper/65">{body}</p>
    </div>
  );
}
