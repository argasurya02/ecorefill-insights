import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Droplets, Wind, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { ecoImpact, stats } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/analytics")({
  head: () => ({ meta: [{ title: "Eco Analytics · EcoRefill Admin" }] }),
  component: AnalyticsPage,
});

function Ring({ value, label }: { value: number; label: string }) {
  return (
    <div className="card-surface p-5">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="h-40 mt-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value }]} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" cornerRadius={20} fill="#00564A" background={{ fill: "#E8F5F2" }} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-2xl font-semibold tabular-nums">{value}%</div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Eco Impact Analytics" description="Measure the sustainability impact of your refill network." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Plastic saved" value={`${(stats.plasticReducedKg / 1000).toFixed(2)} t`} icon={Droplets} delta={{ value: "+12.4%", positive: true }} />
        <StatCard label="CO₂ reduction" value={`${(stats.co2SavedKg / 1000).toFixed(1)} t`} icon={Wind} delta={{ value: "+8.9%", positive: true }} accent="info" />
        <StatCard label="Refill growth" value="+18.2%" icon={TrendingUp} delta={{ value: "+2.3%", positive: true }} accent="success" />
      </div>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card-surface p-5 xl:col-span-2">
          <div className="text-sm font-semibold">Plastic & CO₂ reduction over time</div>
          <div className="h-72 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ecoImpact} margin={{ left: -16, right: 8 }}>
                <CartesianGrid stroke="#EEF2F1" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#5F6368", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#5F6368", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5EBE9", fontSize: 12 }} />
                <Line type="monotone" dataKey="plastic" stroke="#00564A" strokeWidth={2.5} dot={{ r: 3, fill: "#00564A" }} />
                <Line type="monotone" dataKey="co2" stroke="#3FB6A1" strokeWidth={2.5} dot={{ r: 3, fill: "#3FB6A1" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Ring value={72} label="Refill adoption" />
          <Ring value={48} label="Bottle return rate" />
        </div>
      </div>
    </>
  );
}
