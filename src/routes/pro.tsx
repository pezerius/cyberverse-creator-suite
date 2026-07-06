import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { Check, Minus, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pro")({
  head: () => ({
    meta: [{ title: "Upgrade to Pro — Pixels Studio" }, { name: "description", content: "One-time NFT mint. 80/20 split. Custom asset uploads. Scripting." }],
  }),
  component: () => (
    <AppShell>
      <ProPage />
    </AppShell>
  ),
});

const features: { row: string; free: string | boolean; pro: string | boolean }[] = [
  { row: "Revenue split (creator / platform)", free: "60 / 40", pro: "80 / 20" },
  { row: "Active projects", free: "5", pro: "50" },
  { row: "Custom asset uploads (sprites, SFX)", free: false, pro: true },
  { row: "Custom scripting (Lua sandbox)", free: false, pro: true },
  { row: "Marketplace asset selling", free: false, pro: true },
  { row: "Party Hub Featured eligibility", free: false, pro: true },
  { row: "AI Copilot credits / month", free: "5", pro: "200" },
  { row: "Publish thumbnail resolution", free: "720p", pro: "1440p" },
  { row: "Playtest guest slots", free: "4", pro: "16" },
  { row: "NFT ownership (transferable)", free: false, pro: true },
  { row: "Analytics retention", free: "30 days", pro: "2 years" },
  { row: "Priority publish review", free: false, pro: true },
];

function ProPage() {
  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="// Upgrade"
        title="Level up the workshop."
        sub="Pro is a one-time mint, not a subscription. You own it as an NFT and can transfer or resell it."
        right={<Chip tone="violet">Limited: 8,400 mints left</Chip>}
      />

      <div className="grid md:grid-cols-2 gap-5">
        {/* Free */}
        <HudCard>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Current plan</div>
              <div className="text-2xl font-bold mt-1">Pixels Studio Free</div>
            </div>
            <Chip>Included</Chip>
          </div>
          <div className="mt-6">
            <div className="font-mono text-4xl">0 <span className="text-sm text-muted-foreground">PX / forever</span></div>
            <div className="text-xs text-muted-foreground mt-1">Ships with every Pixels account.</div>
          </div>
          <ul className="mt-6 space-y-2 text-sm">
            {[
              "60 / 40 revenue split",
              "5 active projects",
              "All 6 templates, preset assets only",
              "Publish to Party Hub",
              "AI Copilot · 5 generations / month",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 text-neon-green mt-0.5" /> {t}</li>
            ))}
          </ul>
          <HudButton variant="ghost" className="mt-6 w-full justify-center h-11" disabled>
            You're on this plan
          </HudButton>
        </HudCard>

        {/* Pro */}
        <HudCard glow="magenta" className="relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/25 blur-3xl -z-10" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest neon-text-magenta">// Recommended</div>
              <div className="text-2xl font-bold mt-1">Pixels Studio Pro</div>
            </div>
            <Chip tone="magenta"><Sparkles className="w-3 h-3" /> NFT · Transferable</Chip>
          </div>
          <div className="mt-6">
            <div className="font-mono text-4xl neon-text-magenta">
              45,000 <span className="text-sm text-muted-foreground">PX · one-time mint</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Not a subscription. You own the license — sell it, gift it, park it in your wallet.
            </div>
          </div>
          <ul className="mt-6 space-y-2 text-sm">
            {[
              "80 / 20 revenue split (keep more of every PIXEL)",
              "50 active projects",
              "Upload custom sprites, SFX, and tilesets",
              "Lua scripting sandbox for advanced logic",
              "Sell your own assets on the Marketplace",
              "Priority publish review (~4h vs ~2 days)",
              "200 AI Copilot generations / month",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 neon-text-magenta mt-0.5" /> {t}</li>
            ))}
          </ul>
          <HudButton variant="primary" className="mt-6 w-full justify-center h-11">
            Mint Pro · 45,000 PX
          </HudButton>
          <div className="mt-2 text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Your balance: 12,480 PX · <span className="neon-text-amber">Top up 32,520 PX</span>
          </div>
        </HudCard>
      </div>

      {/* Full comparison */}
      <div className="mt-12">
        <SectionHeader eyebrow="// Feature comparison" title="Every difference, spelled out." />
        <HudCard className="!p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="font-mono text-[10px] uppercase tracking-widest bg-surface-2/60">
              <tr>
                <th className="text-left p-4 w-1/2">Feature</th>
                <th className="text-left p-4 text-muted-foreground">Free</th>
                <th className="text-left p-4 neon-text-magenta">Pro</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={f.row} className={`border-t border-border/30 ${i % 2 ? "bg-background/40" : ""}`}>
                  <td className="p-4">{f.row}</td>
                  <td className="p-4 font-mono text-muted-foreground">
                    {typeof f.free === "boolean" ? (f.free ? <Check className="w-4 h-4 text-neon-green" /> : <Minus className="w-4 h-4 text-muted-foreground/50" />) : f.free}
                  </td>
                  <td className="p-4 font-mono neon-text-magenta">
                    {typeof f.pro === "boolean" ? (f.pro ? <Check className="w-4 h-4 text-neon-green" /> : <Minus className="w-4 h-4 text-muted-foreground/50" />) : f.pro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </HudCard>
      </div>

      <div className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
        Pixels Studio Pro is a one-time on-chain mint. Total supply capped at 25,000. If Pixels Studio ever shuts down, your mint proves your projects are yours.
      </div>
    </div>
  );
}
