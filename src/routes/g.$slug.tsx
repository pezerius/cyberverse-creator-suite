import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, Chip, Stat } from "@/components/hud";
import { EmptyState } from "@/components/EmptyState";
import { ReportButton } from "@/components/ReportButton";
import { getGame } from "@/lib/mock-games";
import { gameReviews } from "@/lib/mock-reviews";
import { Play, Star, Users, Clock, Heart, Share2, Award, MessageSquare, ThumbsUp, Check, TrendingUp } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/g/$slug")({
  loader: ({ params }) => {
    const g = getGame(params.slug); if (!g) throw notFound();
    return { game: g };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Game not found — Pixels Studio" }, { name: "robots", content: "noindex" }] };
    const g = loaderData.game;
    return {
      meta: [
        { title: `${g.title} — Play on Pixels Studio` },
        { name: "description", content: g.tagline },
        { property: "og:title", content: g.title },
        { property: "og:description", content: g.tagline },
      ],
    };
  },
  notFoundComponent: () => (
    <AppShell><div className="max-w-2xl mx-auto p-8"><EmptyState emoji="🎮" title="Game not found." action={<Link to="/hub"><HudButton>Browse hub</HudButton></Link>} /></div></AppShell>
  ),
  component: () => <AppShell><Page /></AppShell>,
});

function Page() {
  const { game: g } = Route.useLoaderData();
  const [wish, setWish] = useState(false);
  const reviews = gameReviews[g.slug] ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      {/* Trailer */}
      <div className="rounded-2xl border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] overflow-hidden mb-6">
        <div className={`aspect-video bg-gradient-to-br ${g.trailer.grad} relative flex items-center justify-center`}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <button className="w-24 h-24 rounded-full bg-primary text-primary-foreground border-4 border-ink shadow-[4px_4px_0_0_var(--ink)] flex items-center justify-center hover:scale-105 transition">
            <Play className="w-10 h-10 ml-1" fill="currentColor" />
          </button>
          <div className="absolute bottom-3 right-3 px-2 h-6 rounded-full bg-ink text-background text-[10px] font-mono uppercase tracking-widest flex items-center">TRAILER · {g.trailer.duration}</div>
          <div className="absolute top-3 left-3 flex gap-1.5">
            <Chip tone="magenta">▶ Trending #3</Chip>
            <Chip tone="cyan"><Users className="w-3 h-3" /> {g.players} players</Chip>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between mb-6">
        <div className="min-w-0">
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">// Realm-7 · {g.tags[0]}</div>
          <h1 className="text-3xl md:text-4xl font-black italic truncate" style={{ fontFamily: "var(--font-display)" }}>{g.title}</h1>
          <p className="mt-2 text-ink/70 max-w-2xl">{g.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">{g.tags.map((t) => <Chip key={t}>{t}</Chip>)}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setWish(!wish)} className={`w-11 h-11 rounded-full border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center ${wish ? "bg-primary text-primary-foreground" : "bg-white"}`}>
            <Heart className={`w-4 h-4 ${wish ? "fill-current" : ""}`} />
          </button>
          <button className="w-11 h-11 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center"><Share2 className="w-4 h-4" /></button>
          <ReportButton targetLabel={g.title} size="sm" />
          <HudButton variant="primary" size="lg"><Play className="w-4 h-4" fill="currentColor" /> {g.free ? "Play free" : `Buy · ${g.price}`}</HudButton>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Stat label="Total plays" value={g.plays} />
        <Stat label="Rating" value={`★ ${g.rating}`} sub={`${g.reviews.toLocaleString()} reviews`} />
        <Stat label="Avg session" value={g.sessionAvg} />
        <Stat label="Version" value={g.version} sub={g.updated} />
      </div>

      {/* Screenshots */}
      <section className="mb-8">
        <h2 className="text-xl font-black italic mb-3" style={{ fontFamily: "var(--font-display)" }}>Screenshots</h2>
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-2 px-2 snap-x">
          {g.screenshots.map((s, i) => (
            <div key={i} className="w-72 shrink-0 snap-start rounded-2xl border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] overflow-hidden">
              <div className={`h-40 bg-gradient-to-br ${s.grad} flex items-center justify-center text-5xl`}>{s.emoji}</div>
              <div className="p-2 text-[11px] font-mono text-ink/60 border-t-2 border-ink/10 truncate">{s.caption}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* About + Reviews */}
        <div>
          <section className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-5 mb-6">
            <h2 className="text-xl font-black italic mb-3" style={{ fontFamily: "var(--font-display)" }}>About this game</h2>
            <p className="text-ink/80 leading-relaxed">{g.description}</p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl font-black italic" style={{ fontFamily: "var(--font-display)" }}>Reviews</h2>
              <Chip tone="amber">★ {g.rating} · {g.reviews.toLocaleString()}</Chip>
            </div>
            {reviews.length === 0 ? (
              <EmptyState emoji="✍" title="No reviews yet." sub="Be the first to write one after your first session." />
            ) : (
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div key={r.id} className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-4">
                    <div className="flex items-start gap-3">
                      <Link to="/u/$handle" params={{ handle: r.author }} className="w-10 h-10 rounded-full bg-accent border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold shrink-0">{r.avatar}</Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link to="/u/$handle" params={{ handle: r.author }} className="font-bold text-sm hover:underline">@{r.author}</Link>
                          {r.verified && <Chip tone="green"><Check className="w-3 h-3" /> Verified owner</Chip>}
                          <div className="flex items-center gap-0.5 text-[oklch(0.55_0.22_45)]">
                            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5" fill={i < r.rating ? "currentColor" : "none"} />)}
                          </div>
                          <span className="text-[10px] font-mono text-ink/50 ml-auto">{r.ts}</span>
                        </div>
                        <p className="mt-2 text-sm text-ink/80">{r.body}</p>
                        <div className="mt-3 flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-ink/50">
                          <button className="flex items-center gap-1 hover:text-ink"><ThumbsUp className="w-3 h-3" /> Helpful ({r.helpful})</button>
                          <button className="flex items-center gap-1 hover:text-ink"><MessageSquare className="w-3 h-3" /> Reply</button>
                        </div>
                        {r.response && (
                          <div className="mt-3 ml-4 pl-3 border-l-2 border-primary bg-primary/5 rounded-r-lg p-3">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">{r.response.author} · {r.response.ts}</div>
                            <p className="mt-1 text-sm">{r.response.body}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Creator + splits */}
        <aside className="space-y-4">
          <div className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">Created by</div>
            <Link to="/u/$handle" params={{ handle: g.creatorHandle }} className="flex items-center gap-3 hover:bg-muted/50 rounded-xl p-2 -m-2">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center font-mono font-bold shrink-0">{g.creatorHandle.slice(0, 2).toUpperCase()}</div>
              <div><div className="font-bold">{g.creator}</div><div className="text-xs font-mono text-ink/60">@{g.creatorHandle}</div></div>
            </Link>
            <button className="mt-3 w-full px-3 h-9 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] text-xs font-mono uppercase tracking-widest">Follow creator</button>
          </div>

          {g.splits && (
            <div className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3 flex items-center gap-1"><Award className="w-3 h-3" /> Revenue splits</div>
              <div className="space-y-3">
                {g.splits.map((s) => (
                  <div key={s.handle}>
                    <div className="flex items-center justify-between text-xs">
                      <Link to="/u/$handle" params={{ handle: s.handle }} className="font-bold hover:underline">@{s.handle}</Link>
                      <span className="font-mono">{s.percent}%</span>
                    </div>
                    <div className="text-[10px] text-ink/50 font-mono">{s.role}</div>
                    <div className="mt-1 h-1.5 rounded-full bg-ink/10 overflow-hidden"><div className="h-full bg-primary" style={{ width: `${s.percent}%` }} /></div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-[10px] font-mono text-ink/50">Every sale auto-splits on-chain via the Pixels payout router.</div>
            </div>
          )}

          <div className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Live activity</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> 428 playing now</div>
              <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> 12 rooms open</div>
              <div className="flex items-center gap-2"><Users className="w-3 h-3" /> 3 friends inside</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
