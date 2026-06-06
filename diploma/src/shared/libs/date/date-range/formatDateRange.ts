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
  locale: string = navigator.language,
  withTime: boolean = true,
): string => {
  const start = new Date(from);
  const end = new Date(to);

  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  const sameYear = start.getFullYear() === end.getFullYear();

  if (!withTime) {
    if (sameDay) return formatDayPart(start, locale, true);
    if (sameYear)
      return `${formatDayPart(start, locale, false)} - ${formatDayPart(end, locale, true)}`;
    return `${formatDayPart(start, locale, true)} - ${formatDayPart(end, locale, true)}`;
  }

  const startTime = formatTime(start, locale);
  const endTime = formatTime(end, locale);

  if (sameDay) {
    return `${formatDayPart(start, locale, true)} ${startTime} - ${endTime}`;
  }

  if (sameYear) {
    return `${formatDayPart(start, locale, true)} ${startTime} - ${formatDayPart(end, locale, false)} ${endTime}`;
  }

  return `${formatDayPart(start, locale, true)} ${startTime} - ${formatDayPart(end, locale, true)} ${endTime}`;
};
