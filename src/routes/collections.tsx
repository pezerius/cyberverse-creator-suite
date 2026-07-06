import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SectionHeader, Chip, HudButton } from "@/components/hud";
import { collections } from "@/lib/mock-collections";
import { Package, TrendingDown, Download } from "lucide-react";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Bundles & Collections — Pixels Studio Marketplace" },
      { name: "description", content: "Curated asset bundles from top Pixels Studio creators. Save up to 30% on themed kits." },
    ],
  }),
  component: () => <AppShell><Page /></AppShell>,
});

function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <SectionHeader eyebrow="// Bundles · save up to 30%" title="Curated asset bundles." sub="Themed kits packaged by trusted creators. One purchase, one license, everything you need to ship."
        right={<Link to="/marketplace/list"><HudButton variant="primary"><Package className="w-4 h-4" /> Create a bundle</HudButton></Link>} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {collections.map((c) => (
          <Link key={c.id} to="/collections/$collectionId" params={{ collectionId: c.slug }}
            className="rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_0_var(--ink)] overflow-hidden hover:translate-y-[-2px] transition">
            <div className={`h-40 bg-gradient-to-br ${c.grad} relative flex items-center justify-center`}>
              <div className="text-7xl">{c.emoji}</div>
              {c.badge && <div className="absolute top-3 left-3"><Chip tone="magenta">{c.badge}</Chip></div>}
              <div className="absolute top-3 right-3"><Chip tone="green"><TrendingDown className="w-3 h-3" /> −{c.discount}%</Chip></div>
              <div className="absolute bottom-3 left-3 flex gap-1">
                {c.assetIds.map((_, i) => <div key={i} className="w-8 h-8 rounded-lg bg-white/80 border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold">A{i + 1}</div>)}
              </div>
            </div>
            <div className="p-4">
              <div className="font-black text-lg italic truncate" style={{ fontFamily: "var(--font-display)" }}>{c.title}</div>
              <div className="text-xs font-mono text-ink/60">by @{c.curator} · {c.assetIds.length} assets</div>
              <p className="mt-2 text-sm text-ink/70 line-clamp-2">{c.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50">Bundle price</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xl font-black">{c.price.toLocaleString()} PX</span>
                    <span className="font-mono text-xs text-ink/40 line-through">{c.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-ink/60"><Download className="w-3 h-3" /> {c.downloads}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
