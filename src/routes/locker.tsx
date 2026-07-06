import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Shirt, Sparkles, Check, Zap } from "lucide-react";

export const Route = createFileRoute("/locker")({
  head: () => ({
    meta: [
      { title: "Locker — Pixels Studio" },
      { name: "description", content: "Your cosmetics, skins, and playable items." },
      { property: "og:title", content: "Locker — Pixels Studio" },
      { property: "og:description", content: "Equip skins, emotes, and playable items you own." },
    ],
  }),
  component: () => <AppShell><LockerPage /></AppShell>,
});

type Item = {
  id: string;
  name: string;
  kind: "Skin" | "Emote" | "Weapon" | "Mount" | "Consumable";
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  game: string;
  emoji: string;
  grad: string;
  equipped?: boolean;
  count?: number;
};

const items: Item[] = [
  { id: "s1", name: "Neon Ghost Jacket", kind: "Skin", rarity: "Legendary", game: "Blade Runners 4884", emoji: "🧥", grad: "from-primary/60 to-[oklch(0.72_0.18_290)]/40", equipped: true },
  { id: "s2", name: "Chrome Serpent Skin", kind: "Skin", rarity: "Epic",    game: "Neon Snake",         emoji: "🐍", grad: "from-accent/60 to-primary/40", equipped: true },
  { id: "s3", name: "Rooftop Ninja",     kind: "Skin", rarity: "Rare",    game: "Blade Runners 4884", emoji: "🥷", grad: "from-[oklch(0.72_0.18_290)]/50 to-accent/40" },
  { id: "e1", name: "Confetti Burst",     kind: "Emote", rarity: "Common", game: "All games",          emoji: "🎉", grad: "from-accent/40 to-primary/30" },
  { id: "e2", name: "Robot Dance",        kind: "Emote", rarity: "Rare",   game: "All games",          emoji: "🤖", grad: "from-primary/40 to-[oklch(0.72_0.18_290)]/40" },
  { id: "w1", name: "Plasma Katana",      kind: "Weapon", rarity: "Epic",   game: "Blade Runners 4884", emoji: "⚔️", grad: "from-destructive/40 to-primary/40" },
  { id: "m1", name: "Sky Bike Mk-II",     kind: "Mount",  rarity: "Legendary", game: "Blade Runners 4884", emoji: "🏍", grad: "from-[oklch(0.75_0.20_50)]/50 to-primary/40", equipped: true },
  { id: "c1", name: "XP Booster (7d)",    kind: "Consumable", rarity: "Common", game: "All games",     emoji: "⚡", grad: "from-accent/40 to-accent/30", count: 3 },
  { id: "c2", name: "Loot Key",           kind: "Consumable", rarity: "Rare",   game: "Grid Duel",     emoji: "🗝", grad: "from-primary/50 to-accent/40", count: 8 },
];

const rarityTone: Record<Item["rarity"], string> = {
  Common:    "bg-muted text-ink/70 border-ink/30",
  Rare:      "bg-accent text-ink border-ink",
  Epic:      "bg-primary text-primary-foreground border-ink",
  Legendary: "bg-[oklch(0.75_0.20_50)] text-ink border-ink",
};

const kinds = ["All", "Skin", "Emote", "Weapon", "Mount", "Consumable"] as const;

function LockerPage() {
  const [kind, setKind] = useState<(typeof kinds)[number]>("All");
  const filtered = kind === "All" ? items : items.filter((i) => i.kind === kind);
  const equippedCount = items.filter((i) => i.equipped).length;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-4xl font-black italic text-ink" style={{ fontFamily: "var(--font-display)" }}>
            <Shirt className="inline w-8 h-8 mr-2 -mt-2" /> Locker
          </h1>
          <p className="mt-1 text-sm text-ink/60 font-mono">{items.length} items owned · {equippedCount} equipped</p>
        </div>
        <Link to="/marketplace" className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest">
          <Sparkles className="w-4 h-4" /> Shop cosmetics
        </Link>
      </div>

      {/* Kind filter */}
      <div className="flex flex-wrap items-center gap-1 p-1 rounded-full border-2 border-ink bg-white shadow-[2px_2px_0_0_var(--ink)] w-fit">
        {kinds.map((k) => (
          <button key={k} onClick={() => setKind(k)}
            className={`px-3 h-8 rounded-full font-mono text-[10px] uppercase tracking-widest ${kind === k ? "bg-ink text-background" : "text-ink/60 hover:text-ink"}`}>
            {k}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] overflow-hidden group">
            <div className={`aspect-square bg-gradient-to-br ${item.grad} flex items-center justify-center text-7xl border-b-2 border-ink relative`}>
              {item.emoji}
              {item.count && (
                <span className="absolute top-2 right-2 min-w-6 h-6 px-1.5 rounded-full bg-ink text-background border-2 border-ink text-[10px] font-mono flex items-center justify-center">×{item.count}</span>
              )}
              {item.equipped && (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 h-6 rounded-full bg-primary text-primary-foreground border-2 border-ink text-[10px] font-mono uppercase tracking-widest">
                  <Check className="w-3 h-3" /> On
                </span>
              )}
            </div>
            <div className="p-3 space-y-2">
              <div>
                <div className="text-sm font-bold text-ink truncate">{item.name}</div>
                <div className="text-[10px] font-mono text-ink/60 truncate">{item.game}</div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`px-2 h-5 rounded-full border-2 text-[9px] font-mono uppercase tracking-widest flex items-center ${rarityTone[item.rarity]}`}>{item.rarity}</span>
                <span className="px-2 h-5 rounded-full bg-muted border-2 border-ink/30 text-[9px] font-mono uppercase tracking-widest flex items-center text-ink/70">{item.kind}</span>
              </div>
              {item.kind !== "Consumable" ? (
                <button className={`w-full h-8 rounded-full border-2 border-ink font-mono text-[10px] uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] ${item.equipped ? "bg-white text-ink" : "bg-accent text-ink"}`}>
                  {item.equipped ? "Unequip" : "Equip"}
                </button>
              ) : (
                <button className="w-full h-8 rounded-full border-2 border-ink bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] inline-flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3" /> Use
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
