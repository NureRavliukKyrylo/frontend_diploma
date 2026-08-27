export const getFullName = (
  firstName?: string | null,
  lastName?: string | null,
): string => {
  const full = [firstName, lastName].filter(Boolean).join(" ").trim();
  return full || "Unknown User";
};
