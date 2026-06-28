import { formatAdminCount } from "@entities/admin";
import type {
  AdminQueueItem,
  AdminSystemHealth,
  AdminUserListItem,
} from "@entities/admin";
import type {
  ActivityFeedItem,
  AdminOverviewStyles,
  HealthRow,
  QuickAccessItem,
} from "../model/types";

export const getInitials = (user: AdminUserListItem) => {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const source = user.displayName || fullName || user.email;
  const initials = source
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "IF";
};

export const getAvatarTone = (index: number) =>
  (["red", "amber", "neutral", "violet"] as const)[index % 4];

const titleCase = (value: string) =>
  value ? `${value[0].toUpperCase()}${value.slice(1)}` : "Unknown";

export const enumToLabel = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getQueueItemText = (item: AdminQueueItem) =>
  item.title || item.description || item.targetEntityType || enumToLabel(item.type);

const getReportDescription = (item: AdminQueueItem) =>
  `Report filed: ${getQueueItemText(item)}`;

const getRequestDescription = (item: AdminQueueItem) =>
  `${enumToLabel(item.type)} request pending`;

export const buildActivityFeed = (
  reports: AdminQueueItem[] = [],
  requests: AdminQueueItem[] = [],
): ActivityFeedItem[] =>
  [
    ...reports.map((item) => ({
      id: `report-${item.requestId}`,
      type: "report" as const,
      description: getReportDescription(item),
      createdAt: item.createdAt,
    })),
    ...requests.map((item) => ({
      id: `request-${item.requestId}`,
      type: "request" as const,
      description: getRequestDescription(item),
      createdAt: item.createdAt,
    })),
  ]
    .filter((item) => item.createdAt)
    .sort(
      (left, right) =>
        new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
    )
    .slice(0, 6);

const getHealthSeverity = (value: string): HealthRow["severity"] => {
  const normalized = value.toLowerCase();

  if (normalized === "critical") {
    return "critical";
  }

  if (normalized === "warning" || normalized === "degraded") {
    return "warning";
  }

  return "ok";
};

export const buildHealthRows = (health?: AdminSystemHealth): HealthRow[] => {
  if (!health) {
    return [];
  }

  const rows: HealthRow[] = [
    {
      label: "Database",
      status: health.databaseAvailable ? "OK" : "Down",
      severity: health.databaseAvailable ? "ok" : "critical",
    },
    {
      label: "Overall status",
      status: titleCase(health.status),
      severity: getHealthSeverity(health.status),
    },
  ];

  if (health.risks.length === 0) {
    return [
      ...rows,
      {
        label: "Active risks",
        status: "None",
        severity: "ok",
      },
    ];
  }

  return [
    ...rows,
    ...health.risks.slice(0, 2).map((risk) => ({
      label: risk.message || titleCase(risk.code.replace(/_/g, " ")),
      status: formatAdminCount(risk.count),
      severity: getHealthSeverity(risk.severity),
    })),
  ];
};

export const getFooterClassName = (
  styles: AdminOverviewStyles,
  tone?: QuickAccessItem["footerTone"],
) => {
  if (tone === "danger") {
    return styles.quickFooterValueDanger;
  }

  if (tone === "warning") {
    return styles.quickFooterValueWarning;
  }

  return "";
};
