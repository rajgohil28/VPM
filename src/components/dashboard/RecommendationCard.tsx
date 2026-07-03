"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import type { Recommendation } from "@/lib/activity";
import { cn } from "@/lib/utils";

const priorityTone: Record<string, string> = {
  critical: "text-critical bg-critical/10 border-critical/20",
  high: "text-warning bg-warning/10 border-warning/20",
  medium: "text-thinking bg-thinking/10 border-thinking/20",
};

export function RecommendationCard({ rec, index }: { rec: Recommendation; index: number }) {
  const [state, setState] = useState<"idle" | "accepted" | "dismissed">("idle");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={cn(
        "card card-hover p-5 transition-opacity",
        state === "dismissed" && "pointer-events-none opacity-40"
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className={cn("chip border capitalize", priorityTone[rec.priority])}>
          <Icon name="Signal" className="h-3 w-3" />
          {rec.priority} priority
        </span>
        <div className="flex items-center gap-1.5 text-xs text-ink-faint">
          <Icon name="Gauge" className="h-3.5 w-3.5" />
          {rec.confidence}% confidence
        </div>
      </div>

      <h3 className="text-[15px] font-semibold leading-snug text-ink">{rec.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{rec.rationale}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="chip bg-healthy/10 text-healthy">
          <Icon name="TrendingUp" className="h-3 w-3" />
          {rec.impact}
        </span>
        <span className="chip">
          <Icon name="Timer" className="h-3 w-3" />
          {rec.effort} effort
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
        <div className="flex -space-x-1.5">
          {rec.depts.map((d) => (
            <div
              key={d}
              title={d}
              className="grid h-6 w-6 place-items-center rounded-full border border-base-850 bg-base-700 text-[9px] font-semibold text-ink-muted"
            >
              {d.slice(0, 2)}
            </div>
          ))}
        </div>
        <div className="flex-1" />
        {state === "idle" ? (
          <>
            <button
              onClick={() => setState("dismissed")}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-ink-faint transition-colors hover:text-ink-muted"
            >
              Dismiss
            </button>
            <button
              onClick={() => setState("accepted")}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-fg transition-all hover:opacity-90"
            >
              <Icon name="Check" className="h-3.5 w-3.5" />
              Approve
            </button>
          </>
        ) : (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-healthy">
            <Icon name="CheckCircle2" className="h-4 w-4" />
            Approved · delegated to team
          </span>
        )}
      </div>
    </motion.div>
  );
}
