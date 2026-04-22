import { eventDetailDefaults, eventDetailSchema } from "@entities/event";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/events/$id/")({
  validateSearch: eventDetailSchema,
  search: { middlewares: [stripSearchParams(eventDetailDefaults)] },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_masterLayout/events/$id/"!</div>;
}
