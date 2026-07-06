import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { User, Shield, Bell, Volume2, Palette, Wallet, KeyRound, Trash2, Check, ExternalLink } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [{ title: "Settings — Pixels Studio" }, { name: "description", content: "Profile, security, notifications, and account preferences." }],
  }),
  component: () => (
    <AppShell>
      <SettingsPage />
    </AppShell>
  ),
});

type Tab = "profile" | "security" | "notifs" | "wallet" | "sound" | "appearance" | "api";

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifs", label: "Notifications", icon: Bell },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "sound", label: "Sound & haptics", icon: Volume2 },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "api", label: "API keys (Pro)", icon: KeyRound },
];

function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <SectionHeader eyebrow="// Account" title="Settings." />

      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        <nav className="space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 h-11 px-4 rounded-2xl border-2 text-left transition font-mono text-xs uppercase tracking-widest font-bold ${
                  active ? "bg-primary text-primary-foreground border-ink shadow-[2px_2px_0_0_var(--ink)]" : "bg-white border-ink/20 hover:border-ink"
                }`}
              >
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </nav>

        <div className="space-y-4">
          {tab === "profile" && <ProfilePanel />}
          {tab === "security" && <SecurityPanel />}
          {tab === "notifs" && <NotifPanel />}
          {tab === "wallet" && <WalletPanel />}
          {tab === "sound" && <SoundPanel />}
          {tab === "appearance" && <AppearancePanel />}
          {tab === "api" && <ApiPanel />}
        </div>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <HudCard>
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-4">// {title}</div>
      <div className="space-y-4">{children}</div>
    </HudCard>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-xs font-mono uppercase tracking-widest font-bold">{label}</label>
        {hint && <div className="text-[10px] font-mono text-ink/50">{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full h-11 px-4 rounded-full bg-white border-2 border-ink font-mono text-sm outline-none focus:shadow-[2px_2px_0_0_var(--ink)] ${props.className ?? ""}`} />;
}

function Toggle({ on, onChange, label, sub }: { on: boolean; onChange: (v: boolean) => void; label: string; sub?: string }) {
  return (
    <label className="flex items-center gap-4 p-3 rounded-2xl border-2 border-ink/20 hover:border-ink cursor-pointer">
      <div className="flex-1">
        <div className="font-bold text-sm">{label}</div>
        {sub && <div className="text-xs text-ink/60">{sub}</div>}
      </div>
      <button
        onClick={() => onChange(!on)}
        role="switch"
        aria-checked={on}
        className={`relative w-12 h-7 rounded-full border-2 border-ink transition ${on ? "bg-primary" : "bg-white"}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white border-2 border-ink transition ${on ? "left-[24px]" : "left-0.5"}`} />
      </button>
    </label>
  );
}

function ProfilePanel() {
  return (
    <>
      <Panel title="Display">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center font-black text-2xl">NX</div>
          <div className="flex-1">
            <HudButton variant="secondary">Upload avatar</HudButton>
            <div className="text-[10px] font-mono text-ink/50 mt-2">PNG or JPG · 400×400 min</div>
          </div>
        </div>
        <Field label="Handle" hint="This is your public identity"><TextInput defaultValue="@neonx" /></Field>
        <Field label="Display name"><TextInput defaultValue="NeonX Creations" /></Field>
        <Field label="Bio" hint="140 chars">
          <textarea rows={3} defaultValue="Indie dev · shipping neon fever dreams · maker of Neon Rush" className="w-full p-4 rounded-2xl bg-white border-2 border-ink font-mono text-sm outline-none" />
        </Field>
      </Panel>
      <Panel title="Danger zone">
        <button className="flex items-center gap-3 p-4 rounded-2xl border-2 border-destructive/40 hover:border-destructive w-full text-left">
          <Trash2 className="w-5 h-5 text-destructive" />
          <div className="flex-1">
            <div className="font-bold">Delete account</div>
            <div className="text-xs text-ink/60">Permanent. Your unpublished games and drafts will be erased.</div>
          </div>
        </button>
      </Panel>
    </>
  );
}

function SecurityPanel() {
  const [twofa, setTwofa] = useState(true);
  const [sessions] = useState([
    { device: "Chrome · macOS", where: "Prague, CZ", when: "Active now", current: true },
    { device: "Safari · iPhone", where: "Prague, CZ", when: "2h ago" },
    { device: "Firefox · Windows", where: "Berlin, DE", when: "3 days ago" },
  ]);
  return (
    <>
      <Panel title="Password & 2FA">
        <Field label="Change password"><TextInput type="password" defaultValue="••••••••••" /></Field>
        <Toggle on={twofa} onChange={setTwofa} label="Two-factor authentication" sub="Authenticator app · required for withdrawals over 10k PX" />
      </Panel>
      <Panel title="Active sessions">
        <div className="space-y-2">
          {sessions.map((s) => (
            <div key={s.device} className="flex items-center gap-3 p-3 rounded-2xl border-2 border-ink/20">
              <div className="flex-1">
                <div className="font-bold text-sm flex items-center gap-2">{s.device} {s.current && <Chip tone="green">This device</Chip>}</div>
                <div className="text-xs font-mono text-ink/60">{s.where} · {s.when}</div>
              </div>
              {!s.current && <button className="text-xs font-mono uppercase tracking-widest font-bold text-destructive hover:underline">Revoke</button>}
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Connected wallets">
        <div className="flex items-center gap-3 p-3 rounded-2xl border-2 border-ink/20">
          <div className="w-10 h-10 rounded-xl bg-accent border-2 border-ink flex items-center justify-center"><Wallet className="w-4 h-4" /></div>
          <div className="flex-1">
            <div className="font-bold text-sm">Coinbase Wallet</div>
            <div className="text-xs font-mono text-ink/60">0x82…3a1e</div>
          </div>
          <Chip tone="magenta">Default payout</Chip>
        </div>
        <HudButton variant="secondary">+ Connect another wallet</HudButton>
      </Panel>
    </>
  );
}

function NotifPanel() {
  const [state, setState] = useState({ sales: true, reviews: true, comments: true, follows: false, marketing: false, weekly: true });
  return (
    <Panel title="What pings you">
      <Toggle on={state.sales} onChange={(v) => setState({ ...state, sales: v })} label="Sales" sub="Every asset license and royalty payout" />
      <Toggle on={state.reviews} onChange={(v) => setState({ ...state, reviews: v })} label="Reviews" sub="Any new review on your listings" />
      <Toggle on={state.comments} onChange={(v) => setState({ ...state, comments: v })} label="Game comments" sub="Players commenting on your published games" />
      <Toggle on={state.follows} onChange={(v) => setState({ ...state, follows: v })} label="Follows" sub="New followers on your creator profile" />
      <Toggle on={state.weekly} onChange={(v) => setState({ ...state, weekly: v })} label="Weekly digest" sub="Sunday: your week in stats" />
      <Toggle on={state.marketing} onChange={(v) => setState({ ...state, marketing: v })} label="Marketing updates" sub="Product news, events, occasional freebies" />
    </Panel>
  );
}

function WalletPanel() {
  return (
    <Panel title="Payout preferences">
      <Field label="Payout schedule" hint="When escrow-released funds auto-transfer">
        <select className="w-full h-11 px-4 rounded-full bg-white border-2 border-ink font-mono text-sm outline-none">
          <option>Weekly · Sundays</option>
          <option>Monthly · 1st</option>
          <option>Manual only</option>
        </select>
      </Field>
      <Field label="Minimum payout threshold">
        <TextInput defaultValue="5000" /> 
      </Field>
      <div className="text-xs text-ink/60 flex items-start gap-2 p-3 rounded-2xl bg-muted/40">
        <Shield className="w-4 h-4 shrink-0 mt-0.5" />
        <span>Withdrawals above 10k PX require 2FA confirmation. Set that up under Security.</span>
      </div>
    </Panel>
  );
}

function SoundPanel() {
  const [ui, setUi] = useState(true);
  const [music, setMusic] = useState(false);
  return (
    <Panel title="Sound design">
      <Toggle on={ui} onChange={setUi} label="Arcade UI blips" sub="Chiptune clicks and confirms across the app" />
      <Toggle on={music} onChange={setMusic} label="Ambient soundtrack" sub="Lo-fi loop on landing / hub pages" />
      <Field label="Master volume" hint="60%">
        <input type="range" defaultValue={60} className="w-full accent-primary h-2" />
      </Field>
    </Panel>
  );
}

function AppearancePanel() {
  const [theme, setTheme] = useState<"light" | "night" | "auto">("light");
  return (
    <Panel title="Appearance">
      <Field label="Theme">
        <div className="grid grid-cols-3 gap-2">
          {(["light", "night", "auto"] as const).map((t) => (
            <button key={t} onClick={() => setTheme(t)} className={`p-4 rounded-2xl border-2 border-ink text-left ${theme === t ? "bg-accent shadow-[2px_2px_0_0_var(--ink)]" : "bg-white"}`}>
              <div className="font-bold capitalize">{t}</div>
              <div className="text-xs text-ink/60 mt-1">{t === "light" ? "Lavender bright" : t === "night" ? "Deep neon-noir" : "Follow OS"}</div>
            </button>
          ))}
        </div>
      </Field>
      <Field label="Density">
        <div className="grid grid-cols-2 gap-2">
          {["Comfortable", "Compact"].map((d) => (
            <button key={d} className="p-3 rounded-2xl border-2 border-ink bg-white">{d}</button>
          ))}
        </div>
      </Field>
    </Panel>
  );
}

function ApiPanel() {
  const [keys] = useState([
    { name: "Personal editor · read", key: "pxs_live_r0_84…21ab", when: "Created Aug 12" },
    { name: "CI pipeline · publish", key: "pxs_live_p0_39…7fed", when: "Created Sep 04" },
  ]);
  return (
    <>
      <Panel title="API keys">
        <div className="p-4 rounded-2xl bg-accent border-2 border-ink flex items-center gap-3">
          <Check className="w-5 h-5" strokeWidth={3} />
          <div className="flex-1 text-sm"><span className="font-bold">Pro perk:</span> Programmatic asset uploads and publishing.</div>
        </div>
        <div className="space-y-2">
          {keys.map((k) => (
            <div key={k.name} className="flex items-center gap-3 p-3 rounded-2xl border-2 border-ink/20">
              <div className="flex-1">
                <div className="font-bold text-sm">{k.name}</div>
                <div className="text-xs font-mono text-ink/60">{k.key} · {k.when}</div>
              </div>
              <button className="text-xs font-mono uppercase tracking-widest font-bold hover:underline">Rotate</button>
              <button className="text-xs font-mono uppercase tracking-widest font-bold text-destructive hover:underline">Revoke</button>
            </div>
          ))}
        </div>
        <HudButton variant="primary">+ Generate new key</HudButton>
      </Panel>
      <Panel title="Docs">
        <a className="flex items-center gap-3 p-4 rounded-2xl border-2 border-ink/20 hover:border-ink" href="#">
          <div className="flex-1">
            <div className="font-bold">Read the API reference</div>
            <div className="text-xs text-ink/60">REST + WebSocket · versioned</div>
          </div>
          <ExternalLink className="w-4 h-4" />
        </a>
      </Panel>
    </>
  );
}
