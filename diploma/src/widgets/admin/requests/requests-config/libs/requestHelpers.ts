import type {
  AdminRequestListItem,
  AdminRequestStatusName,
} from "@entities/admin";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";
import {
  badgeTypes,
  genericDecidableTypes,
  joinLeaveTypes,
  reportsAppealsTypes,
  skillsCategoriesTypes,
  type DecisionAction,
  type RequestsTab,
} from "./requestTypeConfig";
import type { TFunction } from "i18next";

export const getPageWindow = (page: number, totalPages: number) => {
  const start = Math.max(1, Math.min(page - 1, Math.max(totalPages - 2, 1)));
  const end = Math.min(totalPages, start + 2);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const getTabMatch = (
  request: AdminRequestListItem,
  tab: RequestsTab,
) => {
  if (tab === "joinLeave") return joinLeaveTypes.has(request.typeName);
  if (tab === "skillsCategories") {
    return skillsCategoriesTypes.has(request.typeName);
  }
  if (tab === "badges") return badgeTypes.has(request.typeName);
  if (tab === "reportsAppeals")
    return reportsAppealsTypes.has(request.typeName);
  return true;
};

export const isDecidable = (request: AdminRequestListItem) =>
  request.typeName === "skillCreation" ||
  genericDecidableTypes.has(request.typeName);

export const getStatusClassName = (statusName: AdminRequestStatusName) => {
  if (statusName === "inProgress") return styles.statusPill_inProgress;
  if (statusName === "resolved" || statusName === "appealResolved") {
    return styles.statusPill_resolved;
  }
  if (statusName === "rejected") return styles.statusPill_rejected;
  if (statusName === "appealed") return styles.statusPill_appealed;
  if (statusName === "cancelled") return styles.statusPill_cancelled;
  return styles.statusPill_new;
};

export const getDecisionToastTitle = (action: DecisionAction, t: TFunction) =>
  action === "approve"
    ? t("admin:requests.statuses.resolved")
    : t("admin:requests.statuses.rejected");

export const getActionLabel = (action: DecisionAction, t: TFunction) =>
  action === "approve"
    ? t("admin:requests.actions.approve")
    : t("admin:requests.actions.reject");

export const getActionPastLabel = (action: DecisionAction, t: TFunction) =>
  action === "approve"
    ? t("admin:requests.statuses.resolved")
    : t("admin:requests.statuses.rejected");

export const canOpenRequestDrawer = (request: AdminRequestListItem) =>
  request.typeName !== "categoryUpdate" &&
  request.typeName !== "categoryDeletion";

export const requiresPreviewDecision = (request: AdminRequestListItem) =>
  request.typeName === "skillCreation" ||
  request.typeName === "categoryCreation";
