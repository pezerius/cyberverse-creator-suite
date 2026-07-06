import { Link, useRouterState } from "@tanstack/react-router";
import { Gamepad2, Hammer, Users, Store, User, Coins, Settings, Menu, X, Activity, Heart, Shield, Package, LayoutDashboard, Sparkles, Home, Library, Shirt, Swords } from "lucide-react";
import { useState, type ReactNode } from "react";
import { CommandPalette, CommandKButton } from "@/components/CommandPalette";
import { NotificationsBell } from "@/components/NotificationsBell";
import { OnboardingTour } from "@/components/OnboardingTour";
import { useMode, type AppMode } from "@/lib/mode";

type NavItem = { to: string; icon: typeof Gamepad2; label: string; disabled?: boolean; tip?: string };

const playerNav: NavItem[] = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/play", icon: Gamepad2, label: "Play", disabled: true, tip: "CyberVerse core game" },
  { to: "/library", icon: Library, label: "Library" },
  { to: "/marketplace", icon: Store, label: "Shop" },
  { to: "/locker", icon: Shirt, label: "Locker" },
  { to: "/hub", icon: Users, label: "Party Hub" },
  { to: "/wallet", icon: Coins, label: "Wallet" },
  { to: "/wishlist", icon: Heart, label: "Wishlist" },
  { to: "/profile", icon: User, label: "Profile" },
];

const creatorNav: NavItem[] = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/create", icon: Hammer, label: "Create" },
  { to: "/inventory", icon: Package, label: "My UGC" },
  { to: "/marketplace", icon: Store, label: "Marketplace" },
  { to: "/feed", icon: Activity, label: "Feed" },
  { to: "/hub", icon: Users, label: "Party Hub" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/pro", icon: Sparkles, label: "Upgrade" },
  { to: "/admin", icon: Shield, label: "Admin" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, setMode } = useMode();
  const navItems = mode === "play" ? playerNav : creatorNav;

  const isActive = (item: NavItem) => {
    if (item.disabled) return false;
    if (item.to === "/create") return pathname === "/create" || pathname === "/templates" || pathname.startsWith("/builder");
    if (item.to === "/marketplace") return pathname.startsWith("/marketplace") || pathname.startsWith("/collections");
    if (item.to === "/admin") return pathname.startsWith("/admin") || pathname.startsWith("/moderation");
    return pathname.startsWith(item.to);
  };

  return (
    <div className="min-h-screen w-full flex text-foreground">
      <CommandPalette />
      <OnboardingTour />

      {/* Desktop rail */}
      <aside className="hidden lg:flex w-20 shrink-0 border-r-2 border-ink bg-white flex-col items-center py-4 gap-3 sticky top-0 h-screen z-30">
        <Link to={mode === "play" ? "/home" : "/create"} className="mb-2" aria-label="Pixels Studio">
          <div className="w-12 h-12 rounded-2xl bg-primary border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center">
            <span className="text-primary-foreground text-[10px] font-bold" style={{ fontFamily: "var(--font-pixel)" }}>PX</span>
          </div>
        </Link>
        {navItems.map((item) => {
          const Icon = item.icon; const active = isActive(item);
          if (item.disabled) return (
            <div key={item.label} title={item.tip} className="relative w-12 h-12 rounded-2xl border-2 border-ink/20 bg-muted/40 flex items-center justify-center text-ink/30 cursor-not-allowed group">
              <Icon className="w-5 h-5" strokeWidth={2} />
              <span className="absolute left-full ml-3 whitespace-nowrap px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-ink text-background border-2 border-ink rounded-md opacity-0 group-hover:opacity-100 pointer-events-none z-40">{item.tip}</span>
            </div>
          );
          return (
            <Link key={item.label} to={item.to as never}
              className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition group border-2 ${active ? "bg-accent text-ink border-ink shadow-[3px_3px_0_0_var(--ink)]" : "text-ink/70 hover:text-ink hover:bg-muted border-transparent hover:border-ink"}`}
              aria-label={item.label}>
              <Icon className="w-5 h-5" strokeWidth={2} />
              <span className="absolute left-full ml-3 whitespace-nowrap px-2 py-1 text-[10px] font-mono uppercase tracking-wider bg-ink text-background rounded-md opacity-0 group-hover:opacity-100 pointer-events-none z-40">{item.label}</span>
            </Link>
          );
        })}
        <div className="mt-auto flex flex-col items-center gap-2">
          <ModeToggleMini mode={mode} setMode={setMode} />
          <div className="text-[9px] font-mono text-ink/40 rotate-180 [writing-mode:vertical-rl] tracking-widest">v0.9.4-BETA</div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white border-r-2 border-ink shadow-[6px_0_0_0_var(--ink)] p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-black italic" style={{ fontFamily: "var(--font-display)" }}>Pixels Studio</span>
              <button onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center"><X className="w-4 h-4" /></button>
            </div>
            <ModeToggleFull mode={mode} setMode={setMode} />
            <nav className="mt-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon; const active = isActive(item);
                if (item.disabled) return (
                  <div key={item.label} className="flex items-center gap-3 px-3 h-11 rounded-xl border-2 border-ink/20 bg-muted/40 text-ink/40">
                    <Icon className="w-4 h-4" /><span className="font-mono text-xs uppercase tracking-widest">{item.label}</span>
                    <span className="ml-auto text-[9px] font-mono">SOON</span>
                  </div>
                );
                return (
                  <Link key={item.label} to={item.to as never} onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 h-11 rounded-xl border-2 ${active ? "bg-accent text-ink border-ink shadow-[3px_3px_0_0_var(--ink)]" : "border-transparent hover:border-ink"}`}>
                    <Icon className="w-4 h-4" /><span className="font-mono text-xs uppercase tracking-widest">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onOpenMobile={() => setMobileOpen(true)} mode={mode} setMode={setMode} />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}

function ModeToggleMini({ mode, setMode }: { mode: AppMode; setMode: (m: AppMode) => void }) {
  return (
    <div className="flex flex-col items-center gap-1 p-1 rounded-2xl border-2 border-ink bg-white shadow-[2px_2px_0_0_var(--ink)]">
      <button onClick={() => setMode("play")} title="Play mode"
        className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 ${mode === "play" ? "bg-primary text-primary-foreground border-ink" : "border-transparent text-ink/60 hover:text-ink"}`}>
        <Swords className="w-4 h-4" />
      </button>
      <button onClick={() => setMode("create")} title="Create mode"
        className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 ${mode === "create" ? "bg-accent text-ink border-ink" : "border-transparent text-ink/60 hover:text-ink"}`}>
        <Hammer className="w-4 h-4" />
      </button>
    </div>
  );
}

function ModeToggleFull({ mode, setMode }: { mode: AppMode; setMode: (m: AppMode) => void }) {
  return (
    <div className="grid grid-cols-2 gap-1 p-1 rounded-2xl border-2 border-ink bg-white shadow-[2px_2px_0_0_var(--ink)]">
      <button onClick={() => setMode("play")}
        className={`h-9 rounded-xl flex items-center justify-center gap-2 border-2 font-mono text-[10px] uppercase tracking-widest ${mode === "play" ? "bg-primary text-primary-foreground border-ink" : "border-transparent text-ink/60"}`}>
        <Swords className="w-3.5 h-3.5" /> Play
      </button>
      <button onClick={() => setMode("create")}
        className={`h-9 rounded-xl flex items-center justify-center gap-2 border-2 font-mono text-[10px] uppercase tracking-widest ${mode === "create" ? "bg-accent text-ink border-ink" : "border-transparent text-ink/60"}`}>
        <Hammer className="w-3.5 h-3.5" /> Create
      </button>
    </div>
  );
}

function TopBar({ onOpenMobile, mode, setMode }: { onOpenMobile: () => void; mode: AppMode; setMode: (m: AppMode) => void }) {
  return (
    <header className="h-16 border-b-2 border-ink bg-background/80 backdrop-blur sticky top-0 z-20 flex items-center px-4 md:px-6 gap-2 md:gap-3">
      <button onClick={onOpenMobile} className="lg:hidden w-10 h-10 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center shrink-0">
        <Menu className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-lg font-black italic text-ink truncate" style={{ fontFamily: "var(--font-display)" }}>Pixels Studio</span>
        <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full bg-accent border-2 border-ink text-[10px] font-mono uppercase tracking-widest shrink-0">
          <span className="w-1.5 h-1.5 bg-ink rounded-full animate-pulse" /> Realm-7 · Live
        </span>
      </div>
      <div className="ml-auto flex items-center gap-2 md:gap-3 shrink-0">
        {/* Desktop mode toggle */}
        <div className="hidden md:flex items-center gap-0.5 p-0.5 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]">
          <button onClick={() => setMode("play")}
            className={`flex items-center gap-1.5 px-3 h-8 rounded-full font-mono text-[10px] uppercase tracking-widest transition ${mode === "play" ? "bg-primary text-primary-foreground" : "text-ink/60 hover:text-ink"}`}>
            <Swords className="w-3.5 h-3.5" /> Play
          </button>
          <button onClick={() => setMode("create")}
            className={`flex items-center gap-1.5 px-3 h-8 rounded-full font-mono text-[10px] uppercase tracking-widest transition ${mode === "create" ? "bg-accent text-ink" : "text-ink/60 hover:text-ink"}`}>
            <Hammer className="w-3.5 h-3.5" /> Create
          </button>
        </div>
        <div className="hidden md:block"><CommandKButton /></div>
        <Link to="/wallet" className="hidden md:flex items-center gap-2 px-3 h-9 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] hover:translate-y-[-1px] transition">
          <Coins className="w-4 h-4 text-[oklch(0.55_0.22_45)]" />
          <span className="font-mono text-sm font-bold text-ink">12,480</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60">$PIXEL</span>
        </Link>
        <NotificationsBell />
        <Link to="/settings" aria-label="Settings" className="hidden sm:flex w-10 h-10 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] items-center justify-center">
          <Settings className="w-4 h-4" />
        </Link>
        <Link to="/profile" className="w-10 h-10 rounded-full bg-primary border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center text-primary-foreground font-mono text-sm font-bold shrink-0">NX</Link>
      </div>
    </header>
  );
}

