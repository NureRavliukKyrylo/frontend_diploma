import { EventsTab } from "../../events-tab";
import { ProjectsTab } from "../../projects-tab";
import { TasksTab } from "../../tasks-tab";
import type { MyActivitiesSearch } from "@pages/activities";
import type { MyActivitiesMode } from "@widgets/activities";

const myActivitiesForms: Record<MyActivitiesMode, React.FC<{ search: any }>> = {
  projects: ProjectsTab,
  events: EventsTab,
  tasks: TasksTab,
};
export const MyActivitiesContent = ({
  tab,
  search,
}: {
  tab: MyActivitiesMode;
  search: MyActivitiesSearch;
}) => {
  const { tab: _, ...searchWithoutTab } = search;
  const TabComponent = myActivitiesForms[tab];
  return <TabComponent search={searchWithoutTab} />;
};
