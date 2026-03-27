import { infiniteQueryOptions } from "@tanstack/react-query";
import { type FeedbackSearchParams, getFeedbacksEntity } from "../../../api";
import type { EntityType } from "@shared/config/types";

export const feedbackKeys = {
  all: () => ["feedbacks"] as const,
  entity: (entityType: EntityType, entityId: string) =>
    [...feedbackKeys.all(), entityType, entityId] as const,
  infinite: (
    entityType: EntityType,
    entityId: string,
    params?: FeedbackSearchParams,
  ) =>
    [...feedbackKeys.entity(entityType, entityId), "infinite", params] as const,
};

export const feedbackQuery = {
  infinite: (
    entityType: EntityType,
    entityId: string,
    params?: FeedbackSearchParams,
  ) =>
    infiniteQueryOptions({
      queryKey: feedbackKeys.infinite(entityType, entityId, params),
      queryFn: ({ pageParam }) =>
        getFeedbacksEntity(entityType, entityId, {
          ...params,
          Page: pageParam,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
};
