// ────────────────────────────────────────────────────────────────────────────
// The AI marketing organization: VP → department heads → subagents.
// ────────────────────────────────────────────────────────────────────────────

export type Health = "healthy" | "warning" | "critical";

export interface Subagent {
  name: string;
  role: string;
  status: "active" | "idle" | "running";
}

export interface Objective {
  label: string;
  progress: number; // 0-100
  target: string;
}

export interface DeptTask {
  title: string;
  owner: string;
  status: "in_progress" | "queued" | "done" | "blocked";
  eta: string;
}

export interface Decision {
  when: string;
  text: string;
  impact?: string;
}

export interface DeptKpi {
  label: string;
  value: string;
  delta: number;
}

export interface Department {
  id: string;
  name: string;
  head: string; // the AI head persona
  mandate: string;
  health: Health;
  score: number; // performance score 0-100
  icon: string; // lucide icon name
  accent: string;
  summary: string;
  kpis: DeptKpi[];
  objectives: Objective[];
  decisions: Decision[];
  tasks: DeptTask[];
  subagents: Subagent[];
  recommendations: string[];
}

export const departments: Department[] = [
  {
    id: "analytics",
    name: "Analytics",
    head: "Atlas",
    mandate: "Measurement, attribution, forecasting & anomaly detection across the funnel.",
    health: "warning",
    score: 88,
    icon: "LineChart",
    accent: "#60a5fa",
    summary:
      "Detected a statistically significant CAC increase (+14.2%) driven primarily by Meta. Revenue and SQL trends remain healthy. Recommending a budget reallocation to protect efficiency.",
    kpis: [
      { label: "Attribution coverage", value: "97.4%", delta: 0.6 },
      { label: "Forecast accuracy", value: "94.1%", delta: 1.2 },
      { label: "Anomalies flagged", value: "3", delta: 2 },
    ],
    objectives: [
      { label: "Ship multi-touch attribution v3", progress: 82, target: "Aug 15" },
      { label: "Reduce forecast error < 5%", progress: 68, target: "Q3" },
      { label: "Real-time anomaly alerting", progress: 45, target: "Q4" },
    ],
    decisions: [
      { when: "2h ago", text: "Flagged CAC anomaly on Meta cohort", impact: "High" },
      { when: "Yesterday", text: "Recalibrated pipeline forecast +6% for Q4" },
      { when: "2d ago", text: "Deprecated last-touch model in board reporting" },
    ],
    tasks: [
      { title: "Root-cause MQL decline", owner: "Atlas", status: "in_progress", eta: "Today" },
      { title: "Cohort retention refresh", owner: "Cohort agent", status: "queued", eta: "Tomorrow" },
      { title: "Q4 pipeline model rerun", owner: "Forecast agent", status: "done", eta: "—" },
    ],
    subagents: [
      { name: "Attribution", role: "Multi-touch modeling", status: "running" },
      { name: "Forecast", role: "Pipeline & revenue projection", status: "active" },
      { name: "Anomaly", role: "Statistical outlier detection", status: "running" },
      { name: "Cohort", role: "Retention & LTV analysis", status: "idle" },
    ],
    recommendations: [
      "Shift $40K from Meta prospecting to LinkedIn ABM to restore blended ROAS above 5.2x.",
      "Investigate MQL scoring threshold — a Jun 28 change likely over-filtered mid-funnel leads.",
    ],
  },
  {
    id: "performance",
    name: "Performance Marketing",
    head: "Vega",
    mandate: "Paid acquisition across Google, Meta, LinkedIn & TikTok. Budget & bid optimization.",
    health: "warning",
    score: 84,
    icon: "Target",
    accent: "#7c8cf8",
    summary:
      "Paused Meta Retargeting Campaign 12 after ROAS fell to 1.9x. Reallocated spend to LinkedIn ABM which is outperforming at 6.7x. Net efficiency protected without reducing pipeline.",
    kpis: [
      { label: "Blended ROAS", value: "4.9x", delta: -5.1 },
      { label: "Active campaigns", value: "23", delta: -1 },
      { label: "Budget pacing", value: "94%", delta: 3 },
    ],
    objectives: [
      { label: "Hold CAC under $1,200", progress: 54, target: "Q3" },
      { label: "Scale LinkedIn ABM to $250K/mo", progress: 74, target: "Sep" },
      { label: "Launch TikTok test", progress: 30, target: "Aug" },
    ],
    decisions: [
      { when: "1h ago", text: "Paused Meta Retargeting 12 (ROAS 1.9x)", impact: "High" },
      { when: "3h ago", text: "Raised LinkedIn ABM bids +8% on enterprise segment" },
      { when: "Yesterday", text: "Killed 4 underperforming Google ad groups" },
    ],
    tasks: [
      { title: "Reallocate $40K Meta → LinkedIn", owner: "Vega", status: "in_progress", eta: "Today" },
      { title: "New enterprise creative test", owner: "Bid agent", status: "queued", eta: "Aug 6" },
      { title: "TikTok pixel setup", owner: "Vega", status: "blocked", eta: "Pending legal" },
    ],
    subagents: [
      { name: "Google Ads", role: "Search & PMax", status: "active" },
      { name: "LinkedIn", role: "ABM & demand gen", status: "running" },
      { name: "Meta", role: "Prospecting & retargeting", status: "idle" },
      { name: "Bid Optimizer", role: "Automated bidding", status: "running" },
    ],
    recommendations: [
      "Consolidate 3 LinkedIn campaigns into a single ABM structure to improve learning phase efficiency.",
      "Sunset Meta retargeting for enterprise; reserve Meta for SMB self-serve only.",
    ],
  },
  {
    id: "content",
    name: "Content",
    head: "Lyra",
    mandate: "Blog, video, social & campaign messaging. Editorial calendar & narrative.",
    health: "healthy",
    score: 91,
    icon: "PenLine",
    accent: "#4ade80",
    summary:
      "Scheduled the Q3 'Freight Ops Playbook' webinar and shipped 6 pieces this week. The logistics ROI calculator is the top-converting asset at a 9.1% MQL rate.",
    kpis: [
      { label: "Assets shipped (mo)", value: "38", delta: 12 },
      { label: "Content-sourced MQL", value: "612", delta: 8.4 },
      { label: "Avg. engagement", value: "4.7%", delta: 1.1 },
    ],
    objectives: [
      { label: "Publish 12 pillar pages", progress: 66, target: "Q3" },
      { label: "Launch video series", progress: 40, target: "Sep" },
      { label: "Grow newsletter to 40K", progress: 78, target: "Q4" },
    ],
    decisions: [
      { when: "4h ago", text: "Scheduled Freight Ops webinar for Aug 14" },
      { when: "Yesterday", text: "Reprioritized enterprise case study ahead of blog" },
      { when: "2d ago", text: "Retired 3 underperforming top-of-funnel posts" },
    ],
    tasks: [
      { title: "Enterprise case study — Ryder", owner: "Lyra", status: "in_progress", eta: "Aug 8" },
      { title: "Webinar landing + email seq", owner: "Copy agent", status: "queued", eta: "Aug 5" },
      { title: "Q3 editorial calendar", owner: "Lyra", status: "done", eta: "—" },
    ],
    subagents: [
      { name: "Editorial", role: "Blog & long-form", status: "active" },
      { name: "Copy", role: "Ads, email, landing", status: "running" },
      { name: "Social", role: "LinkedIn & X", status: "active" },
      { name: "Video Script", role: "YouTube & webinar", status: "idle" },
    ],
    recommendations: [
      "Double down on ROI-calculator style interactive assets — highest MQL conversion in the library.",
      "Repurpose the webinar into a 5-part LinkedIn carousel series to extend reach.",
    ],
  },
  {
    id: "seo",
    name: "SEO",
    head: "Orion",
    mandate: "Organic growth, technical SEO, keyword strategy & competitor ranking intelligence.",
    health: "healthy",
    score: 93,
    icon: "Search",
    accent: "#38bdf8",
    summary:
      "Discovered a ranking opportunity on 'freight visibility software' (2,400 searches/mo) where we sit at #6. A single pillar page could capture ~$180K in annual pipeline.",
    kpis: [
      { label: "Organic traffic", value: "148K", delta: 9.2 },
      { label: "Keywords top 3", value: "312", delta: 24 },
      { label: "Domain rating", value: "71", delta: 2 },
    ],
    objectives: [
      { label: "Rank top-3 'freight software'", progress: 61, target: "Q4" },
      { label: "Fix Core Web Vitals", progress: 88, target: "Aug" },
      { label: "1,000 referring domains", progress: 72, target: "Q4" },
    ],
    decisions: [
      { when: "2h ago", text: "Prioritized 'freight visibility' pillar page" },
      { when: "Yesterday", text: "Requested 301 cleanup from web team" },
      { when: "3d ago", text: "Identified 14 competitor keyword gaps" },
    ],
    tasks: [
      { title: "Freight visibility pillar page", owner: "Orion", status: "in_progress", eta: "Aug 12" },
      { title: "Internal linking audit", owner: "Tech SEO", status: "queued", eta: "Aug 9" },
      { title: "Core Web Vitals fixes", owner: "Tech SEO", status: "done", eta: "—" },
    ],
    subagents: [
      { name: "Keyword", role: "Research & clustering", status: "active" },
      { name: "Technical", role: "Crawl & CWV", status: "running" },
      { name: "Competitor", role: "SERP monitoring", status: "active" },
      { name: "Backlink", role: "Link health", status: "idle" },
    ],
    recommendations: [
      "Build the 'freight visibility software' pillar page this sprint — highest ROI opportunity in the pipeline.",
      "Reclaim 8 lost featured snippets by refreshing 2023 comparison content.",
    ],
  },
  {
    id: "brand",
    name: "Brand",
    head: "Nova",
    mandate: "Positioning, messaging, visual identity & creative consistency across channels.",
    health: "healthy",
    score: 89,
    icon: "Sparkles",
    accent: "#a78bfa",
    summary:
      "Updated enterprise messaging to lead with 'freight visibility' after research showed a 22% higher resonance vs. 'supply chain platform'. Rolling out across ads and site this week.",
    kpis: [
      { label: "Brand consistency", value: "96%", delta: 3 },
      { label: "Aided awareness", value: "31%", delta: 4 },
      { label: "Message resonance", value: "+22%", delta: 22 },
    ],
    objectives: [
      { label: "Refresh enterprise narrative", progress: 84, target: "Aug" },
      { label: "New visual system v2", progress: 58, target: "Q4" },
      { label: "Grow share of voice", progress: 47, target: "Q4" },
    ],
    decisions: [
      { when: "5h ago", text: "Approved 'freight visibility' primary message" },
      { when: "Yesterday", text: "Standardized ad creative template system" },
      { when: "2d ago", text: "Rejected off-brand partner co-marketing asset" },
    ],
    tasks: [
      { title: "Enterprise messaging rollout", owner: "Nova", status: "in_progress", eta: "Aug 7" },
      { title: "Brand guideline v2 draft", owner: "Design agent", status: "queued", eta: "Aug 20" },
      { title: "Homepage hero refresh", owner: "Nova", status: "in_progress", eta: "Aug 10" },
    ],
    subagents: [
      { name: "Messaging", role: "Positioning & copy tone", status: "running" },
      { name: "Design", role: "Visual identity", status: "active" },
      { name: "Creative Review", role: "Brand QA", status: "active" },
      { name: "Guidelines", role: "Standards & assets", status: "idle" },
    ],
    recommendations: [
      "Update the LinkedIn ad library to the new enterprise narrative before scaling ABM spend.",
      "Commission a brand-lift study to quantify the messaging change over 60 days.",
    ],
  },
  {
    id: "crm",
    name: "CRM & Lifecycle",
    head: "Juno",
    mandate: "Lead scoring, segmentation, lifecycle automation, retention & winback.",
    health: "healthy",
    score: 90,
    icon: "Users",
    accent: "#f472b6",
    summary:
      "Launched a 5-touch enterprise nurture that lifted SQL conversion +18%. Customer health scoring flagged 6 at-risk logos now in a proactive winback sequence.",
    kpis: [
      { label: "Lead → SQL rate", value: "22.7%", delta: 3.1 },
      { label: "Email CTR", value: "3.9%", delta: 0.4 },
      { label: "Net revenue retention", value: "118%", delta: 2 },
    ],
    objectives: [
      { label: "Automate enterprise nurture", progress: 90, target: "Aug" },
      { label: "Cut churn to < 4%", progress: 62, target: "Q4" },
      { label: "Deploy predictive scoring", progress: 51, target: "Q4" },
    ],
    decisions: [
      { when: "3h ago", text: "Launched enterprise nurture sequence" },
      { when: "Yesterday", text: "Moved 6 accounts into winback flow" },
      { when: "2d ago", text: "Retuned lead-scoring model weights" },
    ],
    tasks: [
      { title: "Winback sequence for at-risk logos", owner: "Juno", status: "in_progress", eta: "Aug 6" },
      { title: "NPS survey wave 3", owner: "Lifecycle agent", status: "queued", eta: "Aug 11" },
      { title: "Lead-scoring recalibration", owner: "Juno", status: "done", eta: "—" },
    ],
    subagents: [
      { name: "Lead Scoring", role: "Fit & intent", status: "running" },
      { name: "Lifecycle", role: "Automation flows", status: "active" },
      { name: "Retention", role: "Churn & winback", status: "running" },
      { name: "Segmentation", role: "Audience builder", status: "idle" },
    ],
    recommendations: [
      "Add a product-usage signal to lead scoring — trials that hit the ‘first shipment tracked’ event convert 3x.",
      "Trigger the winback flow 30 days earlier based on the new health-score decay curve.",
    ],
  },
  {
    id: "research",
    name: "Research & Listening",
    head: "Echo",
    mandate: "Competitor intelligence, market trends, social listening, sentiment & news.",
    health: "warning",
    score: 86,
    icon: "Radar",
    accent: "#fbbf24",
    summary:
      "Competitor Freightline launched an aggressive 'AI dispatch' campaign this week. Sentiment is mixed (52% positive). Recommending a defensive comparison page and a fast-follow narrative.",
    kpis: [
      { label: "Share of voice", value: "24%", delta: -2 },
      { label: "Positive sentiment", value: "68%", delta: -3 },
      { label: "Mentions (wk)", value: "1,840", delta: 14 },
    ],
    objectives: [
      { label: "Weekly competitor briefings", progress: 95, target: "Ongoing" },
      { label: "Sentiment > 70%", progress: 68, target: "Q4" },
      { label: "10 partnership leads", progress: 40, target: "Q4" },
    ],
    decisions: [
      { when: "1h ago", text: "Flagged Freightline 'AI dispatch' launch", impact: "High" },
      { when: "Yesterday", text: "Compiled Q3 competitive teardown" },
      { when: "2d ago", text: "Identified 3 podcast partnership targets" },
    ],
    tasks: [
      { title: "Defensive comparison page brief", owner: "Echo", status: "in_progress", eta: "Today" },
      { title: "Sentiment deep-dive report", owner: "Listening agent", status: "queued", eta: "Aug 9" },
      { title: "Q3 competitive teardown", owner: "Echo", status: "done", eta: "—" },
    ],
    subagents: [
      { name: "Competitor", role: "Product & GTM tracking", status: "running" },
      { name: "Listening", role: "Social & forums", status: "active" },
      { name: "Sentiment", role: "NLP scoring", status: "running" },
      { name: "News", role: "Press & industry", status: "active" },
    ],
    recommendations: [
      "Ship a 'Northwind vs. Freightline' comparison page within 72 hours to intercept branded searches.",
      "Brief the sales team on Freightline's 'AI dispatch' claims with a two-page battlecard.",
    ],
  },
  {
    id: "operations",
    name: "Marketing Operations",
    head: "Sol",
    mandate: "Budget governance, martech stack, data hygiene, workflow & campaign QA.",
    health: "healthy",
    score: 92,
    icon: "Settings2",
    accent: "#94a3b8",
    summary:
      "Budget pacing is on-plan at 94% with $38K of unallocated Q3 reserve. Deduplicated 4,200 CRM records and closed 2 broken attribution handoffs between web and CRM.",
    kpis: [
      { label: "Budget utilized", value: "94%", delta: 3 },
      { label: "Data quality", value: "98.6%", delta: 0.9 },
      { label: "Reserve available", value: "$38K", delta: -12 },
    ],
    objectives: [
      { label: "Consolidate martech stack", progress: 70, target: "Q4" },
      { label: "Automate weekly reporting", progress: 88, target: "Aug" },
      { label: "99% data hygiene", progress: 92, target: "Q4" },
    ],
    decisions: [
      { when: "2h ago", text: "Approved $40K reallocation Meta → LinkedIn" },
      { when: "Yesterday", text: "Deduplicated 4,200 CRM records" },
      { when: "3d ago", text: "Retired 2 redundant SaaS tools ($1.8K/mo saved)" },
    ],
    tasks: [
      { title: "Q3 budget re-forecast", owner: "Sol", status: "in_progress", eta: "Aug 7" },
      { title: "Attribution handoff fix", owner: "Ops agent", status: "done", eta: "—" },
      { title: "Vendor consolidation review", owner: "Sol", status: "queued", eta: "Aug 15" },
    ],
    subagents: [
      { name: "Budget", role: "Governance & pacing", status: "running" },
      { name: "Martech", role: "Stack & integrations", status: "active" },
      { name: "Data Hygiene", role: "Dedup & enrichment", status: "active" },
      { name: "QA", role: "Campaign checks", status: "idle" },
    ],
    recommendations: [
      "Deploy the $38K Q3 reserve into SEO content production — highest marginal ROAS available.",
      "Sunset the second-source enrichment vendor; overlap is 91% with primary provider.",
    ],
  },
];

export function getDepartment(id: string) {
  return departments.find((d) => d.id === id);
}
