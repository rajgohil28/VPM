"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  revenueTrend,
  channels,
  pipelineForecast,
  channelPerformance,
  funnel,
} from "@/lib/metrics";
import { formatNumber } from "@/lib/utils";

const axisStyle = { fontSize: 11, fill: "#646b76" };
const gridStroke = "rgba(255,255,255,0.05)";

function TipCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line-strong bg-base-800/95 px-3 py-2 text-xs shadow-lift backdrop-blur-xl">
      {children}
    </div>
  );
}

export function RevenueTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={revenueTrend} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c8cf8" stopOpacity={0.32} />
            <stop offset="100%" stopColor="#7c8cf8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
        <Tooltip
          cursor={{ stroke: "rgba(255,255,255,0.1)" }}
          content={({ active, payload, label }) =>
            active && payload?.length ? (
              <TipCard>
                <div className="mb-1 font-semibold text-ink">{label}</div>
                <div className="text-accent">Revenue ${payload[0].value}M</div>
                <div className="text-ink-faint">Target ${payload[0].payload.target}M</div>
              </TipCard>
            ) : null
          }
        />
        <Line type="monotone" dataKey="target" stroke="#3d434c" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#7c8cf8"
          strokeWidth={2.4}
          fill="url(#rev)"
          dot={false}
          activeDot={{ r: 4, fill: "#7c8cf8", stroke: "#0a0b0d", strokeWidth: 2 }}
          animationDuration={1100}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ChannelBars() {
  const data = [...channels].sort((a, b) => b.roas - a.roas);
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 12, left: 8, bottom: 0 }}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 11, fill: "#9aa1ac" }}
          axisLine={false}
          tickLine={false}
          width={92}
        />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.03)" }}
          content={({ active, payload }) =>
            active && payload?.length ? (
              <TipCard>
                <div className="font-semibold text-ink">{payload[0].payload.name}</div>
                <div className="text-ink-muted">{payload[0].payload.roas}x ROAS</div>
              </TipCard>
            ) : null
          }
        />
        <Bar dataKey="roas" radius={[0, 6, 6, 0]} barSize={16} animationDuration={900}>
          {data.map((c, i) => (
            <Cell key={i} fill={c.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ForecastChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={pipelineForecast} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ade80" stopOpacity={0.16} />
            <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
        <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
        <Tooltip
          content={({ active, payload, label }) =>
            active && payload?.length ? (
              <TipCard>
                <div className="mb-1 font-semibold text-ink">{label}</div>
                {payload[0].payload.actual != null ? (
                  <div className="text-healthy">Actual ${payload[0].payload.actual}M</div>
                ) : (
                  <>
                    <div className="text-accent">Forecast ${payload[0].payload.forecast}M</div>
                    <div className="text-ink-faint">
                      Range ${payload[0].payload.low}M – ${payload[0].payload.high}M
                    </div>
                  </>
                )}
              </TipCard>
            ) : null
          }
        />
        <Area type="monotone" dataKey="high" stroke="none" fill="url(#band)" />
        <Area type="monotone" dataKey="low" stroke="none" fill="#0a0b0d" />
        <Line type="monotone" dataKey="actual" stroke="#4ade80" strokeWidth={2.4} dot={false} connectNulls={false} />
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#7c8cf8"
          strokeWidth={2.2}
          strokeDasharray="5 4"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ChannelPerfChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={channelPerformance} margin={{ top: 6, right: 6, left: -22, bottom: 0 }}>
        <defs>
          <linearGradient id="li" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c8cf8" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#7c8cf8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
        <XAxis dataKey="week" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}x`} />
        <Tooltip
          content={({ active, payload, label }) =>
            active && payload?.length ? (
              <TipCard>
                <div className="mb-1 font-semibold text-ink">{label}</div>
                <div className="text-accent">LinkedIn {payload.find((p) => p.dataKey === "linkedin")?.value}x</div>
                <div className="text-warning">Meta {payload.find((p) => p.dataKey === "meta")?.value}x</div>
                <div className="text-healthy">Google {payload.find((p) => p.dataKey === "google")?.value}x</div>
              </TipCard>
            ) : null
          }
        />
        <Area type="monotone" dataKey="linkedin" stroke="#7c8cf8" strokeWidth={2.2} fill="url(#li)" dot={false} />
        <Line type="monotone" dataKey="meta" stroke="#fbbf24" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="google" stroke="#4ade80" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function FunnelChart() {
  const max = funnel[0].value;
  return (
    <div className="space-y-2.5">
      {funnel.map((stage, i) => {
        const width = Math.max((stage.value / max) * 100, 6);
        return (
          <div key={stage.stage} className="group">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-medium text-ink-muted">{stage.stage}</span>
              <span className="tabular text-ink-faint">
                {formatNumber(stage.value, { compact: stage.value > 9999 })}
                <span className="ml-2 text-ink-ghost">{stage.rate}</span>
              </span>
            </div>
            <div className="h-7 overflow-hidden rounded-lg bg-base-800">
              <div
                className="flex h-full items-center rounded-lg bg-gradient-to-r from-accent/80 to-thinking/60 transition-all duration-700"
                style={{
                  width: `${width}%`,
                  opacity: 0.5 + (1 - i / funnel.length) * 0.5,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
