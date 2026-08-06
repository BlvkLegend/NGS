# Nigeria Governance Scorecard

A frontend-only, statically exported Next.js build of the stakeholder PRD.
Every backend concept in the PRD (aggregation queries, Supabase tables,
server-side pulse analytics, transcript storage) is represented here as a
believable, fully working frontend mock, structured so a real API can be
dropped in later with minimal refactoring.

## Stack

Next.js 15 (App Router, static export) · TypeScript · Tailwind CSS v4 ·
Framer Motion · lucide-react · self-hosted Fraunces / Inter / IBM Plex Mono.

## Run locally

```bash
npm install
npm run dev
```

## Build and deploy

```bash
npm run build   # outputs a fully static site to ./out
```

`next.config.ts` is set to `output: "export"`, so `npm run build` produces a
static `out/` directory with no server required. `.github/workflows/deploy.yml`
builds and deploys that folder to GitHub Pages automatically on every push to
`main`. To enable it: push this repo to GitHub, then in the repo's Settings →
Pages, set the source to "GitHub Actions". The workflow sets `basePath`
automatically to match your repository name.

If you'd rather deploy to Vercel or Netlify instead of GitHub Pages, remove
`output: "export"` from `next.config.ts` first (both platforms run the full
Next.js server and don't need static export).

## The two interface modes

The PRD's core mechanic: a single master toggle (`PersonaToggle`, in the
header and in Settings) switches the entire application between:

- **Taxpayer** — light, serif-driven editorial register. Formal question
  phrasing, list-based leader search.
- **Agbado-Cruise** — dark, bolder accent colour, street-slang microcopy,
  image-grid leader picker. Same underlying data, different voice.

Mode state lives in `src/lib/mode-context.tsx`, persisted to `localStorage`,
and read via `useMode()` anywhere copy or layout needs to branch.

## PRD screens as built

| PRD Screen | Route | Component | Notes |
|---|---|---|---|
| 1. Onboarding & demographic gate | `/start` | `onboarding-gate.tsx` | Jurisdiction + occupation selects, stored to `sessionStorage` |
| 2. Split-gateway leader selection | `/select` | `leader-select-canvas.tsx` | Search list (Taxpayer) or photo grid (Cruise), driven by the same `leaders` data |
| 3. 10-question satirical engine | `/evaluate/[slug]` | `quiz-engine.tsx` | Each question renders dual copy; selecting an option reveals a mock "community pulse" percentage |
| 4. 9:16 scorecard + share wall | `/scorecard/[slug]` | `scorecard-canvas.tsx` | Locked/blurred until a share action fires; unlocks via click, native Web Share API, or window-focus-return |
| 5. Microphone voice room | same page, post-unlock | `microphone-room.tsx` | Real client-side transcription via the Web Speech API, matched live against a keyword vector list. No audio is recorded or uploaded anywhere |
| 6. Floating leaderboard | global | `leaderboard-widget.tsx` | Collapsed badge, upper-left, expands to a ranked top-5 |

The original detailed civic ledger record (Landing, full leader profile,
category-by-category Governance Call Card at `/card/[slug]`) is kept as the
long-form "full record" a scorecard links out to, since the PRD's viral
9:16 asset and the earlier detailed record serve different jobs.

## Mock data and future backend swap

Everything the PRD assigns to a backend lives in `src/lib/data.ts` as typed,
exported constants and pure functions:

- `communityPulse(leaderSlug, questionId, optionValue)` returns a deterministic
  mock percentage today. Swap its body for a real aggregation API call and
  every call site (`quiz-engine.tsx`) keeps working unchanged.
- `getRankTitle(score, mode)` maps a score to a satirical rank title. Move
  the `rankTitles` table server-side later without touching the caller.
- `voiceKeywordVectors` is the client-side stand-in for the PRD's
  `matched_keywords` semantic tracking list.
- `leaders` doubles as both the directory and the leaderboard source; a real
  build would replace this with a fetch to `anonymous_evaluations` aggregates.

No component reads these as hardcoded literals inline. Every screen imports
from `lib/data.ts` or accepts a `Leader` prop, so pointing them at Supabase
or any other API is a data-layer change, not a UI rewrite.

## Design system

Tokens live in `src/app/globals.css`. Paper/ink neutrals, a forest-green
system for Taxpayer mode, and an amber/orange system for Agbado-Cruise mode,
all mapped through `@theme inline` so component classes like `bg-forest-500`
or `bg-cruise-500` retheme from one file.

## Figma conversion notes

Built for a clean HTML.to.Design / HTML-to-Figma pass:

- Semantic HTML throughout (`header`, `main`, `footer`, `section`, `nav`,
  proper heading levels, `button` vs `a` used correctly, no interactive
  elements nested inside other interactive elements).
- Flexbox and CSS Grid only. The single exception is the two small
  perforation "cutout" circles on the ledger Call Card, which import as
  plain circle layers.
- Shallow component trees (rarely more than 3 to 4 levels), so imports
  produce sensible Figma frames instead of nested group soup.
- One spacing scale, one radius scale, three font families, and a small
  fixed set of named colour tokens, so Figma's variable/style import maps
  cleanly with no orphaned one-off values.
- Motion (Framer Motion) is layered on top of static layouts, never used to
  fake structure, so a static import still reads correctly with animations
  stripped.

## What's mocked versus real

Real, running in the browser: search and filters, the quiz engine, mock
pulse analytics, the share wall unlock logic (including the window-focus
heuristic described in the PRD), Web Speech API transcription and keyword
matching, image export of the ledger card via `html2canvas-pro`, dark/light
and Taxpayer/Cruise switching, and full client-side routing.

Mocked, awaiting a backend: authentication (`/login`, `/signup` are static
forms), persisted user accounts, real cross-user aggregation for pulse
percentages and the leaderboard, and server-side storage of transcripts.
