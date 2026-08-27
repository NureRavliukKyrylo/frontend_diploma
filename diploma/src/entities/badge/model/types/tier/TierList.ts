export const TierList = {
  S: "S",
  A: "A",
  B: "B",
  C: "C",
  E: "E",
  D: "D",
  F: "F",
} as const;

export const TierOrder: Record<Tier, number> = {
  S: 7,
  A: 6,
  B: 5,
  C: 4,
  D: 3,
  E: 2,
  F: 1,
};

export type Tier = keyof typeof TierList;
