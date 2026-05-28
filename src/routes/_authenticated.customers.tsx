import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Filter, Plus, Download, X } from "lucide-react";
import { PageHeader, Badge } from "@/components/admin/PageHeader";
import { customers } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/customers")({
  head: () => ({ meta: [{ title: "Customers · EcoRefill Admin" }] }),
  component: CustomersPage,
});

function CustomersPage() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<(typeof customers)[number] | null>(null);
  const filtered = useMemo(
    () => customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <>
      <PageHeader
        title="Customers"
        description="Manage refill customers, points, and wallet balances."
        actions={
          <>
            <button className="h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium inline-flex items-center gap-1.5 hover:bg-muted"><Download className="h-4 w-4" /> Export</button>
            <button className="h-9 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground inline-flex items-center gap-1.5 hover:bg-primary-hover"><Plus className="h-4 w-4" /> New customer</button>
          </>
        }
      />

      <div className="card-surface overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-2 p-4 border-b border-border">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or email…"
              className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <button className="h-9 rounded-lg border border-input bg-background px-3 text-sm inline-flex items-center gap-1.5 hover:bg-muted">
            <Filter className="h-4 w-4" /> All tiers
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground bg-secondary/60">
                <th className="text-left font-medium px-5 py-2.5">Customer</th>
                <th className="text-left font-medium px-5 py-2.5">Phone</th>
                <th className="text-right font-medium px-5 py-2.5">Eco points</th>
                <th className="text-right font-medium px-5 py-2.5">Wallet</th>
                <th className="text-right font-medium px-5 py-2.5">Bottles</th>
                <th className="text-left font-medium px-5 py-2.5">Joined</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-t border-border hover:bg-secondary/40 transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-primary-soft text-primary grid place-items-center text-[11px] font-semibold">
                        {c.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{c.name}</div>
                        <div className="text-[11px] text-muted-foreground truncate">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{c.phone}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{c.ecoPoints}</td>
                  <td className="px-5 py-3 text-right tabular-nums">${c.wallet.toFixed(2)}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{c.bottles}</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.joined}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => setSelected(c)} className="text-[12px] font-medium text-primary hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-border text-xs text-muted-foreground">
          <div>Showing {filtered.length} of {customers.length}</div>
          <div className="flex gap-1.5">
            <button className="h-8 px-2.5 rounded-md border border-input hover:bg-muted">Previous</button>
            <button className="h-8 px-2.5 rounded-md bg-primary text-primary-foreground">1</button>
            <button className="h-8 px-2.5 rounded-md border border-input hover:bg-muted">2</button>
            <button className="h-8 px-2.5 rounded-md border border-input hover:bg-muted">Next</button>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm grid place-items-center p-4" onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()} className="card-surface w-full max-w-md p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground grid place-items-center font-semibold">
                  {selected.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-base font-semibold">{selected.name}</div>
                  <div className="text-xs text-muted-foreground">{selected.email}</div>
                  <div className="mt-1.5"><Badge tone="primary">Eco Member</Badge></div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="h-8 w-8 grid place-items-center rounded-md hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-secondary p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Points</div><div className="text-lg font-semibold tabular-nums">{selected.ecoPoints}</div></div>
              <div className="rounded-lg bg-secondary p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Wallet</div><div className="text-lg font-semibold tabular-nums">${selected.wallet.toFixed(2)}</div></div>
              <div className="rounded-lg bg-secondary p-3"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Bottles</div><div className="text-lg font-semibold tabular-nums">{selected.bottles}</div></div>
            </div>
            <div className="mt-5 text-xs text-muted-foreground">Customer ID · {selected.id} · Joined {selected.joined}</div>
          </div>
        </div>
      )}
    </>
  );
}
