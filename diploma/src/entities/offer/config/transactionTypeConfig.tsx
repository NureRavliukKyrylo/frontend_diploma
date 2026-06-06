import { GiftIcon } from "@shared/assets/icons/actions";
import type { TransactionSourceType, TransactionType } from "../model";
import {
  AdminAdjustmentIcon,
  AttendanceCalendarIcon,
  LockIcon,
  TimeSpendIcon,
} from "@shared/assets/icons/info";

type TransactionConfig = {
  label: string;
  wrapperColor: string;
  iconColor: string;
  fontColor: string;
};

export const TRANSACTION_SOURCE_ICON: Record<
  TransactionSourceType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  eventAttendance: AttendanceCalendarIcon,
  priorityReservation: LockIcon,
  adminAdjustment: AdminAdjustmentIcon,
  gift: GiftIcon,
  timeSpend: TimeSpendIcon,
};

export const TRANSACTION_TYPE_CONFIG: Record<
  TransactionType,
  TransactionConfig
> = {
  earn: {
    label: "Earned",
    wrapperColor: "#f0fdf4",
    iconColor: "#16a34a",
    fontColor: "#15803d",
  },
  spend: {
    label: "Spent",
    wrapperColor: "#fff1f2",
    iconColor: "#e11d48",
    fontColor: "#9f1239",
  },
  reservation: {
    label: "Reserved",
    wrapperColor: "#fffbeb",
    iconColor: "#d97706",
    fontColor: "#b45309",
  },
  reservationRelease: {
    label: "Reservation released",
    wrapperColor: "#f0fdf4",
    iconColor: "#16a34a",
    fontColor: "#15803d",
  },
  adminAdjustmentPlus: {
    label: "Admin adjustment",
    wrapperColor: "#f0fdf4",
    iconColor: "#16a34a",
    fontColor: "#15803d",
  },
  adminAdjustmentMinus: {
    label: "Admin adjustment",
    wrapperColor: "#fff1f2",
    iconColor: "#e11d48",
    fontColor: "#9f1239",
  },
  giftIn: {
    label: "Gift received",
    wrapperColor: "#faf5ff",
    iconColor: "#7c3aed",
    fontColor: "#5b21b6",
  },
  giftOut: {
    label: "Gift sent",
    wrapperColor: "#fff1f2",
    iconColor: "#e11d48",
    fontColor: "#9f1239",
  },
};
