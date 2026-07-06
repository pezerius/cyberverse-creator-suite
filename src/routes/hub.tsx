import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Chip, SectionHeader } from "@/components/hud";
import { friends } from "@/lib/mock-social";
import { gamesList, type Game } from "@/lib/mock-games";
import { Play, Star, Users, Flame, Sparkles, Clock, TrendingUp, Search, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: "Discover — Play what your crew is playing · Pixels Studio" },
      { name: "description", content: "Browse trending games, jump into what your friends are playing, and discover new experiences in the CyberVerse." },
      { property: "og:title", content: "Discover — Pixels Studio" },
      { property: "og:description", content: "Trending experiences, friends' activity, and curated categories in the CyberVerse." },
    ],
  }),
  component: () => <AppShell><HubPage /></AppShell>,
});

const CATEGORIES = [
  { key: "all", label: "All", emoji: "◆" },
  { key: "cyberpunk", label: "Cyberpunk", emoji: "🌆" },
  { key: "arcade", label: "Arcade", emoji: "🕹" },
  { key: "co-op", label: "Co-op", emoji: "🤝" },
  { key: "pvp", label: "PvP", emoji: "⚔" },
  { key: "cozy", label: "Cozy", emoji: "🪷" },
  { key: "tactics", label: "Tactics", emoji: "♟" },
  { key: "sandbox", label: "Sandbox", emoji: "🧱" },
  { key: "free-to-play", label: "Free", emoji: "✦" },
];

const presenceColor: Record<string, string> = {
  "online": "bg-accent", "in-game": "bg-primary", "idle": "bg-[oklch(0.80_0.18_75)]", "offline": "bg-ink/20",
};

function HubPage() {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");

  const featured = gamesList[0];
  const trending = useMemo(() => {
    return gamesList.filter((g) => {
      if (cat !== "all" && !g.tags.includes(cat)) return false;
      if (query && !g.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [cat, query]);

  const inGameFriends = friends.filter((f) => f.presence === "in-game" && f.game);

  return (
    <div className="px-4 md:px-6 py-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="// Discover · REALM-7"
        title="Play what your crew is playing."
        sub="Trending experiences, curated drops, and everything your friends are into right now."
      />

      {/* Search + Categories */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/50" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search experiences…"
            className="w-full pl-9 pr-3 h-10 rounded-full border-2 border-ink bg-white text-sm shadow-[2px_2px_0_0_var(--ink)] focus:outline-none" />
        </div>
      </div>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {CATEGORIES.map((c) => (
          <button key={c.key} onClick={() => setCat(c.key)}
            className={`shrink-0 inline-flex items-center gap-1.5 px-4 h-9 rounded-full border-2 text-xs font-mono uppercase tracking-widest ${cat === c.key ? "bg-ink text-background border-ink shadow-[2px_2px_0_0_var(--ink)]" : "bg-white border-ink/30 hover:border-ink"}`}>
            <span className="text-sm">{c.emoji}</span>{c.label}
          </button>
        ))}
      </div>

      {/* Featured Hero */}
      <FeaturedHero game={featured} />

      {/* Friends Are Playing */}
      {inGameFriends.length > 0 && (
        <section className="mt-10">
          <Row title="Friends are playing" icon={<Users className="w-4 h-4" />} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {inGameFriends.map((f) => {
              const g = gamesList.find((x) => x.slug === f.game);
              if (!g) return null;
              return (
                <Link key={f.handle} to="/g/$slug" params={{ slug: g.slug }}
                  className="group rounded-2xl border-2 border-ink bg-white p-3 flex items-center gap-3 shadow-[2px_2px_0_0_var(--ink)] hover:shadow-[4px_4px_0_0_var(--ink)] hover:-translate-y-0.5 transition">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${g.grad} border-2 border-ink flex items-center justify-center text-2xl shrink-0`}>{g.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-mono text-ink/60 flex items-center gap-1.5">
                      <span className="relative inline-flex">
                        <span className={`w-2 h-2 rounded-full ${presenceColor[f.presence]}`} />
                        <span className={`absolute inset-0 w-2 h-2 rounded-full ${presenceColor[f.presence]} animate-ping opacity-60`} />
                      </span>
                      @{f.handle} · playing
                    </div>
                    <div className="font-bold truncate">{g.title}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50 mt-0.5">{g.plays} plays · ★ {g.rating}</div>
                  </div>
                  <div className="shrink-0 w-9 h-9 rounded-full bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center shadow-[2px_2px_0_0_var(--ink)] group-hover:scale-110 transition">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Continue Playing */}
      <section className="mt-10">
        <Row title="Continue playing" icon={<Clock className="w-4 h-4" />} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gamesList.slice(0, 4).map((g, i) => <GameCard key={g.slug} game={g} progress={[68, 42, 91, 15][i]} />)}
        </div>
      </section>

      {/* Trending / grid */}
      <section className="mt-10">
        <Row title={cat === "all" ? "Trending now" : `Trending · ${CATEGORIES.find((c) => c.key === cat)?.label}`} icon={<Flame className="w-4 h-4" />} />
        {trending.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trending.map((g) => <GameCard key={g.slug} game={g} />)}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-ink/30 bg-white/60 p-8 text-center">
            <div className="text-2xl mb-2">◇</div>
            <div className="font-bold">Nothing matches those filters.</div>
            <p className="text-sm text-ink/60 mt-1">Try a different category.</p>
          </div>
        )}
      </section>

      {/* Up next / recommended */}
      <section className="mt-10">
        <Row title="Recommended for you" icon={<Sparkles className="w-4 h-4" />} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...gamesList].reverse().map((g) => <GameCard key={g.slug} game={g} />)}
        </div>
      </section>

      {/* Charts */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Top rated this week" icon={<Star className="w-4 h-4" />}
          items={[...gamesList].sort((a, b) => b.rating - a.rating)} metric={(g) => `★ ${g.rating}`} />
        <ChartCard title="Most played" icon={<TrendingUp className="w-4 h-4" />}
          items={[...gamesList].sort((a, b) => parseInt(b.plays.replace(/,/g, "")) - parseInt(a.plays.replace(/,/g, "")))}
          metric={(g) => `${g.plays} plays`} />
      </section>
    </div>
  );
}

function Row({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl md:text-2xl font-black italic flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]">{icon}</span>
        {title}
      </h2>
      <button className="hidden sm:inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-ink/60 hover:text-ink">
        See all <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}

function FeaturedHero({ game }: { game: Game }) {
  return (
    <Link to="/g/$slug" params={{ slug: game.slug }}
      className={`group relative block rounded-3xl border-2 border-ink overflow-hidden shadow-[6px_6px_0_0_var(--ink)] hover:shadow-[8px_8px_0_0_var(--ink)] hover:-translate-y-0.5 transition`}>
      <div className={`bg-gradient-to-br ${game.grad} p-6 md:p-10 min-h-[280px] md:min-h-[340px] relative`}>
        <div className="absolute top-4 right-4">
          <Chip tone="magenta"><Flame className="w-3 h-3" /> Featured</Chip>
        </div>
        <div className="text-7xl md:text-9xl mb-4">{game.emoji}</div>
        <div className="max-w-2xl">
          <div className="text-[11px] font-mono uppercase tracking-widest text-ink/70 mb-2">// Now trending · by @{game.creatorHandle}</div>
          <h1 className="text-3xl md:text-5xl font-black italic text-ink leading-tight" style={{ fontFamily: "var(--font-display)" }}>{game.title}</h1>
          <p className="mt-2 text-sm md:text-base text-ink/80">{game.tagline}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink/70">
            <span className="inline-flex items-center gap-1"><Star className="w-3 h-3" /> {game.rating} · {game.reviews.toLocaleString()} reviews</span>
            <span>·</span>
            <span>{game.plays} plays</span>
            <span>·</span>
            <span>{game.players} players</span>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 px-5 h-11 rounded-full bg-ink text-background font-mono uppercase tracking-widest text-xs shadow-[3px_3px_0_0_var(--primary)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition">
            <Play className="w-4 h-4 fill-current" /> Play now
          </div>
        </div>
      </div>
    </Link>
  );
}

function GameCard({ game, progress }: { game: Game; progress?: number }) {
  return (
    <Link to="/g/$slug" params={{ slug: game.slug }}
      className="group rounded-2xl border-2 border-ink bg-white overflow-hidden shadow-[3px_3px_0_0_var(--ink)] hover:shadow-[5px_5px_0_0_var(--ink)] hover:-translate-y-0.5 transition">
      <div className={`relative aspect-[4/5] bg-gradient-to-br ${game.grad} border-b-2 border-ink flex items-center justify-center`}>
        <div className="text-6xl md:text-7xl">{game.emoji}</div>
        {game.free && <div className="absolute top-2 left-2"><Chip tone="cyan">Free</Chip></div>}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition">
          <div className="inline-flex items-center gap-1 px-3 h-8 rounded-full bg-ink text-background text-[10px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--primary)]">
            <Play className="w-3 h-3 fill-current" /> Play
          </div>
        </div>
        {progress !== undefined && (
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-ink/20">
            <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="font-bold text-sm truncate">{game.title}</div>
        <div className="mt-1 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-ink/60">
          <span className="inline-flex items-center gap-1"><Star className="w-3 h-3" /> {game.rating}</span>
          <span>{game.plays}</span>
        </div>
      </div>
    </Link>
  );
}

function ChartCard({ title, icon, items, metric }: { title: string; icon: React.ReactNode; items: Game[]; metric: (g: Game) => string }) {
  return (
    <div className="rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
      <div className="px-4 py-3 border-b-2 border-ink flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground border-2 border-ink">{icon}</span>
        <h3 className="font-black italic" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
      </div>
      <ol className="divide-y-2 divide-ink/10">
        {items.map((g, i) => (
          <li key={g.slug}>
            <Link to="/g/$slug" params={{ slug: g.slug }} className="flex items-center gap-3 p-3 hover:bg-muted/40">
              <div className="w-8 text-center font-black italic text-lg text-ink/50" style={{ fontFamily: "var(--font-display)" }}>{i + 1}</div>
              <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${g.grad} border-2 border-ink flex items-center justify-center text-xl shrink-0`}>{g.emoji}</div>
              <div className="min-w-0 flex-1">
                <div className="font-bold truncate text-sm">{g.title}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50 truncate">@{g.creatorHandle}</div>
              </div>
              <div className="text-xs font-mono text-ink/70 shrink-0">{metric(g)}</div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
