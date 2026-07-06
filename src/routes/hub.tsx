import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { Star, X, Coins, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [{ title: "Party Hub — Pixels Studio" }, { name: "description", content: "Discover games built with Pixels Studio." }],
  }),
  component: () => (
    <AppShell>
      <HubPage />
    </AppShell>
  ),
});

type Listing = { title: string; creator: string; rating: number; price: string; grad: string; emoji: string; free?: boolean };

const rowFeatured: Listing[] = [
  { title: "Blade Runners 4884", creator: "@synthkid", rating: 4.9, price: "800 PX", grad: "from-primary/60 to-neon-violet/40", emoji: "🏙" },
  { title: "Kōan Garden", creator: "@moss.city", rating: 4.8, price: "Free", free: true, grad: "from-accent/50 to-neon-green/30", emoji: "🪷" },
  { title: "Rooftop Tag Arena", creator: "@nx", rating: 4.7, price: "500 PX", grad: "from-primary/40 to-neon-violet/30", emoji: "🌃" },
  { title: "Zero-G Loop", creator: "@vector", rating: 4.6, price: "300 PX", grad: "from-accent/60 to-primary/20", emoji: "🌀" },
];
const rowTrending: Listing[] = [
  { title: "Neon Snake++", creator: "@nx", rating: 4.8, price: "Free", free: true, grad: "from-neon-green/50 to-accent/30", emoji: "🐍" },
  { title: "Karaoke Rooftop", creator: "@lopez", rating: 4.5, price: "200 PX", grad: "from-neon-violet/50 to-primary/30", emoji: "🎤" },
  { title: "Grid Duel", creator: "@ono", rating: 4.4, price: "400 PX", grad: "from-neon-red/40 to-neon-amber/30", emoji: "⚔" },
  { title: "Slum Speedway", creator: "@drift", rating: 4.6, price: "350 PX", grad: "from-accent/40 to-primary/30", emoji: "🏎" },
];
const rowNew: Listing[] = [
  { title: "Data Heist", creator: "@thief.exe", rating: 4.2, price: "600 PX", grad: "from-primary/50 to-accent/30", emoji: "💾" },
  { title: "Mycelium Court", creator: "@fungi", rating: 4.3, price: "Free", free: true, grad: "from-neon-green/40 to-neon-violet/30", emoji: "🍄" },
  { title: "Signal Lost", creator: "@vhs", rating: 4.1, price: "250 PX", grad: "from-surface-3 to-primary/30", emoji: "📡" },
  { title: "Chrome Cathedral", creator: "@arch", rating: 4.5, price: "700 PX", grad: "from-accent/50 to-neon-violet/30", emoji: "⛪" },
];

function HubPage() {
  const [buying, setBuying] = useState<Listing | null>(null);
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="// Party Hub · REALM-7"
        title="Games your crew is playing."
        sub="Every listing here was built in Pixels Studio. Buy in, tip creators, jump in with friends."
      />

      <Row title="Featured" tag="Pro Rotation" items={rowFeatured} onBuy={setBuying} />
      <Row title="Trending" items={rowTrending} onBuy={setBuying} />
      <Row title="New Releases" items={rowNew} onBuy={setBuying} />

      {buying && <PurchaseSheet listing={buying} onClose={() => setBuying(null)} />}
    </div>
  );
}

function Row({ title, items, tag, onBuy }: { title: string; items: Listing[]; tag?: string; onBuy: (l: Listing) => void }) {
  return (
    <section className="mb-10">
      <div className="flex items-end justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {tag && <Chip tone="magenta">★ {tag}</Chip>}
        </div>
        <button className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground flex items-center gap-1">
          See all <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 -mx-2 px-2">
        {items.map((l) => (
          <button
            key={l.title}
            onClick={() => onBuy(l)}
            className="w-72 shrink-0 hud-panel !p-0 overflow-hidden text-left group hover:neon-border-magenta transition"
          >
            <div className={`h-40 bg-gradient-to-br ${l.grad} relative flex items-center justify-center`}>
              <div className="text-6xl opacity-90 group-hover:scale-110 transition">{l.emoji}</div>
              <div className="absolute inset-0 grid-canvas opacity-20" />
              <div className="absolute top-2 right-2">
                <Chip tone={l.free ? "green" : "amber"}>
                  {l.free ? "Free" : <><Coins className="w-3 h-3" /> {l.price}</>}
                </Chip>
              </div>
            </div>
            <div className="p-4">
              <div className="font-semibold truncate">{l.title}</div>
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-mono">{l.creator}</span>
                <span className="flex items-center gap-1 neon-text-amber font-mono">
                  <Star className="w-3 h-3 fill-current" /> {l.rating}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function PurchaseSheet({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const priceNum = listing.free ? 0 : parseInt(listing.price);
  const creatorCut = Math.round(priceNum * 0.6);
  return (
    <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg hud-panel !p-0 overflow-hidden neon-border-magenta">
        <div className={`h-40 bg-gradient-to-br ${listing.grad} relative flex items-center justify-center`}>
          <div className="text-7xl">{listing.emoji}</div>
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 clip-hud-sm bg-background/60 border border-border flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest neon-text-cyan mb-1">// Confirm purchase</div>
              <h3 className="text-2xl font-bold">{listing.title}</h3>
              <div className="text-sm text-muted-foreground font-mono">by {listing.creator}</div>
            </div>
            <Chip tone={listing.free ? "green" : "amber"}>{listing.free ? "Free" : listing.price}</Chip>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="p-3 clip-hud-sm border border-border/50">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Your balance</div>
              <div className="mt-1 font-mono text-lg neon-text-amber">12,480 PX</div>
            </div>
            <div className="p-3 clip-hud-sm border border-border/50">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">After purchase</div>
              <div className="mt-1 font-mono text-lg">{(12480 - priceNum).toLocaleString()} PX</div>
            </div>
          </div>

          {!listing.free && (
            <div className="mt-4 p-3 clip-hud-sm bg-primary/10 border border-primary/40">
              <div className="text-xs">
                <span className="neon-text-magenta font-mono uppercase tracking-widest text-[10px]">Where it goes:</span>{" "}
                Most of this goes to the creator — <span className="font-mono neon-text-amber">{creatorCut} PIXELS (60%)</span>. Pixels Studio keeps 40% to run the shard.
              </div>
            </div>
          )}

          <div className="mt-3 text-[11px] text-muted-foreground">
            Refunds within 24h if you played less than 15 minutes. All sales settle on-chain — the receipt lives in your Pixels wallet.
          </div>

          <div className="mt-6 flex items-center gap-3 justify-end">
            <HudButton variant="ghost" onClick={onClose}>Cancel</HudButton>
            <HudButton variant="primary"><Coins className="w-4 h-4" /> Confirm & jump in</HudButton>
          </div>
        </div>
      </div>
    </div>
  );
}
