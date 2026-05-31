import type {
  Project,
  ProjectDetailSearch,
  ProjectJoinedMode,
} from "@entities/project";
import type { Coordinates } from "@shared/config/types";
import type {
  MyTasksRequestParams,
  TaskDrawerJoinedSearch,
} from "@entities/task";
import { JoinedFeedbackTab } from "@widgets/feedback";
import { TasksTabJoined } from "../../tasks-tab";
import { OverviewTabJoined } from "../../overview-tab";

interface JoinedProjectTabsProps {
  project: Project;
  userLocation?: Coordinates | null;
  search: Omit<ProjectDetailSearch, "tab">;
  filters?: Omit<MyTasksRequestParams, "Status">;
}

export const getJoinedProjectMainForms = (
  props: JoinedProjectTabsProps,
): Record<ProjectJoinedMode, React.ReactNode> => ({
  overview: (
    <OverviewTabJoined
      project={props.project}
      userLocation={props.userLocation}
    />
  ),
  feedback: (
    <JoinedFeedbackTab
      canSubmitFeedback={props.project.canSubmitFeedback}
      entityId={props.project.id}
      entityType="project"
    />
  ),
  tasks: (
    <TasksTabJoined
      search={props.search as TaskDrawerJoinedSearch}
      filters={props.filters}
    />
  ),
});
