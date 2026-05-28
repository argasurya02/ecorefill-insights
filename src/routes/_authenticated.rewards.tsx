import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit3 } from "lucide-react";
import { PageHeader, Badge } from "@/components/admin/PageHeader";
import { rewards } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/rewards")({
  head: () => ({ meta: [{ title: "Rewards · EcoRefill Admin" }] }),
  component: RewardsPage,
});

function RewardsPage() {
  return (
    <>
      <PageHeader
        title="Rewards"
        description="Configure eco point rewards your customers can redeem."
        actions={<button className="h-9 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground inline-flex items-center gap-1.5 hover:bg-primary-hover"><Plus className="h-4 w-4" /> New reward</button>}
      />

      <div className="card-surface overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-foreground bg-secondary/60">
              <th className="text-left font-medium px-5 py-2.5">Reward</th>
              <th className="text-left font-medium px-5 py-2.5">Category</th>
              <th className="text-right font-medium px-5 py-2.5">Eco points</th>
              <th className="text-left font-medium px-5 py-2.5">Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rewards.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-secondary/40 transition">
                <td className="px-5 py-3 font-medium">{r.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.category}</td>
                <td className="px-5 py-3 text-right tabular-nums">{r.cost}</td>
                <td className="px-5 py-3"><Badge tone={r.status === "Active" ? "success" : "warning"}>{r.status}</Badge></td>
                <td className="px-5 py-3 text-right">
                  <button className="inline-flex items-center gap-1 text-[12px] font-medium text-primary hover:underline"><Edit3 className="h-3.5 w-3.5" /> Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
