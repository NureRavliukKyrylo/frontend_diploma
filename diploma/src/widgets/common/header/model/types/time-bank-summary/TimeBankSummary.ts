interface TimeLevel {
  id: string;
  code: string;
  title: string;
  description: string | null;
  minLifetimeMinutes: number;
  minLifetimeHours: number;
  sortOrder: number;
  badgeId: string | null;
  isCore: boolean;
  isActive: boolean;
  isCurrent: boolean;
}

export interface TimeBankSummary {
  userId: string;
  balanceMinutes: number;
  balanceHours: number;
  reservedMinutes: number;
  reservedHours: number;
  availableMinutes: number;
  availableHours: number;
  lifetimeEarnedMinutes: number;
  lifetimeEarnedHours: number;
  lifetimeSpentMinutes: number;
  lifetimeSpentHours: number;
  lifetimeGiftedInMinutes: number;
  lifetimeGiftedInHours: number;
  lifetimeGiftedOutMinutes: number;
  lifetimeGiftedOutHours: number;
  currentLevelCode: string | null;
  currentLevel: TimeLevel | null;
  lastTransactionAt: string | null;
  updatedAt: string;
}
