import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { EmptyState } from "@/components/EmptyState";
import { getAsset } from "@/lib/marketplace-data";
import { getGame } from "@/lib/mock-games";
import { assetReviews, gameReviews, type Review } from "@/lib/mock-reviews";
import { assetVersions, type VersionEntry } from "@/lib/mock-versions";
import { ArrowLeft, Users, MessageSquare, History, Plus, X, Check, Star, AlertTriangle, Send, Bell, Zap, ExternalLink, Trash2 } from "lucide-react";

type Kind = "asset" | "game";

export const Route = createFileRoute("/manage/$kind/$id")({
  loader: ({ params }) => {
    const kind = params.kind as Kind;
    if (kind !== "asset" && kind !== "game") throw notFound();
    if (kind === "asset") {
      const a = getAsset(params.id); if (!a) throw notFound();
      return { kind, asset: a, game: null };
    }
    const g = getGame(params.id); if (!g) throw notFound();
    return { kind, asset: null, game: g };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Manage — Pixels Studio" }, { name: "robots", content: "noindex" }] };
    const name = loaderData.kind === "asset" ? loaderData.asset!.name : loaderData.game!.title;
    return { meta: [{ title: `Manage ${name} — Pixels Studio` }, { name: "robots", content: "noindex" }] };
  },
  notFoundComponent: () => (
    <AppShell><div className="max-w-2xl mx-auto p-8"><EmptyState emoji="🔍" title="Nothing to manage here." action={<Link to="/dashboard"><HudButton>Back to dashboard</HudButton></Link>} /></div></AppShell>
  ),
  component: () => <AppShell><ManagePage /></AppShell>,
});

type Tab = "splits" | "reviews" | "versions";

function ManagePage() {
  const { kind, asset, game } = Route.useLoaderData();
  const [tab, setTab] = useState<Tab>("splits");

  const title = kind === "asset" ? asset!.name : game!.title;
  const subtitle = kind === "asset"
    ? `${asset!.type} · ${asset!.artist}`
    : `Game · by @${game!.creatorHandle}`;
  const publicHref = kind === "asset"
    ? <Link to="/marketplace/$assetId" params={{ assetId: asset!.id }}><HudButton variant="ghost"><ExternalLink className="w-3.5 h-3.5" /> View public page</HudButton></Link>
    : <Link to="/g/$slug" params={{ slug: game!.slug }}><HudButton variant="ghost"><ExternalLink className="w-3.5 h-3.5" /> View public page</HudButton></Link>;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-ink/60 hover:text-ink mb-5">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to dashboard
      </Link>

      <SectionHeader
        eyebrow={`// Manage · ${kind}`}
        title={title}
        sub={subtitle}
        right={<div className="flex items-center gap-2">{publicHref}</div>}
      />

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <TabBtn active={tab === "splits"} onClick={() => setTab("splits")} icon={Users} label="Revenue splits" />
        <TabBtn active={tab === "reviews"} onClick={() => setTab("reviews")} icon={MessageSquare} label="Reviews" />
        {kind === "asset" && <TabBtn active={tab === "versions"} onClick={() => setTab("versions")} icon={History} label="Version history" />}
      </div>

      {tab === "splits" && <SplitsTab initial={kind === "game" ? game!.splits ?? null : null} />}
      {tab === "reviews" && <ReviewsTab reviews={kind === "asset" ? (assetReviews[asset!.id] ?? []) : (gameReviews[game!.slug] ?? [])} />}
      {tab === "versions" && kind === "asset" && <VersionsTab assetId={asset!.id} currentVersion={asset!.version ?? "v1.0"} />}
    </div>
  );
}

// ---------- SPLITS ----------
type Split = { handle: string; role: string; percent: number };

function SplitsTab({ initial }: { initial: Split[] | null }) {
  const [splits, setSplits] = useState<Split[]>(
    initial ?? [{ handle: "nx", role: "Creator", percent: 100 }]
  );
  const [autoDistribute, setAutoDistribute] = useState(true);
  const total = splits.reduce((s, x) => s + x.percent, 0);
  const platform = 20;
  const creators = 100 - platform;
  const invalid = total !== 100;

  const setPercent = (i: number, v: number) => setSplits((s) => s.map((x, k) => k === i ? { ...x, percent: Math.max(0, Math.min(100, v)) } : x));
  const setField = (i: number, key: keyof Split, v: string) => setSplits((s) => s.map((x, k) => k === i ? { ...x, [key]: v } : x));
  const add = () => setSplits((s) => [...s, { handle: "", role: "", percent: 0 }]);
  const remove = (i: number) => setSplits((s) => s.filter((_, k) => k !== i));

  const distribute = () => {
    const n = splits.length; if (n === 0) return;
    const base = Math.floor(100 / n); const rem = 100 - base * n;
    setSplits(splits.map((x, i) => ({ ...x, percent: base + (i < rem ? 1 : 0) })));
  };

  // Preview earnings on 10,000 PX gross sale
  const gross = 10000;
  const creatorPool = (gross * creators) / 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <HudCard>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="font-black italic text-lg" style={{ fontFamily: "var(--font-display)" }}>Collaborators</h3>
            <p className="text-xs text-ink/60">Split the {creators}% creator pool. Platform keeps {platform}%.</p>
          </div>
          <div className="flex items-center gap-2">
            <HudButton size="sm" variant="ghost" onClick={distribute}>Even split</HudButton>
            <HudButton size="sm" variant="secondary" onClick={add}><Plus className="w-3.5 h-3.5" /> Add</HudButton>
          </div>
        </div>

        {/* Stacked bar */}
        <div className="mb-4">
          <div className="h-4 rounded-full border-2 border-ink bg-white overflow-hidden flex">
            {splits.map((s, i) => (
              <div key={i} className="h-full border-r-2 border-ink last:border-r-0 transition-all" style={{ width: `${s.percent}%`, background: SPLIT_COLORS[i % SPLIT_COLORS.length] }} title={`@${s.handle} · ${s.percent}%`} />
            ))}
            {total < 100 && <div className="h-full bg-muted" style={{ width: `${100 - total}%` }} />}
          </div>
          <div className={`mt-2 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1 ${invalid ? "text-destructive" : "text-[oklch(0.45_0.20_140)]"}`}>
            {invalid ? <><AlertTriangle className="w-3 h-3" /> Must total 100% — currently {total}%</> : <><Check className="w-3 h-3" /> Totals 100%</>}
          </div>
        </div>

        <div className="space-y-2">
          {splits.map((s, i) => (
            <div key={i} className="grid grid-cols-[16px_minmax(0,1.2fr)_minmax(0,1.5fr)_80px_36px] items-center gap-2 p-2 rounded-xl border-2 border-ink bg-white">
              <span className="w-3 h-3 rounded-sm border-2 border-ink" style={{ background: SPLIT_COLORS[i % SPLIT_COLORS.length] }} />
              <div className="flex items-center gap-1 min-w-0">
                <span className="text-ink/40 font-mono text-xs">@</span>
                <input value={s.handle} onChange={(e) => setField(i, "handle", e.target.value)} placeholder="handle" className="bg-transparent outline-none flex-1 min-w-0 text-sm font-mono" />
              </div>
              <input value={s.role} onChange={(e) => setField(i, "role", e.target.value)} placeholder="Role (e.g. Music, Art)" className="bg-transparent outline-none min-w-0 text-sm" />
              <div className="flex items-center gap-1 justify-end">
                <input type="number" value={s.percent} onChange={(e) => setPercent(i, Number(e.target.value))} className="w-14 text-right bg-transparent outline-none text-sm font-mono font-bold" />
                <span className="text-xs text-ink/50 font-mono">%</span>
              </div>
              <button onClick={() => remove(i)} className="w-8 h-8 rounded-full border-2 border-ink/20 hover:border-destructive hover:text-destructive flex items-center justify-center"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3 rounded-2xl border-2 border-ink bg-muted/40 flex items-start gap-3">
          <input id="auto" type="checkbox" checked={autoDistribute} onChange={(e) => setAutoDistribute(e.target.checked)} className="mt-0.5 w-4 h-4 accent-primary" />
          <label htmlFor="auto" className="text-sm">
            <span className="font-bold flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> Auto-distribute on every sale</span>
            <span className="block text-xs text-ink/60 mt-0.5">Each sale is split at checkout and paid into every collaborator's wallet within one billing cycle. No manual payouts.</span>
          </label>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <HudButton variant="primary" disabled={invalid}><Send className="w-3.5 h-3.5" /> Save & notify collaborators</HudButton>
          <HudButton variant="ghost">Discard</HudButton>
        </div>
      </HudCard>

      <aside className="space-y-4">
        <HudCard>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-3">// Payout preview</div>
          <div className="text-xs font-mono text-ink/60 mb-1">On a 10,000 PX sale</div>
          <div className="text-2xl font-black italic mb-4" style={{ fontFamily: "var(--font-display)" }}>{creatorPool.toLocaleString()} PX <span className="text-xs font-mono text-ink/60">to creators</span></div>
          <ul className="space-y-2 text-sm">
            {splits.map((s, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="flex items-center gap-2 min-w-0"><span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: SPLIT_COLORS[i % SPLIT_COLORS.length] }} /><span className="truncate font-mono">@{s.handle || "—"}</span></span>
                <span className="font-mono font-bold">{Math.round((creatorPool * s.percent) / 100).toLocaleString()} PX</span>
              </li>
            ))}
            <li className="flex items-center justify-between pt-2 border-t border-ink/10 text-ink/50">
              <span className="font-mono text-xs">Platform</span>
              <span className="font-mono">{((gross * platform) / 100).toLocaleString()} PX</span>
            </li>
          </ul>
        </HudCard>
        <HudCard>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">// How it works</div>
          <ul className="space-y-2 text-xs text-ink/70">
            <li className="flex gap-2"><Check className="w-3.5 h-3.5 mt-0.5 text-[oklch(0.55_0.20_140)] shrink-0" strokeWidth={3} />Collaborators must accept the invite before splits go live.</li>
            <li className="flex gap-2"><Check className="w-3.5 h-3.5 mt-0.5 text-[oklch(0.55_0.20_140)] shrink-0" strokeWidth={3} />Splits can be edited only with unanimous consent after launch.</li>
            <li className="flex gap-2"><Check className="w-3.5 h-3.5 mt-0.5 text-[oklch(0.55_0.20_140)] shrink-0" strokeWidth={3} />Refunds automatically claw back proportional amounts.</li>
          </ul>
        </HudCard>
      </aside>
    </div>
  );
}
const SPLIT_COLORS = ["oklch(0.72 0.18 340)", "oklch(0.72 0.18 220)", "oklch(0.85 0.22 128)", "oklch(0.75 0.20 50)", "oklch(0.72 0.18 290)"];

// ---------- REVIEWS ----------
function ReviewsTab({ reviews }: { reviews: Review[] }) {
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});

  const dist = useMemo(() => {
    const d = [0, 0, 0, 0, 0]; reviews.forEach((r) => { d[r.rating - 1]++; });
    return d;
  }, [reviews]);
  const total = reviews.length || 1;
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(2) : "—";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
      <div className="space-y-3">
        {reviews.length === 0 && <EmptyState emoji="✍" title="No reviews yet." sub="Once your first sale lands, buyers can rate and review here." />}
        {reviews.map((r) => (
          <HudCard key={r.id}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-accent border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold shrink-0">{r.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm">@{r.author}</span>
                  {r.verified && <Chip tone="green"><Check className="w-3 h-3" /> Verified owner</Chip>}
                  <div className="flex items-center gap-0.5 text-[oklch(0.55_0.22_45)]">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5" fill={i < r.rating ? "currentColor" : "none"} />)}
                  </div>
                  <span className="text-[10px] font-mono text-ink/50 ml-auto">{r.ts}</span>
                </div>
                <p className="mt-2 text-sm text-ink/80">{r.body}</p>

                {r.response ? (
                  <div className="mt-3 ml-2 pl-3 border-l-2 border-primary bg-primary/5 rounded-r-lg p-3">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">Your reply · {r.response.ts}</div>
                    <p className="mt-1 text-sm">{r.response.body}</p>
                    <div className="mt-2 flex gap-2">
                      <button className="text-[10px] font-mono uppercase tracking-widest text-ink/60 hover:text-ink">Edit</button>
                      <button className="text-[10px] font-mono uppercase tracking-widest text-ink/60 hover:text-destructive">Delete</button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 rounded-xl border-2 border-ink bg-white p-2">
                    <textarea
                      value={drafts[r.id] ?? ""}
                      onChange={(e) => setDrafts((d) => ({ ...d, [r.id]: e.target.value }))}
                      placeholder="Write a creator response…"
                      className="w-full min-h-[64px] bg-transparent outline-none text-sm resize-none"
                    />
                    <div className="flex items-center justify-between pt-2 border-t border-ink/10">
                      <div className="text-[10px] font-mono text-ink/50">Posted publicly as the creator. Keep it kind.</div>
                      <div className="flex items-center gap-2">
                        <HudButton size="sm" variant="ghost" onClick={() => setFlagged((f) => ({ ...f, [r.id]: !f[r.id] }))}>{flagged[r.id] ? "Flagged" : "Flag"}</HudButton>
                        <HudButton size="sm" variant="primary" disabled={!(drafts[r.id] ?? "").trim()}><Send className="w-3 h-3" /> Reply</HudButton>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </HudCard>
        ))}
      </div>

      <aside className="space-y-4">
        <HudCard>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">// Rating breakdown</div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-4xl font-black italic text-primary" style={{ fontFamily: "var(--font-display)" }}>{avg}</span>
            <span className="text-xs font-mono text-ink/60">{reviews.length} review{reviews.length === 1 ? "" : "s"}</span>
          </div>
          <div className="space-y-1.5">
            {[5, 4, 3, 2, 1].map((n) => {
              const c = dist[n - 1]; const pct = Math.round((c / total) * 100);
              return (
                <div key={n} className="flex items-center gap-2 text-xs font-mono">
                  <span className="w-3 text-ink/60">{n}★</span>
                  <div className="flex-1 h-2 rounded-full bg-ink/10 overflow-hidden"><div className="h-full bg-[oklch(0.55_0.22_45)]" style={{ width: `${pct}%` }} /></div>
                  <span className="w-6 text-right text-ink/60">{c}</span>
                </div>
              );
            })}
          </div>
        </HudCard>
        <HudCard>
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">// Guidelines</div>
          <p className="text-xs text-ink/70">You may reply once per review. Personal attacks or discount offers will be removed by moderation.</p>
        </HudCard>
      </aside>
    </div>
  );
}

// ---------- VERSIONS ----------
function VersionsTab({ assetId, currentVersion }: { assetId: string; currentVersion: string }) {
  const existing = assetVersions[assetId] ?? [];
  const [showForm, setShowForm] = useState(false);
  const [kind, setKind] = useState<VersionEntry["kind"]>("patch");
  const [version, setVersion] = useState(bumpVersion(currentVersion, "patch"));
  const [notes, setNotes] = useState<string[]>([""]);
  const [notify, setNotify] = useState(true);
  const [breaking, setBreaking] = useState(false);

  const changeKind = (k: VersionEntry["kind"]) => { setKind(k); setVersion(bumpVersion(currentVersion, k)); };
  const setNote = (i: number, v: string) => setNotes((n) => n.map((x, k) => k === i ? v : x));
  const addNote = () => setNotes((n) => [...n, ""]);
  const removeNote = (i: number) => setNotes((n) => n.filter((_, k) => k !== i));

  const licenseeCount = 214;

  return (
    <div className="space-y-6">
      {!showForm ? (
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-black italic text-lg" style={{ fontFamily: "var(--font-display)" }}>Timeline</h3>
            <p className="text-xs text-ink/60">Every published version stays available to licensees who bought before the change.</p>
          </div>
          <HudButton variant="primary" onClick={() => setShowForm(true)}><Plus className="w-3.5 h-3.5" /> Publish new version</HudButton>
        </div>
      ) : (
        <HudCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black italic text-lg" style={{ fontFamily: "var(--font-display)" }}>New version</h3>
            <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center"><X className="w-4 h-4" /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-4 mb-4">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Version tag</label>
              <input value={version} onChange={(e) => setVersion(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-xl border-2 border-ink bg-white font-mono" />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Bump type</label>
              <div className="mt-1 flex gap-1">
                {(["patch", "minor", "major"] as const).map((k) => (
                  <button key={k} onClick={() => changeKind(k)} className={`flex-1 h-10 rounded-xl border-2 border-ink text-[10px] font-mono uppercase tracking-widest ${kind === k ? "bg-primary text-primary-foreground shadow-[2px_2px_0_0_var(--ink)]" : "bg-white hover:bg-muted"}`}>{k}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Changelog</label>
            <div className="mt-1 space-y-2">
              {notes.map((n, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-primary font-mono pt-2.5">›</span>
                  <input value={n} onChange={(e) => setNote(i, e.target.value)} placeholder="What changed?" className="flex-1 h-10 px-3 rounded-xl border-2 border-ink bg-white text-sm" />
                  <button onClick={() => removeNote(i)} className="w-10 h-10 rounded-full border-2 border-ink/20 hover:border-destructive hover:text-destructive flex items-center justify-center shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
            <HudButton size="sm" variant="ghost" className="mt-2" onClick={addNote}><Plus className="w-3 h-3" /> Add line</HudButton>
          </div>

          <div className="p-3 rounded-2xl border-2 border-ink bg-muted/40 space-y-3">
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="mt-0.5 w-4 h-4 accent-primary" />
              <span>
                <span className="font-bold flex items-center gap-1"><Bell className="w-3.5 h-3.5" /> Notify {licenseeCount.toLocaleString()} licensees</span>
                <span className="block text-xs text-ink/60 mt-0.5">Email + in-app notification with the changelog. Sent immediately on publish.</span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" checked={breaking} onChange={(e) => setBreaking(e.target.checked)} className="mt-0.5 w-4 h-4 accent-destructive" />
              <span>
                <span className="font-bold flex items-center gap-1 text-destructive"><AlertTriangle className="w-3.5 h-3.5" /> Breaking change</span>
                <span className="block text-xs text-ink/60 mt-0.5">Adds a warning banner on the listing and holds auto-updates on licensee projects.</span>
              </span>
            </label>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <HudButton variant="primary" disabled={!version || notes.every((n) => !n.trim())}><Send className="w-3.5 h-3.5" /> Publish {version}</HudButton>
            <HudButton variant="ghost" onClick={() => setShowForm(false)}>Cancel</HudButton>
          </div>
        </HudCard>
      )}

      <HudCard>
        <div className="space-y-4">
          {existing.map((v, i) => (
            <div key={v.version} className={`border-l-2 pl-4 py-1 ${i === 0 ? "border-primary" : "border-ink/20"}`}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold">{v.version}</span>
                <Chip tone={v.kind === "major" ? "magenta" : v.kind === "minor" ? "cyan" : "default"}>{v.kind}</Chip>
                {i === 0 && <Chip tone="green">Current</Chip>}
                <span className="text-[10px] font-mono text-ink/50">{v.date}</span>
                <span className="text-[10px] font-mono text-ink/50 ml-auto">{v.downloads} downloads</span>
              </div>
              <ul className="mt-1.5 text-sm text-ink/80 space-y-1">
                {v.notes.map((n, k) => <li key={k} className="flex gap-2"><span className="text-primary">›</span>{n}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </HudCard>
    </div>
  );
}

function bumpVersion(v: string, kind: "patch" | "minor" | "major"): string {
  const m = v.match(/v?(\d+)\.(\d+)(?:\.(\d+))?/);
  if (!m) return v;
  let [ , maj, min, pat ] = m; const M = Number(maj), N = Number(min), P = Number(pat ?? "0");
  if (kind === "major") return `v${M + 1}.0.0`;
  if (kind === "minor") return `v${M}.${N + 1}.0`;
  return `v${M}.${N}.${P + 1}`;
}

function TabBtn({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof Users; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`h-10 px-4 rounded-full border-2 border-ink flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition ${
        active ? "bg-primary text-primary-foreground shadow-[3px_3px_0_0_var(--ink)]" : "bg-white text-ink hover:bg-muted"
      }`}
    >
      <Icon className="w-3.5 h-3.5" /> {label}
    </button>
  );
}
