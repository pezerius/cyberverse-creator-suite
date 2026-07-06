import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, Chip, Stat } from "@/components/hud";
import { EmptyState } from "@/components/EmptyState";
import { getCollection } from "@/lib/mock-collections";
import { getAsset } from "@/lib/marketplace-data";
import { ArrowLeft, TrendingDown, Package, ShoppingBag, Check } from "lucide-react";

export const Route = createFileRoute("/collections/$collectionId")({
  loader: ({ params }) => {
    const c = getCollection(params.collectionId); if (!c) throw notFound();
    return { collection: c };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Bundle not found" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.collection;
    return { meta: [
      { title: `${c.title} — Bundle · Pixels Studio` },
      { name: "description", content: c.description },
      { property: "og:title", content: `${c.title} · Save ${c.discount}%` },
      { property: "og:description", content: c.description },
    ] };
  },
  notFoundComponent: () => <AppShell><div className="p-8 max-w-xl mx-auto"><EmptyState emoji="📦" title="Bundle not found." action={<Link to="/collections"><HudButton>Browse bundles</HudButton></Link>} /></div></AppShell>,
  component: () => <AppShell><Page /></AppShell>,
});

function Page() {
  const { collection: c } = Route.useLoaderData();
  const assets = c.assetIds.map((id: string) => getAsset(id)).filter(Boolean);
  const savings = c.originalPrice - c.price;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <Link to="/collections" className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-ink/60 hover:text-ink mb-4"><ArrowLeft className="w-3 h-3" /> All bundles</Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div>
          <div className={`rounded-2xl border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] overflow-hidden mb-6`}>
            <div className={`aspect-[16/9] bg-gradient-to-br ${c.grad} flex items-center justify-center relative`}>
              <div className="text-8xl">{c.emoji}</div>
              <div className="absolute top-4 left-4 flex gap-1.5">
                {c.badge && <Chip tone="magenta">{c.badge}</Chip>}
                <Chip tone="green"><TrendingDown className="w-3 h-3" /> Save {c.discount}%</Chip>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black italic mb-2" style={{ fontFamily: "var(--font-display)" }}>{c.title}</h1>
          <div className="font-mono text-sm text-ink/60 mb-4">Curated by <Link to="/u/$handle" params={{ handle: c.curator }} className="hover:underline text-ink font-bold">@{c.curator}</Link></div>
          <p className="text-ink/80 leading-relaxed mb-6">{c.description}</p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <Stat label="Assets" value={String(c.assetIds.length)} />
            <Stat label="Downloads" value={c.downloads.toLocaleString()} />
            <Stat label="You save" value={`${savings.toLocaleString()} PX`} sub={`vs. buying separately`} />
          </div>

          <h2 className="text-xl font-black italic mb-3" style={{ fontFamily: "var(--font-display)" }}>What's inside</h2>
          <div className="space-y-3">
            {assets.map((a: any) => a && (
              <Link key={a.id} to="/marketplace/$assetId" params={{ assetId: a.id }}
                className="flex items-center gap-4 p-3 rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] hover:translate-y-[-1px] transition">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${a.grad} border-2 border-ink flex items-center justify-center shrink-0`}><a.icon className="w-6 h-6 text-ink/70" /></div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold truncate">{a.name}</div>
                  <div className="text-xs font-mono text-ink/60">by @{a.artist} · {a.type}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono text-xs text-ink/40 line-through">{a.price} PX</div>
                  <Chip tone="green"><Check className="w-3 h-3" /> Included</Chip>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sticky buy panel */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_0_var(--ink)] p-5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Bundle price</div>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl font-black font-mono">{c.price.toLocaleString()}</span>
              <span className="font-mono text-sm text-ink/60">PX</span>
              <span className="font-mono text-sm text-ink/40 line-through ml-auto">{c.originalPrice.toLocaleString()}</span>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-accent/40 border-2 border-ink flex items-center gap-2 text-sm">
              <TrendingDown className="w-4 h-4" />
              <span>You save <b>{savings.toLocaleString()} PX</b> · <b>−{c.discount}%</b></span>
            </div>
            <HudButton variant="primary" size="lg" className="w-full mt-4"><ShoppingBag className="w-4 h-4" /> Buy the bundle</HudButton>
            <button className="w-full mt-2 px-4 h-9 rounded-full bg-white border-2 border-ink text-xs font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">Add to wishlist</button>
            <div className="mt-4 pt-4 border-t-2 border-ink/10 text-[11px] text-ink/60 space-y-1.5">
              <div className="flex items-center gap-2"><Check className="w-3 h-3 text-accent" /> One license covers every asset</div>
              <div className="flex items-center gap-2"><Check className="w-3 h-3 text-accent" /> All future minor updates free</div>
              <div className="flex items-center gap-2"><Check className="w-3 h-3 text-accent" /> 24h refund if unused</div>
              <div className="flex items-center gap-2"><Package className="w-3 h-3 text-accent" /> Splits auto-paid to each creator</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
