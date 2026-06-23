import type { AvailabilitySlot } from "@entities/user/calendar";
import { LOCALE_MAP } from "@shared/config/constants";
import { formatDateToText, formatDayOfWeek } from "@shared/libs/date";
import type { TFunction } from "i18next";

const getDayName = (dayOfWeek: number, locale: "en" | "uk"): string => {
  const date = new Date(0);
  date.setDate(date.getDate() - date.getDay() + dayOfWeek);
  return new Intl.DateTimeFormat(LOCALE_MAP[locale], {
    weekday: "long",
  }).format(date);
};

const formatTime = (time: string, locale: "en" | "uk"): string => {
  const date = new Date(`1970-01-01T${time}`);
  return new Intl.DateTimeFormat(LOCALE_MAP[locale], {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const buildDescription = (
  slot: AvailabilitySlot,
  t: TFunction,
  locale: "en" | "uk",
): string => {
  const timeLabel = slot.allDay
    ? t("calendar:deleteModal.allDay")
    : `${formatTime(slot.startTime, locale)} – ${formatTime(slot.endTime, locale)}`;

  if (slot.date) {
    const date = new Date(slot.date);
    return `${formatDayOfWeek(date, locale)}, ${formatDateToText(date.toISOString(), locale)}, ${timeLabel}`;
  }

  if (slot.startDate && slot.endDate) {
    const from = formatDateToText(slot.startDate, locale);
    const to = formatDateToText(slot.endDate, locale);

    const recurrence =
      slot.dayOfWeek !== null
        ? t("calendar:deleteModal.everyWeekDay", {
            day: getDayName(slot.dayOfWeek, locale),
          })
        : t("calendar:deleteModal.everyDay");

    const dateRangeStr = t("calendar:deleteModal.timeRangePattern", {
      from,
      to,
    });

    return `${recurrence}, ${dateRangeStr}, ${timeLabel}`;
  }

  return timeLabel;
};
