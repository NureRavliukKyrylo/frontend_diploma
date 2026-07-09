import {
  badgePlaceholderIcon,
  resolveBadgeIconUrl,
  type AdminBadgeListItem,
  type BadgeCardModel,
} from "@entities/badge";

export const toBadgeCardModel = (
  badge: AdminBadgeListItem,
): BadgeCardModel => ({
  id: badge.id,
  title: badge.title,
  iconUrl: resolveBadgeIconUrl(badge.iconUrl),
  rank: { name: badge.rank.name },
  isUnlocked: true,
});

export const getBadgePreviewIcon = (iconUrl?: string | null) =>
  resolveBadgeIconUrl(iconUrl);

export { badgePlaceholderIcon };
