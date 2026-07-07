import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, Chip, SectionHeader, Stat, Sparkline } from "@/components/hud";
import { reports } from "@/lib/mock-moderation";
import { Shield, AlertTriangle, Users, Package, Gamepad2, DollarSign, TrendingUp, ChevronRight, Lock } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/studio/admin")({
  head: () => ({ meta: [{ title: "Admin Console — Pixels Studio" }, { name: "robots", content: "noindex" }] }),
  component: () => <AppShell><Gate /></AppShell>,
});

// Client-only role gate (demo). Real app would use has_role() on server context.
function Gate() {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  useEffect(() => {
    // Demo: unlocked by default so the demo can be explored. Real app checks a role claim.
    setAllowed(true);
  }, []);
  if (allowed === null) return <div className="p-8 text-center text-sm text-ink/60">Checking role…</div>;
  if (!allowed) return (
    <div className="max-w-md mx-auto p-8 text-center">
      <Lock className="w-10 h-10 mx-auto mb-3" />
      <div className="text-xl font-black italic" style={{ fontFamily: "var(--font-display)" }}>Admin only.</div>
      <p className="text-sm text-ink/60 mt-1">This console is restricted to Pixels Studio staff.</p>
    </div>
  );
  return <Page />;
}

const spark = [12, 18, 14, 22, 28, 20, 34, 42, 38, 46, 52, 60, 55, 68];

function Page() {
  const openReports = reports.filter((r) => r.status === "open" || r.status === "reviewing").length;
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <SectionHeader
        eyebrow="// Admin console · staff only"
        title="Platform health."
        sub="Metrics, moderation queue, and the levers that keep Realm-7 running."
        right={<div className="flex gap-2"><Chip tone="red"><Shield className="w-3 h-3" /> Restricted</Chip></div>}
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Stat label="Daily active" value="128,410" sub="+8.2% w/w" />
        <Stat label="Games shipped" value="8,412" sub="24 today" />
        <Stat label="Marketplace GMV" value="$482K" sub="last 30d" />
        <Stat label="Open reports" value={String(openReports)} sub="requires review" />
      </div>

      {/* Growth chart */}
      <div className="rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_0_var(--ink)] p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">DAU · 14 days</div>
            <div className="text-2xl font-black">128,410</div>
          </div>
          <Chip tone="green"><TrendingUp className="w-3 h-3" /> +12%</Chip>
        </div>
        <Sparkline points={spark} color="magenta" />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/moderation" className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-5 hover:translate-y-[-2px] transition">
          <div className="flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4 text-destructive" /><div className="font-black">Moderation queue</div></div>
          <div className="text-sm text-ink/60">{openReports} open reports</div>
          <div className="mt-3 flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-primary">Open <ChevronRight className="w-3 h-3" /></div>
        </Link>
        <div className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-5">
          <div className="flex items-center gap-2 mb-1"><Users className="w-4 h-4" /><div className="font-black">User management</div></div>
          <div className="text-sm text-ink/60">Search, suspend, promote</div>
          <div className="mt-3 flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-primary">Coming soon</div>
        </div>
        <div className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-5">
          <div className="flex items-center gap-2 mb-1"><DollarSign className="w-4 h-4" /><div className="font-black">Payouts</div></div>
          <div className="text-sm text-ink/60">Review pending withdrawals</div>
          <div className="mt-3 flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-primary">Coming soon</div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
        <div className="p-4 border-b-2 border-ink flex items-center justify-between">
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Latest reports</div>
          <Link to="/moderation" className="text-xs font-mono uppercase tracking-widest text-primary">View all →</Link>
        </div>
        <div className="divide-y-2 divide-ink/10">
          {reports.slice(0, 4).map((r) => (
            <div key={r.id} className="p-4 flex items-center gap-3 hover:bg-muted/40">
              <div className="w-10 h-10 rounded-full bg-destructive/10 border-2 border-destructive/30 flex items-center justify-center shrink-0">
                {r.targetType === "asset" ? <Package className="w-4 h-4" /> : r.targetType === "game" ? <Gamepad2 className="w-4 h-4" /> : <Users className="w-4 h-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold truncate">{r.targetLabel}</div>
                <div className="text-xs font-mono text-ink/60 truncate">{r.reason} · reported by @{r.reporter} · {r.ts}</div>
              </div>
              <Chip tone={r.status === "open" ? "red" : r.status === "reviewing" ? "amber" : r.status === "action-taken" ? "green" : "default"}>{r.status}</Chip>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
