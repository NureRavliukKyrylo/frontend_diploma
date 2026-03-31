import type { Project, ProjectMode } from "@entities/project";
import { OverviewTab } from "../../overview-tab/OverviewTab";
import { ProjectMembersTab } from "../../members-tab/ProjectMembersTab";
import type { Coordinates } from "@shared/config/types";
import type { Event } from "@entities/event";

interface ProjectTabsProps {
  project?: Project;
  userLocation?: Coordinates | null;
  events?: Event[];
  projectId: string;
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
  members: <ProjectMembersTab projectId={props.projectId} />,
  feedback: <></>,
});
