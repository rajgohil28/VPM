"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { VpMark } from "@/components/ui/VpMark";
import { PageHeader, Reveal } from "@/components/ui/primitives";
import { departments } from "@/lib/org";
import { cn } from "@/lib/utils";

const healthRing: Record<string, string> = {
  healthy: "border-healthy/30",
  warning: "border-warning/30",
  critical: "border-critical/30",
};
const healthDot: Record<string, string> = {
  healthy: "bg-healthy",
  warning: "bg-warning",
  critical: "bg-critical",
};

export default function OrganizationPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Organization"
        title="Your AI Marketing Org"
        description="One autonomous VP coordinating eight specialist departments and 32 agents. Every node is live and reporting."
        action={
          <Link
            href="/"
            className="hidden items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink sm:flex"
          >
            <Icon name="MessagesSquare" className="h-4 w-4 text-accent" />
            Brief the VP
          </Link>
        }
      />

      {/* VP node */}
      <div className="flex flex-col items-center">
        <Reveal>
          <div className="relative w-[320px] overflow-hidden rounded-card border border-line-strong bg-base-850 p-5 shadow-card">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <div className="relative flex items-center gap-3.5">
              <VpMark size={48} rounded="rounded-xl" />
              <div>
                <div className="text-sm font-semibold text-ink">VP of Marketing</div>
                <div className="text-xs text-ink-faint">Autonomous executive · Orchestrator</div>
              </div>
            </div>
            <div className="relative mt-4 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-healthy">
                <span className="h-1.5 w-1.5 rounded-full bg-healthy" /> All systems nominal
              </span>
              <span className="text-ink-faint">32 agents · 8 depts</span>
            </div>
          </div>
        </Reveal>

        {/* Connector */}
        <div className="h-8 w-px bg-gradient-to-b from-accent/40 to-line" />
        <div className="relative h-px w-[85%] max-w-4xl bg-line">
          <div className="absolute left-1/2 top-0 h-8 w-px -translate-y-8 bg-line" />
        </div>

        {/* Department grid */}
        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/departments/${d.id}`}
                className={cn(
                  "card card-hover group block h-full border p-4",
                  healthRing[d.health]
                )}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-xl"
                    style={{ backgroundColor: `${d.accent}1f` }}
                  >
                    <Icon name={d.icon} className="h-5 w-5" style={{ color: d.accent }} />
                  </div>
                  <span className={cn("mt-1 h-2 w-2 rounded-full", healthDot[d.health])} />
                </div>
                <div className="mt-3 text-sm font-semibold text-ink">{d.name}</div>
                <div className="text-xs text-ink-faint">Lead agent · {d.head}</div>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-muted">{d.mandate}</p>

                <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                  <div className="flex items-center gap-1.5 text-xs text-ink-faint">
                    <Icon name="Waypoints" className="h-3.5 w-3.5" />
                    {d.subagents.length} agents
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1 w-14 overflow-hidden rounded-full bg-base-700">
                      <div className="h-full rounded-full" style={{ width: `${d.score}%`, backgroundColor: d.accent }} />
                    </div>
                    <span className="tabular text-xs font-semibold text-ink">{d.score}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
