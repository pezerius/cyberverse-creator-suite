import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudCard, Chip, SectionHeader } from "@/components/hud";
import { changelog } from "@/lib/mock-changelog";
import { Sparkles, Wrench, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [{ title: "What's new — Pixels Studio" }, { name: "description", content: "Release notes and platform updates for Pixels Studio." }],
  }),
  component: () => (
    <AppShell>
      <ChangelogPage />
    </AppShell>
  ),
});

const kindMeta = {
  new: { label: "New", icon: Sparkles, tone: "bg-accent" },
  fix: { label: "Fix", icon: Wrench, tone: "bg-[oklch(0.85_0.10_220)]" },
  improve: { label: "Improve", icon: TrendingUp, tone: "bg-[oklch(0.80_0.18_50)]" },
} as const;

function ChangelogPage() {
  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      <SectionHeader eyebrow="// Release notes" title="What's new." sub="Every ship, hotfix, and quiet improvement." />

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-ink/20" />
        <div className="space-y-8">
          {changelog.map((c, i) => (
            <motion.div
              key={c.version}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative pl-16"
            >
              <div className="absolute left-3 top-2 w-6 h-6 rounded-full bg-primary border-2 border-ink shadow-[2px_2px_0_0_var(--ink)]" />
              <HudCard>
                <div className="flex items-center gap-2 mb-2">
                  <div className="italic font-black text-3xl" style={{ fontFamily: "var(--font-display)" }}>{c.version}</div>
                  <Chip tone={c.tag === "hotfix" ? "red" : c.tag === "beta" ? "violet" : "green"}>{c.tag}</Chip>
                  <div className="ml-auto text-[10px] font-mono uppercase tracking-widest text-ink/50">{c.date}</div>
                </div>
                <div className="text-lg font-bold mb-3">{c.headline}</div>
                <ul className="space-y-2">
                  {c.bullets.map((b, j) => {
                    const meta = kindMeta[b.kind];
                    const Icon = meta.icon;
                    return (
                      <li key={j} className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-lg border-2 border-ink flex items-center justify-center shrink-0 ${meta.tone}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 pt-0.5">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-ink/50 mr-2">{meta.label}</span>
                          <span className="text-sm">{b.text}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </HudCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
