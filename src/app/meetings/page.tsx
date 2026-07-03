"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { PageHeader, Card, SectionTitle, Reveal } from "@/components/ui/primitives";
import { Boardroom } from "@/components/meetings/Boardroom";
import { upcomingMeetings } from "@/lib/meetings";

const kindTone: Record<string, string> = {
  Board: "text-accent",
  Executive: "text-thinking",
  Internal: "text-healthy",
  "Cross-functional": "text-warning",
};

export default function MeetingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Boardroom"
        title="Executive Meetings"
        description="Run a live marketing review where every department head reports and your VP delivers the decision."
      />

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <Boardroom />
        </Reveal>

        <Reveal delay={0.06}>
          <Card className="h-full">
            <SectionTitle action={<Icon name="Calendar" className="h-4 w-4 text-ink-faint" />}>
              Upcoming
            </SectionTitle>
            <div className="space-y-2">
              {upcomingMeetings.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-xl border border-line bg-base-800/40 p-3.5 transition-colors hover:border-line-strong"
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-base-750">
                    <Icon name="Video" className="h-4 w-4 text-ink-muted" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-ink">{m.title}</div>
                    <div className="text-xs text-ink-faint">{m.when} · {m.attendees} attending</div>
                  </div>
                  <span className={`chip ${kindTone[m.kind]}`}>{m.kind}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
