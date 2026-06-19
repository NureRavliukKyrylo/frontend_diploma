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

export const formatTimeBankMinutes = (minutes?: number | null) => {
  const safeMinutes = Number.isFinite(minutes) ? Math.max(0, minutes ?? 0) : 0;
  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }

  return hours > 0 ? `${hours}h` : `${remainingMinutes}m`;
};
