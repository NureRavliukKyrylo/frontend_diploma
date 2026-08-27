import type { EntityType } from "@shared/config/types";

export interface RecommendationScoreBreakdown {
  skillCategoryMatch: number;
  availabilityFit: number;
  locationFit: number;
  ratingReliability: number;
  relevantHistory: number;
  priorityBoost: number;
  entityTrust: number;
  freshnessUrgency: number;
  totalScore: number;
}

export interface VolunteerRecommendation {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  score: number;
  hasActivePriorityBoost: boolean;
  priorityBoostExpiresAt: string | null;
  breakdown: RecommendationScoreBreakdown;
  matchedSkillIds: string[];
  matchedCategoryIds: string[];
  reasons: string[];
}

export interface VolunteerRecommendationsParams {
  entityType: EntityType;
  entityId: string;
  take?: number;
}
