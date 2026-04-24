import type { TaskStatus } from "@entities/task";
import type { ReactNode } from "react";

export interface BoardColumnConfig {
  status: TaskStatus;
  title: string;
  icon: ReactNode;
}

export const boardColumns: BoardColumnConfig[] = [
  { status: "planned", title: "PLANNED", icon: <div /> },
  { status: "inProgress", title: "IN PROGRESS", icon: <div /> },
  { status: "done", title: "DONE", icon: <div /> },
  { status: "hold", title: "ON HOLD", icon: <div /> },
];
