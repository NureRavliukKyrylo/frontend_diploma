export type TransactionType =
  | "earn"
  | "spend"
  | "reservation"
  | "reservationRelease"
  | "adminAdjustmentPlus"
  | "adminAdjustmentMinus"
  | "giftIn"
  | "giftOut";

export type TransactionSourceType =
  | "eventAttendance"
  | "priorityReservation"
  | "adminAdjustment"
  | "gift"
  | "timeSpend";

export interface TimeTransaction {
  id: string;
  type: TransactionType;
  sourceType: TransactionSourceType;
  amountMinutes: number;
  balanceAfterMinutes: number;
  comment?: string;
}
