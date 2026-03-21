export const formatDateToText = (iso: string): string => {
  return new Date(iso).toLocaleDateString(navigator.language, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
