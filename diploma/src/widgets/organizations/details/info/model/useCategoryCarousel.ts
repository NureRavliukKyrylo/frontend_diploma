import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getCategoryById } from "@entities/category/api/category-id/categoryIdApi";
import { getListEvents } from "@entities/event/api";
import { getListProjects } from "@entities/project/api";
import { getListTasks } from "@entities/task/api";
import {
  aggregateCategoryActivities,
  buildCategoryCarouselItems,
} from "../lib/categoryCarouselAggregation";
import type {
  OrganizationCategoryCarouselItem,
  PaginatedCategoryActivityResponse,
} from "./categoryCarouselTypes";

const LIST_PAGE_SIZE = 100;

const fetchAllPages = async <TItem>(
  fetchPage: (
    page: number,
  ) => Promise<PaginatedCategoryActivityResponse<TItem>>,
) => {
  const items: TItem[] = [];
  let page = 1;

  while (true) {
    const response = await fetchPage(page);
    items.push(...response.data);

    const nextPage = response.pagination.nextPage;
    if (!nextPage || nextPage <= page) {
      break;
    }

    page = nextPage;
  }

  return items;
};

export const useOrganizationCategoryCarousel = (organizationId: string) => {
  const { t, i18n } = useTranslation("organizations");

  return useQuery({
    queryKey: [
      "organization",
      organizationId,
      "overview",
      "category-carousel",
      i18n.language,
    ],
    enabled: Boolean(organizationId),
    staleTime: 60_000,
    queryFn: async (): Promise<OrganizationCategoryCarouselItem[]> => {
      const baseProjectParams = {
        OrganizationIds: [organizationId],
        PageSize: LIST_PAGE_SIZE,
        OrderBy: "Default" as const,
        ShowJoined: false,
      };
      const baseEventParams = {
        OrganizationIds: [organizationId],
        PageSize: LIST_PAGE_SIZE,
        OrderBy: "Default" as const,
        ShowJoined: false,
        IncludeArchived: false,
        IncludeSeriesMasters: false,
      };
      const baseTaskParams = {
        OrganizationIds: [organizationId],
        PageSize: LIST_PAGE_SIZE,
        OrderBy: "Default" as const,
      };

      const [projects, activeProjects, events, tasks] = await Promise.all([
        fetchAllPages((page) =>
          getListProjects({
            ...baseProjectParams,
            Page: page,
            IncludeArchived: false,
          }),
        ),
        fetchAllPages((page) =>
          getListProjects({
            ...baseProjectParams,
            Page: page,
            IncludeArchived: true,
          }),
        ),
        fetchAllPages((page) =>
          getListEvents({
            ...baseEventParams,
            Page: page,
          }),
        ),
        fetchAllPages((page) =>
          getListTasks({
            ...baseTaskParams,
            Page: page,
          }),
        ),
      ]);

      const aggregates = aggregateCategoryActivities({
        projects,
        activeProjects,
        events,
        tasks,
      });
      const sortedCategoryIds = aggregates.map(([categoryId]) => categoryId);

      if (sortedCategoryIds.length === 0) {
        return [];
      }

      const categoryDetails = await Promise.all(
        sortedCategoryIds.map(async (categoryId) => {
          try {
            const response = await getCategoryById(categoryId);
            return response.data;
          } catch {
            return null;
          }
        }),
      );

      return buildCategoryCarouselItems(
        aggregates,
        categoryDetails,
        t("details.categories.unnamed"),
      );
    },
  });
};

export type {
  OrganizationCategoryActivityType,
  OrganizationCategoryCarouselItem,
} from "./categoryCarouselTypes";
