import type { TimeTransaction } from "./TimeTransaction";

export interface TimeBankUserStats {
  balanceMinutes: number;
  balanceHours: number;
  reservedMinutes: number;
  lifetimeEarnedMinutes: number;
  lifetimeSpentMinutes: number;
  lifetimeGiftedInMinutes: number;
  lifetimeGiftedOutMinutes: number;
  currentLevel: {
    title: string;
    sortOrder: number;
  };
  nextLevel: {
    title: string;
    sortOrder: number;
  };
  currentLevelMinMinutes: number;
  nextLevelMinMinutes: number;
  progressMinutes: number;
  currentMonthEarnedMinutes: number;
  currentMonthSpentMinutes: number;
  currentMonthGiftedInMinutes: number;
  currentMonthGiftedOutMinutes: number;
  progressPercent: number;
  recentTransactions: TimeTransaction[];
}
