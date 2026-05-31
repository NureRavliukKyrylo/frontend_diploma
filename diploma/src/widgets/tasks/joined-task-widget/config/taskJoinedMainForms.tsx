import type {
  Task,
  TaskDrawerJoinedSearch,
  TaskJoinedMode,
} from "@entities/task";
import { JoinedFeedbackTab } from "@widgets/feedback";

interface TaskJoinedTabsProps {
  task: Task;
  userAvatar: string;
  search?: TaskDrawerJoinedSearch;
}

export const getTaskJoinedMainForms = (
  props: TaskJoinedTabsProps,
): Record<TaskJoinedMode, React.ReactNode> => ({
  feedback: (
    <JoinedFeedbackTab
      canSubmitFeedback={props.task.canSubmitFeedback}
      entityType="task"
      entityId={props.task.id}
    />
  ),
  comments: <></>,
});
