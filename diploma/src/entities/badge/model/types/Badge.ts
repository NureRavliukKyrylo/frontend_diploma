import type { Tier } from "./TierList";

export interface Badge {
  image: string;
  name: string;
  description: string;
  tier: Tier;
}
