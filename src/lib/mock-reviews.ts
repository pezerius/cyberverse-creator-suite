export type Review = {
  id: string; author: string; avatar: string; rating: number; ts: string;
  body: string; helpful: number; verified?: boolean;
  response?: { author: string; ts: string; body: string };
};

export const assetReviews: Record<string, Review[]> = {
  a1: [
    { id: "r1", author: "grid_kid", avatar: "GK", rating: 5, ts: "3d ago", verified: true, helpful: 42,
      body: "The auto-tile rules just work. Dropped it into my noir game and had a full alley scene in 20 minutes. Rain-slick asphalt variants are the standout.",
      response: { author: "grid_kid (creator)", ts: "2d ago", body: "Thanks! v1.5 will add neon puddle reflections — dropping next week for free to license holders." } },
    { id: "r2", author: "vector", avatar: "VC", rating: 4, ts: "1w ago", verified: true, helpful: 18,
      body: "Great pack. Only knock: chain-link fence tile needs a lit variant for night scenes. Otherwise gorgeous." },
    { id: "r3", author: "drift", avatar: "DR", rating: 5, ts: "2w ago", verified: true, helpful: 31,
      body: "Best tileset in the marketplace right now. Used it in my speedway game — check my profile." },
  ],
  a2: [
    { id: "r4", author: "synthkid", avatar: "SK", rating: 5, ts: "2d ago", verified: true, helpful: 27,
      body: "Rig snaps into the standard skeleton perfectly. Wall-jump timing feels right." },
    { id: "r5", author: "moss.city", avatar: "MC", rating: 4, ts: "5d ago", verified: true, helpful: 12,
      body: "Solid pack. Would love a swim cycle in the next version." },
  ],
  a3: [
    { id: "r6", author: "nightbird", avatar: "NB", rating: 5, ts: "6d ago", verified: true, helpful: 54,
      body: "The sub-hits sit under my music without stepping on the kick. Chef." },
  ],
};

export const gameReviews: Record<string, Review[]> = {
  "blade-runners-4884": [
    { id: "gr1", author: "grid_kid", avatar: "GK", rating: 5, ts: "1d ago", verified: true, helpful: 88,
      body: "Best neon-noir sandbox on the Hub. Rooftop parkour is buttery. The rain shader alone is worth the ticket." },
    { id: "gr2", author: "moss.city", avatar: "MC", rating: 4, ts: "4d ago", verified: true, helpful: 33,
      body: "Fantastic vibes and world design. Combat could use more variety — but this is a solo-dev game, so I'm impressed.",
      response: { author: "synthkid (creator)", ts: "3d ago", body: "Combat rework is the next patch — thanks for the honest review!" } },
    { id: "gr3", author: "pixel.moth", avatar: "PM", rating: 5, ts: "1w ago", verified: true, helpful: 21,
      body: "Bought the resellable license for a spin-off. Community server has been super helpful." },
  ],
};
