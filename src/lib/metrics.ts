// ────────────────────────────────────────────────────────────────────────────
// KPIs, time-series, funnel, channel & forecast data — the analytical substrate.
// ────────────────────────────────────────────────────────────────────────────

export type Trend = "up" | "down" | "flat";
export type Sentiment = "good" | "bad" | "neutral";

export interface Kpi {
  id: string;
  label: string;
  value: string;
  raw: number;
  delta: number; // percent change vs prior period
  trend: Trend;
  sentiment: Sentiment;
  spark: number[];
  sub?: string;
}

// A delta being "good" or "bad" depends on the metric — CAC up is bad, revenue up is good.
export const kpis: Kpi[] = [
  {
    id: "revenue",
    label: "Revenue",
    value: "$3.94M",
    raw: 3_940_000,
    delta: 9.1,
    trend: "up",
    sentiment: "good",
    sub: "Marketing-sourced, MTD",
    spark: [2.9, 3.0, 3.1, 3.0, 3.3, 3.5, 3.4, 3.7, 3.94],
  },
  {
    id: "spend",
    label: "Marketing Spend",
    value: "$612K",
    raw: 612_000,
    delta: 6.4,
    trend: "up",
    sentiment: "neutral",
    sub: "Blended, MTD",
    spark: [540, 552, 560, 575, 568, 590, 601, 605, 612],
  },
  {
    id: "pipeline",
    label: "Pipeline",
    value: "$18.2M",
    raw: 18_200_000,
    delta: -3.2,
    trend: "down",
    sentiment: "bad",
    sub: "Open, marketing-influenced",
    spark: [19.1, 19.4, 19.0, 18.8, 18.9, 18.6, 18.4, 18.1, 18.2],
  },
  {
    id: "sql",
    label: "SQL",
    value: "486",
    raw: 486,
    delta: 4.8,
    trend: "up",
    sentiment: "good",
    sub: "Sales-qualified, MTD",
    spark: [402, 418, 431, 440, 452, 461, 470, 478, 486],
  },
  {
    id: "mql",
    label: "MQL",
    value: "2,140",
    raw: 2140,
    delta: -7.4,
    trend: "down",
    sentiment: "bad",
    sub: "Marketing-qualified, MTD",
    spark: [2480, 2440, 2390, 2360, 2310, 2280, 2220, 2180, 2140],
  },
  {
    id: "cac",
    label: "CAC",
    value: "$1,284",
    raw: 1284,
    delta: 14.2,
    trend: "up",
    sentiment: "bad",
    sub: "Blended, trailing 30d",
    spark: [1050, 1080, 1110, 1120, 1160, 1190, 1220, 1255, 1284],
  },
  {
    id: "roas",
    label: "ROAS",
    value: "4.9x",
    raw: 4.9,
    delta: -5.1,
    trend: "down",
    sentiment: "bad",
    sub: "Blended paid",
    spark: [5.6, 5.5, 5.4, 5.3, 5.2, 5.1, 5.0, 5.0, 4.9],
  },
  {
    id: "conversion",
    label: "Conversion",
    value: "3.42%",
    raw: 3.42,
    delta: 2.1,
    trend: "up",
    sentiment: "good",
    sub: "Visit → MQL",
    spark: [3.1, 3.15, 3.2, 3.22, 3.28, 3.3, 3.36, 3.4, 3.42],
  },
  {
    id: "visitors",
    label: "Website Visitors",
    value: "412K",
    raw: 412_000,
    delta: 11.3,
    trend: "up",
    sentiment: "good",
    sub: "Unique, MTD",
    spark: [340, 352, 361, 372, 380, 391, 398, 405, 412],
  },
];

export interface RevenuePoint {
  month: string;
  revenue: number;
  target: number;
  spend: number;
}

export const revenueTrend: RevenuePoint[] = [
  { month: "Jan", revenue: 2.71, target: 2.6, spend: 0.49 },
  { month: "Feb", revenue: 2.83, target: 2.8, spend: 0.51 },
  { month: "Mar", revenue: 3.02, target: 2.95, spend: 0.53 },
  { month: "Apr", revenue: 2.98, target: 3.1, spend: 0.54 },
  { month: "May", revenue: 3.31, target: 3.2, spend: 0.55 },
  { month: "Jun", revenue: 3.52, target: 3.4, spend: 0.58 },
  { month: "Jul", revenue: 3.94, target: 3.7, spend: 0.61 },
];

export interface FunnelStage {
  stage: string;
  value: number;
  rate: string;
}

export const funnel: FunnelStage[] = [
  { stage: "Visitors", value: 412000, rate: "100%" },
  { stage: "Leads", value: 14100, rate: "3.42%" },
  { stage: "MQL", value: 2140, rate: "15.2%" },
  { stage: "SQL", value: 486, rate: "22.7%" },
  { stage: "Opportunities", value: 214, rate: "44.0%" },
  { stage: "Customers", value: 61, rate: "28.5%" },
];

export interface Channel {
  name: string;
  spend: number;
  revenue: number;
  roas: number;
  delta: number;
  color: string;
}

export const channels: Channel[] = [
  { name: "LinkedIn Ads", spend: 184000, revenue: 1_240_000, roas: 6.7, delta: 12.4, color: "#7c8cf8" },
  { name: "Google Ads", spend: 156000, revenue: 842_000, roas: 5.4, delta: 3.1, color: "#4ade80" },
  { name: "Organic / SEO", spend: 62000, revenue: 731_000, roas: 11.8, delta: 8.9, color: "#38bdf8" },
  { name: "Meta Ads", spend: 118000, revenue: 402_000, roas: 3.4, delta: -9.2, color: "#fbbf24" },
  { name: "Events / Field", spend: 74000, revenue: 388_000, roas: 5.2, delta: 1.4, color: "#f472b6" },
  { name: "Partnerships", spend: 18000, revenue: 337_000, roas: 18.7, delta: 22.0, color: "#a78bfa" },
];

export interface ChannelPerfPoint {
  week: string;
  linkedin: number;
  meta: number;
  google: number;
}

export const channelPerformance: ChannelPerfPoint[] = [
  { week: "W1", linkedin: 5.9, meta: 4.1, google: 5.1 },
  { week: "W2", linkedin: 6.1, meta: 3.9, google: 5.2 },
  { week: "W3", linkedin: 6.4, meta: 3.7, google: 5.3 },
  { week: "W4", linkedin: 6.3, meta: 3.6, google: 5.4 },
  { week: "W5", linkedin: 6.6, meta: 3.4, google: 5.4 },
  { week: "W6", linkedin: 6.7, meta: 3.4, google: 5.4 },
];

export interface ForecastPoint {
  month: string;
  actual: number | null;
  forecast: number;
  low: number;
  high: number;
}

export const pipelineForecast: ForecastPoint[] = [
  { month: "Apr", actual: 14.6, forecast: 14.6, low: 14.6, high: 14.6 },
  { month: "May", actual: 16.1, forecast: 16.1, low: 16.1, high: 16.1 },
  { month: "Jun", actual: 17.4, forecast: 17.4, low: 17.4, high: 17.4 },
  { month: "Jul", actual: 18.2, forecast: 18.2, low: 18.2, high: 18.2 },
  { month: "Aug", actual: null, forecast: 19.6, low: 18.9, high: 20.4 },
  { month: "Sep", actual: null, forecast: 21.3, low: 20.1, high: 22.7 },
  { month: "Oct", actual: null, forecast: 23.4, low: 21.6, high: 25.5 },
];

export interface CampaignHealth {
  name: string;
  status: "healthy" | "warning" | "critical";
  roas: number;
  pacing: number; // % of budget consumed vs plan
  spend: number;
}

export const campaignHealth: CampaignHealth[] = [
  { name: "Enterprise ABM — Q3", status: "healthy", roas: 7.1, pacing: 96, spend: 142000 },
  { name: "Freight Ops Webinar Series", status: "healthy", roas: 5.8, pacing: 88, spend: 61000 },
  { name: "Meta Retargeting 12", status: "critical", roas: 1.9, pacing: 134, spend: 48000 },
  { name: "SMB Self-Serve Trial", status: "warning", roas: 3.2, pacing: 71, spend: 39000 },
  { name: "Partner Co-Marketing", status: "healthy", roas: 12.4, pacing: 82, spend: 18000 },
];
