import dayjs from "dayjs";
import { formatAdminCount } from "@entities/admin";
import type { MonthlyGrowthPoint } from "@entities/admin";

export type DateRangePreset = "7d" | "30d" | "90d" | "year" | "custom";
export type TotalTone = "neutral" | "green" | "amber" | "red";

export interface DateRangeState {
  preset: DateRangePreset;
  from: string;
  to: string;
}

export interface TotalCardItem {
  label: string;
  value: string;
  tone: TotalTone;
  isLoading: boolean;
  isError: boolean;
}

export interface GrowthRow {
  key: keyof Pick<
    MonthlyGrowthPoint,
    "users" | "organizations" | "projects" | "events" | "tasks"
  >;
  label: string;
  soft: string;
  solid: string;
}

export interface FunnelStage {
  label: string;
  value: string;
  width: number;
  color: string;
}

export const rangeOptions: { value: DateRangePreset; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "year", label: "This year" },
  { value: "custom", label: "Custom range" },
];

export const growthRows: GrowthRow[] = [
  { key: "users", label: "Users", soft: "#fbeaea", solid: "#8b0000" },
  { key: "organizations", label: "Orgs", soft: "#fff3da", solid: "#c07000" },
  { key: "projects", label: "Projects", soft: "#e6f6ec", solid: "#1a7a45" },
  { key: "events", label: "Events", soft: "#e6f1fb", solid: "#185fa5" },
  { key: "tasks", label: "Tasks", soft: "#f1efe8", solid: "#5f5e5a" },
];

export const getRangeDates = (preset: DateRangePreset) => {
  const now = dayjs();

  if (preset === "7d") {
    return {
      from: now.subtract(6, "day").startOf("day").format("YYYY-MM-DD"),
      to: now.format("YYYY-MM-DD"),
    };
  }

  if (preset === "90d") {
    return {
      from: now.subtract(89, "day").startOf("day").format("YYYY-MM-DD"),
      to: now.format("YYYY-MM-DD"),
    };
  }

  if (preset === "year") {
    return {
      from: now.startOf("year").format("YYYY-MM-DD"),
      to: now.format("YYYY-MM-DD"),
    };
  }

  return {
    from: now.subtract(29, "day").startOf("day").format("YYYY-MM-DD"),
    to: now.format("YYYY-MM-DD"),
  };
};

export const defaultRange = {
  preset: "30d" as DateRangePreset,
  ...getRangeDates("30d"),
};

export const clampPercent = (value: number) => Math.max(0, Math.min(100, value || 0));
export const formatPercent = (value: number) => `${Math.round(value)}%`;
export const formatNumber = (value: number | null | undefined) =>
  formatAdminCount(value ?? 0);
export const formatRatio = (value: number | null | undefined) =>
  Number.isFinite(value ?? NaN) ? (value ?? 0).toFixed(2) : "0.00";
