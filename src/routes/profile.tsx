import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { CheckCircle2, Star, Users, Trophy } from "lucide-react";

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
  { name: "Rooftop Tag Arena", plays: "48,120", grad: "from-primary/40 to-neon-violet/30", emoji: "🌃" },
  { name: "Neon Snake++", plays: "231,004", grad: "from-neon-green/40 to-accent/30", emoji: "🐍" },
  { name: "Karaoke Bar", plays: "9,220", grad: "from-neon-violet/50 to-primary/30", emoji: "🎤" },
  { name: "Grid Duel", plays: "18,110", grad: "from-neon-red/40 to-neon-amber/30", emoji: "⚔" },
  { name: "Slum Speedway", plays: "34,800", grad: "from-accent/40 to-primary/30", emoji: "🏎" },
  { name: "Data Heist", plays: "6,540", grad: "from-primary/50 to-accent/30", emoji: "💾" },
];

function ProfilePage() {
  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <div className="hud-panel !p-8 flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-24 h-24 clip-hud bg-gradient-to-br from-primary via-neon-violet to-accent border border-primary/60 flex items-center justify-center font-mono text-3xl font-bold shrink-0 neon-border-magenta">
          NX
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight">@nx</h1>
            <Chip tone="cyan"><CheckCircle2 className="w-3 h-3" /> Verified Creator</Chip>
            <Chip tone="amber">Pro · Tier 2</Chip>
          </div>
          <p className="mt-2 text-muted-foreground max-w-xl">
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
          <HudButton variant="secondary">Tip in PIXELS</HudButton>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Published" value="6" icon={<Trophy className="w-4 h-4 neon-text-magenta" />} />
        <StatCard label="Followers" value="8,204" icon={<Users className="w-4 h-4 neon-text-cyan" />} />
        <StatCard label="Avg rating" value="4.72" icon={<Star className="w-4 h-4 neon-text-amber" />} />
        <StatCard label="PIXELS earned" value="284,120" icon={<span className="text-neon-amber font-mono text-xs">PX</span>} />
      </div>

      <SectionHeader eyebrow="// Portfolio" title="Games shipped" sub="Newest first." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((g) => (
          <Link key={g.name} to="/hub" className="hud-panel !p-0 overflow-hidden group hover:neon-border-magenta transition">
            <div className={`h-36 bg-gradient-to-br ${g.grad} relative flex items-center justify-center`}>
              <div className="text-6xl opacity-90 group-hover:scale-110 transition">{g.emoji}</div>
              <div className="absolute inset-0 grid-canvas opacity-20" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="font-semibold">{g.name}</div>
              <div className="font-mono text-xs text-muted-foreground">{g.plays} plays</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <HudCard>
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-2 font-mono text-2xl">{value}</div>
    </HudCard>
  );
}
