import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SectionHeader, Chip, HudButton, HudCard } from "@/components/hud";
import { EmptyState } from "@/components/EmptyState";
import { assets, licenseTone, type Asset } from "@/lib/marketplace-data";
import { gamesList } from "@/lib/mock-games";
import { Gamepad2, Package, Hammer, Download, Play, ExternalLink, Search, Filter, Star, Clock, HardDrive } from "lucide-react";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — Pixels Studio" },
      { name: "description", content: "Every game, asset, and creation you own — in one library." },
      { property: "og:title", content: "Inventory — Pixels Studio" },
      { property: "og:description", content: "Your owned games, licensed assets, and UGC creations." },
    ],
  }),
  component: () => <AppShell><InventoryPage /></AppShell>,
});

// ---- mock ownership ---------------------------------------------------------
type OwnedGame = { slug: string; installed: boolean; hours: number; lastPlayed: string; purchased: string };
const ownedGames: OwnedGame[] = [
  { slug: "blade-runners-4884", installed: true,  hours: 42.3, lastPlayed: "2h ago",    purchased: "2087-03-14" },
  { slug: "neon-snake",         installed: true,  hours: 18.1, lastPlayed: "yesterday", purchased: "2087-01-02" },
  { slug: "grid-duel",          installed: false, hours: 6.4,  lastPlayed: "3 weeks",   purchased: "2086-11-28" },
  { slug: "koan-garden",        installed: true,  hours: 12.9, lastPlayed: "4 days",    purchased: "2087-02-19" },
];

type OwnedAsset = { id: string; purchased: string; order: string; usedIn: string[] };
const ownedAssets: OwnedAsset[] = [
  { id: "a1", purchased: "2087-04-12", order: "px_08421", usedIn: ["Rooftop Tag Arena", "Slum Speedway"] },
  { id: "a3", purchased: "2087-04-08", order: "px_08398", usedIn: ["Neon Snake++"] },
  { id: "a4", purchased: "2087-03-29", order: "px_08340", usedIn: ["Rooftop Tag Arena"] },
  { id: "a5", purchased: "2087-02-11", order: "px_07902", usedIn: [] },
  { id: "a8", purchased: "2087-01-04", order: "px_07211", usedIn: ["Data Heist", "Grid Duel"] },
];

type UGC = { id: string; name: string; kind: "Game" | "Asset" | "Template"; status: "Published" | "Draft" | "In review"; updated: string; grad: string; emoji: string; installs?: string; manage?: { kind: "asset" | "game"; id: string } };
const myUGC: UGC[] = [
  { id: "u1", name: "Rooftop Tag Arena",    kind: "Game",     status: "Published", updated: "2 days ago",   grad: "from-primary/40 to-[oklch(0.72_0.18_290)]/30", emoji: "🌃", installs: "48,120", manage: { kind: "game", id: "blade-runners-4884" } },
  { id: "u2", name: "Neon Snake++",         kind: "Game",     status: "Published", updated: "yesterday",    grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/30",  emoji: "🐍", installs: "231,004", manage: { kind: "game", id: "neon-snake" } },
  { id: "u3", name: "Karaoke Bar",          kind: "Game",     status: "Draft",     updated: "5 days ago",   grad: "from-[oklch(0.72_0.18_290)]/50 to-primary/30", emoji: "🎤" },
  { id: "u4", name: "Runner Sprite Remix",  kind: "Asset",    status: "In review", updated: "1 day ago",    grad: "from-accent/60 to-primary/20",                 emoji: "🎨", manage: { kind: "asset", id: "a2" } },
  { id: "u5", name: "Rooftop Chase Template", kind: "Template", status: "Published", updated: "3 weeks ago",grad: "from-primary/50 to-accent/30",                 emoji: "🧩", installs: "1,204" },
];

type Tab = "games" | "assets" | "ugc";

function InventoryPage() {
  const [tab, setTab] = useState<Tab>("games");
  const [query, setQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <SectionHeader
        eyebrow="// Library · Inventory"
        title="Everything you own."
        sub="Your purchased games, licensed assets, and the things you've made — one place, no more digging through emails."
        right={
          <div className="flex items-center gap-2">
            <Link to="/wishlist"><HudButton variant="ghost">Wishlist</HudButton></Link>
            <Link to="/marketplace"><HudButton>Browse marketplace</HudButton></Link>
          </div>
        }
      />

      {/* Stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Games owned" value={String(ownedGames.length)} sub={`${ownedGames.filter(g => g.installed).length} installed`} icon={Gamepad2} tone="cyan" />
        <StatCard label="Assets licensed" value={String(ownedAssets.length)} sub="4.2 GB total" icon={Package} tone="amber" />
        <StatCard label="My creations" value={String(myUGC.length)} sub={`${myUGC.filter(u => u.status === "Published").length} live`} icon={Hammer} tone="magenta" />
        <StatCard label="Play time" value="79.7 h" sub="last 30 days" icon={Clock} tone="green" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <TabBtn active={tab === "games"} onClick={() => setTab("games")} icon={Gamepad2} label="Games" count={ownedGames.length} />
        <TabBtn active={tab === "assets"} onClick={() => setTab("assets")} icon={Package} label="Assets" count={ownedAssets.length} />
        <TabBtn active={tab === "ugc"} onClick={() => setTab("ugc")} icon={Hammer} label="My UGC" count={myUGC.length} />
        <div className="ml-auto flex items-center gap-2 w-full md:w-auto">
          <div className="flex-1 md:flex-none md:w-64 h-10 px-3 flex items-center gap-2 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]">
            <Search className="w-4 h-4 text-ink/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter…"
              className="bg-transparent outline-none flex-1 text-sm font-mono"
            />
          </div>
          <button className="hidden md:flex w-10 h-10 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] items-center justify-center">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {tab === "games" && <GamesTab query={query} />}
      {tab === "assets" && <AssetsTab query={query} />}
      {tab === "ugc" && <UGCTab query={query} />}
    </div>
  );
}

// ---- tabs -------------------------------------------------------------------

function GamesTab({ query }: { query: string }) {
  const rows = ownedGames
    .map((o) => ({ owned: o, game: gamesList.find((g) => g.slug === o.slug)! }))
    .filter((r) => r.game && r.game.title.toLowerCase().includes(query.toLowerCase()));
  if (rows.length === 0) return <EmptyState emoji="🎮" title="No games match that filter." />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {rows.map(({ owned, game }) => (
        <HudCard key={owned.slug} className="p-0 overflow-hidden">
          <Link to="/g/$slug" params={{ slug: game.slug }} className="block">
            <div className={`h-36 bg-gradient-to-br ${game.grad} flex items-center justify-center text-6xl relative`}>
              <span>{game.emoji}</span>
              <span className="absolute top-2 left-2"><Chip tone={owned.installed ? "green" : "amber"}>{owned.installed ? "Installed" : "Cloud"}</Chip></span>
            </div>
          </Link>
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="font-black italic text-lg truncate" style={{ fontFamily: "var(--font-display)" }}>{game.title}</div>
                <div className="text-xs font-mono text-ink/60 truncate">by @{game.creatorHandle} · {game.version}</div>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono shrink-0"><Star className="w-3 h-3 fill-current text-[oklch(0.75_0.20_50)]" />{game.rating}</div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] font-mono uppercase tracking-widest text-ink/60">
              <div><div className="text-ink font-bold text-sm normal-case tracking-normal">{owned.hours}h</div>played</div>
              <div><div className="text-ink font-bold text-sm normal-case tracking-normal">{owned.lastPlayed}</div>last</div>
              <div><div className="text-ink font-bold text-sm normal-case tracking-normal">{owned.purchased.slice(0,7)}</div>owned</div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {owned.installed ? (
                <HudButton className="flex-1"><Play className="w-3.5 h-3.5" /> Play</HudButton>
              ) : (
                <HudButton className="flex-1" variant="ghost"><Download className="w-3.5 h-3.5" /> Install</HudButton>
              )}
              <Link to="/g/$slug" params={{ slug: game.slug }}>
                <button className="w-10 h-10 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center"><ExternalLink className="w-4 h-4" /></button>
              </Link>
            </div>
          </div>
        </HudCard>
      ))}
    </div>
  );
}

function AssetsTab({ query }: { query: string }) {
  const rows = ownedAssets
    .map((o) => ({ owned: o, asset: assets.find((a) => a.id === o.id)! }))
    .filter((r) => r.asset && r.asset.name.toLowerCase().includes(query.toLowerCase()));
  if (rows.length === 0) return <EmptyState emoji="📦" title="No assets match that filter." />;
  return (
    <HudCard className="p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b-2 border-ink">
            <tr className="text-left text-[10px] font-mono uppercase tracking-widest text-ink/60">
              <th className="px-4 py-3">Asset</th>
              <th className="px-4 py-3 hidden md:table-cell">Type</th>
              <th className="px-4 py-3 hidden lg:table-cell">License</th>
              <th className="px-4 py-3 hidden lg:table-cell">Used in</th>
              <th className="px-4 py-3 hidden md:table-cell">Order</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ owned, asset }) => (
              <AssetRow key={asset.id} asset={asset} owned={owned} />
            ))}
          </tbody>
        </table>
      </div>
    </HudCard>
  );
}

function AssetRow({ asset, owned }: { asset: Asset; owned: OwnedAsset }) {
  const Icon = asset.icon;
  return (
    <tr className="border-b border-ink/10 hover:bg-muted/30">
      <td className="px-4 py-3">
        <Link to="/marketplace/$assetId" params={{ assetId: asset.id }} className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${asset.grad} border-2 border-ink flex items-center justify-center shrink-0`}><Icon className="w-4 h-4 text-ink/70" /></div>
          <div className="min-w-0">
            <div className="font-bold truncate">{asset.name}</div>
            <div className="text-xs font-mono text-ink/60 truncate">{asset.artist} · {asset.fileSize}</div>
          </div>
        </Link>
      </td>
      <td className="px-4 py-3 hidden md:table-cell"><Chip tone="cyan">{asset.type}</Chip></td>
      <td className="px-4 py-3 hidden lg:table-cell"><Chip tone={licenseTone[asset.license]}>{asset.license}</Chip></td>
      <td className="px-4 py-3 hidden lg:table-cell text-xs font-mono text-ink/70">
        {owned.usedIn.length === 0 ? <span className="text-ink/40">— unused</span> : owned.usedIn.join(", ")}
      </td>
      <td className="px-4 py-3 hidden md:table-cell font-mono text-xs text-ink/60">{owned.order}</td>
      <td className="px-4 py-3 text-right">
        <div className="inline-flex items-center gap-1">
          <button title="Download" className="w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center hover:bg-accent"><Download className="w-3.5 h-3.5" /></button>
          <Link to="/marketplace/$assetId" params={{ assetId: asset.id }} title="Open"><button className="w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center hover:bg-accent"><ExternalLink className="w-3.5 h-3.5" /></button></Link>
        </div>
      </td>
    </tr>
  );
}

function UGCTab({ query }: { query: string }) {
  const rows = myUGC.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
  if (rows.length === 0) return <EmptyState emoji="🛠" title="Nothing here yet." sub="Start a new game or asset in the Builder." action={<Link to="/create"><HudButton>Open builder</HudButton></Link>} />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {rows.map((u) => (
        <HudCard key={u.id} className="p-0 overflow-hidden">
          <div className={`h-32 bg-gradient-to-br ${u.grad} flex items-center justify-center text-5xl relative`}>
            <span>{u.emoji}</span>
            <span className="absolute top-2 left-2"><Chip tone={u.kind === "Game" ? "cyan" : u.kind === "Asset" ? "magenta" : "amber"}>{u.kind}</Chip></span>
            <span className="absolute top-2 right-2"><Chip tone={u.status === "Published" ? "green" : u.status === "Draft" ? "default" : "amber"}>{u.status}</Chip></span>
          </div>
          <div className="p-4">
            <div className="font-black italic text-lg truncate" style={{ fontFamily: "var(--font-display)" }}>{u.name}</div>
            <div className="mt-1 flex items-center justify-between text-xs font-mono text-ink/60">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {u.updated}</span>
              {u.installs && <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> {u.installs}</span>}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Link to="/builder" className="flex-1"><HudButton className="w-full" variant="ghost">Open in builder</HudButton></Link>
              {u.manage ? (
                <Link to="/manage/$kind/$id" params={{ kind: u.manage.kind, id: u.manage.id }}><HudButton size="sm" variant="secondary">Manage</HudButton></Link>
              ) : (
                <HudButton size="sm" variant="secondary" disabled>Manage</HudButton>
              )}
            </div>
          </div>
        </HudCard>
      ))}
    </div>
  );
}

// ---- small bits -------------------------------------------------------------

function TabBtn({ active, onClick, icon: Icon, label, count }: { active: boolean; onClick: () => void; icon: typeof Gamepad2; label: string; count: number }) {
  return (
    <button
      onClick={onClick}
      className={`h-10 px-4 rounded-full border-2 border-ink flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition ${
        active ? "bg-primary text-primary-foreground shadow-[3px_3px_0_0_var(--ink)]" : "bg-white text-ink hover:bg-muted"
      }`}
    >
      <Icon className="w-3.5 h-3.5" /> {label}
      <span className={`ml-1 px-1.5 rounded-full text-[10px] ${active ? "bg-primary-foreground/20" : "bg-ink/10"}`}>{count}</span>
    </button>
  );
}

function StatCard({ label, value, sub, icon: Icon, tone }: { label: string; value: string; sub: string; icon: typeof Gamepad2; tone: "cyan" | "amber" | "magenta" | "green" }) {
  const bg = tone === "cyan" ? "bg-[oklch(0.85_0.10_180)]/40" : tone === "amber" ? "bg-[oklch(0.75_0.20_50)]/40" : tone === "magenta" ? "bg-[oklch(0.72_0.18_290)]/40" : "bg-accent";
  return (
    <div className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-4 flex items-center gap-3">
      <div className={`w-11 h-11 rounded-xl border-2 border-ink ${bg} flex items-center justify-center shrink-0`}><Icon className="w-5 h-5 text-ink" /></div>
      <div className="min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">{label}</div>
        <div className="text-xl font-black italic leading-tight" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
        <div className="text-[10px] font-mono text-ink/50 truncate">{sub}</div>
      </div>
    </div>
  );
}
