import type { ReactNode } from "react";

export function PageHeader({
  title, description, actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Badge({
  children, tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "primary" | "info";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-muted text-foreground/70 ring-border",
    primary: "bg-primary-soft text-primary ring-primary/15",
    success: "bg-[oklch(0.95_0.05_160)] text-[oklch(0.42_0.14_160)] ring-[oklch(0.42_0.14_160)/0.18]",
    warning: "bg-[oklch(0.97_0.06_75)] text-[oklch(0.5_0.15_75)] ring-[oklch(0.5_0.15_75)/0.2]",
    danger: "bg-[oklch(0.97_0.04_25)] text-destructive ring-destructive/20",
    info: "bg-[oklch(0.95_0.03_240)] text-[oklch(0.45_0.14_240)] ring-[oklch(0.45_0.14_240)/0.18]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${tones[tone]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {children}
    </span>
  );
}
