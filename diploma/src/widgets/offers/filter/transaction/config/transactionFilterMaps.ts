import type { TransactionType, TransactionSourceType } from "@entities/offer";
import type { TFunction } from "i18next";

export const getTransactionTypeOptions = (
  t: TFunction,
): { label: string; value: TransactionType | "all" }[] => [
  { label: t("transactions.filter.options.type.all"), value: "all" },
  { label: t("transactions.types.earn"), value: "earn" },
  { label: t("transactions.types.spend"), value: "spend" },
  { label: t("transactions.types.reservation"), value: "reservation" },
  {
    label: t("transactions.types.reservationRelease"),
    value: "reservationRelease",
  },
  {
    label: t("transactions.types.adminAdjustmentPlus"),
    value: "adminAdjustmentPlus",
  },
  {
    label: t("transactions.types.adminAdjustmentMinus"),
    value: "adminAdjustmentMinus",
  },
  { label: t("transactions.types.giftIn"), value: "giftIn" },
  { label: t("transactions.types.giftOut"), value: "giftOut" },
];

export const getTransactionSourceTypeOptions = (
  t: TFunction,
): { label: string; value: TransactionSourceType | "all" }[] => [
  { label: t("transactions.filter.options.source.all"), value: "all" },
  {
    label: t("transactions.sources.eventAttendance"),
    value: "eventAttendance",
  },
  {
    label: t("transactions.sources.priorityReservation"),
    value: "priorityReservation",
  },
  {
    label: t("transactions.sources.adminAdjustment"),
    value: "adminAdjustment",
  },
  { label: t("transactions.sources.gift"), value: "gift" },
  { label: t("transactions.sources.timeSpend"), value: "timeSpend" },
];
