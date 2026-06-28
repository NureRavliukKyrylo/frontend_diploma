import { apiClient } from "@shared/api";
import {
  asRecord,
  readArrayPair as readArray,
  readBooleanPair as readBoolean,
  readNumberPair as readNumber,
  readPairValue as read,
  readStringPair as readString,
} from "@shared/api/normalize-helpers";
import type {
  AdminSystemCounts,
  AdminSystemHealth,
  AdminSystemRisk,
} from "../../model/types/adminDashboard";

const normalizeSystemCounts = (value: unknown): AdminSystemCounts => {
  const record = asRecord(value);

  return {
    users: readNumber(record, "users", "Users"),
    organizations: readNumber(record, "organizations", "Organizations"),
    projects: readNumber(record, "projects", "Projects"),
    events: readNumber(record, "events", "Events"),
    tasks: readNumber(record, "tasks", "Tasks"),
    openRequests: readNumber(record, "openRequests", "OpenRequests"),
    openReports: readNumber(record, "openReports", "OpenReports"),
    pendingAttendanceApprovals: readNumber(
      record,
      "pendingAttendanceApprovals",
      "PendingAttendanceApprovals",
    ),
    pendingTaskWorkLogs: readNumber(
      record,
      "pendingTaskWorkLogs",
      "PendingTaskWorkLogs",
    ),
    overdueTasks: readNumber(record, "overdueTasks", "OverdueTasks"),
  };
};

const normalizeSystemRisk = (value: unknown): AdminSystemRisk => {
  const record = asRecord(value);

  return {
    code: readString(record, "code", "Code"),
    severity: readString(record, "severity", "Severity"),
    message: readString(record, "message", "Message"),
    count: readNumber(record, "count", "Count"),
  };
};

const normalizeSystemHealth = (value: unknown): AdminSystemHealth => {
  const record = asRecord(value);

  return {
    databaseAvailable: readBoolean(
      record,
      "databaseAvailable",
      "DatabaseAvailable",
    ),
    healthScore: readNumber(record, "healthScore", "HealthScore"),
    status: readString(record, "status", "Status"),
    checkedAt: readString(record, "checkedAt", "CheckedAt"),
    counts: normalizeSystemCounts(read(record, "counts", "Counts")),
    risks: readArray(record, "risks", "Risks", normalizeSystemRisk),
  };
};

export const getAdminSystemHealth = async () => {
  const response = await apiClient.get<unknown>("admin/system-health");
  return normalizeSystemHealth(response.data);
};
