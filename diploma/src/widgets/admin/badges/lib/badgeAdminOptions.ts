import type {
  BadgeMetricType,
  BadgeScopeEntityType,
  BadgeSortingParams,
  Tier,
} from "@entities/badge";
import type { TFunction } from "i18next";

export const badgeTierOptions: Tier[] = ["S", "A", "B", "C", "D", "E", "F"];

export const badgeMetricOptions: Array<{
  value: BadgeMetricType;
  labelKey: string;
}> = [
  { value: "volunteeredHours", labelKey: "badges.metrics.volunteeredHours" },
  { value: "projectsJoinedCount", labelKey: "badges.metrics.projectsJoined" },
  { value: "projectsCompletedCount", labelKey: "badges.metrics.projectsCompleted" },
  { value: "eventsJoinedCount", labelKey: "badges.metrics.eventsJoined" },
  { value: "tasksCompletedCount", labelKey: "badges.metrics.tasksCompleted" },
];

export const badgeScopeOptions: Array<{
  value: "platform" | BadgeScopeEntityType;
  labelKey: string;
}> = [
  { value: "platform", labelKey: "badges.scope.platform" },
  { value: "organization", labelKey: "badges.scope.organization" },
  { value: "project", labelKey: "badges.scope.project" },
  { value: "event", labelKey: "badges.scope.event" },
  { value: "task", labelKey: "badges.scope.task" },
];

export const badgeSortOptions: Array<{
  value: BadgeSortingParams;
  labelKey: string;
}> = [
  { value: 0, labelKey: "badges.sort.default" },
  { value: 1, labelKey: "badges.sort.newest" },
  { value: 2, labelKey: "badges.sort.oldest" },
  { value: 3, labelKey: "badges.sort.titleAsc" },
  { value: 4, labelKey: "badges.sort.titleDesc" },
  { value: 6, labelKey: "badges.sort.rankDesc" },
  { value: 5, labelKey: "badges.sort.rankAsc" },
  { value: 8, labelKey: "badges.sort.awardedDesc" },
  { value: 7, labelKey: "badges.sort.awardedAsc" },
  { value: 10, labelKey: "badges.sort.firstAwardedDesc" },
  { value: 9, labelKey: "badges.sort.firstAwardedAsc" },
];

export const getMetricLabel = (metric: BadgeMetricType, t: TFunction) => {
  const normalizedMetric =
    metric === "volunteeredHours"
      ? "volunteeredHours"
      : metric === "projectsJoinedCount"
        ? "projectsJoinedCount"
        : metric === "projectsCompletedCount"
          ? "projectsCompletedCount"
          : metric === "eventsJoinedCount"
            ? "eventsJoinedCount"
            : metric === "tasksCompletedCount"
              ? "tasksCompletedCount"
              : metric;

  return t(
    badgeMetricOptions.find((option) => option.value === normalizedMetric)
      ?.labelKey ?? "badges.metrics.volunteeredHours",
  );
};

export const getScopeLabel = (
  scope: BadgeScopeEntityType | "platform" | null,
  t: TFunction,
) =>
  t(
    badgeScopeOptions.find((option) => option.value === (scope ?? "platform"))
      ?.labelKey ?? "badges.scope.platform",
  );
