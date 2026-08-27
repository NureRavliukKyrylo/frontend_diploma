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
import type { TFunction } from "i18next";

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

const titleCase = (value: string, fallback: string) =>
  value ? `${value[0].toUpperCase()}${value.slice(1)}` : fallback;

export const enumToLabel = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const getQueueItemText = (item: AdminQueueItem) =>
  item.title ||
  item.description ||
  item.targetEntityType ||
  enumToLabel(item.type);

const getReportDescription = (item: AdminQueueItem, t: TFunction) =>
  t("admin:overview.activity.reportFiled", {
    title: getQueueItemText(item),
  });

const getRequestDescription = (item: AdminQueueItem, t: TFunction) =>
  t("admin:overview.activity.requestPending", {
    type: enumToLabel(item.type),
  });

export const buildActivityFeed = (
  t: TFunction,
  reports: AdminQueueItem[] = [],
  requests: AdminQueueItem[] = [],
): ActivityFeedItem[] =>
  [
    ...reports.map((item) => ({
      id: `report-${item.requestId}`,
      type: "report" as const,
      description: getReportDescription(item, t),
      createdAt: item.createdAt,
    })),
    ...requests.map((item) => ({
      id: `request-${item.requestId}`,
      type: "request" as const,
      description: getRequestDescription(item, t),
      createdAt: item.createdAt,
    })),
  ]
    .filter((item) => item.createdAt)
    .sort(
      (left, right) =>
        new Date(right.createdAt).getTime() -
        new Date(left.createdAt).getTime(),
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

export const buildHealthRows = (
  health: AdminSystemHealth | undefined,
  t: TFunction,
): HealthRow[] => {
  if (!health) {
    return [];
  }

  const rows: HealthRow[] = [
    {
      label: t("admin:overview.health.database"),
      status: health.databaseAvailable
        ? t("admin:overview.health.ok")
        : t("admin:overview.health.down"),
      severity: health.databaseAvailable ? "ok" : "critical",
    },
    {
      label: t("admin:overview.health.overall"),
      status: titleCase(health.status, t("admin:common.unknown")),
      severity: getHealthSeverity(health.status),
    },
  ];

  if (health.risks.length === 0) {
    return [
      ...rows,
      {
        label: t("admin:overview.health.activeRisks"),
        status: t("admin:overview.health.none"),
        severity: "ok",
      },
    ];
  }

  return [
    ...rows,
    ...health.risks.slice(0, 2).map((risk) => ({
      label:
        risk.message ||
        titleCase(risk.code.replace(/_/g, " "), t("admin:common.unknown")),
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
