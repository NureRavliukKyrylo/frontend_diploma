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
  { status: "Planned", title: "PLANNED", icon: PlannedStatus },
  { status: "InProgress", title: "IN PROGRESS", icon: InProgressStatus },
  { status: "Done", title: "DONE", icon: DoneStatus },
  { status: "Hold", title: "ON HOLD", icon: OnHoldStatus },
];
