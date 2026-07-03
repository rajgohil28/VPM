"use client";

import { Icon } from "@/components/ui/icon";
import { PageHeader, Card, Reveal } from "@/components/ui/primitives";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { departments } from "@/lib/org";

export default function ActivityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Live"
        title="Agent Activity"
        description="A continuous, real-time record of every decision, detection and action taken across your marketing org."
        action={
          <span className="flex items-center gap-2 rounded-full border border-line bg-base-850/60 px-3 py-1.5 text-xs text-ink-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-healthy opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-healthy" />
            </span>
            Streaming live
          </span>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <Card>
            <ActivityFeed />
          </Card>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="space-y-4">
            <Card>
              <div className="mb-3 text-sm font-semibold text-ink">Activity by department</div>
              <div className="space-y-2.5">
                {departments.map((d) => (
                  <div key={d.id} className="flex items-center gap-3">
                    <Icon name={d.icon} className="h-4 w-4 shrink-0" style={{ color: d.accent }} />
                    <span className="flex-1 truncate text-sm text-ink-muted">{d.name}</span>
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-base-700">
                      <div className="h-full rounded-full" style={{ width: `${d.score}%`, backgroundColor: d.accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <div className="mb-1 text-sm font-semibold text-ink">Today at a glance</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  { label: "Decisions made", value: "47" },
                  { label: "Anomalies caught", value: "3" },
                  { label: "Assets created", value: "12" },
                  { label: "Budget moved", value: "$40K" },
                ].map((s) => (
                  <div key={s.label} className="surface p-3">
                    <div className="text-lg font-semibold tabular text-ink">{s.value}</div>
                    <div className="text-[11px] text-ink-faint">{s.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
