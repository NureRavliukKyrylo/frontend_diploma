const countFormatter = new Intl.NumberFormat("en-US");

export const formatAdminCount = (value: number | null | undefined) =>
  countFormatter.format(value ?? 0);

export const formatAdminHoursFromMinutes = (
  value: number | null | undefined,
) => `${countFormatter.format(Math.round((value ?? 0) / 60))}h`;

export const formatAdminDate = (value: string | null | undefined) => {
  if (!value) {
    return "Unknown";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

