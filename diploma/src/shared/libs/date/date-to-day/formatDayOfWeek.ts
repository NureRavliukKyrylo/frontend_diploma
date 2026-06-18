import { LOCALE_MAP } from "@shared/config/constants";

export const formatDayOfWeek = (date: Date, locale: "en" | "ua"): string =>
  date.toLocaleString(LOCALE_MAP[locale], { weekday: "long" });
