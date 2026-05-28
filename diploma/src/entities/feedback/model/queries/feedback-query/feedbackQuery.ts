import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import {
  type FeedbackSearchParams,
  getFeedbacksEntity,
  getMyFeedback,
} from "../../../api";
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
  myFeedback: (entityType: EntityType, entityId: string) => [
    ...feedbackKeys.entity(entityType, entityId),
    "my",
  ],
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
  my: (entityType: EntityType, entityId: string) =>
    queryOptions({
      queryKey: feedbackKeys.myFeedback(entityType, entityId),
      queryFn: () => getMyFeedback(entityType, entityId),
      placeholderData: (prev) => prev,
    }),
};
