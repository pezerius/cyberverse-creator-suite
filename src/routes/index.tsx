import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Coins, Users, Zap, Layers, Wand2, Store, Trophy, PlayCircle, Check, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pixels Studio — Build games inside Pixels. Get paid tonight." },
      { name: "description", content: "The browser-based game creation suite for the Pixels world. Ship from a template, publish to 4.2M players, keep 60% of every $PIXEL. No engine. No install." },
      { property: "og:title", content: "Pixels Studio — Build games inside Pixels" },
      { property: "og:description", content: "Templates, a visual editor, AI copilot and a built-in audience. Make it, publish it, earn $PIXEL." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <HowItWorks />
      <Showcase />
      <Numbers />
      <Testimonials />
      <PricingTeaser />
      <FinalCta />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-background/85 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-primary border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center">
            <span className="text-primary-foreground text-[10px] font-bold" style={{ fontFamily: "var(--font-pixel)" }}>PX</span>
          </div>
          <span className="text-lg italic font-black" style={{ fontFamily: "var(--font-display)" }}>Pixels Studio</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 ml-6">
          {[
            ["Features", "#features"],
            ["How it works", "#how"],
            ["Showcase", "#showcase"],
            ["Pricing", "#pricing"],
          ].map(([l, h]) => (
            <a key={l} href={h} className="px-3 h-9 flex items-center rounded-full text-sm font-medium hover:bg-white hover:border-ink border-2 border-transparent">{l}</a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/login" className="hidden sm:inline-flex items-center h-10 px-4 rounded-full text-sm font-mono uppercase tracking-widest font-bold hover:bg-white border-2 border-transparent hover:border-ink">Log in</Link>
          <Link to="/studio/create" className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-1px] transition-transform">
            Open App <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 h-7 rounded-full bg-accent border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
              <span className="w-1.5 h-1.5 bg-ink rounded-full" /> From the team behind Pixels
            </span>
            <span className="inline-flex items-center px-3 h-7 rounded-full bg-white border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
              4.2M weekly players
            </span>
            <span className="inline-flex items-center px-3 h-7 rounded-full bg-[oklch(0.75_0.20_50)] border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
              60% goes to creators
            </span>
          </div>
          <h1 className="italic font-black tracking-tight text-[52px] md:text-[80px] leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
            Build games <br />
            inside <span className="text-primary">Pixels.</span> <br />
            Get paid tonight.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink/70 max-w-xl leading-relaxed">
            Pixels Studio is the browser-based game creation suite embedded inside the world you already play. Pick a template, paint a level, publish to the Hub — real players in minutes, real $PIXEL by morning.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/studio/create" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
              Open the Studio <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#how" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-white text-ink border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
              See how it works
            </a>
          </div>
          <div className="mt-6 text-[11px] font-mono uppercase tracking-widest text-ink/60">
            No engine · No install · Publish from your browser
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <MockPreview />
        </div>
      </div>
    </section>
  );
}

function MockPreview() {
  return (
    <div className="relative">
      <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full bg-accent border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] rotate-[-12deg] flex items-center justify-center text-center p-4 z-10">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest">Payout</div>
          <div className="italic font-black text-xl" style={{ fontFamily: "var(--font-display)" }}>+12,480</div>
          <div className="text-[10px] font-mono">$PIXEL</div>
        </div>
      </div>
      <div className="absolute -bottom-6 -right-4 w-36 rounded-3xl bg-primary text-primary-foreground border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] rotate-[8deg] p-4 z-10">
        <div className="text-[10px] font-mono uppercase tracking-widest opacity-80">Live now</div>
        <div className="italic font-black text-xl mt-0.5" style={{ fontFamily: "var(--font-display)" }}>48,120</div>
        <div className="text-[10px] font-mono opacity-80">players in Rooftop Tag</div>
      </div>

      <div className="rounded-[28px] bg-white border-2 border-ink shadow-[8px_8px_0_0_var(--ink)] overflow-hidden">
        <div className="h-9 border-b-2 border-ink bg-muted flex items-center px-3 gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.62_0.24_25)] border border-ink" />
          <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.80_0.18_75)] border border-ink" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent border border-ink" />
          <span className="ml-auto text-[10px] font-mono">studio.pixels.online/builder</span>
        </div>
        <div className="p-4 grid grid-cols-4 gap-3">
          <div className="col-span-3 aspect-[4/3] rounded-2xl border-2 border-ink grid-canvas relative overflow-hidden">
            <div className="absolute inset-4 grid grid-cols-8 grid-rows-6 gap-1">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className={`rounded-sm ${
                  [3,4,10,11,12,19,20,26,27,28,35].includes(i) ? "bg-primary/70" :
                  [7,15,23,31,39,47].includes(i) ? "bg-accent" :
                  [5,13,21,29,37,45].includes(i) ? "bg-[oklch(0.75_0.20_50)]" : ""
                }`} />
              ))}
            </div>
            <div className="absolute bottom-2 left-2 px-2 h-6 rounded-full bg-ink text-background border-2 border-ink flex items-center text-[10px] font-mono uppercase tracking-widest">
              Rooftop Tag · Draft
            </div>
          </div>
          <div className="space-y-2">
            {[
              ["Tile", "bg-primary/70"],
              ["Spawn", "bg-accent"],
              ["Coin", "bg-[oklch(0.75_0.20_50)]"],
              ["Rule", "bg-white"],
              ["NPC", "bg-[oklch(0.72_0.18_290)]"],
            ].map(([l, c]) => (
              <div key={l} className="flex items-center gap-2 p-2 rounded-xl border-2 border-ink bg-white">
                <div className={`w-5 h-5 rounded border-2 border-ink ${c}`} />
                <span className="text-[11px] font-mono uppercase tracking-widest">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  const items = ["Rooftop Tag", "Neon Snake++", "Speed Loop 07", "Karaoke Bar", "Grid Chess", "Data Heist", "Slum Speedway", "Cyber Fauna", "Bassline 07"];
  return (
    <div className="border-y-2 border-ink bg-primary text-primary-foreground overflow-hidden">
      <div className="flex gap-10 py-4 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="text-lg italic font-black flex items-center gap-10" style={{ fontFamily: "var(--font-display)" }}>
            {t}
            <span className="text-2xl">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }`}</style>
    </div>
  );
}

function Features() {
  const feats = [
    { icon: Wand2, tone: "bg-primary text-primary-foreground", title: "Six templates. One editor.", body: "Snake, tag, racing, shooter, hangout, or blank. Every template ships with sensible defaults so your first playable is done in an afternoon." },
    { icon: Sparkles, tone: "bg-accent", title: "AI copilot scaffolds it.", body: "Describe the vibe in plain language — the copilot places entities, wires basic logic, and hands you an editable draft to polish." },
    { icon: Store, tone: "bg-[oklch(0.75_0.20_50)]", title: "UGC marketplace baked in.", body: "License tilesets, sprites, and SFX from other creators. Three tiers: single game, all your games, or resellable in your own template." },
    { icon: Users, tone: "bg-[oklch(0.72_0.18_290)] text-primary-foreground", title: "Publish to 4.2M players.", body: "Every Pixels player already lives in the Hub. Publish once — get discovered in Featured, Trending, and New Releases." },
    { icon: Coins, tone: "bg-primary text-primary-foreground", title: "60/40 split — in your favor.", body: "Every $PIXEL spent on your game settles on-chain. Withdraw to your Pixels wallet after a 7-day review window. No hidden platform fees." },
    { icon: Trophy, tone: "bg-accent", title: "One-time NFT mint per project.", body: "Optional. Mint your game as a transferable creator NFT — no subscription, no vendor lock-in. Ownership stays with you." },
  ];
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center px-3 h-7 rounded-full bg-accent border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] mb-5">
          // What's in the box
        </div>
        <h2 className="italic font-black text-4xl md:text-6xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Everything you need to <span className="text-primary">ship a game tonight.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {feats.map((f) => {
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
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", tone: "bg-primary text-primary-foreground", icon: Layers, title: "Pick a template", body: "Start from Snake, Tag, Racing, Shooter, Hangout, or Blank. Templates come pre-wired." },
    { n: "02", tone: "bg-accent", icon: Wand2, title: "Paint, wire, tweak", body: "Drop tiles on the grid, wire nodes in Logic, adjust rules. Autosave every 2 seconds." },
    { n: "03", tone: "bg-[oklch(0.75_0.20_50)]", icon: Zap, title: "Publish to the Hub", body: "One button. Your game hits Featured, Trending, and every Pixels player's Party Hub." },
    { n: "04", tone: "bg-[oklch(0.72_0.18_290)] text-primary-foreground", icon: Coins, title: "Earn $PIXEL", body: "Play passes, cosmetics, tips. 60% is yours. Withdraw after a 7-day review window." },
  ];
  return (
    <section id="how" className="bg-primary text-primary-foreground border-y-2 border-ink">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center px-3 h-7 rounded-full bg-accent text-ink border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] mb-5">
            // How it works
          </div>
          <h2 className="italic font-black text-4xl md:text-6xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            From blank canvas to payday — in four moves.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="bg-background text-ink border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] p-6">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center ${s.tone}`}>
                    <Icon className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <div className="italic font-black text-4xl text-ink/20" style={{ fontFamily: "var(--font-display)" }}>{s.n}</div>
                </div>
                <h3 className="mt-4 text-xl italic font-black tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{s.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  const games = [
    { name: "Rooftop Tag Arena", author: "@nx", plays: "48,120", tag: "Tag · PvP", grad: "from-primary/60 to-[oklch(0.72_0.18_290)]/40", emoji: "🌃" },
    { name: "Neon Snake++", author: "@nx", plays: "231,004", tag: "Arcade", grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/40", emoji: "🐍" },
    { name: "Slum Speedway", author: "@grid_kid", plays: "34,800", tag: "Racing", grad: "from-[oklch(0.75_0.20_50)]/70 to-accent/40", emoji: "🏎" },
    { name: "Data Heist", author: "@808heart", plays: "6,540", tag: "Co-op", grad: "from-[oklch(0.72_0.18_290)]/60 to-primary/30", emoji: "💾" },
  ];
  return (
    <section id="showcase" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
        <div>
          <div className="inline-flex items-center px-3 h-7 rounded-full bg-accent border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] mb-4">// Made in Pixels Studio</div>
          <h2 className="italic font-black text-4xl md:text-6xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Built by creators. <br /> Played by <span className="text-primary">everyone.</span>
          </h2>
        </div>
        <Link to="/hub" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] text-xs font-mono uppercase tracking-widest font-bold">
          Browse the Hub <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {games.map((g) => (
          <div key={g.name} className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
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

function Numbers() {
  const stats = [
    { k: "4.2M", l: "weekly players in Pixels" },
    { k: "50k+", l: "creators shipping games" },
    { k: "$1.8M", l: "$PIXEL paid to creators / mo" },
    { k: "18 min", l: "median time to first publish" },
  ];
  return (
    <section className="border-y-2 border-ink bg-accent">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.l} className="text-ink">
            <div className="italic font-black text-5xl md:text-6xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{s.k}</div>
            <div className="mt-2 text-sm font-mono uppercase tracking-widest">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: "I shipped a rooftop tag arena on a Tuesday. By Friday it paid my rent. That's the whole pitch.", a: "@nx", r: "Creator · 6 games shipped", bg: "bg-white" },
    { q: "The copilot did in 90 seconds what would've cost me a weekend of node-wiring. Editable output too — not a black box.", a: "@grid_kid", r: "Creator · 3 games shipped", bg: "bg-primary text-primary-foreground" },
    { q: "Marketplace royalties are the sneaky-best part. My tileset from six months ago is still cutting me checks.", a: "@nightbird", r: "Asset creator · 12 packs", bg: "bg-accent" },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center px-3 h-7 rounded-full bg-accent border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] mb-5">// Creator voices</div>
        <h2 className="italic font-black text-4xl md:text-6xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Not corporate SaaS. Made for the crew.
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {quotes.map((t) => (
          <div key={t.a} className={`${t.bg} border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] p-6 flex flex-col`}>
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-lg leading-snug italic font-bold flex-1" style={{ fontFamily: "var(--font-display)" }}>"{t.q}"</p>
            <div className="mt-5 pt-4 border-t-2 border-ink/20">
              <div className="font-mono text-sm font-bold">{t.a}</div>
              <div className="font-mono text-[11px] uppercase tracking-widest opacity-70">{t.r}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-6 pb-20 md:pb-28">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] p-8">
          <div className="text-[11px] font-mono uppercase tracking-widest">Free</div>
          <div className="mt-2 italic font-black text-5xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>0 <span className="text-lg">$PIXEL</span></div>
          <div className="mt-1 text-sm text-ink/60">Start creating, no credit card.</div>
          <ul className="mt-6 space-y-2 text-sm">
            {["5 projects", "Preset asset library", "60/40 revenue split", "Publish to Pixels Hub"].map((b) => (
              <li key={b} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-primary" /> {b}</li>
            ))}
          </ul>
        </div>
        <div className="bg-primary text-primary-foreground border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] p-8 relative">
          <div className="absolute -top-3 right-6 px-3 h-7 rounded-full bg-accent text-ink border-2 border-ink flex items-center text-[10px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">Most popular</div>
          <div className="text-[11px] font-mono uppercase tracking-widest opacity-80">Pro</div>
          <div className="mt-2 italic font-black text-5xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>2,400 <span className="text-lg">$PIXEL / mo</span></div>
          <div className="mt-1 text-sm opacity-80">Or one-time NFT mint — yours forever.</div>
          <ul className="mt-6 space-y-2 text-sm">
            {["50 projects", "Custom asset uploads + scripting", "80/20 revenue split", "Featured Rotation eligibility", "Transferable creator NFT"].map((b) => (
              <li key={b} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5 text-accent" /> {b}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 text-center">
        <Link to="/pro" className="text-sm font-mono uppercase tracking-widest font-bold underline underline-offset-4">See full comparison →</Link>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t-2 border-ink bg-ink text-background">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
        <div className="inline-flex items-center px-3 h-7 rounded-full bg-accent text-ink border-2 border-accent text-[11px] font-mono uppercase tracking-widest mb-6">// Ready when you are</div>
        <h2 className="italic font-black text-5xl md:text-7xl tracking-tight leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
          Your first game is <br /> <span className="text-accent">already in the tools.</span>
        </h2>
        <p className="mt-6 text-lg text-background/70 max-w-xl mx-auto">
          Free forever. 60% of every $PIXEL is yours. No engine, no install, no revenue share that insults you.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/studio/create" className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-accent text-ink border-2 border-accent shadow-[4px_4px_0_0_var(--accent)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
            Open the Studio <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/hub" className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-transparent text-background border-2 border-background text-sm font-mono uppercase tracking-widest font-bold hover:bg-background hover:text-ink transition-colors">
            Browse the Hub
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary border-2 border-ink flex items-center justify-center">
            <span className="text-primary-foreground text-[8px] font-bold" style={{ fontFamily: "var(--font-pixel)" }}>PX</span>
          </div>
          <span className="italic font-black text-sm" style={{ fontFamily: "var(--font-display)" }}>Pixels Studio</span>
          <span className="text-xs font-mono text-ink/50 ml-2">© 2087 · Inside Pixels · REALM-7</span>
        </div>
        <div className="flex gap-1">
          {["Terms", "Privacy", "Creator Code", "Docs", "Discord"].map((l) => (
            <a key={l} href="#" className="px-3 h-8 rounded-full text-xs font-mono uppercase tracking-widest font-bold hover:bg-white border-2 border-transparent hover:border-ink flex items-center">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
