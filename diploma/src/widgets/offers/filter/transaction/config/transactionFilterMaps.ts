import type { TransactionType, TransactionSourceType } from "@entities/offer";

export const TRANSACTION_TYPE_OPTIONS: {
  label: string;
  value: TransactionType | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Earned", value: "earn" },
  { label: "Spent", value: "spend" },
  { label: "Reserved", value: "reservation" },
  { label: "Reservation released", value: "reservationRelease" },
  { label: "Admin adjustment +", value: "adminAdjustmentPlus" },
  { label: "Admin adjustment −", value: "adminAdjustmentMinus" },
  { label: "Gift received", value: "giftIn" },
  { label: "Gift sent", value: "giftOut" },
];

export const TRANSACTION_SOURCE_TYPE_OPTIONS: {
  label: string;
  value: TransactionSourceType | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Event attendance", value: "eventAttendance" },
  { label: "Priority reservation", value: "priorityReservation" },
  { label: "Admin adjustment", value: "adminAdjustment" },
  { label: "Gift", value: "gift" },
  { label: "Time spend", value: "timeSpend" },
];
