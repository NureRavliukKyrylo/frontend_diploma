import type {
  MyTasksRequestParams,
  TaskDrawerJoinedSearch,
} from "@entities/task";
import { JoinedTasksTab } from "@widgets/tasks";
import { useTasksTabEventJoined } from "../model/useTasksTabEventJoined";

interface TasksTabJoined {
  search: TaskDrawerJoinedSearch;
  filters?: Omit<MyTasksRequestParams, "Status">;
}

export const TasksTabJoined = ({ search, filters }: TasksTabJoined) => {
  const { isOpen, closeTask, handleModeChange, openTask, taskId, taskMode } =
    useTasksTabEventJoined();
  return (
    <JoinedTasksTab
      closeTask={closeTask}
      isOpen={isOpen}
      handleModeChange={handleModeChange}
      openTask={openTask}
      taskMode={taskMode}
      taskId={taskId}
      search={search}
      filters={filters}
    />
  );
};
