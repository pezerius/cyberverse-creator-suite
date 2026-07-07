// Mutation stubs. Every button that "does something" calls one of these.
//
// Handoff contract for the backend agent:
//   - Each function validates input with the matching Zod schema, then
//     TODO(backend): replace the body with a `createServerFn({ method: "POST" })`
//     call. Do not remove the schema call — reuse it server-side too.
//   - Every action shows a toast so the UI feels responsive today; keep
//     the toast on success, replace the fake delay with the real call.
//   - Return shape is `{ ok: true, data? } | { ok: false, error }`.

import { toast } from "sonner";
import {
  claimQuestSchema, trackQuestSchema, enterTournamentSchema,
  wishlistToggleSchema, followSchema, submitReviewSchema, tipSchema,
  listAssetSchema, markNotifReadSchema, reportSchema, profileUpdateSchema,
  emailLoginSchema, phoneLoginSchema, signupSchema,
  type ClaimQuestInput, type TrackQuestInput, type EnterTournamentInput,
  type WishlistToggleInput, type FollowInput, type SubmitReviewInput,
  type TipInput, type ListAssetInput, type MarkNotifReadInput,
  type ReportInput, type ProfileUpdateInput, type EmailLoginInput,
  type PhoneLoginInput, type SignupInput,
} from "./schemas";

type Result<T = void> = { ok: true; data?: T } | { ok: false; error: string };

const fakeDelay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

async function run<I, T>(
  parse: (i: unknown) => I,
  input: unknown,
  successMsg: string,
  work?: (parsed: I) => Promise<T> | T,
): Promise<Result<T>> {
  try {
    const parsed = parse(input);
    await fakeDelay();
    const data = work ? await work(parsed) : undefined;
    toast.success(successMsg);
    return { ok: true, data: data as T };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Something went wrong";
    toast.error(msg);
    return { ok: false, error: msg };
  }
}

// ─── Auth ──────────────────────────────────────────────────────────────
export const loginWithEmail = (i: EmailLoginInput) =>
  run(emailLoginSchema.parse, i, "Signed in");
export const loginWithPhone = (i: PhoneLoginInput) =>
  run(phoneLoginSchema.parse, i, "Code sent");
export const signup = (i: SignupInput) =>
  run(signupSchema.parse, i, "Account created");
export const logout = async (): Promise<Result> => {
  await fakeDelay(120);
  toast.success("Signed out");
  return { ok: true };
};

// ─── Profile ───────────────────────────────────────────────────────────
export const updateProfile = (i: ProfileUpdateInput) =>
  run(profileUpdateSchema.parse, i, "Profile updated");

// ─── Quests / tournaments ──────────────────────────────────────────────
export const trackQuest = (i: TrackQuestInput) =>
  run(trackQuestSchema.parse, i, "Quest tracked");
export const claimQuest = (i: ClaimQuestInput) =>
  run(claimQuestSchema.parse, i, "Reward claimed");
export const enterTournament = (i: EnterTournamentInput) =>
  run(enterTournamentSchema.parse, i, "Entered tournament");

// ─── Wishlist / follows ────────────────────────────────────────────────
export const toggleWishlist = (i: WishlistToggleInput) =>
  run(wishlistToggleSchema.parse, i, "Wishlist updated");
export const toggleFollow = (i: FollowInput) =>
  run(followSchema.parse, i, "Follow updated");

// ─── Reviews ───────────────────────────────────────────────────────────
export const submitReview = (i: SubmitReviewInput) =>
  run(submitReviewSchema.parse, i, "Review posted");

// ─── Wallet / tips ─────────────────────────────────────────────────────
export const sendTip = (i: TipInput) =>
  run(tipSchema.parse, i, `Sent ${(i as TipInput).amount} PX`);

// ─── Marketplace ───────────────────────────────────────────────────────
export const listAssetForSale = (i: ListAssetInput) =>
  run(listAssetSchema.parse, i, "Asset listed");

// ─── Notifications ─────────────────────────────────────────────────────
export const markNotifRead = (i: MarkNotifReadInput = {}) =>
  run(markNotifReadSchema.parse, i, i.id ? "Marked as read" : "All caught up");

// ─── Moderation ────────────────────────────────────────────────────────
export const submitReport = (i: ReportInput) =>
  run(reportSchema.parse, i, "Report submitted");
