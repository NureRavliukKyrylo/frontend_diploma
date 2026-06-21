import type { ParticipationMember } from "@entities/participation";

export interface Feedback {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  author: ParticipationMember;
  canSubmitReport: boolean;
}
