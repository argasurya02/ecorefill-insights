import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Info, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () => ({ meta: [{ title: "Notifications · EcoRefill Admin" }] }),
  component: NotificationsPage,
});

const iconFor = { alert: AlertCircle, warning: AlertTriangle, info: Info } as const;
const toneFor = {
  alert: "bg-[oklch(0.97_0.04_25)] text-destructive",
  warning: "bg-[oklch(0.97_0.06_75)] text-[oklch(0.5_0.15_75)]",
  info: "bg-primary-soft text-primary",
} as const;

function NotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" description="Real-time alerts from your machines and operations." />
      <div className="card-surface overflow-hidden">
        <div className="divide-y divide-border">
          {notifications.map((n) => {
            const Icon = iconFor[n.type as keyof typeof iconFor];
            return (
              <div key={n.id} className="flex items-start gap-3 p-4 hover:bg-secondary/40 transition">
                <div className={`h-9 w-9 rounded-lg grid place-items-center ${toneFor[n.type as keyof typeof toneFor]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium truncate">{n.title}</div>
                    <div className="text-[11px] text-muted-foreground shrink-0">{n.time}</div>
                  </div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">{n.message}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
