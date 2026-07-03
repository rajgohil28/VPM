"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { PageHeader } from "@/components/ui/primitives";
import { reports } from "@/lib/reports";

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Intelligence"
        title="Report Center"
        description="Board-ready documents, generated and kept current by your VP. Open one to review or export."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link href={`/reports/${r.id}`} className="card card-hover group flex h-full flex-col p-5">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft">
                  <Icon name={r.icon} className="h-5 w-5 text-accent" />
                </div>
                <span className="chip">{r.cadence}</span>
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-ink">{r.title}</h3>
              <p className="mt-1 flex-1 text-sm text-ink-muted">{r.subtitle}</p>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs text-ink-faint">
                <span className="flex items-center gap-1.5">
                  <Icon name="FileText" className="h-3.5 w-3.5" /> {r.pages} pages
                </span>
                <span className="flex items-center gap-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Open <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                </span>
              </div>
              <div className="mt-1 text-[11px] text-ink-ghost">{r.updated}</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
