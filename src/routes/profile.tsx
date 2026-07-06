import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { CheckCircle2, Star, Users, Trophy, Music2, Palette, Grid3x3, Download, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "@nx — Creator Profile" }, { name: "description", content: "Pixels Studio creator profile." }],
  }),
  component: () => (
    <AppShell>
      <ProfilePage />
    </AppShell>
  ),
});

const games = [
  { name: "Rooftop Tag Arena", plays: "48,120", grad: "from-primary/40 to-[oklch(0.72_0.18_290)]/30", emoji: "🌃" },
  { name: "Neon Snake++", plays: "231,004", grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/30", emoji: "🐍" },
  { name: "Karaoke Bar", plays: "9,220", grad: "from-[oklch(0.72_0.18_290)]/50 to-primary/30", emoji: "🎤" },
  { name: "Grid Duel", plays: "18,110", grad: "from-destructive/40 to-[oklch(0.75_0.20_50)]/40", emoji: "⚔" },
  { name: "Slum Speedway", plays: "34,800", grad: "from-[oklch(0.75_0.20_50)]/60 to-accent/40", emoji: "🏎" },
  { name: "Data Heist", plays: "6,540", grad: "from-primary/50 to-accent/30", emoji: "💾" },
];

type PurchaseType = "Sprites" | "SFX" | "Tileset";
const purchases: { date: string; name: string; artist: string; type: PurchaseType; license: string; price: string; status: "Delivered" | "In escrow" | "Refunded"; order: string; icon: typeof Music2 }[] = [
  { date: "2087-04-12", name: "Neon Rooftops Set", artist: "@nightbird", type: "Tileset", license: "All My Games", price: "1,600 PX", status: "Delivered", order: "px_08421", icon: Grid3x3 },
  { date: "2087-04-08", name: "Bassline / SFX 07", artist: "@808heart", type: "SFX", license: "Resellable", price: "2,400 PX", status: "Delivered", order: "px_08398", icon: Music2 },
  { date: "2087-04-03", name: "Runner Sprite Pack v3", artist: "@pixel.moth", type: "Sprites", license: "Single Game", price: "800 PX", status: "In escrow", order: "px_08371", icon: Palette },
  { date: "2087-03-29", name: "Arcade UI Sprites", artist: "@ui.forge", type: "Sprites", license: "Single Game", price: "600 PX", status: "Delivered", order: "px_08340", icon: Palette },
  { date: "2087-03-22", name: "8-bit Blaster SFX", artist: "@zap", type: "SFX", license: "Single Game", price: "400 PX", status: "Refunded", order: "px_08301", icon: Music2 },
];

const statusTone: Record<string, "green" | "amber" | "red"> = {
  Delivered: "green",
  "In escrow": "amber",
  Refunded: "red",
};

function ProfilePage() {
  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      {/* Hero */}
      <div className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center italic font-black text-4xl shrink-0" style={{ fontFamily: "var(--font-display)" }}>
          NX
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="italic font-black text-4xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>@nx</h1>
            <Chip tone="cyan"><CheckCircle2 className="w-3 h-3" /> Verified Creator</Chip>
            <Chip tone="amber">Pro · Tier 2</Chip>
          </div>
          <p className="mt-2 text-ink/70 max-w-xl">
            Making rooftop games in a rain-soaked city. Prev: art on the Sector-9 heist mission. Currently obsessed with slow-motion tag mechanics.
          </p>
          <div className="mt-3 flex gap-2 flex-wrap">
            <Chip>REALM-7</Chip>
            <Chip>Joined 2085</Chip>
            <Chip>Speaks EN · JP</Chip>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <HudButton variant="primary">+ Follow</HudButton>
          <HudButton variant="secondary">Tip in $PIXEL</HudButton>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Published" value="6" icon={<Trophy className="w-4 h-4 text-primary" />} />
        <StatCard label="Followers" value="8,204" icon={<Users className="w-4 h-4 text-[oklch(0.45_0.18_260)]" />} />
        <StatCard label="Avg rating" value="4.72" icon={<Star className="w-4 h-4 text-[oklch(0.55_0.22_45)]" />} />
        <StatCard label="$PIXEL earned" value="284,120" icon={<span className="text-[oklch(0.55_0.22_45)] font-mono text-xs font-bold">PX</span>} />
      </div>

      {/* Portfolio */}
      <SectionHeader eyebrow="// Portfolio" title="Games shipped" sub="Newest first." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((g) => (
          <Link key={g.name} to="/hub" className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] overflow-hidden group hover:translate-y-[-2px] transition-transform">
            <div className={`h-36 bg-gradient-to-br ${g.grad} relative flex items-center justify-center border-b-2 border-ink`}>
              <div className="text-6xl group-hover:scale-110 transition">{g.emoji}</div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="font-bold italic text-lg" style={{ fontFamily: "var(--font-display)" }}>{g.name}</div>
              <div className="font-mono text-xs text-ink/60">{g.plays} plays</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Purchase history */}
      <SectionHeader
        eyebrow="// Purchase history"
        title="Marketplace receipts."
        sub="Every asset you've licensed. Download, re-download, or request a refund within 24 hours."
        right={<Link to="/marketplace"><HudButton variant="secondary">Browse marketplace</HudButton></Link>}
      />
      <HudCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-[10px] font-mono uppercase tracking-widest text-ink/60 bg-muted/40">
              <tr className="border-b-2 border-ink/20">
                <th className="text-left py-3 pl-5">Date</th>
                <th className="text-left">Asset</th>
                <th className="text-left">License</th>
                <th className="text-right">Price</th>
                <th className="text-left pl-4">Status</th>
                <th className="text-right pr-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((p) => {
                const Icon = p.icon;
                return (
                  <tr key={p.order} className="border-b border-ink/10 hover:bg-muted/30">
                    <td className="py-3 pl-5 font-mono text-xs text-ink/60">{p.date}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl border-2 border-ink bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold">{p.name}</div>
                          <div className="text-[11px] font-mono text-ink/60">by {p.artist} · {p.type} · {p.order}</div>
                        </div>
                      </div>
                    </td>
                    <td><Chip tone={p.license === "Resellable" ? "magenta" : p.license === "All My Games" ? "amber" : "cyan"}>{p.license}</Chip></td>
                    <td className="text-right font-mono text-sm font-bold text-primary">{p.price}</td>
                    <td className="pl-4"><Chip tone={statusTone[p.status]}>{p.status}</Chip></td>
                    <td className="text-right pr-5">
                      <div className="inline-flex gap-1">
                        <button className="w-8 h-8 rounded-full bg-white border-2 border-ink hover:bg-accent flex items-center justify-center" title="Re-download">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-white border-2 border-ink hover:bg-accent flex items-center justify-center" title="Open in editor">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex items-center justify-between border-t-2 border-ink/10 bg-muted/30">
          <div className="text-xs font-mono text-ink/60">
            5 purchases · <span className="font-bold text-ink">5,800 $PIXEL</span> spent this month
          </div>
          <HudButton variant="ghost">Export receipts (CSV)</HudButton>
        </div>
      </HudCard>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <HudCard>
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-ink/60">
        {icon} {label}
      </div>
      <div className="mt-2 italic font-black text-3xl" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
    </HudCard>
  );
}
