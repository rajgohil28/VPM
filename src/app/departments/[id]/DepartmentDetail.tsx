"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { OrbitGlyph } from "@/components/ui/VpMark";
import { Card, SectionTitle, StatusBadge, Reveal } from "@/components/ui/primitives";
import { getDepartment } from "@/lib/org";
import { cn } from "@/lib/utils";

const taskStatus: Record<string, { label: string; tone: string; icon: string }> = {
  in_progress: { label: "In progress", tone: "text-thinking", icon: "Loader" },
  queued: { label: "Queued", tone: "text-ink-faint", icon: "Clock" },
  done: { label: "Done", tone: "text-healthy", icon: "Check" },
  blocked: { label: "Blocked", tone: "text-critical", icon: "Ban" },
};

const agentStatus: Record<string, string> = {
  running: "bg-thinking",
  active: "bg-healthy",
  idle: "bg-ink-ghost",
};

export function DepartmentDetail({ id }: { id: string }) {
  const d = getDepartment(id);
  if (!d) return notFound();

  return (
    <div className="space-y-6">
      {/* Breadcrumb + header */}
      <div>
        <Link
          href="/departments"
          className="mb-4 inline-flex items-center gap-1.5 text-xs text-ink-faint transition-colors hover:text-ink-muted"
        >
          <Icon name="ArrowLeft" className="h-3.5 w-3.5" /> All departments
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="grid h-14 w-14 place-items-center rounded-2xl"
              style={{ backgroundColor: `${d.accent}1f` }}
            >
              <Icon name={d.icon} className="h-7 w-7" style={{ color: d.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight text-ink">{d.name}</h1>
                <StatusBadge status={d.health} />
              </div>
              <p className="mt-1 text-sm text-ink-muted">
                Lead agent <span className="font-medium text-ink">{d.head}</span> · {d.mandate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-line bg-base-850/60 px-5 py-3">
            <div className="text-center">
              <div className="text-2xl font-semibold tabular text-ink">{d.score}</div>
              <div className="text-[10px] uppercase tracking-wide text-ink-faint">Perf. Score</div>
            </div>
            <div className="h-8 w-px bg-line" />
            <div className="text-center">
              <div className="text-2xl font-semibold tabular text-ink">{d.subagents.length}</div>
              <div className="text-[10px] uppercase tracking-wide text-ink-faint">Agents</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary callout */}
      <Reveal>
        <div className="relative overflow-hidden rounded-card border border-line bg-base-850 p-5">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-accent">
            <OrbitGlyph size={14} /> Current read from {d.head}
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">{d.summary}</p>
        </div>
      </Reveal>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3.5">
        {d.kpis.map((k, i) => (
          <Reveal key={k.label} delay={i * 0.04}>
            <Card className="p-4">
              <div className="text-xs text-ink-faint">{k.label}</div>
              <div className="mt-1.5 flex items-end justify-between">
                <span className="text-xl font-semibold tabular text-ink">{k.value}</span>
                <span className={cn("tabular text-xs font-semibold", k.delta >= 0 ? "text-healthy" : "text-critical")}>
                  {k.delta >= 0 ? "↑" : "↓"} {Math.abs(k.delta)}
                </span>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-5 lg:col-span-2">
          {/* Objectives */}
          <Card>
            <SectionTitle>Objectives</SectionTitle>
            <div className="space-y-4">
              {d.objectives.map((o) => (
                <div key={o.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-ink-muted">{o.label}</span>
                    <span className="text-xs text-ink-faint">
                      {o.progress}% · {o.target}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-base-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${o.progress}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: d.accent }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Open tasks */}
          <Card>
            <SectionTitle action={<span className="text-xs text-ink-faint">{d.tasks.length} total</span>}>
              Open Tasks
            </SectionTitle>
            <div className="space-y-1">
              {d.tasks.map((t) => {
                const s = taskStatus[t.status];
                return (
                  <div key={t.title} className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-overlay/[0.035]">
                    <Icon name={s.icon} className={cn("h-4 w-4 shrink-0", s.tone, t.status === "in_progress" && "animate-spin")} />
                    <span className="flex-1 text-sm text-ink-muted">{t.title}</span>
                    <span className="text-xs text-ink-faint">{t.owner}</span>
                    <span className={cn("w-24 text-right text-xs font-medium", s.tone)}>{s.label}</span>
                    <span className="w-16 text-right text-xs text-ink-ghost">{t.eta}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Recommendations */}
          <Card>
            <SectionTitle>
              <span className="flex items-center gap-2">
                <Icon name="Lightbulb" className="h-4 w-4 text-accent" /> Recommendations
              </span>
            </SectionTitle>
            <div className="space-y-2.5">
              {d.recommendations.map((r, i) => (
                <div key={i} className="flex gap-3 rounded-xl border border-line bg-base-800/40 p-3.5">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-accent-soft text-[11px] font-semibold text-accent">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-ink-muted">{r}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Subagents */}
          <Card>
            <SectionTitle>Subagents</SectionTitle>
            <div className="space-y-1">
              {d.subagents.map((a) => (
                <div key={a.name} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-overlay/[0.035]">
                  <span className="relative flex h-2 w-2">
                    {a.status === "running" && (
                      <span className={cn("absolute inline-flex h-full w-full animate-pulse-ring rounded-full", agentStatus[a.status])} />
                    )}
                    <span className={cn("relative inline-flex h-2 w-2 rounded-full", agentStatus[a.status])} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-ink">{a.name}</div>
                    <div className="truncate text-xs text-ink-faint">{a.role}</div>
                  </div>
                  <span className="text-[11px] capitalize text-ink-ghost">{a.status}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent decisions / timeline */}
          <Card>
            <SectionTitle>Recent Decisions</SectionTitle>
            <div className="relative space-y-4">
              <div className="absolute bottom-1 left-[5px] top-1 w-px bg-line" />
              {d.decisions.map((dec, i) => (
                <div key={i} className="relative flex gap-3 pl-0">
                  <span
                    className="relative z-10 mt-1 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-base-850"
                    style={{ backgroundColor: d.accent }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-ink-ghost">{dec.when}</span>
                      {dec.impact && (
                        <span className="rounded bg-warning/10 px-1.5 py-0.5 text-[10px] font-medium text-warning">
                          {dec.impact} impact
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-ink-muted">{dec.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-card border border-line bg-base-850/60 py-3 text-sm font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            <Icon name="MessagesSquare" className="h-4 w-4 text-accent" />
            Ask {d.head} a question
          </Link>
        </div>
      </div>
    </div>
  );
}
