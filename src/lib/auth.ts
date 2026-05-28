// Frontend-only fake auth using localStorage. No backend.
const KEY = "ecorefill_admin_session";

export type Session = { email: string; name: string; loggedInAt: number };

export function login(email: string): Session {
  const session: Session = {
    email,
    name: email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Admin",
    loggedInAt: Date.now(),
  };
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  if (typeof window !== "undefined") localStorage.removeItem(KEY);
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}
