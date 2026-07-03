"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { activityFeed } from "@/lib/activity";
import { cn } from "@/lib/utils";

const kindIcon: Record<string, string> = {
  detect: "ScanEye",
  action: "Zap",
  create: "Plus",
  optimize: "Sliders",
  alert: "TriangleAlert",
};

export function ActivityFeed({ limit, compact = false }: { limit?: number; compact?: boolean }) {
  const items = limit ? activityFeed.slice(0, limit) : activityFeed;
  return (
    <div className="relative">
      <div className="absolute bottom-2 left-[15px] top-2 w-px bg-line" />
      <div className="space-y-1">
        {items.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.035 }}
            className="group relative flex gap-3 rounded-lg px-1.5 py-2 transition-colors hover:bg-overlay/[0.035]"
          >
            <div className="relative z-10 mt-0.5">
              <div
                className="grid h-[30px] w-[30px] place-items-center rounded-full border border-line bg-base-850"
                style={{ boxShadow: `0 0 0 3px ${a.accent}12` }}
              >
                <Icon name={kindIcon[a.kind]} className="h-3.5 w-3.5" style={{ color: a.accent }} />
              </div>
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-semibold" style={{ color: a.accent }}>
                  {a.dept}
                </span>
                <span className="shrink-0 text-[11px] text-ink-ghost">{a.time}</span>
              </div>
              <p className={cn("mt-0.5 text-sm leading-snug text-ink-muted", compact && "text-[13px]")}>
                {a.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
