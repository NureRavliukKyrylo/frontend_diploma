import {
  eventDetailDefaults,
  eventDetailSchema,
  eventQuery,
} from "@entities/event";
import { feedbackQuery } from "@entities/feedback";
import { EventPageSkeleton } from "@pages/events";
import { participationQuery } from "@shared/api/participation";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/events/$id/")({
  validateSearch: eventDetailSchema,
  search: { middlewares: [stripSearchParams(eventDetailDefaults)] },
  loader: async ({ context: { queryClient }, params: { id } }) => {
    await queryClient.ensureQueryData(eventQuery.id(id));
    queryClient.prefetchInfiniteQuery(
      participationQuery.membersInfinite({
        entityId: id,
        entityType: "event",
        pageSize: 8,
      }),
    );
    queryClient.prefetchInfiniteQuery(
      feedbackQuery.infinite("event", id, { PageSize: 3 }),
    );
  },
  pendingComponent: EventPageSkeleton,
});
