import { createFileRoute } from "@tanstack/react-router";
import { Users, Receipt, Cpu, Recycle, DollarSign, Activity, ArrowRight } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import { motion } from "motion/react";
import { PageHeader, Badge } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { stats, monthlyRefills, productMix, machines, transactions } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · EcoRefill Admin" }] }),
  component: DashboardPage,
});

const pieColors = ["#00564A", "#00796B", "#3FB6A1", "#7FD0BE", "#C7EDE3"];

function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your refill network performance today."
        actions={
          <>
            <button className="h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium hover:bg-muted">Last 30 days</button>
            <button className="h-9 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover">Export report</button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Customers" value={stats.totalUsers.toLocaleString()} icon={Users} delta={{ value: "+8.4%", positive: true }} />
        <StatCard label="Refill Transactions" value={stats.totalTransactions.toLocaleString()} icon={Receipt} delta={{ value: "+12.1%", positive: true }} accent="info" />
        <StatCard label="Active Machines" value={`${stats.activeMachines}`} icon={Cpu} delta={{ value: "+3", positive: true }} accent="success" />
        <StatCard label="Plastic Reduced" value={`${(stats.plasticReducedKg / 1000).toFixed(1)} t`} icon={Recycle} delta={{ value: "+5.7%", positive: true }} accent="warning" />
      </div>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="card-surface p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Monthly refill activity</div>
              <div className="text-xs text-muted-foreground mt-0.5">Refills and revenue across all machines.</div>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Refills</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[oklch(0.62_0.12_175)]" />Revenue</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRefills} margin={{ left: -16, right: 8, top: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00564A" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00564A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3FB6A1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3FB6A1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#EEF2F1" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#5F6368", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#5F6368", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5EBE9", fontSize: 12 }} />
                <Area type="monotone" dataKey="refills" stroke="#00564A" strokeWidth={2} fill="url(#g1)" />
                <Area type="monotone" dataKey="revenue" stroke="#3FB6A1" strokeWidth={2} fill="url(#g2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card-surface p-5">
          <div className="text-sm font-semibold">Product mix</div>
          <div className="text-xs text-muted-foreground mt-0.5">Share of refill volume.</div>
          <div className="h-56 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={productMix} dataKey="value" innerRadius={48} outerRadius={78} paddingAngle={2}>
                  {productMix.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E5EBE9", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {productMix.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between text-[12px]">
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: pieColors[i] }} />{p.name}
                </span>
                <span className="font-medium">{p.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-5 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-semibold">Revenue</div>
              <div className="text-xs text-muted-foreground">Current month</div>
            </div>
            <div className="h-9 w-9 rounded-xl bg-primary-soft text-primary grid place-items-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-semibold tabular-nums">${stats.monthlyRevenue.toLocaleString()}</div>
          <div className="h-24 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRefills.slice(-7)}>
                <Bar dataKey="revenue" fill="#00564A" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card-surface p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">Machine status</div>
            <a className="text-[11px] text-primary inline-flex items-center gap-1 hover:underline cursor-pointer">View all <ArrowRight className="h-3 w-3" /></a>
          </div>
          <div className="space-y-3">
            {machines.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-secondary grid place-items-center text-muted-foreground">
                  <Activity className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium truncate">{m.id}</div>
                    <Badge tone={
                      m.status === "Available" ? "success" :
                      m.status === "Maintenance" ? "warning" :
                      m.status === "Empty" ? "danger" : "neutral"
                    }>{m.status}</Badge>
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">{m.location}</div>
                </div>
                <div className="w-28">
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${m.stockPct}%` }} />
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1 text-right">{m.stockPct}%</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card-surface mt-5">
        <div className="flex items-center justify-between p-5 pb-3">
          <div className="text-sm font-semibold">Recent transactions</div>
          <a className="text-[11px] text-primary hover:underline cursor-pointer">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground bg-secondary/60">
                <th className="text-left font-medium px-5 py-2.5">Transaction</th>
                <th className="text-left font-medium px-5 py-2.5">Customer</th>
                <th className="text-left font-medium px-5 py-2.5">Product</th>
                <th className="text-left font-medium px-5 py-2.5">Machine</th>
                <th className="text-right font-medium px-5 py-2.5">Amount</th>
                <th className="text-left font-medium px-5 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 6).map((t) => (
                <tr key={t.id} className="border-t border-border hover:bg-secondary/40 transition">
                  <td className="px-5 py-3 font-medium">{t.id}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.customer}</td>
                  <td className="px-5 py-3">{t.product}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.machine}</td>
                  <td className="px-5 py-3 text-right tabular-nums">${t.amount.toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <Badge tone={
                      t.status === "Completed" ? "success" :
                      t.status === "Pending" ? "warning" :
                      t.status === "Failed" ? "danger" : "info"
                    }>{t.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
}
