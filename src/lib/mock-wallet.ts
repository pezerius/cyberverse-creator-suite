export type Txn = {
  id: string;
  when: string;
  kind: "sale" | "purchase" | "payout" | "topup" | "royalty" | "fee";
  memo: string;
  amount: number; // positive = credit, negative = debit
  status: "settled" | "pending" | "escrow";
};

export const balance = {
  available: 12480,
  pending: 8340,
  escrow: 1200,
  lifetimeEarned: 148_920,
  lifetimeSpent: 22_450,
  nextPayoutDate: "Nov 1",
  nextPayoutAmount: 24_300,
  usdRate: 0.014, // 1 $PIXEL = $0.014
};

export const transactions: Txn[] = [
  { id: "tx_08421", when: "Today · 14:12", kind: "sale", memo: "License · Chrome Alley Tileset → @drift.dev", amount: 1140, status: "settled" },
  { id: "tx_08419", when: "Today · 11:03", kind: "sale", memo: "License · Runner Sprite Pack v3 → @holo.studio", amount: 760, status: "escrow" },
  { id: "tx_08417", when: "Yesterday · 20:45", kind: "sale", memo: "License · Bassline / SFX 07 → @bytebrawl", amount: 11400, status: "escrow" },
  { id: "tx_08414", when: "Yesterday · 09:22", kind: "purchase", memo: "License · Neon Rooftops Set from @nightbird", amount: -1520, status: "settled" },
  { id: "tx_08410", when: "2 days ago", kind: "royalty", memo: "Weekly royalty · Neon Rush game plays", amount: 3480, status: "settled" },
  { id: "tx_08405", when: "3 days ago", kind: "sale", memo: "License · Cyber Fauna Sprites → @ui.forge", amount: 7600, status: "settled" },
  { id: "tx_08398", when: "5 days ago", kind: "fee",     memo: "Platform fee · 5% of tx_08405", amount: -400, status: "settled" },
  { id: "tx_08390", when: "1 week ago", kind: "topup",   memo: "Top-up · Visa •••• 4290", amount: 5000, status: "settled" },
  { id: "tx_08380", when: "1 week ago", kind: "payout",  memo: "Payout to Coinbase wallet 0x82…3a1e", amount: -18000, status: "settled" },
  { id: "tx_08375", when: "2 weeks ago", kind: "royalty", memo: "Weekly royalty · Neon Rush game plays", amount: 4120, status: "settled" },
];

// last 14 days sparkline for earnings
export const earningsSeries = [820, 1120, 640, 1580, 2100, 1740, 1980, 2440, 1860, 3120, 2700, 3480, 2900, 4210];
