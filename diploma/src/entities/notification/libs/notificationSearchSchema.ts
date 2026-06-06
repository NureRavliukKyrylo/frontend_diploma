import { paginationSchema } from "@shared/config/schemas";
import z from "zod";
import type { NotificationType } from "../model";

const notificationTypeValues = [
  "JoinRequestCreated",
  "JoinRequestApproved",
  "JoinRequestRejected",
  "LeaveRequestCreated",
  "LeaveRequestApproved",
  "LeaveRequestRejected",
  "RequestCreated",
  "ReportCreated",
  "SkillRequestApproved",
  "SkillRequestRejected",
  "CategoryRequestApproved",
  "CategoryRequestRejected",
  "BadgeAwarded",
  "ChatMessage",
  "ChatMention",
  "CommentReply",
  "CommentMention",
  "AttendanceApproved",
  "AttendanceRejected",
  "AttendanceDisputeCreated",
  "AttendanceDisputeResolved",
  "WorkLogApproved",
  "PriorityReserved",
  "PrioritySpent",
  "PriorityReleased",
  "TimeBankBalanceChanged",
  "TimeLevelUp",
  "TimeGiftReceived",
  "TimeGiftSent",
  "TaskReminder",
  "TaskDeadlineSoon",
  "TaskOverdue",
  "TaskCompletedLate",
  "System",
] as const satisfies NotificationType[];

export const notificationPaginationSchema = paginationSchema.extend({
  PageSize: z.number().default(15).catch(15),
});

export const notificationSearchSchema = notificationPaginationSchema.extend({
  type: z.enum(notificationTypeValues).optional().catch(undefined),
  status: z.enum(["Read", "Unread"]).optional().catch(undefined),
});

export type NotificationSearchParams = z.infer<typeof notificationSearchSchema>;
