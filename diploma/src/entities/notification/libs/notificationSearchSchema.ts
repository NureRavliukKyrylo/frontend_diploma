import { paginationSchema } from "@shared/config/schemas";
import z from "zod";
import type { NotificationType } from "../model";

export const notificationDefaults = {
  Page: 1,
  PageSize: 15,
};

export const notificationTypeValues = [
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
  "TimeSpendBookingRequested",
  "TimeSpendBookingApproved",
  "TimeSpendBookingRejected",
  "TimeSpendBookingCancelled",
  "TimeSpendCompletionRequested",
  "TimeSpendBookingCompleted",
  "TimeSpendBookingDisputed",
  "System",
  "TimeSpendOfferUpdated",
  "TimeSpendOfferChangeAccepted",
  "TimeSpendOfferChangeRejected",
  "SkillVerified",
] as const satisfies NotificationType[];

export const notificationPaginationSchema = paginationSchema.extend({
  PageSize: z.number().default(15).catch(15),
});

export const notificationSearchSchema = notificationPaginationSchema.extend({
  Type: z.enum(notificationTypeValues).optional().catch(undefined),
  Status: z.enum(["All", "Unread"]).optional().catch(undefined),
});

export type NotificationSearchParams = z.infer<typeof notificationSearchSchema>;
