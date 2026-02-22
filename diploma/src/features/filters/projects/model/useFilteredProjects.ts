import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "@entities/project/api/projectsApi";
import { useProjectFiltersCategoryStore } from "@entities/project/model/store/ProjectFiltersCategoryStore";
import { buildFilterParams } from "../libs/buildFilterParams";
import { Route } from "@app/routers/_masterLayout/categories/$name"; //temporary
import { useMemo } from "react";

export const useFilteredProjects = () => {
  const { name: categoryName } = Route.useParams();

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
