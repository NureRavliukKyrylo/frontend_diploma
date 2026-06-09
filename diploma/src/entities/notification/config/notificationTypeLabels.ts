import type { SortOption } from "@shared/config/types";
import type { NotificationType } from "../model";
import { notificationTypeValues } from "../libs/notificationSearchSchema";

const notificationTypeLabels: Record<NotificationType, string> = {
  JoinRequestCreated: "Join Request Created",
  JoinRequestApproved: "Join Request Approved",
  JoinRequestRejected: "Join Request Rejected",
  LeaveRequestCreated: "Leave Request Created",
  LeaveRequestApproved: "Leave Request Approved",
  LeaveRequestRejected: "Leave Request Rejected",
  RequestCreated: "Request Created",
  ReportCreated: "Report Created",
  SkillRequestApproved: "Skill Request Approved",
  SkillRequestRejected: "Skill Request Rejected",
  CategoryRequestApproved: "Category Request Approved",
  CategoryRequestRejected: "Category Request Rejected",
  BadgeAwarded: "Badge Awarded",
  ChatMessage: "Chat Message",
  ChatMention: "Chat Mention",
  CommentReply: "Comment Reply",
  CommentMention: "Comment Mention",
  AttendanceApproved: "Attendance Approved",
  AttendanceRejected: "Attendance Rejected",
  AttendanceDisputeCreated: "Attendance Dispute Created",
  AttendanceDisputeResolved: "Attendance Dispute Resolved",
  WorkLogApproved: "Work Log Approved",
  PriorityReserved: "Priority Reserved",
  PrioritySpent: "Priority Spent",
  PriorityReleased: "Priority Released",
  TimeBankBalanceChanged: "Time Bank Balance Changed",
  TimeLevelUp: "Level Up",
  TimeGiftReceived: "Gift Received",
  TimeGiftSent: "Gift Sent",
  TaskReminder: "Task Reminder",
  TaskDeadlineSoon: "Task Deadline Soon",
  TaskOverdue: "Task Overdue",
  TaskCompletedLate: "Task Completed Late",
  System: "System",
};

export const notificationTypeOptions: SortOption<NotificationType | "All">[] = [
  { label: "All", value: "All" },
  ...notificationTypeValues.map((value) => ({
    label: notificationTypeLabels[value],
    value,
  })),
];
