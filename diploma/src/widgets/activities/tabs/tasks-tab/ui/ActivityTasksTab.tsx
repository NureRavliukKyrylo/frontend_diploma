import { SwipeableDrawer } from "@mui/material";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TaskBoardListItem,
  TaskBoardListItemSkeleton,
  taskKeys,
  updateTaskStatus,
  useTasksInfiniteQuery,
} from "@entities/task";
import { TaskBoard, TaskWidget } from "@widgets/tasks";
import type {
  Task,
  TaskDrawerSearch,
  TaskStatus,
  TasksRequestParams,
} from "@entities/task";
import type { TaskMode } from "@entities/task";
import type { FeedbackSortValues } from "@entities/feedback";
import styles from "./ActivityTasksTab.module.scss";
import { useTranslation } from "react-i18next";

interface ActivityTasksTabProps {
  search: TaskDrawerSearch;
  filters?: Omit<TasksRequestParams, "Status">;
  taskId?: string;
  taskMode: TaskMode;
  isOpen: boolean;
  openTask: (taskId: string) => void;
  closeTask: () => void;
  handleModeChange: (taskMode: TaskMode) => void;
  handleSortChange: (value: FeedbackSortValues) => void;
  canMoveTasks?: boolean;
}

export const ActivityTasksTab = ({
  search,
  filters,
  taskId,
  taskMode,
  isOpen,
  openTask,
  closeTask,
  handleModeChange,
  handleSortChange,
  canMoveTasks = false,
}: ActivityTasksTabProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("task");

  const statusMutation = useMutation({
    mutationFn: ({
      task,
      status,
    }: {
      task: Task;
      status: TaskStatus;
    }) => updateTaskStatus(task.id, { status }),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: taskKeys.all() }),
        queryClient.invalidateQueries({ queryKey: taskKeys.id(variables.task.id) }),
      ]);
    },
    onError: () => {
      addToast({
        title: t("board.moveFailed", "Could not update task status"),
        color: "danger",
      });
    },
  });

  const handleMoveTask = (task: Task, status: TaskStatus) => {
    if (!canMoveTasks || task.status === status || statusMutation.isPending)
      return;
    statusMutation.mutate({ task, status });
  };

  return (
    <>
      <TaskBoard
        useTasksQuery={(status) =>
          useTasksInfiniteQuery({ ...filters, Status: status })
        }
        canMoveTasks={canMoveTasks}
        isMovingTask={statusMutation.isPending}
        onMoveTask={handleMoveTask}
        renderSkeleton={() => <TaskBoardListItemSkeleton />}
        renderCard={(task: Task) => (
          <div
            key={task.id}
            className={styles.cardWrapper}
            onClick={() => openTask(task.id)}
          >
            <TaskBoardListItem task={task} />
          </div>
        )}
      />
      <SwipeableDrawer
        open={isOpen}
        onOpen={() => {}}
        onClose={closeTask}
        anchor="right"
        className={styles.drawer}
      >
        <div className={styles.drawerContent}>
          {taskId && (
            <TaskWidget
              search={search}
              taskId={taskId}
              taskMode={taskMode}
              handleModeChange={handleModeChange}
              handleSort={handleSortChange}
              onClose={closeTask}
            />
          )}
        </div>
      </SwipeableDrawer>
    </>
  );
};
