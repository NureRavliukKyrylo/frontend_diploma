export interface Rating {
  value: number;
  totalVotes: number;
  detailInfo: { value: number; totalVotes: number; percentOfAll: number }[];
}
