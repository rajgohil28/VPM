// ────────────────────────────────────────────────────────────────────────────
// The Executive Chat engine. Mocked, but structured to feel like a team of AI
// executives collaborating: a delegation trace + a synthesized executive answer.
// ────────────────────────────────────────────────────────────────────────────

export interface CollabStep {
  dept: string;
  action: string;
  accent: string;
}

export interface ResponseBlock {
  type: "headline" | "para" | "bullets" | "numbered" | "stats" | "callout" | "table";
  text?: string;
  items?: string[];
  stats?: { label: string; value: string; delta?: string; sentiment?: "good" | "bad" | "neutral" }[];
  callout?: { tone: "info" | "warn" | "success"; title: string; body: string };
  table?: { head: string[]; rows: string[][] };
}

export interface ExecResponse {
  collaborators: CollabStep[];
  blocks: ResponseBlock[];
  followups: string[];
}

const A = {
  analytics: "#60a5fa",
  performance: "#7c8cf8",
  content: "#4ade80",
  seo: "#38bdf8",
  brand: "#a78bfa",
  crm: "#f472b6",
  research: "#fbbf24",
  operations: "#94a3b8",
};

export const suggestedPrompts = [
  "Why is CAC increasing?",
  "What happened this month?",
  "Prepare Monday's board meeting",
  "Show my biggest marketing risks",
  "Where should I spend another $100,000?",
  "Launch a logistics campaign",
  "Show competitor analysis",
  "What should I tell the CEO?",
];

interface Demo {
  match: RegExp;
  title: string;
  response: ExecResponse;
}

const demos: Demo[] = [
  {
    match: /cac|acquisition cost|why.*expensive/i,
    title: "Why is CAC increasing?",
    response: {
      collaborators: [
        { dept: "Analytics", action: "isolating CAC drivers by channel & cohort", accent: A.analytics },
        { dept: "Performance", action: "auditing spend efficiency across paid", accent: A.performance },
        { dept: "CRM", action: "checking lead-to-SQL conversion", accent: A.crm },
        { dept: "Operations", action: "validating attribution handoffs", accent: A.operations },
      ],
      blocks: [
        { type: "headline", text: "CAC rose 14.2% — the cause is concentrated in Meta, not systemic." },
        {
          type: "para",
          text: "Blended CAC increased from $1,124 to $1,284 over the trailing 30 days. Three of four paid channels held efficiency; the increase is 78% attributable to Meta retargeting, where creative fatigue and rising CPMs collided.",
        },
        {
          type: "stats",
          stats: [
            { label: "Blended CAC", value: "$1,284", delta: "+14.2%", sentiment: "bad" },
            { label: "Meta CAC", value: "$2,940", delta: "+41%", sentiment: "bad" },
            { label: "LinkedIn CAC", value: "$980", delta: "−4%", sentiment: "good" },
            { label: "Meta ROAS", value: "1.9x", delta: "−38%", sentiment: "bad" },
          ],
        },
        {
          type: "callout",
          callout: {
            tone: "warn",
            title: "Root cause",
            body: "Meta retargeting audiences saturated after 6 weeks without creative refresh. CPMs rose 22% while CTR fell 31% — a classic fatigue signature. This single campaign dragged blended CAC up ~$140.",
          },
        },
        { type: "headline", text: "Recommended actions" },
        {
          type: "numbered",
          items: [
            "Pause Meta Retargeting 12 immediately — already executed by Performance Marketing.",
            "Reallocate the freed $40K to LinkedIn ABM, which sustains 6.7x ROAS on enterprise.",
            "Brief Content on 3 net-new Meta creatives before any re-activation for SMB only.",
          ],
        },
        {
          type: "para",
          text: "Net effect: blended CAC returns below $1,150 within two weeks and blended ROAS recovers toward 5.2x, with no reduction in pipeline volume.",
        },
      ],
      followups: ["Show the Meta creative fatigue data", "Model the $40K reallocation", "Draft the CEO update on this"],
    },
  },
  {
    match: /what happened|this month|monthly|recap|summary of the month/i,
    title: "What happened this month?",
    response: {
      collaborators: [
        { dept: "Analytics", action: "compiling month-over-month performance", accent: A.analytics },
        { dept: "Performance", action: "summarizing paid outcomes", accent: A.performance },
        { dept: "Content", action: "reporting content contribution", accent: A.content },
        { dept: "Research", action: "flagging competitive moves", accent: A.research },
      ],
      blocks: [
        { type: "headline", text: "July was a strong month with one efficiency headwind to manage." },
        {
          type: "stats",
          stats: [
            { label: "Revenue", value: "$3.94M", delta: "+9.1%", sentiment: "good" },
            { label: "Pipeline", value: "$18.2M", delta: "−3.2%", sentiment: "bad" },
            { label: "SQL", value: "486", delta: "+4.8%", sentiment: "good" },
            { label: "CAC", value: "$1,284", delta: "+14.2%", sentiment: "bad" },
          ],
        },
        {
          type: "bullets",
          items: [
            "Revenue beat target by 6.5% — LinkedIn ABM and partnerships led the outperformance.",
            "Organic hit a record 148K visits (+9.2%) as SEO fixes and content compounded.",
            "CAC rose on Meta retargeting fatigue; Performance has already paused the offender.",
            "MQL volume dipped 7.4% — traced to a lead-scoring threshold change on Jun 28.",
            "Freightline entered the market with an 'AI dispatch' campaign we're moving to counter.",
          ],
        },
        {
          type: "callout",
          callout: {
            tone: "success",
            title: "Standout",
            body: "Partnership-sourced revenue grew 22% at an 18.7x ROAS — the most efficient channel in the mix and under-invested. Worth a dedicated Q4 plan.",
          },
        },
      ],
      followups: ["Why did MQLs drop?", "Prepare the board version", "Where should I spend more?"],
    },
  },
  {
    match: /board|monday.*meeting|prepare.*meeting/i,
    title: "Prepare Monday's board meeting",
    response: {
      collaborators: [
        { dept: "Analytics", action: "assembling the marketing scorecard", accent: A.analytics },
        { dept: "Performance", action: "summarizing efficiency & spend", accent: A.performance },
        { dept: "CRM", action: "pulling pipeline & retention", accent: A.crm },
        { dept: "Brand", action: "packaging the narrative", accent: A.brand },
        { dept: "Operations", action: "formatting the deck", accent: A.operations },
      ],
      blocks: [
        { type: "headline", text: "Monday's board narrative: efficient growth with a managed risk." },
        {
          type: "para",
          text: "I've prepared a 9-slide board deck. Here is the story it tells, structured for the room:",
        },
        {
          type: "numbered",
          items: [
            "Headline: marketing-sourced revenue +9.1% MoM, beating target by 6.5%.",
            "Efficiency: blended ROAS 4.9x; CAC rose 14.2% on an isolated Meta issue, already contained.",
            "Pipeline: $18.2M open, healthy coverage; Europe soft and being addressed.",
            "Growth engines: LinkedIn ABM (6.7x) and partnerships (18.7x) are the winners to fund.",
            "Risk & response: Freightline's launch — our defensive plan ships this week.",
            "Ask: approve $150K Q4 reallocation toward ABM, partnerships and SEO.",
          ],
        },
        {
          type: "callout",
          callout: {
            tone: "info",
            title: "Anticipated board question",
            body: "\"Why is CAC up?\" — Answer ready: isolated Meta fatigue, already paused, blended CAC recovers below $1,150 within two weeks. Frame as disciplined management, not a systemic problem.",
          },
        },
        { type: "para", text: "The full deck is in Reports → Board Deck. I can also generate a one-page CEO pre-read." },
      ],
      followups: ["Generate the CEO pre-read", "Open the board deck", "What will they push back on?"],
    },
  },
  {
    match: /risk|biggest.*risk|what.*wrong|concerns/i,
    title: "Show my biggest marketing risks",
    response: {
      collaborators: [
        { dept: "Analytics", action: "scanning for anomalies & trend breaks", accent: A.analytics },
        { dept: "Research", action: "assessing competitive threats", accent: A.research },
        { dept: "Performance", action: "checking budget exposure", accent: A.performance },
        { dept: "CRM", action: "reviewing customer health", accent: A.crm },
      ],
      blocks: [
        { type: "headline", text: "Three risks worth your attention — one urgent, two watch-items." },
        {
          type: "table",
          table: {
            head: ["Risk", "Severity", "Status"],
            rows: [
              ["Meta CAC drag on efficiency", "Critical", "Contained — campaign paused"],
              ["Freightline competitive launch", "High", "Response shipping this week"],
              ["MQL volume decline (−7.4%)", "Medium", "Root-cause in progress"],
              ["Europe pipeline softness", "Medium", "Monitoring"],
              ["6 enterprise logos at churn risk", "Medium", "In winback flow"],
            ],
          },
        },
        {
          type: "callout",
          callout: {
            tone: "warn",
            title: "The one to watch",
            body: "Freightline is bidding on our branded terms with an 'AI dispatch' message. Without a comparison page live this week, we risk losing ~8% of branded demand. Research and Content are already on it.",
          },
        },
        {
          type: "para",
          text: "Nothing here is existential. Each risk has an owner and an active mitigation. I'll alert you if any severity changes.",
        },
      ],
      followups: ["Prioritize these for me", "Draft the Freightline response", "Show the at-risk accounts"],
    },
  },
  {
    match: /spend|invest|budget|100,?000|100k|allocate|another.*money/i,
    title: "Where should I spend another $100,000?",
    response: {
      collaborators: [
        { dept: "Analytics", action: "ranking marginal ROAS by channel", accent: A.analytics },
        { dept: "Performance", action: "modeling incremental scale", accent: A.performance },
        { dept: "SEO", action: "sizing organic opportunity", accent: A.seo },
        { dept: "Operations", action: "checking budget headroom", accent: A.operations },
      ],
      blocks: [
        { type: "headline", text: "Deploy the $100K across three high-marginal-ROAS bets." },
        {
          type: "table",
          table: {
            head: ["Allocation", "Amount", "Expected return"],
            rows: [
              ["LinkedIn ABM (enterprise)", "$55,000", "+$369K pipeline · 6.7x"],
              ["Partnership co-marketing", "$25,000", "+$468K pipeline · 18.7x"],
              ["SEO content production", "$20,000", "+$180K annual · compounding"],
            ],
          },
        },
        {
          type: "para",
          text: "This mix balances immediate pipeline (LinkedIn), exceptional efficiency (partnerships — currently under-funded), and durable compounding return (SEO). I deliberately avoided Meta, where marginal ROAS is now below 2x.",
        },
        {
          type: "callout",
          callout: {
            tone: "success",
            title: "Blended outcome",
            body: "Projected +$1.02M in influenced pipeline within two quarters at a blended 8.4x return — well above the current 4.9x portfolio ROAS.",
          },
        },
      ],
      followups: ["Commit this allocation", "Model a more aggressive version", "What's the risk if I'm wrong?"],
    },
  },
  {
    match: /competitor|freightline|competition|market share/i,
    title: "Show competitor analysis",
    response: {
      collaborators: [
        { dept: "Research", action: "compiling competitive intelligence", accent: A.research },
        { dept: "Analytics", action: "estimating share of voice", accent: A.analytics },
        { dept: "Brand", action: "assessing positioning gaps", accent: A.brand },
      ],
      blocks: [
        { type: "headline", text: "Freightline is the immediate threat; ShipLogic is the long-term watch." },
        {
          type: "table",
          table: {
            head: ["Competitor", "Share of Voice", "Momentum", "Threat"],
            rows: [
              ["Northwind (us)", "24%", "Steady", "—"],
              ["Freightline", "29%", "Rising fast", "High"],
              ["ShipLogic", "21%", "Rising", "Medium"],
              ["CargoOS", "14%", "Declining", "Low"],
            ],
          },
        },
        {
          type: "bullets",
          items: [
            "Freightline just launched 'AI dispatch' — strong messaging, mixed reception (52% positive sentiment).",
            "They're bidding on our branded terms; we're not yet defending with a comparison page.",
            "Our differentiation — real-time freight visibility — tests 22% stronger but is under-marketed.",
            "ShipLogic is winning on price in SMB; not a threat in enterprise where we're strongest.",
          ],
        },
        {
          type: "callout",
          callout: {
            tone: "warn",
            title: "Recommended response",
            body: "Ship a 'Northwind vs. Freightline' comparison page in 72 hours, arm sales with a battlecard, and lead all enterprise creative with 'freight visibility.' Defensive and offensive in one move.",
          },
        },
      ],
      followups: ["Draft the comparison page", "Build the sales battlecard", "How do we beat them in enterprise?"],
    },
  },
  {
    match: /ceo|tell.*ceo|update.*ceo|what should i say/i,
    title: "What should I tell the CEO?",
    response: {
      collaborators: [
        { dept: "Analytics", action: "distilling the headline numbers", accent: A.analytics },
        { dept: "Brand", action: "shaping the executive narrative", accent: A.brand },
        { dept: "Operations", action: "pressure-testing the ask", accent: A.operations },
      ],
      blocks: [
        { type: "headline", text: "A three-sentence update your CEO will appreciate:" },
        {
          type: "callout",
          callout: {
            tone: "info",
            title: "CEO summary",
            body: "\"Marketing-sourced revenue is up 9% and beating plan, led by LinkedIn ABM and partnerships. We caught a Meta efficiency issue early and already fixed it, so CAC normalizes within two weeks. I want to move $150K toward our two best-returning channels for Q4 — I'll have the one-pager to you Monday.\"",
          },
        },
        {
          type: "bullets",
          items: [
            "Lead with the win (revenue +9%, beating plan).",
            "Show command of the risk (CAC caught early, already fixed).",
            "Make one clear, funded ask ($150K reallocation, not new budget).",
          ],
        },
        { type: "para", text: "This frames you as in control and forward-looking. I can expand it into a one-page pre-read if useful." },
      ],
      followups: ["Expand into a one-pager", "Make it more data-heavy", "Prepare for follow-up questions"],
    },
  },
];

const genericResponse: ExecResponse = {
  collaborators: [
    { dept: "Analytics", action: "gathering relevant data", accent: A.analytics },
    { dept: "Performance", action: "reviewing spend context", accent: A.performance },
    { dept: "Brand", action: "validating the narrative", accent: A.brand },
    { dept: "CRM", action: "checking lifecycle signals", accent: A.crm },
  ],
  blocks: [
    { type: "headline", text: "Here's my read, synthesized across the team." },
    {
      type: "para",
      text: "I convened the relevant departments and pulled the latest signals. Marketing is fundamentally healthy — revenue is beating plan at +9.1% — with one contained efficiency issue on Meta that Performance has already addressed.",
    },
    {
      type: "stats",
      stats: [
        { label: "Revenue", value: "$3.94M", delta: "+9.1%", sentiment: "good" },
        { label: "Pipeline", value: "$18.2M", delta: "−3.2%", sentiment: "bad" },
        { label: "ROAS", value: "4.9x", delta: "−5.1%", sentiment: "bad" },
        { label: "SQL", value: "486", delta: "+4.8%", sentiment: "good" },
      ],
    },
    {
      type: "para",
      text: "Ask me something specific — like 'why is CAC increasing?', 'where should I spend another $100K?', or 'prepare Monday's board meeting' — and I'll return a decision-ready answer.",
    },
  ],
  followups: ["Why is CAC increasing?", "Where should I spend another $100,000?", "Show my biggest marketing risks"],
};

export function resolveQuery(input: string): { title: string; response: ExecResponse } {
  const found = demos.find((d) => d.match.test(input));
  if (found) return { title: found.title, response: found.response };
  return { title: input, response: genericResponse };
}
