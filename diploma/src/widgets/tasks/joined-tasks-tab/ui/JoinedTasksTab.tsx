import { SwipeableDrawer } from "@mui/material";
import {
  TaskBoardControlItem,
  TaskBoardControlItemSkeleton,
  useMyTasksInfiniteQuery,
} from "@entities/task";
import { TaskBoard, TaskWidgetJoined } from "@widgets/tasks";
import type {
  MyTasksRequestParams,
  Task,
  TaskDrawerJoinedSearch,
  TaskJoinedMode,
} from "@entities/task";
import styles from "./JoinedTasksTab.module.scss";
import { useJoinedTasksTab } from "../model/useJoinedTasksTab";
import { LeaveConfirmationModal } from "@features/participation";

interface JoinedTasksTabProps {
  search: TaskDrawerJoinedSearch;
  filters?: Omit<MyTasksRequestParams, "Status">;
  taskId?: string;
  taskMode: TaskJoinedMode;
  isOpen: boolean;
  openTask: (taskId: string) => void;
  closeTask: () => void;
  handleModeChange: (taskMode: TaskJoinedMode) => void;
}

export const JoinedTasksTab = ({
  search,
  filters,
  taskId,
  taskMode,
  isOpen,
  openTask,
  closeTask,
  handleModeChange,
}: JoinedTasksTabProps) => {
  const { selectedTask, getMenuItems, handleCloseModal, modalType } =
    useJoinedTasksTab();

  return (
    <>
      <TaskBoard
        useTasksQuery={(status) =>
          useMyTasksInfiniteQuery({ ...filters, Status: status })
        }
        renderSkeleton={() => <TaskBoardControlItemSkeleton />}
        renderCard={(task: Task) => (
          <div
            key={task.id}
            className={styles.cardWrapper}
            onClick={() => openTask(task.id)}
          >
            <TaskBoardControlItem task={task} menuItems={getMenuItems(task)} />
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
            <TaskWidgetJoined
              search={search}
              taskId={taskId}
              taskMode={taskMode}
              handleModeChange={handleModeChange}
            />
          )}
        </div>
      </SwipeableDrawer>
      {selectedTask && (
        <LeaveConfirmationModal
          entityId={selectedTask.id}
          entityName={selectedTask.title}
          entityType="task"
          isOpen={modalType === "leave"}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
