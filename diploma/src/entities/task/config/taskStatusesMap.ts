import type { StatusConfig } from "@shared/config/types";
import type { TFunction } from "i18next";
import type { TaskStatus } from "../model/types/TaskStatus";

type TaskEntityStatus = TaskStatus | "Overdue";

const STATUS_STYLE_TOKENS: Record<
  TaskEntityStatus,
  Omit<StatusConfig, "label">
> = {
  Pending: {
    bg: "#f1efe8",
    color: "#5f5e5a",
    shadow: "rgba(95, 94, 90, 0.2)",
  },
  InProgress: {
    bg: "#eaf3de",
    color: "#3b6d11",
    shadow: "rgba(59, 109, 17, 0.25)",
  },
  Completed: {
    bg: "#e6f1fb",
    color: "#185fa5",
    shadow: "rgba(24, 95, 165, 0.25)",
  },
  Cancelled: {
    bg: "#fce8e6",
    color: "#a82216",
    shadow: "rgba(168, 34, 22, 0.2)",
  },
  Overdue: {
    bg: "#faeeda",
    color: "#854f0b",
    shadow: "rgba(133, 79, 11, 0.25)",
  },
};

export const getTaskStatusConfig = (
  status: TaskEntityStatus,
  t: TFunction,
): StatusConfig => {
  const styles = STATUS_STYLE_TOKENS[status] ?? STATUS_STYLE_TOKENS.Pending;

  const fallbackLabels: Record<TaskEntityStatus, string> = {
    Pending: "Pending",
    InProgress: "In Progress",
    Completed: "Completed",
    Cancelled: "Cancelled",
    Overdue: "Overdue",
  };

  return {
    ...styles,
    label: t(`task:statuses.${status}`, {
      defaultValue: fallbackLabels[status],
    }),
  };
};
