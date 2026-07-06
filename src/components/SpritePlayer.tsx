import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const FRAMES = ["🚶", "🏃", "🤸", "🧗", "🤾", "🏃‍♂️"];

export function SpritePlayer({ grad = "from-primary/50 to-accent/40" }: { grad?: string }) {
  const [playing, setPlaying] = useState(true);
  const [frame, setFrame] = useState(0);
  const [fps, setFps] = useState(6);
  const [anim, setAnim] = useState("run");

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 1000 / fps);
    return () => clearInterval(id);
  }, [playing, fps]);

  return (
    <div className="rounded-2xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] overflow-hidden">
      <div className={`bg-gradient-to-br ${grad} p-8 relative`}>
        <div
          className="w-full h-56 rounded-xl border-2 border-ink bg-background/40 backdrop-blur flex items-center justify-center relative"
          style={{ imageRendering: "pixelated" }}
        >
          <div className="text-8xl select-none" aria-hidden>{FRAMES[frame]}</div>
          <div className="absolute bottom-2 left-2 px-2 h-6 rounded-full bg-ink text-background text-[10px] font-mono uppercase tracking-widest flex items-center">
            frame {frame + 1}/{FRAMES.length}
          </div>
        </div>
      </div>
      <div className="p-3 border-t-2 border-ink flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="w-9 h-9 rounded-full bg-primary text-primary-foreground border-2 border-ink flex items-center justify-center shadow-[2px_2px_0_0_var(--ink)]"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setFrame(0)}
          className="w-9 h-9 rounded-full bg-white border-2 border-ink flex items-center justify-center"
          aria-label="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1 ml-2">
          {["idle", "run", "jump", "attack"].map((a) => (
            <button
              key={a}
              onClick={() => setAnim(a)}
              className={`px-3 h-8 rounded-full border-2 text-[10px] font-mono uppercase tracking-widest ${
                anim === a ? "bg-ink text-background border-ink" : "bg-white border-ink/30 hover:border-ink"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-ink/60">fps</span>
          <input
            type="range" min={1} max={24} value={fps}
            onChange={(e) => setFps(parseInt(e.target.value))}
            className="w-28 accent-primary"
          />
          <span className="font-mono text-xs w-6 text-right">{fps}</span>
        </div>
      </div>
    </div>
  );
}
