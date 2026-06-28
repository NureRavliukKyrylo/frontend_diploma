import { apiClient } from "@shared/api";
import {
  asRecord,
  readArray as readArrayFromKeys,
  readNumber as readNumberFromKeys,
  readStringPair as readString,
} from "@shared/api/normalize-helpers";
import type { AdminPlatformStatistics } from "../../model/types/adminDashboard";
import { unwrapResponsePayload } from "./baseNormalizers";

const normalizeMonthlyGrowthPoint = (value: unknown) => {
  const record = asRecord(value);

  return {
    year: readNumberFromKeys(record, ["year", "Year"]),
    month: readNumberFromKeys(record, ["month", "Month"]),
    users: readNumberFromKeys(record, [
      "users",
      "Users",
      "usersTotal",
      "UsersTotal",
    ]),
    organizations: readNumberFromKeys(record, [
      "organizations",
      "Organizations",
      "organizationsTotal",
      "OrganizationsTotal",
    ]),
    projects: readNumberFromKeys(record, [
      "projects",
      "Projects",
      "projectsTotal",
      "ProjectsTotal",
    ]),
    events: readNumberFromKeys(record, [
      "events",
      "Events",
      "eventsTotal",
      "EventsTotal",
    ]),
    tasks: readNumberFromKeys(record, [
      "tasks",
      "Tasks",
      "tasksTotal",
      "TasksTotal",
    ]),
  };
};

const normalizeCategoryPopularityPoint = (value: unknown) => {
  const record = asRecord(value);

  return {
    categoryId: readString(record, "categoryId", "CategoryId"),
    count: readNumberFromKeys(record, ["count", "Count", "total", "Total"]),
  };
};

const normalizePlatformStatistics = (
  value: unknown,
): AdminPlatformStatistics => {
  const record = asRecord(value);

  return {
    usersTotal: readNumberFromKeys(record, [
      "usersTotal",
      "UsersTotal",
      "totalUsers",
      "TotalUsers",
      "users",
      "Users",
    ]),
    activeUsers: readNumberFromKeys(record, [
      "activeUsers",
      "ActiveUsers",
      "verifiedUsers",
      "VerifiedUsers",
    ]),
    organizationsTotal: readNumberFromKeys(record, [
      "organizationsTotal",
      "OrganizationsTotal",
      "totalOrganizations",
      "TotalOrganizations",
      "organizations",
      "Organizations",
    ]),
    projectsTotal: readNumberFromKeys(record, [
      "projectsTotal",
      "ProjectsTotal",
      "totalProjects",
      "TotalProjects",
      "projects",
      "Projects",
    ]),
    eventsTotal: readNumberFromKeys(record, [
      "eventsTotal",
      "EventsTotal",
      "totalEvents",
      "TotalEvents",
      "events",
      "Events",
    ]),
    tasksTotal: readNumberFromKeys(record, [
      "tasksTotal",
      "TasksTotal",
      "totalTasks",
      "TotalTasks",
      "tasks",
      "Tasks",
    ]),
    totalTimeBankIssuedMinutes: readNumberFromKeys(record, [
      "totalTimeBankIssuedMinutes",
      "TotalTimeBankIssuedMinutes",
      "timeBankIssuedMinutes",
      "TimeBankIssuedMinutes",
    ]),
    totalTimeBankSpentMinutes: readNumberFromKeys(record, [
      "totalTimeBankSpentMinutes",
      "TotalTimeBankSpentMinutes",
      "timeBankSpentMinutes",
      "TimeBankSpentMinutes",
    ]),
    totalTimeBankReservedMinutes: readNumberFromKeys(record, [
      "totalTimeBankReservedMinutes",
      "TotalTimeBankReservedMinutes",
      "timeBankReservedMinutes",
      "TimeBankReservedMinutes",
    ]),
    openReports: readNumberFromKeys(record, [
      "openReports",
      "OpenReports",
      "reportsOpen",
      "ReportsOpen",
    ]),
    openModerationCases: readNumberFromKeys(record, [
      "openModerationCases",
      "OpenModerationCases",
      "moderationOpen",
      "ModerationOpen",
    ]),
    monthlyGrowth: readArrayFromKeys(
      record,
      ["monthlyGrowth", "MonthlyGrowth"],
      normalizeMonthlyGrowthPoint,
    ),
    popularCategories: readArrayFromKeys(
      record,
      ["popularCategories", "PopularCategories"],
      normalizeCategoryPopularityPoint,
    ),
  };
};

export const getAdminPlatformStatistics = async () => {
  const response = await apiClient.get<unknown>("admin/statistics/platform");
  return normalizePlatformStatistics(unwrapResponsePayload(response.data));
};
