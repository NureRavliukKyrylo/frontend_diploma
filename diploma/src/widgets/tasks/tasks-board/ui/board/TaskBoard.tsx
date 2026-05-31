import styles from "./TaskBoard.module.scss";
import { boardColumns } from "../../config/boardColumns";
import type { Task, TaskStatus } from "@entities/task";
import type { ReactNode } from "react";
import { TaskBoardColumn } from "../board-column/TaskBoardColumn";
import { TaskBoardProvider } from "../../model/TaskBoardContext";
import type { QueryResult } from "@shared/config/types";

interface TaskBoardProps {
  renderCard: (task: Task, index: number) => ReactNode;
  onAddTask?: (status: TaskStatus) => void;
  renderSkeleton?: () => React.ReactNode;
  useTasksQuery: (status: TaskStatus) => () => QueryResult<Task>;
}

export const TaskBoard = ({
  renderCard,
  onAddTask,
  renderSkeleton,
  useTasksQuery,
}: TaskBoardProps) => (
  <TaskBoardProvider
    value={{ renderCard, onAddTask, renderSkeleton, useTasksQuery }}
  >
    <div className={styles.taskBoard}>
      {boardColumns.map((column) => (
        <TaskBoardColumn key={column.status} {...column} />
      ))}
    </div>
  </TaskBoardProvider>
);
