import { ProjectsTab } from "../../projects-tab";
import { EventsTab } from "../../events-tab";
import { TasksTab } from "../../tasks-tab";
import type { ListActivitiesSearch } from "@pages/activities";
import type { BaseFiltersRoute, ListActivitiesMode } from "@shared/config/types";

const myActivitiesForms: Record<
  ListActivitiesMode,
  React.FC<{
    search: any;
    from?: BaseFiltersRoute;
    joinedOnly?: boolean;
    hideOrganizationFilter?: boolean;
  }>
> = {
  projects: ProjectsTab,
  events: EventsTab,
  tasks: TasksTab,
};
export const ActivitiesContent = ({
  tab,
  search,
  from = "/activities/",
  joinedOnly = false,
  hideOrganizationFilter = false,
}: {
  tab: ListActivitiesMode;
  search: ListActivitiesSearch;
  from?: BaseFiltersRoute;
  joinedOnly?: boolean;
  hideOrganizationFilter?: boolean;
}) => {
  const {
    tab: _,
    taskMode: _taskMode,
    ...searchWithoutTab
  } = search as ListActivitiesSearch & { taskMode?: string };

  const TabComponent = myActivitiesForms[tab];
  return (
    <TabComponent
      search={searchWithoutTab}
      from={from}
      joinedOnly={joinedOnly}
      hideOrganizationFilter={hideOrganizationFilter}
    />
  );
};
