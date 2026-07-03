"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { notifications as seedNotifications } from "@/lib/activity";
import { cn } from "@/lib/utils";

const notifIcon: Record<string, string> = {
  recommendation: "Lightbulb",
  forecast: "TrendingUp",
  report: "FileText",
  risk: "TriangleAlert",
  competitor: "Radar",
};

const notifTone: Record<string, string> = {
  recommendation: "text-accent",
  forecast: "text-healthy",
  report: "text-thinking",
  risk: "text-warning",
  competitor: "text-critical",
};

export function Topbar() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(seedNotifications);
  const unread = notifs.filter((n) => n.unread).length;
  const bellControls = useAnimationControls();

  // Periodically jiggle the bell to signal new activity without a visible ticker.
  useEffect(() => {
    const jiggle = () => {
      bellControls.start({
        rotate: [0, -14, 11, -8, 5, -2, 0],
        transition: { duration: 0.6, ease: "easeInOut" },
      });
    };
    const first = setTimeout(jiggle, 4000);
    const interval = setInterval(jiggle, 9000);
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, [bellControls]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-line bg-base-900/70 px-4 backdrop-blur-xl sm:px-6">
      {/* Live status */}
      <div className="flex items-center gap-2 rounded-full border border-line bg-base-850/80 px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-healthy opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-healthy" />
        </span>
        <span className="text-xs font-medium text-ink-muted">
          <span className="hidden sm:inline">8 departments · </span>32 agents active
        </span>
      </div>

      <div className="flex-1" />

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative grid h-9 w-9 place-items-center rounded-xl border border-line bg-base-850/60 text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          <motion.span animate={bellControls} className="grid place-items-center">
            <Icon name="Bell" className="h-[18px] w-[18px]" />
          </motion.span>
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </button>

        <AnimatePresence>
          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-12 z-50 w-[360px] overflow-hidden rounded-card border border-line-strong bg-base-850/95 shadow-lift backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <span className="text-sm font-semibold text-ink">Notifications</span>
                  <button
                    onClick={() => setNotifs((ns) => ns.map((n) => ({ ...n, unread: false })))}
                    className="text-xs text-ink-faint transition-colors hover:text-ink-muted"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-[400px] divide-y divide-line overflow-y-auto">
                  {notifs.map((n) => (
                    <div
                      key={n.id}
                      className={cn(
                        "flex gap-3 px-4 py-3 transition-colors hover:bg-overlay/[0.035]",
                        n.unread && "bg-overlay/[0.025]"
                      )}
                    >
                      <div className="mt-0.5">
                        <Icon
                          name={notifIcon[n.kind]}
                          className={cn("h-4 w-4", notifTone[n.kind])}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-ink">{n.title}</span>
                          {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{n.body}</p>
                      </div>
                      <span className="shrink-0 text-[11px] text-ink-ghost">{n.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
