export interface OrganizationParticipationRequest {
  id: string;
  status: string;
  targetEntityType?: string | null;
  targetEntityId?: string | null;
  linkedEntityId?: string | null;
}

export interface JoinOrganizationResponse {
  mode?: "direct" | "request";
  participationId?: string | null;
  request?: OrganizationParticipationRequest;
}

export interface LeaveOrganizationResponse extends JoinOrganizationResponse {
  message?: string;
}
