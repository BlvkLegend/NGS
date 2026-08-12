import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  BookOpen, Users2, ScanSearch, Landmark,
  Shield, Ban, BarChart3, Mic2,
} from "lucide-react";
import { asset } from "@/lib/asset";
import { AboutHeroCopy, AboutNotTitle, AboutFooterLinks } from "@/components/about-copy";

const HERO_PHOTO = asset("/about-hero.png");
// "What NGSC is not" background — use the logo mark as a large watermark on a dark surface
const LOGO_SRC   = asset("/ngsc-logo.png");

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* SiteHeader positioned absolute so it overlays the hero */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-30">
          <SiteHeader />
        </div>

        {/* FULL-BLEED HERO — nav floats over the top of this */}
        <div className="relative min-h-[80vh] w-full overflow-hidden">
          <img
            src={HERO_PHOTO}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
          />
          {/* Strong dark overlay — readable in light and dark mode */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.72) 75%, rgba(0,0,0,0.92) 100%)",
            }}
          />

          {/* Hero content — pt-32 clears the nav */}
          <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 pt-32 lg:px-10">
            <AboutHeroCopy />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 pb-16 pt-14 lg:px-10">
        {/* What / Why grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          <AboutCard icon={<ScanSearch size={18} />} title="The problem"
            body="Most citizens have no fast, objective way to track whether an official is delivering on infrastructure, healthcare, education, or fiscal management. Evaluation defaults to rhetoric because structured data is out of reach." />
          <AboutCard icon={<Landmark size={18} />} title="The goal"
            body="Turn fragmented governance data into a scannable NGSC card: a grade, a score, and category breakdowns, built from real citizen evaluations rather than any single institution's press release." />
          <AboutCard icon={<Users2 size={18} />} title="Who it is for"
            body="The everyday voter checking their state before an election. The diaspora Nigerian keeping up from abroad. The journalist or researcher who needs a citable, structured score rather than a vibe." />
          <AboutCard icon={<BookOpen size={18} />} title="Why it is structured this way"
            body="Ten fixed questions per evaluation, the same categories for every official, so one governor's score means the same thing as another's. Every evaluation is anonymous. No account needed." />
        </div>

        {/* What NGSC is NOT — dark surface with logo watermark, no photo repeat */}
        <div className="relative mt-14 overflow-hidden rounded-2xl bg-forest-900">
          {/* Logo as large watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.07]"
          >
            <img
              src={LOGO_SRC}
              alt=""
              className="w-96 max-w-full object-contain"
            />
          </div>
          {/* Corner geometry accent */}
          <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-[0.06]">
            <svg viewBox="0 0 256 256" fill="none">
              {[0,1,2,3,4].map(i => (
                <circle key={i} cx="256" cy="0" r={50 + i*38} stroke="white" strokeWidth="1" fill="none"/>
              ))}
            </svg>
          </div>

          <div className="relative px-6 py-12 lg:px-10">
            <AboutNotTitle />
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

        <AboutFooterLinks />
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
    <div className="rounded-2xl border border-paper/12 bg-paper/6 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2.5">
        <span className="text-paper/65">{icon}</span>
        <h3 className="text-[14px] font-semibold text-paper">{title}</h3>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-paper/60">{body}</p>
    </div>
  );
}
