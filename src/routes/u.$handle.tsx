import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, Chip, Stat } from "@/components/hud";
import { EmptyState } from "@/components/EmptyState";
import { ReportButton } from "@/components/ReportButton";
import { getCreator } from "@/lib/mock-creators";
import { getGame } from "@/lib/mock-games";
import { getAsset } from "@/lib/marketplace-data";
import { UserPlus, MessageCircle, Share2, Award, Star, Calendar, MapPin, ExternalLink, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/u/$handle")({
  loader: ({ params }) => {
    const c = getCreator(params.handle);
    if (!c) throw notFound();
    return { creator: c };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Creator not found — Pixels Studio" }, { name: "robots", content: "noindex" }] };
    const c = loaderData.creator;
    return {
      meta: [
        { title: `@${c.handle} — ${c.name} · Pixels Studio Creator` },
        { name: "description", content: c.bio },
        { property: "og:title", content: `@${c.handle} on Pixels Studio` },
        { property: "og:description", content: c.bio },
      ],
    };
  },
  notFoundComponent: () => (
    <AppShell>
      <div className="max-w-2xl mx-auto p-8 text-center">
        <EmptyState emoji="👤" title="Creator not found." sub="This handle isn't in the Pixels registry." action={<Link to="/hub"><HudButton>Back to hub</HudButton></Link>} />
      </div>
    </AppShell>
  ),
  component: () => <AppShell><Page /></AppShell>,
});

function Page() {
  const { creator } = Route.useLoaderData();
  const [following, setFollowing] = useState(false);
  const c = creator;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_0_var(--ink)] overflow-hidden mb-6">
        <div className="h-32 md:h-40 bg-gradient-to-br from-primary/50 via-[oklch(0.72_0.18_290)]/40 to-accent/40 border-b-2 border-ink relative">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 2px, transparent 3px), radial-gradient(circle at 70% 60%, white 2px, transparent 3px)" }} />
        </div>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between -mt-16">
            <div className="flex min-w-0 items-end gap-4 flex-wrap">
              <div className="w-24 h-24 rounded-2xl bg-primary text-primary-foreground border-4 border-ink shadow-[4px_4px_0_0_var(--ink)] flex items-center justify-center text-3xl font-black shrink-0">{c.avatar}</div>
              <div className="min-w-0 pb-1">
                <h1 className="text-2xl md:text-3xl font-black italic truncate" style={{ fontFamily: "var(--font-display)" }}>{c.name}</h1>
                <div className="font-mono text-sm text-ink/60">@{c.handle}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.badges.map((b) => <Chip key={b} tone="cyan"><Award className="w-3 h-3" /> {b}</Chip>)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 pb-1 shrink-0">
              <button onClick={() => setFollowing((v) => !v)}
                className={`inline-flex items-center gap-2 px-4 h-10 rounded-full border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] text-xs font-mono uppercase tracking-widest ${following ? "bg-accent text-ink" : "bg-primary text-primary-foreground"}`}>
                {following ? <><Check className="w-4 h-4" /> Following</> : <><UserPlus className="w-4 h-4" /> Follow</>}
              </button>
              <button className="w-10 h-10 rounded-full bg-white border-2 border-ink flex items-center justify-center shadow-[2px_2px_0_0_var(--ink)]"><MessageCircle className="w-4 h-4" /></button>
              <button className="w-10 h-10 rounded-full bg-white border-2 border-ink flex items-center justify-center shadow-[2px_2px_0_0_var(--ink)]"><Share2 className="w-4 h-4" /></button>
              <ReportButton targetLabel={`@${c.handle}`} size="sm" />
            </div>
          </div>
          <p className="mt-5 text-ink/80 max-w-2xl">{c.bio}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-[11px] font-mono uppercase tracking-widest text-ink/60">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined {c.joined}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {c.region}</span>
            {c.socials?.map((s) => <span key={s.label} className="flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5" /> {s.url}</span>)}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Stat label="Followers" value={c.followers.toLocaleString()} />
        <Stat label="Following" value={c.following.toLocaleString()} />
        <Stat label="Total plays" value={c.totalPlays} />
        <Stat label="Rating" value={`★ ${c.rating}`} />
      </div>

      {/* Games */}
      <section className="mb-8">
        <h2 className="text-xl font-black italic mb-3" style={{ fontFamily: "var(--font-display)" }}>Games</h2>
        {c.games.length === 0 ? (
          <EmptyState emoji="🎮" title="No games shipped yet." sub="This creator focuses on assets." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.games.map((slug) => {
              const g = getGame(slug); if (!g) return null;
              return (
                <Link key={slug} to="/g/$slug" params={{ slug }} className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] overflow-hidden hover:translate-y-[-2px] transition">
                  <div className={`h-32 bg-gradient-to-br ${g.grad} flex items-center justify-center text-5xl`}>{g.emoji}</div>
                  <div className="p-3">
                    <div className="font-bold truncate">{g.title}</div>
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="text-ink/60 font-mono">{g.plays} plays</span>
                      <span className="flex items-center gap-1 font-mono text-[oklch(0.55_0.22_45)]"><Star className="w-3 h-3 fill-current" /> {g.rating}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Assets */}
      <section>
        <h2 className="text-xl font-black italic mb-3" style={{ fontFamily: "var(--font-display)" }}>Assets on the marketplace</h2>
        {c.assets.length === 0 ? (
          <EmptyState emoji="📦" title="No assets listed." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.assets.map((id) => {
              const a = getAsset(id); if (!a) return null;
              return (
                <Link key={id} to="/marketplace/$assetId" params={{ assetId: id }} className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] overflow-hidden hover:translate-y-[-2px] transition">
                  <div className={`h-28 bg-gradient-to-br ${a.grad} flex items-center justify-center`}><a.icon className="w-10 h-10 text-ink/70" /></div>
                  <div className="p-3">
                    <div className="font-bold truncate">{a.name}</div>
                    <div className="mt-1 text-xs font-mono text-ink/60">{a.type} · {a.free ? "Free" : `${a.price} PX`}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
