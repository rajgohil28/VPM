"use client";

import { Icon } from "@/components/ui/icon";
import type { ResponseBlock } from "@/lib/chat";
import { cn } from "@/lib/utils";

const calloutTone = {
  info: { border: "border-thinking/25", bg: "bg-thinking/[0.06]", icon: "Info", color: "text-thinking" },
  warn: { border: "border-warning/25", bg: "bg-warning/[0.06]", icon: "TriangleAlert", color: "text-warning" },
  success: { border: "border-healthy/25", bg: "bg-healthy/[0.06]", icon: "CircleCheck", color: "text-healthy" },
} as const;

const sentimentColor: Record<string, string> = {
  good: "text-healthy",
  bad: "text-critical",
  neutral: "text-ink-muted",
};

export function ResponseBlockView({ block }: { block: ResponseBlock }) {
  switch (block.type) {
    case "headline":
      return <h3 className="pt-1 text-[15px] font-semibold leading-snug text-ink">{block.text}</h3>;

    case "para":
      return <p className="text-sm leading-relaxed text-ink-muted">{block.text}</p>;

    case "bullets":
      return (
        <ul className="space-y-1.5">
          {block.items?.map((it, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );

    case "numbered":
      return (
        <ol className="space-y-2">
          {block.items?.map((it, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-accent-soft text-[11px] font-semibold text-accent">
                {i + 1}
              </span>
              <span className="pt-0.5">{it}</span>
            </li>
          ))}
        </ol>
      );

    case "stats":
      return (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {block.stats?.map((s, i) => (
            <div key={i} className="surface p-3">
              <div className="text-[11px] text-ink-faint">{s.label}</div>
              <div className="mt-1 text-lg font-semibold tabular text-ink">{s.value}</div>
              {s.delta && (
                <div className={cn("tabular text-[11px] font-semibold", sentimentColor[s.sentiment ?? "neutral"])}>
                  {s.delta}
                </div>
              )}
            </div>
          ))}
        </div>
      );

    case "callout": {
      const t = calloutTone[block.callout!.tone];
      return (
        <div className={cn("rounded-xl border p-4", t.border, t.bg)}>
          <div className={cn("mb-1 flex items-center gap-2 text-xs font-semibold", t.color)}>
            <Icon name={t.icon} className="h-4 w-4" />
            {block.callout!.title}
          </div>
          <p className="text-sm leading-relaxed text-ink-muted">{block.callout!.body}</p>
        </div>
      );
    }

    case "table":
      return (
        <div className="overflow-hidden rounded-xl border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-overlay/[0.03]">
                {block.table?.head.map((h, i) => (
                  <th
                    key={i}
                    className={cn(
                      "px-3.5 py-2.5 text-xs font-semibold text-ink-faint",
                      i === 0 ? "text-left" : "text-left"
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table?.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-line last:border-0">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={cn(
                        "px-3.5 py-2.5",
                        ci === 0 ? "font-medium text-ink" : "text-ink-muted"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}
