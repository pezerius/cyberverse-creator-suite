import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudCard, Chip, SectionHeader } from "@/components/hud";
import { Trophy, Clock, Flame, Target, Check, ArrowRight, Zap, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/quests")({
  head: () => ({
    meta: [
      { title: "Quests — Powered by Stacked · Pixels Hub" },
      { name: "description", content: "Daily and weekly quests across Pixels games. Earn $PIXEL on Ronin, powered by Stacked." },
      { property: "og:title", content: "Pixels Quests — Powered by Stacked" },
      { property: "og:description", content: "Play, complete, get paid. Real $PIXEL rewards on Ronin." },
    ],
    links: [{ rel: "canonical", href: "/quests" }],
  }),
  component: () => (
    <AppShell>
      <QuestsPage />
    </AppShell>
  ),
});

type Quest = {
  id: string;
  game: string;
  title: string;
  desc: string;
  reward: number;
  window: "daily" | "weekly" | "limited";
  progress: number;
  goal: number;
  timeLeft: string;
  players: number;
  difficulty: "easy" | "medium" | "hard";
};

const quests: Quest[] = [
  { id: "q1", game: "Neon Rush", title: "Rooftop runner", desc: "Complete 3 chase rounds without getting caught.", reward: 250, window: "daily", progress: 2, goal: 3, timeLeft: "6h 12m", players: 12480, difficulty: "easy" },
  { id: "q2", game: "Bytebrawl", title: "First blood, five times", desc: "Land the opening hit in 5 matches.", reward: 800, window: "daily", progress: 1, goal: 5, timeLeft: "6h 12m", players: 8210, difficulty: "medium" },
  { id: "q3", game: "Chrome Alley", title: "Speedrun sub-40", desc: "Finish the campaign in under 40 seconds.", reward: 3200, window: "weekly", progress: 0, goal: 1, timeLeft: "4d 2h", players: 2140, difficulty: "hard" },
  { id: "q4", game: "Holo Beats", title: "Full combo streak", desc: "Chain 3 full combos in a row on hard.", reward: 1600, window: "weekly", progress: 1, goal: 3, timeLeft: "4d 2h", players: 5380, difficulty: "medium" },
  { id: "q5", game: "Party Hub", title: "Crew of five", desc: "Party up in a voice room with 4 friends.", reward: 500, window: "daily", progress: 0, goal: 1, timeLeft: "6h 12m", players: 22140, difficulty: "easy" },
  { id: "q6", game: "Neon Rush", title: "Tournament qualifier", desc: "Place top 100 in the weekly tournament.", reward: 12000, window: "limited", progress: 0, goal: 1, timeLeft: "2d 8h", players: 940, difficulty: "hard" },
];

function QuestsPage() {
  const totalToday = quests.filter(q => q.window === "daily").reduce((s, q) => s + q.reward, 0);
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="// Quests · Powered by Stacked"
        title="Play. Complete. Get paid."
        sub="Stacked runs the quest layer for the Pixels world. Every reward hits your Ronin wallet as real $PIXEL."
      />

      {/* Hero band */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5 mb-8">
        <div className="rounded-3xl bg-ink text-background border-2 border-ink shadow-[6px_6px_0_0_var(--ink)] p-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-accent/30 blur-3xl" />
          <div className="inline-flex items-center gap-2 px-3 h-7 rounded-full bg-accent text-ink border-2 border-accent text-[11px] font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" /> Live on Stacked
          </div>
          <h2 className="italic font-black text-4xl md:text-5xl leading-[0.95]" style={{ fontFamily: "var(--font-display)" }}>
            Today's pot: <span className="text-accent">{totalToday.toLocaleString()} $PIXEL</span>
          </h2>
          <p className="mt-3 text-background/70 max-w-lg text-sm">
            Refresh in 6 hours. Weekly and limited-time quests stack on top — plus tournaments up to 50k per game.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href="https://stacked.xyz/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-accent text-ink border-2 border-accent font-mono text-xs uppercase tracking-widest font-bold hover:translate-y-[-1px] transition">
              Open Stacked <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link to="/tournaments" className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-background/10 text-background border-2 border-background/40 font-mono text-xs uppercase tracking-widest font-bold hover:bg-background/20 transition">
              <Trophy className="w-3.5 h-3.5" /> Tournaments
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Kpi icon={Flame} label="Streak" value="7d" tone="bg-accent" />
          <Kpi icon={Trophy} label="This week" value="+8.4k" tone="bg-white" />
          <Kpi icon={Target} label="Completed" value="24" tone="bg-white" />
          <Kpi icon={Zap} label="Rank" value="#312" tone="bg-primary text-primary-foreground" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {["All", "Daily", "Weekly", "Limited", "Easy", "Hard"].map((f, i) => (
          <button key={f} className={`h-9 px-4 rounded-full font-mono text-[11px] uppercase tracking-widest font-bold border-2 border-ink ${i === 0 ? "bg-primary text-primary-foreground shadow-[2px_2px_0_0_var(--ink)]" : "bg-white text-ink hover:bg-accent transition"}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Quest grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {quests.map((q) => <QuestCard key={q.id} q={q} />)}
      </div>

      {/* How it works */}
      <div className="mt-10 grid md:grid-cols-3 gap-3">
        {[
          { n: "01", t: "Pick a quest", d: "Any Pixels game with an active Stacked quest shows up here." },
          { n: "02", t: "Play as normal", d: "Progress tracks automatically the second the match ends." },
          { n: "03", t: "Get paid on Ronin", d: "$PIXEL lands in your wallet after the quest window closes." },
        ].map((s) => (
          <div key={s.n} className="rounded-2xl bg-white border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] p-5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50">{s.n}</div>
            <div className="mt-1 italic font-black text-xl" style={{ fontFamily: "var(--font-display)" }}>{s.t}</div>
            <p className="mt-1 text-sm text-ink/60">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, tone }: { icon: typeof Trophy; label: string; value: string; tone: string }) {
  return (
    <div className={`rounded-2xl border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] p-4 ${tone}`}>
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest opacity-70">
        <Icon className="w-3.5 h-3.5" /> {label}
      </div>
      <div className="mt-1.5 italic font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>{value}</div>
    </div>
  );
}

function QuestCard({ q }: { q: Quest }) {
  const pct = Math.round((q.progress / q.goal) * 100);
  const done = q.progress >= q.goal;
  const diffTone = q.difficulty === "hard" ? "red" : q.difficulty === "medium" ? "amber" : "green";
  const winTone = q.window === "limited" ? "magenta" : q.window === "weekly" ? "violet" : "cyan";

  return (
    <div className="rounded-2xl bg-white border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Chip tone={winTone}>{q.window}</Chip>
          <Chip tone={diffTone as "red" | "amber" | "green"}>{q.difficulty}</Chip>
        </div>
        <div className="text-right">
          <div className="italic font-black text-2xl text-primary" style={{ fontFamily: "var(--font-display)" }}>+{q.reward.toLocaleString()}</div>
          <div className="text-[9px] font-mono uppercase tracking-widest text-ink/50">$PIXEL</div>
        </div>
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">{q.game}</div>
      <div className="mt-1 italic font-black text-xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>{q.title}</div>
      <p className="mt-1 text-sm text-ink/70 flex-1">{q.desc}</p>

      <div className="mt-4 h-2 rounded-full bg-ink/10 overflow-hidden">
        <div className={`h-full ${done ? "bg-[oklch(0.72_0.20_140)]" : "bg-primary"}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-ink/60">
        <span>{q.progress}/{q.goal}</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {q.timeLeft}</span>
        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {q.players.toLocaleString()}</span>
      </div>

      <button
        onClick={() => toast.success(done ? "Reward claimed" : "Quest tracked", { description: done ? `+${q.reward.toLocaleString()} $PIXEL en route to your Ronin wallet.` : `Progress on "${q.title}" will auto-update as you play.` })}
        className={`mt-4 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-2xl border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest font-bold transition hover:translate-y-[-1px] ${done ? "bg-accent text-ink" : "bg-primary text-primary-foreground"}`}
      >
        {done ? <><Check className="w-4 h-4" /> Claim reward</> : <><Target className="w-4 h-4" /> Track quest</>}
      </button>
    </div>
  );
}
