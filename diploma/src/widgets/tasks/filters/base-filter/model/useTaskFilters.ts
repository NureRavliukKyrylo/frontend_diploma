import { useNavigate } from "@tanstack/react-router";
import { toggleArrayParam } from "@shared/libs/search-params";
import { tasksTabDefaults, type TaskSearchParams } from "@entities/task";

export const useTaskFilters = () => {
  const navigate = useNavigate({ from: "/tasks/" });

  const nav = (updater: (prev: TaskSearchParams) => TaskSearchParams) =>
    navigate({ search: updater, resetScroll: false });

  return {
    onStartDateChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, From: date, Page: 1 })),

    onEndBeforeChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, To: date, Page: 1 })),

    onRatingChange: (rating: number | undefined) =>
      nav((prev) => ({ ...prev, Rating: rating, Page: 1 })),

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

    onClearFilters: () => navigate({ search: tasksTabDefaults }),
  };
};
