import { LOCALE_MAP } from "@shared/config/constants";

const formatTime = (date: Date, locale: string): string => {
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const formatDayPart = (
  date: Date,
  locale: string,
  withYear: boolean,
): string => {
  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    ...(withYear && { year: "numeric" }),
  }).format(date);
};

export const formatDateRange = (
  from: Date | string,
  to: Date | string,
  locale: "en" | "ua",
  withTime: boolean = true,
): string => {
  const start = new Date(from);
  const end = new Date(to);
  const localeDate = LOCALE_MAP[locale];
  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  const sameYear = start.getFullYear() === end.getFullYear();

  if (!withTime) {
    if (sameDay) return formatDayPart(start, localeDate, true);
    if (sameYear)
      return `${formatDayPart(start, localeDate, false)} - ${formatDayPart(end, localeDate, true)}`;
    return `${formatDayPart(start, localeDate, true)} - ${formatDayPart(end, localeDate, true)}`;
  }

  const startTime = formatTime(start, localeDate);
  const endTime = formatTime(end, localeDate);

  if (sameDay) {
    return `${formatDayPart(start, localeDate, true)} ${startTime} - ${endTime}`;
  }

  if (sameYear) {
    return `${formatDayPart(start, localeDate, true)} ${startTime} - ${formatDayPart(end, localeDate, false)} ${endTime}`;
  }

  return `${formatDayPart(start, localeDate, true)} ${startTime} - ${formatDayPart(end, localeDate, true)} ${endTime}`;
};
