import type {
  AdminRequestListItem,
  AdminRequestStatusCode,
  AdminRequestStatusName,
  AdminRequestTypeCode,
  AdminRequestTypeName,
} from "@entities/admin";

export type StatusFilterValue = "all" | AdminRequestStatusCode;
export type TypeFilterValue = "all" | AdminRequestTypeCode;
export type RequestsTab =
  | "all"
  | "joinLeave"
  | "skillsCategories"
  | "badges"
  | "reportsAppeals";
export type DecisionAction = "approve" | "reject";
export type CategoryNameMap = Map<string, string>;

export interface DecisionTarget {
  request: AdminRequestListItem;
  action: DecisionAction;
}

export const requestTypeLabels: Record<AdminRequestTypeName, string> = {
  categoryCreation: "admin:requests.types.categoryCreation",
  categoryUpdate: "admin:requests.types.categoryUpdate",
  categoryDeletion: "admin:requests.types.categoryDeletion",
  skillCreation: "admin:requests.types.skillCreation",
  appeal: "admin:requests.types.appeal",
  organizationJoin: "admin:requests.types.organizationJoin",
  projectJoin: "admin:requests.types.projectJoin",
  eventJoin: "admin:requests.types.eventJoin",
  taskJoin: "admin:requests.types.taskJoin",
  organizationInvite: "admin:requests.types.organizationInvite",
  projectInvite: "admin:requests.types.projectInvite",
  eventInvite: "admin:requests.types.eventInvite",
  taskInvite: "admin:requests.types.taskInvite",
  organizationLeave: "admin:requests.types.organizationLeave",
  projectLeave: "admin:requests.types.projectLeave",
  eventLeave: "admin:requests.types.eventLeave",
  taskLeave: "admin:requests.types.taskLeave",
  badgeAward: "admin:requests.types.badgeAward",
  report: "admin:requests.types.report",
  unknown: "admin:requests.types.unknown",
};

export const statusLabels: Record<AdminRequestStatusName, string> = {
  new: "admin:requests.statuses.new",
  inProgress: "admin:requests.statuses.inProgress",
  resolved: "admin:requests.statuses.resolved",
  rejected: "admin:requests.statuses.rejected",
  appealed: "admin:requests.statuses.appealed",
  appealResolved: "admin:requests.statuses.appealResolved",
  cancelled: "admin:requests.statuses.cancelled",
  unknown: "admin:requests.statuses.unknown",
};

export const statusOptions: { value: StatusFilterValue; label: string }[] = [
  { value: "all", label: "admin:requests.filters.allStatuses" },
  { value: 0, label: "admin:requests.statuses.new" },
  { value: 1, label: "admin:requests.statuses.inProgress" },
];

export const typeOptions: { value: TypeFilterValue; label: string }[] = [
  { value: "all", label: "admin:requests.filters.allTypes" },
  { value: 5, label: requestTypeLabels.organizationJoin },
  { value: 6, label: requestTypeLabels.projectJoin },
  { value: 7, label: requestTypeLabels.eventJoin },
  { value: 8, label: requestTypeLabels.taskJoin },
  { value: 13, label: requestTypeLabels.organizationLeave },
  { value: 14, label: requestTypeLabels.projectLeave },
  { value: 15, label: requestTypeLabels.eventLeave },
  { value: 16, label: requestTypeLabels.taskLeave },
  { value: 0, label: requestTypeLabels.categoryCreation },
  { value: 3, label: requestTypeLabels.skillCreation },
  { value: 17, label: requestTypeLabels.badgeAward },
  { value: 18, label: requestTypeLabels.report },
  { value: 4, label: requestTypeLabels.appeal },
];

export const joinLeaveTypes = new Set<AdminRequestTypeName>([
  "organizationJoin",
  "projectJoin",
  "eventJoin",
  "taskJoin",
  "organizationLeave",
  "projectLeave",
  "eventLeave",
  "taskLeave",
]);

export const skillsCategoriesTypes = new Set<AdminRequestTypeName>([
  "categoryCreation",
  "categoryUpdate",
  "categoryDeletion",
  "skillCreation",
]);

export const badgeTypes = new Set<AdminRequestTypeName>(["badgeAward"]);
export const reportsAppealsTypes = new Set<AdminRequestTypeName>([
  "report",
  "appeal",
]);
export const hiddenInviteTypes = new Set<AdminRequestTypeName>([
  "organizationInvite",
  "projectInvite",
  "eventInvite",
  "taskInvite",
]);
export const genericDecidableTypes = new Set<AdminRequestTypeName>([
  "categoryCreation",
  "organizationJoin",
  "projectJoin",
  "eventJoin",
  "taskJoin",
  "organizationLeave",
  "projectLeave",
  "eventLeave",
  "taskLeave",
  "badgeAward",
]);

export const tabOptions: { value: RequestsTab; label: string }[] = [
  { value: "all", label: "admin:requests.tabs.all" },
  { value: "joinLeave", label: "admin:requests.tabs.joinLeave" },
  { value: "skillsCategories", label: "admin:requests.tabs.skillsCategories" },
  { value: "badges", label: "admin:requests.tabs.badges" },
  { value: "reportsAppeals", label: "admin:requests.tabs.reportsAppeals" },
];
