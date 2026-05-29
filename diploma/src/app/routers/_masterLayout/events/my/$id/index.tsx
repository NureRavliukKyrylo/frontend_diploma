import { eventJoinedDefaults, eventJoinedSearchSchema } from "@entities/event";
import { JoinedEventPage } from "@pages/events";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/events/my/$id/")({
  validateSearch: eventJoinedSearchSchema,
  search: {
    middlewares: [createTabCleanerMiddleware(eventJoinedDefaults, "overview")],
  },
  component: JoinedEventPage,
});
