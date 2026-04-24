import styles from "./TaskBoard.module.scss";
import { boardColumns } from "../../config/boardColumns";
import type { Task, TasksRequestParams, TaskStatus } from "@entities/task";
import type { ReactNode } from "react";
import { TaskBoardColumn } from "../board-column/TaskBoardColumn";
import { TaskBoardProvider } from "../../model/TaskBoardContext";

interface TaskBoardProps {
  renderCard: (task: Task, index: number) => ReactNode;
  onAddTask?: (status: TaskStatus) => void;
  renderSkeleton?: () => React.ReactNode;
  filters?: Omit<TasksRequestParams, "Status">;
}

export const TaskBoard = ({
  renderCard,
  onAddTask,
  renderSkeleton,
  filters,
}: TaskBoardProps) => (
  <TaskBoardProvider value={{ renderCard, onAddTask, renderSkeleton, filters }}>
    <div className={styles.taskBoard}>
      {boardColumns.map((column) => (
        <TaskBoardColumn key={column.status} {...column} />
      ))}
    </div>
  </TaskBoardProvider>
);
