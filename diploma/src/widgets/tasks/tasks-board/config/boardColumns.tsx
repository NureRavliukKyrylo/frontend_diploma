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
  { status: "planned", title: "PLANNED", icon: PlannedStatus },
  { status: "inProgress", title: "IN PROGRESS", icon: InProgressStatus },
  { status: "done", title: "DONE", icon: DoneStatus },
  { status: "hold", title: "ON HOLD", icon: OnHoldStatus },
];
