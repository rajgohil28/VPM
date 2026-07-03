// ────────────────────────────────────────────────────────────────────────────
// Marketing Memory: the brain of the AI — everything it knows about the business.
// ────────────────────────────────────────────────────────────────────────────

export interface MemoryCategory {
  id: string;
  title: string;
  icon: string;
  count: number;
  description: string;
  items: { title: string; meta: string; detail: string }[];
}

export const memoryCategories: MemoryCategory[] = [
  {
    id: "brand",
    title: "Brand Guidelines",
    icon: "Sparkles",
    count: 14,
    description: "Positioning, voice, visual identity and messaging standards.",
    items: [
      { title: "Positioning statement", meta: "Updated 3d ago", detail: "The real-time freight visibility platform for modern carriers." },
      { title: "Voice & tone", meta: "Stable", detail: "Operator-to-operator. Confident, precise, ROI-led. No jargon." },
      { title: "Primary message", meta: "Updated 5h ago", detail: "\"See every shipment. Cut detention. Ship on time.\"" },
      { title: "Color & type system", meta: "v2 in progress", detail: "Charcoal base, single indigo accent, Inter typeface." },
    ],
  },
  {
    id: "personas",
    title: "Personas",
    icon: "Users",
    count: 6,
    description: "Ideal customer profiles and buying committee roles.",
    items: [
      { title: "VP Operations (economic buyer)", meta: "Primary", detail: "Owns dispatch efficiency and detention costs. ROI-driven." },
      { title: "Head of Fleet", meta: "Champion", detail: "Feels the daily pain of poor visibility. Fast to advocate." },
      { title: "CFO", meta: "Approver", detail: "Cares about payback period and hard-dollar savings." },
      { title: "Dispatch Manager", meta: "User", detail: "Day-to-day operator; values speed and reliability." },
    ],
  },
  {
    id: "competitors",
    title: "Competitors",
    icon: "Radar",
    count: 4,
    description: "Competitive positioning, strengths and vulnerabilities.",
    items: [
      { title: "Freightline", meta: "High threat", detail: "Just launched 'AI dispatch.' Strong marketing, thinner product." },
      { title: "ShipLogic", meta: "Medium threat", detail: "Winning on price in SMB. Weak in enterprise." },
      { title: "CargoOS", meta: "Low threat", detail: "Legacy incumbent, declining momentum." },
    ],
  },
  {
    id: "campaigns",
    title: "Campaign History",
    icon: "History",
    count: 47,
    description: "Every campaign, its performance, and what we learned.",
    items: [
      { title: "Enterprise ABM — Q3", meta: "Live · 7.1x ROAS", detail: "Best-performing acquisition campaign this year." },
      { title: "Freight Ops Webinar Series", meta: "Live · 5.8x", detail: "Reliable mid-funnel demand engine." },
      { title: "Meta Retargeting 12", meta: "Paused · 1.9x", detail: "Creative fatigue after 6 weeks. Lesson: refresh at week 4." },
    ],
  },
  {
    id: "creatives",
    title: "Winning Creatives",
    icon: "Image",
    count: 23,
    description: "The highest-performing assets, ranked by conversion.",
    items: [
      { title: "ROI Calculator (interactive)", meta: "9.1% MQL rate", detail: "Top-converting asset in the library." },
      { title: "Ryder case study", meta: "6.4% MQL rate", detail: "Enterprise proof point; strong in ABM." },
      { title: "\"Detention costs\" LinkedIn ad", meta: "3.1% CTR", detail: "Best-performing paid creative concept." },
    ],
  },
  {
    id: "budgets",
    title: "Budgets",
    icon: "Wallet",
    count: 9,
    description: "Allocation, pacing and reserve across channels.",
    items: [
      { title: "Q3 total budget", meta: "$1.84M", detail: "94% utilized, $38K reserve available." },
      { title: "Channel split", meta: "Current", detail: "LinkedIn 30% · Google 25% · Meta 19% · Events 12% · Other 14%." },
      { title: "Reserve policy", meta: "Standard", detail: "Hold 5% for opportunistic reallocation." },
    ],
  },
  {
    id: "experiments",
    title: "Experiments",
    icon: "FlaskConical",
    count: 31,
    description: "Tests run, results, and statistical confidence.",
    items: [
      { title: "'Freight visibility' vs 'supply chain platform'", meta: "Winner · 95% conf.", detail: "New message resonates 22% stronger." },
      { title: "5-touch vs 3-touch nurture", meta: "Winner · 92% conf.", detail: "5-touch lifts SQL conversion +18%." },
      { title: "Long-form vs short LP", meta: "Inconclusive", detail: "No significant difference; keeping short." },
    ],
  },
  {
    id: "products",
    title: "Products",
    icon: "Package",
    count: 5,
    description: "Product lines, key features and value propositions.",
    items: [
      { title: "Visibility Cloud", meta: "Flagship", detail: "Real-time shipment tracking and ETA prediction." },
      { title: "Dispatch AI", meta: "Growth", detail: "Automated load matching and route optimization." },
      { title: "Detention Guard", meta: "New", detail: "Detention cost prevention and carrier scorecards." },
    ],
  },
  {
    id: "context",
    title: "Company Context",
    icon: "Building2",
    count: 12,
    description: "Business model, stage, goals and strategic constraints.",
    items: [
      { title: "Stage & ARR", meta: "Series B", detail: "$42.8M ARR, 340 employees, San Francisco HQ." },
      { title: "North-star goal", meta: "FY", detail: "Reach $60M ARR while holding CAC payback under 12 months." },
      { title: "Strategic bet", meta: "Active", detail: "Own the 'freight visibility' category before Freightline does." },
    ],
  },
];

export const playbooks = [
  { title: "Enterprise ABM Playbook", meta: "SOP · 12 steps", tag: "Acquisition" },
  { title: "Competitive Response Protocol", meta: "SOP · 6 steps", tag: "Defense" },
  { title: "Webinar-to-Pipeline Motion", meta: "Playbook", tag: "Demand Gen" },
  { title: "Creative Refresh Cadence", meta: "Playbook", tag: "Performance" },
  { title: "Board Reporting Standard", meta: "SOP", tag: "Executive" },
  { title: "Winback Sequence Design", meta: "Playbook", tag: "Lifecycle" },
];
