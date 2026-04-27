import type { Coordinates } from "@shared/config/types";
import { OverviewTab } from "../../overview-tab";
import type {
  FeedbackTaskSearch,
  MembersTaskSearch,
  Task,
  TaskDetailSearch,
  TaskMode,
} from "@entities/task";
import { ActivityFeedbackTab, ActivityMembersTab } from "@widgets/activities";

interface TaskTabsProps {
  task: Task;
  userLocation?: Coordinates | null;
  userId?: string;
  search?: TaskDetailSearch;
}

export const getTaskMainForms = (
  props: TaskTabsProps,
): Record<TaskMode, React.ReactNode> => ({
  overview: <OverviewTab task={props.task} userLocation={props.userLocation} />,
  members: (
    <ActivityMembersTab
      entityId={props.task.id}
      userId={props.userId}
      entityType="task"
      PageSize={(props.search as MembersTaskSearch)?.DrawerPageSize ?? 8}
    />
  ),
  feedbacks: (
    <ActivityFeedbackTab
      entityType="task"
      userId={props.userId}
      entityId={props.task.id}
      PageSize={(props.search as FeedbackTaskSearch)?.DrawerPageSize ?? 3}
      OrderBy={(props.search as FeedbackTaskSearch)?.DrawerOrderBy ?? "default"}
    />
  ),
});
