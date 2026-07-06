// Live rooms, friends presence, feed, chat
export type Presence = "online" | "in-game" | "idle" | "offline";
export type Friend = {
  handle: string; name: string; avatar: string; presence: Presence;
  activity?: string; game?: string; mutual?: number;
};

export const friends: Friend[] = [
  { handle: "synthkid", name: "Synth Kid", avatar: "SK", presence: "in-game", activity: "Playing Blade Runners 4884", game: "blade-runners-4884", mutual: 12 },
  { handle: "moss.city", name: "Moss City", avatar: "MC", presence: "online", activity: "Editing Kōan Garden v2", mutual: 8 },
  { handle: "pixel.moth", name: "Pixel Moth", avatar: "PM", presence: "in-game", activity: "Playing Grid Duel", game: "grid-duel", mutual: 21 },
  { handle: "808heart", name: "808 Heart", avatar: "8H", presence: "idle", activity: "AFK · Kitchen", mutual: 4 },
  { handle: "grid_kid", name: "Grid Kid", avatar: "GK", presence: "online", activity: "Browsing Marketplace", mutual: 15 },
  { handle: "vector", name: "Vector", avatar: "VC", presence: "offline", activity: "Last seen 2h ago", mutual: 3 },
  { handle: "nightbird", name: "Nightbird", avatar: "NB", presence: "in-game", activity: "Streaming Neon Snake++", game: "neon-snake", mutual: 9 },
  { handle: "drift", name: "Drift", avatar: "DR", presence: "online", activity: "In Party Hub", mutual: 6 },
];

export type Room = {
  id: string; name: string; host: string; game: string; gameSlug: string;
  players: number; capacity: number; grad: string; emoji: string;
  region: string; ping: number; visibility: "public" | "friends" | "invite";
  voice: boolean; tags: string[]; invite: string;
};

export const rooms: Room[] = [
  { id: "rm_01", name: "Rooftop crew — no snipers", host: "synthkid", game: "Blade Runners 4884", gameSlug: "blade-runners-4884", players: 6, capacity: 8, grad: "from-primary/60 to-[oklch(0.72_0.18_290)]/40", emoji: "🏙", region: "NA-East", ping: 42, visibility: "public", voice: true, tags: ["ranked", "mic-required"], invite: "PX-RUN-4884" },
  { id: "rm_02", name: "Chill garden speedrun", host: "moss.city", game: "Kōan Garden", gameSlug: "koan-garden", players: 3, capacity: 4, grad: "from-accent/50 to-[oklch(0.85_0.10_180)]/30", emoji: "🪷", region: "EU-West", ping: 88, visibility: "public", voice: false, tags: ["chill", "beginner-ok"], invite: "PX-ZEN-0421" },
  { id: "rm_03", name: "Grid Duel tournament — night 3", host: "pixel.moth", game: "Grid Duel", gameSlug: "grid-duel", players: 12, capacity: 16, grad: "from-[oklch(0.75_0.20_50)]/60 to-primary/30", emoji: "⚔", region: "NA-West", ping: 61, visibility: "public", voice: true, tags: ["tournament", "prize-pool"], invite: "PX-GRID-T3" },
  { id: "rm_04", name: "Snake++ playtest w/ dev", host: "nightbird", game: "Neon Snake++", gameSlug: "neon-snake", players: 4, capacity: 8, grad: "from-accent/60 to-[oklch(0.85_0.10_180)]/30", emoji: "🐍", region: "NA-East", ping: 38, visibility: "friends", voice: true, tags: ["playtest", "feedback-welcome"], invite: "PX-SNAKE-PT" },
  { id: "rm_05", name: "Karaoke rooftop — bring bangers", host: "drift", game: "Karaoke Rooftop", gameSlug: "karaoke-rooftop", players: 5, capacity: 12, grad: "from-[oklch(0.72_0.18_290)]/50 to-primary/30", emoji: "🎤", region: "APAC", ping: 148, visibility: "public", voice: true, tags: ["party", "mic-required"], invite: "PX-KRK-99" },
  { id: "rm_06", name: "Slum Speedway TT #7", host: "grid_kid", game: "Slum Speedway", gameSlug: "slum-speedway", players: 2, capacity: 6, grad: "from-[oklch(0.75_0.20_50)]/50 to-accent/40", emoji: "🏎", region: "NA-Central", ping: 55, visibility: "invite", voice: false, tags: ["time-trial"], invite: "PX-SPD-TT7" },
];

export type ChatMsg = { id: string; author: string; body: string; ts: string; kind?: "system" | "msg" | "invite" };
export const roomChat: ChatMsg[] = [
  { id: "c1", author: "system", body: "Room created by @synthkid.", ts: "9:04 PM", kind: "system" },
  { id: "c2", author: "synthkid", body: "hey welcome — bring headset", ts: "9:05 PM" },
  { id: "c3", author: "grid_kid", body: "queueing, one sec", ts: "9:06 PM" },
  { id: "c4", author: "nightbird", body: "gg last round", ts: "9:07 PM" },
  { id: "c5", author: "system", body: "@pixel.moth joined the room.", ts: "9:08 PM", kind: "system" },
  { id: "c6", author: "pixel.moth", body: "ready when u are", ts: "9:09 PM" },
];

export type FeedEvent = {
  id: string; ts: string;
  who: string; whoAvatar: string;
  kind: "played" | "shipped" | "listed" | "reviewed" | "followed" | "achievement" | "purchased" | "streamed";
  what: string; target?: string; targetType?: "game" | "asset" | "creator";
  meta?: string; icon?: string;
};

export const feed: FeedEvent[] = [
  { id: "f1", ts: "just now", who: "synthkid", whoAvatar: "SK", kind: "played", what: "Blade Runners 4884", target: "blade-runners-4884", targetType: "game", meta: "42 min · new personal best 12,480" },
  { id: "f2", ts: "6m", who: "pixel.moth", whoAvatar: "PM", kind: "shipped", what: "Runner Sprite Pack v3.1", target: "a2", targetType: "asset", meta: "Version bump · added wall-slide anim" },
  { id: "f3", ts: "12m", who: "grid_kid", whoAvatar: "GK", kind: "reviewed", what: "Chrome Alley Tileset", target: "a1", targetType: "asset", meta: "★★★★★ · 'auto-tile rules are chef's kiss'" },
  { id: "f4", ts: "34m", who: "moss.city", whoAvatar: "MC", kind: "listed", what: "Zen Bundle · 3 tilesets", targetType: "asset", meta: "Bundle · save 25%" },
  { id: "f5", ts: "1h", who: "nightbird", whoAvatar: "NB", kind: "streamed", what: "Live: Snake++ playtest", target: "neon-snake", targetType: "game", meta: "142 watching" },
  { id: "f6", ts: "2h", who: "drift", whoAvatar: "DR", kind: "achievement", what: "Reached Realm-7 top 100", meta: "Ranked #94" },
  { id: "f7", ts: "3h", who: "808heart", whoAvatar: "8H", kind: "purchased", what: "Neon Rooftops Set", target: "a4", targetType: "asset", meta: "License: All My Games" },
  { id: "f8", ts: "5h", who: "vector", whoAvatar: "VC", kind: "followed", what: "@pixel.moth", target: "pixel.moth", targetType: "creator" },
];
