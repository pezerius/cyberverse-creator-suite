import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { gamesList } from "@/lib/mock-games";
import { Play, Download, Trash2, Search, Clock, HardDrive, Filter } from "lucide-react";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Pixels Studio" },
      { name: "description", content: "Every game you own, ready to launch." },
      { property: "og:title", content: "Library — Pixels Studio" },
      { property: "og:description", content: "Your personal game library on Pixels." },
    ],
  }),
  component: () => <AppShell><LibraryPage /></AppShell>,
});

type OwnedGame = { slug: string; installed: boolean; hours: number; lastPlayed: string; size: string };
const owned: OwnedGame[] = [
  { slug: "blade-runners-4884", installed: true,  hours: 42.3, lastPlayed: "2h ago",    size: "2.1 GB" },
  { slug: "neon-snake",         installed: true,  hours: 18.1, lastPlayed: "yesterday", size: "480 MB" },
  { slug: "grid-duel",          installed: false, hours: 6.4,  lastPlayed: "3 weeks",   size: "1.4 GB" },
  { slug: "koan-garden",        installed: true,  hours: 12.9, lastPlayed: "4 days",    size: "820 MB" },
];

function LibraryPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "installed" | "recent">("all");

  const rows = owned
    .map((o) => ({ ...o, game: gamesList.find((g) => g.slug === o.slug)! }))
    .filter((r) => r.game)
    .filter((r) => filter === "all" || (filter === "installed" ? r.installed : r.lastPlayed.includes("h") || r.lastPlayed === "yesterday"))
    .filter((r) => !q || r.game.title.toLowerCase().includes(q.toLowerCase()));

  const totalHours = owned.reduce((s, o) => s + o.hours, 0).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-4xl font-black italic text-ink" style={{ fontFamily: "var(--font-display)" }}>Library</h1>
          <p className="mt-1 text-sm text-ink/60 font-mono">{owned.length} games · {totalHours}h played</p>
        </div>
        <Link to="/marketplace" className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest">
          Find more games
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your library..."
            className="w-full h-10 pl-10 pr-3 rounded-full border-2 border-ink bg-white font-mono text-sm shadow-[2px_2px_0_0_var(--ink)] focus:outline-none" />
        </div>
        <div className="flex items-center gap-1 p-1 rounded-full border-2 border-ink bg-white shadow-[2px_2px_0_0_var(--ink)]">
          {(["all", "installed", "recent"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 h-8 rounded-full font-mono text-[10px] uppercase tracking-widest ${filter === f ? "bg-ink text-background" : "text-ink/60 hover:text-ink"}`}>
              {f}
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-1.5 px-3 h-10 rounded-full border-2 border-ink bg-white shadow-[2px_2px_0_0_var(--ink)] font-mono text-[10px] uppercase tracking-widest">
          <Filter className="w-3.5 h-3.5" /> Sort: Recent
        </button>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((r) => (
          <div key={r.slug} className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] overflow-hidden">
            <Link to="/g/$slug" params={{ slug: r.slug }} className={`block aspect-video bg-gradient-to-br ${r.game.grad} flex items-center justify-center text-6xl border-b-2 border-ink`}>
              {r.game.emoji}
            </Link>
            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-ink truncate flex-1">{r.game.title}</h3>
                  {r.installed ? (
                    <span className="px-2 h-5 rounded-full bg-accent border-2 border-ink text-[9px] font-mono uppercase tracking-widest flex items-center">Ready</span>
                  ) : (
                    <span className="px-2 h-5 rounded-full bg-muted border-2 border-ink/40 text-[9px] font-mono uppercase tracking-widest flex items-center text-ink/60">Cloud</span>
                  )}
                </div>
                <div className="text-[11px] font-mono text-ink/60 mt-1 flex items-center gap-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {r.hours}h</span>
                  <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> {r.size}</span>
                  <span>· {r.lastPlayed}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to="/g/$slug" params={{ slug: r.slug }} className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] font-mono text-[10px] uppercase tracking-widest">
                  <Play className="w-3.5 h-3.5" /> {r.installed ? "Play" : "Launch"}
                </Link>
                <button className="w-9 h-9 rounded-full border-2 border-ink bg-white shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center" title={r.installed ? "Uninstall" : "Install"}>
                  {r.installed ? <Trash2 className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="text-center py-16 rounded-2xl border-2 border-dashed border-ink/30">
          <p className="text-ink/60 font-mono text-sm">No games match your filter.</p>
        </div>
      )}
    </div>
  );
}
