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
  categoryCreation: "Category creation",
  categoryUpdate: "Category update",
  categoryDeletion: "Category deletion",
  skillCreation: "Skill creation",
  appeal: "Appeal",
  organizationJoin: "Organization join",
  projectJoin: "Project join",
  eventJoin: "Event join",
  taskJoin: "Task join",
  organizationInvite: "Organization invite",
  projectInvite: "Project invite",
  eventInvite: "Event invite",
  taskInvite: "Task invite",
  organizationLeave: "Organization leave",
  projectLeave: "Project leave",
  eventLeave: "Event leave",
  taskLeave: "Task leave",
  badgeAward: "Badge award",
  report: "Report",
  unknown: "Unknown request",
};

export const statusLabels: Record<AdminRequestStatusName, string> = {
  new: "New",
  inProgress: "In progress",
  resolved: "Resolved",
  rejected: "Rejected",
  appealed: "Appealed",
  appealResolved: "Appeal resolved",
  cancelled: "Cancelled",
  unknown: "Unknown",
};

export const statusOptions: { value: StatusFilterValue; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: 0, label: "New" },
  { value: 1, label: "In progress" },
];

export const typeOptions: { value: TypeFilterValue; label: string }[] = [
  { value: "all", label: "All request types" },
  { value: 5, label: "Organization join" },
  { value: 6, label: "Project join" },
  { value: 7, label: "Event join" },
  { value: 8, label: "Task join" },
  { value: 13, label: "Organization leave" },
  { value: 14, label: "Project leave" },
  { value: 15, label: "Event leave" },
  { value: 16, label: "Task leave" },
  { value: 0, label: "Category creation" },
  { value: 3, label: "Skill creation" },
  { value: 17, label: "Badge award" },
  { value: 18, label: "Report" },
  { value: 4, label: "Appeal" },
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
  { value: "all", label: "All" },
  { value: "joinLeave", label: "Join & Leave" },
  { value: "skillsCategories", label: "Skills & Categories" },
  { value: "badges", label: "Badges" },
  { value: "reportsAppeals", label: "Reports & Appeals" },
];