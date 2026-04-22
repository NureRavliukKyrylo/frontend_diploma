import { ProjectsTab } from "../../projects-tab";
import { EventsTab } from "../../events-tab";
import { TasksTab } from "../../tasks-tab";
import type { ListActivitiesSearch } from "@pages/activities";
import type { ListActivitiesMode } from "@widgets/activities";

const myActivitiesForms: Record<
  ListActivitiesMode,
  React.FC<{ search: any }>
> = {
  projects: ProjectsTab,
  events: EventsTab,
  tasks: TasksTab,
};
export const ActivitiesContent = ({
  tab,
  search,
}: {
  tab: ListActivitiesMode;
  search: ListActivitiesSearch;
}) => {
  const { tab: _, ...searchWithoutTab } = search;
  const TabComponent = myActivitiesForms[tab];
  return <TabComponent search={searchWithoutTab} />;
};
