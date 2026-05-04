import { ProjectsTab } from "../../projects-tab";
import { EventsTab } from "../../events-tab";
import { TasksTab } from "../../tasks-tab";
import type { ListActivitiesMode } from "@shared/config/types";
import type { CategoryDetailSearch } from "../libs/categoryDetailSearchSchema";

const categoryActivitiesForms: Record<
  ListActivitiesMode,
  React.FC<{ search: any; categoryId: string }>
> = {
  projects: ProjectsTab,
  events: EventsTab,
  tasks: TasksTab,
};

export const ActivitiesCategoryContent = ({
  tab,
  search,
  categoryId,
}: {
  tab: ListActivitiesMode;
  search: CategoryDetailSearch;
  categoryId: string;
}) => {
  const {
    tab: _,
    taskMode: _taskMode,
    ...searchWithoutTab
  } = search as CategoryDetailSearch & { taskMode?: string };

  const TabComponent = categoryActivitiesForms[tab];
  return <TabComponent search={searchWithoutTab} categoryId={categoryId} />;
};
