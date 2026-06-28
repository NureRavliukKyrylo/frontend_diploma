import type { TaskTimeLogRecord } from "@entities/task";

export type TaskLogAction = "manager-edit" | "approve" | "reject" | "resolve";

export interface ActiveTaskLogAction {
  type: TaskLogAction;
  record: TaskTimeLogRecord;
}

export interface TaskTimeLogsLabels {
  loading: string;
  error: string;
  empty: string;
  table: {
    volunteer: string;
    logged: string;
    adjusted: string;
    approved: string;
    status: string;
    note: string;
    actions: string;
    notProvided: string;
  };
  controls: {
    allStatuses: string;
    export: string;
  };
  actions: {
    managerEdit: string;
    approve: string;
    reject: string;
    resolve: string;
    resolveAsApprove: string;
    resolveAsReject: string;
  };
  modal: {
    title: string;
    text: string;
    minutes: string;
    finalMinutes: string;
    commentPlaceholder: string;
    confirm: string;
    cancel: string;
  };
  notifications: {
    saved: string;
    failed: string;
    exported: string;
  };
}

export const statusOptions = [
  "Draft",
  "Submitted",
  "ManagerEditedPendingVolunteerReconfirm",
  "Approved",
  "Rejected",
  "Disputed",
  "Resolved",
  "Cancelled",
];
