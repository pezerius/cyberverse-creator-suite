import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, PlayCircle, Users, Coins, Sparkles, Gamepad2, Shirt, Heart, Trophy, Search, Hammer, Headphones, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pixels Hub — Play the games. Wear the drip. Earn $PIXEL." },
      { name: "description", content: "The player home of the Pixels world. Jump into games made by the community, collect playable skins, party up in voice rooms, and earn $PIXEL on Ronin." },
      { property: "og:title", content: "Pixels Hub — The Pixels player universe" },
      { property: "og:description", content: "Games, skins, parties, rewards. Everything Pixels players do, in one home." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HubLanding,
});

function HubLanding() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <HubNav />
      <HubHero />
      <LiveMarquee />
      <FeaturedGames />
      <WhatYouCanDo />
      <SkinDrops />
      <PartyHubTease />
      <EarnStrip />
      <CreatorCta />
      <HubFooter />
    </div>
  );
}

function HubNav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-background/85 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-primary border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center">
            <Gamepad2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-ink/50">Pixels</div>
            <div className="italic font-black text-lg" style={{ fontFamily: "var(--font-display)" }}>Hub</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1 ml-6">
          {[
            ["Games", "#games"],
            ["Skins", "#skins"],
            ["Party", "#party"],
            ["Rewards", "#earn"],
          ].map(([l, h]) => (
            <a key={l} href={h} className="px-3 h-9 flex items-center rounded-full text-sm font-medium hover:bg-white hover:border-ink border-2 border-transparent">{l}</a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/studio" className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-xs font-mono uppercase tracking-widest text-ink/60 hover:text-ink border-2 border-transparent hover:border-ink">
            <Hammer className="w-3.5 h-3.5" /> Pixels Studio
          </Link>
          <Link to="/login" className="hidden sm:inline-flex items-center h-10 px-4 rounded-full text-xs font-mono uppercase tracking-widest font-bold hover:bg-white border-2 border-transparent hover:border-ink">Log in</Link>
          <Link to="/home" className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-1px] transition-transform">
            Play now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function HubHero() {
  return (
    <section className="relative overflow-hidden">
      {/* animated color blobs */}
      <div className="absolute -top-24 -left-16 w-96 h-96 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -right-20 w-96 h-96 rounded-full bg-accent/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[oklch(0.75_0.20_50)]/40 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 h-7 rounded-full bg-primary text-primary-foreground border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
              <span className="w-1.5 h-1.5 bg-background rounded-full animate-pulse" /> 48,120 players in Realm-7
            </span>
            <span className="inline-flex items-center px-3 h-7 rounded-full bg-white border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
              Free to jump in
            </span>
            <span className="inline-flex items-center px-3 h-7 rounded-full bg-accent border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
              $PIXEL on Ronin
            </span>
          </div>
          <h1 className="italic font-black tracking-tight text-[52px] md:text-[88px] leading-[0.92]" style={{ fontFamily: "var(--font-display)" }}>
            Play. Collect. <br />
            <span className="text-primary">Party.</span> Earn.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink/70 max-w-xl leading-relaxed">
            Pixels Hub is the front door to the Pixels world — thousands of community-made games, playable skins you actually own, voice-room parties with your crew, and $PIXEL rewards that hit your Ronin wallet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/home" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
              Enter the Hub <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#games" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-white text-ink border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
              Browse games
            </a>
          </div>
          <div className="mt-6 text-[11px] font-mono uppercase tracking-widest text-ink/60">
            No install · Plays in your browser · Works on mobile
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <HubMock />
        </div>
      </div>
    </section>
  );
}

function HubMock() {
  return (
    <div className="relative">
      <div className="absolute -top-6 -left-4 w-36 rounded-3xl bg-accent border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] rotate-[-6deg] p-3 z-10">
        <div className="text-[9px] font-mono uppercase tracking-widest text-ink/60">Reward hit</div>
        <div className="italic font-black text-xl leading-none mt-1" style={{ fontFamily: "var(--font-display)" }}>+240 $PIXEL</div>
        <div className="text-[9px] font-mono text-ink/60 mt-1">Rooftop Tag · 1st place</div>
      </div>
      <div className="absolute -bottom-4 -right-4 w-40 rounded-3xl bg-primary text-primary-foreground border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] rotate-[6deg] p-3 z-10">
        <div className="text-[9px] font-mono uppercase tracking-widest opacity-70">Party</div>
        <div className="italic font-black text-lg leading-tight mt-1" style={{ fontFamily: "var(--font-display)" }}>@zap & 3 others waiting</div>
      </div>

      <div className="rounded-[28px] bg-white border-2 border-ink shadow-[8px_8px_0_0_var(--ink)] overflow-hidden">
        <div className="h-9 border-b-2 border-ink bg-primary text-primary-foreground flex items-center px-3 gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-background/40 border border-background/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-background/40 border border-background/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-background/40 border border-background/60" />
          <span className="ml-auto text-[10px] font-mono opacity-80">pixels.hub · home</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 px-3 h-10 rounded-2xl bg-muted border-2 border-ink">
            <Search className="w-4 h-4 text-ink/60" />
            <span className="text-xs font-mono text-ink/50">Search games, creators, skins…</span>
            <span className="ml-auto text-[9px] font-mono uppercase tracking-widest px-1.5 h-5 rounded bg-ink text-background flex items-center">⌘K</span>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Trending now</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { emoji: "🌃", tag: "Tag", grad: "from-primary/60 to-[oklch(0.72_0.18_290)]/40" },
              { emoji: "🏎", tag: "Race", grad: "from-[oklch(0.75_0.20_50)]/60 to-accent/40" },
              { emoji: "🐍", tag: "Arcade", grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/40" },
            ].map((g, i) => (
              <div key={i} className={`aspect-square rounded-2xl border-2 border-ink bg-gradient-to-br ${g.grad} relative flex items-center justify-center text-3xl`}>
                {g.emoji}
                <span className="absolute bottom-1 left-1 px-1.5 h-4 rounded-full bg-ink text-background text-[8px] font-mono uppercase tracking-widest flex items-center">{g.tag}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-primary border-2 border-ink" />
              <div className="w-6 h-6 rounded-full bg-accent border-2 border-ink -ml-2" />
              <div className="w-6 h-6 rounded-full bg-[oklch(0.75_0.20_50)] border-2 border-ink -ml-2" />
              <span className="ml-1 text-[10px] font-mono text-ink/60">+ 42 in your Realm</span>
            </div>
            <button className="px-3 h-7 rounded-full bg-primary text-primary-foreground border-2 border-ink text-[10px] font-mono uppercase tracking-widest">Join</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveMarquee() {
  const items = ["Rooftop Tag · +48k live", "Neon Snake++", "Slum Speedway · +34k", "Karaoke Bar", "Grid Chess", "Data Heist", "Cyber Fauna", "Bassline 07", "Speed Loop 07"];
  return (
    <div className="border-y-2 border-ink bg-ink text-background overflow-hidden">
      <div className="flex gap-10 py-4 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="text-lg italic font-black flex items-center gap-10" style={{ fontFamily: "var(--font-display)" }}>
            {t}
            <span className="text-accent text-2xl">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }`}</style>
    </div>
  );
}

function FeaturedGames() {
  const games = [
    { name: "Rooftop Tag Arena", author: "@nx", plays: "48,120", tag: "Tag · PvP", grad: "from-primary/60 to-[oklch(0.72_0.18_290)]/40", emoji: "🌃" },
    { name: "Neon Snake++", author: "@nx", plays: "231,004", tag: "Arcade", grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/40", emoji: "🐍" },
    { name: "Slum Speedway", author: "@grid_kid", plays: "34,800", tag: "Racing", grad: "from-[oklch(0.75_0.20_50)]/70 to-accent/40", emoji: "🏎" },
    { name: "Data Heist", author: "@808heart", plays: "6,540", tag: "Co-op", grad: "from-[oklch(0.72_0.18_290)]/60 to-primary/30", emoji: "💾" },
    { name: "Karaoke Bar", author: "@lo_fi", plays: "12,200", tag: "Social", grad: "from-primary/50 to-accent/30", emoji: "🎤" },
    { name: "Grid Chess", author: "@blk_pawn", plays: "8,900", tag: "Puzzle", grad: "from-accent/60 to-primary/30", emoji: "♟" },
    { name: "Cyber Fauna", author: "@zap", plays: "17,300", tag: "Explore", grad: "from-[oklch(0.75_0.20_50)]/50 to-[oklch(0.72_0.18_290)]/30", emoji: "🦋" },
    { name: "Bassline 07", author: "@808heart", plays: "4,120", tag: "Rhythm", grad: "from-primary/60 to-[oklch(0.75_0.20_50)]/30", emoji: "🎧" },
  ];
  return (
    <section id="games" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <div className="inline-flex items-center px-3 h-7 rounded-full bg-accent border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] mb-4">// Now playing</div>
          <h2 className="italic font-black text-4xl md:text-6xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Thousands of games. <br /> All made by <span className="text-primary">real people.</span>
          </h2>
        </div>
        <Link to="/home" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] text-xs font-mono uppercase tracking-widest font-bold">
          See all games <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {games.map((g) => (
          <div key={g.name} className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] overflow-hidden group hover:translate-y-[-2px] transition-transform">
            <div className={`h-40 bg-gradient-to-br ${g.grad} relative flex items-center justify-center border-b-2 border-ink`}>
              <div className="text-6xl">{g.emoji}</div>
              <span className="absolute top-2 left-2 px-2 h-6 rounded-full bg-ink text-background border-2 border-ink flex items-center text-[10px] font-mono uppercase tracking-widest">{g.tag}</span>
              <span className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 h-6 rounded-full bg-accent text-ink border-2 border-ink text-[10px] font-mono uppercase tracking-widest">
                <PlayCircle className="w-3 h-3" /> Live
              </span>
            </div>
            <div className="p-4">
              <div className="italic font-black text-lg tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{g.name}</div>
              <div className="mt-1 flex items-center justify-between text-xs font-mono">
                <span className="text-ink/60">by {g.author}</span>
                <span className="text-ink font-bold">{g.plays} plays</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatYouCanDo() {
  const items = [
    { icon: Gamepad2, tone: "bg-primary text-primary-foreground", title: "Play thousands of games", body: "Tag, racing, arcade, co-op, rhythm, social hangouts — new drops every day, all in your browser." },
    { icon: Shirt, tone: "bg-accent", title: "Own playable skins", body: "Buy cosmetics and avatar items once, use them across every Pixels game. Yours to keep, trade, or show off." },
    { icon: Users, tone: "bg-[oklch(0.72_0.18_290)] text-primary-foreground", title: "Party with voice rooms", body: "Group up with your crew, hop between games together, talk trash in real time. It's the group chat + arcade combo." },
    { icon: Coins, tone: "bg-[oklch(0.75_0.20_50)]", title: "Earn $PIXEL on Ronin", body: "Wins, tournaments, quests, referrals — real $PIXEL that lands in your Ronin wallet. Spend it or hold it." },
    { icon: Heart, tone: "bg-white", title: "Follow your favorite creators", body: "Wishlist upcoming drops, get notified when they publish, tip them directly in $PIXEL." },
    { icon: Trophy, tone: "bg-primary text-primary-foreground", title: "Climb the leaderboards", body: "Every game has weekly ranks. Top 10 in Realm-7 gets bragging rights and a payout." },
  ];
  return (
    <section className="bg-[oklch(0.97_0.01_270)] border-y-2 border-ink">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center px-3 h-7 rounded-full bg-ink text-background border-2 border-ink text-[11px] font-mono uppercase tracking-widest mb-5">
            // What you can do here
          </div>
          <h2 className="italic font-black text-4xl md:text-6xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            One account. <br /> The whole <span className="text-primary">Pixels world.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] p-6 flex flex-col">
                <div className={`w-12 h-12 rounded-2xl border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center ${f.tone}`}>
                  <Icon className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <h3 className="mt-5 text-2xl italic font-black tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
                <p className="mt-2 text-ink/70 leading-relaxed">{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkinDrops() {
  const skins = [
    { name: "Neon Runner Hood", price: "240", rarity: "Rare", grad: "from-primary/60 to-[oklch(0.72_0.18_290)]/40", emoji: "🧥" },
    { name: "Retro Visor XL", price: "80", rarity: "Common", grad: "from-accent/70 to-[oklch(0.85_0.10_180)]/30", emoji: "🕶" },
    { name: "Chrome Kicks", price: "480", rarity: "Epic", grad: "from-[oklch(0.75_0.20_50)]/70 to-accent/40", emoji: "👟" },
    { name: "Phantom Trail Emote", price: "1,200", rarity: "Legendary", grad: "from-[oklch(0.72_0.18_290)]/70 to-primary/30", emoji: "✨" },
  ];
  return (
    <section id="skins" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="inline-flex items-center px-3 h-7 rounded-full bg-accent border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] mb-5">// The Shop</div>
          <h2 className="italic font-black text-4xl md:text-5xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Wear it. Show it off. <br /> <span className="text-primary">Own it forever.</span>
          </h2>
          <p className="mt-4 text-ink/70 leading-relaxed">
            Playable UGC — skins, hats, kicks, emotes, trails — bought once, used everywhere in the Pixels world. Everything you buy is yours, not licensed to you.
          </p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
            Open the Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
          {skins.map((s) => (
            <div key={s.name} className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
              <div className={`aspect-[5/3] bg-gradient-to-br ${s.grad} border-b-2 border-ink relative flex items-center justify-center text-6xl`}>
                {s.emoji}
                <span className="absolute top-2 left-2 px-2 h-6 rounded-full bg-ink text-background border-2 border-ink text-[10px] font-mono uppercase tracking-widest flex items-center">{s.rarity}</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="italic font-black text-lg" style={{ fontFamily: "var(--font-display)" }}>{s.name}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50">Playable · Cross-game</div>
                </div>
                <div className="text-right">
                  <div className="italic font-black text-xl text-primary" style={{ fontFamily: "var(--font-display)" }}>{s.price}</div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-ink/50">$PIXEL</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartyHubTease() {
  return (
    <section id="party" className="bg-primary text-primary-foreground border-y-2 border-ink">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <div className="inline-flex items-center px-3 h-7 rounded-full bg-accent text-ink border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] mb-5">// Party Hub</div>
          <h2 className="italic font-black text-4xl md:text-6xl tracking-tight leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
            Games are better <br /> with your <span className="text-accent">crew.</span>
          </h2>
          <p className="mt-4 text-lg opacity-80 max-w-xl">
            Drop into a voice room, invite your friends, and jump between games together without ever leaving the party. It's Discord + Steam friends list + arcade, in one place.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {([
              [Headphones, "Voice rooms up to 12 people"],
              [Zap, "One-click game hopping — everyone follows"],
              [Sparkles, "Party quests with shared $PIXEL rewards"],
            ] as const).map(([Icon, l]) => (
              <li key={l} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-background/15 border border-background/30 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <span>{l}</span>
              </li>
            ))}
          </ul>
          <Link to="/hub" className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-background text-ink border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
            Open Party Hub <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="lg:col-span-6">
          <div className="bg-background text-ink rounded-3xl border-2 border-ink shadow-[6px_6px_0_0_var(--ink)] p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Party · Realm-7</div>
                <div className="italic font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>Late-night arcade run</div>
              </div>
              <div className="flex items-center gap-1.5 px-2 h-7 rounded-full bg-accent border-2 border-ink">
                <span className="w-1.5 h-1.5 bg-ink rounded-full animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest">4 talking</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {["NX", "ZP", "808", "GK"].map((n, i) => (
                <div key={n} className="rounded-2xl border-2 border-ink bg-white p-3 text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full border-2 border-ink flex items-center justify-center font-mono text-[10px] font-bold ${["bg-primary text-primary-foreground", "bg-accent", "bg-[oklch(0.75_0.20_50)]", "bg-[oklch(0.72_0.18_290)] text-primary-foreground"][i]}`}>{n}</div>
                  <div className="mt-1.5 text-[9px] font-mono uppercase tracking-widest">{["speaking", "listening", "listening", "afk"][i]}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border-2 border-ink bg-muted p-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Now playing together</div>
                <div className="italic font-black text-lg" style={{ fontFamily: "var(--font-display)" }}>Rooftop Tag Arena</div>
              </div>
              <button className="px-3 h-9 rounded-full bg-primary text-primary-foreground border-2 border-ink text-[10px] font-mono uppercase tracking-widest">Jump in</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EarnStrip() {
  return (
    <section id="earn" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="rounded-[36px] bg-ink text-background border-2 border-ink shadow-[8px_8px_0_0_var(--ink)] p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 h-7 rounded-full bg-accent text-ink border-2 border-accent text-[11px] font-mono uppercase tracking-widest mb-5">
            // Rewards · Powered by Stacked
          </div>
          <h2 className="italic font-black text-4xl md:text-5xl tracking-tight leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
            Play the games. <br /> Get paid in <span className="text-accent">$PIXEL.</span>
          </h2>
          <p className="mt-4 text-background/70 leading-relaxed max-w-lg">
            Pixels Hub rewards run on <a href="https://stacked.xyz/" target="_blank" rel="noreferrer" className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">Stacked</a> — the quest layer built for the Pixels world. When a game gets popular here, it gets eligible to publish Stacked quests, and every $PIXEL you earn lands in your Ronin wallet.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href="https://stacked.xyz/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-accent text-ink border-2 border-accent text-[11px] font-mono uppercase tracking-widest font-bold hover:translate-y-[-1px] transition-transform">
              Open Stacked <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <span className="inline-flex items-center px-3 h-10 rounded-full bg-background/5 border-2 border-background/20 text-[11px] font-mono uppercase tracking-widest text-background/70">
              Quests · Tournaments · Drops
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { k: "Stacked quests", v: "5 min", sub: "daily guaranteed drops" },
            { k: "Weekly tournaments", v: "Up to 50k", sub: "prize pool per game" },
            { k: "Match wins", v: "10–500", sub: "$PIXEL per game" },
            { k: "Withdraw", v: "→ Ronin", sub: "any wallet, any time" },
          ].map((c) => (
            <div key={c.k} className="rounded-2xl border-2 border-background/20 bg-background/5 p-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-background/50">{c.k}</div>
              <div className="italic font-black text-2xl mt-1 text-accent" style={{ fontFamily: "var(--font-display)" }}>{c.v}</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-background/60 mt-0.5">{c.sub}</div>
            </div>
          ))}
          <div className="col-span-2 rounded-2xl border-2 border-accent/40 bg-accent/10 p-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-accent">// For creators</div>
            <div className="text-sm mt-1 text-background/90 leading-relaxed">
              Games that get traction on Pixels Hub become eligible to launch <span className="text-accent font-bold">Stacked quests</span> — pulling in a whole new wave of players hunting rewards in your game.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CreatorCta() {
  return (
    <section className="border-y-2 border-ink bg-accent">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">// Want to build one instead?</div>
          <h3 className="italic font-black text-3xl md:text-4xl tracking-tight leading-tight max-w-xl" style={{ fontFamily: "var(--font-display)" }}>
            The games you play are made in <span className="text-primary">Pixels Studio.</span>
          </h3>
          <p className="mt-2 text-sm text-ink/70 max-w-md">Same account, same $PIXEL wallet. Different door — a workspace built for creators.</p>
        </div>
        <Link to="/studio" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-ink text-background border-2 border-ink shadow-[4px_4px_0_0_var(--background)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
          <Hammer className="w-4 h-4" /> Open Pixels Studio <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function HubFooter() {
  return (
    <footer className="bg-background">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-2xl bg-primary border-2 border-ink flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="italic font-black text-lg" style={{ fontFamily: "var(--font-display)" }}>Pixels Hub</span>
          </div>
          <p className="text-sm text-ink/60 leading-relaxed">The player home of the Pixels world.</p>
        </div>
        {[
          { title: "Play", links: [["Games", "#games"], ["Skins", "#skins"], ["Party Hub", "/hub"], ["Rewards", "#earn"]] },
          { title: "Account", links: [["Log in", "/login"], ["Wallet", "/wallet"], ["Profile", "/profile"], ["Wishlist", "/wishlist"]] },
          { title: "Pixels", links: [["Pixels Studio", "/studio"], ["Creator agreement", "/legal/creator-agreement"], ["Terms", "/legal/terms"], ["Privacy", "/legal/privacy"]] },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50 mb-3">{col.title}</div>
            <ul className="space-y-2 text-sm">
              {col.links.map(([l, h]) => (
                <li key={l}><a href={h} className="text-ink/70 hover:text-ink">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t-2 border-ink py-4 text-center text-[10px] font-mono uppercase tracking-widest text-ink/50">
        Pixels Hub · Powered by the CyberVerse · $PIXEL on Ronin
      </div>
    </footer>
  );
}
