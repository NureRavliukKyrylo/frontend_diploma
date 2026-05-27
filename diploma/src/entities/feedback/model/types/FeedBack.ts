import type { ParticipationMember } from "@shared/config/types";

export interface Feedback {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  author: ParticipationMember;
}
