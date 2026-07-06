import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudCard, Chip, SectionHeader } from "@/components/hud";
import { assets } from "@/lib/marketplace-data";
import { Search, Sparkles, Gamepad2, User, Package } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — Pixels Studio" }] }),
  component: () => (
    <AppShell>
      <SearchPage />
    </AppShell>
  ),
});

const games = [
  { name: "Neon Rush", by: "@neonx", plays: "24.1k", tag: "Racing" },
  { name: "Skyline Racer", by: "@holo.studio", plays: "18.9k", tag: "Racing" },
  { name: "Sub-Basement 7", by: "@drift.dev", plays: "8.4k", tag: "Rogue-lite" },
  { name: "Chrome Wolves", by: "@fauna.exe", plays: "5.2k", tag: "Action" },
];

const creators = [
  { handle: "@grid_kid", tag: "Tileset artist", followers: "3.2k" },
  { handle: "@pixel.moth", tag: "Character animator", followers: "1.8k" },
  { handle: "@808heart", tag: "Sound designer", followers: "2.4k" },
];

function SearchPage() {
  const [q, setQ] = useState("");
  const s = q.toLowerCase();
  const matchAssets = q ? assets.filter(a => (a.name + " " + a.artist + " " + (a.tags?.join(" ") ?? "")).toLowerCase().includes(s)) : assets.slice(0, 4);
  const matchGames = q ? games.filter(g => g.name.toLowerCase().includes(s) || g.by.toLowerCase().includes(s)) : games;
  const matchCreators = q ? creators.filter(c => c.handle.toLowerCase().includes(s)) : creators;

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <SectionHeader eyebrow="// Universal search" title="Find anything." sub="Games, assets, and creators — one search box." />

      <div className="mb-8 flex items-center gap-3 h-14 px-5 rounded-full bg-white border-2 border-ink shadow-[4px_4px_0_0_var(--ink)]">
        <Search className="w-5 h-5 text-ink/60" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try 'cyberpunk', 'neon', or '@grid_kid'…" className="flex-1 bg-transparent outline-none font-mono text-sm" />
        <kbd className="hidden md:inline-flex items-center px-2 h-6 rounded-md bg-muted border-2 border-ink/30 font-mono text-[10px]">⌘K</kbd>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Column icon={Package} title="Assets" count={matchAssets.length}>
          {matchAssets.slice(0, 8).map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Link to="/marketplace/$assetId" params={{ assetId: a.id }} className="flex items-center gap-3 p-3 rounded-2xl border-2 border-ink/20 hover:border-ink hover:bg-muted/40 transition">
                <div className={`w-10 h-10 rounded-xl border-2 border-ink bg-gradient-to-br ${a.grad} flex items-center justify-center shrink-0`}>
                  <a.icon className="w-4 h-4 text-ink/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{a.name}</div>
                  <div className="text-[11px] font-mono text-ink/60">{a.artist}</div>
                </div>
                <Chip>{a.type}</Chip>
              </Link>
            </motion.div>
          ))}
        </Column>

        <Column icon={Gamepad2} title="Games" count={matchGames.length}>
          {matchGames.map((g, i) => (
            <motion.div key={g.name} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-3 p-3 rounded-2xl border-2 border-ink/20 hover:border-ink hover:bg-muted/40 transition">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center shrink-0"><Gamepad2 className="w-4 h-4" /></div>
              <div className="flex-1">
                <div className="font-bold text-sm">{g.name}</div>
                <div className="text-[11px] font-mono text-ink/60">{g.by} · {g.plays} plays</div>
              </div>
              <Chip tone="violet">{g.tag}</Chip>
            </motion.div>
          ))}
        </Column>

        <Column icon={User} title="Creators" count={matchCreators.length}>
          {matchCreators.map((c, i) => (
            <motion.div key={c.handle} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-3 p-3 rounded-2xl border-2 border-ink/20 hover:border-ink hover:bg-muted/40 transition">
              <div className="w-10 h-10 rounded-xl bg-accent border-2 border-ink flex items-center justify-center shrink-0 font-mono text-[10px] font-bold">{c.handle.slice(1, 3).toUpperCase()}</div>
              <div className="flex-1">
                <div className="font-bold text-sm">{c.handle}</div>
                <div className="text-[11px] font-mono text-ink/60">{c.tag}</div>
              </div>
              <div className="text-[10px] font-mono text-ink/50">{c.followers} followers</div>
            </motion.div>
          ))}
        </Column>
      </div>
    </div>
  );
}

function Column({ icon: Icon, title, count, children }: { icon: typeof Search; title: string; count: number; children: React.ReactNode }) {
  return (
    <HudCard className="!p-0 overflow-hidden">
      <div className="flex items-center gap-2 px-4 h-11 border-b-2 border-ink bg-white">
        <Icon className="w-4 h-4" />
        <div className="font-bold italic text-lg" style={{ fontFamily: "var(--font-display)" }}>{title}</div>
        <div className="ml-auto text-[10px] font-mono text-ink/50">{count} result{count !== 1 ? "s" : ""}</div>
      </div>
      <div className="p-3 space-y-2 min-h-[120px]">
        {count === 0 ? <div className="text-xs font-mono text-ink/50 text-center py-6">Nothing here.</div> : children}
      </div>
    </HudCard>
  );
}
