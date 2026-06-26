import { useNavigate } from "@tanstack/react-router";
import { toggleArrayParam } from "@shared/libs/search-params";
import type { MyProjectsSearchParams } from "@entities/project";

export const useMyProjectFilters = () => {
  const navigate = useNavigate({ from: "/activities/my/" });

  const nav = (
    updater: (prev: MyProjectsSearchParams) => MyProjectsSearchParams,
  ) =>
    navigate({
      search: (prev) => updater(prev as MyProjectsSearchParams),
      resetScroll: false,
    });

  return {
    onStartDateChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, StartDate: date, Page: 1 })),

    onEndBeforeChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, EndBefore: date, Page: 1 })),

    onCategoryToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        CategoryIds: toggleArrayParam(prev.CategoryIds, id),
        Page: 1,
      })),

    onOrganizationToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        OrganizationIds: toggleArrayParam(prev.OrganizationIds, id),
        Page: 1,
      })),

    onOnlyActiveChange: (value: boolean) =>
      nav((prev) => ({ ...prev, IncludeArchived: value, Page: 1 })),

    onClearFilters: () => navigate({ search: (prev) => ({ tab: prev.tab }) }),
  };
};
