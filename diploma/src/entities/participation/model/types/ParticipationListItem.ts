import type { ParticipationMember } from "./ParticipationMember";

interface ParticipationLeaveEvent {
  date: string;
  comment?: string | null;
}

export interface ParticipationListItem extends ParticipationMember {
  id: string;
  entityType: string;
  entityId: string;
  status?: string | number;
  joinDates?: string[];
  leaveEvents?: ParticipationLeaveEvent[];
  createdBy?: string | null;
  approvedBy?: string | null;
  decidedAt?: string | null;
  decisionComment?: string | null;
  grantedPermissions?: string[] | null;
  revokedPermissions?: string[] | null;
  isActive: boolean;
}
