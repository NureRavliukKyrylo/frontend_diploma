export const padDateTimePart = (value: number) => String(value).padStart(2, "0");

export const toTaskDateTimeInputValue = (value?: string | null) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return `${date.getFullYear()}-${padDateTimePart(date.getMonth() + 1)}-${padDateTimePart(
    date.getDate(),
  )}T${padDateTimePart(date.getHours())}:${padDateTimePart(date.getMinutes())}:00`;
};

export const toTaskDateTimePayload = (value: string) =>
  new Date(value).toISOString();
