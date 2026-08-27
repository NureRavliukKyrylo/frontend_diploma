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
  emptyHint: string;
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
    pending: string;
    approved: string;
    rejected: string;
    disputed: string;
    export: string;
    totalRecords: string;
    pendingRecords: string;
    approvedMinutes: string;
    loggedMinutes: string;
  };
  sections: {
    pending: string;
    disputed: string;
    approved: string;
    other: string;
  };
  badges: {
    managerEdited: string;
    disputeOpen: string;
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
