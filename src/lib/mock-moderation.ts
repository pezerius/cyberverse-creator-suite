export type Report = {
  id: string; ts: string; reporter: string;
  targetType: "asset" | "game" | "user" | "review";
  target: string; targetLabel: string;
  reason: "IP theft" | "NSFW" | "Spam" | "Harassment" | "Broken" | "Scam" | "Other";
  status: "open" | "reviewing" | "action-taken" | "dismissed";
  notes: string;
  assignedTo?: string;
};

export const reports: Report[] = [
  { id: "rp_401", ts: "12 min ago", reporter: "grid_kid", targetType: "asset", target: "a_stolen_007", targetLabel: "'Chrome Alley Tiles v2' by @clone.exe", reason: "IP theft", status: "open", notes: "Direct copy of my tileset a1. Filenames match." },
  { id: "rp_402", ts: "1h ago", reporter: "moss.city", targetType: "user", target: "spammer_44", targetLabel: "@spammer_44", reason: "Spam", status: "reviewing", notes: "Posted 40+ identical reviews across assets in 10 min.", assignedTo: "mod_team" },
  { id: "rp_403", ts: "3h ago", reporter: "synthkid", targetType: "game", target: "fake-blade-runners", targetLabel: "'Blade Runnerz 4884' by @copypasta", reason: "IP theft", status: "action-taken", notes: "Reskin of my game. Removed 2h ago; user warned." },
  { id: "rp_404", ts: "5h ago", reporter: "vector", targetType: "review", target: "rev_88121", targetLabel: "Review on Grid Duel", reason: "Harassment", status: "open", notes: "Personal attacks on creator." },
  { id: "rp_405", ts: "yesterday", reporter: "nightbird", targetType: "asset", target: "a_broken_012", targetLabel: "'Runner Pack Pro'", reason: "Broken", status: "dismissed", notes: "Files load fine on my end. Sent creator support link." },
  { id: "rp_406", ts: "2d ago", reporter: "drift", targetType: "game", target: "scam_game_09", targetLabel: "'Free 10k PX Loot Box'", reason: "Scam", status: "action-taken", notes: "Phishing for wallet keys. Delisted." },
];

export type Dispute = {
  id: string; ts: string; buyer: string; asset: string; assetLabel: string;
  amount: string; reason: string; status: "open" | "creator-response" | "resolved-refund" | "resolved-denied";
  timeline: { ts: string; who: string; body: string }[];
};

export const disputes: Dispute[] = [
  { id: "dp_71", ts: "2h ago", buyer: "vector", asset: "a2", assetLabel: "Runner Sprite Pack v3", amount: "800 PX", reason: "Sprite rig incompatible with my scene tools", status: "creator-response",
    timeline: [
      { ts: "2h ago", who: "vector", body: "The rig doesn't snap to the standard humanoid skeleton in v2 tools. I bought this expecting v2 support." },
      { ts: "1h ago", who: "pixel.moth (creator)", body: "v3 dropped support for v2 — that's noted in the listing. Happy to refund though, no drama." },
    ] },
  { id: "dp_72", ts: "1d ago", buyer: "drift", asset: "a3", assetLabel: "Bassline / SFX 07", amount: "2,400 PX", reason: "Audio pops on loop", status: "resolved-refund",
    timeline: [{ ts: "1d ago", who: "drift", body: "Every 3rd clip has a click at the loop point." }, { ts: "20h ago", who: "808heart (creator)", body: "Confirmed on clips 12/18/24. Refund + fix v1.2 shipping today." }] },
];
