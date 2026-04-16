import type { MyProjectsMode } from "@entities/project";
import { ProjectsTab } from "../../projects-tab";
import { EventsTab } from "../../events-tab";
import { TasksTab } from "../../tasks-tab";

export const myProjectsMainForms: Record<MyProjectsMode, React.ReactNode> = {
  projects: <ProjectsTab />,
  events: <EventsTab />,
  tasks: <TasksTab />,
};
