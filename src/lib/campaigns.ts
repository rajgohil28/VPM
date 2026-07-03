// ────────────────────────────────────────────────────────────────────────────
// Campaign simulator: the VP delegating a mission across the org, step by step.
// ────────────────────────────────────────────────────────────────────────────

export interface CampaignStep {
  id: string;
  dept: string;
  title: string;
  accent: string;
  duration: number; // ms of simulated work
  deliverables: { label: string; detail: string }[];
}

export interface CampaignBlueprint {
  id: string;
  keyword: RegExp;
  mission: string;
  vertical: string;
  steps: CampaignStep[];
  forecast: { label: string; value: string }[];
}

const logisticsSteps: CampaignStep[] = [
  {
    id: "s1",
    dept: "VP Marketing",
    title: "Mission scoped & delegated",
    accent: "#7c8cf8",
    duration: 900,
    deliverables: [
      { label: "Objective", detail: "Generate $2M enterprise logistics pipeline in 90 days" },
      { label: "Target", detail: "VP Operations & Heads of Fleet at 500+ truck carriers" },
      { label: "Budget envelope", detail: "$180,000 across paid, content & field" },
    ],
  },
  {
    id: "s2",
    dept: "Research",
    title: "Market & audience research",
    accent: "#fbbf24",
    duration: 1200,
    deliverables: [
      { label: "ICP defined", detail: "Mid-market carriers, 500–2,000 trucks, $50M–$500M revenue" },
      { label: "Pain points", detail: "Dispatch inefficiency, detention costs, poor freight visibility" },
      { label: "TAM sized", detail: "3,400 accounts · ~$140M addressable" },
    ],
  },
  {
    id: "s3",
    dept: "Brand",
    title: "Messaging & positioning",
    accent: "#a78bfa",
    duration: 1000,
    deliverables: [
      { label: "Core message", detail: "\"See every shipment. Cut detention. Ship on time.\"" },
      { label: "Proof points", detail: "Ryder: 31% fewer detention hours · 18% faster dispatch" },
      { label: "Tone", detail: "Operator-to-operator, ROI-led, zero fluff" },
    ],
  },
  {
    id: "s4",
    dept: "Content",
    title: "Content & assets",
    accent: "#4ade80",
    duration: 1400,
    deliverables: [
      { label: "Pillar asset", detail: "\"The Freight Visibility Playbook\" — 22-page guide" },
      { label: "Case study", detail: "Ryder enterprise deployment story" },
      { label: "Email sequence", detail: "5-touch nurture with ROI calculator CTA" },
    ],
  },
  {
    id: "s5",
    dept: "Creative",
    title: "Creative & video",
    accent: "#f472b6",
    duration: 1300,
    deliverables: [
      { label: "Ad set", detail: "9 LinkedIn creatives · 3 concepts × 3 formats" },
      { label: "Video", detail: "60s explainer + 15s cutdowns for retargeting" },
      { label: "Landing page", detail: "Enterprise logistics LP with ROI calculator" },
    ],
  },
  {
    id: "s6",
    dept: "Performance",
    title: "Channel & budget plan",
    accent: "#7c8cf8",
    duration: 1100,
    deliverables: [
      { label: "LinkedIn ABM", detail: "$110K — 340 target accounts, 6.7x expected ROAS" },
      { label: "Google Ads", detail: "$40K — high-intent freight software terms" },
      { label: "Field / events", detail: "$30K — 2 industry events + dinner series" },
    ],
  },
  {
    id: "s7",
    dept: "Analytics",
    title: "Forecast & measurement",
    accent: "#60a5fa",
    duration: 1000,
    deliverables: [
      { label: "Pipeline forecast", detail: "$2.1M influenced · $640K best-case closed-won" },
      { label: "Tracking plan", detail: "Multi-touch attribution + account-level dashboards" },
      { label: "Success metric", detail: "≥ 45 SQLs · CAC under $1,400 · ROAS ≥ 5.5x" },
    ],
  },
];

function makeSteps(base: CampaignStep[], overrides: Partial<Record<string, Partial<CampaignStep>>>) {
  return base.map((s) => ({ ...s, ...(overrides[s.id] || {}) }));
}

export const blueprints: CampaignBlueprint[] = [
  {
    id: "logistics",
    keyword: /logistic|freight|shipping|carrier|fleet|supply chain/i,
    mission: "Launch an enterprise logistics campaign",
    vertical: "Enterprise Logistics",
    steps: logisticsSteps,
    forecast: [
      { label: "Influenced pipeline", value: "$2.1M" },
      { label: "Expected SQLs", value: "48" },
      { label: "Blended ROAS", value: "5.8x" },
      { label: "Time to first lead", value: "6 days" },
    ],
  },
  {
    id: "fintech",
    keyword: /fintech|financ|payment|banking|lending/i,
    mission: "Launch a fintech campaign",
    vertical: "Fintech / Payments",
    steps: makeSteps(logisticsSteps, {
      s1: {
        title: "Mission scoped & delegated",
        deliverables: [
          { label: "Objective", detail: "Generate $1.5M fintech pipeline in 90 days" },
          { label: "Target", detail: "CFOs & Heads of Finance Ops at Series B–D fintechs" },
          { label: "Budget envelope", detail: "$150,000 across paid, content & webinars" },
        ],
      },
      s2: {
        title: "Market & audience research",
        deliverables: [
          { label: "ICP defined", detail: "Fintechs, 100–1,000 employees, $20M–$200M revenue" },
          { label: "Pain points", detail: "Reconciliation overhead, compliance risk, cash visibility" },
          { label: "TAM sized", detail: "2,100 accounts · ~$95M addressable" },
        ],
      },
      s3: {
        title: "Messaging & positioning",
        deliverables: [
          { label: "Core message", detail: "\"Close the books in hours, not weeks.\"" },
          { label: "Proof points", detail: "Cut reconciliation time 74% · SOC 2 + audit-ready" },
          { label: "Tone", detail: "Precise, compliance-aware, CFO-credible" },
        ],
      },
    }),
    forecast: [
      { label: "Influenced pipeline", value: "$1.5M" },
      { label: "Expected SQLs", value: "36" },
      { label: "Blended ROAS", value: "5.1x" },
      { label: "Time to first lead", value: "8 days" },
    ],
  },
];

export function resolveBlueprint(input: string): CampaignBlueprint {
  return blueprints.find((b) => b.keyword.test(input)) ?? blueprints[0];
}

export const activeCampaigns = [
  { name: "Enterprise ABM — Q3", vertical: "Enterprise Logistics", status: "Live", roas: "7.1x", spend: "$142K", pipeline: "$1.9M", progress: 68 },
  { name: "Freight Ops Webinar Series", vertical: "Demand Gen", status: "Live", roas: "5.8x", spend: "$61K", pipeline: "$740K", progress: 54 },
  { name: "SMB Self-Serve Trial", vertical: "Product-Led", status: "Live", roas: "3.2x", spend: "$39K", pipeline: "$310K", progress: 41 },
  { name: "Partner Co-Marketing", vertical: "Partnerships", status: "Live", roas: "12.4x", spend: "$18K", pipeline: "$468K", progress: 82 },
  { name: "Meta Retargeting 12", vertical: "Retargeting", status: "Paused", roas: "1.9x", spend: "$48K", pipeline: "$92K", progress: 100 },
];
