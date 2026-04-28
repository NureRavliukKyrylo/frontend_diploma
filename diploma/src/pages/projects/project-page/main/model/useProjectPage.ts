import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  projectDetailDefaults,
  projectQuery,
  type ProjectMode,
} from "@entities/project";
import { eventQuery } from "@entities/event";
import { useMapUserLocation } from "@features/map";
import { getPolicyStatusConfig } from "@shared/libs/entity";
import { getProjectMainForms } from "../config/projectMainForms";
import type { FeedbackSortValues } from "@entities/feedback";
import type { TaskDrawerSearch } from "@entities/task";

export const useProjectPage = () => {
  const { id } = useParams({ from: "/_masterLayout/projects/$id/" });
  const { tab, ...search } = useSearch({
    from: "/_masterLayout/projects/$id/",
  });

  const { data: project } = useSuspenseQuery(projectQuery.id(id));
  const { data: events } = useQuery(eventQuery.list({ ProjectIds: [id] }));
  const { user, coordinates: userLocation } = useMapUserLocation();

  const navigate = useNavigate({ from: "/projects/$id/" });

  const handleTabChange = (tab: ProjectMode) => {
    navigate({
      params: { id },
      search: projectDetailDefaults[tab],
      resetScroll: false,
    });
  };

  const handleSort = (value: FeedbackSortValues) => {
    navigate({
      params: { id },
      search: (prev) => ({ ...prev, OrderBy: value }),
      resetScroll: false,
    });
  };

  const policyConfig = project?.joinPolicy
    ? getPolicyStatusConfig(project.joinPolicy)
    : null;

  const { taskId, taskMode, DrawerPageSize, DrawerOrderBy, ...taskFilters } =
    search as TaskDrawerSearch;

  const filters = { ...taskFilters, ProjectIds: [id] };

  const forms = getProjectMainForms({
    project,
    userLocation,
    events: events?.data,
    userId: user?.id,
    search,
    handleSort,
    filters,
  });

  return {
    tab,
    project,
    policyConfig,
    forms,
    handleTabChange,
  };
};
