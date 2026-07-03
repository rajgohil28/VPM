"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { VpMark } from "@/components/ui/VpMark";
import { ResponseBlockView } from "./ResponseBlocks";
import type { ExecResponse } from "@/lib/chat";

type Phase = "collab" | "synth" | "answer";

export function AssistantMessage({
  response,
  onFollowup,
  onDone,
  instant = false,
}: {
  response: ExecResponse;
  onFollowup: (q: string) => void;
  onDone?: () => void;
  instant?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>(instant ? "answer" : "collab");
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (instant) {
      onDone?.();
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Reveal collaborators one by one
    response.collaborators.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveStep(i + 1), 550 + i * 620));
    });
    const synthAt = 550 + response.collaborators.length * 620 + 300;
    timers.push(setTimeout(() => setPhase("synth"), synthAt));
    timers.push(
      setTimeout(() => {
        setPhase("answer");
        onDone?.();
      }, synthAt + 900)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-3.5">
      {/* VP avatar */}
      <VpMark size={36} rounded="rounded-xl" className="sticky top-2 self-start" />

      <div className="min-w-0 flex-1 space-y-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-ink">VP of Marketing</span>
          {phase !== "answer" && (
            <span className="flex items-center gap-1.5 text-xs text-thinking">
              <Icon name="Loader" className="h-3 w-3 animate-spin" />
              working
            </span>
          )}
        </div>

        {/* Collaboration trace */}
        {phase !== "answer" && (
          <div className="surface space-y-0.5 p-3">
            <div className="mb-1.5 px-1 text-[11px] font-medium uppercase tracking-wider text-ink-ghost">
              Convening the team
            </div>
            {response.collaborators.map((c, i) => {
              const shown = i < activeStep;
              const isActive = i === activeStep - 1 && phase === "collab";
              return (
                <AnimatePresence key={i}>
                  {shown && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2.5 rounded-lg px-1.5 py-1.5"
                    >
                      <span
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-md"
                        style={{ backgroundColor: `${c.accent}1f` }}
                      >
                        {isActive ? (
                          <Icon name="Loader" className="h-3 w-3 animate-spin" style={{ color: c.accent }} />
                        ) : (
                          <Icon name="Check" className="h-3 w-3" style={{ color: c.accent }} />
                        )}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: c.accent }}>
                        {c.dept}
                      </span>
                      <span className="truncate text-xs text-ink-faint">{c.action}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
            {phase === "synth" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2.5 px-1.5 py-1.5"
              >
                <span className="grid h-6 w-6 place-items-center rounded-md bg-accent-soft">
                  <Icon name="Loader" className="h-3 w-3 animate-spin text-accent" />
                </span>
                <span className="text-xs font-semibold text-accent">Synthesizing</span>
                <span className="text-xs text-ink-faint">generating executive recommendation…</span>
              </motion.div>
            )}
          </div>
        )}

        {/* Answer */}
        {phase === "answer" && (
          <div className="space-y-4">
            {response.blocks.map((block, i) => (
              <motion.div
                key={i}
                initial={instant ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: instant ? 0 : i * 0.12 }}
              >
                <ResponseBlockView block={block} />
              </motion.div>
            ))}

            {/* Followups */}
            <motion.div
              initial={instant ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: instant ? 0 : response.blocks.length * 0.12 + 0.1 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {response.followups.map((f) => (
                <button
                  key={f}
                  onClick={() => onFollowup(f)}
                  className="group flex items-center gap-1.5 rounded-full border border-line bg-base-850/60 px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  {f}
                  <Icon name="ArrowUpRight" className="h-3 w-3 text-ink-ghost transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                </button>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
