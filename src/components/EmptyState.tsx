import type { ReactNode } from "react";

export function EmptyState({
  emoji = "◇", title, sub, action,
}: { emoji?: string; title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-ink/30 bg-white/60 p-10 text-center">
      <div
        className="mx-auto w-20 h-20 rounded-2xl bg-accent border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] flex items-center justify-center text-4xl mb-4"
        aria-hidden
      >
        {emoji}
      </div>
      <div className="text-xl font-black italic text-ink" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </div>
      {sub && <p className="mt-2 text-sm text-ink/60 max-w-md mx-auto">{sub}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
