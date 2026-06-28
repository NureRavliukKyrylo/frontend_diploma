import type { AdminUserListItem } from "@entities/admin";
import dayjs from "dayjs";
import { Ban, Clock3 } from "lucide-react";
import type { BanDisplay, SortValue } from "../model/types";

export const getInitials = (user: AdminUserListItem) => {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const source = user.displayName || fullName || user.email;
  const initials = source
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "IF";
};

export const getUserName = (
  user?: AdminUserListItem,
  fallback = "Unknown user",
) => {
  if (!user) {
    return fallback;
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim();
  return user.displayName || fullName || user.email || fallback;
};

export const shortId = (value: string) =>
  value.length > 12 ? `${value.slice(0, 6)}...${value.slice(-4)}` : value;

const getDaysUntilExpiry = (expiresAt?: string | null) => {
  if (!expiresAt) {
    return null;
  }

  const diff = dayjs(expiresAt).valueOf() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
};

export const getBanTone = (ban: BanDisplay["ban"]): BanDisplay["tone"] => {
  const days = getDaysUntilExpiry(ban.expiresAt);

  if (days === null) {
    return "permanent";
  }

  return days <= 7 ? "soon" : "long";
};

export const getStatusLabel = (ban: BanDisplay["ban"]) => {
  const days = getDaysUntilExpiry(ban.expiresAt);

  if (days === null) {
    return "Permanent";
  }

  if (days === 0) {
    return "Expires today";
  }

  return `Expires in ${days} ${days === 1 ? "day" : "days"}`;
};

export const getBanIcon = (tone: BanDisplay["tone"]) =>
  tone === "permanent" ? Ban : Clock3;

export const sortBans = (items: BanDisplay[], sort: SortValue) => {
  const sorted = [...items];

  if (sort === "oldest") {
    return sorted.sort(
      (left, right) =>
        dayjs(left.ban.createdAt).valueOf() - dayjs(right.ban.createdAt).valueOf(),
    );
  }

  if (sort === "expires") {
    return sorted.sort((left, right) => {
      const leftValue = left.ban.expiresAt
        ? dayjs(left.ban.expiresAt).valueOf()
        : Number.POSITIVE_INFINITY;
      const rightValue = right.ban.expiresAt
        ? dayjs(right.ban.expiresAt).valueOf()
        : Number.POSITIVE_INFINITY;

      return leftValue - rightValue;
    });
  }

  return sorted.sort(
    (left, right) =>
      dayjs(right.ban.createdAt).valueOf() - dayjs(left.ban.createdAt).valueOf(),
  );
};
