import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Wrench } from "lucide-react";
import { PageHeader, Badge } from "@/components/admin/PageHeader";
import { machines } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/machines")({
  head: () => ({ meta: [{ title: "Machines · EcoRefill Admin" }] }),
  component: MachinesPage,
});

function statusTone(s: string) {
  return s === "Available" ? "success" : s === "Maintenance" ? "warning" : s === "Empty" ? "danger" : "neutral";
}

function MachinesPage() {
  const summary = [
    { label: "Online", count: machines.filter((m) => m.status === "Available").length, tone: "success" as const },
    { label: "Maintenance", count: machines.filter((m) => m.status === "Maintenance").length, tone: "warning" as const },
    { label: "Empty", count: machines.filter((m) => m.status === "Empty").length, tone: "danger" as const },
    { label: "Offline", count: machines.filter((m) => m.status === "Offline").length, tone: "neutral" as const },
  ];

  return (
    <>
      <PageHeader title="Vending Machines" description="Live status and stock levels across your network." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {summary.map((s) => (
          <div key={s.label} className="card-surface p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="mt-1 flex items-center justify-between">
              <div className="text-2xl font-semibold tabular-nums">{s.count}</div>
              <Badge tone={s.tone}>{s.label}</Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {machines.map((m) => (
          <div key={m.id} className="card-surface p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold">{m.id}</div>
                <div className="text-[12px] text-muted-foreground inline-flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" /> {m.location}
                </div>
              </div>
              <Badge tone={statusTone(m.status)}>{m.status}</Badge>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                <span>Stock level</span><span className="tabular-nums">{m.stockPct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={`h-full ${m.stockPct < 15 ? "bg-destructive" : m.stockPct < 40 ? "bg-[oklch(0.7_0.15_75)]" : "bg-primary"}`} style={{ width: `${m.stockPct}%` }} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Last refill · {m.lastRefill}</span>
              <button className="inline-flex items-center gap-1 text-primary font-medium hover:underline"><Wrench className="h-3 w-3" /> Service</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
