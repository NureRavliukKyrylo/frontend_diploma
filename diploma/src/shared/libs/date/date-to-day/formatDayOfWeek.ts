import { LOCALE_MAP } from "@shared/config/constants";

export const formatDayOfWeek = (date: Date, locale: "en" | "uk"): string =>
  date.toLocaleString(LOCALE_MAP[locale], { weekday: "long" });
