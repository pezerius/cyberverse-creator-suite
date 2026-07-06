import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { Music2, Palette, Grid3x3, Sparkles, Search, Star, Heart, Filter, X, Check, CreditCard, Wallet, Shield, Download } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [{ title: "Asset Marketplace — Pixels Studio" }, { name: "description", content: "Creator-to-creator marketplace for sprites, SFX, and tilesets." }],
  }),
  component: () => (
    <AppShell>
      <MarketPage />
    </AppShell>
  ),
});

type License = "Single Game" | "All My Games" | "Resellable";
type AssetType = "Sprites" | "SFX" | "Tileset";
type Asset = {
  id: string;
  name: string;
  artist: string;
  type: AssetType;
  license: License;
  price: number;
  rating: number;
  downloads: number;
  featured?: boolean;
  new?: boolean;
  grad: string;
  icon: typeof Music2;
};

const assets: Asset[] = [
  { id: "a1", name: "Chrome Alley Tileset", artist: "@grid_kid", type: "Tileset", license: "All My Games", price: 1200, rating: 4.8, downloads: 2841, featured: true, grad: "from-primary/50 to-[oklch(0.72_0.18_290)]/40", icon: Grid3x3 },
  { id: "a2", name: "Runner Sprite Pack v3", artist: "@pixel.moth", type: "Sprites", license: "Single Game", price: 800, rating: 4.6, downloads: 1420, new: true, grad: "from-accent/60 to-primary/20", icon: Palette },
  { id: "a3", name: "Bassline / SFX 07", artist: "@808heart", type: "SFX", license: "Resellable", price: 2400, rating: 4.9, downloads: 892, featured: true, grad: "from-[oklch(0.75_0.20_50)]/50 to-primary/30", icon: Music2 },
  { id: "a4", name: "Neon Rooftops Set", artist: "@nightbird", type: "Tileset", license: "All My Games", price: 1600, rating: 4.7, downloads: 3120, grad: "from-[oklch(0.72_0.18_290)]/50 to-accent/40", icon: Grid3x3 },
  { id: "a5", name: "8-bit Blaster SFX", artist: "@zap", type: "SFX", license: "Single Game", price: 400, rating: 4.3, downloads: 5210, grad: "from-destructive/40 to-[oklch(0.75_0.20_50)]/40", icon: Music2 },
  { id: "a6", name: "Cyber Fauna Sprites", artist: "@fauna.exe", type: "Sprites", license: "Resellable", price: 3200, rating: 4.9, downloads: 611, new: true, grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/40", icon: Palette },
  { id: "a7", name: "Rainy Street Loops", artist: "@wet.sfx", type: "SFX", license: "All My Games", price: 900, rating: 4.5, downloads: 1780, grad: "from-[oklch(0.85_0.10_180)]/60 to-[oklch(0.72_0.18_290)]/40", icon: Music2 },
  { id: "a8", name: "Arcade UI Sprites", artist: "@ui.forge", type: "Sprites", license: "Single Game", price: 600, rating: 4.4, downloads: 2350, grad: "from-primary/40 to-accent/40", icon: Palette },
];

const licenseTone: Record<License, "cyan" | "amber" | "magenta"> = {
  "Single Game": "cyan", "All My Games": "amber", Resellable: "magenta",
};

type Category = "All" | AssetType;
type Sort = "featured" | "price-asc" | "price-desc" | "rating" | "downloads" | "new";

function MarketPage() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["a1", "a3"]));
  const [buying, setBuying] = useState<Asset | null>(null);

  const filtered = useMemo(() => {
    let list = assets.filter((a) => category === "All" || a.type === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((a) => a.name.toLowerCase().includes(q) || a.artist.toLowerCase().includes(q));
    }
    const s: Record<Sort, (a: Asset, b: Asset) => number> = {
      featured: (a, b) => Number(!!b.featured) - Number(!!a.featured),
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating,
      downloads: (a, b) => b.downloads - a.downloads,
      new: (a, b) => Number(!!b.new) - Number(!!a.new),
    };
    return [...list].sort(s[sort]);
  }, [category, query, sort]);

  function toggleFav(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-primary text-primary-foreground border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] p-6 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-accent text-ink border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-mono uppercase tracking-widest opacity-80">// UGC Asset Marketplace</div>
          <div className="mt-1 text-base leading-snug">
            Creators selling to creators. Every sprite, sound, and tileset here is uploaded by another Pixels Studio creator — they get paid every time you license their work.
          </div>
        </div>
        <HudButton variant="success">List an asset</HudButton>
      </div>

      <SectionHeader
        eyebrow="// Browse the shelf"
        title="License it. Ship faster."
        sub="Three tiers: single game (cheapest), all your games, or resellable (bundle it into your own template)."
      />

      {/* Controls */}
      <div className="bg-white border-2 border-ink rounded-3xl shadow-[3px_3px_0_0_var(--ink)] p-4 mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[220px] h-11 px-4 rounded-full bg-muted/60 border-2 border-ink">
          <Search className="w-4 h-4 text-ink/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets or creators…"
            className="flex-1 bg-transparent outline-none text-sm font-mono placeholder:text-ink/40"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-ink/50 hover:text-ink"><X className="w-4 h-4" /></button>
          )}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {(["All", "Sprites", "SFX", "Tileset"] as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 h-9 rounded-full text-xs font-mono uppercase tracking-widest font-bold border-2 transition ${
                category === c
                  ? "bg-primary text-primary-foreground border-ink shadow-[2px_2px_0_0_var(--ink)]"
                  : "bg-white text-ink border-ink/30 hover:border-ink"
              }`}
            >{c}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-9 px-3 rounded-full bg-white border-2 border-ink font-mono text-xs uppercase tracking-widest font-bold">
            <option value="featured">Featured</option>
            <option value="new">Newest</option>
            <option value="rating">Top rated</option>
            <option value="downloads">Most licensed</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between mb-4 text-xs font-mono uppercase tracking-widest text-ink/60">
        <span>{filtered.length} assets · {category !== "All" && `${category} · `}sorted by {sort}</span>
        <span className="flex items-center gap-2">
          <Heart className="w-3 h-3 fill-primary text-primary" /> {favorites.size} favorites
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((a) => {
          const Icon = a.icon;
          const fav = favorites.has(a.id);
          return (
            <div key={a.id} className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] overflow-hidden flex flex-col hover:translate-y-[-2px] transition-transform">
              <div className={`h-28 bg-gradient-to-br ${a.grad} relative flex items-center justify-center border-b-2 border-ink`}>
                <Icon className="w-8 h-8 text-ink/80" />
                <div className="absolute top-2 left-2 flex gap-1">
                  <Chip>{a.type}</Chip>
                  {a.featured && <Chip tone="amber">★ Featured</Chip>}
                  {a.new && <Chip tone="green">New</Chip>}
                </div>
                <button
                  onClick={() => toggleFav(a.id)}
                  aria-label="Favorite"
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center transition ${
                    fav ? "bg-primary text-primary-foreground" : "bg-white text-ink hover:bg-accent"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="font-bold italic text-lg leading-tight" style={{ fontFamily: "var(--font-display)" }}>{a.name}</div>
                <div className="mt-1 text-xs font-mono text-ink/60">by {a.artist}</div>
                <div className="mt-2 flex items-center gap-2 text-xs font-mono">
                  <span className="inline-flex items-center gap-0.5"><Star className="w-3 h-3 fill-[oklch(0.75_0.20_50)] text-[oklch(0.75_0.20_50)]" /> {a.rating}</span>
                  <span className="text-ink/40">·</span>
                  <span className="text-ink/60"><Download className="w-3 h-3 inline mr-0.5" />{a.downloads.toLocaleString()}</span>
                </div>
                <div className="mt-3"><Chip tone={licenseTone[a.license]}>{a.license}</Chip></div>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <div>
                    <div className="italic font-black text-xl text-primary" style={{ fontFamily: "var(--font-display)" }}>{a.price.toLocaleString()}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50 -mt-0.5">$PIXEL</div>
                  </div>
                  <HudButton variant="primary" className="h-9" onClick={() => setBuying(a)}>Buy license</HudButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-ink/60">
          <div className="italic font-black text-2xl mb-2" style={{ fontFamily: "var(--font-display)" }}>Nothing matches that.</div>
          <button onClick={() => { setQuery(""); setCategory("All"); }} className="underline font-mono text-sm">Clear filters</button>
        </div>
      )}

      {buying && <PaymentModal asset={buying} onClose={() => setBuying(null)} />}
    </div>
  );
}

function PaymentModal({ asset, onClose }: { asset: Asset; onClose: () => void }) {
  const [tier, setTier] = useState<License>(asset.license);
  const [method, setMethod] = useState<"pixel" | "card" | "apple">("pixel");
  const [step, setStep] = useState<"review" | "processing" | "done">("review");

  const priceMap: Record<License, number> = {
    "Single Game": asset.price,
    "All My Games": Math.round(asset.price * 2.5),
    Resellable: Math.round(asset.price * 5),
  };
  const price = priceMap[tier];
  const platformFee = Math.round(price * 0.05);
  const creatorPayout = price - platformFee;
  const total = price;

  function confirm() {
    setStep("processing");
    setTimeout(() => setStep("done"), 1400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-2xl bg-background border-2 border-ink rounded-3xl shadow-[6px_6px_0_0_var(--ink)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-14 border-b-2 border-ink bg-primary text-primary-foreground">
          <div className="text-[11px] font-mono uppercase tracking-widest">
            {step === "done" ? "// Receipt · Order px_08421" : "// License checkout"}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-primary-foreground text-primary flex items-center justify-center hover:scale-110 transition"><X className="w-4 h-4" /></button>
        </div>

        {step === "review" && (
          <div className="p-6 space-y-5">
            {/* Line item */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-ink">
              <div className="w-14 h-14 rounded-xl border-2 border-ink flex items-center justify-center bg-gradient-to-br from-primary/40 to-accent/40">
                <asset.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-bold italic text-lg" style={{ fontFamily: "var(--font-display)" }}>{asset.name}</div>
                <div className="text-xs font-mono text-ink/60">by {asset.artist} · {asset.type}</div>
              </div>
              <div className="text-right">
                <div className="italic font-black text-2xl text-primary" style={{ fontFamily: "var(--font-display)" }}>{price.toLocaleString()}</div>
                <div className="text-[10px] font-mono uppercase text-ink/60">$PIXEL</div>
              </div>
            </div>

            {/* License tier selector */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">Choose license</div>
              <div className="grid grid-cols-3 gap-2">
                {(["Single Game", "All My Games", "Resellable"] as License[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTier(t)}
                    className={`p-3 rounded-2xl border-2 border-ink text-left transition ${
                      tier === t ? "bg-accent shadow-[2px_2px_0_0_var(--ink)]" : "bg-white hover:bg-muted"
                    }`}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-widest">{t}</div>
                    <div className="italic font-black text-lg mt-0.5" style={{ fontFamily: "var(--font-display)" }}>{priceMap[t].toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment method */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">Payment method</div>
              <div className="space-y-2">
                <PayMethod
                  active={method === "pixel"}
                  onClick={() => setMethod("pixel")}
                  icon={<Wallet className="w-5 h-5" />}
                  title="$PIXEL Wallet"
                  sub="Balance: 12,480 $PIXEL · instant"
                  right={<Chip tone="green">Recommended</Chip>}
                />
                <PayMethod
                  active={method === "card"}
                  onClick={() => setMethod("card")}
                  icon={<CreditCard className="w-5 h-5" />}
                  title="Credit / debit card"
                  sub="Visa •••• 4290 · 2.5% conversion fee"
                />
                <PayMethod
                  active={method === "apple"}
                  onClick={() => setMethod("apple")}
                  icon={<span className="text-lg"></span>}
                  title="Apple Pay"
                  sub="Confirm with Face ID"
                />
              </div>
            </div>

            {/* Breakdown */}
            <div className="p-4 rounded-2xl bg-muted/40 border-2 border-ink/20 space-y-1.5 font-mono text-sm">
              <Row label="License price" value={`${price.toLocaleString()} PX`} />
              <Row label="Creator royalty" value={`${creatorPayout.toLocaleString()} PX`} sub={`95% to ${asset.artist}`} muted />
              <Row label="Platform fee" value={`${platformFee.toLocaleString()} PX`} muted />
              <div className="border-t-2 border-ink/20 pt-2 mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span className="italic text-lg text-primary" style={{ fontFamily: "var(--font-display)" }}>{total.toLocaleString()} $PIXEL</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-ink/60">
              <Shield className="w-3.5 h-3.5" />
              Escrow-protected. Full refund within 24h if the asset fails to import.
            </div>

            <div className="flex gap-2 pt-2">
              <HudButton variant="secondary" onClick={onClose} className="flex-1">Cancel</HudButton>
              <HudButton variant="primary" onClick={confirm} className="flex-1">Confirm · {total.toLocaleString()} PX</HudButton>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center animate-pulse">
              <Wallet className="w-7 h-7" />
            </div>
            <div className="mt-6 italic font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>Settling on-chain…</div>
            <div className="mt-2 text-sm font-mono text-ink/60">Signing transaction · REALM-7 · ~2s</div>
          </div>
        )}

        {step === "done" && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-accent border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center">
              <Check className="w-8 h-8" strokeWidth={3} />
            </div>
            <div className="mt-6 italic font-black text-3xl" style={{ fontFamily: "var(--font-display)" }}>License minted.</div>
            <div className="mt-2 text-sm text-ink/70 max-w-sm mx-auto">
              <span className="font-bold">{asset.name}</span> is now available in your Editor asset drawer under <span className="font-mono">Licensed</span>.
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-muted/40 border-2 border-ink/20 text-left font-mono text-xs space-y-1 max-w-sm mx-auto">
              <Row label="Order" value="px_08421" />
              <Row label="Tier" value={tier} />
              <Row label="Paid" value={`${total.toLocaleString()} PX`} />
              <Row label="Payout to creator" value={`${creatorPayout.toLocaleString()} PX`} />
            </div>
            <div className="mt-6 flex gap-2 justify-center">
              <HudButton variant="secondary" onClick={onClose}>Keep browsing</HudButton>
              <HudButton variant="primary" onClick={onClose}>Open in editor →</HudButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PayMethod({ active, onClick, icon, title, sub, right }: { active: boolean; onClick: () => void; icon: React.ReactNode; title: string; sub: string; right?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 border-ink text-left transition ${
        active ? "bg-accent shadow-[2px_2px_0_0_var(--ink)]" : "bg-white hover:bg-muted"
      }`}
    >
      <div className={`w-10 h-10 rounded-xl border-2 border-ink flex items-center justify-center shrink-0 ${active ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{icon}</div>
      <div className="flex-1">
        <div className="font-bold text-sm">{title}</div>
        <div className="text-[11px] font-mono text-ink/60">{sub}</div>
      </div>
      {right}
      <div className={`w-5 h-5 rounded-full border-2 border-ink flex items-center justify-center ${active ? "bg-primary" : "bg-white"}`}>
        {active && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
      </div>
    </button>
  );
}

function Row({ label, value, muted, sub }: { label: string; value: string; muted?: boolean; sub?: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className={muted ? "text-ink/60" : ""}>{label}{sub && <span className="text-ink/40 ml-1">— {sub}</span>}</span>
      <span className={muted ? "text-ink/60" : "font-bold"}>{value}</span>
    </div>
  );
}
