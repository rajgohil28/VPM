"use client";

import { motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { PageHeader, Card, SectionTitle, Reveal } from "@/components/ui/primitives";
import { Simulator } from "@/components/campaigns/Simulator";
import { activeCampaigns } from "@/lib/campaigns";
import { cn } from "@/lib/utils";

export default function CampaignsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Execution"
        title="Campaigns"
        description="Launch a full campaign from a single sentence — or monitor everything already in flight."
      />

      <Reveal>
        <Simulator />
      </Reveal>

      <div>
        <SectionTitle action={<span className="text-xs text-ink-faint">{activeCampaigns.length} campaigns</span>}>
          Active Campaigns
        </SectionTitle>
        <div className="overflow-hidden rounded-card border border-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-overlay/[0.03] text-xs text-ink-faint">
                <th className="px-4 py-3 text-left font-medium">Campaign</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">ROAS</th>
                <th className="px-4 py-3 text-right font-medium">Spend</th>
                <th className="px-4 py-3 text-right font-medium">Pipeline</th>
                <th className="px-4 py-3 text-left font-medium">Progress</th>
              </tr>
            </thead>
            <tbody>
              {activeCampaigns.map((c, i) => (
                <motion.tr
                  key={c.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-line transition-colors last:border-0 hover:bg-overlay/[0.035]"
                >
                  <td className="px-4 py-3.5 font-medium text-ink">{c.name}</td>
                  <td className="px-4 py-3.5 text-ink-muted">{c.vertical}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        "chip",
                        c.status === "Live" ? "text-healthy" : "text-ink-faint"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          c.status === "Live" ? "bg-healthy" : "bg-ink-ghost"
                        )}
                      />
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right tabular font-semibold text-ink">{c.roas}</td>
                  <td className="px-4 py-3.5 text-right tabular text-ink-muted">{c.spend}</td>
                  <td className="px-4 py-3.5 text-right tabular text-ink-muted">{c.pipeline}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-base-700">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            c.status === "Live" ? "bg-accent" : "bg-ink-ghost"
                          )}
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <span className="tabular text-xs text-ink-faint">{c.progress}%</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
