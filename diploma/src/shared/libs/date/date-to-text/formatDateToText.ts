import { LOCALE_MAP } from "@shared/config/constants";

export const formatDateToText = (
  iso: string,
  locale: "en" | "ua",
  includeTime: boolean = false,
): string => {
  const date = new Date(iso);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(includeTime && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  return date.toLocaleString(LOCALE_MAP[locale], options);
};
