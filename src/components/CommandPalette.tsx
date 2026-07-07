import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Hammer, Users, Store, User, LayoutDashboard, Wallet, Bell, Settings, Sparkles, FileText, Package, Plus, ArrowRight, GraduationCap } from "lucide-react";
import { assets } from "@/lib/marketplace-data";

type Action = {
  id: string;
  label: string;
  hint?: string;
  group: "Jump to" | "Actions" | "Marketplace" | "Help";
  icon: typeof Search;
  to?: string;
  keywords?: string;
};

const staticActions: Action[] = [
  { id: "go-dash",       label: "Dashboard",           group: "Jump to", icon: LayoutDashboard, to: "/studio/dashboard", hint: "G D" },
  { id: "go-create",     label: "Create",              group: "Jump to", icon: Hammer,          to: "/studio/create",    hint: "G C" },
  { id: "go-builder",    label: "Builder",             group: "Jump to", icon: Hammer,          to: "/studio/builder" },
  { id: "go-templates",  label: "Templates",           group: "Jump to", icon: Sparkles,        to: "/studio/templates" },
  { id: "go-hub",        label: "Party Hub",           group: "Jump to", icon: Users,           to: "/hub" },
  { id: "go-market",     label: "Marketplace",         group: "Jump to", icon: Store,           to: "/marketplace" },
  { id: "go-profile",    label: "Profile",             group: "Jump to", icon: User,            to: "/profile" },
  { id: "go-wallet",     label: "Wallet & payouts",    group: "Jump to", icon: Wallet,          to: "/wallet" },
  { id: "go-inbox",      label: "Notifications",       group: "Jump to", icon: Bell,            to: "/notifications" },
  { id: "go-settings",   label: "Settings",            group: "Jump to", icon: Settings,        to: "/settings" },
  { id: "go-pro",        label: "Upgrade to Pro",      group: "Jump to", icon: Sparkles,        to: "/pro" },
  { id: "act-list",      label: "List a new asset",    group: "Actions", icon: Plus,            to: "/marketplace/list", hint: "N A" },
  { id: "act-new-game",  label: "Start a new game",    group: "Actions", icon: Plus,            to: "/studio/create",           hint: "N G" },
  { id: "act-topup",     label: "Top up $PIXEL wallet",group: "Actions", icon: Wallet,          to: "/wallet",           keywords: "buy pixel add funds" },
  { id: "help-tour",     label: "Restart onboarding tour", group: "Help", icon: GraduationCap,  to: "/studio/create",           keywords: "tutorial guide" },
  { id: "help-changelog",label: "What's new",           group: "Help",   icon: FileText,        to: "/changelog" },
  { id: "help-terms",    label: "Terms of use",         group: "Help",   icon: FileText,        to: "/legal/terms" },
  { id: "help-privacy",  label: "Privacy policy",       group: "Help",   icon: FileText,        to: "/legal/privacy" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // close on route change
  useEffect(() => { setOpen(false); setQ(""); setIdx(0); }, [pathname]);

  // ⌘K / Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const assetActions: Action[] = useMemo(
    () =>
      assets.map((a) => ({
        id: `asset-${a.id}`,
        label: a.name,
        hint: a.artist,
        group: "Marketplace" as const,
        icon: Package,
        to: `/marketplace/${a.id}`,
        keywords: `${a.type} ${a.tags?.join(" ") ?? ""} ${a.artist}`,
      })),
    []
  );

  const all = useMemo(() => [...staticActions, ...assetActions], [assetActions]);

  const results = useMemo(() => {
    if (!q.trim()) return all;
    const s = q.toLowerCase();
    return all.filter((a) => (a.label + " " + (a.keywords ?? "") + " " + (a.hint ?? "")).toLowerCase().includes(s));
  }, [q, all]);

  useEffect(() => { setIdx(0); }, [q]);

  function runIndex(i: number) {
    const item = results[i];
    if (!item?.to) return;
    setOpen(false);
    navigate({ to: item.to as never });
  }

  function onKeyInInput(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); runIndex(idx); }
  }

  const grouped = useMemo(() => {
    const g: Record<string, Action[]> = {};
    results.forEach((r) => { (g[r.group] ??= []).push(r); });
    return g;
  }, [results]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 bg-ink/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="w-full max-w-2xl bg-background border-2 border-ink rounded-3xl shadow-[8px_8px_0_0_var(--ink)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 h-14 border-b-2 border-ink bg-white">
              <Search className="w-5 h-5 text-ink/50" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onKeyInInput}
                placeholder="Search actions, pages, assets…"
                className="flex-1 bg-transparent outline-none font-mono text-sm"
              />
              <kbd className="hidden sm:inline-flex items-center px-2 h-6 rounded-md bg-muted border-2 border-ink/30 font-mono text-[10px]">ESC</kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <div className="p-10 text-center text-ink/50 font-mono text-xs">No matches. Try "wallet" or "list an asset".</div>
              )}
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group} className="mb-2">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-ink/50">{group}</div>
                  {items.map((item) => {
                    const globalIndex = results.indexOf(item);
                    const active = globalIndex === idx;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setIdx(globalIndex)}
                        onClick={() => runIndex(globalIndex)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition ${
                          active ? "bg-accent border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]" : "border-2 border-transparent"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl border-2 border-ink flex items-center justify-center shrink-0 ${active ? "bg-primary text-primary-foreground" : "bg-white"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm truncate">{item.label}</div>
                          {item.hint && <div className="text-[11px] font-mono text-ink/60 truncate">{item.hint}</div>}
                        </div>
                        {active && <ArrowRight className="w-4 h-4 text-ink/60" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between px-4 h-9 border-t-2 border-ink bg-muted/30 text-[10px] font-mono uppercase tracking-widest text-ink/50">
              <div className="flex items-center gap-3">
                <span>↑ ↓ navigate</span>
                <span>↵ open</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 h-4 rounded bg-white border border-ink/30 flex items-center">⌘</kbd>
                <kbd className="px-1.5 h-4 rounded bg-white border border-ink/30 flex items-center">K</kbd>
                <span className="ml-1">to toggle</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CommandKButton() {
  const [ismac, setIsmac] = useState(true);
  useEffect(() => { if (typeof navigator !== "undefined") setIsmac(/mac/i.test(navigator.platform)); }, []);
  function open() { window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: ismac, ctrlKey: !ismac, bubbles: true })); }
  return (
    <button
      onClick={open}
      className="hidden md:flex items-center gap-2 h-9 px-3 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] hover:translate-y-[-1px] transition"
    >
      <Search className="w-4 h-4 text-ink/60" />
      <span className="font-mono text-xs text-ink/60">Search or jump…</span>
      <kbd className="ml-2 px-1.5 h-5 rounded bg-muted border border-ink/30 font-mono text-[10px] flex items-center">{ismac ? "⌘" : "Ctrl"}K</kbd>
    </button>
  );
}
