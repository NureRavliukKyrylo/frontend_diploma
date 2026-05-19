import type {
  EventsSearch,
  FeedbackSearch,
  MembersSearch,
  Project,
  ProjectDetailSearch,
  ProjectMode,
} from "@entities/project";
import type { Coordinates } from "@shared/config/types";
import type { Event } from "@entities/event";
import { OverviewTab } from "../../overview-tab";
import { ProjectEventsTab } from "../../events-tab";
import { ActivityFeedbackTab, ActivityMembersTab } from "@widgets/activities";
import type { FeedbackSortValues } from "@entities/feedback";
import type { TaskDrawerSearch, TasksRequestParams } from "@entities/task";
import { TasksTab } from "../../tasks-tab";

interface ProjectTabsProps {
  project: Project;
  userLocation?: Coordinates | null;
  events?: Event[];
  userId?: string;
  search: Omit<ProjectDetailSearch, "tab">;
  filters?: Omit<TasksRequestParams, "Status">;
  handleSort: (value: FeedbackSortValues) => void;
}

export const getProjectMainForms = (
  props: ProjectTabsProps,
): Record<ProjectMode, React.ReactNode> => ({
  overview: (
    <OverviewTab
      project={props.project}
      userLocation={props.userLocation}
      events={props.events}
    />
  ),
  members: (
    <ActivityMembersTab
      entityId={props.project.id}
      userId={props.userId}
      PageSize={(props.search as MembersSearch).PageSize}
      entityType="project"
    />
  ),
  feedback: (
    <ActivityFeedbackTab
      entityType="project"
      userId={props.userId}
      entityId={props.project.id}
      PageSize={(props.search as FeedbackSearch).PageSize}
      OrderBy={(props.search as FeedbackSearch).OrderBy}
      canSubmitFeedback={props.project.canSubmitFeedback}
      handleSort={props.handleSort}
    />
  ),
  events: (
    <ProjectEventsTab
      projectId={props.project.id}
      search={props.search as EventsSearch}
    />
  ),
  tasks: (
    <TasksTab
      search={props.search as TaskDrawerSearch}
      filters={props.filters}
    />
  ),
});
