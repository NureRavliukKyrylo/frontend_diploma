import type {
  Task,
  TaskDrawerJoinedSearch,
  TaskJoinedMode,
} from "@entities/task";
import { JoinedFeedbackTab } from "@widgets/feedback";
import { TaskCommentsTab } from "../../task-comments/ui/comments-tab/TaskCommentsTab";
import type { User } from "@entities/user/profile";
import { getFullName } from "@entities/user";

interface TaskJoinedTabsProps {
  task: Task;
  user?: User;
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
  comments: (
    <TaskCommentsTab
      PageSize={props.search?.CommentsPageSize ?? 7}
      taskId={props.task.id}
      userId={props.user?.id}
      userName={getFullName(props.user?.firstName, props.user?.lastName)}
      avatarUrl={props.user?.profile?.avatarUrl}
    />
  ),
});
