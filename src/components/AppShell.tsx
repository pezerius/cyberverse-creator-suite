import { Link, useRouterState } from "@tanstack/react-router";
import { Gamepad2, Hammer, Users, Store, User, Coins } from "lucide-react";
import type { ReactNode } from "react";

type NavItem = {
  to: string;
  icon: typeof Gamepad2;
  label: string;
  disabled?: boolean;
  tip?: string;
};

const navItems: NavItem[] = [
  { to: "/play", icon: Gamepad2, label: "Play", disabled: true, tip: "CyberVerse core game" },
  { to: "/create", icon: Hammer, label: "Create" },
  { to: "/hub", icon: Users, label: "Party Hub" },
  { to: "/marketplace", icon: Store, label: "Marketplace" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full flex text-foreground">
      {/* Left icon rail */}
      <aside className="w-20 shrink-0 border-r-2 border-ink bg-white flex flex-col items-center py-4 gap-3 sticky top-0 h-screen z-30">
        <Link to="/create" className="mb-2 group" aria-label="Pixels Studio home">
          <div className="w-12 h-12 rounded-2xl bg-primary border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center">
            <span className="text-primary-foreground text-[10px] font-bold leading-none" style={{ fontFamily: "var(--font-pixel)" }}>PX</span>
          </div>
        </Link>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = !item.disabled && (item.to === "/create"
            ? pathname === "/create" || pathname === "/templates" || pathname.startsWith("/builder") || pathname.startsWith("/dashboard")
            : pathname.startsWith(item.to));
          if (item.disabled) {
            return (
              <div
                key={item.label}
                title={item.tip}
                className="relative w-12 h-12 rounded-2xl border-2 border-ink/20 bg-muted/40 flex items-center justify-center text-ink/30 cursor-not-allowed group"
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
                <span className="absolute left-full ml-3 whitespace-nowrap px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-ink text-background border-2 border-ink rounded-md opacity-0 group-hover:opacity-100 pointer-events-none z-40">
                  {item.tip}
                </span>
              </div>
            );
          }
          return (
            <Link
              key={item.label}
              to={item.to as never}
              className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group border-2 ${
                active
                  ? "bg-accent text-ink border-ink shadow-[3px_3px_0_0_var(--ink)]"
                  : "text-ink/70 hover:text-ink hover:bg-muted border-transparent hover:border-ink"
              }`}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" strokeWidth={2} />
              <span className="absolute left-full ml-3 whitespace-nowrap px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-ink text-background rounded-md opacity-0 group-hover:opacity-100 pointer-events-none z-40">
                {item.label}
              </span>
            </Link>
          );
        })}
        <div className="mt-auto text-[9px] font-mono text-ink/40 rotate-180 [writing-mode:vertical-rl] tracking-widest">
          v0.9.4-BETA
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <header className="h-16 border-b-2 border-ink bg-background/80 backdrop-blur sticky top-0 z-20 flex items-center px-6 gap-3">
      <div className="flex items-center gap-3">
        <span className="text-lg font-black italic text-ink" style={{ fontFamily: "var(--font-display)" }}>
          Pixels Studio
        </span>
        <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full bg-accent border-2 border-ink text-[10px] font-mono uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-ink rounded-full animate-pulse" />
          Realm-7 · Live
        </span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]">
          <Coins className="w-4 h-4 text-[oklch(0.55_0.22_45)]" />
          <span className="font-mono text-sm font-bold text-ink">12,480</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60">$PIXEL</span>
        </div>
        <button className="text-xs font-mono uppercase tracking-wider font-bold px-4 h-9 rounded-full bg-accent border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] hover:translate-y-[-1px] transition-transform">
          + Top up
        </button>
        <div className="w-10 h-10 rounded-full bg-primary border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center text-primary-foreground font-mono text-sm font-bold">
          NX
        </div>
      </div>
    </header>
  );
}
