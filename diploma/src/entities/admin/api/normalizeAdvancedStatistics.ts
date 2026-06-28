import {
  asRecord,
  readArrayPair as readArray,
  readNullableStringPair as readNullableString,
  readNumberPair as readNumber,
  readPairValue as read,
  readStringPair as readString,
} from "@shared/api/normalize-helpers";
import type { AdvancedStatisticsDashboard } from "../model/types/adminDashboard";
const normalizeRetentionStatistics = (value: unknown) => {
  const record = asRecord(value);

  return {
    firstTimeVolunteers: readNumber(record, "firstTimeVolunteers", "FirstTimeVolunteers"),
    returningVolunteers: readNumber(record, "returningVolunteers", "ReturningVolunteers"),
    retentionPercent: readNumber(record, "retentionPercent", "RetentionPercent"),
  };
};

const normalizeConversionFunnelStatistics = (value: unknown) => {
  const record = asRecord(value);

  return {
    recommendationsShown: readNumber(record, "recommendationsShown", "RecommendationsShown"),
    invitationsSent: readNumber(record, "invitationsSent", "InvitationsSent"),
    invitationsAccepted: readNumber(record, "invitationsAccepted", "InvitationsAccepted"),
    attendanceOrCompletions: readNumber(
      record,
      "attendanceOrCompletions",
      "AttendanceOrCompletions",
    ),
    inviteToAcceptPercent: readNumber(
      record,
      "inviteToAcceptPercent",
      "InviteToAcceptPercent",
    ),
    acceptToCompletionPercent: readNumber(
      record,
      "acceptToCompletionPercent",
      "AcceptToCompletionPercent",
    ),
  };
};

const normalizeReliabilityStatistics = (value: unknown) => {
  const record = asRecord(value);

  return {
    approvedAttendances: readNumber(record, "approvedAttendances", "ApprovedAttendances"),
    rejectedAttendances: readNumber(record, "rejectedAttendances", "RejectedAttendances"),
    approvedWorkLogs: readNumber(record, "approvedWorkLogs", "ApprovedWorkLogs"),
    rejectedWorkLogs: readNumber(record, "rejectedWorkLogs", "RejectedWorkLogs"),
    completedTasks: readNumber(record, "completedTasks", "CompletedTasks"),
    lateTasks: readNumber(record, "lateTasks", "LateTasks"),
    score: readNumber(record, "score", "Score"),
  };
};

const normalizeTimeBankVelocityStatistics = (value: unknown) => {
  const record = asRecord(value);

  return {
    earnedThisWeekMinutes: readNumber(record, "earnedThisWeekMinutes", "EarnedThisWeekMinutes"),
    spentThisWeekMinutes: readNumber(record, "spentThisWeekMinutes", "SpentThisWeekMinutes"),
    reservedMinutes: readNumber(record, "reservedMinutes", "ReservedMinutes"),
    stuckReservedMinutes: readNumber(record, "stuckReservedMinutes", "StuckReservedMinutes"),
    adminAdjustmentMinutesThisWeek: readNumber(
      record,
      "adminAdjustmentMinutesThisWeek",
      "AdminAdjustmentMinutesThisWeek",
    ),
    spendToEarnRatio: readNumber(record, "spendToEarnRatio", "SpendToEarnRatio"),
  };
};

const normalizeQueueSlaStatistics = (value: unknown) => {
  const record = asRecord(value);

  return {
    pendingTotal: readNumber(record, "pendingTotal", "PendingTotal"),
    olderThan24h: readNumber(record, "olderThan24h", "OlderThan24h"),
    olderThan48h: readNumber(record, "olderThan48h", "OlderThan48h"),
    olderThan72h: readNumber(record, "olderThan72h", "OlderThan72h"),
    averageAgeHours: readNumber(record, "averageAgeHours", "AverageAgeHours"),
    maxAgeHours: readNumber(record, "maxAgeHours", "MaxAgeHours"),
  };
};

const normalizeCategoryHeatmapItem = (value: unknown) => {
  const record = asRecord(value);

  return {
    categoryId: readString(record, "categoryId", "CategoryId"),
    categoryName: readNullableString(record, "categoryName", "CategoryName"),
    eventsCount: readNumber(record, "eventsCount", "EventsCount"),
    tasksCount: readNumber(record, "tasksCount", "TasksCount"),
    approvedAttendanceCount: readNumber(record, "approvedAttendanceCount", "ApprovedAttendanceCount"),
    confirmedMinutes: readNumber(record, "confirmedMinutes", "ConfirmedMinutes"),
    completionRate: readNumber(record, "completionRate", "CompletionRate"),
  };
};

export const normalizeAdvancedStatistics = (
  value: unknown,
): AdvancedStatisticsDashboard => {
  const record = asRecord(value);

  return {
    retention: normalizeRetentionStatistics(read(record, "retention", "Retention")),
    conversionFunnel: normalizeConversionFunnelStatistics(
      read(record, "conversionFunnel", "ConversionFunnel"),
    ),
    reliability: normalizeReliabilityStatistics(
      read(record, "reliability", "Reliability"),
    ),
    timeBankVelocity: normalizeTimeBankVelocityStatistics(
      read(record, "timeBankVelocity", "TimeBankVelocity"),
    ),
    requestSla: normalizeQueueSlaStatistics(
      read(record, "requestSla", "RequestSla"),
    ),
    reportSla: normalizeQueueSlaStatistics(read(record, "reportSla", "ReportSla")),
    categoryHeatmap: readArray(
      record,
      "categoryHeatmap",
      "CategoryHeatmap",
      normalizeCategoryHeatmapItem,
    ),
  };
};
