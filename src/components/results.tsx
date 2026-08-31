import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CATEGORIES } from "@/lib/culture/catalog";
import { extremes, populationMeans, topChangers } from "@/lib/culture/stats";
import type { SimSnapshot } from "@/lib/culture/types";
import { NetworkGraph } from "./network-graph";
import { Panel } from "./ui";

const PALETTE = ["#9aab8a", "#c4a574", "#c17a62", "#8fad7a", "#eceae3"];

export function Results({ snap }: { snap: SimSnapshot }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const means0 = populationMeans(snap, "v0");
  const means1 = populationMeans(snap, "v");
  const changers = topChangers(snap);
  const ext = extremes(snap);
  const chartData = snap.history.map((h) => {
    const row: Record<string, number> = { t: h.t, overall: Number(h.overall.toFixed(3)) };
    CATEGORIES.forEach((c, i) => {
      row[c.id] = Number(h.means[i]!.toFixed(3));
    });
    return row;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="People" value={String(snap.names.length)} />
        <Stat label="Meetings" value={String(snap.interactions)} />
        <Stat
          label="Mean shift"
          value={`${(means1.reduce((a, b) => a + b, 0) / means1.length - means0.reduce((a, b) => a + b, 0) / means0.length).toFixed(2)}`}
        />
      </div>

      <Panel>
        <h2 className="font-display text-lg">Population means over time</h2>
        <div className="mt-4 h-72 w-full">
          {ready ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#2a2c26" strokeDasharray="3 3" />
                <XAxis dataKey="t" stroke="#8f8e86" fontSize={11} />
                <YAxis stroke="#8f8e86" fontSize={11} domain={[-8, 8]} />
                <Tooltip
                  contentStyle={{
                    background: "#151613",
                    border: "1px solid #2a2c26",
                    borderRadius: 8,
                  }}
                />
                <Legend />
                {CATEGORIES.map((c, i) => (
                  <Line
                    key={c.id}
                    type="monotone"
                    dataKey={c.id}
                    name={c.name}
                    stroke={PALETTE[i % PALETTE.length]}
                    dot={false}
                    strokeWidth={1.6}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-md bg-raised" />
          )}
        </div>
      </Panel>

      {ready ? <NetworkGraph snap={snap} /> : <div className="h-80 rounded-xl bg-raised" />}

      <Panel>
        <h2 className="font-display text-lg">Category shift</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {CATEGORIES.map((c, i) => {
            const d = means1[i]! - means0[i]!;
            return (
              <li key={c.id}>
                <div className="flex justify-between text-sm">
                  <span>{c.name}</span>
                  <span className="font-mono tabular-nums text-muted">
                    {means0[i]!.toFixed(2)} → {means1[i]!.toFixed(2)} ({d >= 0 ? "+" : ""}
                    {d.toFixed(2)})
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-raised">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${Math.min(100, Math.abs(d) * 12)}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel>
          <h2 className="font-display text-lg">Largest individual change</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {changers.map((r) => (
              <li key={r.i} className="flex items-baseline justify-between gap-3 text-sm">
                <span>
                  {r.name}
                  {r.isUser ? " (you)" : ""}
                </span>
                <span className="font-mono tabular-nums text-muted">
                  {r.v0.toFixed(1)} → {r.v.toFixed(1)}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <h2 className="font-display text-lg">Extremes (final)</h2>
          <p className="mt-1 text-xs text-muted">Highest / lowest mean scores</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {ext.highest.map((r) => (
              <li key={"h" + r.i} className="flex justify-between">
                <span>{r.name}</span>
                <span className="font-mono tabular-nums text-pos">{r.s.toFixed(2)}</span>
              </li>
            ))}
            {ext.lowest.map((r) => (
              <li key={"l" + r.i} className="flex justify-between">
                <span>{r.name}</span>
                <span className="font-mono tabular-nums text-neg">{r.s.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-xl tabular-nums">{value}</p>
    </div>
  );
}
