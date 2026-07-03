"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { PageHeader, Reveal } from "@/components/ui/primitives";
import { memoryCategories, playbooks } from "@/lib/memory";

export default function MemoryPage() {
  const [open, setOpen] = useState<string | null>("brand");

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Intelligence"
        title="Marketing Memory"
        description="Everything your VP knows about the business — brand, personas, competitors, history and hard-won learnings. This is the brain."
        action={
          <div className="hidden items-center gap-2 rounded-xl border border-line bg-base-850/60 px-3.5 py-2.5 sm:flex">
            <Icon name="Search" className="h-4 w-4 text-ink-faint" />
            <span className="text-sm text-ink-ghost">Search memory…</span>
          </div>
        }
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        {[
          { label: "Knowledge items", value: "161", icon: "Database" },
          { label: "Playbooks & SOPs", value: "6", icon: "BookOpen" },
          { label: "Experiments logged", value: "31", icon: "FlaskConical" },
          { label: "Campaigns archived", value: "47", icon: "Archive" },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.04}>
            <div className="card flex items-center gap-3 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-base-750">
                <Icon name={s.icon} className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-xl font-semibold tabular text-ink">{s.value}</div>
                <div className="text-xs text-ink-faint">{s.label}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Categories accordion */}
      <div className="grid gap-3">
        {memoryCategories.map((cat, i) => {
          const expanded = open === cat.id;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="card overflow-hidden p-0"
            >
              <button
                onClick={() => setOpen(expanded ? null : cat.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-overlay/[0.035]"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-base-750">
                  <Icon name={cat.icon} className="h-5 w-5 text-ink-muted" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold text-ink">{cat.title}</span>
                    <span className="rounded-md bg-base-750 px-1.5 py-0.5 text-[11px] font-medium text-ink-faint">
                      {cat.count}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ink-muted">{cat.description}</p>
                </div>
                <Icon
                  name="ChevronDown"
                  className={`h-4 w-4 shrink-0 text-ink-faint transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-2 border-t border-line px-5 py-4 sm:grid-cols-2">
                      {cat.items.map((item) => (
                        <div key={item.title} className="surface p-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium text-ink">{item.title}</span>
                            <span className="shrink-0 text-[11px] text-ink-ghost">{item.meta}</span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-ink-muted">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Playbooks */}
      <div>
        <h2 className="mb-4 text-sm font-semibold text-ink">Playbooks & SOPs</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {playbooks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <div className="card card-hover flex items-center gap-3 p-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-soft">
                  <Icon name="BookMarked" className="h-4 w-4 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">{p.title}</div>
                  <div className="text-xs text-ink-faint">{p.meta}</div>
                </div>
                <span className="chip shrink-0">{p.tag}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
