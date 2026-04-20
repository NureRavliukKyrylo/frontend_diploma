import type { Project, ProjectMode } from "@entities/project";
import type { Coordinates } from "@shared/config/types";
import type { Event } from "@entities/event";
import { OverviewTab } from "../../overview-tab";
import { ProjectMembersTab } from "../../members-tab";
import { ProjectFeedbackTab } from "../../feedback-tab";
import { ProjectEventsTab } from "../../events-tab";

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
    <ProjectMembersTab projectId={props.project.id} userId={props.userId} />
  ),
  feedback: <ProjectFeedbackTab project={props.project} />,
  events: <ProjectEventsTab projectId={props.project.id} />,
  tasks: <></>,
});
