import i18n from "@shared/i18n";

const getLocale = () => (i18n.resolvedLanguage === "uk" ? "uk-UA" : "en-US");

export const formatAdminCount = (value: number | null | undefined) =>
  new Intl.NumberFormat(getLocale()).format(value ?? 0);

export const formatAdminHoursFromMinutes = (value: number | null | undefined) =>
  `${new Intl.NumberFormat(getLocale()).format(
    Math.round((value ?? 0) / 60),
  )}${i18n.resolvedLanguage === "uk" ? " год" : "h"}`;

export const formatAdminDate = (value: string | null | undefined) => {
  if (!value) {
    return i18n.t("admin:common.unknown");
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return i18n.t("admin:common.unknown");
  }

  return new Intl.DateTimeFormat(getLocale(), {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
