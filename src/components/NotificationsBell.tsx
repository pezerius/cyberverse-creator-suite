import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { notifications, kindMeta } from "@/lib/mock-notifications";

export function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const [unreadIds, setUnreadIds] = useState(new Set(notifications.filter(n => n.unread).map(n => n.id)));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const recent = notifications.slice(0, 6);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Notifications"
        className="relative w-10 h-10 rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_var(--ink)] flex items-center justify-center hover:translate-y-[-1px] transition"
      >
        <Bell className="w-4 h-4" />
        {unreadIds.size > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground border-2 border-ink text-[9px] font-mono font-bold flex items-center justify-center">
            {unreadIds.size}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-[380px] bg-background border-2 border-ink rounded-3xl shadow-[6px_6px_0_0_var(--ink)] overflow-hidden z-50"
          >
            <div className="flex items-center justify-between px-4 h-11 border-b-2 border-ink bg-primary text-primary-foreground">
              <div className="text-[11px] font-mono uppercase tracking-widest">// Inbox · {unreadIds.size} new</div>
              <button onClick={() => setUnreadIds(new Set())} className="text-[10px] font-mono uppercase tracking-widest hover:underline inline-flex items-center gap-1">
                <Check className="w-3 h-3" strokeWidth={3} /> Mark read
              </button>
            </div>
            <div className="max-h-[380px] overflow-y-auto">
              {recent.map((n) => {
                const meta = kindMeta[n.kind];
                const Icon = meta.icon;
                const unread = unreadIds.has(n.id);
                return (
                  <Link
                    key={n.id}
                    to={(n.href ?? "/notifications") as never}
                    onClick={() => { setUnreadIds(prev => { const s = new Set(prev); s.delete(n.id); return s; }); setOpen(false); }}
                    className={`flex items-start gap-3 px-4 py-3 border-b-2 border-ink/10 hover:bg-muted/50 transition ${unread ? "bg-primary/[0.04]" : ""}`}
                  >
                    <div className={`w-9 h-9 rounded-xl border-2 border-ink flex items-center justify-center shrink-0 ${meta.tone}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="font-bold text-sm truncate">{n.title}</div>
                        {unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                      </div>
                      <div className="text-xs text-ink/60 leading-snug line-clamp-2">{n.body}</div>
                      <div className="mt-1 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-ink/40">
                        <span>{n.when}</span>
                        {n.amount && <span className="text-[oklch(0.55_0.22_45)] font-bold">{n.amount}</span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link to="/notifications" className="block text-center px-4 h-11 border-t-2 border-ink bg-muted/30 text-xs font-mono uppercase tracking-widest font-bold hover:bg-accent transition leading-[42px]">
              View all →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
