# VP Marketing AI

An autonomous **AI Vice President of Marketing** — the operating system for an entire marketing organization.

Instead of asking an AI to "generate a Facebook ad," executives ask their VP strategic questions:

> "Why is CAC increasing?" · "Where should I spend another $100,000?" · "Prepare Monday's board meeting."

The VP convenes the right departments, synthesizes their findings, and returns decision-ready recommendations — as a calm, confident, Fortune-500-grade product.

> This is a **frontend MVP**. Every response is powered by curated local mock data designed to feel indistinguishable from a live autonomous system.

---

## Quick start

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

## Deploy to GitHub Pages

The app builds to a fully static site in **`/docs`**, ready to serve from GitHub Pages.

```bash
npm run build          # exports the static site into /docs (with .nojekyll)
git add docs && git commit -m "Build site" && git push
```

Then in the repo: **Settings → Pages → Source: "Deploy from a branch" → Branch: `main` / `docs`**.

The site is served at `https://<user>.github.io/VPM/`. That subpath is configured via
`basePath: "/VPM"` in [`next.config.mjs`](next.config.mjs) (production only, so `npm run dev`
still runs at `/`). **Hosting at a custom domain or a `<user>.github.io` root page?** Set the
env var `NEXT_PUBLIC_BASE_PATH=""` for the build, or change the fallback in `next.config.mjs`.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** — custom dark charcoal design system
- **Framer Motion** — page transitions, streaming, count-ups, boardroom playback
- **Recharts** — revenue, forecast, channel & funnel charts
- **Lucide** — iconography

## The experience

| Route | What it is |
|---|---|
| `/` | **Dashboard** — Monday-morning executive briefing, KPI scorecard, charts, live agent activity, VP recommendations |
| `/chat` | **Executive Chat** — ask a strategic question; watch departments collaborate, then get a synthesized executive answer |
| `/organization` | **AI Org** — interactive VP → 8-department org chart |
| `/departments/[id]` | **Department OS** — objectives, KPIs, subagents, decisions, tasks, recommendations |
| `/campaigns` | **Campaign Simulator** — describe a campaign in one sentence, watch the org build it end-to-end |
| `/meetings` | **Virtual Boardroom** — each head presents, the VP delivers the decision |
| `/reports/[id]` | **Report Center** — board-ready documents generated live |
| `/memory` | **Marketing Memory** — the brain: brand, personas, competitors, experiments, playbooks |
| `/activity` | **Agent Activity** — continuous live feed of every decision and action |
| `/settings` | Workspace, executive autonomy controls, integrations |

### Try these in Executive Chat

`Why is CAC increasing?` · `What happened this month?` · `Where should I spend another $100,000?` · `Prepare Monday's board meeting` · `Show my biggest marketing risks` · `Show competitor analysis` · `What should I tell the CEO?`

### Try these in the Campaign Simulator

`Launch an enterprise logistics campaign` · `Launch a fintech campaign`

## Project structure

```
src/
  app/            App Router pages (one folder per route)
  components/
    shell/        Sidebar, Topbar, AppShell, live toasts
    ui/           Design primitives, icons, motion helpers
    charts/       Recharts wrappers
    dashboard/    KPI cards, activity feed, recommendation cards
    chat/         Streaming assistant message + response blocks
    campaigns/    Campaign simulator
    meetings/     Boardroom
  lib/            All mock data — company, metrics, org, chat, campaigns, meetings, reports, memory
```

All content lives in `src/lib`. Edit those files to re-skin the product for a different company.
