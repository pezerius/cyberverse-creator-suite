import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SectionHeader, Chip, HudButton } from "@/components/hud";
import { reports, disputes, type Report } from "@/lib/mock-moderation";
import { AlertTriangle, Check, X, MessageCircle, Package, Gamepad2, Users, Star, Shield } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/studio/moderation")({
  head: () => ({ meta: [{ title: "Moderation Queue — Pixels Studio" }, { name: "robots", content: "noindex" }] }),
  component: () => <AppShell><Page /></AppShell>,
});

function Page() {
  const [tab, setTab] = useState<"reports" | "disputes">("reports");
  const [status, setStatus] = useState<"all" | Report["status"]>("all");
  const filtered = useMemo(() => status === "all" ? reports : reports.filter(r => r.status === status), [status]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <SectionHeader eyebrow="// Moderation · staff console" title="Report & dispute queue." sub="Every report you resolve keeps Realm-7 clean. Aim for &lt;24h response time."
        right={<Chip tone="red"><Shield className="w-3 h-3" /> Restricted</Chip>} />

      <div className="flex gap-2 mb-4">
        {(["reports", "disputes"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 h-10 rounded-full border-2 text-xs font-mono uppercase tracking-widest ${tab === t ? "bg-ink text-background border-ink" : "bg-white border-ink/30 hover:border-ink"}`}>
            {t} {t === "reports" ? `(${reports.filter(r => r.status === "open").length} open)` : `(${disputes.filter(d => d.status === "open" || d.status === "creator-response").length} active)`}
          </button>
        ))}
      </div>

      {tab === "reports" ? (
        <>
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
            {(["all", "open", "reviewing", "action-taken", "dismissed"] as const).map((s) => (
              <button key={s} onClick={() => setStatus(s)}
                className={`shrink-0 px-3 h-8 rounded-full border-2 text-[10px] font-mono uppercase tracking-widest ${status === s ? "bg-primary text-primary-foreground border-ink" : "bg-white border-ink/30"}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
            <div className="hidden md:grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 border-b-2 border-ink text-[10px] font-mono uppercase tracking-widest text-ink/60">
              <div>Type</div><div>Target</div><div>Reason</div><div>Status</div><div>Actions</div>
            </div>
            <div className="divide-y-2 divide-ink/10">
              {filtered.map((r) => <ReportRow key={r.id} r={r} />)}
              {filtered.length === 0 && <div className="p-8 text-center text-sm text-ink/60">Nothing here. Nice.</div>}
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {disputes.map((d) => (
            <div key={d.id} className="rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_0_var(--ink)] p-5">
              <div className="flex items-start gap-3 flex-wrap">
                <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-bold">Refund request · {d.assetLabel}</div>
                  <div className="text-xs font-mono text-ink/60">from @{d.buyer} · {d.amount} · {d.ts}</div>
                  <div className="mt-1 text-sm">"{d.reason}"</div>
                </div>
                <Chip tone={d.status === "resolved-refund" ? "green" : d.status === "resolved-denied" ? "red" : d.status === "creator-response" ? "cyan" : "amber"}>{d.status}</Chip>
              </div>
              <div className="mt-4 pl-8 space-y-2 border-l-2 border-ink/10">
                {d.timeline.map((t, i) => (
                  <div key={i} className="text-xs">
                    <span className="font-mono text-ink/50 mr-2">{t.ts}</span>
                    <span className="font-bold">@{t.who}:</span> <span className="text-ink/80">{t.body}</span>
                  </div>
                ))}
              </div>
              {(d.status === "open" || d.status === "creator-response") && (
                <div className="mt-4 flex items-center gap-2 justify-end">
                  <button className="px-3 h-9 rounded-full bg-white border-2 border-ink/30 text-xs font-mono uppercase tracking-widest">Deny</button>
                  <HudButton variant="primary" size="sm"><Check className="w-3 h-3" /> Approve refund</HudButton>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const iconFor = (t: Report["targetType"]) => t === "asset" ? Package : t === "game" ? Gamepad2 : t === "user" ? Users : Star;

function ReportRow({ r }: { r: Report }) {
  const Icon = iconFor(r.targetType);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto_auto] gap-3 md:gap-4 px-4 py-4 hover:bg-muted/40 items-start md:items-center">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-destructive/10 border-2 border-destructive/30 flex items-center justify-center"><Icon className="w-4 h-4" /></div>
        <div className="md:hidden text-[10px] font-mono uppercase tracking-widest text-ink/60">{r.targetType}</div>
      </div>
      <div className="min-w-0">
        <div className="font-bold text-sm truncate">{r.targetLabel}</div>
        <div className="text-xs text-ink/60 truncate">"{r.notes}"</div>
        <div className="text-[10px] font-mono text-ink/50 mt-1">by @{r.reporter} · {r.ts} {r.assignedTo && `· @${r.assignedTo}`}</div>
      </div>
      <div><Chip tone="red">{r.reason}</Chip></div>
      <div><Chip tone={r.status === "open" ? "red" : r.status === "reviewing" ? "amber" : r.status === "action-taken" ? "green" : "default"}>{r.status}</Chip></div>
      <div className="flex items-center gap-1.5">
        <button title="Reply" className="w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center"><MessageCircle className="w-3.5 h-3.5" /></button>
        <button title="Take action" className="w-8 h-8 rounded-full bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center"><Check className="w-3.5 h-3.5" /></button>
        <button title="Dismiss" className="w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center"><X className="w-3.5 h-3.5" /></button>
      </div>
    </div>
  );
}
