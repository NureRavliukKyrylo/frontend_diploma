import type { Tier } from "../tier/TierList";

export interface Badge {
  id: string;
  title: string;
  iconUrl: string;
  description: string;
  rank: Tier;
}
