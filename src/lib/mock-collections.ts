export type Collection = {
  id: string; slug: string; title: string; curator: string;
  description: string; assetIds: string[];
  price: number; originalPrice: number; discount: number;
  grad: string; emoji: string; badge?: string;
  downloads: number;
};

export const collections: Collection[] = [
  { id: "cl1", slug: "cyberpunk-starter", title: "Cyberpunk Starter Kit", curator: "grid_kid",
    description: "Everything you need to ship a neon-noir game in a weekend — tileset, character rig, UI kit, SFX bank.",
    assetIds: ["a1", "a2", "a3", "a4"], price: 3200, originalPrice: 4400, discount: 27,
    grad: "from-primary/60 to-[oklch(0.72_0.18_290)]/40", emoji: "🌆", badge: "Bestseller", downloads: 1240 },
  { id: "cl2", slug: "zen-garden-bundle", title: "Zen Garden Bundle", curator: "moss.city",
    description: "Three cozy tilesets and an ambient SFX pack for making low-stakes, high-vibe games.",
    assetIds: ["a1", "a4"], price: 1800, originalPrice: 2400, discount: 25,
    grad: "from-accent/50 to-[oklch(0.85_0.10_180)]/30", emoji: "🪷", downloads: 384 },
  { id: "cl3", slug: "combat-essentials", title: "Combat Essentials", curator: "808heart",
    description: "Impact SFX bank + character rig + weapon sprites. Everything punchy.",
    assetIds: ["a2", "a3"], price: 2400, originalPrice: 3200, discount: 25,
    grad: "from-[oklch(0.75_0.20_50)]/60 to-primary/30", emoji: "⚔", badge: "New", downloads: 128 },
];

export function getCollection(slug: string) { return collections.find(c => c.slug === slug); }
