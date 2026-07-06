export type PublicCreator = {
  handle: string; name: string; avatar: string; bio: string;
  joined: string; followers: number; following: number;
  totalPlays: string; totalSales: string; rating: number;
  badges: string[]; region: string;
  games: string[]; // game slugs
  assets: string[]; // asset ids
  socials?: { label: string; url: string }[];
};

export const creators: Record<string, PublicCreator> = {
  synthkid: {
    handle: "synthkid", name: "Synth Kid", avatar: "SK",
    bio: "Solo dev · noir sandboxes · currently shipping Blade Runners 4884 v2.4. Available for jam collabs.",
    joined: "2085-11", followers: 18420, following: 84,
    totalPlays: "142,410", totalSales: "1,204,800 PX", rating: 4.9,
    badges: ["Pixels Pro", "Top 100 Realm-7", "Verified"], region: "NA-East",
    games: ["blade-runners-4884"], assets: [],
    socials: [{ label: "twitter", url: "@synthkid_dev" }, { label: "site", url: "synthkid.games" }],
  },
  "pixel.moth": {
    handle: "pixel.moth", name: "Pixel Moth", avatar: "PM",
    bio: "Character artist. Rigged sprites for 60+ games. Commissions open.",
    joined: "2086-02", followers: 9840, following: 210,
    totalPlays: "0", totalSales: "384,200 PX", rating: 4.7,
    badges: ["Pixels Pro", "Trusted Seller"], region: "EU-West",
    games: [], assets: ["a2"],
  },
  "moss.city": {
    handle: "moss.city", name: "Moss City", avatar: "MC",
    bio: "Making cozy games for the CyberVerse. She/her.",
    joined: "2085-08", followers: 12100, following: 340,
    totalPlays: "78,400", totalSales: "0 PX", rating: 4.8,
    badges: ["Community Favorite", "Verified"], region: "NA-West",
    games: ["koan-garden"], assets: [],
  },
  grid_kid: {
    handle: "grid_kid", name: "Grid Kid", avatar: "GK",
    bio: "Tileset guy. If it snaps to 16px I probably made it.",
    joined: "2086-05", followers: 6210, following: 42,
    totalPlays: "0", totalSales: "512,800 PX", rating: 4.9,
    badges: ["Trusted Seller"], region: "NA-Central",
    games: [], assets: ["a1"],
  },
  nx: {
    handle: "nx", name: "NX (you)", avatar: "NX",
    bio: "Ship weekly. Snake++, Rooftop Tag, Grid Duel spin-offs. Playtesters wanted.",
    joined: "2085-06", followers: 24800, following: 512,
    totalPlays: "347,674", totalSales: "982,400 PX", rating: 4.6,
    badges: ["Pixels Pro", "Founding Creator", "Verified"], region: "NA-East",
    games: ["neon-snake"], assets: [],
  },
};

export function getCreator(handle: string) { return creators[handle]; }
