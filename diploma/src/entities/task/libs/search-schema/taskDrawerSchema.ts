import type { FeedbackSortValues } from "@entities/feedback";

export const taskDrawerDefaults = {
  overview: {
    taskMode: "overview" as const,
  },
  comments: {
    taskMode: "comments" as const,
    DrawerPageSize: 7,
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
  taskMode?: "overview" | "comments" | "members" | "feedbacks";
  PageSize: number;
  DrawerPageSize?: number;
  DrawerOrderBy?: FeedbackSortValues;
};
