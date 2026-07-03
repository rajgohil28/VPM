"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { VpMark } from "@/components/ui/VpMark";
import { resolveBlueprint, type CampaignBlueprint } from "@/lib/campaigns";
import { cn } from "@/lib/utils";

type Run = { blueprint: CampaignBlueprint; mission: string };

export function Simulator() {
  const [input, setInput] = useState("");
  const [run, setRun] = useState<Run | null>(null);
  const [visible, setVisible] = useState(0); // number of steps revealed
  const [done, setDone] = useState(false);

  const launch = (raw: string) => {
    const mission = raw.trim() || "Launch an enterprise logistics campaign";
    const blueprint = resolveBlueprint(mission);
    setRun({ blueprint, mission });
    setVisible(0);
    setDone(false);
  };

  useEffect(() => {
    if (!run) return;
    const steps = run.blueprint.steps;
    if (visible >= steps.length) {
      const t = setTimeout(() => setDone(true), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible((v) => v + 1), run.blueprint.steps[visible]?.duration ?? 900);
    return () => clearTimeout(t);
  }, [run, visible]);

  const reset = () => {
    setRun(null);
    setVisible(0);
    setDone(false);
    setInput("");
  };

  if (!run) {
    return (
      <div className="card p-6">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-accent">
          <Icon name="Megaphone" className="h-4 w-4" /> Campaign Simulator
        </div>
        <h2 className="text-lg font-semibold text-ink">Describe a campaign. Watch the org build it.</h2>
        <p className="mt-1.5 text-sm text-ink-muted">
          Your VP will scope the mission and delegate across Research, Brand, Content, Creative,
          Performance and Analytics — end to end.
        </p>
        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-line-strong bg-base-850/80 p-2">
          <Icon name="Megaphone" className="ml-2 h-4 w-4 text-accent" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && launch(input)}
            placeholder="Launch an enterprise logistics campaign…"
            className="flex-1 bg-transparent py-2 text-sm text-ink placeholder:text-ink-ghost focus:outline-none"
          />
          <button
            onClick={() => launch(input)}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-fg transition-all hover:opacity-90"
          >
            Launch <Icon name="ArrowRight" className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Launch an enterprise logistics campaign", "Launch a fintech campaign"].map((s) => (
            <button
              key={s}
              onClick={() => launch(s)}
              className="rounded-full border border-line bg-base-850/50 px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const steps = run.blueprint.steps;
  const progress = Math.round((visible / steps.length) * 100);

  return (
    <div className="card overflow-hidden p-0">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line bg-base-800/40 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-fg">
            <Icon name={done ? "CircleCheck" : "Loader"} className={cn("h-4 w-4", !done && "animate-spin")} />
          </div>
          <div>
            <div className="text-sm font-semibold text-ink">{run.mission}</div>
            <div className="text-xs text-ink-faint">
              {run.blueprint.vertical} · {done ? "Campaign ready" : `Building… ${progress}%`}
            </div>
          </div>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          <Icon name="RotateCcw" className="h-3.5 w-3.5" /> New
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-base-800">
        <motion.div
          className="h-full bg-accent"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      {/* Steps */}
      <div className="relative space-y-2 p-5">
        <div className="absolute bottom-8 left-[35px] top-8 w-px bg-line" />
        {steps.map((step, i) => {
          const shown = i < visible;
          const active = i === visible - 1 && !done;
          return (
            <AnimatePresence key={step.id}>
              {shown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-3.5"
                >
                  <div className="relative z-10 mt-0.5">
                    <div
                      className="grid h-8 w-8 place-items-center rounded-xl border border-line bg-base-850"
                      style={{ boxShadow: `0 0 0 3px ${step.accent}14` }}
                    >
                      {active ? (
                        <Icon name="Loader" className="h-4 w-4 animate-spin" style={{ color: step.accent }} />
                      ) : (
                        <Icon name="Check" className="h-4 w-4" style={{ color: step.accent }} />
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold" style={{ color: step.accent }}>
                        {step.dept}
                      </span>
                      <span className="text-sm font-medium text-ink">{step.title}</span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ delay: 0.15, duration: 0.35 }}
                      className="mt-2 grid gap-1.5 overflow-hidden sm:grid-cols-3"
                    >
                      {step.deliverables.map((del) => (
                        <div key={del.label} className="surface p-2.5">
                          <div className="text-[10px] font-medium uppercase tracking-wide text-ink-ghost">
                            {del.label}
                          </div>
                          <div className="mt-0.5 text-xs leading-snug text-ink-muted">{del.detail}</div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Forecast / ready */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-line bg-gradient-to-br from-base-800/50 to-base-900 p-5"
          >
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-healthy">
              <Icon name="CircleCheck" className="h-4 w-4" /> Campaign ready to launch
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {run.blueprint.forecast.map((f) => (
                <div key={f.label} className="surface p-3.5 text-center">
                  <div className="text-lg font-semibold tabular text-ink">{f.value}</div>
                  <div className="mt-0.5 text-[11px] text-ink-faint">{f.label}</div>
                </div>
              ))}
            </div>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-fg transition-all hover:opacity-90">
              <Icon name="Megaphone" className="h-4 w-4" /> Approve & launch campaign
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
