import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { Music2, Palette, Grid3x3, Sparkles } from "lucide-react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [{ title: "Asset Marketplace — NeoLab Studio" }, { name: "description", content: "Creator-to-creator marketplace for sprites, SFX, and tilesets." }],
  }),
  component: () => (
    <AppShell>
      <MarketPage />
    </AppShell>
  ),
});

type License = "Single Game" | "All My Games" | "Resellable";
type Asset = { name: string; artist: string; type: "Sprites" | "SFX" | "Tileset"; license: License; price: string; grad: string; icon: typeof Music2 };

const assets: Asset[] = [
  { name: "Chrome Alley Tileset", artist: "@grid_kid", type: "Tileset", license: "All My Games", price: "1,200 PX", grad: "from-primary/50 to-neon-violet/30", icon: Grid3x3 },
  { name: "Runner Sprite Pack v3", artist: "@pixel.moth", type: "Sprites", license: "Single Game", price: "800 PX", grad: "from-accent/50 to-primary/20", icon: Palette },
  { name: "Bassline / SFX 07", artist: "@808heart", type: "SFX", license: "Resellable", price: "2,400 PX", grad: "from-neon-amber/40 to-primary/30", icon: Music2 },
  { name: "Neon Rooftops Set", artist: "@nightbird", type: "Tileset", license: "All My Games", price: "1,600 PX", grad: "from-neon-violet/50 to-accent/30", icon: Grid3x3 },
  { name: "8-bit Blaster SFX", artist: "@zap", type: "SFX", license: "Single Game", price: "400 PX", grad: "from-neon-red/40 to-neon-amber/30", icon: Music2 },
  { name: "Cyber Fauna Sprites", artist: "@fauna.exe", type: "Sprites", license: "Resellable", price: "3,200 PX", grad: "from-neon-green/40 to-accent/30", icon: Palette },
  { name: "Rainy Street Loops", artist: "@wet.sfx", type: "SFX", license: "All My Games", price: "900 PX", grad: "from-accent/50 to-neon-violet/30", icon: Music2 },
  { name: "Arcade UI Sprites", artist: "@ui.forge", type: "Sprites", license: "Single Game", price: "600 PX", grad: "from-primary/40 to-accent/30", icon: Palette },
];

const licenseTone: Record<License, "cyan" | "amber" | "magenta"> = {
  "Single Game": "cyan", "All My Games": "amber", Resellable: "magenta",
};

function MarketPage() {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="hud-panel !p-6 mb-8 flex items-start gap-4 neon-border-cyan">
        <div className="w-10 h-10 clip-hud-sm bg-accent/15 border border-accent/50 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 neon-text-cyan" />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-mono uppercase tracking-widest neon-text-cyan">// UGC Asset Marketplace</div>
          <div className="mt-1 text-base">
            Creators selling to creators. Every sprite, sound, and tileset here is uploaded by another NeoLab creator — they get paid every time you license their work.
          </div>
        </div>
        <HudButton variant="cyan">List an asset</HudButton>
      </div>

      <SectionHeader
        eyebrow="// Assets"
        title="License it. Ship faster."
        sub="Three license tiers: single game (cheapest), all your games, or resellable (bundle it into your own template)."
        right={
          <div className="flex gap-2">
            <Chip>All</Chip><Chip tone="magenta">Sprites</Chip><Chip tone="cyan">SFX</Chip><Chip tone="amber">Tilesets</Chip>
          </div>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {assets.map((a) => {
          const Icon = a.icon;
          return (
            <HudCard key={a.name} className="!p-0 overflow-hidden flex flex-col">
              <div className={`h-28 bg-gradient-to-br ${a.grad} relative flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-foreground/90" />
                <div className="absolute inset-0 grid-canvas opacity-25" />
                <div className="absolute top-2 left-2"><Chip>{a.type}</Chip></div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="font-semibold">{a.name}</div>
                <div className="mt-1 text-xs font-mono text-muted-foreground">by {a.artist}</div>
                <div className="mt-3"><Chip tone={licenseTone[a.license]}>{a.license}</Chip></div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono neon-text-amber">{a.price}</span>
                  <HudButton variant="primary" className="h-8">Buy license</HudButton>
                </div>
              </div>
            </HudCard>
          );
        })}
      </div>
    </div>
  );
}
