import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/legal")({
  component: () => (
    <AppShell>
      <LegalShell />
    </AppShell>
  ),
});

function LegalShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const tabs = [
    { to: "/legal/terms", label: "Terms of use" },
    { to: "/legal/privacy", label: "Privacy policy" },
    { to: "/legal/creator-agreement", label: "Creator agreement" },
  ];
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60 mb-2">// Legal</div>
      <h1 className="italic font-black text-5xl mb-6" style={{ fontFamily: "var(--font-display)" }}>The fine print.</h1>
      <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-ink/10 pb-4">
        {tabs.map((t) => {
          const active = pathname === t.to;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`h-9 px-4 rounded-full border-2 border-ink font-mono text-xs uppercase tracking-widest font-bold ${active ? "bg-primary text-primary-foreground shadow-[2px_2px_0_0_var(--ink)]" : "bg-white"}`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
}
