import type { Coordinates } from "@shared/config/types";
import { OverviewTab } from "../../overview-tab";
import type { Task, TaskMode } from "@entities/task";
import { ActivityFeedbackTab, ActivityMembersTab } from "@widgets/activities";

interface TaskTabsProps {
  task: Task;
  userLocation?: Coordinates | null;
  userId?: string;
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
    />
  ),
  feedbacks: (
    <ActivityFeedbackTab
      entityType="task"
      userId={props.userId}
      entityId={props.task.id}
    />
  ),
});
