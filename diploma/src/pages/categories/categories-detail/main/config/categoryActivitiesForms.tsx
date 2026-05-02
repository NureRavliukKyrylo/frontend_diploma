import { ProjectsTab } from "../../projects-tab";
import { EventsTab } from "../../events-tab";
import { TasksTab } from "../../tasks-tab";
import type { ListActivitiesMode } from "@shared/config/types";
import type { CategoryDetailSearch } from "../libs/categoryDetailSearchSchema";

const categoryActivitiesForms: Record<
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
  search: CategoryDetailSearch;
}) => {
  const {
    tab: _,
    taskMode: _taskMode,
    ...searchWithoutTab
  } = search as CategoryDetailSearch & { taskMode?: string };

  const TabComponent = categoryActivitiesForms[tab];
  return <TabComponent search={searchWithoutTab} />;
};
