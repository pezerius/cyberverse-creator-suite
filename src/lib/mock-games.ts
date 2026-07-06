export type Game = {
  slug: string; title: string; tagline: string; creator: string; creatorHandle: string;
  price: string; free?: boolean; grad: string; emoji: string;
  plays: string; rating: number; reviews: number;
  description: string;
  screenshots: { emoji: string; grad: string; caption: string }[];
  trailer: { grad: string; emoji: string; duration: string };
  tags: string[];
  updated: string; version: string;
  players: string; sessionAvg: string;
  splits?: { handle: string; role: string; percent: number }[];
};

export const games: Record<string, Game> = {
  "blade-runners-4884": {
    slug: "blade-runners-4884", title: "Blade Runners 4884", tagline: "Neon-noir rooftop parkour with online crews of 8.",
    creator: "Synth Kid", creatorHandle: "synthkid",
    price: "800 PX", grad: "from-primary/60 to-[oklch(0.72_0.18_290)]/40", emoji: "🏙",
    plays: "142,410", rating: 4.9, reviews: 3241,
    description: "A rain-slicked cyberpunk sandbox where rooftop crews of up to eight run parkour missions across a hand-crafted 6-district city. Ships with a co-op story campaign, ranked capture-the-flag, and a level editor built on the Pixels Studio scene tools.",
    screenshots: [
      { emoji: "🌆", grad: "from-primary/60 to-[oklch(0.72_0.18_290)]/40", caption: "Downtown at dusk — rain-shader pass" },
      { emoji: "🏢", grad: "from-[oklch(0.72_0.18_290)]/50 to-accent/30", caption: "Rooftop chase — Sector 4" },
      { emoji: "🚁", grad: "from-primary/70 to-[oklch(0.75_0.20_50)]/40", caption: "Extraction sequence" },
      { emoji: "🎯", grad: "from-[oklch(0.75_0.20_50)]/50 to-primary/40", caption: "Ranked CTF finale" },
    ],
    trailer: { grad: "from-primary/60 to-[oklch(0.72_0.18_290)]/40", emoji: "▶", duration: "1:42" },
    tags: ["cyberpunk", "parkour", "co-op", "8-player", "sandbox"],
    updated: "4 days ago", version: "v2.3.1",
    players: "1–8", sessionAvg: "38 min",
    splits: [
      { handle: "synthkid", role: "Design + code", percent: 70 },
      { handle: "808heart", role: "Music + SFX", percent: 20 },
      { handle: "grid_kid", role: "Tileset artist", percent: 10 },
    ],
  },
  "neon-snake": {
    slug: "neon-snake", title: "Neon Snake++", tagline: "The classic, but with weapons, factions, and a battle pass.",
    creator: "NX", creatorHandle: "nx", free: true,
    price: "Free", grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/30", emoji: "🐍",
    plays: "231,004", rating: 4.8, reviews: 8912,
    description: "Snake reimagined for the CyberVerse: pick a faction, level up your loadout, and eat everything on the grid — including other players.",
    screenshots: [
      { emoji: "🐍", grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/30", caption: "Grid warfare" },
      { emoji: "⚡", grad: "from-[oklch(0.85_0.10_180)]/50 to-accent/40", caption: "Overcharge mode" },
    ],
    trailer: { grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/30", emoji: "▶", duration: "0:58" },
    tags: ["arcade", "free-to-play", "pvp", "seasonal"],
    updated: "yesterday", version: "v4.1",
    players: "1–16", sessionAvg: "12 min",
    splits: [{ handle: "nx", role: "Solo dev", percent: 100 }],
  },
  "grid-duel": {
    slug: "grid-duel", title: "Grid Duel", tagline: "1v1 tactical mecha combat on a shrinking hex grid.",
    creator: "Ono", creatorHandle: "ono",
    price: "400 PX", grad: "from-[oklch(0.75_0.20_50)]/60 to-primary/30", emoji: "⚔",
    plays: "48,220", rating: 4.4, reviews: 621,
    description: "Turn-based mecha duels with a rock-paper-scissors weapon triangle and a hex grid that collapses inward every 5 turns.",
    screenshots: [{ emoji: "⚔", grad: "from-[oklch(0.75_0.20_50)]/60 to-primary/30", caption: "Best of 3 finals" }],
    trailer: { grad: "from-[oklch(0.75_0.20_50)]/60 to-primary/30", emoji: "▶", duration: "1:12" },
    tags: ["tactics", "1v1", "ranked"],
    updated: "1 week ago", version: "v1.6",
    players: "2", sessionAvg: "8 min",
  },
  "koan-garden": {
    slug: "koan-garden", title: "Kōan Garden", tagline: "A meditative sandbox where you tend a self-growing pixel garden.",
    creator: "Moss City", creatorHandle: "moss.city", free: true,
    price: "Free", grad: "from-accent/50 to-[oklch(0.85_0.10_180)]/30", emoji: "🪷",
    plays: "78,400", rating: 4.8, reviews: 1802,
    description: "Zero fail states. Plant, prune, and share seeds with friends. Weather syncs to your local time.",
    screenshots: [{ emoji: "🪷", grad: "from-accent/50 to-[oklch(0.85_0.10_180)]/30", caption: "Spring bloom" }],
    trailer: { grad: "from-accent/50 to-[oklch(0.85_0.10_180)]/30", emoji: "▶", duration: "0:42" },
    tags: ["zen", "sandbox", "cozy", "free-to-play"],
    updated: "2 days ago", version: "v2.0",
    players: "1–4", sessionAvg: "22 min",
  },
};

export function getGame(slug: string) { return games[slug]; }
export const gamesList = Object.values(games);
