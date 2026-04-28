import type { FeedbackSortValues } from "@entities/feedback";

export const taskDrawerDefaults = {
  overview: {
    taskMode: "overview" as const,
  },
  members: {
    taskMode: "members" as const,
    DrawerPageSize: 8,
  },
  feedbacks: {
    taskMode: "feedbacks" as const,
    DrawerPageSize: 3,
    DrawerOrderBy: "Default" as const,
  },
};

export type TaskDrawerSearch = {
  taskId?: string;
  taskMode?: "overview" | "members" | "feedbacks";
  DrawerPageSize?: number;
  DrawerOrderBy?: FeedbackSortValues;
};
