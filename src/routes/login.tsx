import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Gamepad2, Hammer } from "lucide-react";

type LoginMode = "hub" | "studio";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): { mode: LoginMode } => ({
    mode: search.mode === "studio" ? "studio" : "hub",
  }),
  head: ({ match }) => {
    const mode = (match.search as { mode?: LoginMode })?.mode ?? "hub";
    return {
      meta:
        mode === "studio"
          ? [
              { title: "Log in — Pixels Studio" },
              { name: "description", content: "Continue with your Pixels account. No new signup." },
            ]
          : [
              { title: "Log in — Pixels Hub" },
              { name: "description", content: "Jump back into Pixels Hub. One Pixels account for games, skins, party, and rewards." },
            ],
    };
  },
  component: LoginPage,
});

function LoginPage() {
  const { mode } = Route.useSearch();
  return mode === "studio" ? <StudioLogin /> : <HubLogin />;
}

function HubLogin() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center font-black italic" style={{ fontFamily: "var(--font-display)" }}>P</div>
          <div>
            <div className="font-bold tracking-tight">Pixels Hub</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink/60">Play · Collect · Party</div>
          </div>
        </Link>

        <div className="bg-white border-2 border-ink rounded-3xl shadow-[6px_6px_0_0_var(--ink)] p-8">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-2">// Welcome back</div>
          <h1 className="italic font-black text-3xl tracking-tight leading-tight" style={{ fontFamily: "var(--font-display)" }}>
            Jump back in.
          </h1>
          <p className="mt-2 text-sm text-ink/70">
            One Pixels account for every game, skin, and party. Your inventory, $PIXEL, and friends come with you.
          </p>

          <Link
            to="/home"
            className="mt-6 w-full inline-flex items-center justify-between gap-3 h-14 px-5 rounded-2xl bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] font-mono text-sm uppercase tracking-widest font-bold hover:translate-y-[-1px] transition-transform"
          >
            <span className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/40 flex items-center justify-center text-[10px]">PX</span>
              Continue with Pixels
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="h-11 rounded-2xl bg-white border-2 border-ink text-xs font-mono uppercase tracking-widest font-bold hover:bg-muted transition">
              Ronin wallet
            </button>
            <button className="h-11 rounded-2xl bg-white border-2 border-ink text-xs font-mono uppercase tracking-widest font-bold hover:bg-muted transition">
              Guest play
            </button>
          </div>

          <div className="mt-6 flex items-start gap-3 p-3 rounded-2xl bg-accent/30 border-2 border-ink/20">
            <ShieldCheck className="w-4 h-4 text-ink mt-0.5 shrink-0" />
            <p className="text-xs text-ink/70">
              <span className="font-mono uppercase tracking-widest text-[10px] font-bold">New here?</span>{" "}
              No signup needed. Continue with Pixels and you're in — inventory and $PIXEL wallet are ready.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 text-center">
            {[
              ["10k+", "Games to play"],
              ["$PIXEL", "Earn on Ronin"],
              ["24/7", "Party rooms"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="italic font-black text-lg text-primary" style={{ fontFamily: "var(--font-display)" }}>{n}</div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-ink/60">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest text-ink/50">
            By continuing you agree to the Pixels Player Code
          </p>
          <Link
            to="/login"
            search={{ mode: "studio" }}
            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-ink/60 hover:text-ink"
          >
            <Hammer className="w-3 h-3" /> I'm a creator — go to Pixels Studio
          </Link>
        </div>
      </div>
    </div>
  );
}

function StudioLogin() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden scanlines">
      <div className="absolute inset-0 -z-10 grid-canvas opacity-40" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/15 blur-3xl -z-10" />

      <div className="w-full max-w-md px-6">
        <Link to="/studio" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 clip-hud-sm bg-primary/15 border border-primary/40 flex items-center justify-center neon-border-magenta">
            <span className="font-mono font-bold text-primary text-sm">NL</span>
          </div>
          <div>
            <div className="font-bold tracking-tight">Pixels Studio</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Inside Pixels</div>
          </div>
        </Link>

        <div className="hud-panel p-8">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] neon-text-cyan mb-2">// Authenticate</div>
          <h1 className="text-2xl font-bold tracking-tight">Jack in to the Studio.</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Pixels Studio ships as part of Pixels. Bring the account you already play with — inventory, PIXELS, and reputation come with you.
          </p>

          <Link
            to="/studio/create"
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

        <div className="mt-6 text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
            By continuing you agree to the Creator Code · Node REALM-7
          </p>
          <Link
            to="/login"
            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            <Gamepad2 className="w-3 h-3" /> I'm just here to play — go to Pixels Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
