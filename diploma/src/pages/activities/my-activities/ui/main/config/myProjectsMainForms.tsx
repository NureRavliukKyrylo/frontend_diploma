import type { MyProjectsMode } from "@entities/project";
import { ProjectsTab } from "../../projects-tab";
import { EventsTab } from "../../events-tab";
import { TasksTab } from "../../tasks-tab";
import type { MyActivitiesSearch } from "@pages/activities";

const myProjectsMainForms: Record<MyProjectsMode, React.FC<{ search: any }>> = {
  projects: ProjectsTab,
  events: EventsTab,
  tasks: TasksTab,
};
export const MyActivitiesContent = ({
  tab,
  search,
}: {
  tab: MyProjectsMode;
  search: MyActivitiesSearch;
}) => {
  const { tab: _, ...searchWithoutTab } = search;
  const TabComponent = myProjectsMainForms[tab];
  return <TabComponent search={searchWithoutTab} />;
};
