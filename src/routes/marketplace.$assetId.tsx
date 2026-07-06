import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader, Stat } from "@/components/hud";
import { assets, getAsset, licenseTone, type License, type Asset } from "@/lib/marketplace-data";
import { ArrowLeft, Star, Download, Heart, Share2, Flag, Package, Calendar, Ruler, FileArchive, Tag, Check, X, Wallet, CreditCard, Shield, MessageSquare, ThumbsUp } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/marketplace/$assetId")({
  loader: ({ params }) => {
    const asset = getAsset(params.assetId);
    if (!asset) throw notFound();
    return { asset };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Asset not found — Pixels Studio" }, { name: "robots", content: "noindex" }] };
    const a = loaderData.asset;
    return {
      meta: [
        { title: `${a.name} — ${a.artist} · Pixels Studio` },
        { name: "description", content: a.description ?? `${a.type} asset by ${a.artist}` },
      ],
    };
  },
  notFoundComponent: () => (
    <AppShell>
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="italic font-black text-4xl mb-3" style={{ fontFamily: "var(--font-display)" }}>Asset not found.</div>
        <p className="text-ink/60 mb-6">This asset may have been unlisted by its creator.</p>
        <Link to="/marketplace"><HudButton variant="primary">← Back to marketplace</HudButton></Link>
      </div>
    </AppShell>
  ),
  errorComponent: ({ error, reset }) => (
    <AppShell>
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="italic font-black text-3xl mb-3" style={{ fontFamily: "var(--font-display)" }}>Something broke.</div>
        <p className="text-ink/60 mb-6 font-mono text-sm">{error.message}</p>
        <HudButton variant="primary" onClick={() => reset()}>Retry</HudButton>
      </div>
    </AppShell>
  ),
  component: () => (
    <AppShell>
      <AssetDetail />
    </AppShell>
  ),
});

function AssetDetail() {
  const { asset } = Route.useLoaderData();
  const [buying, setBuying] = useState(false);
  const [fav, setFav] = useState(false);
  const Icon = asset.icon;

  const related = assets.filter((a) => a.id !== asset.id && a.type === asset.type).slice(0, 4);

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <Link to="/marketplace" className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-ink/60 hover:text-ink mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to marketplace
      </Link>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mb-8">
        {/* Preview */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
          <div className={`h-80 bg-gradient-to-br ${asset.grad} relative flex items-center justify-center border-b-2 border-ink`}>
            <Icon className="w-24 h-24 text-ink/70" />
            <div className="absolute top-4 left-4 flex gap-1 flex-wrap">
              <Chip>{asset.type}</Chip>
              {asset.featured && <Chip tone="amber">★ Featured</Chip>}
              {asset.new && <Chip tone="green">New</Chip>}
              {asset.free && <Chip tone="green">Free</Chip>}
            </div>
          </div>
          {/* Thumbnail strip */}
          <div className="p-3 flex gap-2 overflow-x-auto">
            {[0,1,2,3].map((i) => (
              <div key={i} className={`shrink-0 w-20 h-16 rounded-xl border-2 ${i === 0 ? "border-primary shadow-[2px_2px_0_0_var(--ink)]" : "border-ink/30"} bg-gradient-to-br ${asset.grad} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-ink/70" />
              </div>
            ))}
          </div>
        </div>

        {/* Purchase panel */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] p-6 flex flex-col">
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">// {asset.type} · {asset.version}</div>
          <h1 className="mt-1 italic font-black text-4xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>{asset.name}</h1>
          <Link to="/profile" className="mt-2 text-sm font-mono text-primary hover:underline">by {asset.artist}</Link>

          <div className="mt-4 flex items-center gap-3 text-sm font-mono">
            <span className="inline-flex items-center gap-1"><Star className="w-4 h-4 fill-[oklch(0.75_0.20_50)] text-[oklch(0.75_0.20_50)]" /> {asset.rating} <span className="text-ink/50">(214)</span></span>
            <span className="text-ink/30">·</span>
            <span className="inline-flex items-center gap-1 text-ink/70"><Download className="w-4 h-4" /> {asset.downloads.toLocaleString()}</span>
          </div>

          <div className="mt-5 p-4 rounded-2xl bg-muted/40 border-2 border-ink/20">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Starting at</div>
            <div className="flex items-baseline gap-2">
              {asset.free ? (
                <div className="italic font-black text-5xl text-[oklch(0.45_0.20_140)]" style={{ fontFamily: "var(--font-display)" }}>Free</div>
              ) : (
                <>
                  <div className="italic font-black text-5xl text-primary" style={{ fontFamily: "var(--font-display)" }}>{asset.price.toLocaleString()}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-ink/60">$PIXEL</div>
                </>
              )}
            </div>
            <div className="mt-2 text-xs text-ink/60">
              Default license: <span className="font-bold">{asset.license}</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {asset.free ? (
              <HudButton variant="success" className="col-span-2" onClick={() => setBuying(true)}><Download className="w-4 h-4" /> Download to library</HudButton>
            ) : (
              <HudButton variant="primary" className="col-span-2" onClick={() => setBuying(true)}>Buy license →</HudButton>
            )}
            <HudButton variant="secondary" onClick={() => setFav(!fav)}>
              <Heart className={`w-4 h-4 ${fav ? "fill-primary text-primary" : ""}`} /> {fav ? "Saved" : "Save"}
            </HudButton>
            <HudButton variant="secondary"><Share2 className="w-4 h-4" /> Share</HudButton>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-ink/60">
            <Shield className="w-3.5 h-3.5" /> Escrow-protected · 24h refund window
          </div>
        </div>
      </div>

      {/* Metadata strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <MetaCard icon={FileArchive} label="File size" value={asset.fileSize ?? "—"} />
        <MetaCard icon={Ruler} label="Dimensions" value={asset.dimensions ?? "—"} />
        <MetaCard icon={Package} label="Format" value={asset.format ?? "—"} />
        <MetaCard icon={Calendar} label="Updated" value={asset.updatedAt ?? "—"} />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div className="space-y-6">
          {/* Description */}
          <HudCard>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">// Description</div>
            <p className="text-base leading-relaxed text-ink/90">{asset.description}</p>
            {asset.tags && asset.tags.length > 0 && (
              <div className="mt-4 flex items-center flex-wrap gap-2">
                <Tag className="w-3.5 h-3.5 text-ink/60" />
                {asset.tags.map((t) => (
                  <span key={t} className="px-2.5 h-6 inline-flex items-center rounded-full bg-muted border-2 border-ink/20 font-mono text-[11px]">#{t}</span>
                ))}
              </div>
            )}
          </HudCard>

          {/* License tiers */}
          {!asset.free && (
            <HudCard>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// License tiers</div>
              <div className="grid md:grid-cols-3 gap-3">
                <LicenseTier name="Single Game" price={asset.price} perks={["1 shipped game", "Non-transferable", "No resale"]} />
                <LicenseTier name="All My Games" price={Math.round(asset.price * 2.5)} perks={["Unlimited of your games", "Non-transferable", "No resale"]} recommended />
                <LicenseTier name="Resellable" price={Math.round(asset.price * 5)} perks={["Unlimited of your games", "Bundle into templates", "Resale allowed"]} />
              </div>
            </HudCard>
          )}

          {/* Compatibility */}
          <HudCard>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">// Compatibility</div>
            <ul className="space-y-1.5">
              {(asset.compatibility ?? []).map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-[oklch(0.55_0.22_140)]" strokeWidth={3} /> {c}</li>
              ))}
            </ul>
          </HudCard>

          {/* Reviews */}
          <HudCard>
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">// Reviews (3)</div>
              <HudButton variant="secondary" className="h-8 px-3"><MessageSquare className="w-3.5 h-3.5" /> Write one</HudButton>
            </div>
            <div className="space-y-4">
              {sampleReviews.map((r) => (
                <div key={r.by} className="border-t-2 border-ink/10 pt-4 first:border-0 first:pt-0">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center font-mono text-[10px]">{r.by.slice(1,3).toUpperCase()}</div>
                    <div className="font-bold">{r.by}</div>
                    <div className="flex items-center gap-0.5 text-[oklch(0.75_0.20_50)]">
                      {[...Array(r.stars)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <div className="ml-auto text-[11px] font-mono text-ink/50">{r.when}</div>
                  </div>
                  <p className="mt-2 text-sm text-ink/80">{r.body}</p>
                  <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-mono text-ink/60 hover:text-ink"><ThumbsUp className="w-3 h-3" /> Helpful ({r.helpful})</button>
                </div>
              ))}
            </div>
          </HudCard>
        </div>

        <div className="space-y-6">
          {/* Creator card */}
          <HudCard>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// Creator</div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center font-mono text-sm">{asset.artist.slice(1,3).toUpperCase()}</div>
              <div>
                <div className="font-bold italic text-lg" style={{ fontFamily: "var(--font-display)" }}>{asset.artist}</div>
                <div className="text-xs font-mono text-ink/60">Verified creator · Since 2024</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <MiniStat label="Assets" value="12" />
              <MiniStat label="Sales" value="8.2k" />
              <MiniStat label="Rating" value="4.8★" />
            </div>
            <HudButton variant="secondary" className="w-full mt-4">Visit shop</HudButton>
          </HudCard>

          <HudCard>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">// Safety</div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" /><span>Scanned for malware & prohibited content on upload.</span></li>
              <li className="flex items-start gap-2"><Check className="w-4 h-4 text-[oklch(0.55_0.22_140)] shrink-0 mt-0.5" strokeWidth={3} /><span>Copyright cleared — creator holds full IP rights.</span></li>
            </ul>
            <button className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono text-ink/60 hover:text-ink"><Flag className="w-3 h-3" /> Report this asset</button>
          </HudCard>
        </div>
      </div>

      {/* Related */}
      <div className="mt-12">
        <SectionHeader eyebrow="// You might also like" title={`More ${asset.type.toLowerCase()}`} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map((a) => {
            const RIcon = a.icon;
            return (
              <Link key={a.id} to="/marketplace/$assetId" params={{ assetId: a.id }} className="bg-white border-2 border-ink rounded-3xl shadow-[3px_3px_0_0_var(--ink)] overflow-hidden hover:translate-y-[-2px] transition-transform">
                <div className={`h-24 bg-gradient-to-br ${a.grad} border-b-2 border-ink flex items-center justify-center`}>
                  <RIcon className="w-7 h-7 text-ink/70" />
                </div>
                <div className="p-3">
                  <div className="font-bold italic leading-tight" style={{ fontFamily: "var(--font-display)" }}>{a.name}</div>
                  <div className="mt-1 flex items-center justify-between text-xs font-mono">
                    <span className="text-ink/60">{a.artist}</span>
                    <span className={a.free ? "text-[oklch(0.45_0.20_140)] font-bold" : "text-primary font-bold"}>
                      {a.free ? "Free" : `${a.price.toLocaleString()} PX`}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {buying && <SimpleCheckout asset={asset} onClose={() => setBuying(false)} />}
    </div>
  );
}

function MetaCard({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string }) {
  return (
    <div className="bg-white border-2 border-ink rounded-2xl shadow-[2px_2px_0_0_var(--ink)] p-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl border-2 border-ink bg-accent flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">{label}</div>
        <div className="font-bold text-sm truncate">{value}</div>
      </div>
    </div>
  );
}

function LicenseTier({ name, price, perks, recommended }: { name: string; price: number; perks: string[]; recommended?: boolean }) {
  return (
    <div className={`p-4 rounded-2xl border-2 border-ink ${recommended ? "bg-accent shadow-[3px_3px_0_0_var(--ink)]" : "bg-white"}`}>
      <div className="text-[10px] font-mono uppercase tracking-widest">{name}</div>
      <div className="italic font-black text-2xl mt-1 text-primary" style={{ fontFamily: "var(--font-display)" }}>{price.toLocaleString()}</div>
      <div className="text-[10px] font-mono text-ink/60 mb-3">$PIXEL</div>
      <ul className="space-y-1.5">
        {perks.map((p) => <li key={p} className="flex items-start gap-1.5 text-xs"><Check className="w-3 h-3 text-[oklch(0.55_0.22_140)] shrink-0 mt-0.5" strokeWidth={3} /> {p}</li>)}
      </ul>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-2 border-ink/20 rounded-xl p-2 text-center bg-muted/30">
      <div className="italic font-black text-lg" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
      <div className="text-[9px] font-mono uppercase tracking-widest text-ink/60">{label}</div>
    </div>
  );
}

function SimpleCheckout({ asset, onClose }: { asset: Asset; onClose: () => void }) {
  const [step, setStep] = useState<"review" | "done">("review");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md bg-background border-2 border-ink rounded-3xl shadow-[6px_6px_0_0_var(--ink)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 h-12 border-b-2 border-ink bg-primary text-primary-foreground">
          <div className="text-[11px] font-mono uppercase tracking-widest">{step === "done" ? "// Done" : (asset.free ? "// Confirm download" : "// Quick checkout")}</div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-primary-foreground text-primary flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>
        {step === "review" ? (
          <div className="p-6 space-y-4">
            <div className="text-sm">
              {asset.free ? "Add" : "License"} <span className="font-bold">{asset.name}</span> {asset.free ? "to your library?" : `for ${asset.price.toLocaleString()} $PIXEL?`}
            </div>
            {!asset.free && (
              <div className="p-3 rounded-2xl bg-muted/40 border-2 border-ink/20 text-xs font-mono flex items-center gap-2">
                <Wallet className="w-4 h-4" /> $PIXEL Wallet · 12,480 available
              </div>
            )}
            <HudButton variant="primary" className="w-full" onClick={() => setStep("done")}>
              {asset.free ? "Download now" : "Confirm & pay"}
            </HudButton>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-accent border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center"><Check className="w-7 h-7" strokeWidth={3} /></div>
            <div className="mt-4 italic font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>All set!</div>
            <div className="mt-2 text-sm text-ink/60">Available now in your editor asset drawer.</div>
            <HudButton variant="primary" className="mt-5" onClick={onClose}>Nice</HudButton>
          </div>
        )}
      </div>
    </div>
  );
}

const sampleReviews = [
  { by: "@drift.dev", stars: 5, when: "3 days ago", helpful: 12, body: "Slotted right into my project. Auto-tiling rules just work, and the artist replied to my Discord DM within an hour when I had a question." },
  { by: "@holo.studio", stars: 5, when: "2 weeks ago", helpful: 8, body: "Best-in-class. Worth every $PIXEL — used it in two shipped games so far under the All My Games tier." },
  { by: "@bytebrawl", stars: 4, when: "1 month ago", helpful: 3, body: "Great pack, wish there were a few more variants for the neon-signage tiles. Docked one star for that." },
];
