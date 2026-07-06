import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SectionHeader, Chip, HudButton } from "@/components/hud";
import { feed, type FeedEvent } from "@/lib/mock-social";
import { Gamepad2, Package, Upload, Star, UserPlus, Trophy, ShoppingBag, Radio, Filter } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Feed — Pixels Studio" },
      { name: "description", content: "See what your Pixels Studio crew is playing, making, and shipping right now." },
    ],
  }),
  component: () => <AppShell><Page /></AppShell>,
});

const kindMeta: Record<FeedEvent["kind"], { icon: typeof Gamepad2; label: string; tone: "magenta" | "cyan" | "amber" | "green" | "violet" | "default" }> = {
  played: { icon: Gamepad2, label: "played", tone: "magenta" },
  shipped: { icon: Upload, label: "shipped", tone: "cyan" },
  listed: { icon: Package, label: "listed", tone: "amber" },
  reviewed: { icon: Star, label: "reviewed", tone: "amber" },
  followed: { icon: UserPlus, label: "followed", tone: "violet" },
  achievement: { icon: Trophy, label: "unlocked", tone: "green" },
  purchased: { icon: ShoppingBag, label: "bought", tone: "default" },
  streamed: { icon: Radio, label: "is live", tone: "magenta" },
};

function Page() {
  const [filter, setFilter] = useState<"all" | FeedEvent["kind"]>("all");
  const items = useMemo(() => filter === "all" ? feed : feed.filter((f) => f.kind === filter), [filter]);
  const kinds: (FeedEvent["kind"] | "all")[] = ["all", "played", "shipped", "listed", "reviewed", "streamed", "achievement"];

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
      <SectionHeader
        eyebrow="// Feed · your crew"
        title="What your crew is up to."
        sub="Realtime activity from creators and friends you follow. Filter to cut the noise."
      />

      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-ink/60 shrink-0" />
        {kinds.map((k) => (
          <button key={k} onClick={() => setFilter(k)}
            className={`shrink-0 px-3 h-8 rounded-full border-2 text-[10px] font-mono uppercase tracking-widest ${filter === k ? "bg-ink text-background border-ink" : "bg-white border-ink/30 hover:border-ink"}`}>
            {k}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((e) => {
          const meta = kindMeta[e.kind];
          const Icon = meta.icon;
          return (
            <div key={e.id} className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-4 flex gap-3">
              <Link to="/u/$handle" params={{ handle: e.who }} className="w-10 h-10 rounded-full bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold shrink-0">{e.whoAvatar}</Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link to="/u/$handle" params={{ handle: e.who }} className="font-bold text-sm hover:underline">@{e.who}</Link>
                  <Chip tone={meta.tone}><Icon className="w-3 h-3" /> {meta.label}</Chip>
                  <span className="text-[10px] font-mono text-ink/50 ml-auto">{e.ts}</span>
                </div>
                <div className="mt-1 text-sm">
                  {e.target && e.targetType === "game" ? (
                    <Link to="/g/$slug" params={{ slug: e.target }} className="font-bold hover:underline">{e.what}</Link>
                  ) : e.target && e.targetType === "asset" ? (
                    <Link to="/marketplace/$assetId" params={{ assetId: e.target }} className="font-bold hover:underline">{e.what}</Link>
                  ) : e.target && e.targetType === "creator" ? (
                    <Link to="/u/$handle" params={{ handle: e.target }} className="font-bold hover:underline">{e.what}</Link>
                  ) : (
                    <span className="font-bold">{e.what}</span>
                  )}
                </div>
                {e.meta && <div className="mt-1 text-xs text-ink/60 font-mono">{e.meta}</div>}
                <div className="mt-3 flex items-center gap-2">
                  <button className="text-[10px] font-mono uppercase tracking-widest text-ink/50 hover:text-ink">★ Cheer</button>
                  <button className="text-[10px] font-mono uppercase tracking-widest text-ink/50 hover:text-ink">↩ Reply</button>
                  {e.kind === "streamed" && <HudButton size="sm" variant="primary"><Radio className="w-3 h-3" /> Watch</HudButton>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
