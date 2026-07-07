import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { Lock, Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/studio/templates")({
  head: () => ({
    meta: [
      { title: "Templates — Pixels Studio" },
      { name: "description", content: "Snake, Tag, Racing, Shooter, Hangout, Blank Canvas. Pick a start point." },
    ],
  }),
  component: () => (
    <AppShell>
      <TemplatesPage />
    </AppShell>
  ),
});

type Difficulty = "Easy" | "Medium" | "Advanced";
const templates: {
  name: string;
  desc: string;
  difficulty: Difficulty;
  time: string;
  grad: string;
  emoji: string;
  tag?: string;
}[] = [
  { name: "Snake", desc: "The classic, souped-up with power pellets and PvP rooms.", difficulty: "Easy", time: "~1h to publish", grad: "from-neon-green/40 via-primary/30 to-background", emoji: "🐍" },
  { name: "Tag / Hide-and-Seek", desc: "Timed rounds, silhouettes, seeker pulses, safe zones.", difficulty: "Easy", time: "~2h to publish", grad: "from-primary/50 via-neon-violet/30 to-background", emoji: "👁", tag: "Popular" },
  { name: "Racing Challenge", desc: "Checkpoint loops, boost pads, ghost replays.", difficulty: "Medium", time: "~3h to publish", grad: "from-accent/50 via-primary/20 to-background", emoji: "🏁" },
  { name: "2D Shooter Arena", desc: "Weapons, respawns, KDA leaderboards.", difficulty: "Advanced", time: "~5h to publish", grad: "from-neon-red/40 via-neon-amber/30 to-background", emoji: "⚔" },
  { name: "Hangout World", desc: "No objective. Just terrain, doors, and chairs.", difficulty: "Easy", time: "~1h to publish", grad: "from-accent/40 via-neon-violet/30 to-background", emoji: "🌆" },
  { name: "Blank Canvas", desc: "Empty grid, all 14 entities, full logic graph.", difficulty: "Advanced", time: "Depends on you", grad: "from-surface-3 via-surface-2 to-background", emoji: "◻" },
];

function TemplatesPage() {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="// Template Gallery"
        title="Steal a head start."
        sub="Every template is a working game. Ship as-is, or tear it apart in the editor."
        right={
          <Link to="/studio/create">
            <HudButton variant="secondary">← Back to Welcome</HudButton>
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((t) => (
          <TemplateCard key={t.name} t={t} />
        ))}
        {/* Locked community */}
        <div className="hud-panel p-0 overflow-hidden relative opacity-70">
          <div className="h-40 bg-gradient-to-br from-surface-3 via-surface-2 to-background relative flex items-center justify-center">
            <Lock className="w-10 h-10 text-muted-foreground/70" />
            <div className="absolute inset-0 scanlines opacity-40" />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-2">
              <Chip tone="violet">🔒 Stage 3</Chip>
              <Chip>Coming soon</Chip>
            </div>
            <h3 className="mt-3 text-lg font-bold">Community Templates</h3>
            <p className="mt-1 text-sm text-muted-foreground">Fork any published game as your starting point. Unlocks after Stage 3 launch.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ t }: { t: (typeof templates)[number] }) {
  const diffTone: Record<Difficulty, "green" | "amber" | "red"> = { Easy: "green", Medium: "amber", Advanced: "red" };
  return (
    <Link to="/studio/builder" className="group hud-panel p-0 overflow-hidden flex flex-col hover:neon-border-magenta transition">
      <div className={`h-40 bg-gradient-to-br ${t.grad} relative flex items-center justify-center`}>
        <div className="text-6xl opacity-80 group-hover:scale-110 transition">{t.emoji}</div>
        <div className="absolute inset-0 grid-canvas opacity-25" />
        {t.tag && (
          <div className="absolute top-2 left-2">
            <Chip tone="magenta">★ {t.tag}</Chip>
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2">
          <Chip tone={diffTone[t.difficulty]}>{t.difficulty}</Chip>
          <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <Clock className="w-3 h-3" /> {t.time}
          </div>
        </div>
        <h3 className="mt-3 text-lg font-bold">{t.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground flex-1">{t.desc}</p>
        <div className="mt-4 flex items-center justify-between text-xs font-mono uppercase tracking-widest">
          <span className="text-muted-foreground">Use template</span>
          <ArrowRight className="w-4 h-4 neon-text-magenta group-hover:translate-x-1 transition" />
        </div>
      </div>
    </Link>
  );
}
