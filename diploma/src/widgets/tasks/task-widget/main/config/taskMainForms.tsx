import type { Coordinates } from "@shared/config/types";
import { OverviewTab } from "../../overview-tab";
import type { Task, TaskDrawerSearch, TaskMode } from "@entities/task";
import { ActivityFeedbackTab, ActivityMembersTab } from "@widgets/activities";
import type { FeedbackSortValues } from "@entities/feedback";
import { TaskCommentsTab } from "../../../task-comments/ui/comments-tab/TaskCommentsTab";

interface TaskTabsProps {
  task: Task;
  userLocation?: Coordinates | null;
  userId?: string;
  search?: TaskDrawerSearch;
  handleSort: (value: FeedbackSortValues) => void;
}

export const getTaskMainForms = (
  props: TaskTabsProps,
): Record<TaskMode, React.ReactNode> => ({
  overview: <OverviewTab task={props.task} userLocation={props.userLocation} />,
  comments: (
    <TaskCommentsTab
      PageSize={props.search?.DrawerPageSize ?? 7}
      taskId={props.task.id}
      userId={props.userId}
    />
  ),
  members: (
    <ActivityMembersTab
      entityId={props.task.id}
      userId={props.userId}
      entityType="task"
      PageSize={props.search?.DrawerPageSize ?? 8}
    />
  ),
  feedbacks: (
    <ActivityFeedbackTab
      entityType="task"
      userId={props.userId}
      entityId={props.task.id}
      PageSize={props.search?.DrawerPageSize ?? 3}
      OrderBy={props.search?.DrawerOrderBy ?? "Default"}
      handleSort={props.handleSort}
      canSubmitFeedback={props.task.canSubmitFeedback}
      rating={props.task.rating}
    />
  ),
});
