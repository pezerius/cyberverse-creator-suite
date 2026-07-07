// Zod schemas for every user-submitted payload.
// Reuse these server-side (createServerFn().inputValidator(schema.parse)).
// Keep validation identical on both sides — no drift.

import { z } from "zod";

// ─── Auth ──────────────────────────────────────────────────────────────
export const emailLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});
export type EmailLoginInput = z.infer<typeof emailLoginSchema>;

export const phoneLoginSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number"),
  otp: z.string().length(6).regex(/^\d+$/).optional(),
});
export type PhoneLoginInput = z.infer<typeof phoneLoginSchema>;

export const signupSchema = emailLoginSchema.extend({
  handle: z.string().min(3).max(24).regex(/^[a-z0-9_.]+$/, "lowercase, digits, _ or ."),
  displayName: z.string().min(1).max(48),
});
export type SignupInput = z.infer<typeof signupSchema>;

// ─── Profile ───────────────────────────────────────────────────────────
export const profileUpdateSchema = z.object({
  displayName: z.string().min(1).max(48).optional(),
  bio: z.string().max(280).optional(),
  avatarEmoji: z.string().min(1).max(4).optional(),
  links: z.array(z.object({
    label: z.string().min(1).max(32),
    url: z.string().url(),
  })).max(6).optional(),
});
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

// ─── Quests / rewards ──────────────────────────────────────────────────
export const claimQuestSchema = z.object({ questId: z.string().min(1) });
export type ClaimQuestInput = z.infer<typeof claimQuestSchema>;

export const trackQuestSchema = z.object({ questId: z.string().min(1) });
export type TrackQuestInput = z.infer<typeof trackQuestSchema>;

// ─── Tournaments ───────────────────────────────────────────────────────
export const enterTournamentSchema = z.object({ tournamentId: z.string().min(1) });
export type EnterTournamentInput = z.infer<typeof enterTournamentSchema>;

// ─── Wishlist / follows ────────────────────────────────────────────────
export const wishlistToggleSchema = z.object({ assetId: z.string().min(1) });
export type WishlistToggleInput = z.infer<typeof wishlistToggleSchema>;

export const followSchema = z.object({
  target: z.enum(["creator", "game"]),
  id: z.string().min(1),
});
export type FollowInput = z.infer<typeof followSchema>;

// ─── Reviews ───────────────────────────────────────────────────────────
export const submitReviewSchema = z.object({
  target: z.enum(["game", "asset"]),
  targetId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(4).max(2000),
});
export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;

// ─── Wallet / tips ─────────────────────────────────────────────────────
export const tipSchema = z.object({
  toHandle: z.string().min(1),
  amount: z.number().int().positive().max(1_000_000),
  note: z.string().max(140).optional(),
});
export type TipInput = z.infer<typeof tipSchema>;

// ─── Marketplace listing ───────────────────────────────────────────────
export const listAssetSchema = z.object({
  title: z.string().min(3).max(80),
  type: z.enum(["Sprites", "SFX", "Tileset"]),
  license: z.enum(["Single Game", "All My Games", "Resellable"]),
  price: z.number().int().nonnegative().max(1_000_000),
  description: z.string().min(10).max(4000),
  tags: z.array(z.string().min(1).max(24)).max(10),
});
export type ListAssetInput = z.infer<typeof listAssetSchema>;

// ─── Notifications ─────────────────────────────────────────────────────
export const markNotifReadSchema = z.object({
  id: z.string().min(1).optional(), // omit → mark all read
});
export type MarkNotifReadInput = z.infer<typeof markNotifReadSchema>;

// ─── Moderation ────────────────────────────────────────────────────────
export const reportSchema = z.object({
  target: z.enum(["user", "game", "asset", "review", "comment"]),
  targetId: z.string().min(1),
  reason: z.enum(["spam", "abuse", "ip", "nsfw", "other"]),
  details: z.string().max(1000).optional(),
});
export type ReportInput = z.infer<typeof reportSchema>;
