import { Link, useRouterState } from "@tanstack/react-router";
import { Gamepad2, Hammer, Users, Store, User, Coins } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  { to: "/play", icon: Gamepad2, label: "Play", disabled: true, tip: "CyberVerse core game" },
  { to: "/create", icon: Hammer, label: "Create" },
  { to: "/hub", icon: Users, label: "Party Hub" },
  { to: "/marketplace", icon: Store, label: "Marketplace" },
  { to: "/profile", icon: User, label: "Profile" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full flex text-foreground scanlines">
      {/* Left icon rail */}
      <aside className="w-16 shrink-0 border-r border-border/60 bg-[oklch(0.12_0.03_300)]/80 backdrop-blur flex flex-col items-center py-4 gap-2 sticky top-0 h-screen z-30">
        <Link to="/create" className="mb-4 group" aria-label="NeoLab Studio home">
          <div className="w-10 h-10 clip-hud-sm bg-primary/15 border border-primary/40 flex items-center justify-center neon-border-magenta">
            <span className="font-mono font-bold text-primary text-sm">NL</span>
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
                className="relative w-11 h-11 clip-hud-sm border border-border/40 bg-surface-1/40 flex items-center justify-center text-muted-foreground/50 cursor-not-allowed group"
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                <span className="absolute left-full ml-3 whitespace-nowrap px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-popover border border-border opacity-0 group-hover:opacity-100 pointer-events-none z-40 clip-hud-sm">
                  {item.tip}
                </span>
              </div>
            );
          }
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`relative w-11 h-11 clip-hud-sm flex items-center justify-center transition group ${
                active
                  ? "bg-primary/15 text-primary neon-border-magenta"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-2/60 border border-border/40"
              }`}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute left-full ml-3 whitespace-nowrap px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-popover border border-border opacity-0 group-hover:opacity-100 pointer-events-none z-40 clip-hud-sm">
                {item.label}
              </span>
            </Link>
          );
        })}
        <div className="mt-auto text-[9px] font-mono text-muted-foreground/60 rotate-180 [writing-mode:vertical-rl] tracking-widest">
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
    <header className="h-14 border-b border-border/60 bg-[oklch(0.12_0.03_300)]/70 backdrop-blur sticky top-0 z-20 flex items-center px-4 gap-3">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
        <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
        <span>NeoLab Studio</span>
        <span className="text-muted-foreground/50">/</span>
        <span className="text-foreground">CyberVerse Node · SHARD-7</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 h-8 clip-hud-sm bg-neon-amber/10 border border-neon-amber/40 neon-border-amber">
          <Coins className="w-4 h-4 neon-text-amber" />
          <span className="font-mono text-sm neon-text-amber">12,480</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-neon-amber/70">PIXELS</span>
        </div>
        <button className="text-xs font-mono uppercase tracking-wider px-3 h-8 clip-hud-sm bg-surface-2 border border-border hover:border-primary/60 transition">
          + Top up
        </button>
        <div className="w-9 h-9 clip-hud-sm bg-gradient-to-br from-primary to-neon-violet border border-primary/60 flex items-center justify-center font-mono text-sm font-bold">
          NX
        </div>
      </div>
    </header>
  );
}
