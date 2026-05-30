export type AttendanceStatus =
  | "draft"
  | "checkedOut"
  | "checkedIn"
  | "approved"
  | "rejected"
  | "disputed"
  | "resolved"
  | "cancelled";

export interface EventAttendance {
  id: string;
  dateFrom: Date | string;
  dateTo: Date | string;
  description: string;
  status?: AttendanceStatus;
  confirmedMinutes?: number;
  checkInAt: Date | string;
}
