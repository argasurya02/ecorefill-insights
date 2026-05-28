import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { getSession } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings · EcoRefill Admin" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [name, setName] = useState("Admin");
  const [email, setEmail] = useState("");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [maintenanceAlerts, setMaintenanceAlerts] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const s = getSession();
    if (s) { setName(s.name); setEmail(s.email); }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <PageHeader title="Settings" description="Manage your profile, notifications and preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card-surface p-5 lg:col-span-2">
          <div className="text-sm font-semibold">Profile</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <Field label="Full name"><input value={name} onChange={(e) => setName(e.target.value)} className="input" /></Field>
            <Field label="Email"><input value={email} onChange={(e) => setEmail(e.target.value)} className="input" /></Field>
            <Field label="Role"><input value="Administrator" disabled className="input opacity-70" /></Field>
            <Field label="Time zone"><input value="UTC+08:00" className="input" /></Field>
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button className="h-9 rounded-lg border border-input bg-background px-3 text-sm font-medium hover:bg-muted">Cancel</button>
            <button className="h-9 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover">Save changes</button>
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="text-sm font-semibold">Preferences</div>
          <div className="mt-4 space-y-3">
            <Toggle label="Dark mode" checked={dark} onChange={setDark} />
            <Toggle label="Email alerts" checked={emailAlerts} onChange={setEmailAlerts} />
            <Toggle label="Push notifications" checked={pushAlerts} onChange={setPushAlerts} />
            <Toggle label="Maintenance alerts" checked={maintenanceAlerts} onChange={setMaintenanceAlerts} />
          </div>
        </div>
      </div>

      <style>{`.input{height:36px;width:100%;border-radius:.5rem;border:1px solid var(--color-input);background:var(--color-background);padding:0 .75rem;font-size:.875rem;outline:none}.input:focus{box-shadow:0 0 0 2px color-mix(in oklab,var(--color-ring) 40%, transparent)}`}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition ${checked ? "bg-primary" : "bg-muted"}`}
        aria-pressed={checked}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "left-[18px]" : "left-0.5"}`} />
      </button>
    </label>
  );
}
