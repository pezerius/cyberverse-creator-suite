import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader } from "@/components/hud";
import { Check, Minus, Sparkles, Zap, Coins, Info, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/pro")({
  head: () => ({
    meta: [
      { title: "Upgrade — Pixels Studio" },
      { name: "description", content: "Credit-based plans for creators. Monthly credits refill your build, AI, and publish quotas — no per-action pricing." },
      { property: "og:title", content: "Upgrade — Pixels Studio" },
      { property: "og:description", content: "Simple credit-based plans. Pay for what you build." },
    ],
  }),
  component: () => (
    <AppShell><ProPage /></AppShell>
  ),
});

// ---- plans ------------------------------------------------------------------
type PlanId = "free" | "pro" | "studio" | "enterprise";
type Plan = {
  id: PlanId; name: string; tagline: string;
  monthly: number; yearly: number; // PX per month (yearly = discounted monthly)
  credits: number | "custom";
  daily: number;
  highlights: string[];
  tone: "default" | "magenta" | "cyan" | "amber";
  badge?: string;
};

const plans: Plan[] = [
  {
    id: "free", name: "Free", tagline: "Kick the tires. Ship a first prototype.",
    monthly: 0, yearly: 0, credits: 150, daily: 5, tone: "default",
    highlights: [
      "150 credits / month (5 daily, capped at 30/mo)",
      "3 active projects",
      "60 / 40 revenue split",
      "Preset assets only",
      "Community support",
    ],
  },
  {
    id: "pro", name: "Pro", tagline: "For serious solo creators shipping regularly.",
    monthly: 2000, yearly: 1600, credits: 2000, daily: 15, tone: "magenta", badge: "Most popular",
    highlights: [
      "2,000 credits / month",
      "50 active projects",
      "80 / 20 revenue split",
      "Custom sprite / SFX / tileset uploads",
      "Lua scripting sandbox",
      "Marketplace selling + Featured eligibility",
      "Priority publish review (~4h)",
    ],
  },
  {
    id: "studio", name: "Studio", tagline: "Small teams, shared credit pool, seat management.",
    monthly: 8000, yearly: 6400, credits: 10000, daily: 50, tone: "cyan",
    highlights: [
      "10,000 credits / month",
      "Unlimited projects",
      "85 / 15 revenue split",
      "Up to 5 seats · shared credit pool",
      "Per-seat usage limits + alerts",
      "Revenue-split collaborators on assets",
      "SSO (Google Workspace)",
    ],
  },
  {
    id: "enterprise", name: "Enterprise", tagline: "Studios, publishers, education. Custom everything.",
    monthly: 0, yearly: 0, credits: "custom", daily: 0, tone: "amber",
    highlights: [
      "Custom monthly credit pool",
      "Custom revenue split",
      "Dedicated infra / private realm",
      "SSO + SCIM + role management",
      "Priority support & onboarding",
      "SLA + custom DPA",
    ],
  },
];

// ---- feature matrix ---------------------------------------------------------
type Cell = string | boolean;
const matrix: { row: string; free: Cell; pro: Cell; studio: Cell; enterprise: Cell }[] = [
  { row: "Monthly credits",              free: "150",     pro: "2,000",  studio: "10,000",   enterprise: "Custom" },
  { row: "Daily credits (top-up)",       free: "5",       pro: "15",     studio: "50",       enterprise: "Custom" },
  { row: "Revenue split (creator/platform)", free: "60/40", pro: "80/20", studio: "85/15", enterprise: "Custom" },
  { row: "Active projects",              free: "3",       pro: "50",     studio: "Unlimited", enterprise: "Unlimited" },
  { row: "Team seats",                   free: "1",       pro: "1",      studio: "5",        enterprise: "Custom" },
  { row: "Custom asset uploads",         free: false,     pro: true,     studio: true,       enterprise: true },
  { row: "Lua scripting sandbox",        free: false,     pro: true,     studio: true,       enterprise: true },
  { row: "Marketplace selling",          free: false,     pro: true,     studio: true,       enterprise: true },
  { row: "Party Hub Featured eligibility", free: false,   pro: true,     studio: true,       enterprise: true },
  { row: "Publish thumbnail resolution", free: "720p",    pro: "1440p",  studio: "4K",       enterprise: "4K" },
  { row: "Playtest guest slots",         free: "4",       pro: "16",     studio: "64",       enterprise: "Custom" },
  { row: "Analytics retention",          free: "30 days", pro: "2 years", studio: "5 years",  enterprise: "Unlimited" },
  { row: "Priority publish review",      free: false,     pro: true,     studio: true,       enterprise: true },
  { row: "SSO",                          free: false,     pro: false,    studio: "Google",   enterprise: "SSO + SCIM" },
  { row: "Support",                      free: "Community", pro: "Email", studio: "Priority", enterprise: "Dedicated" },
];

// ---- credit consumption examples --------------------------------------------
const spendExamples = [
  { icon: Zap,      label: "AI Copilot generation (sprite / SFX)", cost: "1 credit" },
  { icon: Zap,      label: "AI level layout suggestion",           cost: "1 credit" },
  { icon: Sparkles, label: "Publish a build to Party Hub",         cost: "2 credits" },
  { icon: Sparkles, label: "Playtest session (per hour, up to 16 players)", cost: "3 credits" },
  { icon: TrendingUp, label: "Marketplace listing boost (24h)",    cost: "5 credits" },
];

// ---- top-ups ----------------------------------------------------------------
const topups = [
  { credits: 500,   price: 450,   perCredit: "0.90 PX" },
  { credits: 2000,  price: 1600,  perCredit: "0.80 PX", best: true },
  { credits: 10000, price: 7000,  perCredit: "0.70 PX" },
];

function ProPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const balance = 1240; const monthlyLimit = 2000;
  const pct = Math.round((balance / monthlyLimit) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
      <SectionHeader
        eyebrow="// Upgrade · Credits"
        title="Pay for what you build."
        sub="One credit balance covers AI generations, publishes, playtests, and marketplace boosts. Refills every month — top up anytime."
        right={
          <div className="flex items-center gap-1 p-1 rounded-full bg-white border-2 border-ink shadow-[3px_3px_0_0_var(--ink)]">
            <BillingToggle active={billing === "monthly"} onClick={() => setBilling("monthly")}>Monthly</BillingToggle>
            <BillingToggle active={billing === "yearly"} onClick={() => setBilling("yearly")}>
              Yearly <span className="ml-1 text-[9px] opacity-70">−20%</span>
            </BillingToggle>
          </div>
        }
      />

      {/* Current usage strip */}
      <HudCard className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl border-2 border-ink bg-accent flex items-center justify-center shrink-0"><Coins className="w-5 h-5 text-ink" /></div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Current plan · Free</div>
              <div className="font-black italic text-xl" style={{ fontFamily: "var(--font-display)" }}>{balance} / {monthlyLimit} credits left</div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-3 rounded-full border-2 border-ink bg-white overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-ink/60">
              <span>Resets in 12 days</span>
              <span>{pct}% remaining</span>
            </div>
          </div>
          <HudButton variant="ghost">Buy credits</HudButton>
        </div>
      </HudCard>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-14">
        {plans.map((p) => <PlanCard key={p.id} plan={p} billing={billing} />)}
      </div>

      {/* Credit spend examples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-14">
        <HudCard>
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4" />
            <h3 className="font-black italic text-lg" style={{ fontFamily: "var(--font-display)" }}>What a credit gets you</h3>
          </div>
          <ul className="divide-y divide-ink/10">
            {spendExamples.map((s) => (
              <li key={s.label} className="flex items-center justify-between py-2.5 text-sm">
                <span className="flex items-center gap-2"><s.icon className="w-3.5 h-3.5 text-ink/60" /> {s.label}</span>
                <span className="font-mono text-xs font-bold">{s.cost}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink/60">Publishing your finished game to your own domain and playing in the CyberVerse are always free.</p>
        </HudCard>

        <HudCard>
          <div className="flex items-center gap-2 mb-4">
            <Coins className="w-4 h-4" />
            <h3 className="font-black italic text-lg" style={{ fontFamily: "var(--font-display)" }}>One-time credit top-ups</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {topups.map((t) => (
              <button
                key={t.credits}
                className={`relative p-3 rounded-2xl border-2 border-ink text-left transition ${t.best ? "bg-accent shadow-[3px_3px_0_0_var(--ink)]" : "bg-white hover:bg-muted"}`}
              >
                {t.best && <span className="absolute -top-2 left-2"><Chip tone="magenta">Best</Chip></span>}
                <div className="text-2xl font-black italic" style={{ fontFamily: "var(--font-display)" }}>{t.credits.toLocaleString()}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">credits</div>
                <div className="mt-3 font-mono text-sm font-bold">{t.price.toLocaleString()} PX</div>
                <div className="text-[10px] font-mono text-ink/50">{t.perCredit} / credit</div>
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink/60">Top-ups never expire. They stack on top of your monthly refill and are used only after your monthly credits run out.</p>
        </HudCard>
      </div>

      {/* Full comparison */}
      <SectionHeader eyebrow="// Feature comparison" title="Every difference, spelled out." />
      <HudCard className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-muted/40 border-b-2 border-ink">
              <tr className="text-left text-[10px] font-mono uppercase tracking-widest">
                <th className="px-4 py-3 w-1/3">Feature</th>
                <th className="px-4 py-3">Free</th>
                <th className="px-4 py-3 text-primary">Pro</th>
                <th className="px-4 py-3">Studio</th>
                <th className="px-4 py-3">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((r, i) => (
                <tr key={r.row} className={`border-t border-ink/10 ${i % 2 ? "bg-background/40" : ""}`}>
                  <td className="px-4 py-3">{r.row}</td>
                  <MatrixCell v={r.free} />
                  <MatrixCell v={r.pro} highlight />
                  <MatrixCell v={r.studio} />
                  <MatrixCell v={r.enterprise} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HudCard>

      {/* FAQ */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Faq q="Do unused monthly credits roll over?" a="Monthly credits reset each billing cycle and don't roll over. Top-up credits never expire and carry across cycles." />
        <Faq q="Can I change or cancel anytime?" a="Yes. Upgrade, downgrade, or cancel from Settings → Plans & credits. Downgrades take effect at the end of the current cycle." />
        <Faq q="What if I run out mid-month?" a="You can top up on the spot. Free daily credits (5/day, capped at 30/month) also give you a small buffer without paying." />
        <Faq q="Do published games cost credits to play?" a="No. Only build-time actions (AI, publishes, playtests, boosts) use credits. Players never spend yours." />
      </div>

      <p className="mt-10 text-center text-xs text-ink/50 max-w-2xl mx-auto">
        Prices in PX (Pixels Studio credits). 100 PX ≈ $1 USD. Billed in your local currency at checkout — taxes calculated per your region.
      </p>
    </div>
  );
}

// ---- bits -------------------------------------------------------------------

function BillingToggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`h-8 px-4 rounded-full text-xs font-mono uppercase tracking-widest transition ${
        active ? "bg-ink text-background" : "text-ink hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: "monthly" | "yearly" }) {
  const isRecommended = plan.tone === "magenta";
  const isEnterprise = plan.id === "enterprise";
  const price = billing === "yearly" ? plan.yearly : plan.monthly;
  const isCurrent = plan.id === "free";

  return (
    <HudCard
      glow={isRecommended ? "magenta" : "none"}
      className={`relative overflow-hidden flex flex-col ${isRecommended ? "!border-primary" : ""}`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-4"><Chip tone="magenta"><Sparkles className="w-3 h-3" /> {plan.badge}</Chip></span>
      )}
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Pixels Studio</div>
      <div className="text-2xl font-black italic mt-1" style={{ fontFamily: "var(--font-display)" }}>{plan.name}</div>
      <p className="text-xs text-ink/60 mt-1 min-h-[32px]">{plan.tagline}</p>

      <div className="mt-5">
        {isEnterprise ? (
          <div className="font-mono">
            <div className="text-3xl font-black italic" style={{ fontFamily: "var(--font-display)" }}>Custom</div>
            <div className="text-[10px] uppercase tracking-widest text-ink/60">Contact us for a quote</div>
          </div>
        ) : (
          <div className="font-mono">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black italic" style={{ fontFamily: "var(--font-display)" }}>{price.toLocaleString()}</span>
              <span className="text-sm text-ink/60">PX / mo</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-ink/60 mt-1">
              {plan.id === "free" ? "Free forever" : billing === "yearly" ? `Billed yearly · ${(price * 12).toLocaleString()} PX` : "Billed monthly"}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 p-3 rounded-2xl border-2 border-ink bg-background/60">
        <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Credits included</div>
        <div className="font-black italic text-xl mt-0.5" style={{ fontFamily: "var(--font-display)" }}>
          {plan.credits === "custom" ? "Custom pool" : `${plan.credits.toLocaleString()} / mo`}
        </div>
        {plan.daily > 0 && <div className="text-[10px] font-mono text-ink/50 mt-0.5">+ {plan.daily} daily bonus credits</div>}
      </div>

      <ul className="mt-5 space-y-2 text-sm flex-1">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2">
            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isRecommended ? "text-primary" : "text-ink"}`} />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <HudButton
        variant={isRecommended ? "primary" : "secondary"}
        className="mt-6 w-full justify-center h-11"
        disabled={isCurrent}
      >
        {isCurrent ? "Current plan" : isEnterprise ? "Contact sales" : `Upgrade to ${plan.name}`}
      </HudButton>
    </HudCard>
  );
}

function MatrixCell({ v, highlight }: { v: Cell; highlight?: boolean }) {
  return (
    <td className={`px-4 py-3 font-mono text-xs ${highlight ? "text-primary font-bold" : "text-ink/70"}`}>
      {typeof v === "boolean"
        ? (v ? <Check className="w-4 h-4 text-[oklch(0.55_0.20_140)]" /> : <Minus className="w-4 h-4 text-ink/30" />)
        : v}
    </td>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="p-5 rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)]">
      <div className="font-black italic text-base" style={{ fontFamily: "var(--font-display)" }}>{q}</div>
      <p className="mt-2 text-sm text-ink/70">{a}</p>
    </div>
  );
}
