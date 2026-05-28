import { createFileRoute } from "@tanstack/react-router";
import { Recycle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PageHeader } from "@/components/admin/PageHeader";
import { bottleLifecycle } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/bottles")({
  head: () => ({ meta: [{ title: "Bottle Deposits · EcoRefill Admin" }] }),
  component: BottlesPage,
});

function BottlesPage() {
  const total = bottleLifecycle.reduce((s, b) => s + b.value, 0);

  return (
    <>
      <PageHeader title="Bottle Deposits" description="Track the full lifecycle of EcoRefill reusable bottles." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {bottleLifecycle.map((b) => {
          const pct = Math.round((b.value / total) * 100);
          return (
            <div key={b.stage} className="card-surface p-4">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                <Recycle className="h-3.5 w-3.5" /> {b.stage}
              </div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">{b.value.toLocaleString()}</div>
              <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
              <div className="text-[11px] text-muted-foreground mt-1 tabular-nums">{pct}% of fleet</div>
            </div>
          );
        })}
      </div>

      <div className="card-surface p-5">
        <div className="text-sm font-semibold mb-3">Bottle lifecycle distribution</div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bottleLifecycle} margin={{ left: -16, right: 8 }}>
              <CartesianGrid stroke="#EEF2F1" vertical={false} />
              <XAxis dataKey="stage" tickLine={false} axisLine={false} tick={{ fill: "#5F6368", fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "#5F6368", fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5EBE9", fontSize: 12 }} />
              <Bar dataKey="value" fill="#00564A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
