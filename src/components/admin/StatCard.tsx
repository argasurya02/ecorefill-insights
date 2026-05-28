import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatCard({
  label, value, delta, icon: Icon, accent = "primary",
}: {
  label: string;
  value: string;
  delta?: { value: string; positive?: boolean };
  icon: LucideIcon;
  accent?: "primary" | "info" | "warning" | "success";
}) {
  const accentBg = {
    primary: "bg-primary-soft text-primary",
    info: "bg-[oklch(0.95_0.03_240)] text-[oklch(0.45_0.14_240)]",
    warning: "bg-[oklch(0.97_0.06_75)] text-[oklch(0.55_0.15_75)]",
    success: "bg-[oklch(0.95_0.05_160)] text-[oklch(0.42_0.14_160)]",
  }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="card-surface p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[12px] font-medium text-muted-foreground">{label}</div>
          <div className="mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
          {delta && (
            <div className={`mt-1.5 inline-flex items-center gap-1 text-[12px] font-medium ${delta.positive ? "text-[oklch(0.45_0.14_160)]" : "text-destructive"}`}>
              {delta.positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {delta.value}
              <span className="text-muted-foreground font-normal">vs last month</span>
            </div>
          )}
        </div>
        <div className={`h-10 w-10 rounded-xl grid place-items-center ${accentBg}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
