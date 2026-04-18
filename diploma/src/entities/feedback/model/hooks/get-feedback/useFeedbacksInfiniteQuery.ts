import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { feedbackQuery } from "../../queries";
import type { EntityType, QueryResult } from "@shared/config/types";
import type { Feedback } from "../../types/FeedBack";
import type { FeedbackSearchParams } from "@entities/feedback/api";

export const useFeedbacksInfiniteQuery =
  (entityType: EntityType, entityId: string, params?: FeedbackSearchParams) =>
  (): QueryResult<Feedback> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError,
    } = useSuspenseInfiniteQuery(
      feedbackQuery.infinite(entityType, entityId, params),
    );

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError };
  };
