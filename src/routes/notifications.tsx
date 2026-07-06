import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { notifications, kindMeta, type NotifKind } from "@/lib/mock-notifications";
import { Check, Filter, Bell, Inbox } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [{ title: "Notifications — Pixels Studio" }, { name: "description", content: "Sales, reviews, comments, and moderation updates." }],
  }),
  component: () => (
    <AppShell>
      <NotificationsPage />
    </AppShell>
  ),
});

const filters: { id: "all" | NotifKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sale", label: "Sales" },
  { id: "review", label: "Reviews" },
  { id: "comment", label: "Comments" },
  { id: "follow", label: "Follows" },
  { id: "moderation", label: "Moderation" },
  { id: "system", label: "System" },
];

function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | NotifKind>("all");
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const list = useMemo(
    () => filter === "all" ? notifications : notifications.filter(n => n.kind === filter),
    [filter]
  );

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <SectionHeader
        eyebrow="// Inbox"
        title="Notifications."
        sub="Every ping from the platform, filtered your way."
        right={
          <HudButton variant="secondary" onClick={() => setReadIds(new Set(notifications.map(n => n.id)))}>
            <Check className="w-4 h-4" /> Mark all read
          </HudButton>
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`h-9 px-4 rounded-full border-2 border-ink font-mono text-xs uppercase tracking-widest font-bold transition ${
              filter === f.id ? "bg-primary text-primary-foreground shadow-[2px_2px_0_0_var(--ink)]" : "bg-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 bg-white border-2 border-dashed border-ink/30 rounded-3xl">
          <Inbox className="w-10 h-10 mx-auto text-ink/40" />
          <div className="mt-4 italic font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>All caught up.</div>
          <div className="mt-1 text-sm text-ink/60">No notifications in this filter.</div>
        </div>
      ) : (
        <div className="space-y-2">
          {list.map((n, i) => {
            const meta = kindMeta[n.kind];
            const Icon = meta.icon;
            const unread = n.unread && !readIds.has(n.id);
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={(n.href ?? "/notifications") as never}
                  onClick={() => setReadIds(prev => new Set(prev).add(n.id))}
                  className={`flex items-start gap-4 p-4 bg-white border-2 border-ink rounded-2xl shadow-[3px_3px_0_0_var(--ink)] hover:translate-y-[-1px] transition-transform ${unread ? "!bg-primary/[0.04]" : ""}`}
                >
                  <div className={`w-11 h-11 rounded-xl border-2 border-ink flex items-center justify-center shrink-0 ${meta.tone}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="font-bold">{n.title}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50 shrink-0">{n.when}</div>
                    </div>
                    <div className="mt-1 text-sm text-ink/70 leading-snug">{n.body}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <Chip>{meta.label}</Chip>
                      {n.amount && <Chip tone="amber">{n.amount}</Chip>}
                      {unread && <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">● New</span>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
