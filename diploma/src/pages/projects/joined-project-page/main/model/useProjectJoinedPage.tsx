import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  joinedProjectDefaults,
  projectQuery,
  type ProjectJoinedMode,
} from "@entities/project";
import { useMapUserLocation } from "@features/map";
import type { TaskDrawerJoinedSearch } from "@entities/task";
import { getJoinedProjectMainForms } from "../config/joinedProjectMainForms";

export const useProjectJoinedPage = () => {
  const { id } = useParams({ from: "/_masterLayout/projects/my/$id/" });
  const { tab, ...search } = useSearch({
    from: "/_masterLayout/projects/my/$id/",
  });

  const { data: project } = useSuspenseQuery(projectQuery.joinedId(id));
  const { coordinates: userLocation } = useMapUserLocation();

  const navigate = useNavigate({ from: "/projects/my/$id/" });

  const handleTabChange = (tab: ProjectJoinedMode) => {
    navigate({
      params: { id },
      search: joinedProjectDefaults[tab],
      resetScroll: false,
    });
  };

  const { taskId, taskMode, CommentsPageSize, ...taskFilters } =
    search as TaskDrawerJoinedSearch;

  const filters = { ...taskFilters, ProjectIds: [id] };

  const forms = getJoinedProjectMainForms({
    project,
    userLocation,
    search,
    filters,
  });

  return {
    tab,
    project,
    forms,
    handleTabChange,
  };
};
