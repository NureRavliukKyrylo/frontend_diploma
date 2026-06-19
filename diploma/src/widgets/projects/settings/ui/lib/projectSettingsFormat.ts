export const formatProjectDate = (value?: string | null) => {
  if (!value) return "No date";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No date";

  return new Intl.DateTimeFormat("en", {
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
