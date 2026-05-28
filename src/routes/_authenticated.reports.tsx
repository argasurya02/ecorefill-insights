import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PageHeader } from "@/components/admin/PageHeader";
import { monthlyRefills } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({ meta: [{ title: "Reports · EcoRefill Admin" }] }),
  component: ReportsPage,
});

const reports = [
  { name: "Monthly performance · May 2026", size: "2.4 MB", type: "PDF" },
  { name: "Refill trends · Q1 2026", size: "1.8 MB", type: "PDF" },
  { name: "Revenue summary · April 2026", size: "980 KB", type: "XLSX" },
  { name: "User growth · 2026 YTD", size: "1.2 MB", type: "PDF" },
];

function ReportsPage() {
  return (
    <>
      <PageHeader title="Reports" description="Download generated reports and review trend dashboards." />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-5">
        <div className="card-surface p-5 xl:col-span-2">
          <div className="text-sm font-semibold">Revenue trend</div>
          <div className="h-60 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRefills} margin={{ left: -16, right: 8 }}>
                <defs>
                  <linearGradient id="rep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00564A" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00564A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#EEF2F1" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#5F6368", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#5F6368", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5EBE9", fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#00564A" strokeWidth={2} fill="url(#rep)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card-surface p-5">
          <div className="text-sm font-semibold">Quick stats</div>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex justify-between"><span className="text-muted-foreground">YTD refills</span><span className="font-semibold tabular-nums">42,820</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">YTD revenue</span><span className="font-semibold tabular-nums">$78,340</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">User growth</span><span className="font-semibold tabular-nums">+24.3%</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Avg basket</span><span className="font-semibold tabular-nums">$4.12</span></li>
          </ul>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="p-5 border-b border-border text-sm font-semibold">Recent reports</div>
        <div className="divide-y divide-border">
          {reports.map((r) => (
            <div key={r.name} className="flex items-center gap-3 p-4 hover:bg-secondary/40 transition">
              <div className="h-9 w-9 rounded-lg bg-primary-soft text-primary grid place-items-center">
                <FileText className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{r.name}</div>
                <div className="text-[11px] text-muted-foreground">{r.type} · {r.size}</div>
              </div>
              <button className="h-8 rounded-md border border-input bg-background px-3 text-xs font-medium inline-flex items-center gap-1.5 hover:bg-muted">
                <Download className="h-3.5 w-3.5" /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
