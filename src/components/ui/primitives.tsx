"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Card({
  className,
  children,
  hover = false,
}: {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}) {
  return (
    <div className={cn("card p-5", hover && "card-hover", className)}>{children}</div>
  );
}

export function SectionTitle({
  children,
  className,
  action,
}: {
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div className={cn("mb-4 flex items-center justify-between", className)}>
      <h2 className="text-sm font-semibold tracking-tight text-ink">{children}</h2>
      {action}
    </div>
  );
}

const healthMap = {
  healthy: { dot: "bg-healthy", text: "text-healthy", ring: "bg-healthy/15", label: "Healthy" },
  warning: { dot: "bg-warning", text: "text-warning", ring: "bg-warning/15", label: "Attention" },
  critical: { dot: "bg-critical", text: "text-critical", ring: "bg-critical/15", label: "Critical" },
} as const;

export function HealthDot({
  status,
  pulse = true,
}: {
  status: keyof typeof healthMap;
  pulse?: boolean;
}) {
  const h = healthMap[status];
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse && (
        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75 animate-pulse-ring", h.dot)} />
      )}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", h.dot)} />
    </span>
  );
}

export function StatusBadge({ status }: { status: keyof typeof healthMap }) {
  const h = healthMap[status];
  return (
    <span className={cn("chip", h.ring)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", h.dot)} />
      <span className={h.text}>{h.label}</span>
    </span>
  );
}

export function Delta({
  value,
  sentiment,
  className,
}: {
  value: number;
  sentiment?: "good" | "bad" | "neutral";
  className?: string;
}) {
  const positive = value >= 0;
  const tone =
    sentiment === "good"
      ? "text-healthy"
      : sentiment === "bad"
      ? "text-critical"
      : positive
      ? "text-healthy"
      : "text-critical";
  return (
    <span className={cn("tabular text-xs font-medium", tone, className)}>
      {positive ? "↑" : "↓"} {Math.abs(value).toFixed(1)}%
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-md bg-base-800", className)}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <div className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl font-semibold tracking-tight text-gradient sm:text-[28px]">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
