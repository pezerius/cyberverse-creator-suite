// Central type barrel — backend contracts start here.
// When wiring real APIs, keep these type names stable; only the source
// (mock vs. server) should change.

export type { Game } from "./mock-games";
export type { Collection } from "./mock-collections";
export type { PublicCreator } from "./mock-creators";
export type { Change } from "./mock-changelog";
export type { Report, Dispute } from "./mock-moderation";
export type { Notif, NotifKind } from "./mock-notifications";
export type { Review } from "./mock-reviews";
export type { Presence, Friend, Room, ChatMsg, FeedEvent } from "./mock-social";
export type { VersionEntry } from "./mock-versions";
export type { Txn } from "./mock-wallet";
export type { Asset, License, AssetType } from "./marketplace-data";

// Types the mocks don't yet own but the backend will need.
export type UserId = string;
export type Handle = string;

export type SessionUser = {
  id: UserId;
  handle: Handle;
  displayName: string;
  avatarEmoji: string;
  isCreator: boolean;
  isAdmin: boolean;
};

export type Quest = {
  id: string;
  title: string;
  game: string;
  reward: string;
  progress: number; // 0..1
  status: "active" | "claimable" | "claimed" | "expired";
  endsAt: string;
};

export type TournamentEntry = {
  id: string;
  name: string;
  game: string;
  pot: string;
  startsAt: string;
  endsAt: string;
  entrants: number;
  status: "upcoming" | "live" | "ended";
};

export type LeaderboardRow = {
  rank: number;
  handle: string;
  score: number;
  reward?: string;
};
