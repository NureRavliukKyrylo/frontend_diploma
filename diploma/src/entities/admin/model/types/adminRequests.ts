export type AdminRequestTypeCode =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18;

export type AdminRequestStatusCode = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type AdminRequestTypeName =
  | "categoryCreation"
  | "categoryUpdate"
  | "categoryDeletion"
  | "skillCreation"
  | "appeal"
  | "organizationJoin"
  | "projectJoin"
  | "eventJoin"
  | "taskJoin"
  | "organizationInvite"
  | "projectInvite"
  | "eventInvite"
  | "taskInvite"
  | "organizationLeave"
  | "projectLeave"
  | "eventLeave"
  | "taskLeave"
  | "badgeAward"
  | "report"
  | "unknown";

export type AdminRequestStatusName =
  | "new"
  | "inProgress"
  | "resolved"
  | "rejected"
  | "appealed"
  | "appealResolved"
  | "cancelled"
  | "unknown";

export interface AdminRequestListItem {
  id: string;
  userId: string;
  type: number;
  typeName: AdminRequestTypeName;
  status: number;
  statusName: AdminRequestStatusName;
  targetEntityType: string | null;
  targetEntityId: string | null;
  linkedEntityId: string | null;
  adminId: string | null;
  chatId: string | null;
  createdAt: string;
  updatedAt: string;
  decidedAt: string | null;
  decisionComment: string | null;
  appealParentId: string | null;
  sourceEntityType: string | null;
  sourceEntityId: string | null;
  priorityBoostApplied: boolean;
  priorityBoostMinutesReserved: number | null;
  priorityReservationTransactionId: string | null;
  title: string;
  description: string;
  invitationRoleId: string | null;
  invitationMessage: string | null;
  invitationExpiresAt: string | null;
  invitedByUserId: string | null;
  isExpired: boolean;
  dataJson: unknown | null;
}

export interface AdminRequestsParams {
  Status?: AdminRequestStatusCode;
  Type?: AdminRequestTypeCode;
  TargetEntityType?: string;
  TargetEntityId?: string;
  Search?: string;
  From?: string;
  To?: string;
  Page?: number;
  PageSize?: number;
}

export interface AdminRequestsPagination {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface AdminRequestsResponse {
  data: AdminRequestListItem[];
  pagination: AdminRequestsPagination;
}

export interface AdminRequestDecisionPayload {
  requestId: string;
  typeName: AdminRequestTypeName;
  comment?: string;
  assignToTask?: boolean;
}
