import styles from "./TaskBoardColumn.module.scss";
import { TasksListWidget } from "@widgets/tasks";
import { useTasksListQuery } from "@entities/task";
import type { TaskStatus } from "@entities/task";
import type { ReactNode } from "react";
import { useTaskBoardContext } from "../../model/TaskBoardContext";

interface TaskBoardColumnProps {
  status: TaskStatus;
  title: string;
  icon: ReactNode;
}

export const TaskBoardColumn = ({
  status,
  title,
  icon,
}: TaskBoardColumnProps) => {
  const { renderCard, renderSkeleton, onAddTask, filters } =
    useTaskBoardContext();

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <div className={styles.columnTitle}>
          {icon}
          <span>{title}</span>
        </div>
        {onAddTask && (
          <button
            className={styles.addTaskButton}
            onClick={() => onAddTask(status)}
          />
        )}
      </div>
      <TasksListWidget
        useTasksQuery={useTasksListQuery({ ...filters, Status: status })}
        renderCard={renderCard}
        renderSkeleton={renderSkeleton}
        className={styles.columnCards}
      />
    </div>
  );
};
