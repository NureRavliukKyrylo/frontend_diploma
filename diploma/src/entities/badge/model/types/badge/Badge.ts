import type { EntityType } from "@shared/config/types";
import type { Tier } from "../tier/TierList";

export interface Badge {
  id: string;
  title: string;
  iconUrl: string;
  description: string;
  rank: { value: number; name: Tier };
  awardedCountTotal: number;
  firstAwardedAt: string;
  isUnlocked: boolean;
  progressPercent: number;
  ruleProgress: {
    label: string;
  }[];
  scopeEntityType: EntityType;
  scopeEntityId: string;
}
