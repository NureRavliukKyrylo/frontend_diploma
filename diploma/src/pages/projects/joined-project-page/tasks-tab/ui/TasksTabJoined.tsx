import type {
  MyTasksRequestParams,
  TaskDrawerJoinedSearch,
} from "@entities/task";
import { JoinedTasksTab } from "@widgets/tasks";
import { useTasksTabProjectJoined } from "../model/useTasksTabProjectJoined";

interface TasksTabJoined {
  search: TaskDrawerJoinedSearch;
  filters?: Omit<MyTasksRequestParams, "Status">;
}

export const TasksTabJoined = ({ search, filters }: TasksTabJoined) => {
  const { isOpen, closeTask, handleModeChange, openTask, taskId, taskMode } =
    useTasksTabProjectJoined();
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
