import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader, Stat, Sparkline, SubNav, SubNavLink } from "@/components/hud";
import { Plus, ArrowUpRight, Wallet } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "My Projects — NeoLab Studio" }, { name: "description", content: "Your NeoLab projects, KPIs, and payouts." }],
  }),
  component: () => (
    <AppShell>
      <DashboardPage />
    </AppShell>
  ),
});

type Tab = "overview" | "earnings" | "payouts";
type Status = "Draft" | "In Review" | "Live" | "Rejected";
const statusTone: Record<Status, "violet" | "amber" | "green" | "red"> = {
  Draft: "violet", "In Review": "amber", Live: "green", Rejected: "red",
};

const projects: { name: string; status: Status; plays: string; revenue: string; grad: string; emoji: string }[] = [
  { name: "Rooftop Tag Arena", status: "Live", plays: "48,120", revenue: "12,480 PX", grad: "from-primary/40 to-neon-violet/30", emoji: "🌃" },
  { name: "Neon Snake++", status: "Live", plays: "231,004", revenue: "84,200 PX", grad: "from-neon-green/40 to-accent/30", emoji: "🐍" },
  { name: "Speed Loop 07", status: "In Review", plays: "—", revenue: "—", grad: "from-accent/50 to-primary/20", emoji: "🏁" },
  { name: "Karaoke Bar (Hangout)", status: "Draft", plays: "—", revenue: "—", grad: "from-neon-violet/50 to-primary/20", emoji: "🎤" },
  { name: "Grid Chess", status: "Rejected", plays: "—", revenue: "—", grad: "from-neon-red/30 to-surface-2", emoji: "♛" },
];

function DashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");
  return (
    <div>
      <SubNav>
        <SubNavLink to="/create" label="Welcome" />
        <SubNavLink to="/templates" label="Templates" />
        <SubNavLink to="/builder" label="Editor" />
        <SubNavLink to="/dashboard" label="My Projects" active />
        <SubNavLink to="/pro" label="Upgrade" />
      </SubNav>

      <div className="px-6 py-10 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="// Creator Dashboard"
          title="Your workshop."
          sub="Every project, live or in-progress, plus what it's earning."
          right={
            <Link to="/templates">
              <HudButton variant="primary"><Plus className="w-4 h-4" /> New project</HudButton>
            </Link>
          }
        />

        {/* Project cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {projects.map((p) => (
            <Link key={p.name} to="/builder" className="hud-panel p-0 overflow-hidden group hover:neon-border-magenta transition">
              <div className={`h-32 bg-gradient-to-br ${p.grad} relative flex items-center justify-center`}>
                <div className="text-5xl opacity-90">{p.emoji}</div>
                <div className="absolute inset-0 grid-canvas opacity-25" />
                <div className="absolute top-2 right-2">
                  <Chip tone={statusTone[p.status]}>{p.status}</Chip>
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold">{p.name}</div>
                <div className="mt-2 flex items-center justify-between font-mono text-xs text-muted-foreground">
                  <span>{p.plays} plays</span>
                  <span className="neon-text-amber">{p.revenue}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-border/50 mb-6">
          {(["overview","earnings","payouts"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 h-10 text-xs font-mono uppercase tracking-widest border-b-2 transition ${
                tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >{t}</button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="grid md:grid-cols-4 gap-4">
            <KpiTile label="Plays · 30d" value="279,124" delta="12.4%" tone="magenta" points={[10,15,12,18,25,22,30,28,34,42,38,50]} />
            <KpiTile label="Unique players" value="61,004" delta="8.1%" tone="cyan" points={[5,7,9,8,10,12,15,14,17,20,22,25]} />
            <KpiTile label="Revenue · 30d" value="96,680 PX" delta="21.7%" tone="amber" points={[3,5,6,9,12,10,15,20,18,25,30,42]} />
            <KpiTile label="Avg rating" value="4.72 / 5" delta="0.08" tone="green" points={[4.4,4.5,4.5,4.6,4.6,4.65,4.7,4.7,4.72,4.72,4.72,4.72]} />
          </div>
        )}

        {tab === "earnings" && (
          <div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Stat label="Pending · 7d hold" value="8,240 PX" tone="amber" />
              <Stat label="Cleared" value="42,600 PX" tone="cyan" />
              <Stat label="Withdrawable" value="45,840 PX" tone="magenta" />
            </div>
            <HudCard>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Transactions · last 30 days</div>
                <HudButton variant="ghost">Export CSV</HudButton>
              </div>
              <table className="w-full text-sm">
                <thead className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <tr className="border-b border-border/40">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left">Project</th>
                    <th className="text-left">Type</th>
                    <th className="text-right">Gross</th>
                    <th className="text-right">Your cut (60%)</th>
                    <th className="text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  {[
                    ["2087-04-12","Neon Snake++","Play pass","2,000","1,200","Cleared"],
                    ["2087-04-12","Rooftop Tag","Cosmetic","800","480","Cleared"],
                    ["2087-04-11","Rooftop Tag","Play pass","500","300","Pending"],
                    ["2087-04-10","Neon Snake++","Tip","1,000","600","Cleared"],
                    ["2087-04-09","Rooftop Tag","Play pass","1,500","900","Cleared"],
                  ].map((r, i) => (
                    <tr key={i} className="border-b border-border/20">
                      <td className="py-2 text-muted-foreground">{r[0]}</td>
                      <td>{r[1]}</td>
                      <td className="text-muted-foreground">{r[2]}</td>
                      <td className="text-right">{r[3]} PX</td>
                      <td className="text-right neon-text-amber">{r[4]} PX</td>
                      <td className="text-right">
                        <Chip tone={r[5] === "Cleared" ? "green" : "amber"}>{r[5]}</Chip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </HudCard>
          </div>
        )}

        {tab === "payouts" && (
          <div className="grid md:grid-cols-3 gap-5">
            <div className="md:col-span-2">
              <HudCard glow="amber">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 clip-hud-sm bg-neon-amber/15 border border-neon-amber/50 flex items-center justify-center">
                    <Wallet className="w-5 h-5 neon-text-amber" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Available to withdraw</div>
                    <div className="font-mono text-3xl neon-text-amber">45,840 <span className="text-sm">PIXELS</span></div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Amount</div>
                    <div className="mt-1 h-10 px-3 clip-hud-sm border border-border/60 bg-background/40 flex items-center font-mono text-sm">45,840</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Destination</div>
                    <div className="mt-1 h-10 px-3 clip-hud-sm border border-border/60 bg-background/40 flex items-center font-mono text-sm truncate">cv://wallet/0x7a3…9F2b</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">Network fee: <span className="font-mono">12 PX</span> · settles in ~30s</div>
                  <HudButton variant="amber">Withdraw to wallet →</HudButton>
                </div>
              </HudCard>
            </div>
            <HudCard>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">Payout history</div>
              <ul className="space-y-2 font-mono text-xs">
                {[
                  ["Mar 30","20,000 PX","Confirmed"],
                  ["Mar 12","14,500 PX","Confirmed"],
                  ["Feb 26","8,200 PX","Confirmed"],
                ].map((r, i) => (
                  <li key={i} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                    <span className="text-muted-foreground">{r[0]}</span>
                    <span className="neon-text-amber">{r[1]}</span>
                    <Chip tone="green">{r[2]}</Chip>
                  </li>
                ))}
              </ul>
            </HudCard>
          </div>
        )}
      </div>
    </div>
  );
}

function KpiTile({ label, value, delta, tone, points }: { label: string; value: string; delta: string; tone: "magenta"|"cyan"|"amber"|"green"; points: number[] }) {
  return (
    <div className="hud-panel p-4">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-[10px] font-mono text-neon-green flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" />{delta}</div>
      </div>
      <div className={`mt-2 font-mono text-2xl ${tone === "magenta" ? "neon-text-magenta" : tone === "cyan" ? "neon-text-cyan" : tone === "amber" ? "neon-text-amber" : "text-neon-green"}`}>{value}</div>
      <div className="mt-2"><Sparkline points={points} color={tone} /></div>
    </div>
  );
}
