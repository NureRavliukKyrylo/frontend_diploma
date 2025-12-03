import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { projectsApi } from "@entities/project/api/projectsApi";
import { useProjectFiltersCategoryStore } from "@entities/project/model/store/ProjectFiltersCategoryStore";
import { categoryDetailRoute } from "@app/routers/categories/$name";

export const useFilteredProjects = () => {
  const { categoryName } = useParams({ from: categoryDetailRoute.id });

  const filters = useProjectFiltersCategoryStore((state) => state.filters);

  return useQuery({
    queryKey: ["projects", categoryName, filters],
    queryFn: () => projectsApi.getFilteredProjects(categoryName, filters),
    enabled: !!categoryName,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
