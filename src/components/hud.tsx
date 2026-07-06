import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SubNav({ children }: { children: ReactNode }) {
  return (
    <div className="border-b-2 border-ink bg-background/80 backdrop-blur">
      <div className="flex items-center gap-2 px-6 h-12 overflow-x-auto">{children}</div>
    </div>
  );
}

export function SubNavLink({ to, label, active }: { to: string; label: string; active?: boolean }) {
  return (
    <Link
      to={to}
      className={`px-4 h-9 flex items-center text-xs font-mono uppercase tracking-widest rounded-full transition border-2 ${
        active
          ? "bg-primary text-primary-foreground border-ink shadow-[2px_2px_0_0_var(--ink)]"
          : "text-foreground/70 hover:text-foreground border-transparent hover:border-ink hover:bg-white"
      }`}
    >
      {label}
    </Link>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  right,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
      <div>
        {eyebrow && (
          <div className="inline-flex items-center px-3 h-6 rounded-full border-2 border-ink bg-accent text-ink text-[10px] font-mono uppercase tracking-[0.2em] mb-3 shadow-[2px_2px_0_0_var(--ink)]">
            {eyebrow}
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-black italic tracking-tight text-ink" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h1>
        {sub && <p className="mt-3 text-foreground/70 max-w-2xl text-base">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Chip({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "default" | "magenta" | "cyan" | "amber" | "green" | "red" | "violet";
  className?: string;
}) {
  const tones: Record<string, string> = {
    default: "bg-white text-ink",
    magenta: "bg-primary text-primary-foreground",
    cyan: "bg-[oklch(0.85_0.10_220)] text-ink",
    amber: "bg-[oklch(0.80_0.18_50)] text-ink",
    green: "bg-accent text-ink",
    red: "bg-destructive text-destructive-foreground",
    violet: "bg-[oklch(0.72_0.18_290)] text-ink",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 h-6 rounded-full border-2 border-ink font-mono text-[10px] uppercase tracking-widest shadow-[2px_2px_0_0_var(--ink)] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function HudButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | "cyan" | "amber";
}) {
  const styles: Record<string, string> = {
    primary: "bg-primary text-primary-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_var(--ink)]",
    secondary: "bg-white text-ink border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] hover:translate-y-[-1px]",
    ghost: "bg-transparent text-ink border-2 border-transparent hover:border-ink hover:bg-white",
    danger: "bg-destructive text-destructive-foreground border-2 border-ink shadow-[3px_3px_0_0_var(--ink)]",
    success: "bg-accent text-ink border-2 border-ink shadow-[3px_3px_0_0_var(--ink)] hover:translate-y-[-1px]",
    cyan: "bg-[oklch(0.85_0.12_220)] text-ink border-2 border-ink shadow-[3px_3px_0_0_var(--ink)]",
    amber: "bg-[oklch(0.75_0.20_50)] text-ink border-2 border-ink shadow-[3px_3px_0_0_var(--ink)]",
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 h-10 px-5 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-transform ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function HudCard({
  children,
  className = "",
  glow = "none",
}: {
  children: ReactNode;
  className?: string;
  glow?: "none" | "magenta" | "cyan" | "amber";
}) {
  const accents: Record<string, string> = {
    none: "",
    magenta: "!bg-primary/5",
    cyan: "!bg-[oklch(0.92_0.06_220)]",
    amber: "!bg-[oklch(0.94_0.08_60)]",
  };
  return (
    <div className={`bg-white border-2 border-ink rounded-3xl shadow-[4px_4px_0_0_var(--ink)] p-5 ${accents[glow]} ${className}`}>
      {children}
    </div>
  );
}

export function Stat({
  label,
  value,
  delta,
  tone = "default",
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "default" | "magenta" | "cyan" | "amber" | "green";
}) {
  const colors: Record<string, string> = {
    default: "text-ink",
    magenta: "text-primary",
    cyan: "text-[oklch(0.45_0.18_260)]",
    amber: "text-[oklch(0.55_0.22_45)]",
    green: "text-[oklch(0.45_0.20_140)]",
  };
  const bgs: Record<string, string> = {
    default: "bg-white",
    magenta: "bg-primary/10",
    cyan: "bg-[oklch(0.94_0.05_220)]",
    amber: "bg-[oklch(0.95_0.08_60)]",
    green: "bg-accent/40",
  };
  return (
    <div className={`border-2 border-ink rounded-2xl shadow-[3px_3px_0_0_var(--ink)] p-4 ${bgs[tone]}`}>
      <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">{label}</div>
      <div className={`mt-2 font-display italic font-black text-3xl ${colors[tone]}`} style={{ fontFamily: "var(--font-display)" }}>{value}</div>
      {delta && (
        <div className="mt-1 text-[10px] font-mono text-[oklch(0.45_0.20_140)] font-bold">▲ {delta}</div>
      )}
    </div>
  );
}

export function Sparkline({ points, color = "magenta" }: { points: number[]; color?: "magenta" | "cyan" | "amber" | "green" }) {
  const w = 100, h = 30;
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 1;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const c: Record<string, string> = {
    magenta: "var(--primary)",
    cyan: "oklch(0.55 0.18 220)",
    amber: "oklch(0.65 0.22 45)",
    green: "oklch(0.55 0.22 140)",
  };
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8" preserveAspectRatio="none">
      <path d={`${path} L${w},${h} L0,${h} Z`} fill={c[color]} opacity="0.2" />
      <path d={path} fill="none" stroke={c[color]} strokeWidth="2" />
    </svg>
  );
}
