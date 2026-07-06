import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, HudCard, Chip, SectionHeader, Stat, Sparkline } from "@/components/hud";
import { balance, transactions, earningsSeries, type Txn } from "@/lib/mock-wallet";
import { Wallet, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Plus, CreditCard, Landmark, Bitcoin, Calendar, Info, X, Check, Clock, Shield, Filter, Download } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [{ title: "Wallet & Payouts — Pixels Studio" }, { name: "description", content: "Manage your $PIXEL balance, payouts, and transaction history." }],
  }),
  component: () => (
    <AppShell>
      <WalletPage />
    </AppShell>
  ),
});

const kindLabel: Record<Txn["kind"], string> = {
  sale: "Sale", purchase: "Purchase", payout: "Payout", topup: "Top-up", royalty: "Royalty", fee: "Fee",
};
const kindTone: Record<Txn["kind"], "green" | "cyan" | "amber" | "magenta" | "red" | "default"> = {
  sale: "green", purchase: "cyan", payout: "amber", topup: "magenta", royalty: "green", fee: "red",
};

function WalletPage() {
  const [tab, setTab] = useState<"all" | "in" | "out">("all");
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [topupOpen, setTopupOpen] = useState(false);

  const filtered = useMemo(() => {
    if (tab === "in") return transactions.filter(t => t.amount > 0);
    if (tab === "out") return transactions.filter(t => t.amount < 0);
    return transactions;
  }, [tab]);

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="// Wallet & payouts"
        title="Your $PIXEL."
        sub="Sales settle to escrow, then release to your available balance after the 24h refund window."
      />

      {/* Balance hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid lg:grid-cols-[1.4fr_1fr] gap-5 mb-8"
      >
        <div className="bg-primary text-primary-foreground border-2 border-ink rounded-3xl shadow-[6px_6px_0_0_var(--ink)] p-8 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-accent/30 blur-2xl" />
          <div className="text-[10px] font-mono uppercase tracking-widest opacity-80">// Available balance</div>
          <div className="mt-3 flex items-baseline gap-3">
            <div className="italic font-black text-7xl leading-none" style={{ fontFamily: "var(--font-display)" }}>{balance.available.toLocaleString()}</div>
            <div className="font-mono text-sm opacity-80">$PIXEL</div>
          </div>
          <div className="mt-2 text-sm opacity-80">≈ ${(balance.available * balance.usdRate).toFixed(2)} USD · rate 1 PX = ${balance.usdRate.toFixed(3)}</div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setPayoutOpen(true)} className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-primary-foreground text-primary border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest font-bold hover:translate-y-[-1px] transition">
              <ArrowUpFromLine className="w-4 h-4" /> Withdraw
            </button>
            <button onClick={() => setTopupOpen(true)} className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-accent text-ink border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest font-bold hover:translate-y-[-1px] transition">
              <Plus className="w-4 h-4" /> Top up
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border-2 border-ink rounded-2xl shadow-[3px_3px_0_0_var(--ink)] p-4">
            <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-ink/60"><Clock className="w-3 h-3" /> Pending</div>
            <div className="mt-2 italic font-black text-3xl" style={{ fontFamily: "var(--font-display)" }}>{balance.pending.toLocaleString()}</div>
            <div className="text-[10px] font-mono text-ink/50">Releases within 24h</div>
          </div>
          <div className="bg-white border-2 border-ink rounded-2xl shadow-[3px_3px_0_0_var(--ink)] p-4">
            <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-ink/60"><Shield className="w-3 h-3" /> Escrow</div>
            <div className="mt-2 italic font-black text-3xl" style={{ fontFamily: "var(--font-display)" }}>{balance.escrow.toLocaleString()}</div>
            <div className="text-[10px] font-mono text-ink/50">Buyer refund window</div>
          </div>
          <div className="col-span-2 bg-accent border-2 border-ink rounded-2xl shadow-[3px_3px_0_0_var(--ink)] p-4">
            <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest"><Calendar className="w-3 h-3" /> Next scheduled payout</div>
            <div className="mt-1 flex items-baseline justify-between">
              <div className="italic font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>{balance.nextPayoutDate}</div>
              <div className="font-mono text-sm">≈ {balance.nextPayoutAmount.toLocaleString()} PX</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Earnings chart + lifetime */}
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5 mb-8">
        <HudCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">// Earnings · last 14 days</div>
              <div className="italic font-black text-3xl mt-1" style={{ fontFamily: "var(--font-display)" }}>
                {earningsSeries.reduce((a, b) => a + b, 0).toLocaleString()} <span className="text-sm font-mono text-ink/60">$PIXEL</span>
              </div>
            </div>
            <Chip tone="green"><TrendingUp className="w-3 h-3" /> +34%</Chip>
          </div>
          <div className="h-32">
            <Sparkline points={earningsSeries} color="magenta" />
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-mono text-ink/50">
            <span>14 days ago</span><span>Today</span>
          </div>
        </HudCard>

        <div className="space-y-3">
          <Stat label="Lifetime earned" value={`${(balance.lifetimeEarned / 1000).toFixed(1)}k`} delta="all-time" tone="green" />
          <Stat label="Lifetime spent" value={`${(balance.lifetimeSpent / 1000).toFixed(1)}k`} tone="cyan" />
        </div>
      </div>

      {/* Payout methods */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <PayoutMethod icon={Bitcoin} label="Crypto wallet" hint="0x82…3a1e · default" primary />
        <PayoutMethod icon={Landmark} label="Bank transfer" hint="•••• 4419 · 2-3 days" />
        <PayoutMethod icon={CreditCard} label="Card refill" hint="Visa •••• 4290 · instant" />
      </div>

      {/* Transactions */}
      <HudCard className="!p-0 overflow-hidden">
        <div className="flex items-center justify-between px-5 h-14 border-b-2 border-ink bg-white">
          <div className="flex items-center gap-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">// Transactions</div>
            <div className="flex items-center gap-1">
              {(["all", "in", "out"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`px-3 h-8 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold border-2 ${
                    tab === k ? "bg-primary text-primary-foreground border-ink shadow-[2px_2px_0_0_var(--ink)]" : "bg-white text-ink border-ink/30"
                  }`}
                >
                  {k === "in" ? "Money in" : k === "out" ? "Money out" : "All"}
                </button>
              ))}
            </div>
          </div>
          <button className="inline-flex items-center gap-1 h-8 px-3 rounded-full bg-white border-2 border-ink font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-accent transition">
            <Download className="w-3 h-3" /> Export CSV
          </button>
        </div>
        <div className="divide-y-2 divide-ink/10">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/40 transition"
            >
              <div className={`w-10 h-10 rounded-xl border-2 border-ink flex items-center justify-center shrink-0 ${
                t.amount > 0 ? "bg-accent" : "bg-white"
              }`}>
                {t.amount > 0 ? <ArrowDownToLine className="w-4 h-4" /> : <ArrowUpFromLine className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Chip tone={kindTone[t.kind]}>{kindLabel[t.kind]}</Chip>
                  {t.status !== "settled" && <Chip tone={t.status === "escrow" ? "violet" : "amber"}>{t.status}</Chip>}
                </div>
                <div className="mt-1 font-bold text-sm truncate">{t.memo}</div>
                <div className="text-[10px] font-mono text-ink/50">{t.when} · {t.id}</div>
              </div>
              <div className={`italic font-black text-xl shrink-0 ${t.amount > 0 ? "text-[oklch(0.45_0.20_140)]" : "text-ink"}`} style={{ fontFamily: "var(--font-display)" }}>
                {t.amount > 0 ? "+" : ""}{t.amount.toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>
      </HudCard>

      {payoutOpen && <PayoutModal onClose={() => setPayoutOpen(false)} />}
      {topupOpen && <TopupModal onClose={() => setTopupOpen(false)} />}
    </div>
  );
}

function PayoutMethod({ icon: Icon, label, hint, primary }: { icon: typeof Wallet; label: string; hint: string; primary?: boolean }) {
  return (
    <div className={`border-2 border-ink rounded-2xl shadow-[3px_3px_0_0_var(--ink)] p-4 flex items-center gap-3 ${primary ? "bg-accent" : "bg-white"}`}>
      <div className="w-11 h-11 rounded-xl border-2 border-ink bg-primary text-primary-foreground flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-bold text-sm">{label}</div>
          {primary && <Chip tone="magenta">Default</Chip>}
        </div>
        <div className="text-[11px] font-mono text-ink/60 truncate">{hint}</div>
      </div>
    </div>
  );
}

function PayoutModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState(balance.available);
  const [step, setStep] = useState<"form" | "done">("form");
  const fee = Math.round(amount * 0.005);
  const net = amount - fee;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-background border-2 border-ink rounded-3xl shadow-[6px_6px_0_0_var(--ink)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 h-12 border-b-2 border-ink bg-primary text-primary-foreground">
          <div className="text-[11px] font-mono uppercase tracking-widest">{step === "done" ? "// Payout scheduled" : "// Withdraw $PIXEL"}</div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-primary-foreground text-primary flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>
        {step === "form" ? (
          <div className="p-6 space-y-4">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-1">Amount</div>
              <div className="flex items-center gap-2">
                <input type="number" value={amount} max={balance.available} onChange={(e) => setAmount(Math.max(0, Math.min(balance.available, Number(e.target.value))))} className="w-full h-12 px-4 rounded-2xl bg-white border-2 border-ink font-mono text-lg text-right outline-none" />
                <span className="font-mono text-xs text-ink/60">PX</span>
              </div>
              <button onClick={() => setAmount(balance.available)} className="mt-1 text-[11px] font-mono uppercase tracking-widest text-primary font-bold">Max: {balance.available.toLocaleString()}</button>
            </div>
            <div className="p-3 rounded-2xl bg-muted/40 border-2 border-ink/20 space-y-1 font-mono text-xs">
              <div className="flex justify-between"><span className="text-ink/60">Network fee (0.5%)</span><span>{fee.toLocaleString()} PX</span></div>
              <div className="flex justify-between font-bold pt-1 border-t border-ink/20"><span>You'll receive</span><span className="text-primary">{net.toLocaleString()} PX</span></div>
              <div className="text-[10px] text-ink/50 pt-1">≈ ${(net * balance.usdRate).toFixed(2)} USD to crypto wallet 0x82…3a1e</div>
            </div>
            <HudButton variant="primary" className="w-full" onClick={() => setStep("done")}>Confirm withdrawal</HudButton>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-accent border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center"><Check className="w-7 h-7" strokeWidth={3} /></div>
            <div className="mt-4 italic font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>On its way.</div>
            <div className="mt-2 text-sm text-ink/60">{net.toLocaleString()} PX en route to your wallet. ETA ~2 minutes.</div>
            <HudButton variant="primary" className="mt-5" onClick={onClose}>Done</HudButton>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function TopupModal({ onClose }: { onClose: () => void }) {
  const [preset, setPreset] = useState(5000);
  const [step, setStep] = useState<"form" | "pending" | "done">("form");
  const depositAddress = "ronin:0x7a3f...9c4E";
  const network = "Ronin Network";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-background border-2 border-ink rounded-3xl shadow-[6px_6px_0_0_var(--ink)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 h-12 border-b-2 border-ink bg-primary text-primary-foreground">
          <div className="text-[11px] font-mono uppercase tracking-widest">// Deposit $PIXEL</div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-primary-foreground text-primary flex items-center justify-center"><X className="w-4 h-4" /></button>
        </div>
        {step === "form" && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-ink/60 font-mono">Send $PIXEL from any wallet to your in-game balance. No fiat, no card.</p>

            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-1.5">Suggested amount</div>
              <div className="grid grid-cols-3 gap-2">
                {[1000, 5000, 20000].map((v) => (
                  <button key={v} onClick={() => setPreset(v)} className={`p-3 rounded-2xl border-2 border-ink ${preset === v ? "bg-accent shadow-[2px_2px_0_0_var(--ink)]" : "bg-white"}`}>
                    <div className="italic font-black text-lg" style={{ fontFamily: "var(--font-display)" }}>{v.toLocaleString()}</div>
                    <div className="text-[10px] font-mono text-ink/60">$PIXEL</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border-2 border-ink space-y-2">
              <div className="flex items-center gap-2">
                <Bitcoin className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Network</span>
                <span className="ml-auto font-mono text-xs">{network}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Your address</span>
                <span className="ml-auto font-mono text-xs">{depositAddress}</span>
                <button
                  onClick={() => { try { navigator.clipboard?.writeText(depositAddress); } catch {} }}
                  className="ml-1 px-2 h-6 rounded-full border-2 border-ink bg-accent text-[9px] font-mono uppercase tracking-widest"
                >Copy</button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-muted/40 border-2 border-ink/30 flex gap-2 text-[11px] font-mono text-ink/70">
              <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>Deposits credit after 3 confirmations (~30s). Sending from an exchange? Double-check the network.</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <HudButton variant="ghost" className="w-full" onClick={onClose}>Cancel</HudButton>
              <HudButton variant="primary" className="w-full" onClick={() => setStep("pending")}>I sent {preset.toLocaleString()}</HudButton>
            </div>
          </div>
        )}

        {step === "pending" && (
          <div className="p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-accent border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center">
              <Clock className="w-7 h-7 animate-pulse" strokeWidth={3} />
            </div>
            <div className="mt-4 italic font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>Waiting for confirmations…</div>
            <div className="mt-2 text-sm text-ink/60 font-mono">1 of 3 · ~20s remaining</div>
            <HudButton variant="primary" className="mt-5" onClick={() => setStep("done")}>Simulate confirmed</HudButton>
          </div>
        )}

        {step === "done" && (
          <div className="p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-accent border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center"><Check className="w-7 h-7" strokeWidth={3} /></div>
            <div className="mt-4 italic font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>+{preset.toLocaleString()} $PIXEL</div>
            <div className="mt-2 text-sm text-ink/60">Deposited to your available balance.</div>
            <HudButton variant="primary" className="mt-5" onClick={onClose}>Nice</HudButton>
          </div>
        )}
      </motion.div>
    </div>
  );
}

