import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <RedirectHome />,
});

function RedirectHome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] neon-text-cyan mb-4">Pixels Studio</div>
        <div className="flex gap-3 justify-center">
          <Link to="/login" className="inline-flex items-center h-10 px-5 clip-hud-sm bg-primary text-primary-foreground neon-border-magenta font-mono text-xs uppercase tracking-widest">Log in</Link>
          <Link to="/create" className="inline-flex items-center h-10 px-5 clip-hud-sm bg-surface-2 border border-border font-mono text-xs uppercase tracking-widest">Enter Studio</Link>
        </div>
      </div>
    </div>
  );
}
