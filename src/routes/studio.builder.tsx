import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { HudButton, Chip } from "@/components/hud";
import {
  MousePointer2, Paintbrush, PaintBucket, Eraser, Boxes, Undo2, Redo2,
  Play, Upload, Download, CheckCircle2, AlertTriangle, X, ArrowRight,
  Layers, Sliders, GitBranch, ClipboardCheck, MapPin, Coins as CoinIcon,
  Flame, DoorOpen, ArrowUpDown, Flag, Trophy, User2, Sparkles, ListChecks,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/studio/builder")({
  head: () => ({
    meta: [
      { title: "Editor — Pixels Studio" },
      { name: "description", content: "The Pixels Studio editor: paint tiles, place entities, wire logic, publish." },
    ],
  }),
  component: () => (
    <AppShell>
      <BuilderPage />
    </AppShell>
  ),
});

type ToolId = "select" | "brush" | "fill" | "eraser" | "place";
type DockTab = "layers" | "rules" | "logic" | "publish";

const tools: { id: ToolId; icon: typeof MousePointer2; label: string; hotkey: string }[] = [
  { id: "select", icon: MousePointer2, label: "Select", hotkey: "V" },
  { id: "brush", icon: Paintbrush, label: "Brush", hotkey: "B" },
  { id: "fill", icon: PaintBucket, label: "Fill", hotkey: "G" },
  { id: "eraser", icon: Eraser, label: "Eraser", hotkey: "E" },
  { id: "place", icon: Boxes, label: "Place Entity", hotkey: "P" },
];

const entityTypes = [
  { id: "spawn", label: "Spawn", icon: MapPin, tone: "green" as const },
  { id: "pickup", label: "Pickup", icon: CoinIcon, tone: "amber" as const },
  { id: "hazard", label: "Hazard", icon: Flame, tone: "red" as const },
  { id: "door", label: "Door", icon: DoorOpen, tone: "cyan" as const },
  { id: "platform", label: "Platform", icon: ArrowUpDown, tone: "violet" as const },
  { id: "checkpoint", label: "Checkpoint", icon: Flag, tone: "cyan" as const },
  { id: "goal", label: "Goal", icon: Trophy, tone: "magenta" as const },
  { id: "npc", label: "NPC", icon: User2, tone: "violet" as const },
];

const tileTypes = [
  { id: "floor", color: "oklch(0.32 0.05 300)" },
  { id: "wall", color: "oklch(0.55 0.22 340)" },
  { id: "glass", color: "oklch(0.72 0.15 200)" },
  { id: "grass", color: "oklch(0.55 0.18 145)" },
  { id: "lava", color: "oklch(0.60 0.22 30)" },
  { id: "void", color: "oklch(0.10 0.02 300)" },
];

const coachSteps = [
  { title: "Meet your canvas", body: "Paint tiles here. Drag to fill, right-click to erase." },
  { title: "Pick a tool", body: "Brush for tiles, Place-Entity for spawns, pickups, and hazards." },
  { title: "Inspect selection", body: "Click any tile or entity to edit its properties on the right." },
  { title: "Layer order matters", body: "Collision goes below decoration. Rearrange in the Layers dock." },
  { title: "Wire logic", body: "Open Logic → drag from an Event node's output to an Action node's input." },
  { title: "Playtest instantly", body: "Hit Playtest anytime. State resets when you close the preview." },
  { title: "Publish when ready", body: "Publish shows a checklist. Fix each item, hit ship, share the link." },
];

function BuilderPage() {
  const [tool, setTool] = useState<ToolId>("brush");
  const [tab, setTab] = useState<DockTab>("logic");
  const [tile, setTile] = useState("wall");
  const [entity, setEntity] = useState("spawn");
  const [selectedCell, setSelectedCell] = useState<{ x: number; y: number } | null>({ x: 6, y: 4 });
  const [coach, setCoach] = useState(0);
  const [coachOpen, setCoachOpen] = useState(true);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {/* Editor top bar */}
      <div className="h-12 border-b border-border/60 flex items-center px-4 gap-3 bg-[oklch(0.14_0.03_300)]/80">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 clip-hud-sm bg-primary/20 border border-primary/50" />
          <div className="font-mono text-sm truncate">rooftop_tag_arena.neolab</div>
          <Chip tone="violet" className="ml-2">Draft</Chip>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neon-green ml-3">
          <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
          Saved automatically · 3s ago
        </div>
        <div className="ml-auto flex items-center gap-2">
          <HudButton variant="ghost"><Download className="w-4 h-4" /> Import</HudButton>
          <HudButton variant="ghost"><Upload className="w-4 h-4" /> Export</HudButton>
          <HudButton variant="success"><Play className="w-4 h-4" /> Playtest</HudButton>
          <HudButton variant="primary" className="relative">
            <ClipboardCheck className="w-4 h-4" /> Publish
            <span className="absolute -top-1 -right-1 w-5 h-5 clip-hud-sm bg-neon-red text-white font-mono text-[10px] flex items-center justify-center border border-background">3</span>
          </HudButton>
        </div>
      </div>

      {/* Main layout: left tools · canvas · right inspector */}
      <div className="flex-1 flex min-h-0">
        {/* Left toolbar */}
        <div className="w-64 border-r border-border/60 bg-[oklch(0.13_0.03_300)]/70 flex flex-col">
          <div className="p-3 border-b border-border/40">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Tools</div>
            <div className="grid grid-cols-5 gap-1">
              {tools.map((t) => {
                const Icon = t.icon;
                const active = tool === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTool(t.id)}
                    title={`${t.label} (${t.hotkey})`}
                    className={`aspect-square clip-hud-sm flex items-center justify-center border transition ${
                      active
                        ? "bg-primary/20 text-primary border-primary/60 neon-border-magenta"
                        : "border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              <button className="h-9 clip-hud-sm border border-border/40 text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase">
                <Undo2 className="w-3.5 h-3.5" /> Undo
              </button>
              <button className="h-9 clip-hud-sm border border-border/40 text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase">
                <Redo2 className="w-3.5 h-3.5" /> Redo
              </button>
            </div>
          </div>

          {/* Contextual picker */}
          <div className="p-3 border-b border-border/40 flex-1 overflow-y-auto">
            {(tool === "brush" || tool === "fill" || tool === "eraser") && (
              <>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Tile palette</div>
                <div className="grid grid-cols-3 gap-2">
                  {tileTypes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTile(t.id)}
                      className={`aspect-square clip-hud-sm border-2 transition ${
                        tile === t.id ? "border-primary neon-border-magenta" : "border-border/40 hover:border-primary/40"
                      }`}
                      style={{ background: t.color }}
                      title={t.id}
                    />
                  ))}
                </div>
                <div className="mt-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Active: <span className="neon-text-magenta">{tile}</span>
                </div>
              </>
            )}
            {tool === "place" && (
              <>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Entities (14)</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {entityTypes.map((e) => {
                    const Icon = e.icon;
                    const active = entity === e.id;
                    return (
                      <button
                        key={e.id}
                        onClick={() => setEntity(e.id)}
                        className={`flex items-center gap-2 px-2 h-9 clip-hud-sm border text-xs transition ${
                          active ? "border-primary/70 bg-primary/10 text-foreground" : "border-border/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="font-mono truncate">{e.label}</span>
                      </button>
                    );
                  })}
                  <div className="col-span-2 mt-1 text-[10px] font-mono text-muted-foreground/70">+ 6 more (teleporter, sign, moving-platform, trigger, camera, zone)</div>
                </div>
              </>
            )}
            {tool === "select" && (
              <div className="text-xs text-muted-foreground font-mono">Click a tile or entity in the canvas.</div>
            )}
          </div>

          <div className="p-3 border-t border-border/40 text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center justify-between">
            <span>Grid 32×20</span>
            <span>Zoom 100%</span>
          </div>
        </div>

        {/* Canvas + bottom dock */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 relative overflow-hidden grid-canvas">
            <MiniMap />
            {/* Fake canvas art: tiles + entities */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative w-full max-w-4xl aspect-[16/10] hud-panel !p-0 overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-16 grid-rows-10" style={{ display: "grid", gridTemplateColumns: "repeat(16,1fr)", gridTemplateRows: "repeat(10,1fr)" }}>
                  {Array.from({ length: 160 }).map((_, i) => {
                    const x = i % 16;
                    const y = Math.floor(i / 16);
                    const isWall = y === 0 || y === 9 || x === 0 || x === 15 || (y === 5 && x > 3 && x < 12);
                    const isSelected = selectedCell?.x === x && selectedCell?.y === y;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedCell({ x, y })}
                        className={`border border-[oklch(0.30_0.05_300/0.35)] transition ${
                          isSelected ? "ring-1 ring-primary neon-border-magenta z-10" : ""
                        }`}
                        style={{
                          background: isWall ? "oklch(0.55 0.22 340 / 0.55)" : "transparent",
                        }}
                      />
                    );
                  })}
                </div>
                {/* Overlay entities */}
                <EntityMarker x={2} y={2} tone="green" icon={MapPin} label="P1" />
                <EntityMarker x={13} y={2} tone="green" icon={MapPin} label="P2" />
                <EntityMarker x={7} y={7} tone="amber" icon={CoinIcon} label="+50" />
                <EntityMarker x={4} y={7} tone="amber" icon={CoinIcon} label="+50" />
                <EntityMarker x={11} y={7} tone="red" icon={Flame} label="!" />
                <EntityMarker x={8} y={3} tone="magenta" icon={Trophy} label="GOAL" />
              </div>
            </div>

            {/* Coach mark spotlight (fake) */}
            {coachOpen && (
              <CoachMark step={coach} total={coachSteps.length}
                onNext={() => (coach + 1 < coachSteps.length ? setCoach(coach + 1) : setCoachOpen(false))}
                onSkip={() => setCoachOpen(false)}
              />
            )}

            {/* Floating Getting Started */}
            <div className="absolute right-4 bottom-4 w-72 hud-panel !p-4 neon-border-cyan">
              <div className="flex items-center gap-2 mb-2">
                <ListChecks className="w-4 h-4 neon-text-cyan" />
                <div className="text-[10px] font-mono uppercase tracking-widest neon-text-cyan">Getting Started · 3 left</div>
              </div>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-center gap-2"><span className="w-4 h-4 clip-hud-sm border border-primary/60 flex items-center justify-center text-primary">1</span>Place a second player spawn</li>
                <li className="flex items-center gap-2"><span className="w-4 h-4 clip-hud-sm border border-border flex items-center justify-center text-muted-foreground">2</span>Set win condition in Rules</li>
                <li className="flex items-center gap-2"><span className="w-4 h-4 clip-hud-sm border border-border flex items-center justify-center text-muted-foreground">3</span>Add a game title & thumbnail</li>
              </ul>
            </div>
          </div>

          {/* Bottom dock */}
          <BottomDock tab={tab} setTab={setTab} />
        </div>

        {/* Right inspector */}
        <div className="w-80 border-l border-border/60 bg-[oklch(0.13_0.03_300)]/70 flex flex-col">
          <div className="p-3 border-b border-border/40">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Inspector</div>
            {selectedCell ? (
              <div className="mt-1 flex items-center justify-between">
                <div className="font-mono text-sm">Tile ({selectedCell.x}, {selectedCell.y})</div>
                <Chip tone="magenta">Wall</Chip>
              </div>
            ) : (
              <div className="mt-1 text-sm text-muted-foreground">Select something to edit its properties</div>
            )}
          </div>
          {selectedCell && (
            <div className="p-3 space-y-3 overflow-y-auto flex-1">
              <PropField label="Layer" value="Collision" />
              <PropField label="Material" value="Neon Wall v2" />
              <PropField label="Collision" value="Solid" toggle />
              <PropField label="Tint" value="#F45BAF" swatch="oklch(0.72 0.28 340)" />
              <PropField label="Opacity" value="100%" slider={100} />
              <PropField label="Trigger on hit" value="—" muted />
              <div className="pt-3 border-t border-border/40">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Attached scripts</div>
                <div className="mt-2 text-xs text-muted-foreground italic">None. Open Logic to add.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EntityMarker({ x, y, tone, icon: Icon, label }: { x: number; y: number; tone: "green"|"amber"|"red"|"magenta"; icon: typeof MapPin; label: string }) {
  const colors = {
    green: "bg-neon-green/25 border-neon-green text-neon-green",
    amber: "bg-neon-amber/25 border-neon-amber neon-text-amber",
    red: "bg-neon-red/25 border-neon-red text-neon-red",
    magenta: "bg-primary/25 border-primary neon-text-magenta",
  };
  return (
    <div
      className={`absolute z-10 clip-hud-sm border ${colors[tone]} flex flex-col items-center justify-center px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest`}
      style={{ left: `${(x / 16) * 100}%`, top: `${(y / 10) * 100}%`, width: `${100 / 16}%`, height: `${100 / 10}%` }}
    >
      <Icon className="w-3 h-3" />
      <span className="mt-0.5 truncate">{label}</span>
    </div>
  );
}

function MiniMap() {
  return (
    <div className="absolute left-4 top-4 w-40 h-24 hud-panel !p-2 z-10">
      <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Minimap</div>
      <div className="h-14 grid-canvas relative">
        <div className="absolute inset-2 border border-primary/60" />
      </div>
    </div>
  );
}

function PropField({ label, value, toggle, slider, swatch, muted }: {
  label: string; value: string; toggle?: boolean; slider?: number; swatch?: string; muted?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`mt-1 flex items-center gap-2 h-8 px-2 clip-hud-sm border border-border/50 bg-background/40 ${muted ? "opacity-50" : ""}`}>
        {swatch && <span className="w-4 h-4 border border-border" style={{ background: swatch }} />}
        <span className="font-mono text-xs flex-1">{value}</span>
        {toggle && <span className="w-8 h-4 bg-primary/40 clip-hud-sm relative"><span className="absolute right-0.5 top-0.5 w-3 h-3 bg-primary" /></span>}
        {typeof slider === "number" && (
          <span className="w-16 h-1 bg-border/60 relative">
            <span className="absolute left-0 top-0 h-1 bg-primary" style={{ width: `${slider}%` }} />
          </span>
        )}
      </div>
    </div>
  );
}

function BottomDock({ tab, setTab }: { tab: DockTab; setTab: (t: DockTab) => void }) {
  const tabs: { id: DockTab; label: string; icon: typeof Layers }[] = [
    { id: "layers", label: "Layers", icon: Layers },
    { id: "rules", label: "Rules", icon: Sliders },
    { id: "logic", label: "Logic", icon: GitBranch },
    { id: "publish", label: "Publish", icon: ClipboardCheck },
  ];
  return (
    <div className="h-72 border-t border-border/60 bg-[oklch(0.13_0.03_300)]/80 flex flex-col">
      <div className="h-9 flex items-center border-b border-border/40 px-2 gap-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 h-7 clip-hud-sm text-[10px] font-mono uppercase tracking-widest transition ${
                active ? "bg-primary/15 text-primary border border-primary/50" : "text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
              {t.id === "publish" && <span className="ml-1 w-4 h-4 bg-neon-red text-white flex items-center justify-center text-[9px]">3</span>}
            </button>
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tab === "layers" && <LayersDock />}
        {tab === "rules" && <RulesDock />}
        {tab === "logic" && <LogicDock />}
        {tab === "publish" && <PublishDock />}
      </div>
    </div>
  );
}

function LayersDock() {
  const layers = [
    { name: "Foreground", type: "Decoration", visible: true },
    { name: "Entity", type: "Entities", visible: true },
    { name: "Decoration", type: "Overlay", visible: true },
    { name: "Collision", type: "Physics", visible: true },
    { name: "Terrain", type: "Base tiles", visible: true },
    { name: "Background", type: "Backdrop", visible: false },
  ];
  return (
    <div className="max-w-md">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Stack (top renders first)</div>
      {layers.map((l, i) => (
        <div key={l.name} className={`flex items-center gap-3 px-3 h-9 clip-hud-sm border ${i === 3 ? "border-primary/60 bg-primary/10" : "border-border/40"} mb-1`}>
          <span className={`w-2 h-2 ${l.visible ? "bg-neon-green" : "bg-border"}`} />
          <span className="font-mono text-xs flex-1">{l.name}</span>
          <span className="text-[10px] font-mono uppercase text-muted-foreground">{l.type}</span>
        </div>
      ))}
    </div>
  );
}

function RulesDock() {
  return (
    <div className="grid md:grid-cols-3 gap-4 max-w-4xl">
      <Slider label="Player speed" value={72} />
      <Slider label="Round time" value={45} suffix="s" />
      <Slider label="Win score" value={5} suffix="pts" />
      <Select label="Game mode" value="Tag · Rotating seeker" />
      <Select label="Seeker pulse" value="Every 10s · slow-mo" />
      <Select label="Respawn" value="On death · 3s delay" />
    </div>
  );
}
function Slider({ label, value, suffix = "%" }: { label: string; value: number; suffix?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
        <span className="text-muted-foreground">{label}</span>
        <span className="neon-text-magenta">{value}{suffix}</span>
      </div>
      <div className="mt-2 h-1.5 bg-border/60 relative">
        <div className="absolute h-full bg-primary" style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  );
}
function Select({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 h-9 px-3 clip-hud-sm border border-border/50 bg-background/40 flex items-center justify-between font-mono text-xs">
        <span>{value}</span>
        <span className="text-muted-foreground">▾</span>
      </div>
    </div>
  );
}

function LogicDock() {
  return (
    <div className="relative h-full min-h-[220px]">
      <div className="absolute inset-0 grid-canvas opacity-70 clip-hud-sm border border-border/40" />
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 220" preserveAspectRatio="none">
        <path d="M 155 40 C 220 40, 240 100, 320 100" stroke="var(--neon-cyan)" strokeWidth="2" fill="none" />
        <path d="M 155 120 C 220 120, 240 105, 320 100" stroke="var(--neon-cyan)" strokeWidth="2" fill="none" />
        <path d="M 470 100 C 550 100, 560 60, 640 60" stroke="var(--neon-magenta)" strokeWidth="2" fill="none" />
        <path d="M 470 100 C 550 100, 560 160, 640 160" stroke="var(--neon-magenta)" strokeWidth="2" fill="none" />
      </svg>
      <div className="relative flex items-start justify-between gap-6 p-4">
        <div className="space-y-4">
          <LogicNode kind="event" title="On Player Enter Zone" sub="zone=safe_house" />
          <LogicNode kind="event" title="On Timer Tick" sub="every 10s" />
        </div>
        <div className="pt-8">
          <LogicNode kind="condition" title="Variable Compare" sub="score ≥ 5" />
        </div>
        <div className="space-y-4">
          <LogicNode kind="action" title="Give Item" sub="→ pixel_shard × 1" />
          <LogicNode kind="action" title="End Round" sub="winner = current" />
        </div>
      </div>
      <div className="absolute bottom-2 right-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        <Chip tone="green">Event</Chip>
        <Chip tone="amber">Condition</Chip>
        <Chip tone="cyan">Action</Chip>
        <span>· drag wires between ports</span>
      </div>
    </div>
  );
}
function LogicNode({ kind, title, sub }: { kind: "event"|"condition"|"action"; title: string; sub: string }) {
  const tones = {
    event: "border-neon-green/60 bg-neon-green/10 text-neon-green",
    condition: "border-neon-amber/60 bg-neon-amber/10 neon-text-amber",
    action: "border-accent/60 bg-accent/10 neon-text-cyan",
  };
  return (
    <div className={`w-40 clip-hud-sm border ${tones[kind]} relative`}>
      <div className="px-2 py-1 text-[9px] font-mono uppercase tracking-widest border-b border-current/30">{kind}</div>
      <div className="px-2 py-2">
        <div className="text-xs font-semibold text-foreground">{title}</div>
        <div className="font-mono text-[10px] text-muted-foreground truncate">{sub}</div>
      </div>
      <span className="absolute -left-1.5 top-1/2 w-3 h-3 rounded-full bg-current border-2 border-background" />
      <span className="absolute -right-1.5 top-1/2 w-3 h-3 rounded-full bg-current border-2 border-background" />
    </div>
  );
}

function PublishDock() {
  const items = [
    { ok: true, title: "Set a title", detail: "'Rooftop Tag Arena'" },
    { ok: true, title: "Choose a template category", detail: "PvP · Casual" },
    { ok: false, title: "Add a cover thumbnail", detail: "Recommended 1200×675, PNG or JPG." },
    { ok: false, title: "Set a second player spawn", detail: "PvP games need at least 2 spawn points." },
    { ok: false, title: "Choose your PIXELS price", detail: "Free is fine. So is 500. Pick something." },
    { ok: true, title: "Rules pass linter", detail: "No infinite loops detected" },
    { ok: true, title: "Assets under 25 MB", detail: "8.4 MB used" },
  ];
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Blocking publish · 3 open</div>
        <HudButton variant="primary" className="h-8"><Sparkles className="w-3.5 h-3.5" /> Auto-fix suggestions</HudButton>
      </div>
      {items.map((it, i) => (
        <div key={i} className={`flex items-start gap-3 p-3 clip-hud-sm border ${it.ok ? "border-border/40 opacity-70" : "border-neon-red/40 bg-neon-red/5"} mb-1.5`}>
          {it.ok ? <CheckCircle2 className="w-4 h-4 text-neon-green mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-neon-red mt-0.5" />}
          <div className="flex-1">
            <div className="text-sm font-semibold">{it.title}</div>
            <div className="text-xs text-muted-foreground">{it.detail}</div>
          </div>
          {!it.ok && (
            <button className="text-[10px] font-mono uppercase tracking-widest neon-text-magenta flex items-center gap-1">
              Fix this <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function CoachMark({ step, total, onNext, onSkip }: { step: number; total: number; onNext: () => void; onSkip: () => void }) {
  const s = coachSteps[step];
  const positions = [
    { top: "45%", left: "45%" },
    { top: "20%", left: "5%" },
    { top: "45%", right: "6%" },
    { bottom: "6%", left: "6%" },
    { bottom: "35%", left: "35%" },
    { top: "6%", right: "20%" },
    { top: "6%", right: "6%" },
  ];
  const pos = positions[step];
  return (
    <>
      <div className="absolute inset-0 bg-black/50 z-20 pointer-events-none" />
      <div
        className="absolute z-30 w-72 hud-panel !p-4 neon-border-magenta"
        style={pos}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-mono uppercase tracking-widest neon-text-magenta">Step {step + 1} of {total}</div>
          <button onClick={onSkip} className="text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>
        </div>
        <div className="text-sm font-semibold">{s.title}</div>
        <div className="mt-1 text-xs text-muted-foreground">{s.body}</div>
        <div className="mt-3 flex items-center justify-between">
          <button onClick={onSkip} className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground">Skip tour</button>
          <HudButton variant="primary" className="h-8" onClick={onNext}>
            {step + 1 === total ? "Done" : "Next"} <ArrowRight className="w-3.5 h-3.5" />
          </HudButton>
        </div>
        <div className="mt-3 flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={`h-1 flex-1 ${i <= step ? "bg-primary" : "bg-border/60"}`} />
          ))}
        </div>
      </div>
    </>
  );
}
