import type { TFunction } from "i18next";

export const formatArchiveReason = (
  value: string | null | undefined,
  t: TFunction,
) => {
  if (!value) return null;

  return t(`roles:card.archiveReasons.${value}`, {
    defaultValue: value
      .split("_")
      .join(" ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  });
};

export const formatArchiveDate = (
  value: string | null | undefined,
  language: string,
) => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString(language === "uk" ? "uk-UA" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
