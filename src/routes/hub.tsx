import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, Chip, SectionHeader } from "@/components/hud";
import { friends, rooms, roomChat, type Room, type Friend } from "@/lib/mock-social";
import { Mic, MicOff, Volume2, Send, Copy, Check, Users, Radio, Signal, Lock, UserPlus, LogIn, Search } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: "Party Hub — Live rooms · Pixels Studio" },
      { name: "description", content: "Jump into live game rooms, voice chat with your crew, share invite links, and see who's online in the CyberVerse." },
      { property: "og:title", content: "Party Hub — Pixels Studio" },
      { property: "og:description", content: "Voice-chat rooms, live game invites, friend presence — the CyberVerse social layer." },
    ],
  }),
  component: () => <AppShell><HubPage /></AppShell>,
});

const presenceColor: Record<string, string> = {
  "online": "bg-accent", "in-game": "bg-primary", "idle": "bg-[oklch(0.80_0.18_75)]", "offline": "bg-ink/20",
};

function HubPage() {
  const [selected, setSelected] = useState<Room | null>(rooms[0]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "friends" | "voice">("all");

  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      if (query && !(r.name.toLowerCase().includes(query.toLowerCase()) || r.game.toLowerCase().includes(query.toLowerCase()))) return false;
      if (filter === "friends" && r.visibility === "public") return false;
      if (filter === "voice" && !r.voice) return false;
      return true;
    });
  }, [query, filter]);

  return (
    <div className="px-4 md:px-6 py-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="// Party Hub · REALM-7"
        title="Live rooms, live crew."
        sub="Voice-chat rooms, invite links, and everyone in your circle who's online right now."
        right={<HudButton variant="primary"><Radio className="w-4 h-4" /> Host a room</HudButton>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div>
          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/50" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search rooms or games…"
                className="w-full pl-9 pr-3 h-10 rounded-full border-2 border-ink bg-white text-sm shadow-[2px_2px_0_0_var(--ink)] focus:outline-none" />
            </div>
            {(["all", "friends", "voice"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 h-10 rounded-full border-2 text-xs font-mono uppercase tracking-widest ${filter === f ? "bg-ink text-background border-ink" : "bg-white border-ink/30 hover:border-ink"}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Rooms list */}
          <div className="grid gap-3">
            {filtered.map((r) => (
              <button key={r.id} onClick={() => setSelected(r)}
                className={`text-left rounded-2xl border-2 bg-white p-4 flex items-center gap-4 transition ${selected?.id === r.id ? "border-ink shadow-[4px_4px_0_0_var(--ink)]" : "border-ink/20 hover:border-ink shadow-[2px_2px_0_0_var(--ink)]"}`}>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${r.grad} border-2 border-ink flex items-center justify-center text-3xl shrink-0`}>{r.emoji}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-bold truncate">{r.name}</div>
                    {r.visibility === "friends" && <Chip tone="cyan"><Users className="w-3 h-3" /> Friends</Chip>}
                    {r.visibility === "invite" && <Chip tone="amber"><Lock className="w-3 h-3" /> Invite</Chip>}
                    {r.voice && <Chip tone="magenta"><Mic className="w-3 h-3" /> Voice</Chip>}
                  </div>
                  <div className="mt-1 text-xs text-ink/60 font-mono truncate">{r.game} · hosted by @{r.host}</div>
                  <div className="mt-2 flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-ink/50">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {r.players}/{r.capacity}</span>
                    <span>{r.region}</span>
                    <span className="flex items-center gap-1"><Signal className="w-3 h-3" /> {r.ping}ms</span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
                  <div className="w-24 h-2 rounded-full bg-ink/10 overflow-hidden"><div className="h-full bg-primary" style={{ width: `${(r.players / r.capacity) * 100}%` }} /></div>
                  <HudButton variant="primary" size="sm"><LogIn className="w-3 h-3" /> Join</HudButton>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="rounded-2xl border-2 border-dashed border-ink/30 bg-white/60 p-8 text-center">
                <div className="text-2xl mb-2">◇</div>
                <div className="font-bold">No rooms match those filters.</div>
                <p className="text-sm text-ink/60 mt-1">Try widening your search or host your own.</p>
              </div>
            )}
          </div>

          {/* Selected room panel */}
          {selected && <RoomPanel room={selected} />}
        </div>

        {/* Friends sidebar */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <FriendsPanel />
        </aside>
      </div>
    </div>
  );
}

function RoomPanel({ room }: { room: Room }) {
  const [micOn, setMicOn] = useState(true);
  const [copied, setCopied] = useState(false);
  const [chat, setChat] = useState(roomChat);
  const [draft, setDraft] = useState("");
  const invite = `pixels.gg/r/${room.invite}`;

  const send = () => {
    if (!draft.trim()) return;
    setChat((c) => [...c, { id: `c${Date.now()}`, author: "nx", body: draft, ts: "now" }]);
    setDraft("");
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(invite); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* noop */ }
  };

  return (
    <div className="mt-6 rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
      <div className={`bg-gradient-to-br ${room.grad} p-5 border-b-2 border-ink`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/70">// Now in room</div>
            <h3 className="text-2xl font-black italic text-ink truncate" style={{ fontFamily: "var(--font-display)" }}>{room.name}</h3>
            <div className="mt-1 font-mono text-xs text-ink/70">{room.game} · @{room.host}</div>
          </div>
          <HudButton variant="primary"><LogIn className="w-4 h-4" /> Join room</HudButton>
        </div>
      </div>
      <div className="grid md:grid-cols-[1fr_260px]">
        {/* Chat */}
        <div className="flex flex-col min-h-[320px] border-r-2 border-ink/10">
          <div className="flex-1 p-4 space-y-2 max-h-80 overflow-y-auto">
            {chat.map((m) => (
              <div key={m.id} className={`text-sm ${m.kind === "system" ? "font-mono text-[11px] text-ink/50 uppercase tracking-widest" : ""}`}>
                {m.kind === "system" ? m.body : (
                  <div><span className="font-mono text-[11px] text-ink/50 mr-2">{m.ts}</span><span className="font-bold text-primary">@{m.author}</span> <span>{m.body}</span></div>
                )}
              </div>
            ))}
          </div>
          <div className="p-3 border-t-2 border-ink/10 flex items-center gap-2">
            <button onClick={() => setMicOn((v) => !v)}
              className={`w-10 h-10 rounded-full border-2 border-ink flex items-center justify-center shrink-0 ${micOn ? "bg-accent" : "bg-destructive text-destructive-foreground"}`}
              aria-label={micOn ? "Mute" : "Unmute"}>
              {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>
            <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Say something…" className="flex-1 h-10 rounded-full px-4 border-2 border-ink/20 bg-white text-sm focus:border-ink outline-none" />
            <button onClick={send} className="w-10 h-10 rounded-full bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center shadow-[2px_2px_0_0_var(--ink)]"><Send className="w-4 h-4" /></button>
          </div>
        </div>
        {/* In room */}
        <div className="p-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50 mb-2">In room · {room.players}/{room.capacity}</div>
          <div className="space-y-2">
            {friends.slice(0, room.players).map((f) => (
              <div key={f.handle} className="flex items-center gap-2 p-2 rounded-lg bg-muted/40 border border-ink/10">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold">{f.avatar}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate">@{f.handle}</div>
                  {room.voice && <div className="flex items-center gap-0.5"><Volume2 className="w-3 h-3 text-primary" /><div className="flex gap-[2px] items-end h-3"><div className="w-[2px] bg-primary h-1 rounded" /><div className="w-[2px] bg-primary h-2 rounded" /><div className="w-[2px] bg-primary h-3 rounded" /></div></div>}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t-2 border-ink/10">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/50 mb-2">Invite link</div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-ink text-background font-mono text-xs">
              <span className="truncate flex-1">{invite}</span>
              <button onClick={copy} className="w-7 h-7 rounded-md bg-background/20 hover:bg-background/30 flex items-center justify-center shrink-0">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <button className="mt-2 w-full flex items-center justify-center gap-2 px-3 h-9 rounded-full bg-white border-2 border-ink text-xs font-mono uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)]">
              <UserPlus className="w-3.5 h-3.5" /> Invite friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FriendsPanel() {
  const [tab, setTab] = useState<"friends" | "requests">("friends");
  return (
    <div className="rounded-2xl border-2 border-ink bg-white shadow-[4px_4px_0_0_var(--ink)] overflow-hidden">
      <div className="border-b-2 border-ink px-4 py-3 flex items-center gap-2">
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Crew</div>
        <div className="ml-auto flex gap-1">
          {(["friends", "requests"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-3 h-7 rounded-full text-[10px] font-mono uppercase tracking-widest border-2 ${tab === t ? "bg-ink text-background border-ink" : "border-ink/20"}`}>{t}</button>
          ))}
        </div>
      </div>
      {tab === "friends" ? (
        <div className="p-2 max-h-[520px] overflow-y-auto">
          {friends.map((f) => <FriendRow key={f.handle} f={f} />)}
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {[{ h: "vhs", n: "VHS" }, { h: "arch", n: "Arch" }].map((p) => (
            <div key={p.h} className="flex items-center gap-2 p-2 rounded-lg border-2 border-ink/10">
              <div className="w-9 h-9 rounded-full bg-accent border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold">{p.h.slice(0, 2).toUpperCase()}</div>
              <div className="min-w-0 flex-1"><div className="text-xs font-bold">@{p.h}</div><div className="text-[10px] text-ink/60">wants to add you</div></div>
              <button className="px-2 h-7 rounded-full bg-primary text-primary-foreground border-2 border-ink text-[10px] font-mono uppercase">Accept</button>
              <button className="px-2 h-7 rounded-full bg-white border-2 border-ink/30 text-[10px] font-mono uppercase">×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FriendRow({ f }: { f: Friend }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50">
      <div className="relative shrink-0">
        <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center text-[10px] font-mono font-bold">{f.avatar}</div>
        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${presenceColor[f.presence]}`} />
      </div>
      <div className="min-w-0 flex-1">
        <Link to="/u/$handle" params={{ handle: f.handle }} className="text-xs font-bold hover:underline block truncate">@{f.handle}</Link>
        <div className="text-[10px] text-ink/60 truncate">{f.activity}</div>
      </div>
      {f.game && <Link to="/g/$slug" params={{ slug: f.game }} className="text-[10px] font-mono uppercase tracking-widest px-2 h-6 rounded-full bg-primary text-primary-foreground border-2 border-ink shrink-0">Join</Link>}
    </div>
  );
}
