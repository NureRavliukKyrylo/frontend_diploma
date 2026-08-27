import type { TaskStatus } from "@entities/task";
import {
  DoneStatus,
  InProgressStatus,
  OnHoldStatus,
  PlannedStatus,
} from "@shared/assets/icons/info";

export interface BoardColumnConfig {
  status: TaskStatus;
  title: string;
  icon: string;
}

export const boardColumns: BoardColumnConfig[] = [
  { status: "InProgress", title: "IN PROGRESS", icon: InProgressStatus },
  { status: "Completed", title: "DONE", icon: DoneStatus },
  { status: "Pending", title: "ON HOLD", icon: OnHoldStatus },
  { status: "Cancelled", title: "CANCELLED", icon: PlannedStatus },
];
