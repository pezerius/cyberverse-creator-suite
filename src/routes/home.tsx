import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { gamesList } from "@/lib/mock-games";
import { Play, Sparkles, Users, TrendingUp, Trophy, Gift, ArrowRight, Flame } from "lucide-react";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Pixels Studio" },
      { name: "description", content: "Your gaming home base. Jump back in, discover new games, and see what friends are playing." },
      { property: "og:title", content: "Home — Pixels Studio" },
      { property: "og:description", content: "Continue playing, discover new drops, and earn rewards inside the Pixels world." },
    ],
  }),
  component: () => <AppShell><HomePage /></AppShell>,
});

function HomePage() {
  const featured = gamesList[0];
  const continuePlaying = gamesList.slice(0, 3);
  const trending = gamesList.slice(1, 5);
  const friendsPlaying = [
    { handle: "pixelqueen", game: gamesList[1], when: "now" },
    { handle: "synthkid", game: gamesList[2], when: "5m ago" },
    { handle: "byte.void", game: gamesList[0], when: "12m ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-10">
      {/* Hero — featured game */}
      <section className={`relative overflow-hidden rounded-3xl border-2 border-ink shadow-[6px_6px_0_0_var(--ink)] bg-gradient-to-br ${featured.grad}`}>
        <div className="grid md:grid-cols-2 gap-6 p-8 md:p-10">
          <div className="flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full bg-ink text-background border-2 border-ink text-[10px] font-mono uppercase tracking-widest w-fit">
              <Flame className="w-3 h-3" /> Featured today
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-black italic text-ink" style={{ fontFamily: "var(--font-display)" }}>{featured.title}</h1>
            <p className="mt-2 text-ink/70">{featured.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link to="/g/$slug" params={{ slug: featured.slug }}
                className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest">
                <Play className="w-4 h-4" /> Play now
              </Link>
              <Link to="/library" className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-white text-ink border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest">
                My library
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center text-[10rem]">{featured.emoji}</div>
        </div>
      </section>

      {/* Continue playing */}
      <Row title="Continue playing" icon={Play} href="/library" cta="Your library">
        {continuePlaying.map((g) => (
          <GameCard key={g.slug} game={g} progress={Math.floor(30 + Math.random() * 60)} />
        ))}
      </Row>

      {/* Rewards & quests */}
      <section className="grid md:grid-cols-3 gap-4">
        <RewardCard icon={Trophy} title="Daily quest" body="Win 3 rounds in any game" reward="+50 PX" progress={2} of={3} />
        <RewardCard icon={Gift} title="Login streak" body="Come back tomorrow for 2x credits" reward="Day 4 / 7" progress={4} of={7} />
        <RewardCard icon={Sparkles} title="Weekly drop" body="New free skin every Friday" reward="Unlocks in 2d" progress={5} of={7} />
      </section>

      {/* Trending */}
      <Row title="Trending now" icon={TrendingUp} href="/marketplace" cta="Browse all">
        {trending.map((g) => <GameCard key={g.slug} game={g} />)}
      </Row>

      {/* Friends activity */}
      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-2xl font-black italic text-ink" style={{ fontFamily: "var(--font-display)" }}>
            <Users className="inline w-5 h-5 mr-2 -mt-1" /> Friends playing
          </h2>
          <Link to="/hub" className="text-xs font-mono uppercase tracking-widest text-ink/60 hover:text-ink flex items-center gap-1">Party hub <ArrowRight className="w-3 h-3" /></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {friendsPlaying.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)]">
              <div className={`w-12 h-12 rounded-xl border-2 border-ink bg-gradient-to-br ${f.game.grad} flex items-center justify-center text-xl`}>{f.game.emoji}</div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-ink truncate">@{f.handle}</div>
                <div className="text-[11px] font-mono text-ink/60 truncate">Playing {f.game.title} · {f.when}</div>
              </div>
              <Link to="/g/$slug" params={{ slug: f.game.slug }} className="w-9 h-9 rounded-full border-2 border-ink bg-accent flex items-center justify-center shrink-0">
                <Play className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Row({ title, icon: Icon, href, cta, children }: { title: string; icon: typeof Play; href: string; cta: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-2xl font-black italic text-ink" style={{ fontFamily: "var(--font-display)" }}>
          <Icon className="inline w-5 h-5 mr-2 -mt-1" /> {title}
        </h2>
        <Link to={href as never} className="text-xs font-mono uppercase tracking-widest text-ink/60 hover:text-ink flex items-center gap-1">{cta} <ArrowRight className="w-3 h-3" /></Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{children}</div>
    </section>
  );
}

function GameCard({ game, progress }: { game: typeof gamesList[number]; progress?: number }) {
  return (
    <Link to="/g/$slug" params={{ slug: game.slug }} className="group block rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] overflow-hidden hover:translate-y-[-2px] transition">
      <div className={`aspect-video bg-gradient-to-br ${game.grad} flex items-center justify-center text-5xl border-b-2 border-ink relative`}>
        {game.emoji}
        {progress != null && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-ink/20">
            <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="text-sm font-bold text-ink truncate">{game.title}</div>
        <div className="text-[11px] font-mono text-ink/60 truncate">@{game.creatorHandle} · ★ {game.rating}</div>
      </div>
    </Link>
  );
}

function RewardCard({ icon: Icon, title, body, reward, progress, of }: { icon: typeof Trophy; title: string; body: string; reward: string; progress: number; of: number }) {
  const pct = Math.round((progress / of) * 100);
  return (
    <div className="p-4 rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-9 h-9 rounded-xl border-2 border-ink bg-accent flex items-center justify-center"><Icon className="w-4 h-4" /></div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-ink truncate">{title}</div>
          <div className="text-[11px] font-mono text-ink/60 truncate">{body}</div>
        </div>
        <span className="px-2 h-6 rounded-full bg-primary text-primary-foreground border-2 border-ink text-[10px] font-mono uppercase tracking-widest flex items-center">{reward}</span>
      </div>
      <div className="h-2 rounded-full bg-muted border-2 border-ink overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
