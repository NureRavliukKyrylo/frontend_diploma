import { SwipeableDrawer } from "@mui/material";
import { TaskBoardItem, TaskBoardItemSkeleton } from "@entities/task";
import { TaskBoard, TaskWidget } from "@widgets/tasks";
import type {
  Task,
  TaskDrawerSearch,
  TasksRequestParams,
} from "@entities/task";
import type { TaskMode } from "@entities/task";
import type { FeedbackSortValues } from "@entities/feedback";
import styles from "./ActivityTasksTab.module.scss";

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
}: ActivityTasksTabProps) => (
  <>
    <TaskBoard
      filters={filters}
      renderSkeleton={() => <TaskBoardItemSkeleton />}
      renderCard={(task: Task) => (
        <div
          key={task.id}
          className={styles.cardWrapper}
          onClick={() => openTask(task.id)}
        >
          <TaskBoardItem task={task} />
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
          />
        )}
      </div>
    </SwipeableDrawer>
  </>
);
