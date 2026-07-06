import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SubNav({ children }: { children: ReactNode }) {
  return (
    <div className="border-b border-border/50 bg-[oklch(0.14_0.03_300)]/60">
      <div className="flex items-center gap-1 px-6 h-11 overflow-x-auto">{children}</div>
    </div>
  );
}

export function SubNavLink({ to, label, active }: { to: string; label: string; active?: boolean }) {
  return (
    <Link
      to={to}
      className={`px-3 h-8 flex items-center text-xs font-mono uppercase tracking-widest clip-hud-sm transition ${
        active
          ? "bg-primary/15 text-primary border border-primary/50"
          : "text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
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
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] neon-text-cyan mb-2">{eyebrow}</div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {sub && <p className="mt-2 text-muted-foreground max-w-2xl">{sub}</p>}
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
    default: "bg-surface-2 text-muted-foreground border-border",
    magenta: "bg-primary/15 text-primary border-primary/40",
    cyan: "bg-accent/15 neon-text-cyan border-accent/40",
    amber: "bg-neon-amber/15 neon-text-amber border-neon-amber/40",
    green: "bg-neon-green/15 text-neon-green border-neon-green/40",
    red: "bg-neon-red/15 text-neon-red border-neon-red/40",
    violet: "bg-neon-violet/15 text-neon-violet border-neon-violet/40",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 h-6 clip-hud-sm border font-mono text-[10px] uppercase tracking-widest ${tones[tone]} ${className}`}
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
    primary: "bg-primary text-primary-foreground neon-border-magenta hover:brightness-110",
    secondary: "bg-surface-2 text-foreground border border-border hover:border-primary/60",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground border border-border/50",
    danger: "bg-neon-red/20 text-neon-red border border-neon-red/50 hover:bg-neon-red/30",
    success: "bg-neon-green/20 text-neon-green border border-neon-green/50 hover:bg-neon-green/30",
    cyan: "bg-accent text-accent-foreground neon-border-cyan hover:brightness-110",
    amber: "bg-neon-amber/20 neon-text-amber border border-neon-amber/50 hover:bg-neon-amber/30",
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 h-10 px-4 clip-hud-sm font-mono text-xs uppercase tracking-widest transition ${styles[variant]} ${className}`}
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
  const glows: Record<string, string> = {
    none: "",
    magenta: "neon-border-magenta",
    cyan: "neon-border-cyan",
    amber: "neon-border-amber",
  };
  return (
    <div className={`hud-panel p-5 ${glows[glow]} ${className}`}>{children}</div>
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
    default: "text-foreground",
    magenta: "neon-text-magenta",
    cyan: "neon-text-cyan",
    amber: "neon-text-amber",
    green: "text-neon-green",
  };
  return (
    <div className="hud-panel p-4">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-2 font-mono text-2xl ${colors[tone]}`}>{value}</div>
      {delta && (
        <div className="mt-1 text-[10px] font-mono text-neon-green">▲ {delta}</div>
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
    magenta: "var(--neon-magenta)",
    cyan: "var(--neon-cyan)",
    amber: "var(--neon-amber)",
    green: "var(--neon-green)",
  };
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8" preserveAspectRatio="none">
      <path d={`${path} L${w},${h} L0,${h} Z`} fill={c[color]} opacity="0.15" />
      <path d={path} fill="none" stroke={c[color]} strokeWidth="1.5" />
    </svg>
  );
}
