import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { Wand2, Share2, Coins, Sparkles, Play, Loader2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create — NeoLab Studio" },
      { name: "description", content: "Make a game in hours, not months. Templates, AI copilot, and a built-in audience." },
    ],
  }),
  component: () => (
    <AppShell>
      <CreatePage />
    </AppShell>
  ),
});

const progressSteps = [
  "Reading your prompt...",
  "Selecting closest template: Tag / Hide-and-Seek...",
  "Placing 12 hiding spots + 4 seeker spawns...",
  "Generating logic: 30s rounds, 3 lives...",
  "Wiring PIXELS reward payout node...",
  "Validating publish checklist... 2 warnings remain.",
];

function CreatePage() {
  const [prompt, setPrompt] = useState("A neon rooftop tag arena where seekers get a slow-motion pulse every 10 seconds.");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);

  function generate() {
    setRunning(true);
    setStep(0);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= progressSteps.length) {
        clearInterval(t);
        setTimeout(() => setRunning(false), 800);
      }
    }, 650);
  }

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Hero */}
      <div className="relative hud-panel p-10 md:p-14 overflow-hidden">
        <div className="absolute inset-0 grid-canvas opacity-40 -z-10" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-primary/25 blur-3xl -z-10" />
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] neon-text-cyan mb-3">// NeoLab Studio · Welcome</div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
          Ship a game your <span className="neon-text-magenta">CyberVerse crew</span> is playing tonight.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          Pick a template, paint a level, wire a rule, publish to Party Hub. No engine. No install. No revenue share that
          insults you.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/templates">
            <HudButton variant="primary" className="h-12 px-6">
              <Sparkles className="w-4 h-4" /> Start Creating
            </HudButton>
          </Link>
          <Link to="/hub">
            <HudButton variant="secondary" className="h-12 px-6">
              <Play className="w-4 h-4" /> Browse the Hub
            </HudButton>
          </Link>
          <div className="flex items-center gap-2 h-12 px-4 clip-hud-sm bg-neon-amber/10 border border-neon-amber/40">
            <Coins className="w-4 h-4 neon-text-amber" />
            <span className="font-mono text-xs uppercase tracking-widest neon-text-amber">60% goes to you</span>
          </div>
        </div>
      </div>

      {/* Three pitch panels */}
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        <PitchPanel
          eyebrow="Make"
          tone="magenta"
          icon={<Wand2 className="w-5 h-5 neon-text-magenta" />}
          title="Six templates. One editor."
          body="Snake, tag, racing, shooter, hangout, or blank. Every template ships with sensible defaults so you can publish in an afternoon."
          bullets={["Visual node logic — no code required", "Autosave every 2 seconds", "Import your own tiles once you go Pro"]}
        />
        <PitchPanel
          eyebrow="Share"
          tone="cyan"
          icon={<Share2 className="w-5 h-5 neon-text-cyan" />}
          title="Party Hub is your storefront."
          body="Every CyberVerse player already lives in Party Hub. Publish once, get discovered in Featured, Trending, and New Releases."
          bullets={["4.2M weekly active players", "Pro Rotation featured slots", "Referral rewards for early streamers"]}
        />
        <PitchPanel
          eyebrow="Earn"
          tone="amber"
          icon={<Coins className="w-5 h-5 neon-text-amber" />}
          title="60/40, in your favor."
          body="Every PIXEL spent on your game settles on-chain. Withdraw to your CyberVerse wallet after a 7-day review window."
          bullets={["Pro plan bumps you to 80/20", "One-time NFT mint per project", "No hidden platform fees"]}
        />
      </div>

      {/* AI Copilot */}
      <div className="mt-12">
        <SectionHeader
          eyebrow="// AI Copilot · Beta"
          title="Describe it. We'll scaffold it."
          sub="Rough idea in plain language. NeoLab picks a template, places entities, wires basic logic, and hands you an editable draft."
          right={<Chip tone="violet">Beta · 400 PIXELS / gen</Chip>}
        />
        <div className="grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3">
            <HudCard glow="magenta">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                className="mt-2 w-full bg-background/60 border border-border/60 clip-hud-sm p-4 font-mono text-sm focus:outline-none focus:border-primary/60 resize-none"
              />
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {["Rooftop tag", "Speedrun platformer", "Cyber chess", "Zero-G race"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setPrompt(`A ${t.toLowerCase()} with a twist that surprises returning players.`)}
                    className="px-2 h-7 clip-hud-sm bg-surface-2 border border-border/50 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
                  >
                    + {t}
                  </button>
                ))}
                <HudButton variant="primary" className="ml-auto" onClick={generate} disabled={running}>
                  {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {running ? "Generating..." : "Generate draft"}
                </HudButton>
              </div>
            </HudCard>
          </div>
          <div className="lg:col-span-2">
            <HudCard>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">// Progress log</div>
              <div className="font-mono text-xs space-y-1.5 min-h-[200px]">
                {progressSteps.map((s, i) => {
                  const done = i < step;
                  const active = i === step && running;
                  return (
                    <div key={i} className={`flex items-start gap-2 ${done ? "text-neon-green" : active ? "neon-text-cyan" : "text-muted-foreground/50"}`}>
                      <span className="w-3">{done ? "✓" : active ? "▸" : "·"}</span>
                      <span>{s}</span>
                    </div>
                  );
                })}
                {step >= progressSteps.length && (
                  <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
                    <span className="neon-text-magenta">Draft ready.</span>
                    <Link to="/builder" className="underline">Open in editor →</Link>
                  </div>
                )}
              </div>
            </HudCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function PitchPanel({
  eyebrow,
  title,
  body,
  bullets,
  icon,
  tone,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  icon: React.ReactNode;
  tone: "magenta" | "cyan" | "amber";
}) {
  return (
    <HudCard glow={tone} className="h-full flex flex-col">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 clip-hud-sm bg-surface-2 border border-border flex items-center justify-center">{icon}</div>
        <Chip tone={tone}>{eyebrow}</Chip>
      </div>
      <h3 className="mt-4 text-xl font-bold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <ul className="mt-4 space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm">
            <span className="mt-1 w-1.5 h-1.5 bg-primary shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </HudCard>
  );
}
