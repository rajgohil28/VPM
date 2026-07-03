"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { OrbitGlyph } from "@/components/ui/VpMark";
import { Card, SectionTitle, Reveal } from "@/components/ui/primitives";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import {
  RevenueTrendChart,
  FunnelChart,
  ChannelBars,
  ForecastChart,
} from "@/components/charts/Charts";
import { kpis, campaignHealth } from "@/lib/metrics";
import { morningBrief, recommendations } from "@/lib/activity";
import { user } from "@/lib/company";
import { cn } from "@/lib/utils";

const briefTone: Record<string, string> = {
  good: "text-healthy",
  bad: "text-critical",
  neutral: "text-ink-muted",
};

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Hero brief */}
      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-card border border-line bg-gradient-to-br from-base-850 to-base-900 p-7 shadow-card">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="relative">
              <div className="mb-1 flex items-center gap-2 text-xs font-medium text-ink-faint">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-thinking opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-thinking" />
                </span>
                Your VP prepared this briefing at 7:04 AM
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-gradient">
                {greeting()}, {user.firstName}.
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
                Here&apos;s where marketing stands this morning. I&apos;ve prepared{" "}
                <span className="font-medium text-ink">three recommendations</span> and flagged one
                efficiency issue that&apos;s already being handled.
              </p>

              <div className="mt-6 space-y-2.5">
                {morningBrief.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <Icon
                      name={line.sentiment === "good" ? "TrendingUp" : line.sentiment === "bad" ? "TrendingDown" : "Minus"}
                      className={cn("h-4 w-4 shrink-0", briefTone[line.sentiment])}
                    />
                    <span className="flex-1 text-ink-muted">{line.text}</span>
                    {line.metric && (
                      <span className={cn("tabular text-xs font-semibold", briefTone[line.sentiment])}>
                        {line.metric}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="/"
                  className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-fg transition-all hover:opacity-90"
                >
                  <Icon name="MessagesSquare" className="h-4 w-4" />
                  Ask a follow-up
                </Link>
                <Link
                  href="/reports/board"
                  className="flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  <Icon name="FileText" className="h-4 w-4" />
                  View board deck
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Pipeline forecast preview */}
        <Reveal delay={0.06}>
          <Card className="h-full">
            <SectionTitle
              action={<span className="chip text-healthy"><Icon name="Radar" className="h-3 w-3" />Live</span>}
            >
              Pipeline Forecast
            </SectionTitle>
            <div className="mb-3 flex items-baseline gap-3">
              <span className="text-2xl font-semibold tabular text-ink">$23.4M</span>
              <span className="tabular text-xs font-semibold text-healthy">↑ projected by Oct</span>
            </div>
            <ForecastChart />
          </Card>
        </Reveal>
      </div>

      {/* KPI grid */}
      <div>
        <SectionTitle action={<span className="text-xs text-ink-faint">Month to date · vs. prior period</span>}>
          Executive Scorecard
        </SectionTitle>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 xl:grid-cols-5">
          {kpis.map((kpi, i) => (
            <KpiCard key={kpi.id} kpi={kpi} index={i} />
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <Card>
            <SectionTitle
              action={
                <div className="flex items-center gap-3 text-xs text-ink-faint">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" />Revenue</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ink-ghost" />Target</span>
                </div>
              }
            >
              Revenue Trend
            </SectionTitle>
            <RevenueTrendChart />
          </Card>
        </Reveal>
        <Reveal delay={0.05}>
          <Card>
            <SectionTitle>Marketing Funnel</SectionTitle>
            <FunnelChart />
          </Card>
        </Reveal>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal>
          <Card>
            <SectionTitle action={<span className="text-xs text-ink-faint">ROAS by channel</span>}>
              Channel Performance
            </SectionTitle>
            <ChannelBars />
          </Card>
        </Reveal>
        <Reveal delay={0.05}>
          <Card>
            <SectionTitle action={<Link href="/campaigns" className="text-xs text-accent hover:underline">View all</Link>}>
              Campaign Health
            </SectionTitle>
            <div className="space-y-2.5">
              {campaignHealth.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      c.status === "healthy" ? "bg-healthy" : c.status === "warning" ? "bg-warning" : "bg-critical"
                    )}
                  />
                  <span className="flex-1 truncate text-sm text-ink-muted">{c.name}</span>
                  <span className="tabular text-xs font-semibold text-ink">{c.roas}x</span>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
        <Reveal delay={0.1}>
          <Card>
            <SectionTitle action={<Link href="/activity" className="text-xs text-accent hover:underline">View all</Link>}>
              Recent Agent Activity
            </SectionTitle>
            <ActivityFeed limit={5} compact />
          </Card>
        </Reveal>
      </div>

      {/* Recommendations */}
      <div>
        <SectionTitle
          action={
            <span className="chip text-accent">
              <OrbitGlyph size={12} />
              Prepared by your VP
            </span>
          }
        >
          Recommendations
        </SectionTitle>
        <div className="grid gap-4 lg:grid-cols-3">
          {recommendations.map((rec, i) => (
            <RecommendationCard key={rec.id} rec={rec} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
