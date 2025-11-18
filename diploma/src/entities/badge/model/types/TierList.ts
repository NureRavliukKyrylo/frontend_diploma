export const TierList = {
  S: "S",
  A: "A",
  B: "B",
  C: "C",
  E: "E",
  D: "D",
} as const;

export type Tier = keyof typeof TierList;
