import { ActivityTasksTab } from "@widgets/activities";
import type { TaskDrawerSearch, TasksRequestParams } from "@entities/task";
import { useTasksTabEvent } from "../model/useTasksTabEvent";

interface TasksTabProps {
  search: TaskDrawerSearch;
  filters?: Omit<TasksRequestParams, "Status">;
  canMoveTasks?: boolean;
}

export const TasksTab = ({ search, filters, canMoveTasks }: TasksTabProps) => {
  const {
    isOpen,
    closeTask,
    handleModeChange,
    handleSortChange,
    openTask,
    taskId,
    taskMode,
  } = useTasksTabEvent();
  return (
    <ActivityTasksTab
      closeTask={closeTask}
      isOpen={isOpen}
      handleModeChange={handleModeChange}
      handleSortChange={handleSortChange}
      openTask={openTask}
      taskMode={taskMode}
      taskId={taskId}
      search={search}
      filters={filters}
      canMoveTasks={canMoveTasks}
    />
  );
};
