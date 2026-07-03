// ────────────────────────────────────────────────────────────────────────────
// The virtual boardroom: each department head presents; the VP synthesizes.
// ────────────────────────────────────────────────────────────────────────────

export interface MeetingSpeaker {
  deptId: string;
  name: string; // AI persona
  role: string;
  accent: string;
  headline: string;
  points: string[];
  metric: { label: string; value: string; sentiment: "good" | "bad" | "neutral" };
}

export const boardroom: MeetingSpeaker[] = [
  {
    deptId: "analytics",
    name: "Atlas",
    role: "Analytics",
    accent: "#60a5fa",
    headline: "Growth is real; efficiency needs a small correction.",
    points: [
      "Revenue +9.1% MoM, beating target by 6.5%.",
      "CAC rose 14.2% — 78% of it isolated to Meta retargeting.",
      "Q4 pipeline forecast revised up 6% on ABM momentum.",
    ],
    metric: { label: "Revenue", value: "+9.1%", sentiment: "good" },
  },
  {
    deptId: "performance",
    name: "Vega",
    role: "Performance Marketing",
    accent: "#7c8cf8",
    headline: "Paused the offender, doubled down on the winner.",
    points: [
      "Paused Meta Retargeting 12 at 1.9x ROAS.",
      "Reallocated $40K to LinkedIn ABM (6.7x ROAS).",
      "Blended ROAS recovers to 5.2x within two weeks.",
    ],
    metric: { label: "Blended ROAS", value: "4.9x", sentiment: "neutral" },
  },
  {
    deptId: "content",
    name: "Lyra",
    role: "Content",
    accent: "#4ade80",
    headline: "Content engine is compounding and converting.",
    points: [
      "38 assets shipped; content-sourced MQL +8.4%.",
      "Freight Ops webinar scheduled for Aug 14.",
      "ROI calculator remains the top-converting asset at 9.1%.",
    ],
    metric: { label: "Content MQL", value: "612", sentiment: "good" },
  },
  {
    deptId: "brand",
    name: "Nova",
    role: "Brand",
    accent: "#a78bfa",
    headline: "New enterprise narrative tests 22% stronger.",
    points: [
      "'Freight visibility' message outperforms 'supply chain platform.'",
      "Rolling out across ads and site this week.",
      "Brand consistency up to 96% across channels.",
    ],
    metric: { label: "Resonance", value: "+22%", sentiment: "good" },
  },
  {
    deptId: "crm",
    name: "Juno",
    role: "CRM & Lifecycle",
    accent: "#f472b6",
    headline: "Lifecycle automation is lifting conversion and retention.",
    points: [
      "Enterprise nurture lifted SQL conversion +18%.",
      "Net revenue retention at 118%.",
      "6 at-risk logos moved into proactive winback.",
    ],
    metric: { label: "SQL conversion", value: "+18%", sentiment: "good" },
  },
  {
    deptId: "research",
    name: "Echo",
    role: "Research & Listening",
    accent: "#fbbf24",
    headline: "Freightline is the threat to watch this quarter.",
    points: [
      "Freightline launched an 'AI dispatch' campaign.",
      "They're bidding on our branded terms.",
      "Defensive comparison page ships within 72 hours.",
    ],
    metric: { label: "Share of Voice", value: "24%", sentiment: "bad" },
  },
];

export const vpSummary = {
  name: "Vice President of Marketing",
  headline: "Efficient growth, one managed risk, and a clear Q4 ask.",
  points: [
    "Marketing is beating plan (+9.1% revenue) on the strength of LinkedIn ABM and partnerships.",
    "The CAC increase is isolated to Meta and already contained — expect normalization within two weeks.",
    "The competitive threat from Freightline has an owner and a plan shipping this week.",
    "My recommendation: approve a $150K Q4 reallocation into ABM, partnerships and SEO — our three highest-return engines.",
  ],
  decision: "Approve $150K Q4 reallocation · Ship Freightline response · Hold Meta for SMB only",
};

export const upcomingMeetings = [
  { title: "Weekly Marketing Sync", when: "Monday · 9:00 AM", attendees: 8, kind: "Internal" },
  { title: "Q3 Board Review", when: "Aug 12 · 2:00 PM", attendees: 6, kind: "Board" },
  { title: "CEO 1:1 Pre-read", when: "Friday · 4:00 PM", attendees: 2, kind: "Executive" },
  { title: "Pipeline Council", when: "Aug 15 · 11:00 AM", attendees: 5, kind: "Cross-functional" },
];
