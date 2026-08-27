export type OrganizationRequestKind = "join" | "leave";

export interface OrganizationRequest {
  id: string;
  status: string;
  targetEntityId: string;
}

export type OrganizationJoinRequest = OrganizationRequest;
export type OrganizationLeaveRequest = OrganizationRequest;

export interface OrganizationPendingRequest {
  id: string;
  userId: string;
  status: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  kind: OrganizationRequestKind;
}
