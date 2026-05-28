import { eventJoinedDefaults, eventJoinedSearchSchema } from "@entities/event";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/events/my/$id/")({
  validateSearch: eventJoinedSearchSchema,
  search: {
    middlewares: [createTabCleanerMiddleware(eventJoinedDefaults, "overview")],
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_masterLayout/events/my/$id/"!</div>;
}
