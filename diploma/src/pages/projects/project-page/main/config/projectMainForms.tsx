import type { Project, ProjectMode } from "@entities/project";
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
      entityType="project"
    />
  ),
  feedback: (
    <ActivityFeedbackTab
      entityType="project"
      userId={props.userId}
      entityId={props.project.id}
    />
  ),
  events: <ProjectEventsTab projectId={props.project.id} />,
  tasks: <></>,
});
