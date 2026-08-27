import type { TFunction } from "i18next";

export const formatTimeAgo = (date: Date | string, t: TFunction): string => {
  const diff = Date.now() - new Date(date).getTime();

  const minutes = Math.floor(diff / 1000 / 60);
  if (minutes < 1) {
    return t("common:timeAgo.justNow", { defaultValue: "just now" });
  }

  if (minutes < 60) {
    return t("common:timeAgo.minutes", {
      count: minutes,
      defaultValue: `${minutes}m ago`,
    });
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return t("common:timeAgo.hours", {
      count: hours,
      defaultValue: `${hours}h ago`,
    });
  }

  const days = Math.floor(hours / 24);
  return t("common:timeAgo.days", {
    count: days,
    defaultValue: `${days}d ago`,
  });
};
