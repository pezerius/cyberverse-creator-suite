import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SectionHeader, Chip, HudButton } from "@/components/hud";
import { EmptyState } from "@/components/EmptyState";
import { wishlistAssetIds, followedCreators, followedGames } from "@/lib/mock-wishlist";
import { getAsset } from "@/lib/marketplace-data";
import { getGame } from "@/lib/mock-games";
import { getCreator } from "@/lib/mock-creators";
import { Heart, Bell, X, Star, Gamepad2 } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist & Follows — Pixels Studio" }, { name: "description", content: "Assets you want, creators you follow, games you're tracking." }] }),
  component: () => <AppShell><Page /></AppShell>,
});

function Page() {
  const assets = wishlistAssetIds.map((id) => getAsset(id)).filter(Boolean);
  const gameFollows = followedGames.map((s) => getGame(s)).filter(Boolean);
  const creatorFollows = followedCreators.map((h) => getCreator(h)).filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <SectionHeader eyebrow="// Wishlist · Follows" title="Everything you're watching." sub="You get a notification the moment a wishlisted asset drops, a game updates, or a followed creator ships." />

      {/* Assets */}
      <section className="mb-8">
        <h2 className="text-xl font-black italic mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}><Heart className="w-5 h-5 text-primary fill-current" /> Wishlisted assets</h2>
        {assets.length === 0 ? (
          <EmptyState emoji="💔" title="No wishlisted assets." sub="Tap the heart on any marketplace listing to save it." action={<Link to="/marketplace"><HudButton>Browse marketplace</HudButton></Link>} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((a) => a && (
              <div key={a.id} className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] overflow-hidden group relative">
                <button className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center opacity-0 group-hover:opacity-100"><X className="w-3.5 h-3.5" /></button>
                <Link to="/marketplace/$assetId" params={{ assetId: a.id }} className="block">
                  <div className={`h-32 bg-gradient-to-br ${a.grad} flex items-center justify-center`}><a.icon className="w-10 h-10 text-ink/70" /></div>
                  <div className="p-3">
                    <div className="font-bold truncate">{a.name}</div>
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="font-mono text-ink/60">@{a.artist}</span>
                      <Chip tone={a.free ? "green" : "amber"}>{a.free ? "Free" : `${a.price} PX`}</Chip>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Games */}
      <section className="mb-8">
        <h2 className="text-xl font-black italic mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}><Gamepad2 className="w-5 h-5" /> Following games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gameFollows.map((g) => g && (
            <Link key={g.slug} to="/g/$slug" params={{ slug: g.slug }} className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] overflow-hidden">
              <div className={`h-32 bg-gradient-to-br ${g.grad} flex items-center justify-center text-5xl`}>{g.emoji}</div>
              <div className="p-3">
                <div className="font-bold truncate">{g.title}</div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-ink/60 font-mono">{g.updated}</span>
                  <span className="flex items-center gap-1 font-mono text-[oklch(0.55_0.22_45)]"><Star className="w-3 h-3 fill-current" /> {g.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Creators */}
      <section>
        <h2 className="text-xl font-black italic mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}><Bell className="w-5 h-5" /> Followed creators</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {creatorFollows.map((c) => c && (
            <Link key={c.handle} to="/u/$handle" params={{ handle: c.handle }} className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-4 text-center hover:translate-y-[-2px] transition">
              <div className="w-14 h-14 mx-auto rounded-full bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center font-black text-lg">{c.avatar}</div>
              <div className="mt-2 font-bold text-sm truncate">@{c.handle}</div>
              <div className="text-[10px] font-mono text-ink/60 truncate">{c.followers.toLocaleString()} followers</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
