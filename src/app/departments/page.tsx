"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { PageHeader, StatusBadge } from "@/components/ui/primitives";
import { departments } from "@/lib/org";

export default function DepartmentsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Organization"
        title="Departments"
        description="Each department is a mini operating system — objectives, live decisions, subagents and a performance score."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {departments.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <Link href={`/departments/${d.id}`} className="card card-hover group block p-5">
              <div className="flex items-start gap-4">
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                  style={{ backgroundColor: `${d.accent}1f` }}
                >
                  <Icon name={d.icon} className="h-5 w-5" style={{ color: d.accent }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[15px] font-semibold text-ink">{d.name}</h3>
                    <StatusBadge status={d.health} />
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">{d.summary}</p>

                  <div className="mt-4 flex items-center gap-4 text-xs text-ink-faint">
                    <span className="flex items-center gap-1.5">
                      <Icon name="Gauge" className="h-3.5 w-3.5" /> Score {d.score}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="Waypoints" className="h-3.5 w-3.5" /> {d.subagents.length} agents
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="ListTodo" className="h-3.5 w-3.5" />
                      {d.tasks.filter((t) => t.status === "in_progress").length} active tasks
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      Open <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
