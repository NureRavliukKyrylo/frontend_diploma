export type HeaderLanguage = "uk" | "en";

export const languageOptions: Array<{
  value: HeaderLanguage;
  label: string;
  flag: string;
}> = [
  {
    value: "uk",
    label: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
    flag: "\uD83C\uDDFA\uD83C\uDDE6",
  },
  {
    value: "en",
    label: "English",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
  },
];

export const getLanguageDisplay = (language: HeaderLanguage) =>
  language === "uk"
    ? {
        label: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
        flag: "\uD83C\uDDFA\uD83C\uDDE6",
      }
    : {
        label: "English",
        flag: "\uD83C\uDDEC\uD83C\uDDE7",
      };

export const isHeaderLinkActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export const formatTimeBankMinutes = (
  minutes: number | null | undefined,
  t: TFunction,
) => {
  const safeMinutes = Number.isFinite(minutes) ? Math.max(0, minutes ?? 0) : 0;
  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${t("common:time.compactHours", { count: hours })} ${t(
      "common:time.compactMinutes",
      { count: remainingMinutes },
    )}`;
  }

  return hours > 0
    ? t("common:time.compactHours", { count: hours })
    : t("common:time.compactMinutes", { count: remainingMinutes });
};
import type { TFunction } from "i18next";
