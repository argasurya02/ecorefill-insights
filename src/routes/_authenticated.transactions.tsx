import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Download } from "lucide-react";
import { PageHeader, Badge } from "@/components/admin/PageHeader";
import { transactions } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/transactions")({
  head: () => ({ meta: [{ title: "Transactions · EcoRefill Admin" }] }),
  component: TransactionsPage,
});

const statuses = ["All", "Completed", "Pending", "Failed", "Refunded"] as const;

function TransactionsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");

  const filtered = useMemo(() => transactions.filter((t) => {
    const match = `${t.id} ${t.customer} ${t.product} ${t.machine}`.toLowerCase().includes(q.toLowerCase());
    return match && (status === "All" || t.status === status);
  }), [q, status]);

  return (
    <>
      <PageHeader
        title="Transactions"
        description="Refills, top-ups, deposits and refunds across all machines."
        actions={<button className="h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium inline-flex items-center gap-1.5 hover:bg-muted"><Download className="h-4 w-4" /> Export CSV</button>}
      />

      <div className="card-surface overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-2 p-4 border-b border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search transaction, customer, machine…"
              className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <div className="flex gap-1.5 bg-secondary p-1 rounded-lg">
            {statuses.map((s) => (
              <button key={s} onClick={() => setStatus(s)}
                className={`px-2.5 h-7 rounded-md text-[12px] font-medium transition ${status === s ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground bg-secondary/60">
                <th className="text-left font-medium px-5 py-2.5">ID</th>
                <th className="text-left font-medium px-5 py-2.5">Customer</th>
                <th className="text-left font-medium px-5 py-2.5">Product</th>
                <th className="text-left font-medium px-5 py-2.5">Machine</th>
                <th className="text-left font-medium px-5 py-2.5">Type</th>
                <th className="text-right font-medium px-5 py-2.5">Amount</th>
                <th className="text-left font-medium px-5 py-2.5">Status</th>
                <th className="text-left font-medium px-5 py-2.5">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-border hover:bg-secondary/40 transition">
                  <td className="px-5 py-3 font-medium">{t.id}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.customer}</td>
                  <td className="px-5 py-3">{t.product}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.machine}</td>
                  <td className="px-5 py-3"><Badge tone="primary">{t.type}</Badge></td>
                  <td className="px-5 py-3 text-right tabular-nums">${t.amount.toFixed(2)}</td>
                  <td className="px-5 py-3">
                    <Badge tone={t.status === "Completed" ? "success" : t.status === "Pending" ? "warning" : t.status === "Failed" ? "danger" : "info"}>{t.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-[12px]">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
