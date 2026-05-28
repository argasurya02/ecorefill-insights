import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Leaf, Mail, Lock, ArrowRight } from "lucide-react";
import { getSession, login } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in · EcoRefill Admin" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@ecorefill.io");
  const [password, setPassword] = useState("ecorefill");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getSession()) navigate({ to: "/dashboard", replace: true });
  }, [navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email);
      navigate({ to: "/dashboard", replace: true });
    }, 500);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          <div className="flex items-center gap-2.5 mb-10">
            <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground grid place-items-center shadow-sm">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">EcoRefill</div>
              <div className="text-[11px] text-muted-foreground -mt-0.5">Admin Console</div>
            </div>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Sign in to manage your refill network.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-medium text-foreground">Email</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground">Password</label>
                <button type="button" className="text-[11px] font-medium text-primary hover:underline">Forgot password?</button>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 select-none cursor-pointer">
              <input
                type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-input text-primary focus:ring-ring/40"
              />
              <span className="text-xs text-muted-foreground">Remember me for 30 days</span>
            </label>

            <button
              type="submit" disabled={loading}
              className="group inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </form>

          <div className="mt-8 rounded-lg bg-primary-soft px-3 py-2.5 text-[11px] text-primary">
            Demo: any email & password works — this is a frontend-only prototype.
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:block relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.7 0.12 175) 0, transparent 50%), radial-gradient(circle at 80% 60%, oklch(0.55 0.1 175) 0, transparent 55%)" }} />
        <div className="relative h-full w-full flex flex-col justify-between p-12 text-primary-foreground">
          <div className="text-sm font-medium opacity-80">EcoRefill · 2026</div>
          <div className="max-w-md">
            <div className="text-3xl font-semibold tracking-tight leading-tight">
              Refill smarter.<br />Waste less.
            </div>
            <p className="mt-3 text-sm opacity-80">
              Monitor your vending network, customers and eco impact — all from one premium admin console.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { k: "142", v: "Machines online" },
                { k: "9.8t", v: "Plastic saved" },
                { k: "12k+", v: "Customers" },
              ].map((s) => (
                <div key={s.v} className="rounded-xl bg-white/8 ring-1 ring-white/15 backdrop-blur p-3">
                  <div className="text-xl font-semibold">{s.k}</div>
                  <div className="text-[11px] opacity-75 mt-0.5">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[11px] opacity-60">Frontend-only prototype · No backend required</div>
        </div>
      </div>
    </div>
  );
}
