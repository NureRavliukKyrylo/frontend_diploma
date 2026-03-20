import type { MyProjectsMode } from "@entities/project";
import { ProjectsTab } from "../../projects-tab/ui/ProjectsTab";

export const myProjectsMainForms: Record<MyProjectsMode, React.ReactNode> = {
  projects: <ProjectsTab />,
  events: <div></div>,
  tasks: <div></div>,
};
