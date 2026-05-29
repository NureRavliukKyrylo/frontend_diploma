export type LevelProgress = {
  currentProgress: number;
  maxProgress: number;
  level: number | null;
  percent: number;
  expToNextLevel: number;
  isMaxLevel: boolean;
};
