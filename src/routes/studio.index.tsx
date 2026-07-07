import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Wand2, Layers, Zap, Coins, Store, Sparkles, Trophy, PlayCircle, Check, Hammer, Cpu, GitBranch, LineChart } from "lucide-react";

export const Route = createFileRoute("/studio/")({
  head: () => ({
    meta: [
      { title: "Pixels Studio — The creator workspace for Pixels." },
      { name: "description", content: "Build games and UGC for the Pixels world. Browser-based editor, on-chain payouts on Ronin, 4.2M players already waiting. Keep 60% of every $PIXEL." },
      { property: "og:title", content: "Pixels Studio — Build games inside Pixels" },
      { property: "og:description", content: "The creator side of Pixels. Editor, marketplace, analytics, payouts — one workspace, no engine to install." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudioLanding,
});

function StudioLanding() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <StudioNav />
      <StudioHero />
      <TrustStrip />
      <WorkspaceShowcase />
      <ToolStack />
      <RevenueCalculator />
      <CreatorStories />
      <StudioFaq />
      <StudioCta />
      <StudioFooter />
    </div>
  );
}

function StudioNav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-ink text-background">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
        <Link to="/studio" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-accent border-2 border-background shadow-[3px_3px_0_0_var(--background)] flex items-center justify-center">
            <Hammer className="w-4 h-4 text-ink" />
          </div>
          <div className="leading-tight">
            <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-background/50">Pixels</div>
            <div className="italic font-black text-lg" style={{ fontFamily: "var(--font-display)" }}>Studio</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1 ml-6">
          {[
            ["Workspace", "#workspace"],
            ["Tools", "#tools"],
            ["Earnings", "#earnings"],
            ["Creators", "#creators"],
            ["FAQ", "#faq"],
          ].map(([l, h]) => (
            <a key={l} href={h} className="px-3 h-9 flex items-center rounded-full text-sm font-medium text-background/70 hover:text-background hover:bg-background/10 border-2 border-transparent">{l}</a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/" className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 rounded-full text-xs font-mono uppercase tracking-widest text-background/60 hover:text-background border-2 border-transparent hover:border-background/30">
            Pixels Hub <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/login" search={{ mode: "studio" }} className="hidden sm:inline-flex items-center h-10 px-4 rounded-full text-xs font-mono uppercase tracking-widest font-bold text-background hover:bg-background/10 border-2 border-transparent">Log in</Link>
          <Link to="/studio/create" className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-accent text-ink border-2 border-background shadow-[3px_3px_0_0_var(--background)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-1px] transition-transform">
            Open Studio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function StudioHero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-[oklch(0.98_0.01_270)]">
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="relative max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 h-7 rounded-full bg-ink text-background border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
              <Hammer className="w-3 h-3" /> Creator workspace
            </span>
            <span className="inline-flex items-center px-3 h-7 rounded-full bg-white border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
              Runs in your browser
            </span>
            <span className="inline-flex items-center px-3 h-7 rounded-full bg-accent border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
              Payouts on Ronin
            </span>
          </div>
          <h1 className="italic font-black tracking-tight text-[52px] md:text-[84px] leading-[0.92]" style={{ fontFamily: "var(--font-display)" }}>
            The workshop <br /> where <span className="text-primary">Pixels</span> <br /> gets built.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink/70 max-w-xl leading-relaxed">
            Pixels Studio is the creator side of the Pixels universe — a browser-based editor, an on-chain marketplace, and a built-in audience of 4.2M players. You make it. They play it. You get paid in $PIXEL.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/studio/create" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
              Start building <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="#workspace" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-white text-ink border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
              Tour the workspace
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
            {[
              ["4.2M", "players in reach"],
              ["60/40", "your share of $PIXEL"],
              ["<7 days", "review to payout"],
            ].map(([k, l]) => (
              <div key={l} className="rounded-2xl border-2 border-ink bg-white p-3">
                <div className="italic font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>{k}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <StudioMock />
        </div>
      </div>
    </section>
  );
}

function StudioMock() {
  return (
    <div className="relative">
      <div className="absolute -top-5 -left-5 w-32 px-3 py-3 rounded-2xl bg-accent border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] rotate-[-6deg] z-10">
        <div className="text-[9px] font-mono uppercase tracking-widest text-ink/60">Autosaved</div>
        <div className="italic font-black text-lg leading-none mt-1" style={{ fontFamily: "var(--font-display)" }}>12s ago</div>
      </div>
      <div className="absolute -bottom-5 -right-3 w-40 px-3 py-3 rounded-2xl bg-ink text-background border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] rotate-[5deg] z-10">
        <div className="text-[9px] font-mono uppercase tracking-widest text-background/60">This week</div>
        <div className="italic font-black text-xl leading-none mt-1" style={{ fontFamily: "var(--font-display)" }}>+12,480 $PIXEL</div>
        <div className="text-[9px] font-mono text-background/60 mt-1">on Ronin</div>
      </div>

      <div className="rounded-[28px] bg-ink border-2 border-ink shadow-[8px_8px_0_0_var(--ink)] overflow-hidden">
        <div className="h-9 bg-ink text-background flex items-center px-3 gap-1.5 border-b-2 border-background/20">
          <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.62_0.24_25)] border border-background/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.80_0.18_75)] border border-background/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent border border-background/40" />
          <span className="ml-auto text-[10px] font-mono text-background/60">studio · rooftop-tag / builder</span>
        </div>
        <div className="grid grid-cols-12 bg-white">
          <aside className="col-span-3 border-r-2 border-ink bg-[oklch(0.97_0.01_270)] p-3 space-y-1.5">
            {([
              [Layers, "Scene"],
              [Cpu, "Logic"],
              [Store, "Assets"],
              [GitBranch, "Versions"],
              [LineChart, "Analytics"],
            ] as const).map(([Icon, l], i) => (
              <div key={l} className={`flex items-center gap-2 px-2 h-8 rounded-lg text-[11px] font-mono uppercase tracking-widest border-2 ${i === 0 ? "bg-primary text-primary-foreground border-ink" : "border-transparent text-ink/60"}`}>
                <Icon className="w-3.5 h-3.5" />
                {l}
              </div>
            ))}
          </aside>
          <div className="col-span-6 p-3 border-r-2 border-ink">
            <div className="aspect-[4/3] rounded-xl border-2 border-ink grid-canvas relative overflow-hidden">
              <div className="absolute inset-3 grid grid-cols-8 grid-rows-6 gap-1">
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
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[oklch(0.65_0.20_145)]" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink/60">All checks green</span>
              </div>
              <button className="px-3 h-7 rounded-full bg-primary text-primary-foreground border-2 border-ink text-[10px] font-mono uppercase tracking-widest">Publish</button>
            </div>
          </div>
          <div className="col-span-3 p-3 space-y-2 bg-[oklch(0.97_0.01_270)]">
            {[
              ["Tile", "bg-primary/70"],
              ["Spawn", "bg-accent"],
              ["Coin", "bg-[oklch(0.75_0.20_50)]"],
              ["Rule", "bg-white"],
              ["NPC", "bg-[oklch(0.72_0.18_290)]"],
            ].map(([l, c]) => (
              <div key={l} className="flex items-center gap-2 p-2 rounded-xl border-2 border-ink bg-white">
                <div className={`w-5 h-5 rounded border-2 border-ink ${c}`} />
                <span className="text-[10px] font-mono uppercase tracking-widest">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustStrip() {
  const items = [
    "50k+ creators shipping",
    "1.2M UGC listings",
    "Ronin-native payouts",
    "60/40 revenue split",
    "No engine install",
    "AI copilot built in",
  ];
  return (
    <div className="border-b-2 border-ink bg-accent overflow-hidden">
      <div className="flex gap-10 py-3 whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="text-sm font-mono uppercase tracking-widest flex items-center gap-10">
            {t}
            <span>◆</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.33%) } }`}</style>
    </div>
  );
}

function WorkspaceShowcase() {
  const panels = [
    { icon: Layers, title: "Scene", body: "Paint tiles, drop entities, snap grids. Everything in the world lives here." },
    { icon: Cpu, title: "Logic", body: "Wire behavior with a node graph. No scripting required — but you can if you want." },
    { icon: Store, title: "Assets", body: "Your inventory, plus everything you've licensed from the marketplace. Drag straight in." },
    { icon: GitBranch, title: "Versions", body: "Every publish is a version. Rollback, diff, or branch a fork in one click." },
    { icon: LineChart, title: "Analytics", body: "Live players, retention curves, funnel drops. Fix what's leaking before the weekend." },
    { icon: Sparkles, title: "Copilot", body: "Describe the vibe. The copilot scaffolds entities, logic, and a first draft to polish." },
  ];
  return (
    <section id="workspace" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="max-w-3xl mb-14">
        <div className="inline-flex items-center px-3 h-7 rounded-full bg-ink text-background border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] mb-5">
          // Inside the workspace
        </div>
        <h2 className="italic font-black text-4xl md:text-6xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Six panels. One <span className="text-primary">workshop.</span>
        </h2>
        <p className="mt-4 text-lg text-ink/70">The Studio isn't a game — it's a workspace. Denser, faster, and never in the way when you're in flow.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {panels.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] p-6">
              <div className="w-11 h-11 rounded-2xl border-2 border-ink bg-ink text-background flex items-center justify-center">
                <Icon className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 text-2xl italic font-black tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{p.title}</h3>
              <p className="mt-2 text-ink/70 leading-relaxed">{p.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ToolStack() {
  const steps = [
    { n: "01", tone: "bg-primary text-primary-foreground", icon: Wand2, title: "Start from a template", body: "Snake, Tag, Racing, Shooter, Hangout, or Blank. All pre-wired." },
    { n: "02", tone: "bg-accent", icon: Zap, title: "License what you need", body: "Sprites, tiles, sfx, scripts, tilesets. One-click drop-in from the marketplace." },
    { n: "03", tone: "bg-[oklch(0.75_0.20_50)]", icon: Trophy, title: "Publish to the Hub", body: "Your game lands in front of 4.2M players. Featured, Trending, and every Party Hub." },
    { n: "04", tone: "bg-[oklch(0.72_0.18_290)] text-primary-foreground", icon: Coins, title: "Withdraw to Ronin", body: "$PIXEL settles on Ronin. Send to your wallet after the 7-day review window." },
  ];
  return (
    <section id="tools" className="bg-ink text-background border-y-2 border-ink">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center px-3 h-7 rounded-full bg-accent text-ink border-2 border-accent text-[11px] font-mono uppercase tracking-widest mb-5">
            // The loop
          </div>
          <h2 className="italic font-black text-4xl md:text-6xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Template → publish → payday.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="bg-background text-ink border-2 border-background rounded-3xl shadow-[4px_4px_0_0_var(--background)] p-6">
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

function RevenueCalculator() {
  const tiers = [
    { players: "500", pass: "50", rev: "15,000", take: "9,000" },
    { players: "5,000", pass: "80", rev: "240,000", take: "144,000" },
    { players: "50,000", pass: "120", rev: "3,600,000", take: "2,160,000" },
  ];
  return (
    <section id="earnings" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <div className="inline-flex items-center px-3 h-7 rounded-full bg-accent border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] mb-5">
            // The math
          </div>
          <h2 className="italic font-black text-4xl md:text-5xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            60% goes to you. <br /> Every time. <br /> On <span className="text-primary">Ronin.</span>
          </h2>
          <p className="mt-4 text-ink/70 leading-relaxed">
            Play passes, cosmetics, tips, resells — every $PIXEL that flows through your game settles on-chain, and 60% is yours. No hidden processor fees, no tiered fine print, no minimum payout.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            {[
              "Settlement on Ronin — the same chain Pixels players hold",
              "7-day review window to catch fraud + refunds",
              "Withdraw to any Ronin wallet, or hold in Studio",
              "One-time NFT mint per project, if you want it",
            ].map((l) => (
              <li key={l} className="flex items-start gap-2">
                <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span className="text-ink/80">{l}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-3xl border-2 border-ink bg-white shadow-[6px_6px_0_0_var(--ink)] overflow-hidden">
            <div className="grid grid-cols-4 border-b-2 border-ink bg-accent text-[10px] font-mono uppercase tracking-widest">
              <div className="p-3 border-r-2 border-ink">Weekly players</div>
              <div className="p-3 border-r-2 border-ink">Avg pass ($PIXEL)</div>
              <div className="p-3 border-r-2 border-ink">Gross revenue</div>
              <div className="p-3">Your take (60%)</div>
            </div>
            {tiers.map((t, i) => (
              <div key={t.players} className={`grid grid-cols-4 text-sm ${i < tiers.length - 1 ? "border-b-2 border-ink" : ""}`}>
                <div className="p-4 border-r-2 border-ink font-mono">{t.players}</div>
                <div className="p-4 border-r-2 border-ink font-mono">{t.pass}</div>
                <div className="p-4 border-r-2 border-ink font-mono text-ink/60">{t.rev}</div>
                <div className="p-4 font-mono font-bold italic text-primary" style={{ fontFamily: "var(--font-display)" }}>+{t.take}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[10px] font-mono uppercase tracking-widest text-ink/50 text-right">
            Illustrative. Actual payouts depend on your monetization mix.
          </div>
        </div>
      </div>
    </section>
  );
}

function CreatorStories() {
  const stories = [
    { handle: "@grid_kid", game: "Slum Speedway", quote: "Shipped my first racing game in a weekend. Cleared 34k plays in the first week — never made anything close to that on my own site.", earned: "42,300", grad: "from-primary/40 to-[oklch(0.72_0.18_290)]/30" },
    { handle: "@808heart", game: "Data Heist", quote: "The Ronin payout was the unlock for me. Actually held $PIXEL, actually spent it in-world. It's not points, it's money.", earned: "18,900", grad: "from-accent/50 to-[oklch(0.85_0.10_180)]/30" },
    { handle: "@nx", game: "Rooftop Tag Arena", quote: "The marketplace saved me weeks. Licensed a full tileset + sfx pack for 400 $PIXEL, built the rest myself.", earned: "88,120", grad: "from-[oklch(0.75_0.20_50)]/50 to-accent/30" },
  ];
  return (
    <section id="creators" className="bg-[oklch(0.97_0.01_270)] border-y-2 border-ink">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center px-3 h-7 rounded-full bg-ink text-background border-2 border-ink text-[11px] font-mono uppercase tracking-widest mb-5">
            // Shipping right now
          </div>
          <h2 className="italic font-black text-4xl md:text-6xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Creators are already <br /> <span className="text-primary">out-earning</span> their day jobs.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {stories.map((s) => (
            <div key={s.handle} className="bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
              <div className={`h-32 bg-gradient-to-br ${s.grad} border-b-2 border-ink relative flex items-end p-4`}>
                <div className="px-2 h-6 rounded-full bg-ink text-background border-2 border-ink flex items-center text-[10px] font-mono uppercase tracking-widest">{s.game}</div>
                <div className="ml-auto px-2 h-6 rounded-full bg-accent border-2 border-ink flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest">
                  <PlayCircle className="w-3 h-3" /> Live
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-ink/80 leading-relaxed">"{s.quote}"</p>
                <div className="mt-4 flex items-center justify-between border-t-2 border-ink/10 pt-3">
                  <span className="text-xs font-mono text-ink/60">{s.handle}</span>
                  <span className="text-xs font-mono">
                    <span className="italic font-black text-primary text-base" style={{ fontFamily: "var(--font-display)" }}>+{s.earned}</span> $PIXEL
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioFaq() {
  const faqs = [
    { q: "Do I need to know how to code?", a: "No. The visual editor + node-graph Logic panel cover 90% of what most games need. If you want to script, you can — but nothing forces it." },
    { q: "How is Studio different from Pixels Hub?", a: "Hub is where players play. Studio is where creators build. Same account, same $PIXEL wallet, two separate workspaces so neither audience gets the other's clutter." },
    { q: "Why Ronin?", a: "Because $PIXEL lives on Ronin. Payouts settle in the same asset your players already hold and spend across the Pixels world — no bridging, no wrapped tokens." },
    { q: "What can I sell?", a: "Full games, playable skins, cosmetics, avatar items, and creator assets (sprite packs, sfx, tilesets, scripts). Playable UGC lands in the Hub shop; creator assets land in the Studio marketplace." },
    { q: "What's the fee structure?", a: "60% to you, 40% to the platform. That covers hosting, moderation, discovery, and the on-chain payout. No subscription, no upsells, no per-seat pricing." },
    { q: "Can I take my game elsewhere?", a: "Yes — you can optionally mint your project as a creator NFT. Ownership stays with you regardless of what the platform does." },
  ];
  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-3 h-7 rounded-full bg-accent border-2 border-ink text-[11px] font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] mb-5">
          // The details
        </div>
        <h2 className="italic font-black text-4xl md:text-5xl tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Common questions.
        </h2>
      </div>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
            <summary className="cursor-pointer p-5 flex items-center justify-between gap-4 list-none">
              <span className="font-bold text-ink">{f.q}</span>
              <span className="w-8 h-8 rounded-full border-2 border-ink bg-white flex items-center justify-center shrink-0 group-open:bg-ink group-open:text-background transition">+</span>
            </summary>
            <div className="px-5 pb-5 text-ink/70 leading-relaxed border-t-2 border-ink/10 pt-4">{f.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

function StudioCta() {
  return (
    <section className="border-y-2 border-ink bg-primary text-primary-foreground">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
        <h2 className="italic font-black text-4xl md:text-7xl tracking-tight leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
          Open the Studio. <br /> Ship something tonight.
        </h2>
        <p className="mt-5 text-lg opacity-80 max-w-2xl mx-auto">Free to start. No install. Your first playable is one template and one afternoon away.</p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link to="/studio/create" className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-background text-ink border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
            Start building <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-ink text-background border-2 border-background shadow-[4px_4px_0_0_var(--background)] text-sm font-mono uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform">
            I just want to play <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StudioFooter() {
  return (
    <footer className="bg-ink text-background">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-2xl bg-accent border-2 border-background flex items-center justify-center">
              <Hammer className="w-4 h-4 text-ink" />
            </div>
            <span className="italic font-black text-lg" style={{ fontFamily: "var(--font-display)" }}>Pixels Studio</span>
          </div>
          <p className="text-sm text-background/60 leading-relaxed">The creator workspace for the Pixels world.</p>
        </div>
        {[
          { title: "Product", links: [["Workspace", "#workspace"], ["Tools", "#tools"], ["Earnings", "#earnings"], ["FAQ", "#faq"]] },
          { title: "Creators", links: [["Templates", "/studio/templates"], ["Marketplace", "/marketplace"], ["Docs", "/legal"], ["Creator agreement", "/legal/creator-agreement"]] },
          { title: "Pixels", links: [["Play now", "/"], ["Party Hub", "/hub"], ["Wallet", "/wallet"], ["Log in", "/login?mode=studio"]] },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-[10px] font-mono uppercase tracking-widest text-background/50 mb-3">{col.title}</div>
            <ul className="space-y-2 text-sm">
              {col.links.map(([l, h]) => (
                <li key={l}><a href={h} className="text-background/80 hover:text-background">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-background/10 py-4 text-center text-[10px] font-mono uppercase tracking-widest text-background/40">
        Pixels Studio · Built inside the CyberVerse · $PIXEL on Ronin
      </div>
    </footer>
  );
}
