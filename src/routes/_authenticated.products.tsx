import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { PageHeader, Badge } from "@/components/admin/PageHeader";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/products")({
  head: () => ({ meta: [{ title: "Products · EcoRefill Admin" }] }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        description="Refill products available across the EcoRefill network."
        actions={<button className="h-9 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground inline-flex items-center gap-1.5 hover:bg-primary-hover"><Plus className="h-4 w-4" /> Add product</button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => {
          const pct = Math.round((p.stockMl / p.capacityMl) * 100);
          return (
            <div key={p.id} className="card-surface p-5 hover:shadow-[var(--shadow-elevated)] transition">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{p.category}</div>
                  <div className="mt-0.5 text-base font-semibold">{p.name}</div>
                </div>
                <Badge tone={p.status === "Active" ? "success" : p.status === "Low" ? "warning" : "danger"}>{p.status}</Badge>
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <div className="text-2xl font-semibold tabular-nums">${p.pricePerMl.toFixed(3)}</div>
                <div className="text-xs text-muted-foreground">/ ml</div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                  <span>Stock</span>
                  <span className="tabular-nums">{(p.stockMl / 1000).toFixed(1)} / {(p.capacityMl / 1000).toFixed(0)} L</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${pct < 20 ? "bg-destructive" : pct < 40 ? "bg-[oklch(0.7_0.15_75)]" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button className="h-8 flex-1 rounded-lg border border-input bg-background text-xs font-medium inline-flex items-center justify-center gap-1.5 hover:bg-muted"><Edit3 className="h-3.5 w-3.5" /> Edit</button>
                <button className="h-8 w-8 rounded-lg border border-input bg-background grid place-items-center text-muted-foreground hover:bg-muted hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
