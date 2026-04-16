import type { Organization } from "@entities/organization";
import type { EntityStatus, ParticipationMember } from "@shared/config/types";

export interface Task {
  id: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  organization: Organization;
  status: EntityStatus;
  memberPreviews: ParticipationMember[];
}
