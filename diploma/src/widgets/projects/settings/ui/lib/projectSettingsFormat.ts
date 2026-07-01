export const formatProjectDate = (
  value: string | null | undefined,
  locale: string,
  fallback: string,
) => {
  if (!value) return fallback;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const getProgressPercent = (
  progressPercent?: number,
  progress?: { percent?: number },
) => {
  const value =
    typeof progressPercent === "number" ? progressPercent : progress?.percent;

  if (typeof value !== "number" || Number.isNaN(value)) return null;

  return Math.round(value);
};
