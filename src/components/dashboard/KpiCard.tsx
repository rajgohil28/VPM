"use client";

import { motion } from "framer-motion";
import { Sparkline } from "@/components/ui/motion-bits";
import type { Kpi } from "@/lib/metrics";
import { cn } from "@/lib/utils";

const sentimentColor: Record<string, string> = {
  good: "#4ade80",
  bad: "#f87171",
  neutral: "#7c8cf8",
};

export function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  const positive = kpi.delta >= 0;
  const tone =
    kpi.sentiment === "good"
      ? "text-healthy"
      : kpi.sentiment === "bad"
      ? "text-critical"
      : "text-ink-muted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="card card-hover group p-4"
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-ink-faint">{kpi.label}</span>
        <span className={cn("tabular text-[11px] font-semibold", tone)}>
          {positive ? "↑" : "↓"} {Math.abs(kpi.delta).toFixed(1)}%
        </span>
      </div>
      <div className="mt-2 flex items-end justify-between gap-2">
        <div className="text-2xl font-semibold tracking-tight text-ink tabular">{kpi.value}</div>
        <div className="opacity-80 transition-opacity group-hover:opacity-100">
          <Sparkline data={kpi.spark} color={sentimentColor[kpi.sentiment]} />
        </div>
      </div>
      {kpi.sub && <div className="mt-1 text-[11px] text-ink-ghost">{kpi.sub}</div>}
    </motion.div>
  );
}
