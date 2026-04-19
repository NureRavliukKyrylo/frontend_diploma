import type { Project, ProjectMode } from "@entities/project";
import type { Coordinates } from "@shared/config/types";
import type { Event } from "@entities/event";
import { OverviewTab } from "../../overview-tab";
import { ProjectMembersTab } from "../../members-tab";
import { FeedbackTab } from "../../feedback-tab";

interface ProjectTabsProps {
  project: Project;
  userLocation?: Coordinates | null;
  events?: Event[];
  projectId: string;
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
    <ProjectMembersTab projectId={props.projectId} userId={props.userId} />
  ),
  feedback: <FeedbackTab project={props.project} />,
});
