export type AttendanceStatus =
  | "draft"
  | "checkedOut"
  | "checkedIn"
  | "CheckedOutPendingApproval"
  | "approved"
  | "rejected"
  | "disputed"
  | "resolved"
  | "cancelled";

export interface EventAttendance {
  canCheckIn: boolean;
  canCheckOut: boolean;
  canDispute: boolean;
  currentAttendance: {
    id: string;
    dateFrom: Date | string;
    dateTo: Date | string;
    description: string;
    status?: AttendanceStatus;
    confirmedMinutes: number | null;
    checkInAt: Date | string;
    checkOutAt: Date | string | null;
  };
}
