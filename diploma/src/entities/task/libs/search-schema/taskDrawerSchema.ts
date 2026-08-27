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
  roles: {
    taskMode: "roles" as const,
  },
  timelog: {
    taskMode: "timelog" as const,
    DrawerPageSize: 20,
  },
};

export type TaskDrawerSearch = {
  taskId?: string;
  taskMode?:
    | "overview"
    | "comments"
    | "members"
    | "feedbacks"
    | "roles"
    | "timelog";
  PageSize: number;
  DrawerPageSize?: number;
  DrawerOrderBy?: FeedbackSortValues;
};
