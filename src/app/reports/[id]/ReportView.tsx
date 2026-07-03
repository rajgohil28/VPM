"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { getReport } from "@/lib/reports";
import { company, user } from "@/lib/company";
import { cn } from "@/lib/utils";

const sentiment: Record<string, string> = {
  good: "text-healthy",
  bad: "text-critical",
  neutral: "text-ink-muted",
};

const genSteps = ["Gathering data from 8 departments", "Synthesizing analysis", "Formatting document"];

export function ReportView({ id }: { id: string }) {
  const report = getReport(id);
  const [gen, setGen] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timers = genSteps.map((_, i) => setTimeout(() => setGen(i + 1), 400 + i * 550));
    timers.push(setTimeout(() => setReady(true), 400 + genSteps.length * 550));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!report) return notFound();

  if (!ready) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-line-strong bg-base-800 text-ink">
          <Icon name="Loader" className="h-6 w-6 animate-spin" />
        </div>
        <div className="text-sm font-semibold text-ink">Generating {report.title}…</div>
        <div className="mt-5 w-72 space-y-2">
          {genSteps.map((s, i) => (
            <div key={s} className="flex items-center gap-2.5 text-sm">
              <Icon
                name={i < gen ? "CircleCheck" : "Circle"}
                className={cn("h-4 w-4", i < gen ? "text-healthy" : "text-ink-ghost")}
              />
              <span className={i < gen ? "text-ink-muted" : "text-ink-ghost"}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex items-center justify-between">
        <Link
          href="/reports"
          className="inline-flex items-center gap-1.5 text-xs text-ink-faint transition-colors hover:text-ink-muted"
        >
          <Icon name="ArrowLeft" className="h-3.5 w-3.5" /> Report Center
        </Link>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink">
            <Icon name="Share2" className="h-3.5 w-3.5" /> Share
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-fg transition-all hover:opacity-90">
            <Icon name="Download" className="h-3.5 w-3.5" /> Export PDF
          </button>
        </div>
      </div>

      {/* Document */}
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card overflow-hidden p-0"
      >
        {/* Letterhead */}
        <div className="border-b border-line bg-base-800/40 px-8 py-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-xs font-bold tracking-tight text-primary-fg">
                N
              </div>
              <span className="text-sm font-semibold text-ink">{company.name}</span>
            </div>
            <span className="chip">{report.cadence}</span>
          </div>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink">{report.title}</h1>
          <p className="mt-1 text-sm text-ink-muted">{report.subtitle}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-ink-faint">
            <span>Prepared by VP of Marketing (AI)</span>
            <span>·</span>
            <span>For {user.firstName} {user.lastName}</span>
            <span>·</span>
            <span>{report.updated}</span>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8 px-8 py-8">
          {report.sections.map((sec, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                {sec.heading}
              </h2>
              {sec.body && <p className="text-[15px] leading-relaxed text-ink-muted">{sec.body}</p>}
              {sec.metrics && (
                <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {sec.metrics.map((m) => (
                    <div key={m.label} className="surface p-3.5">
                      <div className="text-[11px] text-ink-faint">{m.label}</div>
                      <div className="mt-1 flex items-end gap-2">
                        <span className="text-lg font-semibold tabular text-ink">{m.value}</span>
                        {m.delta && (
                          <span className={cn("tabular pb-0.5 text-xs font-semibold", sentiment[m.sentiment ?? "neutral"])}>
                            {m.delta}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {sec.bullets && (
                <ul className="mt-1 space-y-2">
                  {sec.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2.5 text-[15px] leading-relaxed text-ink-muted">
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        <div className="border-t border-line px-8 py-4 text-center text-[11px] text-ink-ghost">
          {company.fullName} · Confidential · Generated by VP Marketing AI
        </div>
      </motion.article>
    </div>
  );
}
