import type { Project, ProjectMode } from "@entities/project";
import type { User } from "@entities/user/profile";
import { OverviewTab } from "../../overview-tab/OverviewTab";
import { ProjectMembersTab } from "../../members-tab/ProjectMembersTab";

interface ProjectTabsProps {
  project?: Project;
  user?: User;
  projectId: string;
}

export const getProjectMainForms = (
  props: ProjectTabsProps,
): Record<ProjectMode, React.ReactNode> => ({
  overview: <OverviewTab project={props.project} user={props.user} />,
  members: <ProjectMembersTab projectId={props.projectId} />,
  feedback: <></>,
});
