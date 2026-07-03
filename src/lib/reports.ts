// ────────────────────────────────────────────────────────────────────────────
// Report center: polished, generatable executive documents.
// ────────────────────────────────────────────────────────────────────────────

export interface ReportSection {
  heading: string;
  body?: string;
  bullets?: string[];
  metrics?: { label: string; value: string; delta?: string; sentiment?: "good" | "bad" | "neutral" }[];
}

export interface Report {
  id: string;
  title: string;
  subtitle: string;
  cadence: string;
  updated: string;
  icon: string;
  pages: number;
  sections: ReportSection[];
}

export const reports: Report[] = [
  {
    id: "weekly",
    title: "Weekly Marketing Report",
    subtitle: "Performance, decisions, and next steps",
    cadence: "Weekly",
    updated: "Generated 2h ago",
    icon: "CalendarDays",
    pages: 4,
    sections: [
      {
        heading: "Executive summary",
        body: "A strong week led by LinkedIn ABM and organic. One efficiency issue on Meta was detected and contained. Net: pipeline healthy, efficiency correcting.",
      },
      {
        heading: "Key metrics",
        metrics: [
          { label: "Revenue (wk)", value: "$0.98M", delta: "+7%", sentiment: "good" },
          { label: "SQL", value: "118", delta: "+5%", sentiment: "good" },
          { label: "CAC", value: "$1,284", delta: "+14%", sentiment: "bad" },
          { label: "ROAS", value: "4.9x", delta: "−5%", sentiment: "bad" },
        ],
      },
      {
        heading: "Decisions this week",
        bullets: [
          "Paused Meta Retargeting 12 and reallocated $40K to LinkedIn ABM.",
          "Scheduled the Freight Ops webinar for Aug 14.",
          "Updated enterprise messaging to lead with 'freight visibility.'",
        ],
      },
      {
        heading: "Next week",
        bullets: [
          "Ship the Freightline comparison page.",
          "Publish the 'freight visibility software' pillar page.",
          "Launch winback flow for 6 at-risk enterprise logos.",
        ],
      },
    ],
  },
  {
    id: "monthly",
    title: "Monthly Marketing Report",
    subtitle: "July performance review",
    cadence: "Monthly",
    updated: "Generated yesterday",
    icon: "CalendarRange",
    pages: 9,
    sections: [
      {
        heading: "Month in review",
        body: "July delivered $3.94M in marketing-sourced revenue (+9.1% MoM), beating target by 6.5%. Organic set a record. CAC rose on an isolated Meta issue, now contained.",
      },
      {
        heading: "Scorecard",
        metrics: [
          { label: "Revenue", value: "$3.94M", delta: "+9.1%", sentiment: "good" },
          { label: "Pipeline", value: "$18.2M", delta: "−3.2%", sentiment: "bad" },
          { label: "MQL", value: "2,140", delta: "−7.4%", sentiment: "bad" },
          { label: "SQL", value: "486", delta: "+4.8%", sentiment: "good" },
          { label: "CAC", value: "$1,284", delta: "+14.2%", sentiment: "bad" },
          { label: "Visitors", value: "412K", delta: "+11.3%", sentiment: "good" },
        ],
      },
      {
        heading: "What worked",
        bullets: [
          "LinkedIn ABM sustained 6.7x ROAS and led revenue outperformance.",
          "Partnerships grew 22% at an 18.7x ROAS — the most efficient channel.",
          "Organic reached 148K visits on SEO fixes and compounding content.",
        ],
      },
      {
        heading: "What to fix",
        bullets: [
          "Meta retargeting fatigue drove the CAC increase — paused and being refreshed.",
          "MQL decline traced to a Jun 28 lead-scoring change — recalibration in progress.",
        ],
      },
    ],
  },
  {
    id: "board",
    title: "Board Deck",
    subtitle: "July board narrative",
    cadence: "Monthly",
    updated: "Generated 6h ago",
    icon: "Presentation",
    pages: 9,
    sections: [
      {
        heading: "The story",
        body: "Efficient growth with a managed risk. Revenue beating plan, one isolated efficiency issue already contained, and a clear, funded Q4 ask.",
      },
      {
        heading: "Headline metrics",
        metrics: [
          { label: "Marketing revenue", value: "$3.94M", delta: "+9.1%", sentiment: "good" },
          { label: "vs. Target", value: "+6.5%", sentiment: "good" },
          { label: "Pipeline", value: "$18.2M", sentiment: "neutral" },
          { label: "Blended ROAS", value: "4.9x", sentiment: "neutral" },
        ],
      },
      {
        heading: "The ask",
        bullets: [
          "Approve $150K Q4 reallocation into ABM, partnerships and SEO.",
          "No incremental budget — funded from Meta reduction and reserve.",
          "Projected +$1.02M influenced pipeline at 8.4x blended return.",
        ],
      },
    ],
  },
  {
    id: "strategy",
    title: "Quarterly Strategy Review",
    subtitle: "Q3 plan & Q4 outlook",
    cadence: "Quarterly",
    updated: "Generated 3d ago",
    icon: "Compass",
    pages: 14,
    sections: [
      {
        heading: "Strategic priorities",
        bullets: [
          "Own 'freight visibility' as the category narrative.",
          "Scale the two highest-return engines: ABM and partnerships.",
          "Build durable organic moat via pillar content and technical SEO.",
        ],
      },
      {
        heading: "Q4 targets",
        metrics: [
          { label: "Revenue target", value: "$13.5M", sentiment: "neutral" },
          { label: "Pipeline target", value: "$24M", sentiment: "neutral" },
          { label: "CAC ceiling", value: "$1,200", sentiment: "neutral" },
          { label: "ROAS floor", value: "5.2x", sentiment: "neutral" },
        ],
      },
    ],
  },
  {
    id: "risk",
    title: "Risk Report",
    subtitle: "Active risks & mitigations",
    cadence: "On-demand",
    updated: "Generated 1h ago",
    icon: "ShieldAlert",
    pages: 3,
    sections: [
      {
        heading: "Risk register",
        bullets: [
          "Meta CAC drag — Critical — contained (campaign paused).",
          "Freightline competitive launch — High — response shipping this week.",
          "MQL volume decline — Medium — root-cause in progress.",
          "Europe pipeline softness — Medium — monitoring.",
          "6 enterprise logos at churn risk — Medium — in winback flow.",
        ],
      },
    ],
  },
  {
    id: "investor",
    title: "Investor Update",
    subtitle: "Marketing section — July",
    cadence: "Monthly",
    updated: "Generated 5h ago",
    icon: "TrendingUp",
    pages: 2,
    sections: [
      {
        heading: "Marketing highlights",
        bullets: [
          "Marketing-sourced revenue +9.1% MoM, beating plan by 6.5%.",
          "Net revenue retention holding at 118%.",
          "Two channels (ABM, partnerships) delivering 6.7x–18.7x ROAS.",
        ],
      },
      {
        heading: "Efficiency",
        metrics: [
          { label: "CAC", value: "$1,284", delta: "+14%", sentiment: "bad" },
          { label: "LTV:CAC", value: "4.6x", sentiment: "good" },
          { label: "Payback", value: "11 mo", sentiment: "good" },
        ],
      },
    ],
  },
];

export function getReport(id: string) {
  return reports.find((r) => r.id === id);
}
