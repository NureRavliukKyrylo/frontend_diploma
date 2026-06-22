import {
  AttendanceCalendarIcon,
  BadgeIcon,
  AdminAdjustmentIcon,
  DeadlineIcon,
  Report,
  ChatIcon,
  CommentIcon,
  VerifiedIcon,
} from "@shared/assets/icons/info";
import {
  GiftIcon,
  RejectIcon,
  ApproveIcon,
  RequestIcon,
  DisputeIcon,
} from "@shared/assets/icons/actions";
import { GroupPeopleIcon } from "@shared/assets/icons/info";
import type { NotificationType } from "../model";

type NotificationTypeConfig = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  wrapperColor: string;
};

export const NOTIFICATION_TYPE_CONFIG: Record<
  NotificationType,
  NotificationTypeConfig
> = {
  JoinRequestCreated: {
    icon: GroupPeopleIcon,
    iconColor: "#3b82f6",
    wrapperColor: "#eff6ff",
  },
  JoinRequestApproved: {
    icon: ApproveIcon,
    iconColor: "#16a34a",
    wrapperColor: "#f0fdf4",
  },
  JoinRequestRejected: {
    icon: RejectIcon,
    iconColor: "#e11d48",
    wrapperColor: "#fff1f2",
  },
  LeaveRequestCreated: {
    icon: GroupPeopleIcon,
    iconColor: "#f97316",
    wrapperColor: "#fff7ed",
  },
  LeaveRequestApproved: {
    icon: ApproveIcon,
    iconColor: "#16a34a",
    wrapperColor: "#f0fdf4",
  },
  LeaveRequestRejected: {
    icon: RejectIcon,
    iconColor: "#e11d48",
    wrapperColor: "#fff1f2",
  },
  RequestCreated: {
    icon: GroupPeopleIcon,
    iconColor: "#3b82f6",
    wrapperColor: "#eff6ff",
  },
  ReportCreated: {
    icon: Report,
    iconColor: "#6366f1",
    wrapperColor: "#eef2ff",
  },
  SkillRequestApproved: {
    icon: ApproveIcon,
    iconColor: "#16a34a",
    wrapperColor: "#f0fdf4",
  },
  SkillRequestRejected: {
    icon: RejectIcon,
    iconColor: "#e11d48",
    wrapperColor: "#fff1f2",
  },
  CategoryRequestApproved: {
    icon: ApproveIcon,
    iconColor: "#16a34a",
    wrapperColor: "#f0fdf4",
  },
  CategoryRequestRejected: {
    icon: RejectIcon,
    iconColor: "#e11d48",
    wrapperColor: "#fff1f2",
  },
  BadgeAwarded: {
    icon: BadgeIcon,
    iconColor: "#f59e0b",
    wrapperColor: "#fffbeb",
  },
  ChatMessage: {
    icon: ChatIcon,
    iconColor: "#e11d48",
    wrapperColor: "#eff6ff",
  },
  ChatMention: {
    icon: ChatIcon,
    iconColor: "#e11d48",
    wrapperColor: "#eef2ff",
  },
  CommentReply: {
    icon: CommentIcon,
    iconColor: "#6366f1",
    wrapperColor: "#eef2ff",
  },
  CommentMention: {
    icon: CommentIcon,
    iconColor: "#6366f1",
    wrapperColor: "#eef2ff",
  },
  AttendanceApproved: {
    icon: ApproveIcon,
    iconColor: "#16a34a",
    wrapperColor: "#f0fdf4",
  },
  AttendanceRejected: {
    icon: RejectIcon,
    iconColor: "#e11d48",
    wrapperColor: "#fff1f2",
  },
  AttendanceDisputeCreated: {
    icon: AttendanceCalendarIcon,
    iconColor: "#f97316",
    wrapperColor: "#fff7ed",
  },
  AttendanceDisputeResolved: {
    icon: AttendanceCalendarIcon,
    iconColor: "#16a34a",
    wrapperColor: "#f0fdf4",
  },
  WorkLogApproved: {
    icon: ApproveIcon,
    iconColor: "#16a34a",
    wrapperColor: "#f0fdf4",
  },
  PriorityReserved: {
    icon: DeadlineIcon,
    iconColor: "#d97706",
    wrapperColor: "#fffbeb",
  },
  PrioritySpent: {
    icon: DeadlineIcon,
    iconColor: "#e11d48",
    wrapperColor: "#fff1f2",
  },
  PriorityReleased: {
    icon: DeadlineIcon,
    iconColor: "#16a34a",
    wrapperColor: "#f0fdf4",
  },
  TimeBankBalanceChanged: {
    icon: AdminAdjustmentIcon,
    iconColor: "#3b82f6",
    wrapperColor: "#eff6ff",
  },
  TimeLevelUp: {
    icon: BadgeIcon,
    iconColor: "#f59e0b",
    wrapperColor: "#fffbeb",
  },
  TimeGiftReceived: {
    icon: GiftIcon,
    iconColor: "#7c3aed",
    wrapperColor: "#faf5ff",
  },
  TimeGiftSent: {
    icon: GiftIcon,
    iconColor: "#e11d48",
    wrapperColor: "#fff1f2",
  },
  TaskReminder: {
    icon: DeadlineIcon,
    iconColor: "#f97316",
    wrapperColor: "#fff7ed",
  },
  TaskDeadlineSoon: {
    icon: DeadlineIcon,
    iconColor: "#e11d48",
    wrapperColor: "#fff1f2",
  },
  TaskOverdue: {
    icon: DeadlineIcon,
    iconColor: "#dc2626",
    wrapperColor: "#fff1f2",
  },
  TaskCompletedLate: {
    icon: AttendanceCalendarIcon,
    iconColor: "#d97706",
    wrapperColor: "#fffbeb",
  },
  System: {
    icon: AdminAdjustmentIcon,
    iconColor: "#6b7280",
    wrapperColor: "#f9fafb",
  },
  TimeSpendBookingRequested: {
    icon: RequestIcon,
    iconColor: "#3b82f6",
    wrapperColor: "#eff6ff",
  },
  TimeSpendBookingApproved: {
    icon: ApproveIcon,
    iconColor: "#16a34a",
    wrapperColor: "#f0fdf4",
  },
  TimeSpendBookingRejected: {
    icon: RejectIcon,
    iconColor: "#e11d48",
    wrapperColor: "#fff1f2",
  },
  TimeSpendBookingCancelled: {
    icon: RejectIcon,
    iconColor: "#6b7280",
    wrapperColor: "#f9fafb",
  },
  TimeSpendCompletionRequested: {
    icon: RequestIcon,
    iconColor: "#c2410c",
    wrapperColor: "#fff7f0",
  },
  TimeSpendBookingCompleted: {
    icon: ApproveIcon,
    iconColor: "#004a09",
    wrapperColor: "#f0faf1",
  },
  TimeSpendBookingDisputed: {
    icon: DisputeIcon,
    iconColor: "#7c3aed",
    wrapperColor: "#faf5ff",
  },
  TimeSpendOfferUpdated: {
    icon: AdminAdjustmentIcon,
    iconColor: "#3b82f6",
    wrapperColor: "#eff6ff",
  },
  TimeSpendOfferChangeAccepted: {
    icon: ApproveIcon,
    iconColor: "#16a34a",
    wrapperColor: "#f0fdf4",
  },
  TimeSpendOfferChangeRejected: {
    icon: RejectIcon,
    iconColor: "#e11d48",
    wrapperColor: "#fff1f2",
  },
  SkillVerified: {
    icon: VerifiedIcon,
    iconColor: "#004a09",
    wrapperColor: "#f0faf1",
  },
  InvitationCreated: {
    icon: RequestIcon,
    iconColor: "#3b82f6",
    wrapperColor: "#eff6ff",
  },
  InvitationAccepted: {
    icon: ApproveIcon,
    iconColor: "#16a34a",
    wrapperColor: "#f0fdf4",
  },
  InvitationDeclined: {
    icon: RejectIcon,
    iconColor: "#e11d48",
    wrapperColor: "#fff1f2",
  },
};
