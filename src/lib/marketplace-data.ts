import { Music2, Palette, Grid3x3 } from "lucide-react";

export type License = "Single Game" | "All My Games" | "Resellable";
export type AssetType = "Sprites" | "SFX" | "Tileset";

export type Asset = {
  id: string;
  name: string;
  artist: string;
  type: AssetType;
  license: License;
  price: number;
  rating: number;
  downloads: number;
  featured?: boolean;
  new?: boolean;
  free?: boolean;
  grad: string;
  icon: typeof Music2;
  // extended detail fields
  description?: string;
  fileSize?: string;
  format?: string;
  dimensions?: string;
  tags?: string[];
  updatedAt?: string;
  version?: string;
  compatibility?: string[];
};

export const assets: Asset[] = [
  {
    id: "a1", name: "Chrome Alley Tileset", artist: "@grid_kid", type: "Tileset", license: "All My Games",
    price: 1200, rating: 4.8, downloads: 2841, featured: true,
    grad: "from-primary/50 to-[oklch(0.72_0.18_290)]/40", icon: Grid3x3,
    description: "128 hand-pixeled tiles for gritty back-alley scenes — rain-slick asphalt, chain-link, neon signage, dumpster clutter. Snaps to a 16px grid and ships with auto-tiling rules for the Pixels Studio tilemap tool.",
    fileSize: "4.2 MB", format: "PNG + TSX", dimensions: "16×16 px tiles · 128 total",
    tags: ["cyberpunk", "urban", "night", "auto-tile"], updatedAt: "2 weeks ago", version: "v1.4",
    compatibility: ["Pixels Studio v3+", "Tiled 1.9+"],
  },
  {
    id: "a2", name: "Runner Sprite Pack v3", artist: "@pixel.moth", type: "Sprites", license: "Single Game",
    price: 800, rating: 4.6, downloads: 1420, new: true,
    grad: "from-accent/60 to-primary/20", icon: Palette,
    description: "A parkour-ready runner with 6-direction locomotion, wall-jump, slide, and hit-react animations. Rigged to the standard Pixels humanoid skeleton.",
    fileSize: "2.1 MB", format: "PNG spritesheet + JSON", dimensions: "32×32 px · 84 frames",
    tags: ["character", "runner", "animated", "rigged"], updatedAt: "3 days ago", version: "v3.0",
    compatibility: ["Pixels Studio v3+"],
  },
  {
    id: "a3", name: "Bassline / SFX 07", artist: "@808heart", type: "SFX", license: "Resellable",
    price: 2400, rating: 4.9, downloads: 892, featured: true,
    grad: "from-[oklch(0.75_0.20_50)]/50 to-primary/30", icon: Music2,
    description: "A pack of 42 sub-heavy bass hits, risers, and stingers designed to sit under UI clicks and combat impacts without stepping on your music bed.",
    fileSize: "88 MB", format: "WAV 48kHz + OGG", dimensions: "42 clips · avg 1.6s",
    tags: ["bass", "impact", "riser", "ui"], updatedAt: "1 month ago", version: "v1.1",
    compatibility: ["Any engine"],
  },
  {
    id: "a4", name: "Neon Rooftops Set", artist: "@nightbird", type: "Tileset", license: "All My Games",
    price: 1600, rating: 4.7, downloads: 3120,
    grad: "from-[oklch(0.72_0.18_290)]/50 to-accent/40", icon: Grid3x3,
    description: "Skyline rooftops with AC units, antenna arrays, holo-billboards, and skyway bridges. Perfect for aerial chase levels.",
    fileSize: "6.8 MB", format: "PNG + TSX", dimensions: "16×16 px tiles · 210 total",
    tags: ["rooftop", "skyline", "neon", "parallax"], updatedAt: "1 week ago", version: "v2.0",
    compatibility: ["Pixels Studio v3+", "Tiled 1.9+"],
  },
  {
    id: "a5", name: "8-bit Blaster SFX", artist: "@zap", type: "SFX", license: "Single Game",
    price: 0, rating: 4.3, downloads: 5210, free: true,
    grad: "from-destructive/40 to-[oklch(0.75_0.20_50)]/40", icon: Music2,
    description: "24 chiptune blaster sounds — pew, thump, charge, overheat. Free forever, credit appreciated.",
    fileSize: "3.1 MB", format: "WAV + OGG", dimensions: "24 clips · avg 0.4s",
    tags: ["chiptune", "blaster", "retro", "free"], updatedAt: "5 months ago", version: "v1.0",
    compatibility: ["Any engine"],
  },
  {
    id: "a6", name: "Cyber Fauna Sprites", artist: "@fauna.exe", type: "Sprites", license: "Resellable",
    price: 3200, rating: 4.9, downloads: 611, new: true,
    grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/40", icon: Palette,
    description: "18 augmented creatures — chrome-plated wolves, drone-flocks, neon jellyfish. Idle, move, attack, and death animations per creature.",
    fileSize: "12.4 MB", format: "PNG spritesheet + JSON", dimensions: "48×48 px · 480 frames",
    tags: ["enemy", "creature", "animated", "boss"], updatedAt: "6 days ago", version: "v1.2",
    compatibility: ["Pixels Studio v3+"],
  },
  {
    id: "a7", name: "Rainy Street Loops", artist: "@wet.sfx", type: "SFX", license: "All My Games",
    price: 900, rating: 4.5, downloads: 1780,
    grad: "from-[oklch(0.85_0.10_180)]/60 to-[oklch(0.72_0.18_290)]/40", icon: Music2,
    description: "8 seamless ambience loops — light drizzle, heavy downpour, distant thunder, wet footsteps on concrete. Loop points marked.",
    fileSize: "62 MB", format: "WAV 48kHz stereo", dimensions: "8 loops · 30-90s",
    tags: ["ambience", "rain", "loop", "city"], updatedAt: "3 weeks ago", version: "v1.0",
    compatibility: ["Any engine"],
  },
  {
    id: "a8", name: "Arcade UI Sprites", artist: "@ui.forge", type: "Sprites", license: "Single Game",
    price: 0, rating: 4.4, downloads: 2350, free: true,
    grad: "from-primary/40 to-accent/40", icon: Palette,
    description: "A complete arcade HUD kit — buttons, panels, meters, cursor states. Free for indie devs under 10k MAU.",
    fileSize: "1.4 MB", format: "PNG + 9-slice JSON", dimensions: "Various · 60 elements",
    tags: ["ui", "hud", "arcade", "free"], updatedAt: "2 months ago", version: "v1.3",
    compatibility: ["Pixels Studio v3+"],
  },
];

export const licenseTone: Record<License, "cyan" | "amber" | "magenta"> = {
  "Single Game": "cyan", "All My Games": "amber", Resellable: "magenta",
};

export function getAsset(id: string): Asset | undefined {
  return assets.find((a) => a.id === id);
}
