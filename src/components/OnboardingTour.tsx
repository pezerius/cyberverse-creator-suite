import { useEffect, useState } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

const STEPS = [
  { emoji: "👋", title: "Welcome to Pixels Studio", body: "You just walked into the workshop where the CyberVerse's games get built. Let's take 30 seconds." },
  { emoji: "🧱", title: "Start from a template", body: "Every game begins in /create. Pick a genre, remix it, ship it — no engine to install." },
  { emoji: "🛒", title: "License assets from creators", body: "The Marketplace is the community's art / audio / tile shelf. Everything you buy comes with clear license terms." },
  { emoji: "🎮", title: "Publish to the Hub", body: "One button to publish. Your game lands in /hub where friends can jump in via voice rooms." },
  { emoji: "💰", title: "You keep 60% of every sale", body: "$PIXEL settles instantly. Withdraw to fiat or crypto from /wallet." },
];

const KEY = "pixels_tour_seen_v1";

export function OnboardingTour() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem(KEY);
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    if (typeof window !== "undefined") window.localStorage.setItem(KEY, "1");
    setOpen(false);
  };

  if (!open) return null;
  const s = STEPS[step];
  const last = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[100] bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background rounded-2xl border-2 border-ink shadow-[6px_6px_0_0_var(--ink)] overflow-hidden">
        <div className="bg-primary text-primary-foreground border-b-2 border-ink px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" /> Onboarding · {step + 1}/{STEPS.length}
          </div>
          <button onClick={dismiss} className="w-7 h-7 rounded-full bg-background/20 hover:bg-background/30 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 text-center">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-accent border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center text-4xl mb-4">
            {s.emoji}
          </div>
          <h2 className="text-2xl font-black italic text-ink" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h2>
          <p className="mt-3 text-sm text-ink/70">{s.body}</p>
          <div className="mt-6 flex items-center justify-center gap-1.5">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-8 bg-primary" : "w-1.5 bg-ink/20"}`} />
            ))}
          </div>
        </div>
        <div className="p-4 border-t-2 border-ink bg-white flex items-center justify-between gap-2">
          <button onClick={dismiss} className="text-xs font-mono uppercase tracking-widest text-ink/50 hover:text-ink px-3 h-9">Skip</button>
          {last ? (
            <Link
              to="/studio/create"
              onClick={dismiss}
              className="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest"
            >
              Enter the studio <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-primary text-primary-foreground border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] font-mono text-xs uppercase tracking-widest"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
