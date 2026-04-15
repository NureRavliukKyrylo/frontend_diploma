import { useNavigate } from "@tanstack/react-router";
import { toggleArrayParam } from "@shared/libs/search-params";
import type { MyEventsSearchParams } from "@entities/project";

export const useMyEventsFilters = () => {
  const navigate = useNavigate({ from: "/projects/my/" });

  const nav = (updater: (prev: MyEventsSearchParams) => MyEventsSearchParams) =>
    navigate({ search: updater, resetScroll: false });

  return {
    onStartDateChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, StartDate: date, Page: 1 })),

    onEndBeforeChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, EndBefore: date, Page: 1 })),

    onProjectToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        CategoryIds: toggleArrayParam(prev.ProjectIds, id),
        Page: 1,
      })),

    onOrganizationToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        OrganizationIds: toggleArrayParam(prev.OrganizationIds, id),
        Page: 1,
      })),

    onOnlyActiveChange: (value: boolean) =>
      nav((prev) => ({ ...prev, OnlyActive: value, Page: 1 })),

    onClearFilters: () => navigate({ search: {} }),
  };
};
