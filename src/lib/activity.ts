// ────────────────────────────────────────────────────────────────────────────
// The always-alive layer: agent activity feed, briefing, recommendations, alerts.
// ────────────────────────────────────────────────────────────────────────────

export interface Activity {
  id: string;
  dept: string;
  deptId: string;
  text: string;
  time: string;
  kind: "detect" | "action" | "create" | "optimize" | "alert";
  accent: string;
}

export const activityFeed: Activity[] = [
  { id: "a1", dept: "Analytics", deptId: "analytics", text: "Detected unusual CAC increase on Meta cohort (+14.2%)", time: "2m ago", kind: "detect", accent: "#60a5fa" },
  { id: "a2", dept: "Performance", deptId: "performance", text: "Paused Meta Retargeting Campaign 12 — ROAS fell to 1.9x", time: "9m ago", kind: "action", accent: "#7c8cf8" },
  { id: "a3", dept: "Content", deptId: "content", text: "Scheduled 'Freight Ops Playbook' webinar for Aug 14", time: "18m ago", kind: "create", accent: "#4ade80" },
  { id: "a4", dept: "Brand", deptId: "brand", text: "Updated enterprise messaging to lead with 'freight visibility'", time: "34m ago", kind: "action", accent: "#a78bfa" },
  { id: "a5", dept: "SEO", deptId: "seo", text: "Found ranking opportunity: 'freight visibility software' (#6 → top-3)", time: "51m ago", kind: "detect", accent: "#38bdf8" },
  { id: "a6", dept: "Performance", deptId: "performance", text: "Reallocated $40K from Meta to LinkedIn ABM", time: "1h ago", kind: "optimize", accent: "#7c8cf8" },
  { id: "a7", dept: "CRM", deptId: "crm", text: "Launched 5-touch enterprise nurture sequence", time: "1h ago", kind: "create", accent: "#f472b6" },
  { id: "a8", dept: "Research", deptId: "research", text: "Competitor Freightline launched 'AI dispatch' campaign", time: "2h ago", kind: "alert", accent: "#fbbf24" },
  { id: "a9", dept: "Content", deptId: "content", text: "Enterprise case study (Ryder) drafted and sent for review", time: "2h ago", kind: "create", accent: "#4ade80" },
  { id: "a10", dept: "Operations", deptId: "operations", text: "Deduplicated 4,200 CRM records — data quality now 98.6%", time: "3h ago", kind: "optimize", accent: "#94a3b8" },
  { id: "a11", dept: "Analytics", deptId: "analytics", text: "Recalibrated Q4 pipeline forecast (+6%)", time: "4h ago", kind: "action", accent: "#60a5fa" },
  { id: "a12", dept: "SEO", deptId: "seo", text: "Core Web Vitals fixes deployed — LCP improved 0.8s", time: "5h ago", kind: "optimize", accent: "#38bdf8" },
];

export interface BriefLine {
  text: string;
  sentiment: "good" | "bad" | "neutral";
  metric?: string;
}

export const morningBrief: BriefLine[] = [
  { text: "Marketing-sourced revenue increased", sentiment: "good", metric: "+9.1%" },
  { text: "Blended CAC rose, driven by Meta", sentiment: "bad", metric: "+14.2%" },
  { text: "Pipeline slowed in Europe", sentiment: "bad", metric: "−3.2%" },
  { text: "LinkedIn continues to outperform Meta", sentiment: "good", metric: "6.7x ROAS" },
  { text: "MQL volume declined — under investigation", sentiment: "bad", metric: "−7.4%" },
];

export interface Recommendation {
  id: string;
  title: string;
  rationale: string;
  impact: string;
  confidence: number;
  effort: "Low" | "Medium" | "High";
  depts: string[];
  priority: "critical" | "high" | "medium";
}

export const recommendations: Recommendation[] = [
  {
    id: "r1",
    title: "Reallocate $40K from Meta retargeting to LinkedIn ABM",
    rationale:
      "Meta retargeting ROAS has fallen to 1.9x while LinkedIn ABM sustains 6.7x on the enterprise segment. Shifting spend protects blended efficiency without reducing pipeline.",
    impact: "+$210K pipeline · restore ROAS to 5.2x",
    confidence: 92,
    effort: "Low",
    depts: ["Performance", "Analytics", "Operations"],
    priority: "critical",
  },
  {
    id: "r2",
    title: "Ship 'freight visibility software' pillar page this sprint",
    rationale:
      "A 2,400/mo search term where we rank #6. Content and SEO agree a single pillar page plus internal linking can reach top-3 within 60 days.",
    impact: "+$180K annual pipeline · +14K organic visits",
    confidence: 84,
    effort: "Medium",
    depts: ["SEO", "Content"],
    priority: "high",
  },
  {
    id: "r3",
    title: "Launch defensive comparison page vs. Freightline",
    rationale:
      "Freightline's 'AI dispatch' campaign is intercepting branded searches. A comparison page plus a sales battlecard neutralizes the threat within a week.",
    impact: "Protect ~8% of branded demand",
    confidence: 78,
    effort: "Low",
    depts: ["Research", "Content", "Brand"],
    priority: "high",
  },
];

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: "recommendation" | "forecast" | "report" | "risk" | "competitor";
  unread: boolean;
}

export const notifications: Notification[] = [
  { id: "n1", title: "AI Recommendation Ready", body: "Reallocate $40K Meta → LinkedIn to restore ROAS.", time: "2m", kind: "recommendation", unread: true },
  { id: "n2", title: "Budget Risk Detected", body: "Meta Retargeting 12 pacing at 134% with ROAS 1.9x.", time: "9m", kind: "risk", unread: true },
  { id: "n3", title: "Competitor Launched Campaign", body: "Freightline debuted an 'AI dispatch' push.", time: "2h", kind: "competitor", unread: true },
  { id: "n4", title: "Campaign Forecast Updated", body: "Enterprise ABM projected to beat target by 11%.", time: "4h", kind: "forecast", unread: false },
  { id: "n5", title: "Board Report Generated", body: "July board deck is ready for your review.", time: "6h", kind: "report", unread: false },
];
