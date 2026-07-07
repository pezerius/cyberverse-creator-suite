import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Chip, SectionHeader } from "@/components/hud";
import { Trophy, Clock, Users, Flame, ArrowRight, Crown, Medal, Play } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/tournaments")({
  head: () => ({
    meta: [
      { title: "Tournaments — Pixels Hub" },
      { name: "description", content: "Weekly tournaments across Pixels games. Prize pools up to 50k $PIXEL, paid on Ronin." },
      { property: "og:title", content: "Pixels Tournaments — Up to 50k $PIXEL" },
      { property: "og:description", content: "Compete weekly across the top Pixels games. Real prize pools, real payouts on Ronin." },
    ],
    links: [{ rel: "canonical", href: "/tournaments" }],
  }),
  component: () => (
    <AppShell>
      <TournamentsPage />
    </AppShell>
  ),
});

type Tourney = {
  id: string;
  game: string;
  title: string;
  prize: number;
  state: "live" | "starting" | "signup";
  entrants: number;
  cap: number;
  entry: number;
  endsIn: string;
  format: string;
};

const tourneys: Tourney[] = [
  { id: "t1", game: "Neon Rush", title: "Weekly Rooftop Cup", prize: 50000, state: "live", entrants: 842, cap: 1024, entry: 100, endsIn: "1d 4h", format: "Bracket · BO3" },
  { id: "t2", game: "Bytebrawl", title: "Byte Wars #14", prize: 32000, state: "live", entrants: 512, cap: 512, entry: 250, endsIn: "18h 22m", format: "Double elim" },
  { id: "t3", game: "Chrome Alley", title: "Speedrun Ladder", prize: 18000, state: "starting", entrants: 220, cap: 500, entry: 0, endsIn: "in 3h", format: "Time trial · Best 3" },
  { id: "t4", game: "Holo Beats", title: "Rhythm Royale", prize: 22000, state: "signup", entrants: 96, cap: 256, entry: 50, endsIn: "signup 2d", format: "Ranked ladder" },
];

const leaderboard = [
  { rank: 1, name: "drift.dev", handle: "@drift.dev", score: 148920, delta: "+12" },
  { rank: 2, name: "holo.studio", handle: "@holo.studio", score: 132480, delta: "+3" },
  { rank: 3, name: "bytebrawl", handle: "@bytebrawl", score: 128010, delta: "-1" },
  { rank: 4, name: "nightbird", handle: "@nightbird", score: 119870, delta: "+8" },
  { rank: 5, name: "ui.forge", handle: "@ui.forge", score: 108234, delta: "0" },
  { rank: 6, name: "you", handle: "@you", score: 96420, delta: "+18", me: true },
];

function TournamentsPage() {
  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="// Tournaments"
        title="Weekly cups. Real pots."
        sub="Compete across the top Pixels games. Prize pools paid straight to your Ronin wallet."
      />

      {/* Featured live */}
      <div className="rounded-3xl bg-primary text-primary-foreground border-2 border-ink shadow-[6px_6px_0_0_var(--ink)] p-8 mb-8 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-56 h-56 rounded-full bg-accent/30 blur-3xl" />
        <div className="flex flex-wrap items-start gap-6 justify-between relative">
          <div>
            <div className="inline-flex items-center gap-2 px-3 h-7 rounded-full bg-accent text-ink border-2 border-accent text-[11px] font-mono uppercase tracking-widest mb-4">
              <Flame className="w-3 h-3" /> Live now
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest opacity-80">Neon Rush · Weekly Rooftop Cup</div>
            <h2 className="italic font-black text-4xl md:text-5xl leading-[0.95] mt-2" style={{ fontFamily: "var(--font-display)" }}>
              50,000 <span className="text-accent">$PIXEL</span>
            </h2>
            <p className="mt-3 text-primary-foreground/80 max-w-md text-sm">
              1,024-player bracket. 842 in. 18h left to lock a spot. Top 100 pay out, winner takes 15k.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => toast.success("You're in.", { description: "Rooftop Cup slot reserved. Match starts when the bracket fills." })}
              className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-accent text-ink border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] font-mono text-sm uppercase tracking-widest font-bold hover:translate-y-[-2px] transition-transform"
            >
              <Play className="w-4 h-4" /> Enter · 100 $PIXEL
            </button>
            <div className="text-[10px] font-mono uppercase tracking-widest opacity-80 text-center">Ends in 1d 4h</div>
          </div>
        </div>
      </div>

      {/* Grid + leaderboard */}
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// All tournaments</div>
          <div className="grid md:grid-cols-2 gap-4">
            {tourneys.map((t) => <TourneyCard key={t.id} t={t} />)}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// Season leaderboard</div>
          <div className="rounded-2xl bg-white border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] overflow-hidden">
            {leaderboard.map((r) => (
              <div key={r.rank} className={`flex items-center gap-3 px-4 py-3 border-b-2 border-ink/10 last:border-b-0 ${r.me ? "bg-accent/40" : ""}`}>
                <div className="w-8 h-8 rounded-lg border-2 border-ink flex items-center justify-center font-black italic bg-white text-sm" style={{ fontFamily: "var(--font-display)" }}>
                  {r.rank === 1 ? <Crown className="w-4 h-4 text-[oklch(0.75_0.20_80)]" /> : r.rank <= 3 ? <Medal className="w-4 h-4" /> : r.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{r.handle}</div>
                  <div className="text-[10px] font-mono text-ink/50">Season points</div>
                </div>
                <div className="text-right">
                  <div className="italic font-black text-lg" style={{ fontFamily: "var(--font-display)" }}>{r.score.toLocaleString()}</div>
                  <div className={`text-[10px] font-mono ${r.delta.startsWith("+") ? "text-[oklch(0.55_0.20_140)]" : r.delta.startsWith("-") ? "text-destructive" : "text-ink/50"}`}>{r.delta}</div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/quests" className="mt-4 inline-flex items-center gap-2 h-11 px-4 rounded-full bg-ink text-background border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest font-bold">
            Grind quests to climb <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function TourneyCard({ t }: { t: Tourney }) {
  const pct = Math.round((t.entrants / t.cap) * 100);
  const tone: "red" | "amber" | "cyan" = t.state === "live" ? "red" : t.state === "starting" ? "amber" : "cyan";
  return (
    <div className="rounded-2xl bg-white border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Chip tone={tone}>{t.state}</Chip>
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink/60">{t.game}</span>
        </div>
        <div className="text-right">
          <div className="italic font-black text-2xl text-primary" style={{ fontFamily: "var(--font-display)" }}>{(t.prize / 1000).toFixed(0)}k</div>
          <div className="text-[9px] font-mono uppercase tracking-widest text-ink/50">$PIXEL pot</div>
        </div>
      </div>
      <div className="italic font-black text-xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>{t.title}</div>
      <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-ink/60">{t.format}</div>

      <div className="mt-4 h-2 rounded-full bg-ink/10 overflow-hidden">
        <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-ink/60">
        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {t.entrants}/{t.cap}</span>
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t.endsIn}</span>
      </div>

      <button
        onClick={() => toast.success(`Entered ${t.title}`, { description: t.entry ? `-${t.entry} $PIXEL entry · Match assignment incoming.` : "Free entry · Match assignment incoming." })}
        className="mt-4 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-2xl bg-ink text-background border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest font-bold hover:translate-y-[-1px] transition-transform"
      >
        <Trophy className="w-4 h-4" /> {t.entry ? `Enter · ${t.entry} $PIXEL` : "Enter · Free"}
      </button>
    </div>
  );
}
