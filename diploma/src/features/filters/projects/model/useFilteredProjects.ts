import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { projectsApi } from "@entities/project/api/projectsApi";
import { useProjectFiltersCategoryStore } from "@entities/project/model/store/ProjectFiltersCategoryStore";
import { buildFilterParams } from "../libs/buildFilterParams";
import { categoryDetailRoute } from "@app/routers/categories/$name";
import { useMemo } from "react";

export const useFilteredProjects = () => {
  const { categoryName } = useParams({ from: categoryDetailRoute.id });

  const filters = useProjectFiltersCategoryStore((state) => ({
    startDate: state.startDate,
    dueDate: state.dueDate,
    rating: state.rating,
    categories: state.categories,
    organizations: state.organizations,
    distance: state.distance,
    search: state.search,
    page: state.page,
  }));

  const params = useMemo(() => buildFilterParams(filters), [filters]);

  return useQuery({
    queryKey: ["projects", categoryName, params],
    queryFn: () => projectsApi.getFilteredProjects(categoryName, params),
    enabled: !!categoryName,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
