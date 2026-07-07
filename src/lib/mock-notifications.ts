import { Coins, Star, MessageSquare, UserPlus, ShoppingBag, Shield, Sparkles, TrendingUp } from "lucide-react";

export type NotifKind = "sale" | "review" | "comment" | "follow" | "purchase" | "moderation" | "system" | "trending";

export type Notif = {
  id: string;
  kind: NotifKind;
  title: string;
  body: string;
  when: string;
  unread?: boolean;
  amount?: string;
  href?: string;
};

export const kindMeta: Record<NotifKind, { icon: typeof Coins; tone: string; label: string }> = {
  sale:       { icon: Coins,          tone: "bg-[oklch(0.80_0.18_50)]",           label: "Sale" },
  review:     { icon: Star,           tone: "bg-[oklch(0.75_0.20_50)]",           label: "Review" },
  comment:    { icon: MessageSquare,  tone: "bg-[oklch(0.85_0.10_220)]",          label: "Comment" },
  follow:     { icon: UserPlus,       tone: "bg-primary text-primary-foreground", label: "Follow" },
  purchase:   { icon: ShoppingBag,    tone: "bg-accent",                           label: "Purchase" },
  moderation: { icon: Shield,         tone: "bg-[oklch(0.72_0.18_290)]",          label: "Moderation" },
  system:     { icon: Sparkles,       tone: "bg-white",                            label: "System" },
  trending:   { icon: TrendingUp,     tone: "bg-accent",                           label: "Trending" },
};

export const notifications: Notif[] = [
  { id: "n1", kind: "sale", title: "Chrome Alley Tileset licensed", body: "@drift.dev bought a Single-Game license.", when: "2m ago", unread: true, amount: "+1,140 $PIXEL", href: "/wallet" },
  { id: "n2", kind: "review", title: "New 5★ review on Runner Sprite Pack v3", body: "\"Slotted right into my project. Auto-tiling just works.\" — @drift.dev", when: "18m ago", unread: true, href: "/marketplace/a2" },
  { id: "n3", kind: "follow", title: "@holo.studio started following you", body: "They just shipped 'Skyline Racer' — a top-10 game this week.", when: "1h ago", unread: true, href: "/profile" },
  { id: "n4", kind: "trending", title: "Your game hit the trending shelf", body: "Neon Rush is #7 in Racing this week.", when: "3h ago", unread: true, href: "/studio/dashboard" },
  { id: "n5", kind: "comment", title: "New comment on Neon Rush", body: "@zap: 'Boss fight in stage 3 is unreal'", when: "5h ago", href: "/studio/dashboard" },
  { id: "n6", kind: "purchase", title: "8-bit Blaster SFX added to your library", body: "Free download by @zap · ready in the editor asset drawer.", when: "Yesterday", href: "/marketplace/a5" },
  { id: "n7", kind: "sale", title: "Bassline / SFX 07 licensed", body: "@bytebrawl bought a Resellable license.", when: "Yesterday", amount: "+11,400 $PIXEL", href: "/wallet" },
  { id: "n8", kind: "moderation", title: "Listing approved: Rainy Street Loops", body: "Passed malware + copyright scans in 2h 14m.", when: "2 days ago", href: "/marketplace/a7" },
  { id: "n9", kind: "system", title: "Payout scheduled for Nov 1", body: "Estimated 24,300 $PIXEL — settles to your $PIXEL wallet.", when: "3 days ago", href: "/wallet" },
  { id: "n10", kind: "sale", title: "Cyber Fauna Sprites licensed", body: "@ui.forge bought an All-My-Games license.", when: "4 days ago", amount: "+7,600 $PIXEL", href: "/wallet" },
];

export function unreadCount() {
  return notifications.filter((n) => n.unread).length;
}
