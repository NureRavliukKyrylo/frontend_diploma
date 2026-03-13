export const formatDateToInput = (date?: string | null): string =>
  date ? new Date(date).toISOString().split("T")[0] : "";
