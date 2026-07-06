import { useState } from "react";
import { Flag, X, CheckCircle2 } from "lucide-react";
import { HudButton } from "@/components/hud";

const REASONS = ["IP theft", "NSFW / disallowed", "Spam", "Harassment", "Broken / doesn't work", "Scam", "Other"];

export function ReportButton({ targetLabel, size = "md" }: { targetLabel: string; size?: "sm" | "md" }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(REASONS[0]);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-white text-ink hover:bg-destructive hover:text-destructive-foreground transition shadow-[2px_2px_0_0_var(--ink)] ${
          size === "sm" ? "px-3 h-8 text-[10px]" : "px-4 h-9 text-xs"
        } font-mono uppercase tracking-widest`}
      >
        <Flag className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} /> Report
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-background rounded-2xl border-2 border-ink shadow-[6px_6px_0_0_var(--ink)] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b-2 border-ink bg-destructive/10">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-ink/60">Report</div>
                <div className="font-bold text-ink truncate max-w-[26rem]">{targetLabel}</div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full border-2 border-ink bg-white flex items-center justify-center hover:bg-muted">
                <X className="w-4 h-4" />
              </button>
            </div>
            {sent ? (
              <div className="p-8 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto text-accent mb-3" />
                <div className="font-black text-xl italic" style={{ fontFamily: "var(--font-display)" }}>Report sent.</div>
                <p className="text-sm text-ink/60 mt-2">Our mod team reviews within 24h. Serial reporters get throttled.</p>
                <div className="mt-5"><HudButton onClick={() => { setOpen(false); setSent(false); }}>Close</HudButton></div>
              </div>
            ) : (
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-ink/60 block mb-2">Reason</label>
                  <div className="grid grid-cols-2 gap-2">
                    {REASONS.map((r) => (
                      <button
                        key={r}
                        onClick={() => setReason(r)}
                        className={`px-3 py-2 rounded-lg border-2 text-xs font-mono text-left ${
                          reason === r ? "border-ink bg-ink text-background" : "border-ink/20 bg-white hover:border-ink"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-ink/60 block mb-2">Details (optional)</label>
                  <textarea
                    value={note} onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    placeholder="Add links, timestamps, or context…"
                    className="w-full rounded-lg border-2 border-ink/20 bg-white px-3 py-2 text-sm focus:border-ink outline-none"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button onClick={() => setOpen(false)} className="px-4 h-9 text-xs font-mono uppercase tracking-widest border-2 border-ink/30 rounded-full hover:border-ink">Cancel</button>
                  <HudButton variant="primary" onClick={() => setSent(true)}>Submit report</HudButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
