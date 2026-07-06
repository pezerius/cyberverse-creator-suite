import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader, Stat, Sparkline, SubNav, SubNavLink } from "@/components/hud";
import { Plus, ArrowUpRight, Wallet, TrendingUp, Users, DollarSign, Star, Zap, Globe } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Growth Board — Pixels Studio" }, { name: "description", content: "Track revenue, players, and payouts across your Pixels Studio catalog." }],
  }),
  component: () => (
    <AppShell>
      <DashboardPage />
    </AppShell>
  ),
});

type Tab = "overview" | "growth" | "earnings" | "payouts";
type Status = "Draft" | "In Review" | "Live" | "Rejected";
const statusTone: Record<Status, "violet" | "amber" | "green" | "red"> = {
  Draft: "violet", "In Review": "amber", Live: "green", Rejected: "red",
};

const projects: { name: string; slug?: string; status: Status; plays: string; revenue: string; grad: string; emoji: string }[] = [
  { name: "Rooftop Tag Arena", slug: "blade-runners-4884", status: "Live", plays: "48,120", revenue: "12,480 PX", grad: "from-primary/40 to-[oklch(0.72_0.18_290)]/30", emoji: "🌃" },
  { name: "Neon Snake++", slug: "neon-snake", status: "Live", plays: "231,004", revenue: "84,200 PX", grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/30", emoji: "🐍" },
  { name: "Speed Loop 07", status: "In Review", plays: "—", revenue: "—", grad: "from-[oklch(0.75_0.20_50)]/60 to-primary/20", emoji: "🏁" },
  { name: "Karaoke Bar (Hangout)", status: "Draft", plays: "—", revenue: "—", grad: "from-[oklch(0.72_0.18_290)]/50 to-primary/20", emoji: "🎤" },
  { name: "Grid Chess", slug: "grid-duel", status: "Rejected", plays: "—", revenue: "—", grad: "from-destructive/30 to-muted", emoji: "♛" },
];

// 30-day series
const revenueSeries = [3.2,3.5,3.1,3.8,4.2,4.0,4.6,5.1,4.8,5.5,6.0,5.7,6.4,6.9,6.5,7.2,7.8,7.4,8.1,8.7,8.3,9.0,9.6,9.2,10.1,10.8,10.4,11.3,12.0,12.5];
const playersSeries = [12,14,13,16,18,17,20,22,21,24,26,25,28,30,29,32,35,33,36,39,37,41,44,42,46,49,47,52,55,58];
const retentionSeries = [42,44,45,46,47,47,48,48,49,50,50,51,52,52,53,54,54,55,56,56,57,58,58,59,60,60,61,62,62,63];

function DashboardPage() {
  const [tab, setTab] = useState<Tab>("growth");
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
          title="Your growth board."
          sub="Every project, every play, every $PIXEL — one view."
          right={
            <div className="flex gap-2">
              <select className="h-10 px-3 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest font-bold">
                <option>Last 30 days</option><option>Last 7 days</option><option>Last 90 days</option><option>Year to date</option>
              </select>
              <Link to="/templates">
                <HudButton variant="primary"><Plus className="w-4 h-4" /> New project</HudButton>
              </Link>
            </div>
          }
        />

        {/* KPI band always visible */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KpiTile label="Revenue · 30d" value="96,680 PX" delta="+21.7%" tone="magenta" icon={<DollarSign className="w-4 h-4" />} points={revenueSeries} />
          <KpiTile label="Active players" value="61,004" delta="+8.1%" tone="cyan" icon={<Users className="w-4 h-4" />} points={playersSeries} />
          <KpiTile label="Plays · 30d" value="279,124" delta="+12.4%" tone="amber" icon={<Zap className="w-4 h-4" />} points={playersSeries.map(x => x*4)} />
          <KpiTile label="Avg rating" value="4.72 / 5" delta="+0.08" tone="green" icon={<Star className="w-4 h-4" />} points={retentionSeries.map(x => x/13)} />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {(["overview","growth","earnings","payouts"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 h-9 rounded-full text-xs font-mono uppercase tracking-widest font-bold border-2 transition ${
                tab === t
                  ? "bg-primary text-primary-foreground border-ink shadow-[2px_2px_0_0_var(--ink)]"
                  : "bg-white text-ink border-ink/30 hover:border-ink"
              }`}
            >{t}</button>
          ))}
        </div>

        {tab === "overview" && <OverviewPanel />}
        {tab === "growth" && <GrowthPanel />}
        {tab === "earnings" && <EarningsPanel />}
        {tab === "payouts" && <PayoutsPanel />}
      </div>
    </div>
  );
}

function OverviewPanel() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {projects.map((p) => (
        <div key={p.name} className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] overflow-hidden group hover:translate-y-[-2px] transition-transform">
          <Link to="/builder" className="block">
            <div className={`h-32 bg-gradient-to-br ${p.grad} relative flex items-center justify-center border-b-2 border-ink`}>
              <div className="text-5xl">{p.emoji}</div>
              <div className="absolute top-2 right-2"><Chip tone={statusTone[p.status]}>{p.status}</Chip></div>
            </div>
          </Link>
          <div className="p-4">
            <div className="font-bold text-lg italic" style={{ fontFamily: "var(--font-display)" }}>{p.name}</div>
            <div className="mt-2 flex items-center justify-between font-mono text-xs">
              <span className="text-ink/60">{p.plays} plays</span>
              <span className="text-[oklch(0.55_0.22_45)] font-bold">{p.revenue}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Link to="/builder" className="flex-1"><HudButton size="sm" variant="ghost" className="w-full">Open editor</HudButton></Link>
              {p.slug ? (
                <Link to="/manage/$kind/$id" params={{ kind: "game", id: p.slug }}><HudButton size="sm" variant="secondary">Manage</HudButton></Link>
              ) : (
                <HudButton size="sm" variant="secondary" disabled>Manage</HudButton>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GrowthPanel() {
  return (
    <div className="space-y-5">
      {/* Revenue chart */}
      <HudCard>
        <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Revenue · last 30 days</div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="italic font-black text-4xl" style={{ fontFamily: "var(--font-display)" }}>96,680 <span className="text-lg">$PIXEL</span></span>
              <span className="inline-flex items-center gap-1 px-2 h-6 rounded-full bg-accent border-2 border-ink text-[10px] font-mono uppercase tracking-widest">
                <TrendingUp className="w-3 h-3" /> +21.7%
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest"><span className="w-3 h-3 rounded-sm bg-primary border border-ink" /> Revenue</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest"><span className="w-3 h-3 rounded-sm bg-accent border border-ink" /> Prev period</span>
          </div>
        </div>
        <BigAreaChart data={revenueSeries} data2={revenueSeries.map(x => x*0.78)} unit="k PX" />
      </HudCard>

      {/* Two-up */}
      <div className="grid md:grid-cols-2 gap-5">
        <HudCard>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Active players · daily</div>
          <div className="mt-1 italic font-black text-3xl" style={{ fontFamily: "var(--font-display)" }}>61,004</div>
          <BigAreaChart data={playersSeries} color="cyan" unit="k" height={130} />
        </HudCard>
        <HudCard>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Day-7 retention</div>
          <div className="mt-1 italic font-black text-3xl" style={{ fontFamily: "var(--font-display)" }}>63%</div>
          <BigAreaChart data={retentionSeries} color="amber" unit="%" height={130} />
        </HudCard>
      </div>

      {/* Top games + geography */}
      <div className="grid lg:grid-cols-5 gap-5">
        <HudCard className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Top games this month</div>
            <HudButton variant="ghost">View all</HudButton>
          </div>
          <div className="space-y-2">
            {[
              { n: "Neon Snake++", plays: "231k", rev: "84,200 PX", pct: 100, emoji: "🐍" },
              { n: "Rooftop Tag Arena", plays: "48k", rev: "12,480 PX", pct: 42, emoji: "🌃" },
              { n: "Slum Speedway", plays: "34k", rev: "8,900 PX", pct: 32, emoji: "🏎" },
              { n: "Data Heist", plays: "12k", rev: "3,100 PX", pct: 12, emoji: "💾" },
              { n: "Grid Duel", plays: "8k", rev: "1,600 PX", pct: 8, emoji: "⚔" },
            ].map((r) => (
              <div key={r.n} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 border-2 border-ink/10 hover:border-ink transition">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center text-xl">{r.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate">{r.n}</div>
                  <div className="mt-1 h-2 rounded-full bg-ink/10 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-xs text-ink/60">{r.plays} plays</div>
                  <div className="font-mono text-sm text-[oklch(0.55_0.22_45)] font-bold">{r.rev}</div>
                </div>
              </div>
            ))}
          </div>
        </HudCard>
        <HudCard className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4" />
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Players by region</div>
          </div>
          <div className="space-y-3">
            {[
              ["NA-East", 38, "primary"],
              ["EU-West", 24, "accent"],
              ["APAC-Tokyo", 18, "amber"],
              ["LATAM", 12, "cyan"],
              ["Other", 8, "violet"],
            ].map(([region, pct]) => (
              <div key={region as string}>
                <div className="flex justify-between text-xs font-mono">
                  <span>{region}</span>
                  <span className="font-bold">{pct}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-ink/10 overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t-2 border-ink/10">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">Peak concurrent</div>
            <div className="italic font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>2,847 <span className="text-sm">players</span></div>
            <div className="text-[10px] font-mono text-ink/50 mt-1">Yesterday · 21:14 REALM-7</div>
          </div>
        </HudCard>
      </div>

      {/* Recent activity feed */}
      <HudCard>
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">Live activity</div>
        <div className="space-y-1.5 font-mono text-xs">
          {[
            ["21:14", "New play pass sold", "Neon Snake++", "+40 PX"],
            ["21:12", "5-star rating", "Rooftop Tag Arena", "@yumi.play"],
            ["21:09", "Cosmetic purchased", "Neon Snake++", "+120 PX"],
            ["21:04", "New follower", "—", "@wire.head"],
            ["20:58", "Milestone: 50k plays", "Rooftop Tag Arena", "🎉"],
            ["20:51", "Tip received", "Neon Snake++", "+250 PX"],
          ].map(([t, ev, proj, val], i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b-2 border-ink/10 last:border-0">
              <span className="text-ink/50 w-12">{t}</span>
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <span className="flex-1">{ev}</span>
              <span className="text-ink/60 truncate max-w-[160px]">{proj}</span>
              <span className="text-[oklch(0.55_0.22_45)] font-bold">{val}</span>
            </div>
          ))}
        </div>
      </HudCard>
    </div>
  );
}

function EarningsPanel() {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Stat label="Pending · 7d hold" value="8,240 PX" tone="amber" />
        <Stat label="Cleared" value="42,600 PX" tone="cyan" />
        <Stat label="Withdrawable" value="45,840 PX" tone="magenta" />
      </div>
      <HudCard>
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Transactions · last 30 days</div>
          <HudButton variant="ghost">Export CSV</HudButton>
        </div>
        <table className="w-full text-sm">
          <thead className="text-[10px] font-mono uppercase tracking-widest text-ink/60">
            <tr className="border-b-2 border-ink/20">
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
              <tr key={i} className="border-b border-ink/10">
                <td className="py-2 text-ink/60">{r[0]}</td>
                <td>{r[1]}</td>
                <td className="text-ink/60">{r[2]}</td>
                <td className="text-right">{r[3]} PX</td>
                <td className="text-right text-[oklch(0.55_0.22_45)] font-bold">{r[4]} PX</td>
                <td className="text-right">
                  <Chip tone={r[5] === "Cleared" ? "green" : "amber"}>{r[5]}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HudCard>
    </div>
  );
}

function PayoutsPanel() {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      <div className="md:col-span-2">
        <HudCard glow="amber">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[oklch(0.75_0.20_50)] border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center">
              <Wallet className="w-5 h-5 text-ink" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Available to withdraw</div>
              <div className="italic font-black text-4xl" style={{ fontFamily: "var(--font-display)" }}>45,840 <span className="text-lg">$PIXEL</span></div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Amount</div>
              <div className="mt-1 h-11 px-3 rounded-full border-2 border-ink bg-white flex items-center font-mono text-sm font-bold">45,840</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Destination</div>
              <div className="mt-1 h-11 px-3 rounded-full border-2 border-ink bg-white flex items-center font-mono text-sm truncate">px://wallet/0x7a3…9F2b</div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="text-xs text-ink/60">Network fee: <span className="font-mono font-bold">12 PX</span> · settles in ~30s</div>
            <HudButton variant="amber">Withdraw to wallet →</HudButton>
          </div>
        </HudCard>
      </div>
      <HudCard>
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">Payout history</div>
        <ul className="space-y-2 font-mono text-xs">
          {[
            ["Mar 30","20,000 PX","Confirmed"],
            ["Mar 12","14,500 PX","Confirmed"],
            ["Feb 26","8,200 PX","Confirmed"],
          ].map((r, i) => (
            <li key={i} className="flex items-center justify-between py-2 border-b-2 border-ink/10 last:border-0">
              <span className="text-ink/60">{r[0]}</span>
              <span className="text-[oklch(0.55_0.22_45)] font-bold">{r[1]}</span>
              <Chip tone="green">{r[2]}</Chip>
            </li>
          ))}
        </ul>
      </HudCard>
    </div>
  );
}

function KpiTile({ label, value, delta, tone, points, icon }: { label: string; value: string; delta: string; tone: "magenta"|"cyan"|"amber"|"green"; points: number[]; icon?: React.ReactNode }) {
  const bgs = {
    magenta: "bg-primary/10",
    cyan: "bg-[oklch(0.94_0.05_220)]",
    amber: "bg-[oklch(0.95_0.08_60)]",
    green: "bg-accent/40",
  };
  const fg = {
    magenta: "text-primary",
    cyan: "text-[oklch(0.45_0.18_260)]",
    amber: "text-[oklch(0.55_0.22_45)]",
    green: "text-[oklch(0.45_0.20_140)]",
  };
  return (
    <div className={`border-2 border-ink rounded-3xl shadow-[3px_3px_0_0_var(--ink)] p-4 ${bgs[tone]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-ink/70">
          {icon} {label}
        </div>
        <div className="text-[10px] font-mono text-[oklch(0.45_0.20_140)] font-bold flex items-center gap-0.5">
          <ArrowUpRight className="w-3 h-3" />{delta}
        </div>
      </div>
      <div className={`mt-2 italic font-black text-2xl ${fg[tone]}`} style={{ fontFamily: "var(--font-display)" }}>{value}</div>
      <div className="mt-2"><Sparkline points={points} color={tone} /></div>
    </div>
  );
}

function BigAreaChart({ data, data2, color = "magenta", unit = "", height = 180 }: { data: number[]; data2?: number[]; color?: "magenta"|"cyan"|"amber"; unit?: string; height?: number }) {
  const w = 800;
  const h = height;
  const max = Math.max(...data, ...(data2 || [0])) * 1.1;
  const toPath = (arr: number[]) => arr.map((v, i) => {
    const x = (i / (arr.length - 1)) * w;
    const y = h - (v / max) * (h - 20) - 10;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const colors = {
    magenta: { stroke: "var(--primary)", fill: "var(--primary)" },
    cyan: { stroke: "oklch(0.55 0.18 220)", fill: "oklch(0.55 0.18 220)" },
    amber: { stroke: "oklch(0.55 0.22 45)", fill: "oklch(0.55 0.22 45)" },
  };
  const c = colors[color];
  return (
    <div className="relative">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} preserveAspectRatio="none">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={0} x2={w} y1={h * f} y2={h * f} stroke="var(--ink)" strokeOpacity="0.08" strokeDasharray="4 4" />
        ))}
        {data2 && <path d={`${toPath(data2)} L${w},${h} L0,${h} Z`} fill="var(--accent)" opacity="0.4" />}
        {data2 && <path d={toPath(data2)} fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />}
        <path d={`${toPath(data)} L${w},${h} L0,${h} Z`} fill={c.fill} opacity="0.15" />
        <path d={toPath(data)} fill="none" stroke={c.stroke} strokeWidth="2.5" />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * w;
          const y = h - (v / max) * (h - 20) - 10;
          if (i % 5 !== 0 && i !== data.length - 1) return null;
          return <circle key={i} cx={x} cy={y} r="4" fill="var(--background)" stroke={c.stroke} strokeWidth="2" />;
        })}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] font-mono text-ink/50 px-1">
        <span>Day 1</span><span>Day 10</span><span>Day 20</span><span>Day 30 ({data[data.length-1].toFixed(1)}{unit})</span>
      </div>
    </div>
  );
}
