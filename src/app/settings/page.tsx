"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { PageHeader, Card, SectionTitle, Reveal } from "@/components/ui/primitives";
import { company, user, workspace } from "@/lib/company";
import { cn } from "@/lib/utils";

function Toggle({ on: initial, label, desc }: { on: boolean; label: string; desc: string }) {
  const [on, setOn] = useState(initial);
  return (
    <div className="flex items-center justify-between py-3.5">
      <div className="pr-6">
        <div className="text-sm font-medium text-ink">{label}</div>
        <div className="text-xs text-ink-muted">{desc}</div>
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          on ? "bg-accent" : "bg-base-700"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            on ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader eyebrow="Workspace" title="Settings" description="Manage your workspace, executive autonomy and integrations." />

      <Reveal>
        <Card>
          <SectionTitle>Profile</SectionTitle>
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-base-700 text-lg font-semibold text-ink">
              {user.initials}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-ink">{user.firstName} {user.lastName}</div>
              <div className="text-xs text-ink-muted">{user.title} · {user.email}</div>
            </div>
            <button className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink">
              Edit
            </button>
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.05}>
        <Card>
          <SectionTitle>Workspace</SectionTitle>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Organization", value: company.name },
              { label: "Plan", value: workspace.plan },
              { label: "Seats", value: `${workspace.seats} members` },
            ].map((r) => (
              <div key={r.label} className="surface p-3.5">
                <div className="text-[11px] text-ink-faint">{r.label}</div>
                <div className="mt-0.5 text-sm font-medium text-ink">{r.value}</div>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.1}>
        <Card>
          <SectionTitle>
            <span className="flex items-center gap-2">
              <Icon name="SlidersHorizontal" className="h-4 w-4 text-accent" /> Executive Autonomy
            </span>
          </SectionTitle>
          <div className="divide-y divide-line">
            <Toggle on={true} label="Autonomous budget reallocation" desc="Let your VP move up to $50K between channels without approval." />
            <Toggle on={true} label="Auto-pause underperformers" desc="Pause campaigns that fall below a 2.0x ROAS threshold." />
            <Toggle on={false} label="Autonomous campaign launch" desc="Allow the VP to launch pre-approved campaign templates." />
            <Toggle on={true} label="Proactive briefings" desc="Deliver a prepared executive brief every morning at 7 AM." />
            <Toggle on={true} label="Anomaly alerts" desc="Notify me immediately when a critical anomaly is detected." />
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.15}>
        <Card>
          <SectionTitle>Integrations</SectionTitle>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {[
              { name: "Salesforce", status: "Connected", icon: "Cloud" },
              { name: "HubSpot", status: "Connected", icon: "Boxes" },
              { name: "Google Ads", status: "Connected", icon: "Search" },
              { name: "LinkedIn Ads", status: "Connected", icon: "Linkedin" },
              { name: "Meta Ads", status: "Connected", icon: "Facebook" },
              { name: "Snowflake", status: "Connect", icon: "Database" },
            ].map((intg) => (
              <div key={intg.name} className="flex items-center gap-3 rounded-xl border border-line bg-base-800/40 p-3.5">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-base-750">
                  <Icon name={intg.icon} className="h-4 w-4 text-ink-muted" />
                </div>
                <span className="flex-1 text-sm font-medium text-ink">{intg.name}</span>
                <span
                  className={cn(
                    "chip",
                    intg.status === "Connected" ? "text-healthy" : "text-accent"
                  )}
                >
                  {intg.status === "Connected" && <span className="h-1.5 w-1.5 rounded-full bg-healthy" />}
                  {intg.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
