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

interface ProjectTabsProps {
  project: Project;
  userLocation?: Coordinates | null;
  events?: Event[];
  userId?: string;
  search: Omit<ProjectDetailSearch, "tab">;
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
      search={props.search as MembersSearch}
      entityType="project"
    />
  ),
  feedback: (
    <ActivityFeedbackTab
      entityType="project"
      userId={props.userId}
      entityId={props.project.id}
      search={props.search as FeedbackSearch}
    />
  ),
  events: (
    <ProjectEventsTab
      projectId={props.project.id}
      search={props.search as EventsSearch}
    />
  ),
  tasks: <></>,
});
