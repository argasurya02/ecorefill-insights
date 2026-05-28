import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, Receipt, Package, Cpu, Recycle, Gift,
  LineChart, FileBarChart2, Bell, Settings, Leaf, ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/customers", label: "Customers", icon: Users },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/products", label: "Products", icon: Package },
  { to: "/machines", label: "Machines", icon: Cpu },
  { to: "/bottles", label: "Bottles", icon: Recycle },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/analytics", label: "Eco Analytics", icon: LineChart },
  { to: "/reports", label: "Reports", icon: FileBarChart2 },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar({
  collapsed, setCollapsed, mobileOpen, setMobileOpen,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-foreground/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={[
          "fixed lg:sticky top-0 z-40 h-screen shrink-0",
          "bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
          "transition-[width,transform] duration-300 ease-out",
          collapsed ? "w-[76px]" : "w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Leaf className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-sm font-semibold tracking-tight truncate">EcoRefill</div>
                <div className="text-[11px] text-muted-foreground -mt-0.5">Admin Console</div>
              </div>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        <nav className="px-3 py-4 space-y-0.5 scrollbar-thin overflow-y-auto h-[calc(100vh-4rem-64px)]">
          {!collapsed && (
            <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Workspace
            </div>
          )}
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={[
                  "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed ? "justify-center" : "",
                ].join(" ")}
                title={collapsed ? label : undefined}
              >
                <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "" : "opacity-80"}`} />
                {!collapsed && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={`absolute bottom-0 inset-x-0 p-3 border-t border-sidebar-border ${collapsed ? "px-2" : ""}`}>
          <div className={`rounded-xl bg-primary-soft p-3 ${collapsed ? "text-center" : ""}`}>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground grid place-items-center">
                <Leaf className="h-4 w-4" />
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-primary truncate">Eco Tier · Pro</div>
                  <div className="text-[11px] text-primary/70">142 machines online</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
