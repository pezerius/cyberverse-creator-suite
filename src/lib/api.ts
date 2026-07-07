// Data-access layer. Every read the UI performs goes through here.
//
// Handoff contract for the backend agent:
//   - Every function returns a Promise. Today it resolves synchronously
//     from mock data; swap the body for a `createServerFn` call or a
//     `useSuspenseQuery(queryOptions)` fetcher without touching components.
//   - Function names are stable. Do not rename — components import them.
//   - Keep the return TYPES identical to `src/lib/types.ts`. That is the
//     wire contract; database columns can differ, mappers live server-side.
//
// Recommended migration path (per resource):
//   1. Add a Supabase table matching the type in src/lib/types.ts.
//   2. Replace the function body here with a `createServerFn` call, or
//      convert the caller to `useSuspenseQuery` with a `queryOptions`
//      exported from this file.
//   3. Delete the corresponding mock file only after every reference to
//      it is gone (`rg "from \"@/lib/mock-<name>\""`).

import { games, gamesList, getGame } from "./mock-games";
import { collections, getCollection } from "./mock-collections";
import { creators, getCreator } from "./mock-creators";
import { changelog } from "./mock-changelog";
import { reports, disputes } from "./mock-moderation";
import { notifications, unreadCount as _unreadCount } from "./mock-notifications";
import { assetReviews, gameReviews } from "./mock-reviews";
import { friends, rooms, roomChat, feed } from "./mock-social";
import { assetVersions } from "./mock-versions";
import { balance, transactions, earningsSeries } from "./mock-wallet";
import { assets, getAsset } from "./marketplace-data";
import { wishlistAssetIds, followedCreators, followedGames } from "./mock-wishlist";
import type {
  Game, Collection, PublicCreator, Change, Report, Dispute, Notif,
  Review, Friend, Room, ChatMsg, FeedEvent, VersionEntry, Txn, Asset,
  Quest, TournamentEntry, LeaderboardRow,
} from "./types";

// Small helper — keep the Promise shape the backend will use.
const ok = <T>(v: T): Promise<T> => Promise.resolve(v);

// ─── Games ─────────────────────────────────────────────────────────────
export const listGames = (): Promise<Game[]> => ok(gamesList);
export const fetchGame = (slug: string): Promise<Game | undefined> => ok(getGame(slug));
export const listGameReviews = (slug: string): Promise<Review[]> =>
  ok(gameReviews[slug] ?? []);

// ─── Marketplace / assets ──────────────────────────────────────────────
export const listAssets = (): Promise<Asset[]> => ok(assets);
export const fetchAsset = (id: string): Promise<Asset | undefined> => ok(getAsset(id));
export const listAssetReviews = (id: string): Promise<Review[]> =>
  ok(assetReviews[id] ?? []);
export const listAssetVersions = (id: string): Promise<VersionEntry[]> =>
  ok(assetVersions[id] ?? []);

// ─── Collections ───────────────────────────────────────────────────────
export const listCollections = (): Promise<Collection[]> => ok(collections);
export const fetchCollection = (slug: string): Promise<Collection | undefined> =>
  ok(getCollection(slug));

// ─── Creators / profiles ───────────────────────────────────────────────
export const fetchCreator = (handle: string): Promise<PublicCreator | undefined> =>
  ok(getCreator(handle));
export const listCreators = (): Promise<PublicCreator[]> => ok(Object.values(creators));

// ─── Social ────────────────────────────────────────────────────────────
export const listFriends = (): Promise<Friend[]> => ok(friends);
export const listRooms = (): Promise<Room[]> => ok(rooms);
export const listRoomChat = (_roomId: string): Promise<ChatMsg[]> => ok(roomChat);
export const listFeed = (): Promise<FeedEvent[]> => ok(feed);

// ─── Wallet ────────────────────────────────────────────────────────────
export const fetchBalance = (): Promise<typeof balance> => ok(balance);
export const listTransactions = (): Promise<Txn[]> => ok(transactions);
export const fetchEarningsSeries = (): Promise<number[]> => ok(earningsSeries);

// ─── Wishlist / follows ────────────────────────────────────────────────
export const listWishlistAssetIds = (): Promise<string[]> => ok(wishlistAssetIds);
export const listFollowedCreators = (): Promise<string[]> => ok(followedCreators);
export const listFollowedGames = (): Promise<string[]> => ok(followedGames);

// ─── Notifications ─────────────────────────────────────────────────────
export const listNotifications = (): Promise<Notif[]> => ok(notifications);
export const fetchUnreadCount = (): Promise<number> => ok(_unreadCount());

// ─── Changelog ─────────────────────────────────────────────────────────
export const listChangelog = (): Promise<Change[]> => ok(changelog);

// ─── Moderation (admin) ────────────────────────────────────────────────
export const listReports = (): Promise<Report[]> => ok(reports);
export const listDisputes = (): Promise<Dispute[]> => ok(disputes);

// ─── Quests / tournaments (mock-free — inline placeholders) ────────────
// TODO(backend): back these by real tables. UI already reads from here.
export const listQuests = (): Promise<Quest[]> => ok([]);
export const listTournaments = (): Promise<TournamentEntry[]> => ok([]);
export const fetchLeaderboard = (
  _kind: "season" | "tournament",
  _id?: string,
): Promise<LeaderboardRow[]> => ok([]);
