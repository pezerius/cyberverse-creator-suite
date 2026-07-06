export type Change = {
  version: string;
  date: string;
  tag: "shipped" | "beta" | "hotfix";
  headline: string;
  bullets: { kind: "new" | "fix" | "improve"; text: string }[];
};

export const changelog: Change[] = [
  {
    version: "v0.9.4",
    date: "Oct 28, 2026",
    tag: "shipped",
    headline: "Wallet, notifications, ⌘K command bar.",
    bullets: [
      { kind: "new", text: "Wallet with payout scheduling and $PIXEL → USD conversion." },
      { kind: "new", text: "Notifications inbox with sale, review, and moderation alerts." },
      { kind: "new", text: "Command palette (⌘K) — jump anywhere in two keystrokes." },
      { kind: "improve", text: "Marketplace supports free assets and improved filter chips." },
    ],
  },
  {
    version: "v0.9.3",
    date: "Oct 14, 2026",
    tag: "shipped",
    headline: "List-an-asset flow + asset detail pages.",
    bullets: [
      { kind: "new", text: "Multi-step listing wizard for sprites, SFX, and tilesets." },
      { kind: "new", text: "Rich asset detail pages with reviews and creator card." },
      { kind: "improve", text: "Redesign to the chunky-sticker aesthetic." },
    ],
  },
  {
    version: "v0.9.2",
    date: "Sep 30, 2026",
    tag: "shipped",
    headline: "Growth dashboard.",
    bullets: [
      { kind: "new", text: "KPI band with revenue, active players, plays, rating." },
      { kind: "new", text: "Per-period revenue and retention charts." },
      { kind: "fix", text: "Fixed HUD rendering glitch on Firefox 130." },
    ],
  },
  {
    version: "v0.9.1",
    date: "Sep 12, 2026",
    tag: "hotfix",
    headline: "Editor stability + payment modal.",
    bullets: [
      { kind: "fix", text: "Editor no longer freezes when importing >4MB spritesheets." },
      { kind: "new", text: "In-editor license checkout with tax breakdown." },
    ],
  },
  {
    version: "v0.9.0",
    date: "Aug 20, 2026",
    tag: "beta",
    headline: "Pixels Studio open beta.",
    bullets: [
      { kind: "new", text: "Templates, visual editor, publishing to the Pixels Hub." },
      { kind: "new", text: "60/40 revenue share on the Free tier." },
    ],
  },
];
