import { useNavigate } from "@tanstack/react-router";
import { toggleArrayParam } from "@shared/libs/search-params";
import type { MyTasksSearchParams } from "@entities/task";

export const useMyTasksFilters = () => {
  const navigate = useNavigate({ from: "/activities/my/" });

  const nav = (updater: (prev: MyTasksSearchParams) => MyTasksSearchParams) =>
    navigate({
      search: (prev) => updater(prev as MyTasksSearchParams),
      resetScroll: false,
    });

  return {
    onStartDateChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, From: date, Page: 1 })),

    onEndBeforeChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, To: date, Page: 1 })),

    onProjectToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        ProjectIds: toggleArrayParam(prev.ProjectIds, id),
        Page: 1,
      })),

    onOrganizationToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        OrganizationIds: toggleArrayParam(prev.OrganizationIds, id),
        Page: 1,
      })),

    onEventToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        EventIds: toggleArrayParam(prev.EventIds, id),
        Page: 1,
      })),

    onOnlyActiveChange: (value: boolean) =>
      nav((prev) => ({ ...prev, IncludeArchived: value, Page: 1 })),

    onClearFilters: () => navigate({ search: (prev) => ({ tab: prev.tab }) }),
  };
};
