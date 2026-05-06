import dayjs from "dayjs";

export const formatDateToTime = (date: Date, time?: string) =>
  time ? dayjs(`${dayjs(date).format("YYYY-MM-DD")}T${time}`) : null;
