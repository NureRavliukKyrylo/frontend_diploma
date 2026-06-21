import type { TFunction } from "i18next";

export const getProgressStatusLabels = (
  t: TFunction,
): Record<string, string> => ({
  CompletionRequested: t("bookings.status.completionRequested"),
  Reserved: t("bookings.status.reserved"),
  Pending: t("bookings.status.pending"),
  Completed: t("bookings.status.completed"),
  Cancelled: t("bookings.status.cancelled"),
  Disputed: t("bookings.status.disputed"),
});
