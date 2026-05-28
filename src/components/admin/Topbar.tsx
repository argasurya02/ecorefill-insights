import { Bell, Search, Menu, LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { getSession, logout } from "@/lib/auth";
import { useState, useEffect } from "react";

export function Topbar({ onMobileMenu }: { onMobileMenu: () => void }) {
  const navigate = useNavigate();
  const [name, setName] = useState("Admin");

  useEffect(() => {
    const s = getSession();
    if (s) setName(s.name);
  }, []);

  return (
    <header className="sticky top-0 z-20 h-16 bg-background/80 backdrop-blur border-b border-border">
      <div className="flex h-full items-center gap-3 px-4 lg:px-6">
        <button
          onClick={onMobileMenu}
          className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search customers, transactions, machines…"
            className="h-9 w-full rounded-lg border border-input bg-secondary/60 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:bg-background transition"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted" aria-label="Notifications">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>
          <div className="hidden sm:flex items-center gap-2.5 pl-2 ml-1 border-l border-border">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-semibold">
              {name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
            </div>
            <div className="text-xs leading-tight">
              <div className="font-semibold">{name}</div>
              <div className="text-muted-foreground">Administrator</div>
            </div>
          </div>
          <button
            onClick={() => { logout(); navigate({ to: "/login" }); }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Log out"
            title="Log out"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}
