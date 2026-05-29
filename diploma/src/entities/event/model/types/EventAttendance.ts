export type AttendanceStatus = "present" | "absent" | "late" | "declined";

export interface EventAttendance {
  id: string;
  dateFrom: Date | string;
  dateTo: Date | string;
  description: string;
  status?: AttendanceStatus;
}
