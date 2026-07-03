"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { VpMark } from "@/components/ui/VpMark";
import { boardroom, vpSummary } from "@/lib/meetings";
import { cn } from "@/lib/utils";

const sentiment: Record<string, string> = {
  good: "text-healthy",
  bad: "text-critical",
  neutral: "text-ink-muted",
};

export function Boardroom() {
  const [playing, setPlaying] = useState(false);
  const [spoke, setSpoke] = useState(0); // number of speakers who've presented
  const total = boardroom.length;
  const finished = spoke > total;

  useEffect(() => {
    if (!playing) return;
    if (spoke > total) return;
    const t = setTimeout(() => setSpoke((s) => s + 1), spoke === 0 ? 400 : 1600);
    return () => clearTimeout(t);
  }, [playing, spoke, total]);

  const start = () => {
    setPlaying(true);
    setSpoke(0);
  };
  const skip = () => setSpoke(total + 1);

  if (!playing) {
    return (
      <div className="card relative overflow-hidden p-8 text-center">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <div className="relative">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-line-strong bg-base-800 text-ink">
            <Icon name="Presentation" className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold text-ink">Executive Marketing Review</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
            Your eight department heads will each present their update, then your VP will synthesize
            the room into a single decision.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={start}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-fg transition-all hover:opacity-90"
            >
              <Icon name="Play" className="h-4 w-4" /> Start the meeting
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center -space-x-2">
            {boardroom.map((s) => (
              <div
                key={s.deptId}
                title={s.role}
                className="grid h-8 w-8 place-items-center rounded-full border-2 border-base-850 text-[10px] font-bold text-white"
                style={{ backgroundColor: s.accent }}
              >
                {s.name.slice(0, 1)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Control bar */}
      <div className="flex items-center justify-between rounded-card border border-line bg-base-850/60 px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-critical opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-critical" />
          </span>
          <span className="font-medium text-ink">Meeting in session</span>
          <span className="text-ink-faint">· {Math.min(spoke, total)}/{total} presented</span>
        </div>
        <div className="flex items-center gap-2">
          {!finished && (
            <button
              onClick={skip}
              className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              Skip to summary
            </button>
          )}
          <button
            onClick={() => { setPlaying(false); setSpoke(0); }}
            className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            End
          </button>
        </div>
      </div>

      {/* Speakers */}
      <div className="grid gap-3">
        {boardroom.map((s, i) => {
          const shown = i < spoke;
          const isCurrent = i === spoke - 1 && !finished;
          return (
            <AnimatePresence key={s.deptId}>
              {shown && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "card p-5 transition-all",
                    isCurrent ? "border-line-strong shadow-lift" : "opacity-90"
                  )}
                  style={isCurrent ? { boxShadow: `0 0 0 1px ${s.accent}40, 0 16px 40px -16px ${s.accent}30` } : undefined}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-white"
                      style={{ backgroundColor: s.accent }}
                    >
                      {s.name.slice(0, 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="text-sm font-semibold text-ink">{s.name}</span>
                          <span className="ml-2 text-xs text-ink-faint">{s.role}</span>
                        </div>
                        <div className="text-right">
                          <div className={cn("tabular text-sm font-semibold", sentiment[s.metric.sentiment])}>
                            {s.metric.value}
                          </div>
                          <div className="text-[10px] text-ink-ghost">{s.metric.label}</div>
                        </div>
                      </div>
                      <p className="mt-1.5 text-sm font-medium text-ink-muted">
                        {isCurrent && <Icon name="AudioLines" className="mr-1.5 inline h-3.5 w-3.5 animate-pulse text-accent" />}
                        {s.headline}
                      </p>
                      <ul className="mt-3 grid gap-1.5 sm:grid-cols-3">
                        {s.points.map((p) => (
                          <li key={p} className="flex gap-2 text-xs leading-snug text-ink-muted">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: s.accent }} />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* VP summary */}
      <AnimatePresence>
        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-card border border-line-strong bg-base-850 p-6 shadow-card"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <VpMark size={44} rounded="rounded-xl" />
                <div>
                  <div className="text-sm font-semibold text-ink">{vpSummary.name}</div>
                  <div className="text-xs text-ink-faint">Closing synthesis</div>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gradient">{vpSummary.headline}</h3>
              <ul className="mt-3 space-y-2">
                {vpSummary.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                    <Icon name="Check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl border border-accent/20 bg-accent/[0.06] p-3.5">
                <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-accent">
                  <Icon name="Gavel" className="h-3.5 w-3.5" /> Decision
                </div>
                <p className="text-sm font-medium text-ink">{vpSummary.decision}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
