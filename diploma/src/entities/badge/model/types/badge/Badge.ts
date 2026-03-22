import type { Tier } from "../tier/TierList";

export interface Badge {
  id: string;
  image: string;
  name: string;
  description: string;
  tier: Tier;
}
