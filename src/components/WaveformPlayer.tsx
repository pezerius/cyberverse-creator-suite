import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

// Deterministic pseudo-waveform bars
function bars(seed: number, count = 96) {
  const out: number[] = [];
  let x = seed;
  for (let i = 0; i < count; i++) {
    x = (x * 9301 + 49297) % 233280;
    const rand = x / 233280;
    const envelope = Math.sin((i / count) * Math.PI);
    out.push(0.15 + envelope * (0.35 + rand * 0.65));
  }
  return out;
}

export function WaveformPlayer({ label = "clip_07.wav", duration = 2.4, seed = 7 }: { label?: string; duration?: number; seed?: number }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);
  const data = bars(seed);

  useEffect(() => {
    if (!playing) return;
    let start = performance.now() - progress * duration * 1000;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      setProgress(p);
      if (p >= 1) { setPlaying(false); return; }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [playing, duration]);

  return (
    <div className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] p-4">
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={() => { if (progress >= 1) setProgress(0); setPlaying((p) => !p); }}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center shadow-[2px_2px_0_0_var(--ink)] shrink-0"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <div className="min-w-0">
          <div className="font-mono text-sm truncate">{label}</div>
          <div className="font-mono text-[10px] text-ink/50 uppercase tracking-widest">
            {(progress * duration).toFixed(2)}s / {duration.toFixed(2)}s
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[2px] h-16">
        {data.map((v, i) => {
          const played = i / data.length <= progress;
          return (
            <div
              key={i}
              className={`w-[3px] rounded-full ${played ? "bg-primary" : "bg-ink/25"}`}
              style={{ height: `${v * 100}%` }}
            />
          );
        })}
      </div>
    </div>
  );
}
