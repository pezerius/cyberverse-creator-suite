import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Pixels Studio" },
      { name: "description", content: "Continue with your Pixels account. No new signup." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden scanlines">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 grid-canvas opacity-40" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/15 blur-3xl -z-10" />

      <div className="w-full max-w-md px-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 clip-hud-sm bg-primary/15 border border-primary/40 flex items-center justify-center neon-border-magenta">
            <span className="font-mono font-bold text-primary text-sm">NL</span>
          </div>
          <div>
            <div className="font-bold tracking-tight">Pixels Studio</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Inside Pixels</div>
          </div>
        </div>

        <div className="hud-panel p-8">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] neon-text-cyan mb-2">// Authenticate</div>
          <h1 className="text-2xl font-bold tracking-tight">Jack in to the Studio.</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pixels Studio ships as part of Pixels. Bring the account you already play with — inventory, PIXELS, and reputation come with you.
          </p>

          <Link
            to="/create"
            className="mt-6 w-full inline-flex items-center justify-between gap-3 h-14 px-5 clip-hud bg-primary text-primary-foreground neon-border-magenta font-mono text-sm uppercase tracking-widest hover:brightness-110 transition"
          >
            <span className="flex items-center gap-3">
              <span className="w-6 h-6 clip-hud-sm bg-primary-foreground/20 flex items-center justify-center text-xs">CV</span>
              Continue with Pixels
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="mt-6 flex items-start gap-3 p-3 clip-hud-sm bg-accent/10 border border-accent/30">
            <ShieldCheck className="w-4 h-4 neon-text-cyan mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              <span className="neon-text-cyan font-mono uppercase tracking-widest text-[10px]">No new signup.</span>{" "}
              No email, no password, no wallet setup. Your Pixels identity is the only key.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 text-center">
            {["60/40", "50k+", "0"].map((n, i) => (
              <div key={i}>
                <div className="font-mono text-lg neon-text-magenta">{n}</div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                  {["Split favors you", "Live creators", "Engine to learn"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
          By continuing you agree to the Creator Code · Node REALM-7
        </p>
      </div>
    </div>
  );
}
